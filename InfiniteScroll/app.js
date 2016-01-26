(function(w){
	function main(id){
		this.model=new w.app.Model(id);
		this.view=new w.app.View(id);
		this.controller=new w.app.Controller(this.model,this.view,id);
	}
	var home1=new main("#Bangalore");
	var home2=new main("#Jaipur");
})(window);