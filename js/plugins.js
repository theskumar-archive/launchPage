
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

 /* jquery.montage.js
 ***********************************************/
 (function(window,$,undefined){Array.max=function(array){return Math.max.apply(Math,array)};Array.min=function(array){return Math.min.apply(Math,array)};var $event=$.event,resizeTimeout;$event.special.smartresize={setup:function(){$(this).bind("resize",$event.special.smartresize.handler)},teardown:function(){$(this).unbind("resize",$event.special.smartresize.handler)},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartresize";if(resizeTimeout){clearTimeout(resizeTimeout)}resizeTimeout=setTimeout(function(){jQuery.event.handle.apply(context,args)},execAsap==="execAsap"?0:50)}};$.fn.smartresize=function(fn){return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"])};$.fn.imagesLoaded=function(callback){var $images=this.find('img'),len=$images.length,_this=this,blank='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';function triggerCallback(){callback.call(_this,$images)}function imgLoaded(){if(--len<=0&&this.src!==blank){setTimeout(triggerCallback);$images.unbind('load error',imgLoaded)}}if(!len){triggerCallback()}$images.bind('load error',imgLoaded).each(function(){if(this.complete||this.complete===undefined){var src=this.src;this.src=blank;this.src=src}});return this};$.Montage=function(options,element){this.element=$(element).show();this.cache={};this.heights=new Array();this._create(options)};$.Montage.defaults={liquid:true,margin:1,minw:70,minh:20,maxh:250,alternateHeight:false,alternateHeightRange:{min:100,max:300},fixedHeight:null,minsize:false,fillLastRow:false};$.Montage.prototype={_getImageWidth:function($img,h){var i_w=$img.width(),i_h=$img.height(),r_i=i_h/i_w;return Math.ceil(h/r_i)},_getImageHeight:function($img,w){var i_w=$img.width(),i_h=$img.height(),r_i=i_h/i_w;return Math.ceil(r_i*w)},_chooseHeight:function(){if(this.options.minsize){return Array.min(this.heights)}var result={},max=0,res,val,min;for(var i=0,total=this.heights.length;i<total;++i){var val=this.heights[i],inc=(result[val]||0)+1;if(val<this.options.minh||val>this.options.maxh)continue;result[val]=inc;if(inc>=max){max=inc;res=val}}for(var i in result){if(result[i]===max){val=i;min=min||val;if(min<this.options.minh)min=null;else if(min>val)min=val;if(min===null)min=val}}res=min;return res},_stretchImage:function($img){var prevWrapper_w=$img.parent().width(),new_w=prevWrapper_w+this.cache.space_w_left,crop={x:new_w,y:this.theHeight};var new_image_w=$img.width()+this.cache.space_w_left,new_image_h=this._getImageHeight($img,new_image_w);this._cropImage($img,new_image_w,new_image_h,crop);this.cache.space_w_left=this.cache.container_w;if(this.options.alternateHeight)this.theHeight=Math.floor(Math.random()*(this.options.alternateHeightRange.max-this.options.alternateHeightRange.min+1)+this.options.alternateHeightRange.min)},_updatePrevImage:function($nextimg){var $prevImage=this.element.find('img.montage:last');this._stretchImage($prevImage);this._insertImage($nextimg)},_insertImage:function($img){var new_w=this._getImageWidth($img,this.theHeight);if(this.options.minsize&&!this.options.alternateHeight){if(this.cache.space_w_left<=this.options.margin*2){this._updatePrevImage($img)}else{if(new_w>this.cache.space_w_left){var crop={x:this.cache.space_w_left,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left=this.cache.container_w;$img.addClass('montage')}else{var crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}}else{if(new_w<this.options.minw){if(this.options.minw>this.cache.space_w_left){this._updatePrevImage($img)}else{var new_w=this.options.minw,new_h=this._getImageHeight($img,new_w),crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,new_h,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}else{if(new_w>this.cache.space_w_left&&this.cache.space_w_left<this.options.minw){this._updatePrevImage($img)}else if(new_w>this.cache.space_w_left&&this.cache.space_w_left>=this.options.minw){var crop={x:this.cache.space_w_left,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left=this.cache.container_w;if(this.options.alternateHeight)this.theHeight=Math.floor(Math.random()*(this.options.alternateHeightRange.max-this.options.alternateHeightRange.min+1)+this.options.alternateHeightRange.min);$img.addClass('montage')}else{var crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}}},_cropImage:function($img,w,h,cropParam){var dec=this.options.margin*2;if($img.parent('a.am-wrapper').length>0){$img.unwrap();dec=0}this._resizeImage($img,w,h);$img.css({left:-(w-cropParam.x)/2+'px',top:-(h-cropParam.y)/2+'px'});$wrapper=$('<a href="#"/>').addClass('am-wrapper').css({width:cropParam.x-dec+'px',height:cropParam.y+'px',margin:this.options.margin});$img.wrap($wrapper)},_resizeImage:function($img,w,h){$img.css({width:w+'px',height:h+'px'})},_reload:function(){var new_el_w=this.element.width();if(new_el_w!==this.cache.container_w){this.element.hide();this.cache.container_w=new_el_w;this.cache.space_w_left=new_el_w;var instance=this;instance.$imgs.removeClass('montage').unwrap().each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w){instance._stretchImage(instance.$imgs.eq(instance.totalImages-1))}instance.element.show()}},_create:function(options){this.options=$.extend(true,{},$.Montage.defaults,options);var instance=this,el_w=instance.element.width();instance.$imgs=instance.element.children('img');instance.totalImages=instance.$imgs.length;if(instance.options.liquid)$('html').css('overflow-y','scroll');if(!instance.options.fixedHeight){instance.$imgs.each(function(i){var $img=$(this),img_w=$img.width();if(img_w<instance.options.minw&&!instance.options.minsize){var new_h=instance._getImageHeight($img,instance.options.minw);instance.heights.push(new_h)}else{instance.heights.push($img.height())}})}instance.theHeight=(!instance.options.fixedHeight&&!instance.options.alternateHeight)?instance._chooseHeight():instance.options.fixedHeight;if(instance.options.alternateHeight)instance.theHeight=Math.floor(Math.random()*(instance.options.alternateHeightRange.max-instance.options.alternateHeightRange.min+1)+instance.options.alternateHeightRange.min);instance.cache.container_w=el_w;instance.cache.space_w_left=el_w;instance.$imgs.each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w){instance._stretchImage(instance.$imgs.eq(instance.totalImages-1))}$(window).bind('smartresize.montage',function(){instance._reload()})},add:function($images,callback){this.$imgs=this.$imgs.add($images);this.totalImages=this.$imgs.length;this._add($images,callback)},_add:function($images,callback){var instance=this;$images.each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w)instance._stretchImage(instance.$imgs.eq(instance.totalImages-1));if(callback)callback.call($images)},destroy:function(callback){this._destroy(callback)},_destroy:function(callback){this.$imgs.removeClass('montage').css({position:'',width:'',height:'',left:'',top:''}).unwrap();if(this.options.liquid)$('html').css('overflow','');this.element.unbind('.montage').removeData('montage');$(window).unbind('.montage');if(callback)callback.call()},option:function(key,value){if($.isPlainObject(key)){this.options=$.extend(true,this.options,key)}}};var logError=function(message){if(this.console){console.error(message)}};$.fn.montage=function(options){if(typeof options==='string'){var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'montage');if(!instance){logError("cannot call methods on montage prior to initialization; "+"attempted to call method '"+options+"'");return}if(!$.isFunction(instance[options])||options.charAt(0)==="_"){logError("no such method '"+options+"' for montage instance");return}instance[options].apply(instance,args)})}else{this.each(function(){var instance=$.data(this,'montage');if(instance){instance.option(options||{});instance._reload()}else{$.data(this,'montage',new $.Montage(options,this))}})}return this}})(window,jQuery);
 
 
 
 
 
 /*
 * jQuery spritely - Sprite up the web!
 * http://spritely.net/
 *
 * Latest version:
 * http://spritely.net/download/
 *
 * Copyright 2010, Peter Chater, Artlogic Media Ltd, http://www.artlogic.net/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 ******************************************************************************/
(function($) {
	$._spritely = {
		// shared methods and variables used by spritely plugin
		animate: function(options) {
			var el = $(options.el);
			var el_id = el.attr('id');
			if (!$._spritely.instances) {
				$._spritely.instances = {};
			}
			if (!$._spritely.instances[el_id]) {
				$._spritely.instances[el_id] = {current_frame: -1};
			}
			var instance = $._spritely.instances[el_id];
			if (options.type == 'sprite') {
				var frames;
				var animate = function(el) {
					var w = options.width, h = options.height;
					if (!frames) {
						frames = [];
						total = 0
						for (var i = 0; i < options.no_of_frames; i ++) {
							frames[frames.length] = (0 - total);
							total += w;
						}
					}
					if ($._spritely.instances[el_id]['current_frame'] >= frames.length - 1) {
						$._spritely.instances[el_id]['current_frame'] = 0;
					} else {
						$._spritely.instances[el_id]['current_frame'] = $._spritely.instances[el_id]['current_frame'] + 1;
					}
					el.css('background-position', frames[$._spritely.instances[el_id]['current_frame']] + 'px 0');
					if (options.bounce && options.bounce[0] > 0 && options.bounce[1] > 0) {
						var ud = options.bounce[0]; // up-down
						var lr = options.bounce[1]; // left-right
						var ms = options.bounce[2]; // milliseconds
						el
							.animate({top: '+=' + ud + 'px', left: '-=' + lr + 'px'}, ms)
							.animate({top: '-=' + ud + 'px', left: '+=' + lr + 'px'}, ms);
					}
				}
				animate(el);
			} else if (options.type == 'pan') {
				if (options.dir == 'left') { 
					$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] - (options.speed || 1)) || 0;
				} else {
					$._spritely.instances[el_id]['l'] = ($._spritely.instances[el_id]['l'] + (options.speed || 1)) || 0;
				}
				if ($.browser.msie) {
				    // fixme - the background-position property does not work
				    // corretly in IE so we have to hack it here... Not ideal
				    // especially as $.browser is depricated
				    var bp_top = $(el).css('background-position-y') || '0';
				    $(el).css('background-position', $._spritely.instances[el_id]['l'] + 'px ' + bp_top);
				} else {
				    var bp_top = ($(el).css('background-position').split(' ') || ' ')[1];
				    $(el).css('background-position', $._spritely.instances[el_id]['l'] + 'px ' + bp_top);
				}
			}	
		},
		randomIntBetween: function(lower, higher) {
			return parseInt(rand_no = Math.floor((higher - (lower - 1)) * Math.random()) + lower);
		}
	};
	$.fn.extend({
		spritely: function(options) {
			var options = $.extend({
				type: 'sprite',
				do_once: false,
				width: null,
				height: null,
				fps: 12,
				no_of_frames: 2
			}, options || {});
			options.el = this;
			options.width = options.width || $(this).width() || 100;
			options.height = options.height || $(this).height() || 100;
			var get_rate = function() {
                return parseInt(1000 / options.fps);
            }
            if (!options.do_once) {
				window.setInterval(function() {
					$._spritely.animate(options);
				}, get_rate(options.fps));
			} else {
				$._spritely.animate(options);
			}
			return this; // so we can chain events
		},
		sprite: function(options) {
			var options = $.extend({
				type: 'sprite',
				bounce: [0, 0, 1000] // up-down, left-right, milliseconds
			}, options || {});
			return $(this).spritely(options);
		},
		pan: function(options) {
			var options = $.extend({
				type: 'pan',
				dir: 'left',
				continuous: true,
				speed: 1 // 1 pixel per frame
			}, options || {});
			return $(this).spritely(options);
		},
		flyToTap: function(options) {
			var options = $.extend({
				el_to_move: null,
				type: 'moveToTap',
				ms: 1000, // milliseconds
				do_once: true
			}, options || {});
			if (options.el_to_move) {
				$(options.el_to_move).active();
			}
			if ($._spritely.activeSprite) {
				if (window.Touch) { // iphone method see http://cubiq.org/remove-onclick-delay-on-webkit-for-iphone/9 or http://www.nimblekit.com/tutorials.html for clues...
					$(this)[0].ontouchstart = function(e) {
						var el_to_move = $._spritely.activeSprite;
						var touch = e.touches[0];
						var t = touch.pageY - (el_to_move.height() / 2);
						var l = touch.pageX - (el_to_move.width() / 2);
						el_to_move.animate({
							top: t + 'px',
							left: l + 'px'
						}, 1000);
					};
				} else {
					$(this).click(function(e) {
						var el_to_move = $._spritely.activeSprite;
						$(el_to_move).stop(true);
						var w = el_to_move.width();
						var h = el_to_move.height();
						var l = e.pageX - (w / 2);
						var t = e.pageY - (h / 2);
						el_to_move.animate({
							top: t + 'px',
							left: l + 'px'
						}, 1000);
					});
				}
			}
			return this;
		},
		active: function() {
			// the active sprite
			$._spritely.activeSprite = this;
			return this;
		},
		activeOnClick: function() {
			// make this the active script if clicked...
			var el = $(this);
			if (window.Touch) { // iphone method see http://cubiq.org/remove-onclick-delay-on-webkit-for-iphone/9 or http://www.nimblekit.com/tutorials.html for clues...
				el[0].ontouchstart = function(e) {
					$._spritely.activeSprite = el;
				};
			} else {
				el.click(function(e) {
					$._spritely.activeSprite = el;
				});
			}
			return this;
		},
		spRandom: function(options) {
			var options = $.extend({
				top: 50,
				left: 50,
				right: 290,
				bottom: 320,
				speed: 4000,
				pause: 0
			}, options || {});
			var el_id = $(this).attr('id');
			var r = $._spritely.randomIntBetween;
			var t = r(options.top, options.bottom);
			var l = r(options.left, options.right);
			$('#' + el_id).animate({
				top: t + 'px', 
				left: l + 'px'
			}, options.speed)
			window.setTimeout(function() {
				$('#' + el_id).spRandom(options);
			}, options.speed + options.pause)
			return this;
		},
		makeAbsolute: function() {
			// remove an element from its current position in the DOM and
			// position it absolutely, appended to the body tag.
			return this.each(function() {
				var el = $(this);
				var pos = el.position();
				el.css({position: "absolute", marginLeft: 0, marginTop: 0, top: pos.top, left: pos.left })
					.remove()
					.appendTo("body");
			});
		
		}
	})
})(jQuery);
// Stop IE6 re-loading background images continuously
try {
  document.execCommand("BackgroundImageCache", false, true);
} catch(err) {} 