/**
 * Created with JetBrains PhpStorm.
 * User: moldy
 * Date: 6/12/13
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
  //$(".chzn-select").chosen();

  // Model
  var optModel = Backbone.Model.extend({
    // Sets default structure and data for model
    defaults: {
      optionText: 'Option',
      headerText: 'Header',
      color: '#000000'
    }
  })

  // Collection
  var optCollection = Backbone.Collection.extend({
    model: optModel, // Defines model in use
    url: 'dropdown.json', // URL of collection. In this case, JSON file
    // Called when Collection makes fetch call. This parses returns the JSON object
    parse: function(response){
      return response.dropdown;
    }
  })

  // View
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
  });

  // This is the last I could do. I didn't grasp the events system in time to implement this functionality properly
    $('#selectList').click(function(element){
      console.log(element.target.textContent);
      console.log($(element.target));
      $('#topItem').text(element.target.textContent);
      $('#headerText span').text(element.target.attributes[0].nodeValue);
      $('#headerText').css("background-color", element.target.attributes[1].nodeValue);
  });

  new optView();
});