# z/OS Connect EE Plug-in for Zowe CLI

<img src="./imgs/Zowe_ConformanceBadge_cli.svg" width=25%/>

[![Build Status](https://travis-ci.org/zosconnect/zowe-cli-zosconnect-plugin.svg?branch=master)](https://travis-ci.org/zosconnect/zowe-cli-zosconnect-plugin)
[![NPM Version](https://img.shields.io/npm/v/@zosconnect/zosconnect-zowe-cli)](https://www.npmjs.com/package/@zosconnect/zosconnect-zowe-cli)

This plugin extends the Zowe CLI to allow the management of z/OS Connect EE APIs, Services and API Requesters.

The Zowe CLI needs to be [installed](https://docs.zowe.org/stable/user-guide/cli-installcli.html#methods-to-install-zowe-cli).

## Installing

`zowe plugins install @zosconnect/zosconnect-zowe-cli@zowe-v1-lts`

## Create a profile

* Run the command `zowe profiles create zosconnect -a <server address> [-u <user id> -p <password> --ru]`

*Note:* If you are using a self-signed certificate then `--ru` needs to be set to `false`.

## Working with APIs

### List the installed APIs

`zowe zosconnect api list`

### Get information about an API

`zowe zosconnect api info <API name>`

### Install a new API

`zowe zosconnect api install <AAR file>`

### Update an API

`zowe zosconnect api update <API name> <AAR file>`

### Delete an API

`zowe zosconnect api delete <API name> [-f]`

If you specify `-f` option then the CLI will stop the API before deleting it.

### Start an API

`zowe zosconnect api start <API name>`

### Stop an API

`zowe zosconnect api stop <API name>`

## Working with Services

### List the installed Services

`zowe zosconnect service list`

### Get information about a Service

`zowe zosconnect service info <Service name>`

### Install a new Service

`zowe zosconnect service install <SAR file>`

### Update a Service

`zowe zosconnect service update <Service name> <SAR file>`

### Delete a Service

`zowe zosconnect service delete <Service name> [-f]`

If you specify the `-f` option then the CLI will stop the Service before deleting it.

### Start a Service

`zowe zosconnect service start <Service name>`

### Stop a Service

`zowe zosconnect service stop <Service name>`

## Working with API Requesters

### List the install API Requesters

`zowe zosconnect apirequester list`

### Get information about an API Requester

`zowe zosconnect apirequester info <API Requester name>`

### Install a new API Requester

`zowe zosconnect apirequester install <ARA file>`

### Update an API Requester

`zowe zosconnect apirequester update <API Requester name> <ARA file>`

### Delete an API Requester

`zowe zosconnect apirequester delete <API Requester name> [-f]`

If you specify the `-f` option then the CLI will stop the API Requester before deleting it.

### Start an API Requester

`zowe zosconnect apirequester start <API Requester name>`

### Stop an API Requester

`zowe zosconnect apirequester stop <API Requester name>`

## Support

If you experience any problems with this plug-in then please [raise an issue](https://github.com/zosconnect/zowe-cli-zosconnect-plugin/issues/new/choose) and the development team will look into it.

## Developing

1. Clone this repository `git clone git@github.com:zosconnect/zowe-cli-zosconnect-plugin.git`
1. Build the plugin `npm run build`
1. Run the CLI Tests `npm test`
1. Package the plugin `npm pack`
1. Install the plugin `npm run pluginInstall`
1. Run the integration tests `npm run integration`
