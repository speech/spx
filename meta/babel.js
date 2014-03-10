'use strict';

//TODO jsDoc notations, encapsulate via anonfunc closure
//TODO validate via ADSafe?  Embed via Caja?

function change(id, oldVal, newVal) {
  var type = 'location';
  var value = window.location.href;

  if (id === 'title') {
    type = 'title';
    value = document.title;
  } else if (id === 'favicon') {
    type = 'favicon';
    value = newVal;
  }

  window.parent.postMessage({type: type, value: value}, '*');
}

if (window.parent) {

  if (!Object.prototype.watch) {  //don't overwrite gecko watch function
    Object.prototype.watch = function(prop, handler) {
      var oldval = this[prop], newval = oldval,
        getter = function() {
          return newval;
        },
        setter = function(val) {
          oldval = newval;
          return newval = handler.call(this, prop, oldval, val);
        };
      if (delete this[prop]) {
        Object.defineProperty(this, prop, {
          get: getter,
          set: setter
        });
      }
    };
  }

  change('location', null, window.location);
  change('title', null, document.title);

  window.location.watch('hash', change);
  window.location.watch('pathway', change);
  window.location.watch('search', change);
  document.watch('title', change);

  window.onload = function() {

    //change non-relative links to target top page
    var anchors = document.getElementsByTagName('a');
    var absolute = new RegExp('^(?:[a-z]+:)?//', 'i');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];


      if ((fuzzyOrigin(a) !== fuzzyOrigin(window.location)) &&
        absolute.test(a.origin)) {
        a.setAttribute('target', '_top');
      }



    }
    function fuzzyOrigin(url) {
      var i = url.host.lastIndexOf('.') - 1;
      var temp = url.host.slice(0, i);
      var j = temp.lastIndexOf('.') + 1;
      return url.slice(j, url.length);
    }

    //change all .bit links into .spx.is links
    for (var i = 0, len = document.links; i < len; i++) {
      var link = document.links[i];

      if (link.host.slice(-3) === 'bit') {
        link.host = link.host.slice(0, -3) + 'spx.is';
      }
    }


    //find the favicon
    var favFound = false;

    var headLinks = document.head.getElementsByTagName('link');

    for (var i = 0, len = headLinks; i < len & favFound; i++) {
      var link = headLinks[i].href;
      if (link.host.slice(-3) === 'ico') {
        change('favicon', null, headLinks[i]);
        favFound = true;
      }
    }
    if (!favFound) {
      change('favicon', null, window.location.protocol + '//g.etfv.co/' + window.location.origin);
    }
  };
}