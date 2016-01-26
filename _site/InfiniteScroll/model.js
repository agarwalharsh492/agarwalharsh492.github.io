(function(w){
	function Model(id){
	}
	Model.prototype.fetchData=function(city)
	{
		return $.ajax({
					url: 'http://api.openweathermap.org/data/2.5/forecast/city?q='+city+'&units=metric&APPID=b9e16dc4271bb26852d5af63e37c4218',
				});
	};
	w.app=w.app||{};
	app.Model = Model;
})(window);