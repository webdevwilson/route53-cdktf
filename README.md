# route53-cdktf

An example of how to manage complex DNS structures using CDK for Terraform.

[View Blog Post](https://kerrywilson.dev/post/2021/08-12-managing-route53-dns-with-terraform-and-cdk/)

## Setup
* Install [nodejs](https://nodejs.org/) via [nvm](https://github.com/nvm-sh/nvm)
* Run `nvm install 12`
* Install [Terraform](https://terraform.io) via [tfenv](https://github.com/tfutils/tfenv)
* Run `tfenv install 1.0.4`
* Run `npm install`

## Compile
`npm run get` - Import/update Terraform providers and modules (you should check-in this directory)

`npm run compile` - Compile typescript code to javascript (or "npm run watch")

`npm run watch` - Watch for changes and compile typescript in the background

`npm run build` - Compile typescript

## Synthesize:
`cdktf synth [stack]` - Synthesize Terraform resources from stacks to cdktf.out/ (ready for 'terraform apply')

## Diff
`cdktf diff [stack]` - Perform a diff (terraform plan) for the given stack

## Deploy
`cdktf deploy [stack]` - Deploy the given stack

## Destroy
`cdktf destroy [stack]` - Destroy the stack

## Upgrades
`npm run upgrade` - Upgrade cdktf modules to latest version

`npm run upgrade:next` - Upgrade cdktf modules to latest "@next" version (last commit)

## Use Prebuilt Providers

You can add one or multiple of the prebuilt providers listed below:

`npm install @cdktf/provider-aws`

`npm install @cdktf/provider-google`

`npm install @cdktf/provider-azurerm`

`npm install @cdktf/provider-docker`

`npm install @cdktf/provider-github`

`npm install @cdktf/provider-null`

You can also build any module or provider locally. Learn more https://cdk.tf/modules-and-providers
