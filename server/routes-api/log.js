var Path = require("path");
var Fs = require("fs-extra");
var Config = require("nconf");

var internals = {};

internals.readAll = {

    handler: function(request, reply) {

        var path = Path.join(Config.get("rootDir"), "data/log.json");

        Fs.ensureFileSync(path);
        var contents = Fs.readFileSync(path, "utf8") || "[]";
        var data = JSON.parse(contents);

        return reply(data);
    },

    description: "description - to be done",
};

internals.create = {

    handler: function(request, reply) {

        var path = Path.join(Config.get("rootDir"), "data/log.json");

        Fs.ensureFileSync(path);
        var contents = Fs.readFileSync(path, "utf8") || "[]";
        var data = JSON.parse(contents);

        request.payload.time = new Date().toISOString();
        data.push(request.payload);
        Fs.writeFileSync(path, JSON.stringify(data, 0, 4));

        return reply(request.payload);
    },

    description: "description - to be done",
};
exports.config = {
    readAll: internals.readAll,
    create: internals.create,
};