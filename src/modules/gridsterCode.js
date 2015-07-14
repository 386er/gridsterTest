 var gridster;
	
	var widgets1 = [
					['<div>0</div>', 8, 4]
			];
		
	var widgets2 = [
					['<div>0</div>', 8, 2],
			['<div>1</div>', 8, 2]
			];
		
	var widgets3 = [
					['<div>0</div>', 4, 2],
			['<div>1</div>', 4, 2],
			['<div>2</div>', 8, 2]
			];
		
		var widgets4 = [
					['<div>0</div>', 4, 3],
					['<div>1</div>', 4, 3],
					['<div>2</div>', 4, 3],
					['<div>3</div>', 4, 3],
			];


var gridsterElement = '<div class="gridster placeholder-box" style="left:10px">' +
				'<ul></ul>' +
				'<a class="adder">+</a>' +
				'</div>';
		
		

		$(function(){

			gridster = $(".gridster > ul").gridster({
					widget_margins: [5, 5],
					widget_base_dimensions: [100, 55],
			resize: {
						enabled: true,
						max_size: [4, 4],
						min_size: [2, 2]
					}
			}).data('gridster');

		var widgets = widgets4;
		

		var bindAdder = function() {
						$.each(widgets, function(i, widget){
								gridster.add_widget.apply(gridster, widget)  
						});

						$('.gridster').removeClass('placeholder-box')
						$(this).remove();
						$('.wrapper').append(gridsterElement);
						$('.adder').click(bindAdder);
				
			};  


				$('.adder').click(bindAdder);
		


		$('#destroy').click(function(){

				gridster.disable();
				$('.gridster .ready ul').css({'background-color':'white'});
		});

	});