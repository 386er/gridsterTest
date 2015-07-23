
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
		
		
		that.el ='.wrapper'
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
		
		that.gridster = {};
		
		that.events = {
			'click .addBlock': 'bindAddButton',
			'click .freeze-block': 'bindFreezeButton'
		};
		
		that.widgets = {

			1 : [
					['<div><i class="cancel-box">x</i></div>', 6, 3]
			],		
			2:  [
					['<div><i class="cancel-box">x</i></div>', 6, 2],
					['<div><i class="cancel-box">x</i></div>', 6, 1]
			],	
			3: [
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 6, 1]
			],
			4:  [
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
					['<div><i class="cancel-box">x</i></div>', 3, 1],
					['<div><i class="cancel-box">x</i></div>', 3, 1],
			],
			5:  [
					['<div><i class="cancel-box">x</i></div>', 3, 1],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 1, 3],
					['<div><i class="cancel-box">x</i></div>', 3, 2],
			]		
		};
		
		
		that.call = function() {
			
			console.log('peter')
			
		}

		
		that.selecterTemplate = 
						'<div class="placeholder-box" style="left:10px">' +
						'<a class="selector-box" data-key="1">1</a>' +
						'<a class="selector-box" data-key="2">2</a>' +
						'<a class="selector-box" data-key="3">3</a>' +
						'<a class="selector-box" data-key="4">4</a>' +
						'<a class="selector-box" data-key="5">5</a>' +
						'</div>'; 

						
		that.gridTemplate =  '<ul class="{{currentElement}}"></ul>';

		
		that.data = {'currentElement' : 0};			
					

		that.bindGridsterToElement = function(index) {
			that.gridster[index] = $(".gridster > ul." + index).gridster(that.gridConfiguration).data('gridster');
		};	


		that.bindAddButton = function() {
			var html = Mustache.to_html(that.selecterTemplate)
			that.$el.find('.sub-wrapper').append(html);
			my.bindBox();	
		};
		
		
		that.bindFreezeButton = function() {

				$('.gridster').find('.cancel-box').toggleClass('hidden');
				$('.gridster').find('span').toggleClass('hidden');
				$('.gridster').find('div').toggleClass('no-hover');
				$('.gridster').find('div').off('dblclick change');
				$('.addBlock').toggleClass('hidden');
				$('.freeze-block').toggleClass('hidden');
				$('.gridster ul').css({'background-color':'transparent'});
				
				var keys = _.keys(that.gridster);
				keys.forEach(function(key){
					if (that.gridster[key] !== undefined) {
						that.gridster[key].disable();
					}
				})
		};
		
		
		my.bindCancelButton = function() {
			$('.cancel-box').click(function() {		
				var 
					ul = $(this).parents('ul'),
					i = parseInt(ul.attr('class'));
				
				if (ul.children().length < 2) {
					that.gridster[i].destroy();
					ul.parents('.gridster').fadeOut(10);
					return;
				}
				that.gridster[i].remove_widget(this.parentElement, 10);	
			});			
		};
		
		
		my.bindBox = function() { 
			$('.selector-box').click( function() {

				that.data.currentElement += 1;
				
				var
					index = that.data.currentElement,
					html = Mustache.to_html(that.gridTemplate, that.data),
					numOfElements = parseInt(this.dataset.key),
					parent = $(this.parentElement);
					
				parent.removeClass('placeholder-box');
				parent.addClass('gridster')
				parent.html(html)
				that.bindGridsterToElement(index);

				$.each(that.widgets[numOfElements], function(i, widget){
					that.gridster[index].add_widget.apply(that.gridster[index], widget)  
				});
				
				my.bindCancelButton();
			
				$('.' + index).find('div').colorPicker();
				
			});

		};
		
		that = new (Backbone.View.extend(that))();
		return that;
			
	};
	
	return GridCreator;
	
});
	
