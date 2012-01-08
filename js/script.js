/* Author: Saurabh Kumar
		   http://saurabhworld.in
*/

//activate the spirite
$(document).ready(function() {
			
	$('#city1').pan({fps: 30, speed: 1, dir: 'right'}); 
	
	$('#city2').pan({fps: 30, speed: 2, dir: 'right'}); 
	
	$('#sky').pan({fps: 30, speed: 0.5, dir: 'right'}); 
	
	var stage_left = (($('body').width() - 866) / 2);
	var stage_top = 30;
	
	
	$('#plane1').sprite({fps: 8, no_of_frames: 14})
		.spRandom({
			top: 40,
			left: stage_left + 20,
			right: 400,
			bottom: 140,
			speed: 3500,
			pause: 1000
		});
	

});
			
// input field

$(document).ready(function() {
	$('input[type="text"]').addClass("idleField");
	$('input[type="text"]').focus(function() {
		$(this).removeClass("idleField").addClass("focusField");
		if (this.value == this.defaultValue){ 
			this.value = '';
		}
		if(this.value != this.defaultValue){
			this.select();
		}
	});
	$('input[type="text"]').blur(function() {
		$(this).removeClass("focusField").addClass("idleField");
		if ($.trim(this.value) == ''){
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});
});			
//navigation and loader

$(document).ready(function() {
			
	$("#fetch_link").click(function (e) { 
		$('#content_load').load('sfd2010/Schedule.php');
		e.preventDefault();
	});


});	


/* Gallery showcase controls
******************************************************************/
	$(function() {
		var $container 	= $('#g-sfd2010, #g-sfd2009'),
			$imgs		= $container.children('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
			//$container.before("<img src=images/ajax-loader.gif class=loading></img>");
			$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$('.loading').remove();
					$container.montage({
						//fixedHeight : 200,
						fillLastRow	: true,
						alternateHeight: true,
						alternateHeightRange	: {
									min	: 100,
									max	: 200
								}
					});
				}
			}).attr('src',$img.attr('src'));
		});	
	});
