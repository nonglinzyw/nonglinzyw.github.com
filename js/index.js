
//广告轮番图
function Slide(wrapper){
	this.items = wrapper.find('.itemsWrapper');
	this.indexs = wrapper.find('.itemsIndex');
	this.init();
}
Slide.prototype = {
	init:function(){
		this.autoPlay(0);
		this.bindEvent();
	},
	autoPlay:function(i){
		var i = i,items = this.items,indexs = this.indexs;
		this.ap = setInterval(function(){
			if(i<5){
				items.find('.item').eq(i).show().siblings().hide();
				indexs.find('span').eq(i).addClass('on').siblings().removeClass('on');
				i++;
			}else{
				i = 0;
			}
		},4000);
	},
	pause:function(){
		clearInterval(this.ap);
	},
	bindEvent:function(){
		var self = this,span = self.indexs.find('span');
		span.each(function(i){
			$(this).hover(function(){
				self.pause();
				$(this).addClass('on').siblings().removeClass('on');
				self.items.find('.item').hide().eq(i).show();
			},function(){
				self.autoPlay(i);
			});
		});
	}
};
//产品展示
function Carousel(elm,pages){
	this.carousel = $(elm);
	this.carouseItmeWrapper = this.carousel.find('.carouseItmeWrapper'); 
	this.pages = pages;
	this.init();
}
Carousel.prototype = {
	init:function(){
		this.currentPosition = 0;
		this.getReady();
		this.bindEvent();
	},
	getReady:function(){
		var total = this.pages * 5,
		item = this.carousel.find('.item').eq(3).clone(),
		newitems = '';
		for(var i = 6;i<=total;i++){
			newitems += this.outhtml(item).replace(/\d\./g,i+'.');
		}
		this.carouseItmeWrapper.append(newitems).css('width',total*190);					
	},
	outhtml:function(dom){
		return $('<div/>').append(dom).html();
	},
	bindEvent:function(){
		var self = this,nexBtn = this.carousel.find('.next'),prevBtn = this.carousel.find('.prev');					
		var currentPage = 0;
		nexBtn.click(function(){						
			if(currentPage<self.pages-1){
				self.next();
				++currentPage;
			}
		});
		prevBtn.click(function(){					
			if(currentPage > 0){
				--currentPage;
				self.prev();
			}
		});
		$('.item','.carouselContent').hover(function(){			
			$(this).find('p').animate({'top':'-60px'},200);
		},function(){
			$(this).find('p').animate({'top':'0px'},200);
		});
	},
	next:function(){
		this.currentPosition += -930;
		this.move(this.currentPosition);					
	},
	prev:function(){
		this.currentPosition += 930;
		this.move(this.currentPosition);
	},
	move:function(position){
		this.carouseItmeWrapper.animate({'left':position+'px'},100);
	}
};

$(function(){
	new Carousel('.carousel',3);
	new Slide($('.slideWrapper'));
});
