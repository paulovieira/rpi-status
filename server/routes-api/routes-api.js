var Path = require("path");
var Boom = require("boom");

var Log = require("./log");

var internals = {};

exports.register = function(server, options, next){

    // note that the path of the api endpoints will be prepended with a prefix (given in the 
    // plugin configuration)
    var endpoints = [

        // initiatives
         { method: "GET",     path: "/log",         config: Log.config.readAll },
         { method: "POST",    path: "/log",         config: Log.config.create  },

        // catch-all endpoint, that is, any other request for "/api/v1" (regardless of the method)

        // we list explicitely all the http method (instead of using "*") to make sure this route
        // is more specific than the catch-all route for web pages
        { 
            method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            path: "/{any*}",        
            config: {
                handler: function(request, reply){
                    
                    return reply(Boom.notFound("Invalid API endpoint."));
                }
            } 
        },

    ];

    server.route(endpoints);

    return next();
};

exports.register.attributes = {
    name: Path.parse(__filename).name,  // use the name of the file
    dependencies: []
};