var 
	gridster,
	widgets1,
	widgets2,
	widgets3,
	widgets4,
	gridConfig,
	gridTemplate;

gridConfig = {
				widget_margins: [5, 6],
				widget_base_dimensions: [100, 55],
				autogenerate_stylesheet: true,
				resize: {
					enabled: true,
					max_size: [4, 4],
					min_size: [1, 1]
					}
				}	
		
		
widgets4 = [
			['<div></div>', 4, 2],
			['<div></div>', 4, 2],
			['<div></div>', 4, 2],
			['<div></div>', 4, 2],
		];
					
gridTemplate =  '<div class="gridster placeholder-box" style="left:10px">' +
				'<ul class="{{currentlement}}"></ul>' +
				'</div>';
		
var data = {'currentElement' : 0};			
				
var widgets = widgets4;

var bindGridsterToElement = function(index) {
	gridster = $(".gridster > ul." + index).gridster(gridConfig).data('gridster');
};	


$('.addBlock').click(function() {

	data.currentElement++;
	var html = Mustache.to_html(gridTemplate, data)
	$('.sub-wrapper').append(html);
	bindGridsterToElement(data.currentElement);
	$('.gridster').removeClass('placeholder-box');
	$.each(widgets, function(i, widget){
						gridster.add_widget.apply(gridster, widget)  
				});
	
});

			
/* widgets1 = [
			['<div></div>', 8, 4]
		];
		
widgets2 = [
			['<div></div>', 8, 2],
			['<div></div>', 8, 2]
		];
		
widgets3 = [
			['<div></div>', 4, 2],
			['<div></div>', 4, 2],
			['<div></div>', 8, 2]
		]; */				
				
				