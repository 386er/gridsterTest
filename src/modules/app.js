
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridCreator',
	'modules/cellBlockController',
	'colorpicker'
], function($,
	Backbone,
	_,
	GridCreator,
	CellBlockController
	) {

	var app = {

		init : function() {

			var gridCreator = new GridCreator();
			
			var cellBlockController = new CellBlockController();
			
		}
	};

	return app;

});