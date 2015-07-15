 var gridster;
	
	var widgets1 = [
					['<div></div>', 8, 4]
			];
		
	var widgets2 = [
					['<div></div>', 8, 2],
					['<div></div>', 8, 2]
			];
		
	var widgets3 = [
					['<div></div>', 4, 2],
					['<div></div>', 4, 2],
					['<div></div>', 8, 2]
			];
		
	var widgets4 = [
					['<div></div>', 4, 3],
					['<div></div>', 4, 3],
					['<div></div>', 4, 3],
					['<div></div>', 4, 3],
			];


			
var currentIndex = 1;			
			
var gridsterElement = '<div class="gridster placeholder-box" style="left:10px">' +
				'<ul class="' + currentIndex +'"></ul>' +
				'<a class="adder">+</a>' +
				'</div>';
	

var getGridsterElement = function() {
	
	var gridsterElement = '<div class="gridster placeholder-box" style="left:10px">' +
				'<ul class="' + currentIndex +'"></ul>' +
				'<a class="adder">+</a>' +
				'</div>';
	
	
	return gridsterElement;
	
} 

	

		$(function(){

			gridster = $(".gridster > ul").gridster({
					widget_margins: [5, 6],
					widget_base_dimensions: [100, 55],
			resize: {
						enabled: true,
						max_size: [4, 4],
						min_size: [2, 2]
					}
			}).data('gridster');

		var widgets = widgets4;
		
		var initGridster = function(index) {
			gridster = $(".gridster > ul." + index).gridster({
				widget_margins: [5, 6],
				widget_base_dimensions: [100, 55],
				resize: {
							enabled: true,
							max_size: [4, 4],
							min_size: [2, 2]
						}
				}).data('gridster');
		};	
	
		initGridster(currentIndex);

		var bindAdder = function() {
			debugger;
						currentIndex++;
						initGridster(currentIndex);
						$.each(widgets, function(i, widget){
								gridster.add_widget.apply(gridster, widget)  
						});

						$('.gridster').removeClass('placeholder-box')
						$(this).remove();
						$('.wrapper').append(getGridsterElement());
						$('.adder').click(bindAdder);	
			};  


				$('.adder').click(bindAdder);
		


		$('#destroy').click(function(){

				gridster.disable();
				$('.gridster .ready ul').css({'background-color':'white'});
		});

	});