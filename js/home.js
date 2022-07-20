var _0x1cfe = ["init", "ready", "allowScroll", "curSlide", "quantSlides", "allowChangeSlide", "length", ".home1-slide", "changeSlide", "click", "#page-right-pages-prev, #page-right-pages-next", "scrollPage", "#home1-scroll", "mouseOutFeaturedArtists", "mouseout", "mouseOverFeaturedArtists", "mouseover", ".home4-artist", "mousewheel DOMMouseScroll", "scrollTop", "wheelDelta", "originalEvent", "detail", "#page-right-pages-prev", "#page-right-pages-next", "bind", "#home1", "resize", "preload", "hasClass", "body", "shuffleArray", "home/preloader-spritesheet.png", "home/preloader-spritesheet@2x.png", "home/preloader1.png", "home/preloader1@2x.png", "home/preloader2.png", "home/preloader2@2x.png", "home/preloader3.png", "home/preloader3@2x.png", "home/preloader4.png", "home/preloader4@2x.png", "page-fade-in", "addClass", "css", "each", ".home-preloader-text-each", "#page-right-pages, #home1-scroll", "imagesLoaded", "current", "next", "removeClass", ".home1-slide:eq(0)", "translateY(", "%)", "no-transform", "#home1-infos-inside", "translateY(0%)", "100%", "width", "#home1-info-line1, #home1-info-line3", "height", "#home1-info-line2, #home1-info-line4", "#home2", "html, body", "scroll", "php/ajax.php", "set-preloaded", "home", "post", "#1A1818", "#home1-slides-cover", "preload-fade-out", "style", "removeAttr", "page-right-pages-prev", "id", "attr", "page-right-pages-next", "previous", "disabled", "remove-transition", "page", "class", "#home1-slides", "transition", ".home1-slide.current", ".home1-slide[data-id=\"", "\"]", "translateY(-", "text", "#page-right-pages-cur span", "easeInOutCubic", "animate", "hide", "#page-right", "#logo", "top", "position", "logo-white", "logo-black", "offset", "#home1-cover", "open", ".div-scroll", "hover", "#home4", "selected", "random", "floor", "#home1, #home1-slides", "#page-cover", "innerWidth", "innerHeight", "iframe", "find", ".home1-slide.is-video"];
$(document)[_0x1cfe[1]](function() {
    (new Page)[_0x1cfe[0]]()
}), Page = function() {
    const _0x8c91x1 = this;
    _0x8c91x1[_0x1cfe[2]] = !0, _0x8c91x1[_0x1cfe[3]] = 1, _0x8c91x1[_0x1cfe[4]], _0x8c91x1[_0x1cfe[5]] = !0, this[_0x1cfe[0]] = function() {
        if (_0x8c91x1[_0x1cfe[4]] = $(_0x1cfe[7])[_0x1cfe[6]], $(_0x1cfe[10])[_0x1cfe[9]](_0x8c91x1[_0x1cfe[8]]), $(_0x1cfe[12])[_0x1cfe[9]](_0x8c91x1[_0x1cfe[11]]), $(_0x1cfe[17])[_0x1cfe[16]](_0x8c91x1[_0x1cfe[15]])[_0x1cfe[14]](_0x8c91x1[_0x1cfe[13]]), isDesktop && ($(_0x1cfe[26])[_0x1cfe[25]](_0x1cfe[18], function(_0x8c91x2) {
                if (0 == $(window)[_0x1cfe[19]]()) {
                    return _0x8c91x2[_0x1cfe[21]][_0x1cfe[20]] > 0 || _0x8c91x2[_0x1cfe[21]][_0x1cfe[22]] < 0 ? 0 == $(window)[_0x1cfe[19]]() && _0x8c91x1[_0x1cfe[3]] > 1 && $(_0x1cfe[23])[_0x1cfe[9]]() : _0x8c91x1[_0x1cfe[3]] < _0x8c91x1[_0x1cfe[4]] ? $(_0x1cfe[24])[_0x1cfe[9]]() : _0x8c91x1[_0x1cfe[11]](), !1
                }
            }), $(window)[_0x1cfe[25]](_0x1cfe[18], function(_0x8c91x2) {
                return _0x8c91x1[_0x1cfe[2]]
            })), $(window)[_0x1cfe[27]](_0x8c91x1[_0x1cfe[27]])[_0x1cfe[27]](), $(_0x1cfe[30])[_0x1cfe[29]](_0x1cfe[28])) {
            const _0x8c91x2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            _0x8c91x1[_0x1cfe[31]](_0x8c91x2), new ImagesPreloader([_0x1cfe[32], _0x1cfe[33], _0x1cfe[34], _0x1cfe[35], _0x1cfe[36], _0x1cfe[37], _0x1cfe[38], _0x1cfe[39], _0x1cfe[40], _0x1cfe[41]], function() {
                $(_0x1cfe[30])[_0x1cfe[43]](_0x1cfe[42]), $(_0x1cfe[46])[_0x1cfe[45]](function(_0x8c91x1, _0x8c91x3) {
                    setTimeout(function() {
                        $(_0x8c91x3)[_0x1cfe[44]]({
                            opacity: 1
                        })
                    }, 100 * _0x8c91x2[_0x8c91x1])
                }), $(_0x1cfe[47])[_0x1cfe[44]]({
                    opacity: 0
                }), new ImagesPreloader(imageURLs, _0x8c91x1[_0x1cfe[48]]), $(window)[_0x1cfe[27]](_0x8c91x1[_0x1cfe[27]])[_0x1cfe[27]]()
            })
        } else {
            $(_0x1cfe[30])[_0x1cfe[43]](_0x1cfe[42]), $(_0x1cfe[52])[_0x1cfe[51]](_0x1cfe[50])[_0x1cfe[43]](_0x1cfe[49]), $(_0x1cfe[56])[_0x1cfe[43]](_0x1cfe[55])[_0x1cfe[44]]({
                transform: _0x1cfe[53] + 75 / _0x8c91x1[_0x1cfe[4]] + _0x1cfe[54]
            }), setTimeout(function() {
                $(_0x1cfe[56])[_0x1cfe[51]](_0x1cfe[55])[_0x1cfe[44]]({
                    transform: _0x1cfe[57]
                })
            }, 0), setTimeout(function() {
                $(_0x1cfe[60])[_0x1cfe[59]](_0x1cfe[58]), $(_0x1cfe[62])[_0x1cfe[61]](_0x1cfe[58])
            }, 250), $(_0x1cfe[63])[_0x1cfe[44]]({
                opacity: 1
            })
        };
        setTimeout(function() {
            $(_0x1cfe[64])[_0x1cfe[19]](0), isDesktop && $(window)[_0x1cfe[65]](_0x8c91x1[_0x1cfe[65]])[_0x1cfe[65]]()
        }, 100)
    }, this[_0x1cfe[48]] = function() {
        $[_0x1cfe[69]](_0x1cfe[66], {
            request: _0x1cfe[67],
            page: _0x1cfe[68]
        }), $(_0x1cfe[71])[_0x1cfe[44]]({
            backgroundColor: _0x1cfe[70]
        }), $(_0x1cfe[71])[_0x1cfe[44]]({
            opacity: 1
        }), $(_0x1cfe[56])[_0x1cfe[44]]({
            transform: _0x1cfe[53] + 75 / _0x8c91x1[_0x1cfe[4]] + _0x1cfe[54]
        }), setTimeout(function() {
            $(_0x1cfe[30])[_0x1cfe[43]](_0x1cfe[72]), setTimeout(function() {
                $(_0x1cfe[71])[_0x1cfe[74]](_0x1cfe[73]), $(_0x1cfe[56])[_0x1cfe[44]]({
                    transform: _0x1cfe[57]
                }), setTimeout(function() {
                    $(_0x1cfe[52])[_0x1cfe[51]](_0x1cfe[50])[_0x1cfe[43]](_0x1cfe[49])
                }, 200)
            }, 1300), setTimeout(function() {
                $(_0x1cfe[60])[_0x1cfe[59]](_0x1cfe[58]), $(_0x1cfe[62])[_0x1cfe[61]](_0x1cfe[58]), $(_0x1cfe[30])[_0x1cfe[51]](_0x1cfe[28]), $(_0x1cfe[47])[_0x1cfe[44]]({
                    opacity: 1
                })
            }, 1400), $(_0x1cfe[63])[_0x1cfe[44]]({
                opacity: 1
            })
        }, 2e3)
    }, this[_0x1cfe[8]] = function() {
        _0x8c91x1[_0x1cfe[5]] && (_0x1cfe[75] == $(this)[_0x1cfe[77]](_0x1cfe[76]) && _0x8c91x1[_0x1cfe[3]] > 1 || _0x1cfe[78] == $(this)[_0x1cfe[77]](_0x1cfe[76]) && _0x8c91x1[_0x1cfe[3]] < _0x8c91x1[_0x1cfe[4]]) && (_0x8c91x1[_0x1cfe[5]] = !1, _0x1cfe[75] == $(this)[_0x1cfe[77]](_0x1cfe[76]) ? (directionPhoto = _0x1cfe[50], _0x8c91x1[_0x1cfe[3]] > 1 && _0x8c91x1[_0x1cfe[3]]--) : _0x1cfe[78] == $(this)[_0x1cfe[77]](_0x1cfe[76]) && (directionPhoto = _0x1cfe[79], _0x8c91x1[_0x1cfe[3]] < _0x8c91x1[_0x1cfe[4]] && _0x8c91x1[_0x1cfe[3]]++), $(_0x1cfe[10])[_0x1cfe[51]](_0x1cfe[80]), 1 == _0x8c91x1[_0x1cfe[3]] ? $(_0x1cfe[23])[_0x1cfe[43]](_0x1cfe[80]) : _0x8c91x1[_0x1cfe[3]] == _0x8c91x1[_0x1cfe[4]] && $(_0x1cfe[24])[_0x1cfe[43]](_0x1cfe[80]), $(_0x1cfe[84])[_0x1cfe[74]](_0x1cfe[83])[_0x1cfe[43]](_0x1cfe[82])[_0x1cfe[43]](_0x1cfe[81])[_0x1cfe[43]](directionPhoto), $(_0x1cfe[71])[_0x1cfe[43]](_0x1cfe[85]), setTimeout(function() {
            $(_0x1cfe[84])[_0x1cfe[51]](_0x1cfe[81]), setTimeout(function() {
                setTimeout(function() {
                    $(_0x1cfe[86])[_0x1cfe[51]](_0x1cfe[49])[_0x1cfe[43]](directionPhoto), $(_0x1cfe[87] + _0x8c91x1[_0x1cfe[3]] + _0x1cfe[88])[_0x1cfe[51]](_0x1cfe[50])[_0x1cfe[51]](_0x1cfe[79])[_0x1cfe[43]](_0x1cfe[49])
                }, 600), $(_0x1cfe[56])[_0x1cfe[44]]({
                    transform: _0x1cfe[89] + 100 / _0x8c91x1[_0x1cfe[4]] * (_0x8c91x1[_0x1cfe[3]] - 1) + _0x1cfe[54]
                }), $(_0x1cfe[91])[_0x1cfe[90]](_0x8c91x1[_0x1cfe[3]]), setTimeout(function() {
                    $(_0x1cfe[71])[_0x1cfe[51]](_0x1cfe[85]), setTimeout(function() {
                        _0x8c91x1[_0x1cfe[5]] = !0
                    }, 700)
                }, 600)
            }, 0)
        }, 0))
    }, this[_0x1cfe[11]] = function() {
        _0x8c91x1[_0x1cfe[2]] && _0x8c91x1[_0x1cfe[5]] && (_0x8c91x1[_0x1cfe[2]] = !1, $(_0x1cfe[64])[_0x1cfe[93]]({
            scrollTop: $(_0x1cfe[26])[_0x1cfe[61]]()
        }, {
            duration: 800,
            easing: _0x1cfe[92],
            complete: function() {
                _0x8c91x1[_0x1cfe[2]] = !0
            }
        }))
    }, this[_0x1cfe[65]] = function(_0x8c91x1) {
        if ($(window)[_0x1cfe[19]]() >= $(_0x1cfe[26])[_0x1cfe[61]]() / 5 && !$(_0x1cfe[95])[_0x1cfe[29]](_0x1cfe[94]) ? $(_0x1cfe[95])[_0x1cfe[43]](_0x1cfe[94]) : $(window)[_0x1cfe[19]]() < $(_0x1cfe[26])[_0x1cfe[61]]() / 5 && $(_0x1cfe[95])[_0x1cfe[29]](_0x1cfe[94]) && $(_0x1cfe[95])[_0x1cfe[51]](_0x1cfe[94]), $(window)[_0x1cfe[19]]() >= $(_0x1cfe[26])[_0x1cfe[61]]() - $(_0x1cfe[96])[_0x1cfe[61]]() / 2 - $(_0x1cfe[96])[_0x1cfe[98]]()[_0x1cfe[97]] && $(_0x1cfe[30])[_0x1cfe[29]](_0x1cfe[99]) ? $(_0x1cfe[30])[_0x1cfe[51]](_0x1cfe[99])[_0x1cfe[43]](_0x1cfe[100]) : $(window)[_0x1cfe[19]]() < $(_0x1cfe[26])[_0x1cfe[61]]() - $(_0x1cfe[96])[_0x1cfe[61]]() / 2 - $(_0x1cfe[96])[_0x1cfe[98]]()[_0x1cfe[97]] && $(_0x1cfe[30])[_0x1cfe[29]](_0x1cfe[100]) && $(_0x1cfe[30])[_0x1cfe[51]](_0x1cfe[100])[_0x1cfe[43]](_0x1cfe[99]), $(window)[_0x1cfe[19]]() < 1.5 * $(_0x1cfe[63])[_0x1cfe[101]]()[_0x1cfe[97]]) {
            var _0x8c91x2 = $(window)[_0x1cfe[19]]() / $(_0x1cfe[63])[_0x1cfe[101]]()[_0x1cfe[97]] * 1.5;
            _0x8c91x2 > 1 && (_0x8c91x2 = 1), $(_0x1cfe[102])[_0x1cfe[44]]({
                opacity: _0x8c91x2
            }), 1 != _0x8c91x2 || $(_0x1cfe[84])[_0x1cfe[29]](_0x1cfe[94]) ? _0x8c91x2 < 1 && $(_0x1cfe[84])[_0x1cfe[29]](_0x1cfe[94]) && $(_0x1cfe[84])[_0x1cfe[51]](_0x1cfe[94]) : $(_0x1cfe[84])[_0x1cfe[43]](_0x1cfe[94])
        };
        $(_0x1cfe[104])[_0x1cfe[45]](function(_0x8c91x1, _0x8c91x2) {
            var _0x8c91x3 = $(window)[_0x1cfe[19]]() + $(window)[_0x1cfe[61]]() - (isMobile ? 100 : 150);
            $(this)[_0x1cfe[101]]()[_0x1cfe[97]] <= _0x8c91x3 && $(this)[_0x1cfe[43]](_0x1cfe[103])
        }), !$(_0x1cfe[63])[_0x1cfe[29]](_0x1cfe[103]) && $(_0x1cfe[63])[_0x1cfe[101]]()[_0x1cfe[97]] <= $(window)[_0x1cfe[19]]() + $(window)[_0x1cfe[61]]() - 150 && $(_0x1cfe[63])[_0x1cfe[43]](_0x1cfe[103])
    }, this[_0x1cfe[15]] = function() {
        $(_0x1cfe[106])[_0x1cfe[43]](_0x1cfe[105]), $(_0x1cfe[17])[_0x1cfe[51]](_0x1cfe[107]), $(this)[_0x1cfe[43]](_0x1cfe[107])
    }, this[_0x1cfe[13]] = function() {
        $(_0x1cfe[106])[_0x1cfe[51]](_0x1cfe[105]), $(_0x1cfe[17])[_0x1cfe[51]](_0x1cfe[107])
    }, this[_0x1cfe[31]] = function(_0x8c91x1) {
        for (var _0x8c91x2 = _0x8c91x1[_0x1cfe[6]] - 1; _0x8c91x2 > 0; _0x8c91x2--) {
            var _0x8c91x3 = Math[_0x1cfe[109]](Math[_0x1cfe[108]]() * (_0x8c91x2 + 1)),
                _0x8c91x4 = _0x8c91x1[_0x8c91x2];
            _0x8c91x1[_0x8c91x2] = _0x8c91x1[_0x8c91x3], _0x8c91x1[_0x8c91x3] = _0x8c91x4
        }
    }, this[_0x1cfe[27]] = function() {
        $(_0x1cfe[110])[_0x1cfe[44]]({
            height: $(_0x1cfe[30])[_0x1cfe[61]]()
        }), $(_0x1cfe[111])[_0x1cfe[44]]({
            top: $(_0x1cfe[26])[_0x1cfe[61]]()
        }), $(_0x1cfe[116])[_0x1cfe[45]](function(_0x8c91x1, _0x8c91x2) {
            var _0x8c91x3 = $(window)[_0x1cfe[112]](),
                _0x8c91x4 = _0x8c91x3 / (1920 / 1080);
            _0x8c91x4 < $(window)[_0x1cfe[113]]() && (_0x8c91x3 = (_0x8c91x4 = $(window)[_0x1cfe[113]]()) * (1920 / 1080));
            var _0x8c91x5 = ($(window)[_0x1cfe[112]]() - _0x8c91x3) / 2,
                _0x8c91x6 = ($(window)[_0x1cfe[113]]() - _0x8c91x4) / 2;
            $(_0x8c91x2)[_0x1cfe[115]](_0x1cfe[114])[_0x1cfe[44]]({
                width: _0x8c91x3,
                height: _0x8c91x4,
                marginLeft: _0x8c91x5,
                marginTop: _0x8c91x6
            })
        })
    }
}