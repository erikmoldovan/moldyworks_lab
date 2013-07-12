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
      success: function(data){ ajaxResponse = data; }
    });
    return ajaxResponse.dropdown;
  }
  // Call it!
  var feed_obj = parseObj('dropdown.json');

  /* Model for Header + Options list */
  var optModel = Backbone.Model.extend({
    defaults: {
      optionText: 'Option',
      headerText: 'Header',
      color: '#000000',
      current: false
    },

    toggle: function(flag){ this.set('current', flag); }
  })

  /* Collection template for optModel */
  var optCollection = Backbone.Collection.extend({
    model: optModel,

    getCurrent: function(){ return this.where({ current: true }); }
  })
  // Instantiate the collection using the Header+Options Model
  var optList = new optCollection(
    $.each(feed_obj, function(key, value){
      new optModel({
        optionText: value.optionText,
        headerText: value.headerText,
        color: value.color
      });
    })
  );

  /* View to handle HTML rendering */
  var optView = Backbone.View.extend({
    tagName: 'li',

    events: { 'click': 'switchCurrent' },

    initialize: function(){ this.listenTo(this.model, 'change', this.render); },

    render: function(){
      this.$el.html('<div>' + this.model.get('optionText') + '</div>');
      return this;
    },

    switchCurrent: function(){
      var currentPos = optList.indexOf(this.model);

      for(i = 0; i < optList.length; i++){
        if(i == currentPos){ this.model.toggle(true); }
        else{ optList.models[i].toggle(false); }
      }
    }
  })

  /* View for the App */
  var App = Backbone.View.extend({
    el: $('.selectContainer'),

    events: { 'click': 'dropdown' },

    initialize: function(){
      this.list = $('#selectList');

      optList.each(function(option){
        var view = new optView({ model: option});
        this.list.append(view.render().el);
      }, this);

      this.listenTo(optList, 'change', this.render);
    },

    render: function(){
      var that = this;
      this.currentOption = $('#currentOption');
      this.headerBox = $('#headerBox');
      this.headerText = $('#headerText');

      _.each(optList.getCurrent(), function(elem, index){
        $(currentOption).text(elem.get('optionText'));
        $(headerBox).css({ 'background-color' : elem.get('color') });
        $(headerText).text(elem.get('headerText'));
      })
    },

    dropdown: function(){
      var list = $('#selectList');

      if(list.is(':visible')){ list.hide(); }
      else{ list.show(); }
    }
  })

  new App();
});