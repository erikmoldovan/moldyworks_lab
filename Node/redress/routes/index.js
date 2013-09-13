/*
 * GET posts
 */

var db = require("../db.js");

exports.index = function(req, res){
	res.render("layout");
};
exports.posts = {};

// Returns all posts in collection
exports.posts.infinite = function(req, res){
	db.posts.find(function(err, posts){
		if(err) return;
		else res.json(posts);
	});

	res.header('Access-Control-Allow-Origin', "*");
};

// Returns all posts that matches userID
exports.posts.all = function(req, res){
	var user = req.params.user;
	if(!isNaN(Number(req.params.user))) {user = Number(req.params.user)};

	db.posts.find({'userID' : user}, function(err, posts){
		if(err) return;
		else res.json(posts);
	})

	res.header('Access-Control-Allow-Origin', "*");
};

// Returns first post that matches userID
exports.posts.top = function(req, res){
	var user = req.params.user;
	if(!isNaN(Number(req.params.user))) {user = Number(req.params.user)};

	db.posts.findOne({'userID' : user}, function(err, post){
		if(err) return;
		else res.json(post);
	})

	res.header('Access-Control-Allow-Origin', "*");
};

// Create a post
exports.posts.create = function(req, res){
	db.posts.save(req.body);
};

// Removes a post
exports.posts.remove = function(req, res){
	var user = req.params.user;
	if(!isNaN(Number(req.params.user))) {user = Number(req.params.user)};

	db.posts.remove({'userID' : user});
};