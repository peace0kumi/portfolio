/*
$(document).ready(function(){

	var isVisible1 = false;
	var isVisible2 = false;
	var isVisible3 = false;
	var isVisible4 = false;
	var isVisible5 = false;
	var isVisible6 = false;
	var isVisible7 = false;
	var isVisible8 = false;
	var isVisible9 = false;
	var isVisible10 = false;


	$(window).scroll(function(){
	    if (checkVisible($('.post-contents01'))&&!isVisible1) {
	        isVisible1=true;
			setTimeout(function(){
				$(".post-contents01 #typewriter1").css("opacity","1");
				var typer = document.getElementById('typewriter1');
			    typewriter = setupTypewriter(typewriter1);
			    typewriter.type();
		    }, 300);
			setTimeout(function(){
				$(".post-contents01 #typewriter2").css("opacity","1");
				var typer = document.getElementById('typewriter2');
			    typewriter = setupTypewriter(typewriter2);
			    typewriter.type();
		    }, 2300);
	    }
	    if (checkVisible($('.post-contents04 .post-text'))&&!isVisible2) {
	        isVisible2=true;
	        setTimeout(function(){
				$(".post-contents04 .motion_fadeIn").animate({opacity : "1"},3000);
			}, 500);
	    }
	    if (checkVisible($('.post-contents06 .post-text'))&&!isVisible3) {
	        isVisible3=true;
			setTimeout(function(){
				$(".post-contents06 #typewriter3").css("opacity","1");
				var typer = document.getElementById('typewriter3');
			    typewriter = setupTypewriter(typewriter3);
			    typewriter.type();
		    }, 500);
			setTimeout(function(){
				$(".post-contents06 #typewriter4").css("opacity","1");
				var typer = document.getElementById('typewriter4');
			    typewriter = setupTypewriter(typewriter4);
			    typewriter.type();
		    }, 1300);
			setTimeout(function(){
				$(".post-contents06 #typewriter5").css("opacity","1");
				var typer = document.getElementById('typewriter5');
			    typewriter = setupTypewriter(typewriter5);
			    typewriter.type();
		    }, 2200);
			setTimeout(function(){
				$(".post-contents06 #typewriter6").css("opacity","1");
				var typer = document.getElementById('typewriter6');
			    typewriter = setupTypewriter(typewriter6);
			    typewriter.type();
		    }, 3000);
			setTimeout(function(){
				$(".post-contents06 #typewriter7").css("opacity","1");
				var typer = document.getElementById('typewriter7');
			    typewriter = setupTypewriter(typewriter7);
			    typewriter.type();
		    }, 3500);
			setTimeout(function(){
				$(".post-contents06 #typewriter8").css("opacity","1");
				var typer = document.getElementById('typewriter8');
			    typewriter = setupTypewriter(typewriter8);
			    typewriter.type();
		    }, 4200);
	    }
	    if (checkVisible($('.post-contents08 .post-text'))&&!isVisible4) {
	        isVisible4=true;
			setTimeout(function(){
				$(".post-contents08 #typewriter9").css("opacity","1");
				var typer = document.getElementById('typewriter9');
			    typewriter = setupTypewriter(typewriter9);
			    typewriter.type();
		    }, 500);
	    }
	   if (checkVisible($('.post-contents09 .post-text'))&&!isVisible5) {
	        isVisible5=true;
	        setTimeout(function(){
				$(".post-contents09 .motion_fadeIn").animate({opacity : "1"},3000);
			}, 500);
	   }
	   if (checkVisible($('.post-contents09-m-1 .post-text'))&&!isVisible6) {
	        isVisible6=true;
	        setTimeout(function(){
				$(".post-contents09-m-1 .motion_fadeIn").animate({opacity : "1"},3000);
			}, 500);
	   }
	   if (checkVisible($('.post-contents13 .post-text'))&&!isVisible7) {
	        isVisible7=true;
	        setTimeout(function(){
				$(".post-contents13 .motion_fadeIn").animate({opacity : "1"},3000);
			}, 1000);
	   }
	   if (checkVisible($('.post-contents13-m .post-text'))&&!isVisible8) {
	        isVisible8=true;
	        setTimeout(function(){
				$(".post-contents13-m .post-text .motion_fadeIn").animate({opacity : "1"},3000);
			}, 500);
	   }
	   if (checkVisible($('.post-contents13-m .post-text2'))&&!isVisible9) {
	        isVisible9=true;
	        setTimeout(function(){
				$(".post-contents13-m .post-text2 .motion_fadeIn").animate({opacity : "1"},3000);
			}, 800);
	   }
	   if (checkVisible($('.post-contents14 .post-text'))&&!isVisible10) {
	        isVisible10=true;
			setTimeout(function(){
				$(".post-contents14 #typewriter10").css("opacity","1");
				var typer = document.getElementById('typewriter10');
			    typewriter = setupTypewriter(typewriter10);
			    typewriter.type();
		    }, 1000);
			setTimeout(function(){
				$(".post-contents14 #typewriter11").css("opacity","1");
				var typer = document.getElementById('typewriter11');
			    typewriter = setupTypewriter(typewriter11);
			    typewriter.type();
		    }, 1500);
			setTimeout(function(){
				$(".post-contents14 #typewriter12").css("opacity","1");
				var typer = document.getElementById('typewriter12');
			    typewriter = setupTypewriter(typewriter12);
			    typewriter.type();
		    }, 2000);
			setTimeout(function(){
				$(".post-contents14 #typewriter13").css("opacity","1");
				var typer = document.getElementById('typewriter13');
			    typewriter = setupTypewriter(typewriter13);
			    typewriter.type();
		    }, 2500);
	    }
	});

});
function setupTypewriter(t) {
    var HTML = t.innerHTML;
    t.innerHTML = "";
    var cursorPosition = 0, tag = "", writingTag = false, tagOpen = false, typeSpeed = 20, tempTypeSpeed = 0; var type = function() { if (writingTag === true) { tag += HTML[cursorPosition]; } if (HTML[cursorPosition] === "<") { tempTypeSpeed = 0; if (tagOpen) { tagOpen = false; writingTag = true; } else { tag = ""; tagOpen = true; writingTag = true; tag += HTML[cursorPosition]; } } if (!writingTag && tagOpen) { tag.innerHTML += HTML[cursorPosition]; } if (!writingTag && !tagOpen) { if (HTML[cursorPosition] === " ") { tempTypeSpeed = 0; } else { tempTypeSpeed = (Math.random() * typeSpeed) + 50; } t.innerHTML += HTML[cursorPosition]; } if (writingTag === true && HTML[cursorPosition] === ">") { tempTypeSpeed = (Math.random() * typeSpeed) + 50; writingTag = false; if (tagOpen) { var newSpan = document.createElement("span"); t.appendChild(newSpan); newSpan.innerHTML = tag; tag = newSpan.firstChild; } } cursorPosition += 1; if (cursorPosition < HTML.length - 1) { setTimeout(type, tempTypeSpeed); } }; return { type: type };
}
function checkVisible( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();
    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}


/!*
$('.post-header').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/main01.jpg'});
$('.post-contents03').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/main03.jpg'});
$('.post-contents07').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/post-contents07-back.jpg'});
$('.post-contents09').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/main09.jpg'});
$('.post-contents11').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/main11.jpg'});
$('.post-contents09-m').parallax({imageSrc: 'http://promotion.socialmc.co.kr/dongwon/contents/intercon/201902a/img/main09_m.jpg'});
*!/

// swiper1
new Swiper('.swiper1', {
	loop : true,
	navigation : { 
		nextEl : '.swiper-button-next', 
		prevEl : '.swiper-button-prev', 
	},


});

// swiper2
new Swiper('.swiper2', {
	loop : true, 
	autoplay: {delay:2000,},
});

// swiper3
new Swiper('.swiper3', {
	loop : true, 
	navigation : { 
		nextEl : '.swiper-button-next', 
		prevEl : '.swiper-button-prev', 
	},
});


// *공통* 포스트 헤더 카테고리, 타이틀 가져오기
$(document).ready(function(){

var textInfo = $(".post-header .post-header-content .post-info").text();
var textTitle = $(".post-header .post-header-content .post-text").text();
$(".header-post .header-post-title em").html(textInfo);
$(".header-post .header-post-p").html(textTitle);

});*/