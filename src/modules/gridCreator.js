
define(['jquery',
	'backbone',
	'underscore',
	'mustache',
	'colorpicker',
	'gridster'
], function($,
	Backbone,
	_,
	Mustache,
	colorpicker,
	Gridster
	) {


	var GridCreator = function() {
		
		var 
			that = {}, my = {};
		
		
		that.gridConfiguration = {
					widget_margins: [5, 6],
					widget_base_dimensions: [100, 55],
					autogenerate_stylesheet: true,
					resize: {
						enabled: true,
						max_size: [8, 8],
						min_size: [1, 1]
						}
		};
		
		
		that.widgets = {

			1 : [
					['<div><i class="cancel-box">x</i></div>', 6, 4]
			],		
			2:  [
					['<div><i class="cancel-box">x</i></div>', 6, 2],
					['<div><i class="cancel-box">x</i></div>', 6, 2]
			],	
			3: [
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 6, 2]
			],
			4:  [
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
			],
			5:  [
					['<div><i class="cancel-box">x</i></div>', 3, 1],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
			]		
		};

		
		that.selecterTemplate = '<div class="placeholder-box" style="left:10px">' +
						'<a class="selector-box" data-key="1">1</a>' +
						'<a class="selector-box" data-key="2">2</a>' +
						'<a class="selector-box" data-key="3">3</a>' +
						'<a class="selector-box" data-key="4">4</a>' +
						'<a class="selector-box" data-key="5">5</a>' +
						'</div>'; 

						
		that.gridTemplate =  '<ul class="{{currentElement}}"></ul>';

		
		that.data = {'currentElement' : 0};			
					

		that.bindGridsterToElement = function(index) {
			that.gridster = $(".gridster > ul." + index).gridster(that.gridConfiguration).data('gridster');
		};	


		that.bindAddButton = function() {
			$('.addBlock').click(function() {

				var html = Mustache.to_html(that.selecterTemplate)
				$('.sub-wrapper').append(html);
				my.bindBox();	
			});		
		};
		
		
		my.bindBox = function() { 
			$('.selector-box').click( function() {

				that.data.currentElement++;
				var html = Mustache.to_html(that.gridTemplate, that.data)
				var numOfElements = parseInt(this.dataset.key);
				var parent = $(this.parentElement)
				parent.removeClass('placeholder-box');
				parent.addClass('gridster')
				parent.html(html)
				$('.sub-wrapper').append(html);
				that.bindGridsterToElement(that.data.currentElement);

				$.each(that.widgets[numOfElements], function(i, widget){
									that.gridster.add_widget.apply(that.gridster, widget)  
				});
				
				$('.cancel-box').click(function() {
					

					
					if(this.parentElement.parentElement.children.length < 2) {

						that.gridster.destroy();
						$(this.parentElement.parentElement.parentElement).fadeOut(1800);
					}
					
					that.gridster.remove_widget(this.parentElement, 10);
					
				});
				
				$('.' + that.data.currentElement).find('div').colorPicker();
				
			});

		};
		
		return that;
			
	};
	
	return GridCreator;
	
});
	
