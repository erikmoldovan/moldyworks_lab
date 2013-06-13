/**
 * Created with JetBrains PhpStorm.
 * User: moldy
 * Date: 6/12/13
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
  // Because jQuery makes my life easier
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
  var feedObj = parseObj('dropdown.json');

  // Model
  var optModel = Backbone.Model.extend({
    // Sets default structure and data for model
    defaults: {
      optionText: 'Select One...',
      headerText: 'Text chosen from dropdown form.',
      color: '#000000'
    }
  })

  // Collection
  var optCollection = Backbone.Collection.extend({
    model: optModel // Defines model in use
  })

  // Instantiate a collection
  var optList = new optCollection([
    $.each(feedObj, function(key, value){
//    new optModel(value);
      new optModel({optionText: value.optionText, headerText: value.headerText, color: value.color});
    })
  ]);

  var optHTML = Backbone.View.extend({
    id: $('selectList'),

//    events:{
//      'click': 'toggleHTML'
//    },

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
      this.$el.html('<div id="' + this.model.get('headerText') + '">' + this.model.get('optionText') + '</div>');
      return this;
    }

//    toggleHTML: function(){
//      console.log(this);
//    }
  })

  // View
  var optView = Backbone.View.extend({
    // Scope of the view; the base element
    el: $('#selectList'),

    initialize: function(){
      this.header = $('#headerText');
      this.current = $('#current')
      this.list = $('#selectList');

//      this.listenTo(optList, 'change', this.render);

      console.log('pre optList View loop');
      console.log(optList);

      optList.each(function(val){
        var view = new optHTML({model: val });
        console.log('optList View loop:');
        console.log(view);
        this.list.append(view.render().el);
      }, this);

   },

    render: function(){

    }
  });

  new optView();
});