# Zowe CLI Plug-in for z/OS Connect EE

This plugin extends the Zowe CLI to allow the management of z/OS Connect EE APIs, Services and API Requesters.

The Zowe CLI needs to be [installed](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html#methods-to-install-zowe-cli).

## Installing

1. Clone this repository `git clone git@github.com:zosconnect/zowe-cli-zosconnect-plugin.git`
1. Build the plugin `npm run build`
1. Package the plugin `npm package`
1. Install the plugin `zowe plugin install ./zosconnect-zowe-cli-1.0.0.tgz`

## Create a profile

* Run the command `zowe profiles create zosconnect -a <server address>`

## Working with APIs

### List the installed APIs

`zowe zosconnect api list`

### Install a new API

`zowe zosconnect api install <AAR file>`

### Update an API

`zowe zosconnect api update <API name> <AAR file>`

### Delete an API

`zowe zosconnect api delete <API name>`