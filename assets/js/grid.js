$(document).ready(function () {

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.head').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('.head').removeClass('down').addClass('up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('.head').removeClass('up').addClass('down');
            }
        }
        lastScrollTop = st;
    }
});