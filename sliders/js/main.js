(function (w){
	function Main(id,step){
		this.slider = new w.my.Slider(id,step);
	}
	var t1 = new Main("#first",1),
		t2 = new Main("#second",2);
		t3 = new Main("#third",3);
})(window);
