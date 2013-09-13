/**
 * Front End Client for Reddress
 */
$(function(){
	// Global URI variables. The New Code Order
	var root_uri = 'http://localhost';
	var port = '3000';

	// This function can now be used to retrieve all JSON files needed
	function parseJSON(link){
		var uri = root_uri + ':' + port + '/' + link;

    	var ajaxResponse = {};
	    $.ajax({
	      	url: uri,
	      	async: false,
	      	success: function(data){ ajaxResponse = data; }
	    });

	    return ajaxResponse;
  	}

	var post = Backbone.Model.extend({
		defaults: {
			userID: '007',
			date: '0',
			content: "It's the end of the world as we know it"
		}
	})

	var postColl = Backbone.Collection.extend({
		model: post
	})

  	var feed = parseJSON('posts');
	var posts_bundle = new postColl(
		$.each(feed, function(key, value){
			new post({
				userID: value.userID,
				date: value.date,
				content: value.content
			})
		})
	)

	var post_entry = Backbone.View.extend({
		tagName: 'li',

		initialize: function(){ this.listenTo(this.model, 'change', this.render); },

		render: function(){
			var temp = '<div class="post_info">';
			temp += '<div class="user_id">userID: ' + this.model.get('userID') + '</div>';
			temp += '<div class="date">Date: ' + this.model.get('date') + '</div>';
			temp += '</div>';

			temp += '<div class="post_content">' + this.model.get('content') + '</div>';

			this.$el.html(temp);
			return this;
		}
	})

	var App = Backbone.View.extend({
		el: $('#posts_container'),

		initialize: function(){
			this.list = $('#posts_list');

			posts_bundle.each(function(option){
				var view = new post_entry({ model: option });
				this.list.append(view.render().el);
			}, this);

			this.listenTo(posts_bundle, 'change', this.render);
		},

		render: function(){

		}
	})

	new App();
});