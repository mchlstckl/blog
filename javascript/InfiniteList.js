/*** JS Code using iUI framework and jQuery ***/

var ns = {};

// Throttle the requests (in this case 1 second)
ns.throttle = 1000;
ns.isOkToLoad = true;

// Number of pixels before last element
ns.scrollPadding = 100;

(function() {

    ns.autoloadOnScroll = function(event) {

        if (!ns.isOkToLoad) return;

        var scrlHeight = window.document.body.scrollHeight;
        var scrlPos = window.innerHeight + window.scrollY;

        if (scrlHeight < (ns.scrollPadding + scrlPos)) {

            var link = $("a[target=_replace]").get(0);

            if (link) {
                setTimeout(function() { ns.isOkToLoad = true; }, ns.throttle);
                ns.isOkToLoad = false;

                iui.showPageByHref(link.href, null, null, link, iui.unselect);
            }
        }

    };

})();

$(function() {

    window.onscroll = ns.autoloadOnScroll;

});
