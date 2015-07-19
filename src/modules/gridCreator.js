var 
	gridster,
	widgets1,
	widgets2,
	widgets3,
	widgets4,
	gridConfig,
	selecterTemplate,
	gridTemplate;


gridConfig = {
				widget_margins: [5, 6],
				widget_base_dimensions: [100, 55],
				autogenerate_stylesheet: true,
				resize: {
					enabled: true,
					max_size: [8, 8],
					min_size: [1, 1]
					}
				}	

var widgets = {

1 : [
			['<div></div>', 6, 4]
		],
		
2:  [
			['<div></div>', 6, 2],
			['<div></div>', 6, 2]
		],
		
3: [
			['<div></div>', 3, 2],
			['<div></div>', 3, 2],
			['<div></div>', 6, 2]
		], 
	
		
4:  [
			['<div></div>', 3, 2],
			['<div></div>', 3, 2],
			['<div></div>', 3, 2],
			['<div></div>', 3, 2],
		],

5:  [
			['<div></div>', 3, 1],
			['<div></div>', 1, 3],
			['<div></div>', 1, 3],
			['<div></div>', 1, 3],
			['<div></div>', 3, 2],
		]		

}


selecterTemplate = '<div class="placeholder-box" style="left:10px">' +
					'<a class="selector-box" data-key="1">1</a>' +
					'<a class="selector-box" data-key="2">2</a>' +
					'<a class="selector-box" data-key="3">3</a>' +
					'<a class="selector-box" data-key="4">4</a>' +
					'<a class="selector-box" data-key="5">5</a>' +
					'</div>'; 

					
gridTemplate =  
				'<ul class="{{currentElement}}"></ul>';
		
var data = {'currentElement' : 0};			
				


var bindGridsterToElement = function(index) {
	gridster = $(".gridster > ul." + index).gridster(gridConfig).data('gridster');
};	


$('.addBlock').click(function() {

	var html = Mustache.to_html(selecterTemplate)
	$('.sub-wrapper').append(html);
	bindBox();	
});

var bindBox = function() { 
	$('.selector-box').click( function() {

	data.currentElement++;
	var html = Mustache.to_html(gridTemplate, data)
	var numOfElements = parseInt(this.dataset.key);
	var parent = $(this.parentElement)
	parent.removeClass('placeholder-box');
	parent.addClass('gridster')
	parent.html(html)
	$('.sub-wrapper').append(html);
	bindGridsterToElement(data.currentElement);

	$.each(widgets[numOfElements], function(i, widget){
						gridster.add_widget.apply(gridster, widget)  
	});

	$('.' + data.currentElement).find('div').colorPicker();
	
});

};

			
