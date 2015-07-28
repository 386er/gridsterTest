
define(['jquery',
	'backbone',
	'underscore',
	'd3',
	'modules/cellBlockView',
	'modules/cellBlockCollection'
], function($,
	Backbone,
	_,
	d3,
	CellBlockView,
	CellBlockCollection
	) {

	var CellBlockController = function() {

		var that = {};
		
		
		that.initialize = function() {
		
/* 			that.cellBlockCollection = new CellBlockCollection()
			that.cellBlockCollection.assignProperties({
				width: 970,
				height: 500,
				cellSize: 15,
				colors: []
			});
			that.cellBlockView = new CellBlockView();
			that.cellBlockView.assignCollection(that.cellBlockCollection); */
		};
		
		
		that.getAllBlocks = function() {
			
			var selection = d3.selectAll('.gs-w');
			
			selection[0].forEach(function(element) {
				
				var
					className = element.classList[0],
					$element = $(element),
					height = $element.height(),
					width = $element.width(),
					color = $element.css('background-color'),
					bright = d3.rgb(color).brighter().toString(),
					dark = d3.rgb(color).darker().toString();
				
				var collection = new CellBlockCollection();
				var view = new CellBlockView({el: '.' + className})
				
				collection.assignProperties({
					width: width,
					height: height,
					cellSize: 15,
					colors: [bright, dark]
				});
				
				view.assignCollection(collection);
				
				view.render();
				
			})

			

			
		};
		

		that.render =  function() {
			
				
			that.cellBlockView.render();
			console.log(that.cellBlockCollection.models);

			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeColorOfACell();}, 1);
			window.setInterval(function(){that.cellBlockView.changeBackgroundColor();}, 1500);
			window.setInterval(function(){that.cellBlockView.moveCell('x');}, 50);
			window.setInterval(function(){that.cellBlockView.moveCell('y');}, 50);
		}
		
		return that;
		
	};

	return CellBlockController;

});