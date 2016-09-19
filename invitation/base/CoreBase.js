sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	function(Controller) {
		"use strict";
		return Controller.extend("invitation.base.CoreBase", {

			onInit : function() {
			
			},

			_getContentDensityClass: function() {
				if (!this._sContentDensityClass) {
					if (!sap.ui.Device.support.touch) {
						this._sContentDensityClass = "sapUiSizeCompact";
					} else {
						this._sContentDensityClass = "sapUiSizeCozy";
					}
				}
				return this._sContentDensityClass;
			}
			
		});
	});