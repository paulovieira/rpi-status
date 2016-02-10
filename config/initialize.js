var Nconf = require('nconf');

// 1 - load the command line arguments into Nconf
Nconf.argv();

// 2 - load the main configuration object (either config/production.js or config/dev.js, which is the default)

var configFile = !!Nconf.get("production") ? "./production" : "./dev";
Nconf.overrides(require(configFile));

// 3 - load the default configuration (these options will be applied only if they aren't already)
Nconf.defaults(require("./default"));

module.exports = Nconf;
