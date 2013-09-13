var dburl = "test";
var collection = ["posts"];
var db = require("mongojs").connect(dburl, collection);

module.exports = db;