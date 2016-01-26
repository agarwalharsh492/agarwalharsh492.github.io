(function(w){
	function Main(id){
		this.model = new w.app.Model();
		this.view=new w.app.View(id);
		this.controller=new w.app.Controller(this.view,this.model);
	}
	var home=new Main('#container');
})(window);