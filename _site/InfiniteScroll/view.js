(function(app){
	function View(id){ 
 		this.theTemplate = Handlebars.compile($("#address-template").html());
	}
	View.prototype.addTemplate=function(data,id){
		var city={
			"cityname":data.city.name,
			"temperature":data.list[0].main.temp,
		};
  		var theCompiledHtml = this.theTemplate(city);
  		$('#'+id).prepend(theCompiledHtml);
  	};
	View.prototype.scrollUsed=function(id,handler){
  			var containerid=$(id);
  			containerid.scroll(function(event) {
  			if((containerid[0].scrollHeight - containerid.scrollTop())<400){
  			handler(event.target);
  			}
  		});
	};
	app.View = View;
 })(window.app);