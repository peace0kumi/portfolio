$(document).ready(function(){
    var isVisible1 = false;
    var isVisible2 = false;
    var isVisible3 = false;
    var isVisible4 = false;
    var isVisible5 = false;
    var isVisible6 = false;

    if (checkVisible($('.post-contents.primary')) && !isVisible1) {
        isVisible1=true;
        setTimeout(function () {
            $(".post-contents.primary #typewriter1").css("opacity", "1");
            var typer = document.getElementById('typewriter1');
            typewriter = setupTypewriter(typewriter1);
            typewriter.type();
        }, 250);
    }
    $(window).scroll(function(){
        if (checkVisible($('.post-contents.primary')) && !isVisible1) {
            isVisible1=true;
            setTimeout(function () {
                $(".post-contents.primary #typewriter1").css("opacity", "1");
                var typer = document.getElementById('typewriter1');
                typewriter = setupTypewriter(typewriter1);
                typewriter.type();
            }, 250);
        }
        if (checkVisible($('.post-contents.episode-first')) && !isVisible2) {
            isVisible2=true;
            setTimeout(function () {
                $(".post-contents.episode-first #typewriter2").css("opacity", "1");
                var typer = document.getElementById('typewriter2');
                typewriter = setupTypewriter(typewriter2);
                typewriter.type();
            }, 500);
        }
        if (checkVisible($('.post-contents.secondary')) && !isVisible3) {
            isVisible3=true;
            setTimeout(function () {
                $(".post-contents.secondary #typewriter3").css("opacity", "1");
                var typer = document.getElementById('typewriter3');
                typewriter = setupTypewriter(typewriter3);
                typewriter.type();
            }, 500);
        }
        if (checkVisible($('.post-contents.has-slider')) && !isVisible4) {
            isVisible4=true;
            setTimeout(function () {
                $(".post-contents.has-slider #typewriter4").css("opacity", "1");
                var typer = document.getElementById('typewriter4');
                typewriter = setupTypewriter(typewriter4);
                typewriter.type();
            }, 500);
            setTimeout(function () {
                $(".post-contents.has-slider #typewriter5").css("opacity", "1");
                var typer = document.getElementById('typewriter5');
                typewriter = setupTypewriter(typewriter5);
                typewriter.type();
            }, 500);
        }
        if (checkVisible($('.post-contents.final')) && !isVisible5) {
            isVisible5=true;
            setTimeout(function () {
                $(".post-contents.final #typewriter6").css("opacity", "1");
                var typer = document.getElementById('typewriter6');
                typewriter = setupTypewriter(typewriter6);
                typewriter.type();
            }, 400);
            setTimeout(function () {
                $(".post-contents.final #typewriter7").css("opacity", "1");
                var typer = document.getElementById('typewriter7');
                typewriter = setupTypewriter(typewriter7);
                typewriter.type();
            }, 2600);
        }
        if (checkVisible($('.post-contents.final')) && !isVisible6) {
            isVisible6=true;
            setTimeout(function () {
                $(".post-contents.final #typewriter8").css("opacity", "1");
                var typer = document.getElementById('typewriter8');
                typewriter = setupTypewriter(typewriter8);
                typewriter.type();
            }, 400);
            setTimeout(function () {
                $(".post-contents.final #typewriter9").css("opacity", "1");
                var typer = document.getElementById('typewriter9');
                typewriter = setupTypewriter(typewriter9);
                typewriter.type();
            }, 2600);
        }
    });

    // typewriter
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

    // parallax
    new universalParallax().init({
        speed: 4
    });

    // swiper
    var swiper = new Swiper ('.swiper1', {
        loop: true,
        navigation : {
            nextEl : '.swiper-button-next',
            prevEl : '.swiper-button-prev',
        },
    });
    var swiper = new Swiper ('.swiper2', {
        loop: true,
        autoplay: true
    });
});