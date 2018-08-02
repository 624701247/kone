var sarea=function(e){var t={};function l(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,l),n.l=!0,n.exports}return l.m=e,l.c=t,l.d=function(e,t,i){l.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=2)}([function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.addClass=function(e,t){t=" "+t;var l=null;-1==(l="string"==typeof e?document.getElementById(e):e).className.indexOf(t)&&(l.className+=t)},t.removeClass=function(e,t){t=" "+t;var l=null;(l="string"==typeof e?document.getElementById(e):e).className=l.className.replace(t,"")}},function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var l=0;l<t.length;l++){var i=t[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,l,i){return l&&e(t.prototype,l),i&&e(t,i),t}}();var n=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.listData,this.blockNum,this.selValAry,this.selTagAry}return i(e,[{key:"setData",value:function(e,t){this.listData=e,this.blockNum=t}},{key:"getBlockNum",value:function(){return this.blockNum}},{key:"initSelAry",value:function(e){(e=e||[]).splice(0,0,"");var t=this.blockNum-(e.length-1);if(t>0)for(var l=this.getValByKeyAry(e),i=0;i<t;i++){var n=this.getFirstKey(l);e.push(n),l[n]&&l[n]&&(l=l[n].items)}this.selValAry=e,this.selTagAry=[];for(var s=0;s<this.selValAry.length;s++)this.selTagAry.push(-1)}},{key:"setSel",value:function(e,t,l){if(this.selValAry[e]!=l){this.selValAry[e]=l,this.selTagAry[e]=t;for(var i=this.blockNum-e,n=0;n<i;n++)this.selValAry.pop(),this.selTagAry.pop();for(var s=0;s<i;s++){var a=this.getValByKeyAry(this.selValAry),r=this.getFirstKey(a);this.selValAry.push(r),""==r?this.selTagAry.push(-1):this.selTagAry.push(0)}}else this.selValAry[e]=l,this.selTagAry[e]=t;console.log("set val",e,this.selValAry),console.log("set tag",this.selTagAry)}},{key:"getAllSelVal",value:function(){return this.selValAry}},{key:"getSelValById",value:function(e){return this.selValAry[e]}},{key:"getValByKeyAry",value:function(e){for(var t=this.listData,l=1;l<e.length;l++){var i=e[l];if(!t[i]||!t[i].items)break;t=t[i].items}return t}},{key:"getListDataById",value:function(e){for(var t=[],l=0;l<e;l++)t.push(this.selValAry[l]);return this.getValByKeyAry(t)}},{key:"getTagByKey",value:function(e,t){var l=0;for(var i in e){if(t==i)break;l++}return l}},{key:"getFirstKey",value:function(e){for(var t in e)return t;return""}}]),e}();t.selData=new n},function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.close=t.open=t.addSelEventListener=t.init=void 0;var i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(t[l]=e[l]);return t.default=e,t}(l(0)),n=l(1),s=l(3);null==window.clog&&(window.clog=function(e){});var a=null,r=null,o="cont-sarea-show",c=(t.init=function(e,t){n.selData.setData(e,t);var l="";l+='\n\t<div class="sarea">\n\t\t<div class="sarea-hd">\n\t\t\t<span id="btn-area-cancel" class="btn">取消</span>\n\t\t\t<span id="btn-area-ok" class="btn">确认</span>\n\t\t</div>\n\n\t\t<div class="sarea-bd">\n\t\t\t<div id="selmask" class="selmask"></div>\n\t\t</div>\n\t</div>\n\t';var i="cont-sarea",s=document.createElement("div");s.className=i,s.id=i,document.body.appendChild(s),function(e){window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;e.style.fontSize=t/7.5+"px"}(s),s.innerHTML=l,a=document.getElementById(i),document.querySelector("#btn-area-cancel").onclick=function(){c()},document.querySelector("#btn-area-ok").onclick=function(){var e=new Event("onSel");e.data=n.selData.getAllSelVal(),a.dispatchEvent(e),c()}},t.addSelEventListener=function(e,t){null!=a?a.addEventListener("onSel",function(l){null==t?e(l.data):e.call(t,l.data)}):console.error("sarea 还没初始化")},t.open=function(e){if(null!=a){if(i.addClass(a,o),null==r){n.selData.initSelAry(e);var t=a.querySelector(".sarea-bd");r=new s.SelScroll(t,n.selData.getBlockNum()-1,1)}else e&&n.selData.initSelAry(e);r.updateList()}else console.error("sarea 还没初始化")},t.close=function(){null!=a?i.removeClass(a,o):console.error("sarea 还没初始化")})},function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SelScroll=void 0;var i=function(){function e(e,t){for(var l=0;l<t.length;l++){var i=t[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,l,i){return l&&e(t.prototype,l),i&&e(t,i),t}}(),n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(t[l]=e[l]);return t.default=e,t}(l(0)),s=l(1);var a=function(e){var t=document.createElement("div");return t.id=e,t.className="block "+e,t.innerHTML='<ul class="sarea-list"></ul>',t};t.SelScroll=function(){function e(t,l,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=a("block-"+i);t.appendChild(n),this.bId=i,this.listData=null,this.subSelScroll=l>0?new e(t,l-1,i+1):null,this.el_cont=n,this.el_cont.onscroll=this.onScroll.bind(this),this.el_list=this.el_cont.querySelector(".sarea-list"),this.el_items=null,this.itemHei=null,this.scTimer=null,this.inSlowAni=!1,this.curTop=0,this.maxTop=0,this.slowAniTimer=null,this.curTag=0}return i(e,[{key:"updateMaxTop",value:function(){n.removeClass(this.el_cont,"block-stop"),this.el_cont.scrollTop=0,this.maxTop=this.el_list.clientHeight-this.el_cont.clientHeight}},{key:"setCurSel",value:function(e){console.log("curIdx",e),this.el_cont.scrollTop=e*this.itemHei}},{key:"onScroll",value:function(e){if(null==this.scTimer){if(1==this.inSlowAni)return;this.curTop=e.target.scrollTop,this.scTimer=setInterval(function(){this.onScTimer(e.target)}.bind(this),400)}else this.curTop=e.target.scrollTop}},{key:"onScTimer",value:function(e){if(this.curTop==e.scrollTop){this.curTag=Math.round(e.scrollTop/this.itemHei),this.onSel();var t=this.itemHei*this.curTag;t>this.maxTop&&(t=this.maxTop),t!=e.scrollTop&&this.aniSlowTop(e,t),clearInterval(this.scTimer),this.scTimer=null}}},{key:"aniSlowTop",value:function(e,t){this.inSlowAni=!0,n.addClass(e,"block-stop");var l=t-e.scrollTop,i=l/Math.abs(l)*2;this.slowAniTimer=setInterval(function(){e.scrollTop+=i,(i>=0&&e.scrollTop>=t||i<0&&e.scrollTop<=t)&&(e.scrollTop=t,clearInterval(this.slowAniTimer),this.slowAniTimer=null,setTimeout(function(){this.inSlowAni=!1}.bind(this),100),n.removeClass(e,"block-stop"))}.bind(this),20)}},{key:"addList",value:function(){var e=0,t="";t+=this.createItem("",++e),t+=this.createItem("",++e);for(var l in this.listData)t+=this.createItem(l,++e);t+=this.createItem("",++e),t+=this.createItem("",++e),this.el_list.innerHTML=t}},{key:"createItem",value:function(e,t){return'<li id="sarea-item-'+t+'" class="sarea-item sarea-item-'+this.bId+'">'+e+"</li>"}},{key:"updateList",value:function(){this.listData=s.selData.getListDataById(this.bId),this.addList(),this.el_items=this.el_list.getElementsByClassName("sarea-item"),null==this.itemHei&&(this.itemHei=this.el_cont.clientHeight/5),this.updateMaxTop();var e=s.selData.getSelValById(this.bId),t=s.selData.getTagByKey(this.listData,e);this.setCurSel(t),this.subSelScroll&&this.subSelScroll.updateList()}},{key:"onSel",value:function(){var e=this.getSelName();s.selData.setSel(this.bId,this.curTag,e),this.subSelScroll&&this.subSelScroll.updateList()}},{key:"getSelName",value:function(){return this.el_items[this.curTag+2].innerHTML}},{key:"setCurSel",value:function(e){this.el_cont.scrollTop=e*this.itemHei}}]),e}()}]);