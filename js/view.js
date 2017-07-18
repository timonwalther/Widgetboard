	var view;

	view =  new function () {
		
		//constants
		this.DivWidgetStyleInit = 'background:gray;' 
						+ 'min-width:300px;' 
						+ 'min-height:250px;' 
						+ 'height:auto;'
						+ 'width:auto;'  
						+ 'float:left;' 
						+ 'margin-left:20px;'
						+ 'margin-top:20px;'
						+ 'padding:5px;';

		this.DivWidgetStyleActive = 'background:#2F302B;' 
						+	'min-width:300px;'
						+	'min-height:250px;'	
						+	'height:auto;'  
						+	'width:auto;' 
						+	'float:left;'	
						+	'margin-left:20px;' 
						+	'margin-top:20px;'
						+	'padding:5px;'	
						+	'border: 2px solid #0CDA9C';
						
		
		this.changeWidgetName 	= function (id) {
		
			var span = document.getElementById(id).firstChild; 
			document.getElementById('change').style.display = 'block';
		}	
		
		this.delWidget 			= function (id) {
			
			var node = document.getElementById(id);
			var span = document.getElementById('number'); 
		
			if (span.innerHTML != "none") 
			{ 
				if (span.innerHTML == id) 
				{
					span.innerHTML = "none";
					document.getElementById("sources").style.display = 'none';
					document.getElementById("representations").style.display = 'none';
				}
			}	

			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}	
		
		
		this.add = function (_this) {
			
			//get current number for id
			var ancher 		= _this;
			var buildId 	= parseInt(ancher.getAttribute('count')) + 1;
			ancher.removeAttribute('count');
			ancher.setAttribute('count', buildId);	
		
			//create element with new id
			var nodeDiv = document.createElement("DIV");        
			nodeDiv.innerHTML = 
				+ "<div active='false' style='float:left'>"    
				+ "<span> Widget " + buildId + "</span>"
				+ "</div>"
				+ "<div style='float:right;'>"
				+ "<a href='#' id='" + buildId + "' onclick='view.activeWidget(this.id)'>"
				+ "<span id='glyph"  + buildId + "' class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span></a>"
				
				+ "<span>&nbsp;</span>"
				+ "<a href='#' onclick='view.changeWidgetName(this.parentNode.parentNode.id)'><span class='glyphicon glyphicon-wrench' aria-hidden='true'></span></a>"   
				+ "<a href='#' onclick='view.delWidget(this.parentNode.parentNode.id)'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></a></div>"
				+ "<div style='clear:both'></div></div>";
		
				nodeDiv.setAttribute('style', view.DivWidgetStyleInit);
				nodeDiv.setAttribute('id', buildId); 
				document.getElementById("con").appendChild(nodeDiv); 
		}
		
		
		
		 this.addComponent = function(component) {

			var temp = "";
			var widgetId  = document.getElementById('number').innerHTML;

			if (document.getElementById('comp' + widgetId) != null) {
				var oldWidget = document.getElementById('comp' + widgetId);
				if (oldWidget.parentNode) 
				oldWidget.parentNode.removeChild(oldWidget);
			}	
	    
			switch (component) {
	
				case 'chartBar': temp =  "<chart-bar width=\"400\" height=\"200\" labels=\"['Jan','Feb','Mar','Apr','May','Jun','Jul']\","
				+"values=\"[[65,59,90,81,56,55,40], [28,48,40,19,96,27,100]]\""
				+"colors=\"['253,180,92','247,70,74','70,191,189','148,159,177','77,83,96']\"></chart-bar>"; break;	
	
				case 'chartLine': temp = "<span id='comp" + widgetId + "'> <chart-line width='400' height='200'"
				+ "labels=\"['Monday','Tuesday','Wednesday','thursday','Friday','Saturday','Sunday']\""
				+ "values='[[10,14,20,25,13,9,40]]'"
				+ "colors=\"['253,180,92','247,70,74','70,191,189','148,159,177','77,83,96']\"></chart-line></span>"; break;
		
				case 'chartPie': temp = "<span id='comp" + widgetId + "'><chart-pie width='200' height='200' values='[20, 30, 100]'></chart-pie></span>"; break;
			
				case 'chartRadar': temp = "<span id='comp" + widgetId + "'><chart-radar labels=\"['Jan','Feb','Mar','Apr','May','Jun','Jul']\""
				+" values='[[65,59,90,81,56,55,40], [28,48,40,19,96,27,100]]',"
				+ "colors= \"['253,180,92','247,70,74','70,191,189','148,159,177','77,83,96']\">"
				+ "</chart-radar></span>"; break;

				case 'chartDoughnut': temp = "<span id='comp" + widgetId + "'><chart-doughnut width='200' height='200' values='[30, 50, 100, 40, 120]'></chart-doughnut></span>"; break;

				case 'chartPolarArea': temp = "<span id='comp" + widgetId + "'><chart-polar-area width='200' height='200' values='[30, 90, 18, 58, 82]'></chart-polar-area></span>"; break;	
					
				case 'chartBar': temp = ''; break;
			}
		
			var widget     = document.getElementById(widgetId);
			var oldContent = widget.innerHTML;
	
			document.getElementById(widgetId).innerHTML = oldContent + temp; 
		}//end addComponent
	
	
		//toogle the active widgets 
		 this.activeWidget 	=	function(id) {
		
			var src    = document.getElementById("sources");
			var rep    = document.getElementById("representations");
		
			//wenn ein Widget aktiv wird werden die Menues Rep und Src sichtbar
			src.style.display = 'block';
			rep.style.display = 'block';
		
			var span   = document.getElementById('number');
			var oldId  = span.innerHTML;
		
			//das aktive Widget wird auch so angezeigt
			if (span.innerHTML != "none") {
				var oldActiveDiv = document.getElementById(oldId);
				var oldGlyph = document.getElementById('glyph'+oldId);
				oldGlyph.removeAttribute('class');
				oldGlyph.setAttribute('class','glyphicon glyphicon-ok-circle');
				oldActiveDiv.removeAttribute('style');
				oldActiveDiv.setAttribute('style', view.DivWidgetStyleInit);
			}
		
		var glyph = document.getElementById('glyph' + id);
		
		//das Steuerelement des Widgets ändert sich
	    if (glyph.getAttribute('class') == 'glyphicon glyphicon-ok-circle') {
			glyph.removeAttribute('class');
			glyph.setAttribute('class','glyphicon glyphicon-remove-circle');
		} 
		//das Widget ändert seine Farbe und Rahmen bei Aktivität
		var div = document.getElementById(id);
		div.removeAttribute('style');
		div.setAttribute('style',view.DivWidgetStyleActive);
		
		var span = document.getElementById('number');
		span.innerHTML = id;
	}
		
}//end object view 
	
	
