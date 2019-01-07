;(function() {
    /*
    How to use the plugin:

    // Initialize
    var txt = new TextFx(this.el.querySelector('.title'));

    // Show letters:
    // txt.show([effect] [,callback]);
    // If nothing is passed, then no animation.
    // ´effect´ can either be one of the predefined effects: ['fx1',...,'fx17'] or a object literal representing both in and out animations (anime.js based):
    // example:
    effect = {
        in: {
            duration: 500,
            delay: function(el, index) {
                return 250+index*40;
            },
            easing: 'easeOutExpo',
            opacity: 1,
            translateY: ['50%','0%']
        },
        out: {
            duration: 500,
            delay: function(el, index) {
                return index*40;
            },
            easing: 'easeOutExpo',
            opacity: 0,
            translateY: '-50%'
        }
    }
    // ´callback´ is the callback function, after all the letters finish the animation.

    // Hide letters:
    // txt.hide([effect] [,callback]); (same logic of show)
     */

    // For demo purposes only:
    // Let´s build a simple slideshow to exemplify the TextFx plugin:

    // Body element.
    var bodyEl = document.body;
    // Preload all images..

    // Slide obj: each Slideshow´s slide will contain the HTML element and the instance of TextFx.
    var Slide = function(el) {
            this.el = el;
            this.txt = new TextFx(this.el.querySelector('.title'));
        },
        // The Slideshow obj.
        Slideshow = function(el) {
            this.el = el;
            this.current = 0;
            this.slides = [];
            var self = this;
            [].slice.call(this.el.querySelectorAll('.slide')).forEach(function(slide) {
                self.slides.push(new Slide(slide));
            });
            this.slidesTotal = this.slides.length;
            this.effect = this.el.getAttribute('data-effect');
        };

    Slideshow.prototype._navigate = function(direction) {
        if( this.isAnimating ) {
            return false;
        }
        this.isAnimating = true;

        var self = this, currentSlide = this.slides[this.current];

        this.current = direction === 'next' ? (this.current < this.slidesTotal - 1 ? this.current + 1 : 0) : (this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1);
        var nextSlide = this.slides[this.current];

        var checkEndCnt = 0, checkEnd = function() {
            ++checkEndCnt;
            if( checkEndCnt === 2 ) {
                currentSlide.el.classList.remove('slide--current');
                nextSlide.el.classList.add('slide--current');
                self.isAnimating = false;
            }
        };

        // Call the TextFx hide method and pass the effect string defined in the data-effect attribute of the Slideshow element.
        currentSlide.txt.hide(this.effect, function() {
            currentSlide.el.style.opacity = 0;
            checkEnd();
        });
        // First hide the next slide´s TextFx text.
        nextSlide.txt.hide();
        nextSlide.el.style.opacity = 1;
        // And now call the TextFx show method.
        nextSlide.txt.show(this.effect, function() {
            checkEnd();
        });
    };

    Slideshow.prototype.next = function() { this._navigate('next'); };
    Slideshow.prototype.prev = function() { this._navigate('prev');	};

    function getDecoColor(pos) {
        switch(pos) {
            case 0 : return '#d9d9e0'; break;
            case 2 : return '#171412'; break;
            case 6 : return '#87d6b5'; break;
            case 11 : return '#CBD6CB'; break;
            case 13 : return '#F1D50E'; break;
            case 14 : return '#52CA67'; break;
            default : return '#fff'; break;
        };
    }

    [].slice.call(document.querySelectorAll('.content')).forEach(function(el, pos) {
        var slideshow = new Slideshow(el.querySelector('.slideshow'));
        el.querySelector('.actions').firstElementChild.addEventListener('click', function() { slideshow.prev(); });
        el.querySelector('.actions').lastElementChild.addEventListener('click', function() { slideshow.next(); });

/*        if( pos === 0 || pos === 2 || pos === 6 || pos === 11 || pos === 13 || pos === 14 ) {
            var decoColor = getDecoColor(pos);
            new LineMaker({
                parent: {element: el, position: 'prepend'},
                lines: pos % 2 === 0 ? [
                    {top: 0, left: '6%', width: 1, height: 'auto', color: decoColor},
                    {top: 0, left: '26%', width: 1, height: 'auto', color: decoColor},
                    {top: 0, left: '46%', width: 1, height: 'auto', color: decoColor},
                    {top: 0, left: '66%', width: 1, height: 'auto', color: decoColor},
                    {top: 0, left: '86%', width: 1, height: 'auto', color: decoColor}
                ] : [
                    {top: '20%', left: 0, width: '100vw', height: 1, color: decoColor},
                    {top: '40%', left: 0, width: '100vw', height: 1, color: decoColor},
                    {top: '60%', left: 0, width: '100vw', height: 1, color: decoColor},
                    {top: '80%', left: 0, width: '100vw', height: 1, color: decoColor}
                ]
            });
        }*/
    });
})();