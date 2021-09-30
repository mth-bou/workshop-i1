var currentWindowSize800 = is800();
var currentWindowSize600 = is600();

$(window).on('load', function(){

	hideTrace();

	if(is800()){

		animateCircleBigTrace800();
		setTimeout(animateBigTrace800, 500);
	
	}else if(is600()){
		animateCircleBigTrace600();
		setTimeout(animateBigTrace600, 500);

	}else{
		animateCircleTrace();
	}
});

$(window).on('resize', function(){

	if(!currentWindowSize800 && !currentWindowSize600 && is800()){
		hideTrace();
		animateCircleBigTrace800();
		setTimeout(animateBigTrace800, 500);

	}else if(!currentWindowSize800 && !currentWindowSize600 && is600()){
		hideTrace();
		animateCircleBigTrace600()
		setTimeout(animateBigTrace600, 500);

	}else if((currentWindowSize800 || currentWindowSize600) && !is800() && !is600()){
		hideTrace();
		animateCircleTrace();
	}

	if(is600()){
		$('.big-trace .circle').stop();
		animateCircleBigTrace600()
	}else if(is800()){
		$('.big-trace .circle').stop();
		animateCircleBigTrace800()
	}else{
		$('.trace-wrapper').stop();
		$('.big-trace .circle').stop();
		$('.big-trace .circle').css({height: '0px', width:'0px'})
	}

	currentWindowSize800 = is800();
	currentWindowSize600 = is600();
});	

function animateBigTrace600(){
	$('.trace-wrapper').css('display', 'block').animate({height:'50px'}, {queue:false, duration:500}).delay(400).animate({width: '93px'},{queue:false, duration:2000})
	setTimeout(function(){
		$('.trace-wrapper').animate({height:'900px'}, {queue:false, duration:5000});
	},1500)
}

function animateBigTrace800(){
	$('.trace-wrapper').css('display', 'block').animate({height:'160px'}, {queue:false, duration:500}).delay(400).animate({width: '130px'},{queue:false, duration:1500})
	setTimeout(function(){
		$('.trace-wrapper').animate({height:'1200px'}, {queue:false, duration:4500});
	},1000)
}

function hideTrace(){
	$('.trace-wrapper ').hide().css({height:'0', width:'0'});
}

function animateTrace(){
	$('.trait-wrapper').css('display', 'block').animate({height:'100px', width:'30px'}, 600).animate({width:500},400).animate({height:'1000px'}, 3000);
}

function animateCircleTrace(){
	$('.trace .circle').animate({width: '18px', height:'18px'},400)
}

function animateCircleBigTrace800(){
	$('.big-trace .circle').animate({width: '18px', height:'18px'},400)
}
function animateCircleBigTrace600(){
	$('.big-trace .circle').animate({width: '9px', height:'9px'},400)
}

function adaptSize(){
	if(currentWindowSize <= 800 && currentWindowSize > 600){
		animateCircleBigTrace800();
		
	}else if(currentWindowSize <= 600){

		animateCircleBigTrace600();

	}else if(currentWindowSize > 800){
		
		animateCircleTrace();
	}
}

function is600(){
	if($('.is600').css('display') == 'block'){
		return true;
	}else{
		return false;
	}
}

function is800(){
	if($('.is800').css('display') == 'block'){
		return true;
	}else{
		return false;
	}
}


