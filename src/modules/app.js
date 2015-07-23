
define(['jquery',
	'backbone',
	'underscore',
	'modules/gridCreator',
	'colorpicker'
], function($,
	Backbone,
	_,
	GridCreator
	) {

	var app = {

		init : function() {


			var gridCreator = new GridCreator();
			gridCreator.bindAddButton();
			gridCreator.bindFreezeButton();
		}
	};

	return app;

});