(function (w) {
	function Slider (id,step){
		this.container = $(id);
		this.$sliderUl = this.container.find('.slider');
		this.$imgs= this.$sliderUl.find('img');
		this.$nav = this.container.find('.nav');
		this.imgWidth = this.$imgs[0].width;
		this.len = this.$imgs.length;
		var self = this;
		this.$nav.find('button').on('click',function(){
			var direction = $(this).data('dir'),
				marginStr = $(this).closest('div').prev().find(".slider").css("margin-left"),
				margin = parseInt(marginStr,"10"),
				loc = self.imgWidth,
				current = (margin/-loc)+1,
				len=Math.ceil(self.len/step),
				totalWidth = len*loc;
			(direction === 'next') ? ++current : --current;
			if(margin%loc === 0){
				if(current <= 0){
					current = len;
					direction = 'next';
					loc = totalWidth-self.imgWidth;
				}
				else if(current - step >= len){
					current =1;
					loc=0;
				}
				self.transition(self.$sliderUl,loc,direction,step);
			}
		});
	};
	Slider.prototype.transition = function(ul,loc,direction,step){
		var unit;
		if(direction && loc!=0){
			unit = (direction == 'next') ? "-=" : "+=";
		}
		ul.animate({
			'margin-left' : unit ? ( unit + loc*step ) : loc
		});
	};
	w.my = {};
	my.Slider = Slider;
})(window);