
var Path = require("path");
var Nunjucks = require("hapi-nunjucks");
var Config = require("nconf");

exports.register = function(server, options, next){

    var pluginName = exports.register.attributes.name;

    // configure nunjucks
    var env = Nunjucks.configure(Config.get("rootDir"), { 
        autoescape: false,
        watch: false,
        noCache: true,
        pluginName: pluginName,
        // throwOnUndefined: false,
    });

    // configure a view's manager using the nunjucks lib
    // server.views({
    //     path: Config.get("rootDir"),
    //     allowAbsolutePaths: true,
    //     engines: {
    //         html: Nunjucks
    //         // html: {
    //         //     compile: Nunjucks.getCompile(env)
    //         // }
    //     },
    //     compileOptions: {
    //         pluginName: pluginName
    //     }
    // });

    return next();
};

exports.register.attributes = {
    name: Path.parse(__filename).name,  // use the name of the file
    dependencies: ["vision"]
};

