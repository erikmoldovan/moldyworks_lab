/**
 * Created with JetBrains PhpStorm.
 * User: moldy
 * Date: 6/12/13
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */
$(function(){
  /* JSON Parser function */
  function parseObj(link){
    var ajaxResponse = {};
    $.ajax({
      url: link,
      async: false,
      success: function(data){
        ajaxResponse = data;
      }
    });
    return ajaxResponse.dropdown;
  }
  // Call it!
  var feed_obj = parseObj('dropdown.json');

  /* Model for Header + Options list */
  var optModel = Backbone.Model.extend({
    defaults: {
      option_text: 'Option',
      header_text: 'Header',
      color: '#000000',
      current: false
    }
  })

  /* Collection template for optModel */
  var optCollection = Backbone.Collection.extend({
    model: optModel
  })
  // Instantiate the collection using the Header+Options Model
  var optList = new optCollection([
    $.each(feed_obj, function(key, value){
      new optModel({option_text: value.optionText, header_text: value.headerText, color: value.color});
    })
  ]);

  /* View to handle HTML rendering */
  var optView = Backbone.View.extend({
    tagName: 'li',

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.render;
    },

    render: function(){
      this.$el.html('<div>' + this.model.get('option_text') + '</div>');
      return this;
    }
  })

  /* View for the App */
  var App = Backbone.View.extend({
    el: $('.selectContainer'),

    initialize: function(){
      // this.header = $('#headerText');
      // this.current = $('#currentOption');
      this.list = $('#selectList');

      // this.listenTo(optList, 'change', this.render);

      console.log(optList);

      optList.each(function(option){
        var view = new optView({ model: option});
        this.list.append(view.render().el);
      }, this);
    },

    render: function(){
      // var current = {};

      // _.each(optList.getCurrent(), function(elem){
      //   current.header_text = elem.get('header_text');
      //   current.option_text = elem.get('option_text');
      //   current.color = elem.get('color');
      // })
    }
  })

/*  // View
  var optView = Backbone.View.extend({
    // Scope of the view; the base element
    el: $('#selectList'),

    initialize: function(){
      _.bindAll(this); // Binds all underscore events to this view
      this.collection = new optCollection();
      this.collection.fetch(); // Calls the collection's parse, getting a JSON object in return
      this.collection.bind('sync', this.render, this); // Renders the collection on all events to the collection
    },

    render: function(){
      // This was a painful two hours. At least I understand rendering now
      var selectors = {"temp": this.collection.toJSON()}; // Creates an object, for simplicity's sake
      var template = _.template($('#list_template').html()); // Calls the template function template at the selecr provided
      $(this.el).html(template(selectors)); // And this, this actually adds the html. With jQuery

      return this;
    }
  });*/

  // This is the last I could do. I didn't grasp the events system in time to implement this functionality properly
/*  $('#selectList').click(function(element){
    $('#topItem').text(element.target.textContent);
    $('#headerText span').text(element.target.attributes[0].nodeValue);
    $('#headerText').css("background-color", element.target.attributes[1].nodeValue);
  });*/

  new App();
});