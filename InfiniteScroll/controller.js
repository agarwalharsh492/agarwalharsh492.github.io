(function(app){
	function Controller(model,view,id){
		this.model=model;
		this.view=view;
		self=this;
		this.id=id;
		this.dataRequired(id);
		this.view.scrollUsed(id,function(cityid){
			self.dataRequired(cityid);
		});
	}
	Controller.prototype.dataRequired=function(cityid){
		var city=$(cityid).attr('id');
		for(var i=0;i<8;i++){
			var promise=this.model.fetchData(city);
			promise.done(function(data){
				self.view.addTemplate(data,city);
			});
		}
	};
	app.Controller=Controller;
})(window.app);