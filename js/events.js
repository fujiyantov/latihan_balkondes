var _0x29ad = ["init", "ready", "allowToggle", "goToCatalogue", "click", "#events-right-catalogue", "switchPages", "#events-right-list", "scrollPage", "#events-scroll", "events", "hasClass", "body", "scroll", "preload", "imagesLoaded", "resize", "translateY(0%)", "css", "#events1-info, #events1-img", "scale(1.1)", "#events1-right-inside-inside", "#events2", "before-fade-in", "removeClass", ".page-right-button", "php/ajax.php", "set-preloaded", "post", "preload-fade-out", "addClass", "events-list", "newsletter", "#newsletter-close", "width", "innerWidth", "scrollTop", "#events-list", "overflowY", "hidden", "#container, #menu-button, #page-right", "bind", "children", "unbind", "#events-list-bg", "events-list-fadeout", "style", "removeAttr", "height", "#events1", "easeInOutCubic", "animate", "html, body", "top", "offset", "#events2 .page-title", "light-bg", "#container", "#page-preloader"];
$(document)[_0x29ad[1]](function() {
    var _0x2017x1 = new Page();
    _0x2017x1[_0x29ad[0]]()
});
Page = function() {
    var _0x2017x2 = this;
    _0x2017x2[_0x29ad[2]] = true;
    this[_0x29ad[0]] = function() {
        $(_0x29ad[5])[_0x29ad[4]](_0x2017x2[_0x29ad[3]]);
        $(_0x29ad[7])[_0x29ad[4]](_0x2017x2[_0x29ad[6]]);
        $(_0x29ad[9])[_0x29ad[4]](_0x2017x2[_0x29ad[8]]);
        if ($(_0x29ad[12])[_0x29ad[11]](_0x29ad[10])) {
            $(window)[_0x29ad[13]](_0x2017x2[_0x29ad[13]])[_0x29ad[13]]();
            if ($(_0x29ad[12])[_0x29ad[11]](_0x29ad[14])) {
                new ImagesPreloader(imageURLs, _0x2017x2[_0x29ad[15]]);
                $(window)[_0x29ad[16]](_0x2017x2[_0x29ad[16]])[_0x29ad[16]]()
            } else {
                $(_0x29ad[19])[_0x29ad[18]]({
                    transform: _0x29ad[17],
                    opacity: 1
                });
                $(_0x29ad[21])[_0x29ad[18]]({
                    transform: _0x29ad[20]
                });
                $(_0x29ad[22])[_0x29ad[18]]({
                    opacity: 1
                });
                setTimeout(function() {
                    $(_0x29ad[25])[_0x29ad[24]](_0x29ad[23])
                }, 250)
            }
        }
    };
    this[_0x29ad[15]] = function() {
        $[_0x29ad[28]](_0x29ad[26], {
            request: _0x29ad[27],
            page: _0x29ad[10]
        });
        setTimeout(function() {
            $(_0x29ad[12])[_0x29ad[30]](_0x29ad[29]);
            setTimeout(function() {
                $(_0x29ad[19])[_0x29ad[18]]({
                    transform: _0x29ad[17],
                    opacity: 1
                });
                $(_0x29ad[21])[_0x29ad[18]]({
                    transform: _0x29ad[20]
                });
                $(_0x29ad[22])[_0x29ad[18]]({
                    opacity: 1
                })
            }, 500);
            setTimeout(function() {
                $(_0x29ad[12])[_0x29ad[24]](_0x29ad[14]);
                $(_0x29ad[25])[_0x29ad[24]](_0x29ad[23])
            }, 1000)
        }, 3000)
    };
    this[_0x29ad[6]] = function() {
        if (_0x2017x2[_0x29ad[2]]) {
            _0x2017x2[_0x29ad[2]] = false;
            if (!$(_0x29ad[12])[_0x29ad[11]](_0x29ad[31])) {
                if ($(_0x29ad[12])[_0x29ad[11]](_0x29ad[32])) {
                    $(_0x29ad[33])[_0x29ad[4]]()
                };
                var _0x2017x3 = $(window)[_0x29ad[34]]();
                var _0x2017x4 = window[_0x29ad[35]];
                $(_0x29ad[37])[_0x29ad[36]](0);
                $(_0x29ad[12])[_0x29ad[30]](_0x29ad[31])[_0x29ad[18]](_0x29ad[38], _0x29ad[39]);
                $(_0x29ad[40])[_0x29ad[18]]({
                    marginRight: _0x2017x4 - _0x2017x3
                })
            } else {
                $(_0x29ad[44])[_0x29ad[41]](transitionEventEnd, function(_0x2017x5) {
                    $(_0x29ad[44])[_0x29ad[43]](transitionEventEnd);
                    $(_0x29ad[12])[_0x29ad[47]](_0x29ad[46])[_0x29ad[24]](_0x29ad[45]);
                    $(_0x29ad[40])[_0x29ad[18]]({
                        marginRight: 0
                    })
                })[_0x29ad[42]]()[_0x29ad[41]](transitionEventEnd, function() {
                    return false
                });
                $(_0x29ad[12])[_0x29ad[30]](_0x29ad[45])[_0x29ad[24]](_0x29ad[31])
            };
            setTimeout(function() {
                _0x2017x2[_0x29ad[2]] = true
            }, 1000)
        }
    };
    this[_0x29ad[8]] = function() {
        $(_0x29ad[52])[_0x29ad[51]]({
            scrollTop: $(_0x29ad[49])[_0x29ad[48]]()
        }, {
            duration: 800,
            easing: _0x29ad[50]
        })
    };
    this[_0x29ad[13]] = function() {
        if ($(window)[_0x29ad[36]]() + $(window)[_0x29ad[48]]() >= $(_0x29ad[55])[_0x29ad[54]]()[_0x29ad[53]] && !$(_0x29ad[12])[_0x29ad[11]](_0x29ad[56])) {
            $(_0x29ad[12])[_0x29ad[30]](_0x29ad[56])
        } else {
            if ($(window)[_0x29ad[36]]() + $(window)[_0x29ad[48]]() < $(_0x29ad[55])[_0x29ad[54]]()[_0x29ad[53]] && $(_0x29ad[12])[_0x29ad[11]](_0x29ad[56])) {
                $(_0x29ad[12])[_0x29ad[24]](_0x29ad[56])
            }
        }
    };
    this[_0x29ad[16]] = function() {
        $(_0x29ad[58])[_0x29ad[48]]($(_0x29ad[57])[_0x29ad[48]]())
    }
}