
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
		
		
		that.el ='.wrapper';

		that.gridsterConfiguration = {
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
			'click .freeze-block': 'bindFreezeButton',
			'click .cancel-box': 'bindCancelButton',
			'mouseover .gs-w': 'showCancelButton',
			'mouseleave .gs-w': 'hideCancelButton',
			'click .selector-box': 'bindBox'
		};
		
		that.widgetsConfiguration = {

			1 : [
					[6, 3]
			],

			2:  [
					[6, 2],
					[6, 1]
			],

			3: [
					[3, 2],
					[3, 2],
					[6, 1]
			],

			4:  [
					[3, 2],
					[3, 2],
					[3, 1],
					[3, 1],
			],

			5:  [
					[3, 1],
					[1, 3],
					[1, 3],
					[1, 3],
					[3, 2]
			]	
		};

		that.widgetTemplate = '<div><i class="hidden cancel-box fa fa-times"></i></div>';

		
		that.selecterTemplate = 
						'<div class="placeholder-box" style="left:10px">' +
							'<div class="button-wrapper">' +
								'<a class="selector-box" data-key="1">1</a>' +
								'<a class="selector-box" data-key="2">2</a>' +
								'<a class="selector-box" data-key="3">3</a>' +
								'<a class="selector-box" data-key="4">4</a>' +
								'<a class="selector-box" data-key="5">5</a>' +
							'</div>' +
						'</div>'; 

						
		that.gridTemplate =  '<ul class="{{currentElement}}"></ul>';

		
		that.data = {'currentElement' : 0};

		that.showCancelButton = function(event) {
			$(event.target).find('.cancel-box').removeClass('hidden');
		};
		

		that.hideCancelButton = function(event) {
			$(event.target).find('.cancel-box').addClass('hidden');
		};			

		that.bindGridsterToElement = function(index) {
			that.gridster[index] = $(".gridster > ul." + index).gridster(that.gridsterConfiguration).data('gridster');
		};	


		that.bindAddButton = function() {
			var html = Mustache.to_html(that.selecterTemplate)
			that.$el.find('.sub-wrapper').append(html);
		};
		
		
		that.bindFreezeButton = function() {

			if ( !$('.gridster').length) {
				return;
			}

			that.$el.off();
			that.$el.find('.placeholder-box').remove();
			$('.gridster').find('span').toggleClass('hidden');
			$('.gridster').find('div').toggleClass('no-hover');
			$(document.body).off('dblclick');
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
		
		
		that.bindCancelButton = function(event) {
				var 
					ul = $(event.target).parents('ul'),
					i = parseInt(ul.attr('class')),
					numOfBlocks = that.$el.find('.gridster').length;
				
				if (ul.children().length < 2) {
					that.gridster[i].destroy();
					ul.parents('.gridster').fadeOut(10).remove();

					if (numOfBlocks < 2){
						that.$el.find('.freeze-block').addClass('locked');
					}

					return;
				}

				that.gridster[i].remove_widget(event.target.parentElement, 10);		
		};
		
		
		that.bindBox = function(event) { 

			that.data.currentElement += 1;
			
			var
				index = that.data.currentElement,
				html = Mustache.to_html(that.gridTemplate, that.data),
				numOfElements = parseInt(event.target.dataset.key),
				parent = $(event.target.parentElement.parentElement);
				
			parent.removeClass('placeholder-box');
			parent.addClass('gridster')
			parent.html(html)
			that.bindGridsterToElement(index);

			$.each(that.widgetsConfiguration[numOfElements], function(i, widget){
				widget = [that.widgetTemplate].concat(widget)
				that.gridster[index].add_widget.apply(that.gridster[index], widget)  
			});
				
			$('.' + index).find('div').colorPicker();

			if( $('.freeze-block').hasClass('locked')) {
				$('.freeze-block').removeClass('locked');
			}

		};
		
		
		that = new (Backbone.View.extend(that))();
		
		return that;
	};
	
	return GridCreator;
	
});
	
