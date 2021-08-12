import { Construct } from 'constructs'
import { App, TerraformStack } from 'cdktf'
import {
  AwsProvider,
  AwsProviderConfig,
  Route53Record,
  Route53RecordConfig,
  Route53Zone,
  Route53ZoneConfig
} from './.gen/providers/aws'
import * as YAML from 'yaml'
import * as fs from 'fs'

// outlines the structure of our configuration file
type ZoneConfiguration = Route53ZoneConfig & {
  account: string
  zones: ZoneConfiguration[]
  records: Route53RecordConfig[]
}

type Configuration = {
  accounts: AwsProviderConfig[]
  zones: ZoneConfiguration[]
}

class MyStack extends TerraformStack {
  awsProviders: {[id: string]: AwsProvider} = {}
  constructor(scope: Construct, name: string, config: Configuration) {
    super(scope, name);

    config.accounts.forEach( providerConfig => {
      const id = providerConfig.alias || "default"
      this.awsProviders[id] = new AwsProvider(this, id, providerConfig)
    })

    // Configure hosted zones
    config.zones.forEach((zoneConfig) => {
      this.createZone(null, zoneConfig)
    })
  }

  // Recursive method for adding zones
  createZone(parent: Route53Zone | null, zoneConfig: ZoneConfiguration) {
    const id = zoneConfig.name.replace('.', '_')

    // add defaults and provider to zone config
    zoneConfig = {
      ...{
        provider: this.awsProviders[zoneConfig.account],
        zones: [],
      },
      ...zoneConfig,
    }
    const zone = new Route53Zone(this, id, zoneConfig)

    // if there is a parent zone, add NS records to it that point to the current zone
    if(parent != null) {
      const recordId = `${parent.id}_${id}`
      new Route53Record(this, recordId, {
        provider: parent.provider,
        zoneId: parent.zoneId,
        type: "NS",
        ttl: 300,
        name: zone.name,
        records: zone.nameServers,
      })
    }
    zoneConfig.zones.forEach((z) => this.createZone(zone, z))
  }
}

const app = new App();
const config = YAML.parse(fs.readFileSync('dns.yaml', 'utf8')) as Configuration
new MyStack(app, 'example', config);
app.synth();
