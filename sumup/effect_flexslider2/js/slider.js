/**
 * slider插件可悬停控制
 */
; (function ($, window, document, undefined) {
    
    Slider = function (container, options) {
        /*
        options = {
            auto: true,
            time: 3000,
            delay: 400,
            event: 'hover' | 'click',
            controller: $(),
            activeControllerCls: 'className',
        }
        */

        "use strict"; //stirct mode not support by IE9-

        if (!container) return;

        var options = options || {},
            currentIndex = 0,
            cls = options.activeControllerCls,
            isAuto = options.auto,
            delay = options.delay,
            controller = options.controller,
            event = options.event,
            interval,
            slidesWrapper = container.children().first(),   //ul.slides
            slides = slidesWrapper.children(),  //ul.slides li
            length = slides.length,     //3
            childWidth = container.width(),
            totalWidth = childWidth * length;    //total width 

        function init() {

            var wrapper = container.children().first(); //ul.slides

            wrapper.children().css({
                'position': 'absolute',
                'left': 0,
                'top': 0
            }).first().siblings().hide();


            var controlItem = controller.children();    //dot li

            event == 'hover' ? controlItem.mouseover(function () {
                stop();
                var index = $(this).index();

                play(index);
            }).mouseout(function () {
                isAuto && autoPlay();
            }) : controlItem.click(function () {
                stop();
                var index = $(this).index();

                play(index);
                isAuto && autoPlay();
            });

            isAuto && autoPlay();
        }

        //auto play
        function autoPlay() {
            interval = setInterval(function () {
                triggerPlay(currentIndex);
            }, options.time);
        }

        //trigger play
        function triggerPlay(cIndex) {
            var index;

            (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
            play(index);
        }

        //play
        function play(index) {
            slidesWrapper.stop(true, true);
            slides.stop(true, true);

            if (slidesWrapper.children(':visible').index() == index) return;
            slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);

            try {
                controller.children().eq(index).addClass(cls).siblings().removeClass(cls);
            } catch (e) { }

            currentIndex = index;
        }

        //stop
        function stop() {
            clearInterval(interval);
        }

        //prev frame
        function prev() {
            stop();

            currentIndex == 0 ? play(length - 1) : play(currentIndex - 1);

            isAuto && autoPlay();
        }

        //next frame
        function next() {
            stop();

            currentIndex == length - 1 ? play(0) : play(currentIndex + 1);

            isAuto && autoPlay();
        }

        //init
        init();

        //expose the Slider API
        return {
            prev: function () {
                prev();
            },
            next: function () {
                next();
            }
        }
    };

}(jQuery, window, document));