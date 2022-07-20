var _0x710b = ["init", "ready", "curSlide", "quantSlides", "allowChangeSlide", "aspectRatio", "allowToggle", "length", ".artists-artist", "changeSlide", "click", "#page-right-pages-prev, #page-right-pages-next", "#page-right-pages-next", "#artists-scroll", "switchPages", "#artists-left-catalogue", "mousewheel DOMMouseScroll", "artists-catalogue", "hasClass", "body", "innerWidth", "wheelDelta", "originalEvent", "detail", "#page-right-pages-prev", "bind", "#container", "resize", "artists", "preload", "imagesLoaded", "current", "addClass", "next", "removeClass", ".artists-artist:eq(0)", "translateY(", "%)", "css", "no-transform", "#artists-container-inside", "translateY(0%)", "before-fade-in", "#artists-scroll, .page-left-button", "100%", "width", "#artists-artist-line1, #artists-artist-line3", "height", "#artists-artist-line2, #artists-artist-line4", "php/ajax.php", "set-preloaded", "post", "preload-fade-out", "id", "attr", "page-right-pages-prev", "page-right-pages-next", "previous", "disabled", "remove-transition", "class", "removeAttr", "#artists-container", "show", "#page-right-pages", ".artists-artist.current", ".artists-artist[data-id=\"", "\"]", "translateY(-", "text", "#page-right-pages-cur span", "newsletter", "#newsletter-close", "scrollTop", "#artists-catalogue", "overflowY", "hidden", "#container, #menu-button, #page-right", "children", "unbind", "#artists-catalogue-bg", "artists-catalogue-fadeout", "style", ".artists-artist-inside", ".artists-artist-inside-inside", "#artists-artist-line", ".artists-artist-left-top", ".artists-artist-left-bottom", "#page-preloader"];
$(document)[_0x710b[1]](function() {
    const _0xcbcfx1 = new Page();
    _0xcbcfx1[_0x710b[0]]()
});
Page = function() {
    const _0xcbcfx2 = this;
    _0xcbcfx2[_0x710b[2]] = 1;
    _0xcbcfx2[_0x710b[3]];
    _0xcbcfx2[_0x710b[4]] = true;
    _0xcbcfx2[_0x710b[5]] = 1175 / 780;
    _0xcbcfx2[_0x710b[6]] = true;
    this[_0x710b[0]] = function() {
        _0xcbcfx2[_0x710b[3]] = $(_0x710b[8])[_0x710b[7]];
        $(_0x710b[11])[_0x710b[10]](_0xcbcfx2[_0x710b[9]]);
        $(_0x710b[13])[_0x710b[10]](function() {
            $(_0x710b[12])[_0x710b[10]]()
        });
        $(_0x710b[15])[_0x710b[10]](_0xcbcfx2[_0x710b[14]]);
        if (isDesktop) {
            $(_0x710b[26])[_0x710b[25]](_0x710b[16], function(_0xcbcfx3) {
                if (!$(_0x710b[19])[_0x710b[18]](_0x710b[17])) {
                    if ($(window)[_0x710b[20]]() > 896) {
                        if (_0xcbcfx3[_0x710b[22]][_0x710b[21]] > 0 || _0xcbcfx3[_0x710b[22]][_0x710b[23]] < 0) {
                            $(_0x710b[24])[_0x710b[10]]()
                        } else {
                            $(_0x710b[12])[_0x710b[10]]()
                        }
                    }
                }
            })
        };
        $(window)[_0x710b[27]](_0xcbcfx2[_0x710b[27]])[_0x710b[27]]();
        if ($(_0x710b[19])[_0x710b[18]](_0x710b[28]) && $(_0x710b[19])[_0x710b[18]](_0x710b[29])) {
            new ImagesPreloader(imageURLs, _0xcbcfx2[_0x710b[30]])
        } else {
            $(_0x710b[35])[_0x710b[34]](_0x710b[33])[_0x710b[32]](_0x710b[31]);
            $(_0x710b[40])[_0x710b[32]](_0x710b[39])[_0x710b[38]]({
                transform: _0x710b[36] + (100 / _0xcbcfx2[_0x710b[3]]) + _0x710b[37]
            });
            setTimeout(function() {
                $(_0x710b[40])[_0x710b[34]](_0x710b[39])[_0x710b[38]]({
                    transform: _0x710b[41]
                })
            }, 0);
            setTimeout(function() {
                $(_0x710b[43])[_0x710b[34]](_0x710b[42]);
                $(_0x710b[46])[_0x710b[45]](_0x710b[44]);
                $(_0x710b[48])[_0x710b[47]](_0x710b[44])
            }, 250)
        }
    };
    this[_0x710b[30]] = function() {
        $[_0x710b[51]](_0x710b[49], {
            request: _0x710b[50],
            page: _0x710b[28]
        });
        $(_0x710b[40])[_0x710b[38]]({
            transform: _0x710b[36] + (100 / _0xcbcfx2[_0x710b[3]]) + _0x710b[37]
        });
        setTimeout(function() {
            $(_0x710b[19])[_0x710b[32]](_0x710b[52]);
            setTimeout(function() {
                $(_0x710b[40])[_0x710b[38]]({
                    transform: _0x710b[41]
                });
                $(_0x710b[35])[_0x710b[34]](_0x710b[33])[_0x710b[32]](_0x710b[31])
            }, 500);
            setTimeout(function() {
                $(_0x710b[19])[_0x710b[34]](_0x710b[29]);
                $(_0x710b[43])[_0x710b[34]](_0x710b[42]);
                $(_0x710b[46])[_0x710b[45]](_0x710b[44]);
                $(_0x710b[48])[_0x710b[47]](_0x710b[44])
            }, 1000)
        }, 3000)
    };
    this[_0x710b[9]] = function() {
        if (_0xcbcfx2[_0x710b[4]] && (($(this)[_0x710b[54]](_0x710b[53]) == _0x710b[55] && _0xcbcfx2[_0x710b[2]] > 1) || ($(this)[_0x710b[54]](_0x710b[53]) == _0x710b[56] && _0xcbcfx2[_0x710b[2]] < _0xcbcfx2[_0x710b[3]]))) {
            _0xcbcfx2[_0x710b[4]] = false;
            if ($(this)[_0x710b[54]](_0x710b[53]) == _0x710b[55]) {
                directionPhoto = _0x710b[33];
                if (_0xcbcfx2[_0x710b[2]] > 1) {
                    _0xcbcfx2[_0x710b[2]]--
                }
            } else {
                if ($(this)[_0x710b[54]](_0x710b[53]) == _0x710b[56]) {
                    directionPhoto = _0x710b[57];
                    if (_0xcbcfx2[_0x710b[2]] < _0xcbcfx2[_0x710b[3]]) {
                        _0xcbcfx2[_0x710b[2]]++
                    }
                }
            };
            if (_0xcbcfx2[_0x710b[2]] == _0xcbcfx2[_0x710b[3]]) {
                $(_0x710b[12])[_0x710b[32]](_0x710b[58])
            } else {
                $(_0x710b[12])[_0x710b[34]](_0x710b[58])
            };
            $(_0x710b[62])[_0x710b[61]](_0x710b[60])[_0x710b[32]](_0x710b[59])[_0x710b[32]](directionPhoto);
            setTimeout(function() {
                $(_0x710b[62])[_0x710b[34]](_0x710b[59]);
                setTimeout(function() {
                    if (_0xcbcfx2[_0x710b[2]] == 1) {
                        $(_0x710b[13])[_0x710b[32]](_0x710b[63]);
                        $(_0x710b[64])[_0x710b[34]](_0x710b[63])
                    } else {
                        $(_0x710b[13])[_0x710b[34]](_0x710b[63]);
                        $(_0x710b[64])[_0x710b[32]](_0x710b[63])
                    };
                    $(_0x710b[65])[_0x710b[34]](_0x710b[31])[_0x710b[32]](directionPhoto);
                    $(_0x710b[66] + _0xcbcfx2[_0x710b[2]] + _0x710b[67])[_0x710b[34]](_0x710b[33])[_0x710b[34]](_0x710b[57])[_0x710b[32]](_0x710b[31]);
                    $(_0x710b[40])[_0x710b[38]]({
                        transform: _0x710b[68] + ((_0xcbcfx2[_0x710b[2]] - 1) * (100 / $(_0x710b[8])[_0x710b[7]])) + _0x710b[37]
                    });
                    $(_0x710b[70])[_0x710b[69]](_0xcbcfx2[_0x710b[2]] == 1 ? 1 : _0xcbcfx2[_0x710b[2]] - 1);
                    setTimeout(function() {
                        _0xcbcfx2[_0x710b[4]] = true
                    }, 1000)
                }, 10)
            }, 10)
        }
    };
    this[_0x710b[14]] = function() {
        if (_0xcbcfx2[_0x710b[6]]) {
            _0xcbcfx2[_0x710b[6]] = false;
            if (!$(_0x710b[19])[_0x710b[18]](_0x710b[17])) {
                if ($(_0x710b[19])[_0x710b[18]](_0x710b[71])) {
                    $(_0x710b[72])[_0x710b[10]]()
                };
                var _0xcbcfx4 = $(window)[_0x710b[45]]();
                var _0xcbcfx5 = window[_0x710b[20]];
                $(_0x710b[74])[_0x710b[73]](0);
                $(_0x710b[19])[_0x710b[32]](_0x710b[17])[_0x710b[38]](_0x710b[75], _0x710b[76]);
                $(_0x710b[77])[_0x710b[38]]({
                    marginRight: _0xcbcfx5 - _0xcbcfx4
                })
            } else {
                $(_0x710b[80])[_0x710b[25]](transitionEventEnd, function(_0xcbcfx3) {
                    $(_0x710b[80])[_0x710b[79]](transitionEventEnd);
                    $(_0x710b[19])[_0x710b[61]](_0x710b[82])[_0x710b[34]](_0x710b[81]);
                    $(_0x710b[77])[_0x710b[38]]({
                        marginRight: 0
                    })
                })[_0x710b[78]]()[_0x710b[25]](transitionEventEnd, function() {
                    return false
                });
                $(_0x710b[19])[_0x710b[32]](_0x710b[81])[_0x710b[34]](_0x710b[17])
            };
            setTimeout(function() {
                _0xcbcfx2[_0x710b[6]] = true
            }, 1000)
        }
    };
    this[_0x710b[27]] = function() {
        var _0xcbcfx6 = $(_0x710b[83])[_0x710b[45]]();
        var _0xcbcfx7 = _0xcbcfx6 / _0xcbcfx2[_0x710b[5]];
        if (_0xcbcfx7 > $(_0x710b[83])[_0x710b[47]]()) {
            _0xcbcfx7 = $(_0x710b[83])[_0x710b[47]]();
            _0xcbcfx6 = _0xcbcfx7 * _0xcbcfx2[_0x710b[5]]
        };
        var _0xcbcfx8 = ($(_0x710b[83])[_0x710b[47]]() - _0xcbcfx7) / 2;
        var _0xcbcfx9 = ($(_0x710b[83])[_0x710b[45]]() - _0xcbcfx6) / 2;
        $(_0x710b[84])[_0x710b[38]]({
            top: _0xcbcfx8,
            left: _0xcbcfx9,
            width: _0xcbcfx6,
            height: _0xcbcfx7
        });
        _0xcbcfx6 *= 0.70;
        _0xcbcfx7 *= 0.65;
        $(_0x710b[85])[_0x710b[38]]({
            width: _0xcbcfx6,
            height: _0xcbcfx7,
            marginLeft: -_0xcbcfx6 / 2,
            marginTop: -_0xcbcfx7 / 2
        });
        $(_0x710b[86])[_0x710b[38]]({
            marginTop: -(_0xcbcfx7 / 2) * 1.35
        });
        $(_0x710b[87])[_0x710b[38]]({
            marginBottom: -(_0xcbcfx7 / 2) * 1.35
        });
        if ($(_0x710b[19])[_0x710b[18]](_0x710b[28]) && $(_0x710b[19])[_0x710b[18]](_0x710b[29])) {
            $(_0x710b[88])[_0x710b[47]]($(_0x710b[26])[_0x710b[47]]())
        }
    }
}