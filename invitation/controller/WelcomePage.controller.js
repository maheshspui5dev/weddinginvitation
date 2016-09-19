sap.ui.define([
		"invitation/base/CoreBase"
	],
	function(CoreBase) {
		"use strict";
	return CoreBase.extend("invitation.controller.WelcomePage", {
	onInit: function() {
		var oModel = new sap.ui.model.json.JSONModel();
        // Load JSON in model
        oModel.loadData("invitation/MockData/WelcomePageData.json");
        this.getView().setModel(oModel);
		
		//		sap.ui.getCore().loadLibrary("openui5/googlemaps", "invitation/openui5/googlemaps/");
		
		this.getView().addStyleClass(this._getContentDensityClass());
		jQuery.sap.require("invitation.plugins.yellow.Timeline");
		jQuery.sap.require("invitation.plugins.countDown.countdown");
		
		var oVerticalLayout = this.getView().byId("verticalLayoutId");
		oVerticalLayout.bindAggregation("content" , "/Data" ,jQuery.proxy(this.createContent,this))
		
		
        
        var countDown = this.getView().byId("countDownId");
        
    /*    var coreHtml = new sap.ui.core.HTML({
        	content:'<div  id="countdown"> </div>',
        	afterRendering : this.countDownRedering.bind(this)
        })
        
        countDown.addContent(coreHtml);*/
        
        
	},
	countDownRedering: function(evt){
		
		if(!this.flag){
			this.flag=true;
			var note = $('#note'),
			ts = new Date(2012, 0, 1),
			newYear = true;
		
		if((new Date()) > ts){
			// The new year is here! Count towards something else.
			// Notice the *1000 at the end - time must be in milliseconds
			ts = (new Date()).getTime() + 10*24*60*60*1000;
			newYear = false;
		}
			
		$('#countdown').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				var message = "";
				
				message += days + " day" + ( days==1 ? '':'s' ) + ", ";
				message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
				message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
				message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
				
				if(newYear){
					message += "left until the new year!";
				}
				else {
					message += "left to 10 days from now!";
				}
				
				note.html(message);
			}
		});
			
		}
//		
	},
	createContent: function(sid , context){
		
		var data = context.getObject();
		var coreHtml = new sap.ui.core.HTML({
			
			afterRendering:jQuery.proxy(this.handleHtmlRendering,this)
		});
		var mainStringStart = '<div class="VivaTimeline"><dl>';
		var mainStringEnd   ='</dl></div>';
		//============================================================
		var header  ;
		//==========================================================
		var stringLeftEventStart ;
	          
	     var eachRowStirng="" ;
	     var mainLeftString="" ;
	     var mainRightString="";
		
	     var stringLeftRightEventEnd =' </div> '+  
	    	 	'<div class="events-footer">'+
	    	 	'</div>   '+                            
	    	 '</div></dd>';

	     var stringRightEventStart ;
	     for(var i=0;i<data.length;i++){
	    	 
	    	 if(data[i].Date){
	    		 header = '<dt>'+data[i].Date+'</dt>'  ;
	    	 }
	    	 
	    	 if(data[i].Position==="left"){
	    		 stringLeftEventStart = '<dd class="pos-left clearfix">'+
			      '<div class="circ"></div>'+
			      '<div class="time">'+data[i].Month+'</div>'+
			      '<div class="events">'+
			          '<div class="events-header">'+data[i].HeaderName+'</div>  '+                              
			          '<div class="events-body"> ';
	    		 
	    	 }else{
	    		 stringRightEventStart = '<dd class="pos-right clearfix">'+ 
	 	     	'<div class="circ"></div>'+ 
	 	     	'<div class="time">'+data[i].Month+'</div>'+ 
	 	     	'<div class="events">'+ 
	 	          '<div class="events-header">'+data[i].HeaderName+'</div>'+                                 
	 	          '<div class="events-body">'; 
	 	    
	    	 }
	    	 
	    	 if(data[i].couples){
	    		 var couples=data[i].couples;
	    		 for(var j=0;j<couples.length;j++){
		    		 eachRowStirng = eachRowStirng + '<div class="row">'+
		 	     	'<div class="col-md-6 pull-left">'+
		 	     		'<img class="events-object img-responsive img-rounded" src="'+couples[j].Image+'" />'+                                            
		 	     	'</div>'+
		 	     	'<div class="events-desc">'+
		 	     	'<table>'+
		 	     	'<tr>'+
		 	     	/*'  <th scope="row">Order Date</th>'+*/
		 	        '    <td><b>'+couples[j].Name+'<b></td>'+
		 	        '</tr>'+
		 	        '<tr>'+
		 	         /*'   <th scope="row">Order Number</th>'+*/
		 	          '  <td><a href="#">'+couples[j].Designation+'</a></td>'+
		 	        '</tr>'+
		 	        '<tr>'+
		 	        /* '   <th scope="row">Courier</th>'+*/
		 	            '<td><a href="#">'+couples[j].Company+'</a></td>'+
		 	       ' </tr>'+
		 	      '<tr>'+
		 	        /* '   <th scope="row">Courier</th>'+*/
		 	            '<td> <a href="#">'+couples[j].Education+'</a></td>'+
		 	       ' </tr>'+
		 	        '<tr>'+
		 	          /* ' <th scope="row">Shipping Address</th>'+*/
		 	            '<td><br></td>'+
		 	        '</tr>'+
		 	        '<tr>'+
		 	        /* '   <th scope="row">Billing Address</th>'+*/
		 	          '  <td>'+couples[j].Address+
		 	            '</td>'+
		 	       ' </tr>'+
		 	    '</table>'+
		 	     	'</div>'+
		 	     '</div>';
	    		 }
	    	 }
	    	 
	    	 if(data[i].contactPersons){
	    		 var contactPersons=data[i].contactPersons;
	    		 for(var j=0;j<contactPersons.length;j++){
		    		 eachRowStirng = eachRowStirng + '<div class="row">'+
		 	     	'<div class="col-md-6 pull-left">'+
		 	     		'<img class="events-object img-responsive img-rounded" src="'+contactPersons[j].Image+'" />'+                                            
		 	     	'</div>'+
		 	     	'<div class="events-desc">'+
		 	     	'<table>'+
		 	     	'<tr>'+
		 	     	/*'  <th scope="row">Order Date</th>'+*/
		 	        '    <td><b>'+contactPersons[j].Name+'<br>('+contactPersons[j].Title+')<b></td>'+
		 	        '</tr>'+
		 	        '<tr>'+
		 	         /*'   <th scope="row">Order Number</th>'+*/
		 	          '  <td><a href="#">'+contactPersons[j].Description+'</a></td>'+
		 	        '</tr>'+
		 	        '<tr>'+
		 	        /* '   <th scope="row">Billing Address</th>'+*/
		 	          '  <td>'+contactPersons[j].ContactNumber+
		 	            '</td>'+
		 	       ' </tr>'+
		 	    '</table>'+
		 	     	'</div>'+
		 	     '</div>';
	    		 }
	    	 }
	    	 
	    	 
	    	 if(data[i].receptionVenue){
//	    		 var couples=data[i].couples;
//	    		 for(var j=0;j<couples.length;j++){
		    		 eachRowStirng =  	
		    			 /*'<div class="events-desc">'+
			 	     	'<div class="col-md-6 pull-left2">'+
			 	     		'<img class="events-object2 img-responsive img-rounded" src="invitation/BackgroundImage/a.jpg" />'+                                            
			 	     	'</div>'+
			 	     	
		 	     	'</div>';*/
		    			 '<div class="container">'+
		    		  
		    		'  <div class="document">'+
		    		    
		    		   ' <h1>The Church of Jesus Christ of Latter-Day Saints  </h1>'+
		    		   
		    		   '<div id="wrapper">'+
		    		    '<div class="line"></div>'+
		    		    '<div class="textbox">'+
		    		     ' <div class="text">02 NOV 2016 || 6.30pm </div>'+
		    		   ' </div>'+
		    		   '<div class="line2"></div>'+
		    		 ' </div>'+
		    		  
		    		    '<div class="document__content">'+
		    		      
		    		    '  <p>Try resizing the window to see how the brace will resize with it! The best part is that it only requires one element, and it doesn</p>'+
		    		      
		    		   ' </div>'+
		    		    
		    		 ' </div>'+
		    		  
		    		'</div>';
//	    		 }
	    	 }
	    	 
	    	 if(data[i].weddingVenue){
//	    		 var couples=data[i].couples;
//	    		 for(var j=0;j<couples.length;j++){
		    		 eachRowStirng =  	
		    			 /*'<div class="events-desc">'+
			 	     	'<div class="col-md-6 pull-left2">'+
			 	     		'<img class="events-object2 img-responsive img-rounded" src="invitation/BackgroundImage/a.jpg" />'+                                            
			 	     	'</div>'+
			 	     	
		 	     	'</div>';*/
		    			 '<div class="container">'+
		    		  
		    		'  <div class="document">'+
		    		    
		    		   ' <h1>The Church of Jesus Christ of Latter-Day Saints  </h1>'+
		    		   
		    		   '<div id="wrapper">'+
		    		    '<div class="line"></div>'+
		    		    '<div class="textbox">'+
		    		     ' <div class="text">02 NOV 2016 || 6.30pm </div>'+
		    		   ' </div>'+
		    		   '<div class="line2"></div>'+
		    		 ' </div>'+
		    		  
		    		    '<div class="document__content">'+
		    		      
		    		    '  <p>Try resizing the window to see how the brace will resize with it! The best part is that it only requires one element, and it doesn</p>'+
		    		      
		    		   ' </div>'+
		    		    
		    		 ' </div>'+
		    		  
		    		'</div>';
	    	 }
	    	 
	    	 
	    	 if(stringLeftEventStart){
	    		 mainStringStart = mainStringStart + header+stringLeftEventStart+eachRowStirng+stringLeftRightEventEnd;
	    		 eachRowStirng ="";
	    		 header="";
	    		 stringLeftEventStart="";
	    	 }
	    	 if(stringRightEventStart){
	    		 mainStringStart = mainStringStart + header+stringRightEventStart+eachRowStirng+stringLeftRightEventEnd;
	    		 eachRowStirng ="";
	    		 header="";
	    		 stringRightEventStart="";
	    	 }
	     }
	     
	     return coreHtml.setContent(mainStringStart+mainStringEnd);
	},
	handleHtmlRendering: function(){
		$('.VivaTimeline').vivaTimeline({
			  carousel: true,
			  carouselTime: 30000000
			});
	}
});
});