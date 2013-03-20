/**
 * Created with JetBrains PhpStorm.
 * User: moldy
 * Date: 3/17/13
 * Time: 7:56 PM
 * To change this template use File | Settings | File Templates.
 */

var feedReader = function(url){
  this.feedUrl = url;
  this.feedResults = null;
}

feedReader.prototype.retrieveFeed = function(dataObject){
  var self = this;

  window.x = $.getJSON(this.feedUrl, dataObject, function(data){
    self.feedResults = data;
    self.printFeed();
  }).fail(function(){
      console.log('fail',arguments)})
    .always(function(){
      console.log('always',arguments)}
  );
};

feedReader.prototype.printFeed = function(){
  var theList = $('<dl></dl>');

  $.each(this.feedResults,function(key,value){

    if(typeof(value) == 'object'){
      theList.append('<dt><b><i>' + key + '</i></b></dt><dd></dd>');

      $.each(value,function(ky,val){

        if(typeof(val) == 'object'){
          theList.append('<dt><b>' + ky + '</b></dt><dd>' + val + '</dd>');

          $.each(value,function(k,v){
            theList.append('<dt>' + k + '</dt><dd>' + v + '</dd>');
          });

        }else{
          theList.append('<dt><b>' + ky + '</b></dt><dd>' + val + '</dd>');
        }

        theList.append('<dt><b>' + ky + '</b></dt><dd>' + val + '</dd>');
      });

    }else{
      theList.append('<dt><b><i>' + key + '</i></b></dt><dd>' + value + '</dd>');
    }
  });

  $('#sort_table').append(theList);
};

function init(){
  metallicaFeed = new feedReader('http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da');
  metallicaFeed.retrieveFeed({'inc': 'aliases', 'fmt': 'json'});
}

$(document).ready(function(){
  init();
});