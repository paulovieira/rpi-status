process.title = "rpi-status";

var Hoek = require("hoek");
var Glue = require("glue");
var Config = require("./config/initialize");

var manifest = {

    server: {
        //  default connections configuration
        connections: {

            // controls how incoming request URIs are matched against the routing table
            router: {
                isCaseSensitive: false,
                stripTrailingSlash: true
            },

            // default configuration for every route.
            routes: {
                state: {
                    // determines how to handle cookie parsing errors ("ignore" = take no action)
                    failAction: "ignore"
                },

                // disable node socket timeouts (useful for debugging)
                timeout: {
                    server: false,
                    socket: false
                }
            }
        },

    },

    connections: [
        {
            host: Config.get("host"),
            port: Config.get("port")
        }
    ],

    plugins: [

        {
            "blipp": require("./config/plugins/blipp")
        },

        {
            "vision": [{
                options: {}
            }]
        },
/*
        // dependencies: []        
        {
            "./server/utils/utils.js": [{
                options: {}
            }]
        },

        {
            "hapi-auth-cookie": [{
                options: {}
            }]
        },

        // dependencies: ["inert"]
        {
            "./server/hapi-public/hapi-public.js": require("./config/plugins/hapi-public")
        },

        // dependencies: ["hapi-auth-cookie"]
        {
            "../hapi-auth-session-memory": require("./config/plugins/hapi-auth-session-memory")

        },
*/
        // dependencies: ["vision"]
        //   this is where we configure the views manager (using nunjucks) and declare the routes that
        //   return a view; note that reply.view is only available inside the plugin
        {   
            "./server/routes-views/routes-views.js": [{
                options: {}
            }]
        },

        {   
            "./server/routes-api/routes-api.js": require("./config/plugins/routes-api")
        },

    ]
};

// TODO: remove good console if not in production
var options = {
    relativeTo: __dirname,
    prePlugins: function(server, next){
        next();
    }
};

Glue.compose(manifest, options, function (err, server) {

    Hoek.assert(!err, 'Failed registration of one or more plugins: ' + err);

    // start the server and finish the initialization process
    server.start(function(err) {

        Hoek.assert(!err, 'Failed server start: ' + err);
        
        console.log('Server started at: ' + server.info.uri);
        console.log("Hapi version: " + server.version);
    });
});
