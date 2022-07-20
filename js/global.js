var _0x9f09 = ["transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", "webkitAnimationEnd oanimationend msAnimationEnd animationend", "init", "home", "hasClass", "body", "artists-artist", "transition-from-next", "transition-from-works", "events-event", "artists-artist-works", "transition-from-profile", "artists-artist-works-work", "page-fade-in", "addClass", "ready", "allowToggle", "allowSubscribeNewsletter", "toggleMenu", "click", "#menu-button", "toggleNewsletter", "#bottom-inside-each-newsletter, #home6-buttons-each-newsletter, #contact1-button1, #menu-info-newsletter, #newsletter-close", "initPageScroll", "touchmove", "preventDefault", "bind", "#newsletter", "submitNewsletter", "submit", "#newsletter form", "#newsletter-submit", "a", "buttonClick", "on", "mouseLeave", "mouseleave", "mouseEnter", "mouseenter", "mouseClick", "cursorMouseLeave", "cursorMouseEnter", "a, .page-left-button, .page-right-button, .cursor", "mousemove", "mouseMove", "touchstart", "#menu", "easeInOutExpo", "animate", "html, body", "#bottom-back-to-top", "href", "attr", "substring", "http", "mail", "menu", "removeClass", "/", "clientY", "<div class=\"cursor-click\" style=\"top: ", "px; left: ", "clientX", "px;\"></div>", "append", "remove", "unbind", ".cursor-click:last", "fade-in", "css", "#cursor", "document-mouse-leave", "mouse-enter", "arrow", "right", "width", "innerWidth", "artists-catalogue", "events-list", "projects-catalogue", "overflowY", "hidden", "#container, #menu-button, #page-right, body.artists-artist #page-right-bg, .home1-slide", "easeOutExpo", "children", "#menu-bg", "style", "removeAttr", "menu-fadeout", "scrollingElement", "newsletter", "subscribed", "", "val", "#newsletter-input", "php/ajax.php", "newsletter-subscribe", "parse", "blur", "message", "show", "#newsletter-message", "text", "status", "post", "allowAnimate", "allowAnimate2", "100%", "0%", ".page-scroll-line-inside", "interval", ".page-scroll", "curImagesLoaded", "hasPercent", "projects-project", "loadImage", "length", "onload", "onerror", "src", "/img/", "%", "#page-preloader-line-inside", "pageshow", "persisted", "originalEvent", "reload", "location"];
const transitionEventEnd = _0x9f09[0];
const animationEventEnd = _0x9f09[1];
$(document)[_0x9f09[15]](function() {
    var _0x3813x3 = true;
    const _0x3813x4 = new Menu();
    _0x3813x4[_0x9f09[2]]();
    if (($(_0x9f09[5])[_0x9f09[4]](_0x9f09[3]) || $(_0x9f09[5])[_0x9f09[4]](_0x9f09[6]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[7]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[8])) || $(_0x9f09[5])[_0x9f09[4]](_0x9f09[9]) || ($(_0x9f09[5])[_0x9f09[4]](_0x9f09[10]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[11])) || $(_0x9f09[5])[_0x9f09[4]](_0x9f09[12])) {
        _0x3813x3 = false
    };
    if (_0x3813x3) {
        setTimeout(function() {
            $(_0x9f09[5])[_0x9f09[14]](_0x9f09[13])
        }, 100)
    }
});
Menu = function() {
    const _0x3813x5 = this;
    _0x3813x5[_0x9f09[16]] = true;
    _0x3813x5[_0x9f09[17]] = true;
    this[_0x9f09[2]] = function() {
        $(_0x9f09[20])[_0x9f09[19]](_0x3813x5[_0x9f09[18]]);
        $(_0x9f09[22])[_0x9f09[19]](_0x3813x5[_0x9f09[21]]);
        _0x3813x5[_0x9f09[23]]();
        $(_0x9f09[27])[_0x9f09[26]](_0x9f09[24], function(_0x3813x6) {
            _0x3813x6[_0x9f09[25]]()
        });
        $(_0x9f09[30])[_0x9f09[29]](_0x3813x5[_0x9f09[28]]);
        $(_0x9f09[31])[_0x9f09[19]](_0x3813x5[_0x9f09[28]]);
        $(document)[_0x9f09[34]](_0x9f09[19], _0x9f09[32], _0x3813x5[_0x9f09[33]]);
        if (isDesktop) {
            $(_0x9f09[5])[_0x9f09[19]](_0x3813x5[_0x9f09[39]])[_0x9f09[38]](_0x3813x5[_0x9f09[37]])[_0x9f09[36]](_0x3813x5[_0x9f09[35]]);
            $(_0x9f09[42])[_0x9f09[38]](_0x3813x5[_0x9f09[41]])[_0x9f09[36]](_0x3813x5[_0x9f09[40]]);
            $(_0x9f09[5])[_0x9f09[43]](_0x3813x5[_0x9f09[44]])[_0x9f09[43]]()
        } else {
            $(_0x9f09[46])[_0x9f09[26]](_0x9f09[45], function(_0x3813x6) {
                _0x3813x6[_0x9f09[25]]()
            });
            $(_0x9f09[46])[_0x9f09[34]](_0x9f09[45], _0x9f09[32], _0x3813x5[_0x9f09[33]])
        };
        $(_0x9f09[50])[_0x9f09[19]](function() {
            $(_0x9f09[49])[_0x9f09[48]]({
                scrollTop: 0
            }, {
                duration: 1500,
                ease: _0x9f09[47]
            })
        })
    };
    this[_0x9f09[33]] = function() {
        var _0x3813x7 = $(this)[_0x9f09[52]](_0x9f09[51]);
        if (_0x3813x7[_0x9f09[53]](0, 4) != _0x9f09[54] && _0x3813x7[_0x9f09[53]](0, 4) != _0x9f09[55]) {
            if ($(_0x9f09[5])[_0x9f09[4]](_0x9f09[56])) {
                $(_0x9f09[5])[_0x9f09[57]](_0x9f09[56])
            };
            $(_0x9f09[5])[_0x9f09[57]](_0x9f09[13]);
            if (_0x3813x7[_0x9f09[53]](0, 1) != _0x9f09[58]) {
                _0x3813x7 = _0x9f09[58] + _0x3813x7
            };
            setTimeout(function() {
                location = _0x3813x7
            }, 510);
            return false
        }
    };
    this[_0x9f09[39]] = function(_0x3813x6) {
        if (_0x3813x6[_0x9f09[59]] != undefined) {
            $(_0x9f09[5])[_0x9f09[64]](_0x9f09[60] + _0x3813x6[_0x9f09[59]] + _0x9f09[61] + _0x3813x6[_0x9f09[62]] + _0x9f09[63]);
            $(_0x9f09[67])[_0x9f09[26]](transitionEventEnd, function(_0x3813x8) {
                $(this)[_0x9f09[66]](transitionEventEnd)[_0x9f09[65]]()
            });
            setTimeout(function() {
                $(_0x9f09[67])[_0x9f09[14]](_0x9f09[68])
            }, 0)
        }
    };
    this[_0x9f09[44]] = function(_0x3813x6) {
        $(_0x9f09[70])[_0x9f09[69]]({
            left: _0x3813x6[_0x9f09[62]],
            top: _0x3813x6[_0x9f09[59]]
        })
    };
    this[_0x9f09[37]] = function() {
        $(_0x9f09[70])[_0x9f09[57]](_0x9f09[71])
    };
    this[_0x9f09[35]] = function() {
        $(_0x9f09[70])[_0x9f09[14]](_0x9f09[71])
    };
    this[_0x9f09[41]] = function() {
        $(_0x9f09[70])[_0x9f09[14]](_0x9f09[72]);
        if ($(this)[_0x9f09[4]](_0x9f09[73])) {
            $(_0x9f09[70])[_0x9f09[14]](_0x9f09[73])
        };
        if ($(this)[_0x9f09[4]](_0x9f09[74])) {
            $(_0x9f09[70])[_0x9f09[14]](_0x9f09[74])
        }
    };
    this[_0x9f09[40]] = function() {
        $(_0x9f09[70])[_0x9f09[57]](_0x9f09[72]);
        if ($(this)[_0x9f09[4]](_0x9f09[73])) {
            $(_0x9f09[70])[_0x9f09[57]](_0x9f09[73])
        };
        if ($(this)[_0x9f09[4]](_0x9f09[74])) {
            $(_0x9f09[70])[_0x9f09[57]](_0x9f09[74])
        }
    };
    this[_0x9f09[18]] = function() {
        if (_0x3813x5[_0x9f09[16]]) {
            _0x3813x5[_0x9f09[16]] = false;
            if (!$(_0x9f09[5])[_0x9f09[4]](_0x9f09[56])) {
                var _0x3813x9 = $(window)[_0x9f09[75]]();
                var _0x3813xa = window[_0x9f09[76]];
                $(_0x9f09[5])[_0x9f09[14]](_0x9f09[56]);
                if (!$(_0x9f09[5])[_0x9f09[4]](_0x9f09[77]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[78]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[79])) {
                    $(_0x9f09[5])[_0x9f09[69]](_0x9f09[80], _0x9f09[81]);
                    $(_0x9f09[82])[_0x9f09[69]]({
                        marginRight: _0x3813xa - _0x3813x9
                    })
                };
                if ($(window)[_0x9f09[76]]() <= 1024) {
                    $(_0x9f09[49])[_0x9f09[48]]({
                        scrollTop: 0
                    }, {
                        duration: 200,
                        ease: _0x9f09[83]
                    })
                }
            } else {
                $(_0x9f09[85])[_0x9f09[26]](transitionEventEnd, function(_0x3813x8) {
                    $(_0x9f09[85])[_0x9f09[66]](transitionEventEnd);
                    if (!$(_0x9f09[5])[_0x9f09[4]](_0x9f09[77]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[78]) && !$(_0x9f09[5])[_0x9f09[4]](_0x9f09[79])) {
                        $(_0x9f09[5])[_0x9f09[87]](_0x9f09[86]);
                        $(_0x9f09[82])[_0x9f09[69]]({
                            marginRight: 0
                        })
                    };
                    $(_0x9f09[5])[_0x9f09[57]](_0x9f09[88])
                })[_0x9f09[84]]()[_0x9f09[26]](transitionEventEnd, function() {
                    return false
                });
                $(_0x9f09[5])[_0x9f09[14]](_0x9f09[88])[_0x9f09[57]](_0x9f09[56])
            };
            setTimeout(function() {
                _0x3813x5[_0x9f09[16]] = true
            }, 1000)
        }
    };
    this[_0x9f09[21]] = function() {
        var _0x3813xb = (document[_0x9f09[89]] || document[_0x9f09[5]]);
        if (!$(_0x9f09[5])[_0x9f09[4]](_0x9f09[90])) {
            $(_0x9f09[5])[_0x9f09[14]](_0x9f09[90])
        } else {
            $(_0x9f09[27])[_0x9f09[26]](transitionEventEnd, function(_0x3813x8) {
                $(_0x9f09[27])[_0x9f09[66]](transitionEventEnd);
                $(_0x9f09[5])[_0x9f09[57]](_0x9f09[90]);
                $(_0x9f09[27])[_0x9f09[87]](_0x9f09[86]);
                if ($(_0x9f09[27])[_0x9f09[4]](_0x9f09[91])) {
                    $(_0x9f09[27])[_0x9f09[57]](_0x9f09[91]);
                    $(_0x9f09[94])[_0x9f09[93]](_0x9f09[92])
                }
            })[_0x9f09[84]]()[_0x9f09[26]](transitionEventEnd, function() {
                return false
            });
            $(_0x9f09[27])[_0x9f09[69]]({
                opacity: 0
            })
        }
    };
    this[_0x9f09[28]] = function() {
        if (_0x3813x5[_0x9f09[17]]) {
            _0x3813x5[_0x9f09[17]] = false;
            var _0x3813xc = $(_0x9f09[94])[_0x9f09[93]]();
            $[_0x9f09[104]](_0x9f09[95], {
                request: _0x9f09[96],
                email: _0x3813xc
            }, function(_0x3813xd) {
                _0x3813x5[_0x9f09[17]] = true;
                if (_0x3813xd) {
                    try {
                        data = JSON[_0x9f09[97]](_0x3813xd);
                        switch (data[_0x9f09[103]]) {
                            case 200:
                                $(_0x9f09[27])[_0x9f09[14]](_0x9f09[91]);
                                $(_0x9f09[94])[_0x9f09[93]](data[_0x9f09[99]])[_0x9f09[98]]();
                                $(_0x9f09[101])[_0x9f09[57]](_0x9f09[100]);
                                break;
                            case 400:
                                $(_0x9f09[101])[_0x9f09[14]](_0x9f09[100])[_0x9f09[102]](data[_0x9f09[99]]);
                                setTimeout(function() {
                                    $(_0x9f09[101])[_0x9f09[57]](_0x9f09[100])
                                }, 3000);
                                break
                        }
                    } catch (e) {}
                }
            })
        };
        return false
    };
    this[_0x9f09[23]] = function() {
        _0x3813x5[_0x9f09[105]] = true;
        _0x3813x5[_0x9f09[106]] = true;

        function _0x3813xe() {
            if (_0x3813x5[_0x9f09[105]] && _0x3813x5[_0x9f09[106]]) {
                _0x3813x5[_0x9f09[106]] = false;
                setTimeout(function() {
                    $(_0x9f09[109])[_0x9f09[69]]({
                        left: _0x9f09[107],
                        right: _0x9f09[108]
                    })
                }, 300);
                setTimeout(function() {
                    $(_0x9f09[109])[_0x9f09[69]]({
                        left: _0x9f09[108],
                        right: _0x9f09[107]
                    })
                }, 800);
                setTimeout(function() {
                    $(_0x9f09[109])[_0x9f09[69]]({
                        left: _0x9f09[108],
                        right: _0x9f09[108]
                    })
                }, 1300);
                setTimeout(function() {
                    _0x3813x5[_0x9f09[106]] = true
                }, 1800)
            }
        }
        _0x3813x5[_0x9f09[110]] = setInterval(_0x3813xe, 2800);
        _0x3813xe();
        $(_0x9f09[111])[_0x9f09[38]](function() {
            _0x3813x5[_0x9f09[105]] = false
        })[_0x9f09[36]](function() {
            _0x3813x5[_0x9f09[105]] = true;
            if (_0x3813x5[_0x9f09[106]]) {
                _0x3813x5[_0x9f09[110]] = setInterval(_0x3813xe, 2800);
                _0x3813xe()
            }
        })
    }
};
ImagesPreloader = function(_0x3813xf, _0x3813x10) {
    const _0x3813x5 = this;
    this[_0x9f09[112]] = 0;
    this[_0x9f09[113]] = $(_0x9f09[5])[_0x9f09[4]](_0x9f09[114]);
    this[_0x9f09[115]] = function() {
        if (_0x3813x5[_0x9f09[112]] < _0x3813xf[_0x9f09[116]]) {
            setTimeout(function() {
                imageToLoad = new Image();
                imageToLoad[_0x9f09[117]] = _0x3813x5[_0x9f09[115]];
                imageToLoad[_0x9f09[118]] = _0x3813x5[_0x9f09[115]];
                imageToLoad[_0x9f09[119]] = _0x9f09[120] + _0x3813xf[_0x3813x5[_0x9f09[112]]];
                _0x3813x5[_0x9f09[112]]++;
                if (_0x3813x5[_0x9f09[113]]) {
                    var _0x3813x11 = (_0x3813x5[_0x9f09[112]] / _0x3813xf[_0x9f09[116]]) * 100;
                    $(_0x9f09[122])[_0x9f09[75]](_0x3813x11 + _0x9f09[121])
                }
            }, 0)
        } else {
            _0x3813x10()
        }
    };
    this[_0x9f09[2]] = function() {
        _0x3813x5[_0x9f09[115]]()
    }()
};
$(window)[_0x9f09[26]](_0x9f09[123], function(_0x3813x8) {
    if (_0x3813x8[_0x9f09[125]][_0x9f09[124]] && isSafari) {
        $(_0x9f09[5])[_0x9f09[65]]();
        window[_0x9f09[127]][_0x9f09[126]]()
    }
})