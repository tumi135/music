!function(n,e){var a,r,i,o=n(document.body),m=(e=window.player,0);function c(n){n=Math.round(n);var e=Math.floor(n/60),t=n-60*e;return e<10&&(e="0"+e),t<10&&(t="0"+t),e+":"+t}function l(n){var e=n*a;e=c(e),o.find(".cur-time").html(e);var t=100*(n-1)+"%";o.find(".pro-top").css({transform:"translateX("+t+")"})}e.process={renderAllTime:function(n){var e=c(n);m=0,a=n,o.find(".all-time").html(e)},start:function(n){m=null==n?m:n,cancelAnimationFrame(r),i=(new Date).getTime(),function n(){var e=(new Date).getTime(),t=m+(e-i)/(1e3*a);r=requestAnimationFrame(n),l(t)}()},stop:function(){var n=(new Date).getTime();m+=(n-i)/(1e3*a),cancelAnimationFrame(r)},updata:l}}(window.Zepto,window.player||(window.player={}));