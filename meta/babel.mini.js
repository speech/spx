function e(b,a,c){a="location";var d=window.location.href;"title"===b?(a="title",d=document.title):"favicon"===b&&(a="favicon",d=c);window.parent.postMessage({type:a,value:d},"*")}
window.parent&&(Object.prototype.watch||(Object.prototype.watch=function(b,a){function c(c){f=g;return g=a.call(this,b,f,c)}function d(){return g}var f=this[b],g=f;delete this[b]&&Object.defineProperty(this,b,{get:d,set:c})}),window.location.watch("hash",e),window.location.watch("pathway",e),window.location.watch("search",e),document.watch("title",e),window.onload=function(){for(var b=document.getElementsByTagName("a"),a=0;a<b.length;a++);a=0;for(b=document.links;a<b;a++){var c=document.links[a];
"bit"===c.host.slice(-3)&&(c.host=c.host.slice(0,-3)+"spx.is")}for(var d=!1,f=document.head.getElementsByTagName("link"),a=0,b=f;a<b&d;a++)c=f[a].href,"ico"===c.host.slice(-3)&&(e("favicon",0,f[a]),d=!0);d||e("favicon",0,window.location.protocol+"//g.etfv.co/"+window.location.origin);e("location",0,window.location);e("title",0,document.title)});
