module.exports = {
    "rootCommandDescription": "z/OS Connect EE plugin for Zowe CLI",
    "name": "zosconnect",
    "definitions": [{
        "name": "api",
        "type": "group",
        "description": "Manage Inbound APIs",
        "children": [
            {
                "name": "install",
                "description": "Install a new API",
                "type": "command",
                "handler": "lib/ApiListHandler"
            },
            {
                "name": "update",
                "description": "Update an existing API",
                "type": "command",
                "handler": "lib/ApiListHandler",
            },
            {
                "name": "delete",
                "description": "Delete an API",
                "type": "command",
                "handler": "lib/ApiListHandler"
            },
            {
                "name": "list",
                "description": "List the APIs installed in the server",
                "type": "command",
                "handler": "lib/ApiListHandler"
            }
        ]
    }]
}