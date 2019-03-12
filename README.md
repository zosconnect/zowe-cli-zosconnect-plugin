# Zowe CLI Plug-in for z/OS Connect EE

This plugin extends the Zowe CLI to allow the management of z/OS Connect EE APIs, Services and API Requesters.

The Zowe CLI needs to be [installed](https://zowe.github.io/docs-site/latest/user-guide/cli-installcli.html#methods-to-install-zowe-cli).

## Installing

`zowe plugins install @zosconnect/zosconnect-zowe-cli`

## Create a profile

* Run the command `zowe profiles create zosconnect -a <server address> [-u <user id> -p <password>]`

## Working with APIs

### List the installed APIs

`zowe zosconnect api list`

### Install a new API

`zowe zosconnect api install <AAR file>`

### Update an API

`zowe zosconnect api update <API name> <AAR file>`

### Delete an API

`zowe zosconnect api delete <API name> [-f]`

### Start an API

`zowe zosconnect api start <API name>`

### Stop an API

`zowe zosconnect api stop <API name>`

If you specify `-f` option then the CLI will stop the API before deleting it.

## Working with Services

### List the installed Services

`zowe zosconnect service list`

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

## Developing

1. Clone this repository `git clone git@github.com:zosconnect/zowe-cli-zosconnect-plugin.git`
1. Build the plugin `npm run build`
1. Package the plugin `npm pack`
1. Install the plugin `npm run pluginInstall`
