let startedData;
getData();

async function getData() {
    // const url = "http://127.0.0.1:8000/api/collections"
    const url = "https://dm.fujiyantov.id/api/collections"
    const response = await fetch(url)
    if (response) {

        const data = await response.json();
        this.startedData = data
        localStorage.setItem("globalData", JSON.stringify(data));

        setTimeout(() => {
            ! function e(t, n, r) {

                function s(o, u) {
                    if (!n[o]) {

                        if (!t[o]) {
                            var a = "function" == typeof require && require;
                            if (!u && a) return a(o, !0);
                            if (i) return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND", f
                        }
                        var l = n[o] = {
                            exports: {}
                        };
                        t[o][0].call(l.exports, function (e) {
                            var n = t[o][1][e];
                            return s(n ? n : e)
                        }, l, l.exports, e, t, n, r)
                    }
                    return n[o].exports


                }
                for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) {
                    s(r[o]);
                }
                return s

            }({
                1: [function (require, module, exports) {

                    let collectionData = JSON.parse(localStorage.getItem("globalData") || "[]");
                    
                    module.exports = collectionData

                }, {}],
                2: [function (require, module, exports) {
                    var angular = require("angular");
                    require("angular-animate"), require("./services/configService"), require("./services/mapService"), require("./services/routerService"), require("./services/stateService"), require("./controllers/audioController"), require("./controllers/breadcrumbController"), require("./controllers/creditsController"), require("./controllers/headerController"), require("./controllers/introController"), require("./controllers/mapController"), require("./controllers/menuController"), require("./controllers/panoController"), require("./controllers/streetviewController"), require("./controllers/takeactionController"), require("./controllers/videoController"), require("./directives/mousetouchDirective"), require("./filters/minutesFilter"), $(function () {
                        var requires = ["ngAnimate", "service.config", "service.map", "service.router", "service.state", "controller.audio", "controller.breadcrumb", "controller.credits", "controller.header", "controller.intro", "controller.map", "controller.menu", "controller.pano", "controller.streetview", "controller.takeaction", "controller.video", "directive.mousetouch", "filter.minutes"];
                        angular.module("bears-ears", requires).config(["$interpolateProvider", function ($interpolateProvider) {
                            $interpolateProvider.startSymbol("//").endSymbol("//")
                        }]).config(["$locationProvider", function ($locationProvider) {
                            $locationProvider.html5Mode(!0)
                        }]), angular.bootstrap(document, ["bears-ears"])
                    });
                    var tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName("script")[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                }, {
                    "./controllers/audioController": 3,
                    "./controllers/breadcrumbController": 4,
                    "./controllers/creditsController": 5,
                    "./controllers/headerController": 6,
                    "./controllers/introController": 7,
                    "./controllers/mapController": 8,
                    "./controllers/menuController": 9,
                    "./controllers/panoController": 10,
                    "./controllers/streetviewController": 11,
                    "./controllers/takeactionController": 12,
                    "./controllers/videoController": 13,
                    "./directives/mousetouchDirective": 14,
                    "./filters/minutesFilter": 15,
                    "./services/configService": 16,
                    "./services/mapService": 17,
                    "./services/routerService": 18,
                    "./services/stateService": 19,
                    angular: 26,
                    "angular-animate": 24
                }],
                3: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.audio", []),
                        audioController = function ($scope, $rootScope, $element, $http, $interval, $timeout, configService, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$element = $element, this.$http = $http, this.$interval = $interval, this.$timeout = $timeout, this.configService = configService, this.stateService = stateService, this.content = this.$scope.content, this.json = this.$scope.json, this.$scope.showOverlay = !0, this.player, this.$scope.currentState, this.$scope.isScrubbing = !1, this.$scope.scrubberWidth = 0, this.$scope.scrubberTotalWidth, this.$scope.wasPlaying = !1, this.$scope.timeTotal = 0, this.$scope.timeTotalInt = null, this.$scope.timeCurrent = 0, this.$scope.currentNarrator = null, this.$scope.isMuted, this.$scope.nextButtonActive = this.content.showNextCard || !1, this.$scope.showControls = !1, this.$scope.isMenuOpen = !1, this.$scope.playingBeforeMenu = !0, this.$scope.showTitlecard = !1, this.$scope.userPaused = !1, this.$scope.showPlayOverlay = !1, this.$scope.playPause = this.playPause.bind(this), this.$scope.pauseScrubber = this.pauseScrubber.bind(this), this.$scope.updateScrubber = this.updateScrubber.bind(this), this.$scope.getNarrator = this.getNarrator.bind(this), this.$scope.seekTo = this.seekTo.bind(this), this.$scope.goTo = this.goTo.bind(this), this.$scope.toggleMute = this.toggleMute.bind(this), this.$scope.showControls = this.showControls.bind(this), this.$scope.playCurrent = this.playCurrent.bind(this), this.$scope.showNextButton = !1, this.under10 = !1, this.init(), this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this.$scope.$on("mouse--active", this.showControls.bind(this)), this.$scope.$on("mouse--inactive", this._hideControls.bind(this))
                        };
                    audioController.prototype.init = function () {
                        this.$http({
                            method: "GET",
                            url: "/content/pages/" + this.json
                        }).then(function (response) {
                            this.$scope.supplemental = response.data
                        }.bind(this), function (response) {}.bind(this)), "playing" !== this.$scope.currentState && this._isMobileOrTouch() && (this.$scope.showPlayOverlay = !0), this.setupAudioPlayer()
                    }, audioController.prototype.setupAudioPlayer = function () {
                        var audioDir = "./assets/audio/",
                            audioOgg = audioDir + this.content.audio + ".ogg",
                            audioMp3 = audioDir + this.content.audio + ".mp3",
                            audioSrcs = this.$element.find("#audio source");
                        audioSrcs[0].setAttribute("src", audioOgg), audioSrcs[1].setAttribute("src", audioMp3), this.player = this.$element.find("#audio")[0], this._isMobileOrTouch() && this.player.pause(), this._addEventListeners()
                    }, audioController.prototype._addEventListeners = function () {
                        this.player.addEventListener("loadedmetadata", function () {
                            this.$scope.timeTotal = this.player.duration, this.$scope.timeTotalInt = this.player.duration, this.$scope.$apply()
                        }.bind(this)), this.player.addEventListener("playing", function () {
                            this.$scope.currentState = "playing", this.$scope.wasPlaying = !1, this.$scope.$apply()
                        }.bind(this)), this.player.addEventListener("pause", function () {
                            this.$scope.currentState = "paused", this.$scope.$apply(), this.$scope.timeCurrent > .5 && (this.$scope.userPaused = !0)
                        }.bind(this)), this.player.addEventListener("timeupdate", function () {
                            this.$scope.isScrubbing || (this.$scope.timeCurrent = this.player.currentTime, this.updateScrubberWidth(), this.setNextButton(), this.getNarrator(), this.content.titlecard && this._checkTitlecard()), this.$scope.$apply()
                        }.bind(this)), this.player.addEventListener("volumechange", function () {
                            this.$scope.isMuted = this.player.muted
                        }.bind(this))
                    }, audioController.prototype.pause = function () {
                        this.player.pause()
                    }, audioController.prototype.play = function () {
                        this.player.play()
                    }, audioController.prototype.playCurrent = function (type) {
                        this.$timeout(function () {
                            this.$scope.hidePlayOverlay = !0, this.$scope.showPlayOverlay = !1
                        }.bind(this), 500), this.play()
                    }, audioController.prototype.playPause = function () {
                        "playing" == this.$scope.currentState ? this.player.pause() : this.player.play()
                    }, audioController.prototype.toggleMute = function () {
                        this.player.muted = !this.player.muted
                    }, audioController.prototype.seekTo = function (time) {
                        this.player.currentTime = time, this.$scope.wasPlaying && time !== this.$scope.timeTotal && this.player.play(), this.$scope.isScrubbing = !1
                    }, audioController.prototype.pauseScrubber = function ($event) {
                        this.$scope.scrubberTotalWidth = event.currentTarget.offsetWidth, "playing" == this.$scope.currentState && (this.$scope.wasPlaying = !0, this.player.pause()), this.$scope.isScrubbing = !0, this.updateScrubber(event)
                    }, audioController.prototype.updateScrubber = function ($event) {
                        var offset;
                        offset = event.touches ? event.touches[0].pageX - event.touches[0].target.offsetLeft : event.offsetX, offset < 0 ? offset = 0 : offset > this.$scope.scrubberTotalWidth && (offset = this.$scope.scrubberTotalWidth), this.$scope.isScrubbing && (this.$scope.timeCurrent = this.$scope.timeTotal * (offset / this.$scope.scrubberTotalWidth), this.updateScrubberWidth())
                    }, audioController.prototype.updateScrubberWidth = function () {
                        this.$scope.scrubberWidth = this.$scope.timeCurrent / this.$scope.timeTotal * 100
                    }, audioController.prototype.getNarrator = function () {
                        var narrators = this.content.narrators;
                        for (var narrator in narrators)
                            for (var time in narrators[narrator].times) {
                                var section = narrators[narrator].times[time];
                                if (this.$scope.timeCurrent >= section[0] && this.$scope.timeCurrent <= section[1]) return void(this.$scope.currentNarrator = narrators[narrator].name)
                            }
                        this.$scope.currentNarrator = null
                    }, audioController.prototype.setNextButton = function () {
                        !this.under10 && this.$scope.timeTotal - this.$scope.timeCurrent < 10 && (this.under10 = !0, this.content["no-auto-next-button"] || (this.$scope.showNextButton = !0)), this.under10 && this.$scope.timeTotal - this.$scope.timeCurrent >= 10 && (this.under10 = !1, this.$scope.showNextButton = !1), this.$scope.timeTotal - this.$scope.timeCurrent < 1 && (this.$scope.showNextButton = !1)
                    }, audioController.prototype.goTo = function (direction) {
                        this.$scope.showControls = !1, this._done(direction)
                    }, audioController.prototype._done = function (direction) {
                        this.player.pause(), this.stateService.end(direction)
                    }, audioController.prototype._hideControls = function () {
                        this.$scope.showControls = !1
                    }, audioController.prototype.showControls = function () {
                        this.$scope.showControls = !0
                    }, audioController.prototype._onMenuClose = function () {
                        this.$scope.isMenuOpen = !1, this.$scope.playingBeforeMenu && this.$timeout(function () {
                            this._play()
                        }.bind(this))
                    }, audioController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0, "playing" == this.$scope.currentState ? this.$scope.playingBeforeMenu = !0 : this.$scope.playingBeforeMenu = !1, this.pause()
                    }, audioController.prototype._checkTitlecard = function () {
                        !this.$scope.showTitlecard && this.$scope.timeCurrent > 2 && this.$scope.timeCurrent < 7 ? this.$scope.showTitlecard = !0 : this.$scope.timeCurrent > 7 && (this.$scope.showTitlecard = !1)
                    }, audioController.prototype._isMobileOrTouch = function () {
                        return !!("smartphone" == this.configService.size || this.configService.hasTouch && "desktop" != this.configService.size)
                    }, controller.controller("audioController", audioController), module.exports = controller
                }, {
                    angular: 26
                }],
                4: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.breadcrumb", []),
                        content = require("../../content/content.json"),
                        breadcrumbController = function ($scope, $rootScope, $location, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$location = $location, this.stateService = stateService, this.content = content, this.$scope.showBreadcrumbs = !1, this.$scope.crumbs = [{
                                // name: "Bears Ears",
                                name: "Balkondes",
                                level: "0",
                                link: "/"
                            }], this.$scope.visit = this.visit.bind(this), this.$rootScope.$on("section--change", this._change.bind(this)), this.$rootScope.$on("menu--open", this._hide.bind(this)), this.$rootScope.$on("menu--close", this._show.bind(this)), this.$rootScope.$on("home--open", this._hideAndReset.bind(this))
                        };
                    breadcrumbController.prototype.visit = function (url) {
                        "/" == url ? this.$rootScope.$broadcast("home--visit") : this.stateService.jump(url)
                    }, breadcrumbController.prototype._change = function ($event, next) {
                        if (this._show(), this.$scope.crumbs = this.$scope.crumbs.splice(0, 1), next.parent) {
                            var parent = this.content[next.parent];
                            this.$scope.crumbs.push({
                                name: parent.content.name,
                                level: parent.level,
                                link: next.parent
                            })
                        }
                    }, breadcrumbController.prototype._hide = function ($event, next) {
                        this.$scope.showBreadcrumbs = !1
                    }, breadcrumbController.prototype._hideAndReset = function ($event, next) {
                        this._hide(), this.$scope.crumbs = this.$scope.crumbs.splice(0, 1)
                    }, breadcrumbController.prototype._show = function () {
                        "/" !== this.$location.path() && (this.$scope.showBreadcrumbs = !0)
                    }, controller.controller("breadcrumbController", breadcrumbController), module.exports = controller
                }, {
                    "../../content/content.json": 1,
                    angular: 26
                }],
                5: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.credits", []),
                        creditsController = function ($element, $scope, $rootScope, $timeout, configService, stateService) {
                            this.$element = $element, this.$scope = $scope, this.$rootScope = $rootScope, this.$timeout = $timeout, this.$scope.active = !1, this.$scope.isMenuOpen = !1, this.initialized = !1, this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this.$rootScope.$on("credits--open", this._open.bind(this)), this.$rootScope.$on("home--open", this._close.bind(this)), this.$rootScope.$on("section--change", this._changeSection.bind(this))
                        };
                    creditsController.prototype._init = function () {}, creditsController.prototype._changeSection = function (object, next) {
                        "credits" !== next.id && this._close()
                    }, creditsController.prototype._close = function () {
                        this.$scope.active && this.$timeout(function () {
                            this.$scope.active = !1, this.$rootScope.$broadcast("takeaction--close")
                        }.bind(this))
                    }, creditsController.prototype._open = function () {
                        this.initialized || this._init(), this.$timeout(function () {
                            this.$scope.active = !0, this.$scope.isMenuOpen = !1, this.$rootScope.$broadcast("header--force")
                        }.bind(this))
                    }, creditsController.prototype._onMenuClose = function () {
                        this.$scope.active && (this.$rootScope.$broadcast("header--force"), this.$rootScope.$broadcast("home--open"), this.$scope.isMenuOpen = !1, this.$scope.active = !1)
                    }, creditsController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0
                    }, controller.controller("creditsController", creditsController), module.exports = controller
                }, {
                    angular: 26
                }],
                6: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.header", []),
                        headerController = function ($scope, $rootScope, routerService, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.routerService = routerService, this.stateService = stateService, this.$scope.menuButton = "open", this.$scope.headerVisible = !1, this.$scope.headerEnabled = !1, this.$scope.takeActionActive = !1, this.$scope.experienceActive = !1, this.$scope.isAtHome = !0, this.$scope.closeMenu = this.closeMenu.bind(this), this.$scope.goHome = this.goHome.bind(this), this.$scope.openMenu = this.openMenu.bind(this), this.$scope.toggleMenu = this.toggleMenu.bind(this),
                                this.$scope.visit = this.visit.bind(this), this.$scope.shareFB = this.shareFB, this.$scope.shareTwitter = this.shareTwitter, this.headerForce = !1, this.closeEvent = null, this.$rootScope.$on("home--open", this._onHomeOpen.bind(this)), this.$rootScope.$on("home--visit", this.goHome.bind(this)), this.$rootScope.$on("header--enable", this._enableHeader.bind(this)), this.$rootScope.$on("header--disable", this._disableHeader.bind(this)), this.$rootScope.$on("header--force", this._forceHeader.bind(this)), this.$rootScope.$on("header--unforce", this._unforceHeader.bind(this)), this.$rootScope.$on("menu--open", this._openMenuButton.bind(this)), this.$rootScope.$on("menu--closed", this._closeMenuButton.bind(this)), this.$rootScope.$on("interstitial--opened", this._openMenuButton.bind(this)), this.$rootScope.$on("initialize--jump", this._closeMenuButton.bind(this)), this.$rootScope.$on("mouse--active", this._showHeader.bind(this)), this.$rootScope.$on("mouse--inactive", this._hideHeader.bind(this)), this.$rootScope.$on("takeaction--open", this._onTakeActionOpen.bind(this)), this.$rootScope.$on("takeaction--close", this._onTakeActionClose.bind(this)), this.$rootScope.$on("experience--open", this._onExperienceOpen.bind(this)), this.$rootScope.$on("experience--close", this._onExperienceClose.bind(this))
                        };
                    headerController.prototype.shareFB = function () {
                        var encode = encodeURIComponent(window.location.hostname);
                        window.open("https://www.facebook.com/sharer.php?u=" + encode, "", "height=368,width=600,left=100,top=100,menubar=0")
                    }, headerController.prototype.shareTwitter = function () {
                        var shareText = "Keep public lands in public hands. Protect Bears Ears National Monument. Explore more at bearsears.patagonia.com",
                            encode = encodeURIComponent(window.location.hostname) + "&text=" + encodeURIComponent(shareText);
                        window.open("https://twitter.com/intent/tweet?url=" + encode, "", "height=440,width=500,left=100,top=100,menubar=0")
                    }, headerController.prototype.closeMenu = function () {
                        this._closeMenuButton(), null == this.closeEvent && this.$rootScope.$broadcast("menu--close", !0)
                    }, headerController.prototype.goHome = function ($event) {
                        $event.preventDefault(), this.$scope.experienceActive = !1, this._closeMenuButton(), this._forceHeader(), this.stateService.end("postIntroHome")
                    }, headerController.prototype.openMenu = function (type) {
                        this._forceHeader(), this.$scope.menuButton = "close", this.$rootScope.$broadcast("menu--open", type)
                    }, headerController.prototype.toggleMenu = function (type) {
                        "close" == this.$scope.menuButton ? this.closeMenu() : this.openMenu("full")
                    }, headerController.prototype.visit = function (url) {
                        this.$rootScope.$broadcast("menu--close", !1), this._closeMenuButton(), "/" == url ? this.$rootScope.$broadcast("home--visit") : this.stateService.jump(url)
                    }, headerController.prototype._disableHeader = function () {
                        this.$scope.headerEnabled = !1
                    }, headerController.prototype._enableHeader = function () {
                        this.$scope.headerEnabled = !0
                    }, headerController.prototype._forceHeader = function () {
                        this.headerForce = !0, this.$scope.headerEnabled = !0, this._showHeader()
                    }, headerController.prototype._hideHeader = function () {
                        this.headerForce || (this.$scope.headerVisible = !1)
                    }, headerController.prototype._showHeader = function () {
                        this.$scope.headerEnabled && (this.$scope.headerVisible = !0)
                    }, headerController.prototype._closeMenuButton = function () {
                        this.headerForce = !1, this.$scope.menuButton = "open", this.$scope.isAtHome = !1, this.closeEvent && this.$rootScope.$broadcast(this.closeEvent), this.closeEvent = null
                    }, headerController.prototype._openMenuButton = function (event, menu, closeEvent) {
                        this.$scope.menuButton = "close", this.closeEvent = null, closeEvent && (this.closeEvent = closeEvent)
                    }, headerController.prototype._onExperienceOpen = function () {
                        this.$scope.experienceActive = !0
                    }, headerController.prototype._onExperienceClose = function () {
                        this.$scope.experienceActive = !1
                    }, headerController.prototype._onHomeOpen = function () {
                        this._forceHeader(), this.$scope.isAtHome = !0
                    }, headerController.prototype._onTakeActionOpen = function () {
                        this.$scope.takeActionActive = !0
                    }, headerController.prototype._onTakeActionClose = function () {
                        this.$scope.takeActionActive = !1
                    }, headerController.prototype._unforceHeader = function () {
                        this.headerForce = !1
                    }, controller.controller("headerController", headerController), module.exports = controller
                }, {
                    angular: 26
                }],
                7: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.intro", []),
                        content = require("../../content/content.json"),
                        introController = function ($element, $rootScope, $scope, $interval, $timeout, configService, stateService, routerService) {
                            this.$element = $element, this.$rootScope = $rootScope, this.$scope = $scope, this.$interval = $interval, this.$timeout = $timeout, this.configService = configService, this.stateService = stateService, this.routerService = routerService, this.content = content, this.$scope.goTo = this.goTo.bind(this), this.$scope.playPause = this.playPause.bind(this), this.$scope.updateScrubber = this.updateScrubber.bind(this), this.$scope.updateScrubberWidth = this.updateScrubberWidth.bind(this), this.$scope.pauseScrubber = this.pauseScrubber.bind(this), this.$scope.seekTo = this.seekTo.bind(this), this.$scope.skipDoomsday = this.skipDoomsday.bind(this), this.$scope.toggleMute = this.toggleMute.bind(this), this.$scope.doomsday = !1, this.$scope.active = !0, this.$scope.activeTitle = -1, this.$scope.blur = !1, this.$scope.showLoading = !1, this.$scope.showMeta = !1, this.$scope.showVideo = !1, this.$scope.showDoomsday = !1, this.$scope.introEnded = !1, this.$scope.showPlayButton = !1, this.$scope.showPreviewTitle = !1, this.$scope.showPreview = !1, this.$scope.timeCurrent, this.$scope.timeTotal, this.$scope.currentState = "unstarted", this.$scope.wasPlaying = !1, this.$scope.isScrubbing = !1, this.$scope.scrubberWidth = 0, this.$scope.scrubberTotalWidth, this.$scope.isMuted = !1, this.$scope.showControls = !1, this.$scope.controlActive = !1, this.queue = !0, this.timeouts = [], this.titleInterval, this.under1 = !1, this.under20 = !1, this.pastIntro = !1, this.init(), this.onResize(), this.$scope.$on("mouse--active", this._showControls.bind(this)), this.$scope.$on("mouse--inactive", this._hideControls.bind(this))
                        };
                    introController.prototype.init = function ($event) {
                        console.log('ketiga')
                        // intervalMap = setTimeout(() => {
                        this._preloader(), this.titles = this.content.intro.titles, "desktop" == this.configService.size || this.$scope.doomsday ? this.$scope.showPreview = !0 : (this.$scope.showPreview = !0, this._addLoadTimeout()), this.$rootScope.$on("youtubeIframeAPIReady", this.onReady.bind(this)), this.$rootScope.$on("resize", this.onResize.bind(this))
                        // }, 3000);

                        // clearInterval(intervalMap)
                    }, introController.prototype.updateScrubber = function ($event) {
                        var offset;
                        offset = $event.originalEvent.touches ? $event.originalEvent.touches[0].pageX - $event.originalEvent.touches[0].target.offsetLeft : $event.offsetX, this.$scope.isScrubbing && (this.$scope.timeCurrent = this.$scope.timeTotal * (offset / this.$scope.scrubberTotalWidth), this.updateScrubberWidth())
                    }, introController.prototype.updateScrubberWidth = function () {
                        this.$scope.scrubberWidth = this.$scope.timeCurrent / this.$scope.timeTotal * 100
                    }, introController.prototype.pauseScrubber = function ($event) {
                        this.$scope.scrubberTotalWidth = $event.currentTarget.offsetWidth, "playing" == this.$scope.currentState && (this.$scope.wasPlaying = !0, this.player.pauseVideo()), this.$scope.isScrubbing = !0, this.updateScrubber($event)
                    }, introController.prototype.seekTo = function (time) {
                        this.player.seekTo(time, !0), this.$scope.wasPlaying && this.player.playVideo(), this.$scope.isScrubbing = !1
                    }, introController.prototype.toggleMute = function (button) {
                        this.player.isMuted() ? this.player.unMute() : this.player.mute(), this.$scope.isMuted = !this.$scope.isMuted
                    }, introController.prototype._showControls = function () {
                        this.$scope.showControls = !0
                    }, introController.prototype._hideControls = function () {
                        this.$scope.showControls = !1
                    }, introController.prototype.cueVideo = function () {
                        this.$scope.showPreview && (this.previewPlayer = new YT.Player(this.$element.find("#intro-preview")[0], {
                            height: "100%",
                            width: "100%",
                            videoId: this.content.intro.content.mobileVideoId,
                            playerVars: {
                                autoplay: 0,
                                autohide: 1,
                                showinfo: 0,
                                controls: 0,
                                rel: 0,
                                modestbranding: 1,
                                playsinline: 1,
                                loop: this.$scope.doomsday || "desktop" == this.configService.size ? 1 : 0,
                                playlist: this.content.intro.content.mobileVideoId
                            },
                            events: {
                                onStateChange: this._onPlayerStateChange.bind(this),
                                onReady: this._onPreviewPlayerReady.bind(this)
                            }
                        })), this.player = new YT.Player(this.$element.find("#intro-video")[0], {
                            height: "100%",
                            width: "100%",
                            videoId: this.content.intro.content.videoId,
                            playerVars: {
                                autoplay: 0,
                                autohide: 1,
                                showinfo: 0,
                                controls: 0,
                                rel: 0,
                                modestbranding: 1,
                                playsinline: 1
                            },
                            events: {
                                onStateChange: this._onPlayerStateChange.bind(this),
                                onReady: this._onPlayerReady.bind(this)
                            }
                        })
                    }, introController.prototype.onResize = function () {
                        var dimensions = this.configService.getFillSize();
                        this.$element.find("#intro-video").css(dimensions), this.$element.find("#intro-preview").css(dimensions)
                    }, introController.prototype.onReady = function () {
                        var path = this.routerService.getPath();
                        "" == path ? (this.cueVideo(), this.routerService.init(!1)) : (this.$rootScope.$on("initial--loaded", this._onPastIntro.bind(this)), this.routerService.init(!0), this.$timeout(function () {
                            this.$scope.showLoading && this._onPastIntro()
                        }.bind(this), 8e3))
                    }, introController.prototype.playPause = function () {
                        this.$scope.showPreview && (this.$scope.showPlayButton = !1, this.$scope.showPreviewTitle = !1, this.$scope.endPreview = !0), this.player.getPlayerState() == YT.PlayerState.PLAYING ? this.player.pauseVideo() : this.player.playVideo()
                    }, introController.prototype.goTo = function ($event, next) {
                        $event.preventDefault(), this._cancelTimeouts(), this.$timeout(function () {
                            this.$scope.showDoomsday && (this.$scope.showDoomsday = !1, this.$scope.showPreview = !1), this.$scope.blur = !0, this.$scope.activeTitle = -1
                        }.bind(this)), this.$timeout(function () {
                            this._done(next)
                        }.bind(this), 500)
                    }, introController.prototype.skipDoomsday = function () {
                        this.$scope.doomsday = !1, this.$scope.endPreview = !0, this.player.playVideo()
                    }, introController.prototype._addLoadTimeout = function () {
                        this.$timeout(function () {
                            this.$scope.showMeta || (this.$scope.showPreviewTitle = !0, this.$scope.showPlayButton = !0, this.$scope.showLoading = !1, this.$scope.showVideo = !0, this.$scope.showMeta = !0, this.previewPlayer.destroy())
                        }.bind(this), 1e4)
                    }, introController.prototype._checkEnd = function () {
                        !this.under1 && this.$scope.timeTotal - this.$scope.timeCurrent < 1.6 && (this.under1 = !0, this.$timeout(function () {
                            this.$scope.blur = !0
                        }.bind(this)), this.$timeout(function () {
                            this.$scope.activeTitle = -1
                        }.bind(this), 1500), this.$timeout(function () {
                            this._done("home")
                        }.bind(this), 2e3))
                    }, introController.prototype._onPastIntro = function () {
                        this.pastIntro = !0, this.$rootScope.$broadcast("header--enable"), this.$scope.showLoading = !1, this.$scope.showMeta = !1, this.$scope.showVideo = !0, this.$scope.blur = !0
                    }, introController.prototype._preloader = function (event) {
                        var loadingimg = new Image;
                        loadingimg.onload = function () {
                            this.$timeout(function () {
                                this.pastIntro || (this.$scope.showLoading = !0)
                            }.bind(this), 500)
                        // }.bind(this), loadingimg.src = "./assets/intro/_loader-2x.gif"
                        }.bind(this), loadingimg.src = "./assets/intro/logo-kbkm.png"
                    }, introController.prototype._onPlayerStateChange = function (event) {
                        event.data == YT.PlayerState.ENDED ? (this.$scope.showPreview && !this.$scope.doomsday && "desktop" != this.configService.size && this._done("home"), this.$interval.cancel(this.titleInterval)) : event.data == YT.PlayerState.PLAYING ? (this.$scope.currentState = "playing", this.$scope.showPreview && !this.$scope.doomsday && (this.$scope.endPreview ? this._endPreview() : (this.$scope.showPreviewTitle = !0, this.$scope.showPlayButton = !0)), this.$scope.showLoading = !1, this.$scope.showVideo = !0, this.$scope.showMeta = !0, this.$scope.showPreview && this.$scope.doomsday ? this.$scope.showDoomsday = !0 : this.$scope.showDoomsday = !1, this.$scope.timeTotal = this.player.getDuration(), this.$scope.timeCurrent = this.player.getCurrentTime(), this.$interval.cancel(this.titleInterval), this.$scope.showPreview || (this.$scope.controlActive = !0, this.$scope.timeCurrent = this.player.getCurrentTime(), this.titleInterval = this.$interval(function () {
                            this.$scope.timeCurrent = this.player.getCurrentTime(), this.timeCurrent = this.player.getCurrentTime(), this.updateScrubberWidth(), this._showText(), this._checkEnd()
                        }.bind(this), 300)), this.$scope.wasPlaying && (this.$scope.wasPlaying = !1)) : (event.data == YT.PlayerState.PAUSED && (this.$scope.currentState = "paused"), this.$interval.cancel(this.titleInterval))
                    }, introController.prototype._onPlayerReady = function () {
                        this.$scope.showPreview && this.previewPlayer || this.player.playVideo()
                    }, introController.prototype._onPreviewPlayerReady = function () {
                        this.previewPlayer.mute(), this.previewPlayer.playVideo()
                    }, introController.prototype._cancelTimeouts = function () {
                        for (var i = 0; i < this.timeouts.length; i++) this.$timeout.cancel(this.timeouts[i]);
                        this.$interval.cancel(this.titleInterval)
                    }, introController.prototype._done = function (next) {
                        this.$interval.cancel(this.titleInterval), this.$scope.activeTitle = -1, this.$scope.controlActive = !1, this.$rootScope.$broadcast("header--enable"), this.$scope.showPreview && this._endPreview(), this.$scope.showMeta = !1, this.$scope.blur = !0, this.$timeout(function () {
                            this.player && (this.player.pauseVideo(), this.player.destroy())
                        }.bind(this), this.$scope.showPreview ? 500 : 2e3), "home" == next ? this.stateService.end("postIntroHome") : "take-action" == next ? this.$timeout(function () {
                            this.stateService.jump("take-action"), this.$rootScope.$broadcast("menu--closed"), this._endPreview()
                        }.bind(this), 1e3) : (this.stateService.jump("experience"), this.$scope.showLoading = !1, this.$timeout(function () {
                            this.$scope.showVideo = !0
                        }.bind(this), 500)), this.$timeout(function () {
                            this.$scope.introEnded = !0
                        }.bind(this), 500)
                    }, introController.prototype._endPreview = function () {
                        this.$scope.showPreview = !1, this.$scope.showPreviewTitle = !1, this.previewPlayer && this.$timeout(function () {
                            try {
                                this.previewPlayer.pauseVideo(), this.previewPlayer.destroy()
                            } catch (e) {}
                        }.bind(this), 1e3)
                    }, introController.prototype._showText = function () {
                        for (var i = 0; i < this.titles.length; i++) {
                            if (this.$scope.timeCurrent > this.titles[i].start && this.$scope.timeCurrent < this.titles[i].end) {
                                this.$scope.activeTitle = this.titles[i].id;
                                break
                            }
                            this.$scope.activeTitle = -1
                        }
                    }, controller.controller("introController", introController), module.exports = controller
                }, {
                    "../../content/content.json": 1,
                    angular: 26
                }],
                8: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.map", []),
                        content = require("../../content/content.json"),
                        mapController = function ($scope, $rootScope, $element, $interval, $timeout, mapService, configService, stateService) {
                            console.log('kedua')
                            // intervalMap = setTimeout(() => {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$interval = $interval, this.$element = $element, this.$timeout = $timeout, this.mapService = mapService, this.configService = configService, this.stateService = stateService, this.$scope.showMap = !1, this.$scope.places = this.places = [], this.$scope.currentMarker, this.$scope.currentCoords, this.$scope.hovered = !1, this.$scope.showInfo = !1, this.map, this.center, this.zoomLevel = 12, this.overlay, this.markers = [], this.timer, this.mapOffset = $(window).width() / 5, this.displaytimer, this.$scope.open = this.open.bind(this), this.$scope.hideCard = this.hideCard.bind(this), this.$scope.visit = this.visit.bind(this), this.$scope.toggleInfo = this.toggleInfo.bind(this), this.$scope.zoomIn = this.zoomIn.bind(this), this.$scope.zoomOut = this.zoomOut.bind(this), this.stateLabels = content.map.content["state-labels"], this.observer, this.markerDelaySet = 0, this.$timeout(function () {
                                this._init()
                            }.bind(this))
                            // }, 3000);

                            // clearInterval(intervalMap)
                        };
                    mapController.prototype._init = function () {
                        this._populate(), this.observer = new MutationObserver(function (mutations) {
                            var $imgList = $("#map-container").find('img[src^="./assets/icons/type_"]');
                            $imgList.length == 2 * this.places.length && ($imgList.each(function (index) {
                                $(this).css("animation-delay", index / 20 + "s")
                            }), this.markerDelaySet = $imgList.length, this.observer.disconnect())
                        }.bind(this));
                        var config = {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        };
                        this.observer.observe(document.getElementById("map-container"), config), this.mapService.mapsInitialized.then(function () {
                            // RV-MAP DEFINE 
                            this.center = new google.maps.LatLng(-7.6078311, (110.2037513)), this.map = new google.maps.Map(document.getElementById("map-container"), {
                                backgroundColor: "#614f40",
                                center: this.center,
                                disableDefaultUI: !0,
                                gestureHandling: "greedy",
                                mapTypeId: "hybrid",
                                minZoom: 7,
                                scrollwheel: !1,
                                // zoom: this.zoomLevel,
                                zoom: 12,
                                styles: [{
                                    stylers: [{
                                        visibility: "off"
                                    }]
                                }, {
                                    featureType: "administrative.province",
                                    elementType: "geometry.stroke",
                                    stylers: [{
                                        color: "#ffffff"
                                    }, {
                                        visibility: "on"
                                    }, {
                                        weight: 1.5
                                    }]
                                }]
                            });
                            for (var i in this.stateLabels) new google.maps.Marker({
                                icon: {
                                    url: "./assets/map/" + this.stateLabels[i].icon,
                                    scaledSize: new google.maps.Size(this.stateLabels[i].size.x, this.stateLabels[i].size.y),
                                    anchor: new google.maps.Point(this.stateLabels[i].anchor.x, this.stateLabels[i].anchor.y)
                                },
                                map: this.map,
                                position: this.stateLabels[i].position,
                                opacity: .7
                            });
                            this._addColorOverlay(), this._addBorder(), this._setMarkers(), this._addMapListeners()
                        }.bind(this)), this.$rootScope.$on("map--open", this.open.bind(this)), this.$rootScope.$on("map--close", this._close.bind(this)), this.$rootScope.$on("home--open", this._close.bind(this)), this.$rootScope.$on("takeaction--open", this._close.bind(this)), this.$rootScope.$on("section--change", this._onSectionChange.bind(this))
                    }, mapController.prototype.toggleInfo = function () {
                        this.$scope.showInfo ? (this.$scope.showInfo = !1, this.$timeout(function () {
                            this.$rootScope.$broadcast("header--force")
                        }.bind(this), 500)) : (this.$rootScope.$broadcast("header--disable"), this.$scope.showInfo = !0, this.$scope.currentMarker = null)
                    }, mapController.prototype._addBorder = function () {
                        var origin = document.location.origin,
                            base = $("base").attr("href").replace(/^\/|\/$/g, ""),
                            kmlPath = "assets/map/border.kml",
                            kmlUrl = origin + "/" + base + "/" + kmlPath;
                        if (window.location.href.indexOf("localhost") > -1) {
                            new KmlMapParser({
                                map: this.map,
                                kml: "./assets/map/border.kml",
                                allFoldersOpen: !0,
                                highlightColor: "ffffff",
                                showImageShadow: !0,
                                showBubble: !1,
                                showFolders: !1,
                                showDragZoomButton: !1,
                                showMultiPointsAsMarkers: !1,
                                showOverlaysInSidebar: !1,
                                showRootName: !1,
                                showSidebar: !1,
                                showSidebarDescriptions: !1,
                                useMapCenter: !0,
                                zoomLevel: 9,
                                zoomOnClick: !1
                            })
                        } else {
                            new google.maps.KmlLayer({
                                url: kmlUrl,
                                map: this.map,
                                preserveViewport: !0,
                                suppressInfoWindows: !0
                            })
                        }
                    }, mapController.prototype._populate = function () {
                        for (var i in content) content[i].id = i, content[i].content.mapCoord && this.places.push(content[i])
                    }, mapController.prototype._setMarkers = function () {
                        for (var i in this.places) {
                            var type = this.places[i].content.icons[0],
                                category = this.places[i].parent,
                                iconPath = "./assets/icons/type_" + type + "_" + category + ".svg",
                                marker = new google.maps.Marker({
                                    icon: {
                                        url: iconPath,
                                        scaledSize: new google.maps.Size(30, 30)
                                    },
                                    optimized: !1,
                                    id: this.places[i].id,
                                    map: this.map,
                                    position: this.places[i].content.mapCoord
                                });
                            this.markers.push(marker)
                        }
                    }, mapController.prototype._addColorOverlay = function () {
                        function CoordMapType(tileSize) {
                            this.tileSize = tileSize
                        }
                        CoordMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
                            var div = ownerDocument.createElement("div");
                            return div.style.width = this.tileSize.width + "px", div.style.height = this.tileSize.height + "px", div.style.backgroundColor = "#7D5847", div.style.opacity = .4, div
                        }, this.map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256)))
                    }, mapController.prototype._addMapListeners = function () {
                        google.maps.event.addListener(this.map, "projection_changed", function () {
                            this.overlay = new google.maps.OverlayView, this.overlay.draw = function () {}, this.overlay.setMap(this.map), "desktop" == this.configService.size && this._updateCenter();
                            for (var i in this.markers) {
                                var marker = this.markers[i];
                                (function (marker) {
                                    marker.addListener("mouseover", this.updateCoords(marker, "hover")), marker.addListener("click", this.updateCoords(marker))
                                }).bind(this)(marker)
                            }
                            this.map.addListener("center_changed", this.updateCoords()), this.map.addListener("mousemove", function (e) {
                                this.$scope.hovered === !0 && this.$scope.hideCard(), this.$scope.$apply()
                            }.bind(this)), this.map.addListener("click", function (e) {
                                this.$scope.hideCard(), this.$scope.$apply()
                            }.bind(this)), this.map.addListener("dragstart", function (e) {
                                "desktop" != this.configService.size && (this.$scope.hideCard(), this.$scope.$apply())
                            }.bind(this))
                        }.bind(this))
                    }, mapController.prototype._updateCenter = function () {
                        this.$timeout(function () {
                            if (this.overlay.getProjection()) {
                                var center = this.overlay.getProjection().fromLatLngToContainerPixel(this.center);
                                center.x -= this.mapOffset, center = this.overlay.getProjection().fromContainerPixelToLatLng(center), this.map.setCenter(center)
                            }
                        }.bind(this), 300)
                    }, mapController.prototype.updateCoords = function (marker, type) {
                        return function (e) {
                            if ("hover" == type) {
                                if (null !== this.$scope.currentMarker) return;
                                this.$scope.hovered = !0
                            }
                            var coords;
                            if (!marker && this.$scope.currentMarker && this.overlay.getProjection) coords = this.overlay.getProjection().fromLatLngToContainerPixel(this.$scope.currentMarker.getPosition());
                            else {
                                if (!marker || !this.overlay.getProjection) return;
                                coords = this.overlay.getProjection().fromLatLngToContainerPixel(marker.getPosition()), "hover" == type ? this.$scope.currentMarker = marker : (this.$scope.hovered = !1, this.$scope.currentMarker = marker)
                            }
                            "smartphone" != this.configService.size ? this.$scope.currentCoords = {
                                x: coords.x,
                                y: coords.y
                            } : this.$scope.currentCoords = {
                                x: $(window).width() / 2,
                                y: $(window).height() / 2
                            }, this.$scope.$apply()
                        }.bind(this)
                    }, mapController.prototype.hideCard = function ($event) {
                        $event && ($event.preventDefault(), $event.stopPropagation()), this.$scope.hovered = !1, this.$timeout.cancel(this.timer), this.$scope.currentMarker = null
                    }, mapController.prototype.visit = function ($event) {
                        $event.preventDefault();
                        var id = $event.currentTarget.attributes.href.value.substr(1);
                        this._close(), this.$rootScope.$broadcast("menu--close"), this.$rootScope.$broadcast("menu--closed"), this.stateService.jump(id), this.$timeout(function () {
                            this._resetMap()
                        }.bind(this))
                    }, mapController.prototype._resetMap = function () {
                        this.hideCard(), this.map.setZoom(this.zoomLevel), "desktop" == this.configService.size ? this._updateCenter() : this.map.setCenter(this.center)
                    }, mapController.prototype.zoomIn = function () {
                        this.map.setZoom(this.map.getZoom() + 1)
                    }, mapController.prototype.zoomOut = function () {
                        this.map.setZoom(this.map.getZoom() - 1)
                    }, mapController.prototype.open = function () {
                        this.$timeout(function () {
                            this.$scope.showMap = !0, this.$rootScope.$broadcast("header--force")
                        }.bind(this)), this.displaytimer = this.$interval(function () {
                            var resized = !1;
                            "block" == $(".map").css("display") && (resized = !0, google.maps.event.trigger(this.map, "resize"), "desktop" == this.configService.size ? this._updateCenter() : this.map.setCenter(this.center)), resized && this.$interval.cancel(this.displaytimer)
                        }.bind(this), 300)
                    }, mapController.prototype._close = function () {
                        this.$scope.showMap = !1
                    }, mapController.prototype._onSectionChange = function (object, next) {
                        "map" !== next.type && this._close()
                    }, controller.controller("mapController", mapController), module.exports = controller
                }, {
                    "../../content/content.json": 1,
                    angular: 26
                }],
                9: [function (require, module, exports) {
                    var angular = require("angular"),
                        debounce = require("throttle-debounce/debounce"),
                        controller = angular.module("controller.menu", []),
                        content = require("../../content/content.json"),
                        menuController = function ($scope, $rootScope, $element, $timeout, $interval, $location, configService, routerService, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$element = $element, this.$timeout = $timeout, this.$interval = $interval, this.$location = $location, this.stateService = stateService, this.configService = configService, this.routerService = routerService, this.$scope.close = this.close.bind(this), this.$scope.move = this.move.bind(this), this.$scope.open = this.open.bind(this), this.$scope.visit = this.visit.bind(this), this.$scope.smoothMove = this.smoothMove.bind(this), this.$scope.active = "", this.$scope.section = 0, this.$scope.full = this.full = [], this.$scope.main = this.main = [], this.$scope.menuActive = !1, this.$scope.showButton = !1, this.$scope.showForward = !0, this.$scope.showBack = !0, this.$scope.scrolled = !1, this.$scope.isMobile = !0, this.$scope.movingBetween = !1, this.container = this.$element.find(".menu-full .menuContainer"), this.arrowRight = this.$element.find(".menu-arrow--right"), this.arrowLeft = this.$element.find(".menu-arrow--left"), this.halfWidth = $(window).width() / 2, this.halfHeight = $(window).height() / 2, this.offsets = [], this.atHome = !1, this.resetFullTimeout, this.movePromise, this.touchScreen = !1, this.moveStep = this.moveStep.bind(this), this._init()
                        };
                    menuController.prototype._init = function () {
                        this._populate(), this._bindScroll(), this._onScroll(), this._mouseTracking(), this.$scope.isMobile = "smartphone" == this.configService.size && $(window).width() < $(window).height(), this.$scope.$on("resize", function () {
                            this._buildOffsets(), this.$scope.isMobile = "smartphone" == this.configService.size && $(window).width() < $(window).height()
                        }.bind(this)), this.$rootScope.$on("home--open", function () {
                            this.atHome = !0, this.open("main")
                        }.bind(this)), this.$rootScope.$on("menu--open", function (object, type, card) {
                            this.open(type, card), card && (this.atHome = !0)
                        }.bind(this)), this.$rootScope.$on("menu--close", function (object, goHome) {
                            this.onCloseClick(goHome)
                        }.bind(this)), this.$scope.$on("submenu--open", function () {
                            this.container.scrollLeft(0), this.open("full"), this._buildOffsets(), this.$scope.$on("resize", this._buildOffsets.bind(this))
                        }.bind(this)), this.container.on("orientationchange", function (e) {
                            this.container.scrollTop(0)
                        }.bind(this)), this.arrowRight.on("mouseenter", function (e) {
                            this.smoothMove("forward")
                        }.bind(this)), this.arrowRight.on("mouseleave", function (e) {
                            this.smoothMove("stop")
                        }.bind(this)), this.arrowRight.on("touchend", function (e) {
                            this.move("forward")
                        }.bind(this)), this.arrowLeft.on("mouseenter", function (e) {
                            this.smoothMove("back")
                        }.bind(this)), this.arrowLeft.on("mouseleave", function (e) {
                            this.smoothMove("stop")
                        }.bind(this)), this.arrowLeft.on("touchend", function (e) {
                            this.move("back")
                        }.bind(this)), this.arrowLeft.on("touchstart", function (e) {
                            this.touchScreen = !0
                        }.bind(this)), this.arrowRight.on("touchstart", function (e) {
                            this.touchScreen = !0
                        }.bind(this))
                    }, menuController.prototype.smoothMove = function (target) {
                        this.touchScreen || "back" != target && "forward" != target ? (this.$interval.cancel(this.movePromise), this.movePromise = void 0) : this.movePromise = this.$interval(function () {
                            this.touchScreen ? (this.$interval.cancel(this.movePromise), this.movePromise = void 0) : this.moveStep(target)
                        }.bind(this), 300)
                    }, menuController.prototype.moveStep = function (target) {
                        var position = 0;
                        switch (target) {
                            case "forward":
                                position = this.container.scrollLeft() + 200, position > this.container[0].scrollWidth - this.container.width() ? this.$scope.showForward = !1 : this.$scope.showForward = !0;
                                break;
                            case "back":
                                position = this.container.scrollLeft() - 200, position < 200 ? this.$scope.showBack = !1 : this.$scope.showBack = !0
                        }
                        this.container.animate({
                            scrollLeft: position
                        }, {
                            duration: 300,
                            easing: "linear",
                            queue: !1
                        })
                    }, menuController.prototype.close = function () {
                        this.atHome || (this.$rootScope.$broadcast("menu--close"), this.$rootScope.$broadcast("menu--closed"))
                    }, menuController.prototype.move = function (target) {
                        var active = 0,
                            position = 0;
                        if (this.$scope.isMobile) {
                            if ("forward" == target || "back" == target) return;
                            this._buildOffsets(), this.container.animate({
                                scrollTop: this.offsets[target] - 100
                            }, 1e3)
                        } else {
                            if (this._buildOffsets(), "forward" == target || "back" == target)
                                for (var i = 0; i < this.offsets.length; i++) this.offsets[i] < this.container.scrollLeft() + ("forward" == target ? 120 : -120) && (active = i);
                            else active = target;
                            switch (target) {
                                case "forward":
                                    position = this.offsets[active + 1], position > this.container[0].scrollWidth - this.container.width() ? this.$scope.showForward = !1 : this.$scope.showForward = !0;
                                    break;
                                case "back":
                                    position = this.offsets[active], position < 200 ? this.$scope.showBack = !1 : this.$scope.showBack = !0;
                                    break;
                                default:
                                    position = this.offsets[active]
                            }
                            this.container.animate({
                                scrollLeft: position - 100
                            }, 1e3)
                        }
                    }, menuController.prototype.open = function (menu, card) {
                        if (card) {
                            var left = this.$element.find(".menu-" + menu + ' a[href="/' + card + '"]').offset().left;
                            left > 240 && this.container.scrollLeft(left - 140), this.routerService.changePath("/")
                        }
                        this.$rootScope.$broadcast("header--force"), this._onScroll(), this.$scope.movingBetween = "" !== this.$scope.active, this.$scope.menuActive = !0, this.$scope.active = menu, this.$timeout.cancel(this.resetFullTimeout)
                    }, menuController.prototype.onCloseClick = function (goHome) {
                        goHome && this.atHome ? (this.$scope.active = "main", this.$rootScope.$broadcast("home--open")) : this._onClose(), this.resetFullTimeout = this.$timeout(function () {
                            this.$element.find(".menu-full .menuContainer")[0].scrollLeft = 0
                        }.bind(this), 500)
                    }, menuController.prototype.visit = function ($event) {
                        $event.preventDefault(), $event.stopPropagation();
                        var id = $event.currentTarget.attributes.href.value.substr(1);
                        switch (id) {
                            case "map":
                                this.stateService.end(id);
                                break;
                            case "credits":
                                this._onClose(), this.stateService.end(id);
                                break;
                            default:
                                this._onClose(), this.$rootScope.$broadcast("menu--closed"), this.stateService.jump(id)
                        }
                    }, menuController.prototype._bindScroll = function () {
                        this.container.scroll(this._setGradient.bind(this)), this.container.scroll(debounce(100, !1, this._onScroll.bind(this))), this.container.bind("mousewheel", function (event) {
                            0 !== event.originalEvent.deltaY && 0 == event.originalEvent.deltaX && (event.preventDefault(), this.scrollLeft += event.originalEvent.deltaY)
                        })
                    }, menuController.prototype._buildOffsets = function () {
                        this.offsets = [], this.$scope.isMobile ? (this.halfHeight = $(window).height() / 2, this.$element.find(".menu-full .menuItem--firstTier").each(function (index, element) {
                            var offset = $(element).offset().top + this.container.scrollTop();
                            this.offsets.push(offset)
                        }.bind(this))) : (this.halfWidth = $(window).width() / 2, this.$element.find(".menu-full .menuItem--firstTier").each(function (index, element) {
                            var offset = $(element).offset().left + this.container.scrollLeft();
                            this.offsets.push(offset)
                        }.bind(this)))
                    }, menuController.prototype._onClose = function () {
                        this.$scope.menuActive = !1, this.$scope.active = "", this.atHome = !1
                    }, menuController.prototype._setGradient = function () {
                        this.$scope.isMobile && (this.$scope.scrolled ? $(this.container).scrollTop() < 10 && (this.$scope.scrolled = !1) : $(this.container).scrollTop() > 10 && (this.$scope.scrolled = !0))
                    }, menuController.prototype._onScroll = function () {
                        if (this.$scope.isMobile)
                            if (this.container.scrollTop() - this.container[0].scrollHeight + this.container.height() > -150) this.$scope.section = this.offsets.length - 1;
                            else
                                for (var i = 0; i < this.offsets.length; i++) this.offsets[i] < this.container.scrollTop() + this.halfHeight && (this.$scope.section = i);
                        else if (0 === this.container.scrollLeft() ? this.$scope.showBack = !1 : this.$scope.showBack = !0, this.container.scrollLeft() === this.container[0].scrollWidth - this.container.width()) this.$scope.showForward = !1, this.$scope.section = this.offsets.length - 1;
                        else {
                            this.$scope.showForward = !0;
                            for (var i = 0; i < this.offsets.length; i++) this.offsets[i] < this.container.scrollLeft() + this.halfWidth && (this.$scope.section = i)
                        }
                    }, menuController.prototype._populate = function ($event) {
                        for (var key in content) content[key].id = key, 1 == content[key].level && this.main.push(content[key]), 1 != content[key].level && 2 != content[key].level || this.full.push(content[key])
                    }, menuController.prototype._mouseTracking = function () {
                        this.$timeout(function () {
                            var that = this;
                            this.$element.find(".menuItem").on("mouseenter", function (event) {
                                var $this = $(this),
                                    direction = that._getDir($this, {
                                        x: event.pageX,
                                        y: event.pageY
                                    });
                                $this.attr("data-mouse-direction", 1 === direction ? "right" : "left")
                            })
                        }.bind(this))
                    }, menuController.prototype._getDir = function ($el, coordinates) {
                        var w = $el.width(),
                            h = $el.height(),
                            x = (coordinates.x - $el.offset().left - w / 2) * (w > h ? h / w : 1),
                            y = (coordinates.y - $el.offset().top - h / 2) * (h > w ? w / h : 1),
                            direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
                        return direction
                    }, controller.controller("menuController", menuController), module.exports = controller
                }, {
                    "../../content/content.json": 1,
                    angular: 26,
                    "throttle-debounce/debounce": 27
                }],
                10: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.pano", []),
                        panoController = function ($scope, $rootScope, $element, $timeout, mapService, configService, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$element = $element, this.$timeout = $timeout, this.mapService = mapService, this.configService = configService, this.stateService = stateService, this.$scope.goTo = this.goTo.bind(this), this.content = this.$scope.content, this.queued = this.$scope.queued, this.initial = this.$scope.initial, this.tileFolder = this.content["tile-folder"], this.$scope.hotspots = this.hotspots = [], this.$scope.currentMarker, this.$scope.currentCoords, this.$scope.hovered = !1, this.$scope.viewFrame = {}, this.$scope.showOverlay = !1, this.$scope.isActive = !1, this.$scope.boundWidth = this.boundWidth = this.content.bound.ne.lng - this.content.bound.sw.lng,
                                this.$scope.boundHeight = this.boundHeight = this.content.bound.sw.lat - this.content.bound.ne.lat, this.$scope.boundLeft = this.boundLeft = this.content.bound.sw.lng, this.$scope.boundTop = this.boundTop = this.content.bound.ne.lat, this.$scope.isMenuOpen = !1, this.boundRight = this.content.bound.ne.lng, this.boundBottom = this.content.bound.sw.lat, this.map, this.center, this.overlay, this.markers = [], this.timer, this.allowedBounds, this.lastValidCenter, this.$scope.open = this.open.bind(this), this.updateCoords = this.updateCoords.bind(this), this.panningHandler = this.panningHandler.bind(this), this.resizeHandler = this.resizeHandler.bind(this), this.$scope.showDetail = this.showDetail.bind(this), this.$scope.closeDetail = this.closeDetail.bind(this), this.setMinZoom = this.setMinZoom.bind(this), this.$scope.zoomIn = this.zoomIn.bind(this), this.$scope.zoomOut = this.zoomOut.bind(this), this.centerListener, this.zoomListener, this.$scope.showNextButton = !1, this.$scope.showDragInstruction = !0, this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this._init()
                        };
                    panoController.prototype._init = function () {
                        this.$scope.showOverlay = !1, "smartphone" == this.configService.size && this.$rootScope.$broadcast("header--force"), this.center = {
                            lat: 0,
                            lng: 0
                        }, this._populate(), this.mapService.mapsInitialized.then(function () {
                            this.initial && this.$rootScope.$broadcast("initial--loaded"), this.map = new google.maps.Map(this.$element.find("#pano-container")[0], {
                                backgroundColor: "#926457",
                                center: this.center,
                                disableDefaultUI: !0,
                                gestureHandling: "greedy",
                                zoom: 0,
                                styles: [{
                                    elementType: "geometry",
                                    stylers: [{
                                        color: "#ffffff"
                                    }]
                                }],
                                mapTypeControlOptions: {
                                    mapTypeIds: ["bearsear"]
                                }
                            });
                            // FUJI PANO
                            var bearsearMapType = new google.maps.ImageMapType({
                                getTileUrl: function (coord, zoom) {
                                    var normalizedCoord = this.getNormalizedCoord(coord, zoom);
                                    if (!normalizedCoord) return null;
                                    var bound = Math.pow(2, zoom);
                                    return "./assets/" + this.tileFolder + zoom + "/" + normalizedCoord.x + "/" + (bound - normalizedCoord.y - 1) + ".png"
                                    // return "./assets/" + this.tileFolder + "/stview.jpg"
                                }.bind(this),
                                tileSize: new google.maps.Size(256, 256),
                                maxZoom: 6,
                                minZoom: 0,
                                name: "Bearsear"
                            });
                            this.map.mapTypes.set("bearsear", bearsearMapType), this.map.setMapTypeId("bearsear"), this._setMarkers(), this._addMapListeners()
                        }.bind(this)), this.$scope.$on("pano--open", this.open.bind(this)), this.queued ? this.$scope.$on("section--showqueued", function () {
                            this.$scope.isActive = !0
                        }.bind(this)) : this.$scope.isActive = !0, this.$timeout(function () {
                            this.$scope.showDragInstruction = !1
                        }.bind(this), 1e4), this.$timeout(function () {
                            this.$scope.showNextButton = !0
                        }.bind(this), 6e4), this.$timeout(function () {
                            this.$scope.showNextButton = !1
                        }.bind(this), 65e3)
                    }, panoController.prototype._populate = function () {
                        for (var i in this.content.markers) this.content.markers[i].id = i, this.hotspots.push(this.content.markers[i]), this.configService.isSafari && (this.$scope.hotspots[i].enabled = !0)
                    }, panoController.prototype.getNormalizedCoord = function (coord, zoom) {
                        var y = coord.y,
                            x = coord.x,
                            tileRange = 1 << zoom;
                        return y < 0 || y >= tileRange || x < 0 || x >= tileRange ? null : {
                            x: x,
                            y: y
                        }
                    }, panoController.prototype._setMarkers = function () {
                        for (var i in this.hotspots) {
                            var iconPath = (this.hotspots[i].type, this.hotspots[i].parent, "./assets/icons/type_streetview_culture.svg"),
                                marker = new google.maps.Marker({
                                    icon: {
                                        url: iconPath,
                                        scaledSize: new google.maps.Size(30, 30)
                                    },
                                    visible: !1,
                                    id: this.hotspots[i].id,
                                    map: this.map,
                                    position: this.hotspots[i].mapCoord
                                });
                            this.markers.push(marker)
                        }
                    }, panoController.prototype._addMapListeners = function () {
                        google.maps.event.addListener(this.map, "projection_changed", function () {
                            this.overlay = new google.maps.OverlayView, this.overlay.draw = function () {}, this.overlay.setMap(this.map), this.allowedBounds = new google.maps.LatLngBounds(this.content.bound.sw, this.content.bound.ne), this.setMinZoom(), this.centerListener = this.map.addListener("center_changed", this.panningHandler), this.zoomListener = this.map.addListener("zoom_changed", this.panningHandler), this.configService.hasTouch && (this.$scope.touch = !0), this.map.addListener("drag", function () {
                                this.$scope.moving = !0
                            }.bind(this)), window.onresize = this.resizeHandler, this.lastValidCenter = this.map.getCenter(), this.panningHandler()
                        }.bind(this))
                    }, panoController.prototype.resizeHandler = function () {
                        google.maps.event.removeListener(this.centerListener), google.maps.event.removeListener(this.zoomListener), this.setMinZoom(), this.lastValidCenter = this.map.getCenter(), this.centerListener = this.map.addListener("center_changed", this.panningHandler), this.zoomListener = this.map.addListener("zoom_changed", this.panningHandler)
                    }, panoController.prototype.setMinZoom = function () {
                        var currentMinZoom = 0;
                        this.map.setOptions({
                            minZoom: currentMinZoom,
                            zoom: currentMinZoom
                        }), this.map.panTo({
                            lat: 0,
                            lng: 0
                        });
                        for (var view = this.map.getBounds(); !this.allowedBounds.contains(view.getNorthEast()) || !this.allowedBounds.contains(view.getSouthWest());) currentMinZoom += 1, this.map.setOptions({
                            minZoom: currentMinZoom,
                            zoom: currentMinZoom
                        }), this.map.panTo({
                            lat: 0,
                            lng: 0
                        }), view = this.map.getBounds()
                    }, panoController.prototype.updateCoords = function () {
                        if (this.overlay.getProjection()) {
                            for (var i in this.markers) {
                                var coords, marker = this.markers[i];
                                coords = this.overlay.getProjection().fromLatLngToContainerPixel(marker.getPosition()), this.$scope.hotspots[i].displayCoords = {
                                    x: coords.x,
                                    y: coords.y
                                }, !this.configService.isSafari && coords.x > 0 && coords.x < window.innerWidth && coords.y > 0 && coords.y < window.innerHeight && (this.$scope.hotspots[i].enabled = !0)
                            }
                            this.$scope.$apply()
                        }
                    }, panoController.prototype.panningHandler = function ($event) {
                        var view = this.map.getBounds(),
                            viewTop = view.getNorthEast().lat(),
                            viewRight = view.getNorthEast().lng(),
                            viewBottom = view.getSouthWest().lat(),
                            viewLeft = view.getSouthWest().lng(),
                            newCenterLat = this.map.getCenter().lat(),
                            newCenterLng = this.map.getCenter().lng();
                        this.allowedBounds.contains(view.getNorthEast()) && this.allowedBounds.contains(view.getSouthWest()) ? this.lastValidCenter = this.map.getCenter() : (viewTop > this.boundTop && (newCenterLat -= viewTop - this.boundTop), viewRight > this.boundRight && (newCenterLng -= viewRight - this.boundRight), viewBottom < this.boundBottom && (newCenterLat -= viewBottom - this.boundBottom), viewLeft < this.boundLeft && (newCenterLng -= viewLeft - this.boundLeft), this.map.panTo({
                            lat: newCenterLat,
                            lng: newCenterLng
                        }), this.lastValidCenter = this.map.getCenter()), this.$scope.viewFrame.left = (viewLeft - this.boundLeft) / this.boundWidth * 100, this.$scope.viewFrame.top = (viewTop - this.boundTop) / this.boundHeight * 100, this.$scope.viewFrame.right = (this.boundRight - viewRight) / this.boundWidth * 100, this.$scope.viewFrame.bottom = (this.boundBottom - viewBottom) / this.boundHeight * 100, this.$scope.moving = !1, this.updateCoords()
                    }, panoController.prototype.showDetail = function (id) {
                        this.$scope.showOverlay = !0, this.$scope.currentMarker = this.hotspots[id], this.$rootScope.$broadcast("header--force")
                    }, panoController.prototype.closeDetail = function (id) {
                        this.$scope.showOverlay = !1, this.$rootScope.$broadcast("header--unforce")
                    }, panoController.prototype.zoomIn = function () {
                        this.map.setZoom(this.map.getZoom() + 1)
                    }, panoController.prototype.zoomOut = function () {
                        this.map.setZoom(this.map.getZoom() - 1)
                    }, panoController.prototype.open = function () {
                        this.$scope.isActive = !0
                    }, panoController.prototype.goTo = function (direction) {
                        "smartphone" == this.configService.size && this.$rootScope.$broadcast("header--unforce"), this.stateService.end(direction)
                    }, panoController.prototype._onMenuClose = function () {
                        this.$scope.isMenuOpen = !1
                    }, panoController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0
                    }, controller.controller("panoController", panoController), module.exports = controller
                }, {
                    angular: 26
                }],
                11: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.streetview", []),
                        streetviewController = function ($element, $scope, $rootScope, configService, stateService) {
                            this.$element = $element, this.$scope = $scope, this.$rootScope = $rootScope, this.configService = configService, this.stateService = stateService, this.content = this.$scope.content, this.initial = this.$scope.initial, this.$scope.gotoPosition = this.gotoPosition.bind(this), this.panningHandler = this.panningHandler.bind(this), this._populate = this._populate.bind(this), this.povToPixel3d = this.povToPixel3d.bind(this), this.DEG_TO_RAD = Math.PI / 180, this.$scope.hotspots = this.hotspots = [], this.$scope.currentHotspot, this.$scope.showOverlay = !1, this.$scope.showDetail = this.showDetail.bind(this), this.$scope.closeDetail = this.closeDetail.bind(this), this.$scope.currentView = this.currentView = this.content.streetviews["position-1"], this.$scope.isMenuOpen = !1, this.$scope.moving, this.queued = this.$scope.queued, this.panorama, this.povEvent, this.zoomEvent, this.$scope.markers = {}, this.$scope.isActive = !1, this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this.init()
                        };
                    streetviewController.prototype.init = function () {
                        this.$scope.showOverlay = !1, "smartphone" == this.configService.size && this.$rootScope.$broadcast("header--force"), this.panorama = new google.maps.StreetViewPanorama(this.$element.find("#streetview")[0], {
                            position: this.currentView.viewCoord,
                            pov: this.currentView.pov,
                            zoom: 1,
                            addressControl: !1,
                            linksControl: !1,
                            fullscreenControl: !1,
                            zoomControl: !1,
                            panControl: !1,
                            disableDefaultUI: !0,
                            clickToGo: 0
                        }), this.queued ? this.$scope.$on("section--showqueued", function () {
                            this.$scope.isActive = !0
                        }.bind(this)) : this.$scope.isActive = !0, this._populate(), this.povEvent = this.panorama.addListener("pov_changed", this.panningHandler), this.zoomEvent = this.panorama.addListener("zoom_changed", this.panningHandler), this.initial && this.$rootScope.$broadcast("initial--loaded")
                    }, streetviewController.prototype.panningHandler = function () {
                        for (var i in this.hotspots) {
                            var coords = this.povToPixel3d(this.hotspots[i].pov);
                            coords ? (this.$scope.markers[i] = {
                                x: coords.left,
                                y: coords.top
                            }, coords.left > 0 && coords.left < window.innerWidth && coords.top > 0 && coords.top < window.innerHeight && (this.$scope.hotspots[i].enabled = !0)) : this.$scope.markers[i] = {
                                x: -1e3,
                                y: -1e3
                            }
                        }
                        this.$scope.$apply()
                    }, streetviewController.prototype._populate = function () {
                        for (; this.hotspots.length > 0;) this.hotspots.pop();
                        for (var i in this.currentView.markers) this.currentView.markers[i].id = i, this.hotspots.push(this.currentView.markers[i])
                    }, streetviewController.prototype.povToPixel3d = function (targetPov) {
                        var currentPov = this.panorama.getPov(),
                            zoom = this.panorama.getZoom(),
                            width = window.innerWidth,
                            height = window.innerHeight,
                            target = {
                                left: width / 2,
                                top: height / 2
                            },
                            zoom3dFov = zoom <= 2 ? 126.5 - 36.75 * zoom : 195.93 / Math.pow(1.92, zoom),
                            fov = zoom3dFov * this.DEG_TO_RAD,
                            h0 = currentPov.heading * this.DEG_TO_RAD,
                            p0 = currentPov.pitch * this.DEG_TO_RAD,
                            h = targetPov.heading * this.DEG_TO_RAD,
                            p = targetPov.pitch * this.DEG_TO_RAD,
                            f = width / 2 / Math.tan(fov / 2),
                            cos_p = Math.cos(p),
                            sin_p = Math.sin(p),
                            cos_h = Math.cos(h),
                            sin_h = Math.sin(h),
                            x = f * cos_p * sin_h,
                            y = f * cos_p * cos_h,
                            z = f * sin_p,
                            cos_p0 = Math.cos(p0),
                            sin_p0 = Math.sin(p0),
                            cos_h0 = Math.cos(h0),
                            sin_h0 = Math.sin(h0),
                            x0 = f * cos_p0 * sin_h0,
                            y0 = f * cos_p0 * cos_h0,
                            z0 = f * sin_p0,
                            nDotD = x0 * x + y0 * y + z0 * z,
                            nDotC = x0 * x0 + y0 * y0 + z0 * z0;
                        if (Math.abs(nDotD) < 1e-6) return null;
                        var t = nDotC / nDotD;
                        if (t < 0) return null;
                        var tx = t * x,
                            ty = t * y,
                            tz = t * z,
                            vx = -sin_p0 * sin_h0,
                            vy = -sin_p0 * cos_h0,
                            vz = cos_p0,
                            ux = cos_h0,
                            uy = -sin_h0,
                            uz = 0,
                            ul = Math.sqrt(ux * ux + uy * uy + uz * uz);
                        ux /= ul, uy /= ul, uz /= ul;
                        var du = tx * ux + ty * uy + tz * uz,
                            dv = tx * vx + ty * vy + tz * vz;
                        return target.left += du, target.top -= dv, target
                    }, streetviewController.prototype.gotoPosition = function (position) {
                        for (var i in this.hotspots) this.$scope.hotspots[i].enabled = !1;
                        this.$scope.showOverlay = !1, window.setTimeout(function () {
                            google.maps.event.removeListener(this.povEvent), google.maps.event.removeListener(this.zoomEvent), this.$scope.currentView = this.currentView = this.content.streetviews[position], this.panorama.setOptions({
                                position: this.currentView.viewCoord,
                                zoom: 1
                            }), this._populate(), this.povEvent = this.panorama.addListener("pov_changed", this.panningHandler), this.zoomEvent = this.panorama.addListener("zoom_changed", this.panningHandler)
                        }.bind(this), 200)
                    }, streetviewController.prototype.showDetail = function (id) {
                        this.$scope.showOverlay = !0, this.$scope.currentHotspot = this.hotspots[id], this.$rootScope.$broadcast("header--force")
                    }, streetviewController.prototype.closeDetail = function (id) {
                        this.$scope.showOverlay = !1, this.$rootScope.$broadcast("header--unforce")
                    }, streetviewController.prototype.done = function () {
                        "smartphone" == this.configService.size && this.$rootScope.$broadcast("header--unforce"), this.stateService.end()
                    }, streetviewController.prototype._onMenuClose = function () {
                        this.$scope.isMenuOpen = !1
                    }, streetviewController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0
                    }, controller.controller("streetviewController", streetviewController), module.exports = controller
                }, {
                    angular: 26
                }],
                12: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.takeaction", []),
                        content = require("../../content/content.json"),
                        takeactionController = function ($element, $scope, $rootScope, $timeout, configService, stateService) {
                            this.$element = $element, this.$scope = $scope, this.$rootScope = $rootScope, this.$timeout = $timeout, this.configService = configService, this.stateService = stateService, this.content = content, this.$scope.active = !1, this.$scope.isMenuOpen = !1, this.$scope.showGradient = !1, this.initialized = !1, this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this.$rootScope.$on("takeaction--open", this._open.bind(this)), this.$rootScope.$on("home--open", this._close.bind(this)), this.$rootScope.$on("section--change", this._changeSection.bind(this))
                        };
                    takeactionController.prototype._init = function () {
                        this.initialized = !0,
                            function (d, s, id) {
                                var js, fjs = d.getElementsByTagName(s)[0];
                                d.getElementById(id) || (js = d.createElement(s), js.id = id, js.src = "//p2a.co/js/embed/widget/advocacywidget.min.js", fjs.parentNode.insertBefore(js, fjs))
                            }(document, "script", "advocacy-actionwidget-code"), this.$element.scroll(this._onScroll.bind(this)), $(window).on("message", function (e) {
                                e.originalEvent.data.match && (matches = e.originalEvent.data.match(/p2aconversion--(.*)/i)) && ga("send", "event", "Take Action", matches[1])
                            })
                    }, takeactionController.prototype._onScroll = function () {
                        this.$element.scrollTop() > 10 ? this.$scope.showGradient = !0 : this.$scope.showGradient = !1
                    }, takeactionController.prototype._close = function () {
                        this.$scope.active && this.$timeout(function () {
                            this.$scope.active = !1, this.$rootScope.$broadcast("takeaction--close")
                        }.bind(this))
                    }, takeactionController.prototype._changeSection = function (object, next) {
                        "take-action" !== next.id && "take-action-film" !== next.id && this._close()
                    }, takeactionController.prototype._open = function () {
                        this.initialized || this._init(), this.$timeout(function () {
                            this.$scope.active = !0, this.$scope.isMenuOpen = !1, this.$rootScope.$broadcast("header--force")
                        }.bind(this))
                    }, takeactionController.prototype._onMenuClose = function () {
                        this.$scope.isMenuOpen = !1, this.$scope.active && this.$rootScope.$broadcast("header--force")
                    }, takeactionController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0
                    }, controller.controller("takeactionController", takeactionController), module.exports = controller
                }, {
                    "../../content/content.json": 1,
                    angular: 26
                }],
                13: [function (require, module, exports) {
                    var angular = require("angular"),
                        controller = angular.module("controller.video", []),
                        videoController = function ($scope, $rootScope, $element, $http, $interval, $timeout, configService, stateService) {
                            this.$scope = $scope, this.$rootScope = $rootScope, this.$element = $element, this.$http = $http, this.$interval = $interval, this.$timeout = $timeout, this.configService = configService, this.stateService = stateService, this.content = this.$scope.content, this.json = this.$scope.json, this.queued = this.$scope.queued, this.initial = this.$scope.initial, this.$scope.showNextButton = !1, this.$scope.nextButtonActive = this.content.showNextCard || !1, this.under10 = !1, this.under5 = !1, this.under1 = !1, this.ytplayer__ready = !1, this.ytplayer__playonready = !1, this.$scope.showControls = !1, this.$scope.isActive = !1, this.$scope.isMenuOpen = !1, this.$scope.showPlayer = !1, this.$scope.showOverlay = !0, this.$scope.showOverlayBg = !0, this.$scope.showVRControls = !1, this.$scope.showTitlecard = !1, this.$scope.userPaused = !1, this.$scope.videoType, this.$scope.experienceActive = !1, this.$scope.showDragInstruction = !1, this.$scope.hidePlayOverlay = !1, this.$scope.showPlayOverlay = !1, this.$scope.showLoading = !0, this.$scope.showPoweredBy = !1, this.$scope.showExperienceOverlay = !1, this.$scope.cardboardActive = !1, this.$scope.activeCaption = -1, this.timer, this.$scope.currentState = "unstarted", this.$scope.wasPlaying = !1, this.$scope.isScrubbing = !1, this.$scope.scrubberWidth = 0, this.$scope.scrubberTotalWidth, this.$scope.timeTotal = 0, this.$scope.timeTotalInt = null, this.$scope.timeCurrent = 0, this.$scope.currentNarrator = null, this.$scope.isMuted = !1, this.$scope.showSkip = !1, this.vrplayer, this.vroverlay, this.$scope.playPause = this.playPause.bind(this), this.$scope.pauseScrubber = this.pauseScrubber.bind(this), this.$scope.updateScrubber = this.updateScrubber.bind(this), this.$scope.getNarrator = this.getNarrator.bind(this), this.$scope.seekTo = this.seekTo.bind(this), this.$scope.goTo = this.goTo.bind(this), this.$scope.toggleMute = this.toggleMute.bind(this), this.$scope.replay = this.replay.bind(this), this.$scope.playCurrent = this.playCurrent.bind(this), this.$scope.playingBeforeMenu = !0, this._init(), this._onResize(), this.$scope.$on("resize", this._onResize.bind(this)), this.$scope.$on("menu--open", this._onMenuOpen.bind(this)), this.$scope.$on("menu--close", this._onMenuClose.bind(this)), this.$scope.$on("mouse--active", this._showControls.bind(this)), this.$scope.$on("mouse--inactive", this._hideControls.bind(this)), this.$scope.$on("visibility--visible", this._onVisible.bind(this))
                        };
                    videoController.prototype._init = function () {
                        this.$http({
                            method: "GET",
                            url: "./content/pages/" + this.json
                        }).then(function (response) {
                            this.$scope.supplemental = response.data
                        }.bind(this), function (response) {}.bind(this)), this.content.videoVR && ("smartphone" == this.configService.size || this.configService.isSafari) ? (this._setupVRPlayer(), this.$scope.videoType = "vr", this.content.experienceVR && (this.$scope.experienceActive = !0, this.$rootScope.$broadcast("experience--open"))) : (this._setupYTPlayer(), this.$scope.videoType = "yt"), this.$scope.$on("video--open", function () {
                            this.$scope.showPlayer = !0, this.$scope.showOverlay = !0
                        }.bind(this)), this.queued ? this.$scope.$on("section--showqueued", function () {
                            this.$scope.isActive = !0, this.$scope.showPlayOverlay || (this.playPause(), "buffering" != this.$scope.currentState && "unstarted" != this.$scope.currentState || (this.queued = !1))
                        }.bind(this)) : this.$scope.isActive = !0, this.content.videoVR && "smartphone" !== this.configService.size && (this.$timeout(function () {
                            this.$scope.showDragInstruction = !0
                        }.bind(this), 6e3), this.$timeout(function () {
                            this.$scope.showDragInstruction = !1
                        }.bind(this), 16e3)), this.content["video-show-skip"] && (this.$scope.showSkip = !0)
                    }, videoController.prototype.getNarrator = function () {
                        var narrators = this.content.narrators;
                        for (var narrator in narrators)
                            for (var time in narrators[narrator].times) {
                                var section = narrators[narrator].times[time];
                                if (this.$scope.timeCurrent >= section[0] && this.$scope.timeCurrent <= section[1]) return void(this.$scope.currentNarrator = narrators[narrator].name)
                            }
                        this.$scope.currentNarrator = null
                    }, videoController.prototype.goTo = function (direction, overlay) {
                        this.$interval.cancel(this.timer), "map" === direction && "playing" != this.$scope.currentState || (this.$scope.showOverlay = !1, this.$scope.showControls = !1, this.$scope.showVRControls = !1, this.$scope.activeCaption = -1), this.$timeout(function () {
                            this.player ? this.player.pauseVideo() : this.vrplayer.pause(), overlay !== !0 && (this.$scope.isActive = !1)
                        }.bind(this), 100), "submenu" == direction ? this.$scope.isActive = !1 : "prev" == direction || "next" == direction ? this.stateService.end(direction) : "map" == direction ? this.stateService.end("map") : "home" == direction ? (this.$rootScope.$broadcast("experience--close"), this.stateService.end("postIntroHome")) : "take-action" == direction ? (this.$rootScope.$broadcast("experience--close"), this.stateService.jump("take-action")) : this.stateService.end("showQueued")
                    }, videoController.prototype.pauseScrubber = function ($event) {
                        this.$scope.scrubberTotalWidth = $event.currentTarget.offsetWidth, "playing" == this.$scope.currentState && (this.$scope.wasPlaying = !0, this.player.pauseVideo()), this.$scope.isScrubbing = !0, this.updateScrubber($event)
                    }, videoController.prototype.playCurrent = function (type) {
                        this.$timeout(function () {
                            this.$scope.hidePlayOverlay = !0, this.$scope.showPlayOverlay = !1, this.$scope.showExperienceOverlay = !1
                        }.bind(this), 500), this.queued && (this.queued = !1), "cardboard" == type && (this.$scope.cardboardActive = !0), this.player ? this.player.playVideo() : this.vrplayer.play()
                    }, videoController.prototype.playPause = function () {
                        "playing" == this.$scope.currentState ? this.player ? this.player.pauseVideo() : this.vrplayer.pause() : this.player ? this.ytplayer__ready ? this.player.playVideo() : this.ytplayer__playonready = !0 : this.vrplayer.play()
                    }, videoController.prototype.replay = function () {
                        this.vrplayer && (this.$scope.experienceEnded = !1, this.$scope.timeCurrent = 0, this.vrplayer.currentTime(0), this.vrplayer.play())
                    }, videoController.prototype.seekTo = function (time) {
                        time == this.$scope.timeTotal ? this.goTo("next") : (this.player.seekTo(time, !0), this.$scope.wasPlaying && this.player.playVideo()), this.$scope.isScrubbing = !1
                    }, videoController.prototype.updateScrubber = function ($event) {
                        var offset;
                        offset = $event.originalEvent.touches ? $event.originalEvent.touches[0].pageX - $event.originalEvent.touches[0].target.offsetLeft : $event.offsetX, offset < 0 ? offset = 0 : offset > this.$scope.scrubberTotalWidth && (offset = this.$scope.scrubberTotalWidth), this.$scope.isScrubbing && (this.$scope.timeCurrent = this.$scope.timeTotal * (offset / this.$scope.scrubberTotalWidth), this.updateScrubberWidth())
                    }, videoController.prototype.updateScrubberWidth = function () {
                        this.$scope.scrubberWidth = this.$scope.timeCurrent / this.$scope.timeTotal * 100
                    }, videoController.prototype._addVRPlayerElements = function () {
                        var vjsButton = videojs.getComponent("Button"),
                            mapIcon = "url(./assets/map/" + this.content.mapIcon + ")",
                            MuteButton = videojs.extend(vjsButton, {
                                buildCSSClass: function () {
                                    return "vjs-control vjs-button vjs-mute-toggle"
                                },
                                handleClick: function (event) {
                                    this.$scope.toggleMute(event.target), this.$scope.$apply()
                                }.bind(this)
                            });
                        if (videojs.registerComponent("MuteButton", MuteButton), this.vrplayer.getChild("controlBar").addChild("MuteButton", {}), !this.content.experienceVR) {
                            var MapButton = videojs.extend(vjsButton, {
                                buildCSSClass: function () {
                                    return "vjs-control vjs-button vjs-map-control"
                                },
                                handleClick: function () {
                                    this.$scope.goTo("map"), this.$scope.$apply()
                                }.bind(this)
                            });
                            videojs.registerComponent("MapButton", MapButton);
                            var mapButton = this.vrplayer.getChild("controlBar").addChild("MapButton", {});
                            $(mapButton.el()).css("background-image", mapIcon)
                        }
                        this.vroverlay = document.createElement("div"), this.vroverlay.classList.add("vjs-overlay"), this.vrplayer.el().appendChild(this.vroverlay)
                    }, videoController.prototype._addVRPlayerListeners = function () {
                        var isPaused, isVRMode;
                        this.vrplayer.on("ready", function () {
                            this.$timeout(function () {
                                "playing" != this.$scope.currentState && this._isMobileOrTouch() && (this.$scope.experienceActive ? this.$scope.showExperienceOverlay = !0 : this.$scope.showPlayOverlay = !0)
                            }.bind(this), 100), this.$scope.isMuted = this.vrplayer.muted(), this.$scope.isMuted && this.vrplayer.getChild("controlBar").getChild("MuteButton").el().classList.add("is-unmute-btn"), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on("playing", function () {
                            if (this.$scope.cardboardActive) {
                                var vrbtn = this.vrplayer.getChild("controlBar").getChild("VRButton");
                                vrbtn.handleClick(), this.$scope.cardboardActive = !1
                            }
                            this.$rootScope.$broadcast("header--unforce"), this.$scope.showLoading = !1, isPaused = !1, this.$scope.currentState = "playing", this.vroverlay.classList.remove("is-visible"), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on("pause", function () {
                            isPaused = !0, this.$timeout(function () {
                                this.vrplayer.paused() && (this.$rootScope.$broadcast("header--force"), this.$scope.currentState = "paused", isVRMode || this.vroverlay.classList.add("is-visible"), this.$scope.$apply())
                            }.bind(this), 100)
                        }.bind(this)), this.vrplayer.on("timeupdate", function () {
                            this.$scope.timeCurrent = this.vrplayer.currentTime(), this.getNarrator(), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on(["ended"], function () {
                            this.$scope.showVRControls = !1, this.$scope.experienceActive ? this.$scope.experienceEnded = !0 : this.goTo("next"), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on(["useractive", "pause"], function () {
                            this.$scope.showVRControls = !0, this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on("userinactive", function () {
                            isPaused || (this.$scope.showVRControls = !1), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on("VRModeOn", function () {
                            isVRMode = !0, this.$scope.showOverlay = !1, this.vroverlay.classList.remove("is-visible"), this.$scope.$apply()
                        }.bind(this)), this.vrplayer.on("VRModeOff", function () {
                            isVRMode = !1, this.$scope.showOverlay = !0, "paused" == this.$scope.currentState && this.vroverlay.classList.add("is-visible"), this.$scope.$apply()
                        }.bind(this))
                    }, videoController.prototype._checkEnd = function () {
                        !this.under10 && this.$scope.timeTotal - this.$scope.timeCurrent < 10 && (this.under10 = !0, !this.content["no-auto-next-button"] && this.content.showNextCard && (this.$scope.showNextButton = !0)), this.under10 && this.$scope.timeTotal - this.$scope.timeCurrent >= 10 && (this.under10 = !1, this.$scope.showNextButton = !1), !this.under5 && this.$scope.timeTotal - this.$scope.timeCurrent < 5 && (this.under5 = !0, this._queueNext("next")), !this.under1 && this.$scope.timeTotal - this.$scope.timeCurrent < 1 && (this.under1 = !0, this.$scope.showNextButton = !1, this.$timeout(function () {
                            this.goTo()
                        }.bind(this)))
                    }, videoController.prototype._setPoweredBy = function () {
                        this.$scope.timeCurrent < 7 && this.$scope.timeCurrent > 2 && this.content["powered-by-earch"] ? this.$scope.showPoweredBy = !0 : this.$scope.showPoweredBy = !1
                    }, videoController.prototype._checkTitlecard = function () {
                        !this.$scope.showTitlecard && this.$scope.timeCurrent > 2 && this.$scope.timeCurrent < 7 ? this.$scope.showTitlecard = !0 : this.$scope.timeCurrent > 7 && (this.$scope.showTitlecard = !1)
                    }, videoController.prototype._hideControls = function () {
                        this.$scope.showControls = !1
                    }, videoController.prototype._isMobileOrTouch = function () {
                        return !!("smartphone" == this.configService.size || this.configService.hasTouch && "desktop" != this.configService.size)
                    }, videoController.prototype._queueNext = function (direction) {
                        this.stateService.end()
                    }, videoController.prototype._onResize = function () {
                        var dimensions = this.configService.getFillSize();
                        this.$element.find("#player").css(dimensions)
                    }, videoController.prototype._onMenuClose = function () {
                        this.$scope.isMenuOpen = !1, this.$scope.playingBeforeMenu && this.$timeout(function () {
                            this._play()
                        }.bind(this))
                    }, videoController.prototype._onMenuOpen = function () {
                        this.$scope.isMenuOpen = !0, "playing" == this.$scope.currentState ? this.$scope.playingBeforeMenu = !0 : this.$scope.playingBeforeMenu = !1, this.$scope.isActive && this._pause()
                    }, videoController.prototype._onVisible = function () {
                        this.queued && this.$scope.isActive && (this.queued = !1, this.player ? this.ytplayer__ready && this.player.playVideo() : this.vrplayer.play())
                    }, videoController.prototype._onYTPlayerReady = function (event) {
                        this.ytplayer__ready = !0, this.ytplayer__playonready && (this.queued = !1, this.player.playVideo()), this.$timeout(function () {
                            "playing" != this.$scope.currentState && this._isMobileOrTouch() && (this.$scope.showPlayOverlay = !0)
                        }.bind(this), 100)
                    }, videoController.prototype._onYTPlayerStateChange = function (event) {
                        var states = {
                            "-1": "unstarted",
                            0: "ended",
                            1: "playing",
                            2: "paused",
                            3: "buffering",
                            5: "cued"
                        };
                        switch (event.data) {
                            case YT.PlayerState.PLAYING:
                                this.$scope.showLoading = !1, this.queued ? (this.queued = !1, this.player.pauseVideo()) : this.initial && this.$rootScope.$broadcast("initial--loaded"), this.$rootScope.$broadcast("header--unforce"), this.$scope.showPlayer = !0, this.$scope.showOverlay = !0, 0 === this.$scope.timeTotal && (this.$scope.timeTotal = this.player.getDuration(), this.$scope.timeTotalInt = Math.floor(this.$scope.timeTotal)), this.timer = this.$interval(function () {
                                    this._setPoweredBy(), this.$scope.isScrubbing || (this.$scope.timeCurrent = this.player.getCurrentTime(), this.updateScrubberWidth(), this.getNarrator()), this.content.titlecard && this._checkTitlecard(), this.content.captions && this._showCaptions(), this._checkEnd()
                                }.bind(this), 300), this.$scope.wasPlaying && (this.$scope.wasPlaying = !1);
                                break;
                            case YT.PlayerState.ENDED:
                                this.goTo();
                                break;
                            case YT.PlayerState.PAUSED:
                                !this.under1 && this.$scope.isActive && (this.stateService.cancel(), this.$rootScope.$broadcast("header--force")), this.player.getCurrentTime() == this.player.getDuration() || this.player.getCurrentTime() < .5 ? this.$scope.showOverlay = !1 : this.$scope.userPaused = !0, this.$interval.cancel(this.timer);
                                break;
                            default:
                                this.$interval.cancel(this.timer)
                        }
                        this.$scope.currentState = states[event.data], this.$scope.$apply()
                    }, videoController.prototype._pause = function () {
                        this.player ? this.ytplayer__ready && this.player.pauseVideo() : this.vrplayer.pause()
                    }, videoController.prototype._play = function () {
                        this.ytplayer__ready && this.$scope.isActive ? this.player.playVideo() : this.ytplayer__playonready = !0
                    }, videoController.prototype._showCaptions = function () {
                        for (var i = 0; i < this.content.captions.length; i++) {
                            if (this.$scope.timeCurrent > this.content.captions[i].start && this.$scope.timeCurrent < this.content.captions[i].end) {
                                this.$scope.activeCaption = this.content.captions[i].id;
                                break
                            }
                            this.$scope.activeCaption = -1
                        }
                    }, videoController.prototype._showControls = function () {
                        this.$scope.showControls = !0
                    }, videoController.prototype.toggleMute = function (button) {
                        this.player ? (this.player.isMuted() ? this.player.unMute() : this.player.mute(), this.$scope.isMuted = !this.$scope.isMuted) : (this.vrplayer.muted(!this.vrplayer.muted()), this.$scope.isMuted = this.vrplayer.muted(), button.classList.toggle("is-unmute-btn"))
                    }, videoController.prototype._setupYTPlayer = function () {
                        this.player = new YT.Player(this.$element.find("#player")[0], {
                            height: "390",
                            width: "640",
                            videoId: this.content.videoId,
                            playerVars: {
                                autoplay: 1,
                                showinfo: 0,
                                controls: 0,
                                rel: 0,
                                modestbranding: 1,
                                playsinline: 1
                            },
                            events: {
                                onStateChange: this._onYTPlayerStateChange.bind(this),
                                onReady: this._onYTPlayerReady.bind(this)
                            }
                        })
                    }, videoController.prototype._setupVRPlayer = function () {
                        var source = this.configService.isSafari ? this.content.videoVR : this.content.videoVRCDN;
                        this.$element.find("#playervr source").attr("src", source), this.$scope.showPlayer = !0, this.$scope.showVRPlayer = !0, this.$scope.showOverlayBg = !1;
                        var playerSettings = {
                            controlBar: {
                                children: ["playToggle", "progressControl", "currentTimeDisplay", "durationDisplay", "fullscreenToggle"]
                            }
                        };
                        this.vrplayer = window.player = videojs(this.$element.find("#playervr")[0], playerSettings, function () {
                            window.addEventListener("resize", function () {
                                var canvas = videojs("playervr").getChild("Canvas");
                                canvas && canvas.handleResize()
                            })
                        });
                        var videoElement = this.$element.find("#playervr")[0],
                            width = videoElement.offsetWidth,
                            height = videoElement.offsetHeight;
                        this.vrplayer.width(width), this.vrplayer.height(height), this.vrplayer.panorama({
                            backToVerticalCenter: !1,
                            backToHorizonCenter: !1,
                            clickAndDrag: !0,
                            clickToToggle: !0,
                            autoMobileOrientation: !0,
                            initFov: 100,
                            showNotice: !1,
                            callback: function () {}.bind(this)
                        }), this._addVRPlayerElements(), this._addVRPlayerListeners()
                    }, controller.controller("videoController", videoController), module.exports = controller
                }, {
                    angular: 26
                }],
                14: [function (require, module, exports) {
                    var angular = require("angular"),
                        directive = angular.module("directive.mousetouch", []),
                        beMousedown = function ($parse) {
                            return function (scope, element, attr) {
                                var handler = $parse(attr.beMousedown);
                                element.on("mousedown touchstart", function (event) {
                                    scope.$apply(function () {
                                        handler(scope, {
                                            $event: event
                                        })
                                    })
                                })
                            }
                        },
                        beMousemove = function ($parse) {
                            return function (scope, element, attr) {
                                var handler = $parse(attr.beMousemove);
                                element.on("mousemove touchmove", function (event) {
                                    scope.$apply(function () {
                                        handler(scope, {
                                            $event: event
                                        })
                                    })
                                })
                            }
                        },
                        beMouseup = function ($parse) {
                            return function (scope, element, attr) {
                                var handler = $parse(attr.beMouseup);
                                element.on("mouseup touchend", function (event) {
                                    scope.$apply(function () {
                                        handler(scope, {
                                            $event: event
                                        })
                                    })
                                })
                            }
                        };
                    directive.directive("beMousedown", beMousedown), directive.directive("beMousemove", beMousemove), directive.directive("beMouseup", beMouseup), module.exports = directive
                }, {
                    angular: 26
                }],
                15: [function (require, module, exports) {
                    var angular = require("angular"),
                        filter = angular.module("filter.minutes", []),
                        minutesFilter = function () {
                            return function (time) {
                                time = Math.floor(time);
                                var minutes = Math.floor(time / 60),
                                    seconds = time - 60 * minutes;
                                return seconds = seconds < 10 ? "0" + seconds : seconds, minutes + ":" + seconds
                            }
                        };
                    filter.filter("minutesFilter", minutesFilter), module.exports = filter
                }, {
                    angular: 26
                }],
                16: [function (require, module, exports) {
                    var angular = require("angular"),
                        throttle = require("throttle-debounce/throttle"),
                        debounce = require("throttle-debounce/debounce"),
                        service = angular.module("service.config", []),
                        configService = function ($rootScope, $timeout, $interval) {
                            this.$rootScope = $rootScope, this.$timeout = $timeout, this.$interval = $interval, this.size = "tablet", this.mouseactive = !0, this.lastmousestate = !0, this.mousetimeout, this.hasTouch = !1, this.isSafari, this.$rootScope.isMobileChrome = !1, this.init(), this.detectSafari(), this.detectMobileChrome(), $(window).on("resize", this.onResize.bind(this)), this.onResize(), $(window).on("mousemove", throttle(100, !1, this.onMouseMove.bind(this))), $(window).on("mouseover", throttle(100, !1, this.onMouseMove.bind(this))), this.onMouseMove(), this.setHasTouch = this.onTouchstart.bind(this), $(window).on("touchstart", this.setHasTouch), $(window).on("gesturestart", this.onGestureStart.bind(this)), window.onYouTubeIframeAPIReady = function () {
                                this.$rootScope.$emit("youtubeIframeAPIReady")
                            }.bind(this);
                            var tag = document.createElement("script");
                            tag.src = "https://www.youtube.com/iframe_api";
                            var firstScriptTag = document.getElementsByTagName("script")[0];
                            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), document.addEventListener("visibilitychange", function () {
                                this.$rootScope.$broadcast("visibility--" + document.visibilityState)
                            }.bind(this))
                        };
                    configService.prototype.init = function () {
                        $("body").append('<div id="breakpoints"></div>'), this.$interval(function () {
                            this.mouseactive = !1
                        }.bind(this), 1e3)
                    }, configService.prototype.detectSafari = function () {
                        var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
                            isChrome = !!window.chrome && !!window.chrome.webstore;
                        this.isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
                            return "[object SafariRemoteNotification]" === p.toString()
                        }(!window.safari || safari.pushNotification) || !isChrome && !isOpera && void 0 !== window.webkitAudioContext
                    }, configService.prototype.detectMobileChrome = function () {
                        var isMobileChrome = navigator.userAgent.match("CriOS") || !!window.chrome && /Android|Mobile|mobile/i.test(navigator.userAgent);
                        isMobileChrome && "desktop" !== this.size && (this.$rootScope.isMobileChrome = !0)
                    }, configService.prototype.onGestureStart = function (event) {
                        event.preventDefault()
                    }, configService.prototype.onResize = function () {
                        debounce(100, !1, function () {
                            this.$rootScope.$broadcast("resize")
                        }.bind(this))(), this.old = this.size;
                        var z = $("#breakpoints").css("z-index");
                        this.size = 3 == z ? "desktop" : 2 == z ? "tablet" : "smartphone", this.old && this.old != this.size && this.$rootScope.$broadcast("breakpoint-change", {
                            old: this.old,
                            size: this.size
                        })
                    }, configService.prototype.onMouseMove = function () {
                        this.mouseactive || (this.mouseactive = !0, this.$rootScope.$broadcast("mouse--active")), this.$timeout.cancel(this.mousetimeout), this.mousetimeout = this.$timeout(function () {
                            this.mouseactive = !1, this.$rootScope.$broadcast("mouse--inactive")
                        }.bind(this), 3e3)
                    }, configService.prototype.getFillSize = function (width, height) {
                        var width = width ? width : $(window).width(),
                            fillWidthHeight = 9 * width / 16,
                            height = height ? height : $(window).height(),
                            fillHeightWidth = 16 * height / 9;
                        if (fillWidthHeight < height) var fillWidth = fillHeightWidth,
                            fillHeight = 9 * fillWidth / 16;
                        else var fillHeight = fillWidthHeight,
                            fillWidth = 16 * fillHeight / 9;
                        return {
                            height: fillHeight,
                            width: fillWidth
                        }
                    }, configService.prototype.onTouchstart = function () {
                        this.hasTouch = !0, $(window).off("touchstart", this.setHasTouch)
                    }, service.service("configService", configService), module.exports = service
                }, {
                    angular: 26,
                    "throttle-debounce/debounce": 27,
                    "throttle-debounce/throttle": 28
                }],
                17: [function (require, module, exports) {
                    var angular = require("angular"),
                        service = angular.module("service.map", []),
                        mapService = function ($window, $q) {
                            // var asyncUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBHspqOaEZ4v9ne4VWobYT02OLmHdifIOs&callback=",
                            // var asyncUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJGn7OJX8JSUnZp4WkyxRLDYMjj6pzcLU&callback=",
                            var asyncUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL3qmSEZlR-lTVQkqxUsBoM8IdoL4QkCA&callback=",
                                mapsDefer = $q.defer();
                            $window.googleMapsInitialized = mapsDefer.resolve;
                            var asyncLoad = function (asyncUrl, callbackName) {
                                var script = document.createElement("script");
                                script.src = asyncUrl + callbackName, document.body.appendChild(script)
                            };
                            return asyncLoad(asyncUrl, "googleMapsInitialized"), {
                                mapsInitialized: mapsDefer.promise
                            }
                        };
                    service.service("mapService", mapService), module.exports = service
                }, {
                    angular: 26
                }],
                18: [function (require, module, exports) {
                    var angular = require("angular"),
                        service = angular.module("service.router", []),
                        content = require("../../content/content.json"),
                        routerService = function ($location, $rootScope) {
                            this.$location = $location, this.$rootScope = $rootScope, this.content = content, this.path = "", this.innerPathChange = !1
                        };
                    routerService.prototype.init = function (jump) {
                        this.getPath();
                        var jumped = !1;
                        if (jump) {
                            for (var key in this.content) this.content[key].url == this.path && (this.$rootScope.$broadcast("initialize--jump", key), jumped = !0);
                            jumped || (this.changePath("/", !0), setTimeout(function () {
                                "/" == window.location.pathname && window.location.reload()
                            }, 1e3))
                        }
                        window.addEventListener("popstate", function (event) {
                            window.location.reload()
                        }.bind(this), !1)
                    }, routerService.prototype.changePath = function (path, fourofour) {
                        this.$location.path(path), ga("set", "page", "/" == path ? "/" : "/" + path), ga("send", "pageview")
                    }, routerService.prototype.getPath = function () {
                        var regex = new RegExp("^/|/$", "g");
                        return this.path = this.$location.path().replace(regex, ""), this.path
                    }, service.service("routerService", routerService), module.exports = service
                }, {
                    "../../content/content.json": 1,
                    angular: 26
                }],
                19: [function (require, module, exports) {
                    var angular = require("angular"),
                        service = angular.module("service.state", []),
                        content = require("../../content/content.json"),
                        tplstreetview = require("../../templates/components/streetview.html"),
                        tplvideo = require("../../templates/components/video.html"),
                        tplpano = require("../../templates/components/pano.html"),
                        stateService = function ($rootScope, $compile, $timeout, $location, routerService) {
                            this.$rootScope = $rootScope, this.$compile = $compile, this.$timeout = $timeout, this.$location = $location, this.content = content, this.routerService = routerService, this.deconstructTimeout, this.queuedEvent, this.cancel = this.cancel.bind(this), this._init()
                        };
                    stateService.prototype._init = function () {
                        this.current = {
                            data: this.content.intro,
                            scope: null,
                            element: null
                        }, this.$rootScope.$on("initialize--jump", function (event, next) {
                            this.jump(next, !0)
                        }.bind(this))
                    }, stateService.prototype.add = function (queued, initial) {
                        var template;
                        switch (this.queuedEvent = null, this.current.data.type) {
                            case "streetview":
                                template = tplstreetview;
                                break;
                            case "video":
                                template = tplvideo;
                                break;
                            case "pano":
                                template = tplpano;
                                break;
                            case "takeaction":
                                this.queuedEvent = ["takeaction--open"];
                                break;
                            case "map":
                                this.queuedEvent = ["map--open"];
                                break;
                            case "credits":
                                this.queuedEvent = ["credits--open"];
                                break;
                            case "menu":
                                this.queuedEvent = ["menu--open", this.current.data.menu, this.current.data.card]
                        }
                        template ? (this.$timeout(function () {
                            this.current.scope = this.$rootScope.$new(), this.current.scope.content = this.current.data.content, this.current.scope.json = this.current.data.json, this.current.scope.queued = queued, this.current.scope.initial = initial, this.current.data.next && (this.current.scope.next = this.content[this.current.data.next]), this.current.data.prev && (this.current.scope.prev = this.content[this.current.data.prev]), this.current.element = angular.element(template), this.$compile(this.current.element)(this.current.scope), $("#stage").append(this.current.element)
                        }.bind(this)), this.current.data.watched = !0) : this.queuedEvent && !queued ? (this.$rootScope.$broadcast.apply(this.$rootScope, this.queuedEvent), this._deconstructAll(), initial && this.$rootScope.$broadcast("initial--loaded")) : (this.current.element = null, this.current.scope = null, queued || this._deconstructAll(), initial && this.$rootScope.$broadcast("initial--loaded"))
                    }, stateService.prototype.cancel = function (direction) {
                        this.$timeout.cancel(this.deconstructTimeout), this._clean()
                    }, stateService.prototype.end = function (direction) {
                        switch (direction) {
                            case "prev":
                                (prev = this.current.data.prev) && (this._deconstruct(this.current.scope, this.current.element, !1), this.current.data = this.content[prev], this.add(!1), this.current.data.url && this.routerService.changePath(this.current.data.url));
                                break;
                            case "next":
                                (next = this.current.data.next) && (this._deconstruct(this.current.scope, this.current.element, !1), this.current.data = this.content[next], this.add(!1), this.current.data.url && this.routerService.changePath(this.current.data.url));
                                break;
                            case "postIntroHome":
                                this.$rootScope.$broadcast("home--open"), this.routerService.changePath("/"), this._deconstructAll();
                                break;
                            case "map":
                                this.$rootScope.$broadcast("map--open"), this.$rootScope.$broadcast("interstitial--opened", null, "map--close");
                                break;
                            case "credits":
                                this.$rootScope.$broadcast("credits--open"), this.$rootScope.$broadcast("interstitial--opened", null, "credits--close");
                                break;
                            case "submenu":
                                this.$rootScope.$broadcast("submenu--open");
                                break;
                            case "currentVideo":
                                this.$rootScope.$broadcast("video--open");
                                break;
                            case "interstitial":
                                this._deconstruct(this.current.scope, this.current.element, !0);
                                break;
                            case "showQueued":
                                this._deconstruct(null, null), this.$rootScope.$broadcast("section--showqueued"), this.queuedEvent && (this.$rootScope.$broadcast.apply(this.$rootScope, this.queuedEvent), this.queuedEvent = null), this.current.data.url && this.routerService.changePath(this.current.data.url);
                                break;
                            default:
                                (next = this.current.data.next) && (this._deconstruct(this.current.scope, this.current.element, !1), this.current.data = this.content[next], this.add(!0))
                        }
                    }, stateService.prototype.jump = function (next, initial) {
                        (this.current.scope || this.current.element) && this._deconstruct(this.current.scope, this.current.element, !0), this.current.data = this.content[next], this.add(!1, initial), this.$rootScope.$emit("section--change", this.content[next]), this.current.data.url && this.routerService.changePath(this.current.data.url)
                    }, stateService.prototype._clean = function () {
                        angular.element("#stage section:not(:last-child)").each(function () {
                            var current = angular.element(this);
                            current.next().hasClass("is-active") && (current.scope().$destroy(), current.remove())
                        })
                    }, stateService.prototype._deconstruct = function (scope, element, immediate) {
                        immediate && element && element.scope() && (element.scope().isActive = !1), this.deconstructTimeout = this.$timeout(function () {
                            scope && scope.$destroy(), element && (element.scope() && element.scope().$destroy(), element.remove()), this._clean()
                        }.bind(this), immediate ? 500 : 5e3)
                    }, stateService.prototype._deconstructAll = function () {
                        angular.element("#stage section").each(function (object, item) {
                            var current = angular.element(item);
                            current.scope().isActive = !1, this.$timeout(function () {
                                current.scope() && current.scope().$destroy(), current.remove()
                            }, 500)
                        }.bind(this))
                    }, service.service("stateService", stateService), module.exports = service
                }, {
                    "../../content/content.json": 1,
                    "../../templates/components/pano.html": 20,
                    "../../templates/components/streetview.html": 21,
                    "../../templates/components/video.html": 22,
                    angular: 26
                }],
                20: [function (require, module, exports) {
                    module.exports = '<section class="section--pano"\n    ng-controller="panoController"\n    ng-class="{\'is-active\': isActive, \'is-menu-open\': isMenuOpen, \'is-overlay-active\': showOverlay}">\n  <!-- <div class="pano-content">\n    <h1>Pano Demo</h1>\n  </div> -->\n  <div id="pano-container" ng-click="closeDetail()"></div>\n\n  <div class="custom-zoom">\n    <div class="custom-zoom-in" ng-click="zoomIn()"></div>\n    <div class="custom-zoom-out" ng-click="zoomOut()"></div>\n  </div>\n\n  <div class="pano-thumbnail"\n      ng-click="closeDetail()"\n      ng-class="{\'is-visible\': (!showDragInstruction), \'pause-animation\': showOverlay}">\n    <img ng-src="//\'./assets/\' + content.thumbnail//" />\n    <div class="view-frame"\n    ng-style="{\'left\': viewFrame.left + \'%\', \'top\': viewFrame.top + \'%\',\n    \'right\': viewFrame.right + \'%\', \'bottom\': viewFrame.bottom + \'%\'}"></div>\n    <div class="thumbnail-hotspot" id="hotspot-//hotspot.id//"\n      ng-repeat="hotspot in hotspots"\n      ng-style="{\n        \'left\': (hotspot.mapCoord.lng - boundLeft)/boundWidth * 100 + \'%\',\n        \'top\': (hotspot.mapCoord.lat - boundTop)/boundHeight * 100 - 3 + \'%\'\n      }"></div>\n  </div>\n\n  <div class="hotspot-bound"\n    ng-class="{\'is-moving\': (moving && touch)}">\n    <div class="hotspot" id="//hotspot.id//"\n      ng-click="showDetail(hotspot.id)"\n      ng-repeat="hotspot in hotspots"\n      ng-class="{\'is-enabled\': (hotspot.enabled)}"\n      ng-style="{\'left\': hotspot.displayCoords.x, \'top\': hotspot.displayCoords.y}">\n      <div class="hotspot-icons">\n        <img class="hotspot-circle" ng-src="./assets/icons/hotspot-circle.svg" />\n        <div class="hotspot-triangle-shadow"><img class="hotspot-triangle" ng-src="./assets/icons/hotspot-triangle-shadow.svg" /></div>\n        <img class="hotspot-triangle" ng-src="./assets/icons/hotspot-triangle.svg" />\n      </div>\n      <div class="hotspot-content">\n        <div class="hotspot-text">//hotspot.text//</div>\n        <div class="hotspot-learnmore">Learn more</div>\n      </div>\n    </div>\n  </div>\n\n  <div class="controls" ng-class="{\'forceshow-next\': showNextButton}">\n    <div class="controls-drag-instruction"\n        ng-class="{\'is-visible\': (showDragInstruction)}">\n        <div class="controls-drag-icon-desktop">\n          <div class="controls-drag-device" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-desktop-device.svg)\'}"></div>\n          <div class="controls-drag-arrows" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-desktop-arrows.svg)\'}"></div>\n        </div>\n        <div class="controls-drag-icon-mobile">\n          <div class="controls-drag-device" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-mobile-device.svg)\'}"></div>\n          <div class="controls-drag-arrows" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-mobile-arrows.svg)\'}"></div>\n        </div>\n        press and drag\n    </div>\n  </div>\n\n  <div class="overlay has-background"\n    ng-class="{\'is-visible\': showOverlay}" ng-click="closeDetail()">\n    <div class="overlay-container">\n      <!-- <div class="overlay-number">//currentMarker.type//</div> -->\n      <h1 class="overlay-name">//currentMarker.text//</h1>\n      <p class="overlay-description">//currentMarker.detail//</p>\n    </div>\n  </div>\n</section>\n\n<section class="section--audio" ng-controller="audioController"\n    ng-class="{\'is-controls-visible\': (showControls), \'is-menu-open\': isMenuOpen}">\n  <audio id="audio" autoplay>\n    <source src="" type="audio/ogg">\n    <source src="" type="audio/mpeg">\n  </audio>\n\n  <div class="controls"\n      ng-class="{\'is-active\': (currentState == \'paused\' && showOverlay && !showPlayOverlay),\n      \'is-forced-open\': (currentState == \'paused\')}">\n    <div class="controls-narrators" ng-class="{\'is-active\': (currentState !== \'paused\')}">\n      <div class="controls-narrator"\n        ng-repeat="narrator in content.narrators"\n        ng-class="{\'is-active\': (currentNarrator == narrator.name), \'is-speaking\': (currentState == \'playing\')}">\n        <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n      </div>\n      <div class="controls-narratorInfo">\n        <span ng-show="currentNarrator">Now Speaking</span>\n        <span>//currentNarrator//</span>\n      </div>\n    </div>\n\n    <div class="controls-playPauseToggle" ng-class="{\'is-play-btn\': (currentState !== \'playing\')}" ng-click="playPause()"></div>\n\n    <div class="controls-scrubber"\n      be-mousedown="pauseScrubber($event)"\n      be-mousemove="updateScrubber($event)"\n      be-mouseup="seekTo(timeCurrent)">\n      <div class="controls-scrubberTrack">\n        <div class="controls-scrubberProgress" ng-style="{\'width\': scrubberWidth + \'%\'}"></div>\n      </div>\n    </div>\n\n    <div class="controls-time">\n      <span class="controls-timeCurrent" ng-bind="(timeCurrent | minutesFilter)"></span>\n      <span class="controls-timeTotal" ng-bind="(timeTotal | minutesFilter)"></span>\n    </div>\n\n    <div class="controls-muteToggle" ng-class="{\'is-unmute-btn\': isMuted}" ng-click="toggleMute()"></div>\n\n    <div class="controls-map">\n      <div class="controls-mapLink" ng-click="goTo(\'map\')">\n        <div class="controls-mapIcon" ng-style="{\'background-image\': \'url(./assets/map/\' + content.mapIcon + \')\'}"></div>\n      </div>\n    </div>\n\n    <div class="controls-mobile-next" ng-click="goTo(\'next\')">\n      <span class="controls-mobile-next-text">Next</span>\n    </div>\n  </div>\n\n  <div class="controls-cards"\n      ng-class="{\'is-active\': nextButtonActive, \'forceshow-next\': showNextButton}">\n    <div class="controls-next" ng-show="next">\n      <div class="controls-nextArrow" ng-class="{\'is-visible\': (currentState == \'ended\')}" ng-click="goTo(\'next\')"></div>\n      <div class="card card--video"\n        ng-style="{\'background-image\': \'url(./assets/cards/mobile/\' + next.content.image + \')\'}">\n        <div class="card-content">\n          <span ng-if="(next.type != \'pano\')" class="card-label">Next //next.type//</span>\n          <span ng-if="(next.type == \'pano\')" class="card-label">Next Panorama</span>\n          <span class="card-title">//next.content.number// //next.content.name//</span>\n          <span ng-if="(next.type == \'video\')" class="card-cta">Watch Now</span>\n          <span ng-if="(next.type != \'video\')" class="card-cta">Explore Now</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--titlecard"\n      ng-class="{\'is-visible\': (currentState == \'playing\' && showTitlecard && !userPaused && !showPlayOverlay)}">\n    <div class="overlay-container">\n      <div class="overlay-number">//content.number//</div>\n      <h1 class="overlay-name">//content.name//</h1>\n      <div class="overlay-narrators">\n        <div class="overlay-narrator"\n            ng-repeat="narrator in content.titlecard.narrators">\n          <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n        </div>\n        <p>\n          <span ng-repeat="narrator in content.titlecard.narrators">\n            //narrator.name// //$last ? \'\' : \'&amp; \'//\n          </span>\n        </p>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--play"\n      ng-class="{\'is-visible\': showPlayOverlay,\n      \'is-hidden\': (hidePlayOverlay && isActive)}"\n      ng-click="playCurrent()">\n    <div class="overlay-container"\n        ng-style="{\'background-image\': \'url(./assets/cards/\' + content.image + \')\'}">\n      <div class="overlay-text">\n        <div class="overlay-tag t-smallcaps">Up Next</div>\n        <h1 class="overlay-name">//content.number// //content.name//</h1>\n      </div>\n      <div class="overlay-link">\n        <div class="overlay-playButton">\n          <div class="controls-playPauseToggle is-play-btn"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n'
                }, {}],
                21: [function (require, module, exports) {
                    module.exports = '<section class="section--streetview"\n    ng-controller="streetviewController"\n    ng-class="{\'is-active\': isActive, \'is-menu-open\': isMenuOpen, \'is-overlay-active\': showOverlay}">\n  <div id="streetview" class="streetview-container" ng-click="closeDetail()"></div>\n\n  <div class="hotspot-bound">\n    <div class="hotspot" id="//hotspot.id//"\n      ng-repeat="hotspot in hotspots"\n      ng-class="{\'is-enabled\': (hotspot.enabled),\n          \'navigation-arrow\': (hotspot.goto)}"\n      ng-style="{\'left\': markers[hotspot.id].x, \'top\': markers[hotspot.id].y}">\n      <div class="hotspot-floor" ng-if="hotspot.goto" ng-click="gotoPosition(hotspot.goto)">\n        <img class="hotspot-floor-arrow" ng-src="./assets/icons/streetview-arrow.svg"/>\n      </div>\n      <div class="hotspot-icons" ng-if="!hotspot.goto" ng-click="showDetail(hotspot.id)">\n        <img class="hotspot-circle" ng-src="./assets/icons/hotspot-circle.svg" />\n        <div class="hotspot-triangle-shadow"><img class="hotspot-triangle" ng-src="./assets/icons/hotspot-triangle-shadow.svg" /></div>\n        <img class="hotspot-triangle" ng-src="./assets/icons/hotspot-triangle.svg" />\n      </div>\n      <div class="hotspot-content" ng-if="!hotspot.goto" ng-click="showDetail(hotspot.id)">\n        <div class="hotspot-text">//hotspot.text//</div>\n        <div class="hotspot-learnmore">Learn more</div>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay has-background"\n    ng-class="{\'is-visible\': showOverlay}" ng-click="closeDetail()">\n    <div class="overlay-container">\n      <!-- <div class="overlay-number">//currentHotspot.type//</div> -->\n      <h1 class="overlay-name">//currentHotspot.text//</h1>\n      <p class="overlay-description">//currentHotspot.detail//</p>\n    </div>\n  </div>\n</section>\n\n<section class="section--audio"\n    ng-controller="audioController"\n    ng-class="{\'is-controls-visible\': (showControls), \'is-menu-open\': isMenuOpen}">\n  <audio id="audio" autoplay>\n    <source src="" type="audio/ogg">\n    <source src="" type="audio/mpeg">\n  </audio>\n\n  <div class="controls"\n    ng-class="{\'is-visible\': (currentState == \'paused\' && showOverlay && !showPlayOverlay), \'forceshow-next\': showNextButton}">\n    <div class="controls-narrators" ng-class="{\'is-active\': (currentState !== \'paused\')}">\n      <div class="controls-narrator"\n        ng-repeat="narrator in content.narrators"\n        ng-class="{\'is-active\': (currentNarrator == narrator.name), \'is-speaking\': (currentState == \'playing\')}">\n        <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n      </div>\n      <div class="controls-narratorInfo">\n        <span ng-show="currentNarrator">Now Speaking</span>\n        <span>//currentNarrator//</span>\n      </div>\n    </div>\n\n    <div class="controls-playPauseToggle" ng-class="{\'is-play-btn\': (currentState !== \'playing\')}" ng-click="playPause()"></div>\n\n    <div class="controls-scrubber"\n      be-mousedown="pauseScrubber($event)"\n      be-mousemove="updateScrubber($event)"\n      be-mouseup="seekTo(timeCurrent)">\n      <div class="controls-scrubberTrack">\n        <div class="controls-scrubberProgress" ng-style="{\'width\': scrubberWidth + \'%\'}"></div>\n      </div>\n    </div>\n\n    <div class="controls-time">\n      <span class="controls-timeCurrent" ng-bind="(timeCurrent | minutesFilter)"></span>\n      <span class="controls-timeTotal" ng-bind="(timeTotal | minutesFilter)"></span>\n    </div>\n\n    <div class="controls-muteToggle" ng-class="{\'is-unmute-btn\': isMuted}" ng-click="toggleMute()"></div>\n\n    <div class="controls-map">\n      <div class="controls-mapLink" ng-click="goTo(\'map\')">\n        <div class="controls-mapIcon" ng-style="{\'background-image\': \'url(./assets/map/\' + content.mapIcon + \')\'}"></div>\n      </div>\n    </div>\n\n    <div class="controls-mobile-next" ng-click="goTo(\'next\')">\n      <span class="controls-mobile-next-text">Next</span>\n    </div>\n  </div>\n\n  <div class="controls-cards"\n      ng-class="{\'is-active\': nextButtonActive, \'forceshow-next\': showNextButton}">\n    <div class="controls-next" ng-show="next">\n      <div class="controls-nextArrow" ng-class="{\'is-visible\': (currentState == \'ended\')}" ng-click="goTo(\'next\')"></div>\n      <div class="card card--video"\n        ng-style="{\'background-image\': \'url(./assets/cards/mobile/\' + next.content.image + \')\'}">\n        <div class="card-content">\n          <span ng-if="(next.type != \'pano\')" class="card-label">Next //next.type//</span>\n          <span ng-if="(next.type == \'pano\')" class="card-label">Next Panorama</span>\n          <span class="card-title">//next.content.number// //next.content.name//</span>\n          <span ng-if="(next.type == \'video\')" class="card-cta">Watch Now</span>\n          <span ng-if="(next.type != \'video\')" class="card-cta">Explore Now</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--titlecard"\n      ng-class="{\'is-visible\': (currentState == \'playing\' && showTitlecard && !userPaused && !showPlayOverlay)}">\n    <div class="overlay-container">\n      <div class="overlay-number">//content.number//</div>\n      <h1 class="overlay-name">//content.name//</h1>\n      <div class="overlay-narrators">\n        <div class="overlay-narrator"\n            ng-repeat="narrator in content.titlecard.narrators">\n          <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n        </div>\n        <p>\n          <span ng-repeat="narrator in content.titlecard.narrators">\n            //narrator.name// //$last ? \'\' : \'&amp; \'//\n          </span>\n        </p>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--play"\n      ng-class="{\'is-visible\': showPlayOverlay,\n      \'is-hidden\': (hidePlayOverlay && isActive)}"\n      ng-click="playCurrent()">\n    <div class="overlay-container"\n        ng-style="{\'background-image\': \'url(./assets/cards/\' + content.image + \')\'}">\n      <div class="overlay-text">\n        <div class="overlay-tag t-smallcaps">Up Next</div>\n        <h1 class="overlay-name">//content.number// //content.name//</h1>\n      </div>\n      <div class="overlay-link">\n        <div class="overlay-playButton">\n          <div class="controls-playPauseToggle is-play-btn"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n'
                }, {}],
                22: [function (require, module, exports) {
                    module.exports = '<section class="section--video"\n    ng-controller="videoController"\n    ng-class="{\'is-active\': isActive,\n               \'is-controls-visible\': (showControls && !showPlayOverlay),\n               \'is-menu-open\': isMenuOpen,\n               \'is-playing-premenu\': playingBeforeMenu}">\n  <div id="player" ng-class="{\'is-vrvideo\': content.videoVR, \'is-active\': showPlayer && !showPlayOverlay}"></div>\n\n  <video id="playervr" class="video-js vjs-default-skin"\n    poster="" playsinline crossorigin="anonymous" controls\n    ng-show="content.videoVR" ng-class="{\'is-active\': (showPlayer && showVRPlayer), \'is-ended\': experienceEnded}">\n    <source src="" type=\'video/mp4\'>\n  </video>\n\n  <div class="overlay overlay--loading" ng-class="{\'is-active\': showLoading && !showPlayOverlay}"></div>\n\n  <div class="overlay overlay--play"\n      ng-class="{\'is-visible\': (showPlayOverlay && isActive),\n      \'is-hidden\': (hidePlayOverlay && isActive)}"\n      ng-click="playCurrent()">\n    <div class="overlay-container"\n        ng-style="{\'background-image\': \'url(./assets/cards/\' + content.image + \')\'}">\n      <div class="overlay-text">\n        <div class="overlay-tag t-smallcaps">Up Next</div>\n        <h1 class="overlay-name">//content.number// //content.name//</h1>\n      </div>\n      <div class="overlay-link">\n        <div class="overlay-playButton">\n          <div class="controls-playPauseToggle is-play-btn"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--playExperience"\n      ng-class="{\'is-visible\': (showExperienceOverlay && isActive)}">\n    <div class="overlay-container">\n      <div class="overlay-name">//content.name//</div>\n      <p class="overlay-description">//content.description//</p>\n      <div class="experience-gif"></div>\n      <div class="experience-links">\n        <a class="experience-playVR" ng-click="playCurrent(\'cardboard\')">I\'m Ready</a>\n        <a class="experience-play" ng-click="playCurrent()">Play Without VR</a>\n      </div>\n    </div>\n  </div>\n\n  <div class="controls-pauseOverlay" ng-click="playPause()"></div>\n\n  <div class="controls-drag-instruction"\n        ng-class="{\'is-visible\': (showDragInstruction)}">\n        <div class="controls-drag-icon-desktop">\n          <div class="controls-drag-device" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-desktop-device.svg)\'}"></div>\n          <div class="controls-drag-arrows" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-desktop-arrows.svg)\'}"></div>\n        </div>\n        <div class="controls-drag-icon-mobile">\n          <div class="controls-drag-device" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-mobile-device.svg)\'}"></div>\n          <div class="controls-drag-arrows" ng-style="{\'background-image\': \'url(./assets/icons/drag-icon-mobile-arrows.svg)\'}"></div>\n        </div>\n        press and drag\n    </div>\n  </div>\n\n  <div class="controls-captions" ng-show="content.captions">\n    <div class="caption" ng-repeat="title in content.captions" ng-class="{\'is-active\': activeCaption == $index}">\n      //title.content//\n    </div>\n  </div>\n\n  <div class="controls"\n      ng-class="{\'is-active\': (videoType == \'yt\'),\n      \'is-forced-open\': (currentState == \'paused\' && !showPlayOverlay)}">\n    <div class="controls-narrators" ng-class="{\'is-active\': (currentState !== \'paused\')}">\n      <div class="controls-narrator"\n        ng-repeat="narrator in content.narrators"\n        ng-class="{\'is-active\': (currentNarrator == narrator.name), \'is-speaking\': (currentState == \'playing\')}">\n        <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n      </div>\n      <div class="controls-narratorInfo">\n        <span ng-show="currentNarrator">Now Speaking</span>\n        <span>//currentNarrator//</span>\n      </div>\n    </div>\n\n    <div class="controls-playPauseToggle" ng-class="{\'is-play-btn\': (currentState !== \'playing\')}" ng-click="playPause()"></div>\n\n    <div class="controls-scrubber"\n      be-mousedown="pauseScrubber($event)"\n      be-mousemove="updateScrubber($event)"\n      be-mouseup="seekTo(timeCurrent)">\n      <div class="controls-scrubberTrack">\n        <div class="controls-scrubberProgress" ng-style="{\'width\': scrubberWidth + \'%\'}"></div>\n      </div>\n    </div>\n\n    <div class="controls-time">\n      <span class="controls-timeCurrent" ng-bind="(timeCurrent | minutesFilter)"></span>\n      <span class="controls-timeTotal" ng-bind="(timeTotal | minutesFilter)"></span>\n    </div>\n\n    <div class="controls-muteToggle" ng-class="{\'is-unmute-btn\': isMuted}" ng-click="toggleMute()"></div>\n\n    <div class="controls-mobile-next" ng-click="goTo(\'next\')">\n      <span class="controls-mobile-next-text">Next</span>\n    </div>\n\n    <a class="controls-skip"\n        ng-class="{\'is-active\': showSkip}"\n        ng-click="goTo(\'next\')">\n      Skip\n    </a>\n\n    <div class="controls-map" ng-class="{\'is-disabled\': showSkip}">\n      <div class="controls-mapLink" ng-click="goTo(\'map\', true)">\n        <div class="controls-mapIcon" ng-style="{\'background-image\': \'url(./assets/map/\' + content.mapIcon + \')\'}"></div>\n      </div>\n    </div>\n  </div>\n\n  <div class="controls-cards"\n      ng-class="{\'is-active\': nextButtonActive, \'forceshow-next\': showNextButton}">\n    <div class="controls-next" ng-show="next">\n      <div class="controls-nextArrow"\n          ng-class="{\'is-visible\': (currentState == \'ended\')}"\n          ng-click="goTo(\'next\')"></div>\n      <div class="card card--video"\n        ng-style="{\'background-image\': next.content.image ? \'url(./assets/cards/mobile/\' + next.content.image + \')\' : \'\'}">\n        <div class="card-content">\n          <span ng-if="(next.type != \'pano\')" class="card-label">Next //next.type//</span>\n          <span ng-if="(next.type == \'pano\')" class="card-label">Next Panorama</span>\n          <span class="card-title">//next.content.number// //next.content.name//</span>\n          <span ng-if="(next.type == \'video\')" class="card-cta">Watch Now</span>\n          <span ng-if="(next.type != \'video\')" class="card-cta">Explore Now</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="controls controls--mobilevr"\n    ng-class="{\'is-active\': (videoType == \'vr\' && !experienceActive), \'is-visible\': showVRControls}">\n    <div class="controls-narrators" ng-class="{\'is-active\': (currentState !== \'paused\')}">\n      <div class="controls-narrator"\n        ng-repeat="narrator in content.narrators"\n        ng-class="{\'is-active\': (currentNarrator == narrator.name), \'is-speaking\': (currentState == \'playing\')}">\n          <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n      </div>\n      <div class="controls-narratorInfo">\n        <span ng-show="currentNarrator">Now Speaking</span>\n        <span>//currentNarrator//</span>\n      </div>\n    </div>\n\n    <div class="controls-mobile-next" ng-click="goTo(\'next\')">\n      <span class="controls-mobile-next-text">Next</span>\n    </div>\n  </div>\n\n  <div class="overlay overlay--titlecard"\n      ng-class="{\'is-visible\': (currentState == \'playing\' && showTitlecard && !userPaused)}">\n    <div class="overlay-container">\n      <div class="overlay-number">//content.number//</div>\n      <h1 class="overlay-name">//content.name//</h1>\n      <div class="overlay-narrators">\n        <div class="overlay-narrator"\n            ng-repeat="narrator in content.titlecard.narrators">\n          <div ng-style="{\'background-image\': \'url(./assets/narrators/\' + narrator.image + \')\'}"></div>\n        </div>\n        <p>\n          <span ng-repeat="narrator in content.titlecard.narrators">\n            //narrator.name// //$last ? \'\' : \'&amp; \'//\n          </span>\n        </p>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay"\n      ng-class="{\'is-visible\':\n      (currentState == \'paused\' && !wasPlaying && showOverlay && !experienceActive) ||\n      (currentState == \'ended\' && showOverlay && !experienceActive),\n      \'has-background\': showOverlayBg}"\n      ng-click="playPause()">\n    <div class="overlay-container">\n      <div class="overlay-number">//content.number//</div>\n      <h1 class="overlay-name">//content.name//</h1>\n      <p class="overlay-description">//supplemental.description//</p>\n      <div class="overlay-detail" ng-repeat="(title, value) in supplemental.details">\n        <span class="overlay-detailTitle">//title//</span>\n        <span class="overlay-detailValue">//value//</span>\n      </div>\n    </div>\n  </div>\n\n  <div class="overlay overlay--experience" ng-class="{\'is-visible\': experienceEnded}">\n    <h1 class="overlay-name">//content.name//</h1>\n    <p class="overlay-description">//supplemental.description//</p>\n    <div>\n      <a class="overlay-link" ng-click="goTo(\'take-action\')">Take Action</a>\n      <a class="overlay-link" ng-click="replay()">Watch Again</a>\n    </div>\n  </div>\n</section>\n';
                }, {}],
                23: [function (require, module, exports) {
                    ! function (window, angular) {
                        "use strict";

                        function assertArg(arg, name, reason) {
                            if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
                            return arg
                        }

                        function mergeClasses(a, b) {
                            return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
                        }

                        function packageStyles(options) {
                            var styles = {};
                            return options && (options.to || options.from) && (styles.to = options.to, styles.from = options.from), styles
                        }

                        function pendClasses(classes, fix, isPrefix) {
                            var className = "";
                            return classes = isArray(classes) ? classes : classes && isString(classes) && classes.length ? classes.split(/\s+/) : [], forEach(classes, function (klass, i) {
                                klass && klass.length > 0 && (className += i > 0 ? " " : "", className += isPrefix ? fix + klass : klass + fix)
                            }), className
                        }

                        function removeFromArray(arr, val) {
                            var index = arr.indexOf(val);
                            val >= 0 && arr.splice(index, 1)
                        }

                        function stripCommentsFromElement(element) {
                            if (element instanceof jqLite) switch (element.length) {
                                case 0:
                                    return element;
                                case 1:
                                    if (element[0].nodeType === ELEMENT_NODE) return element;
                                    break;
                                default:
                                    return jqLite(extractElementNode(element))
                            }
                            if (element.nodeType === ELEMENT_NODE) return jqLite(element)
                        }

                        function extractElementNode(element) {
                            if (!element[0]) return element;
                            for (var i = 0; i < element.length; i++) {
                                var elm = element[i];
                                if (elm.nodeType === ELEMENT_NODE) return elm
                            }
                        }

                        function $$addClass($$jqLite, element, className) {
                            forEach(element, function (elm) {
                                $$jqLite.addClass(elm, className)
                            })
                        }

                        function $$removeClass($$jqLite, element, className) {
                            forEach(element, function (elm) {
                                $$jqLite.removeClass(elm, className)
                            })
                        }

                        function applyAnimationClassesFactory($$jqLite) {
                            return function (element, options) {
                                options.addClass && ($$addClass($$jqLite, element, options.addClass), options.addClass = null), options.removeClass && ($$removeClass($$jqLite, element, options.removeClass), options.removeClass = null)
                            }
                        }

                        function prepareAnimationOptions(options) {
                            if (options = options || {}, !options.$$prepared) {
                                var domOperation = options.domOperation || noop;
                                options.domOperation = function () {
                                    options.$$domOperationFired = !0, domOperation(), domOperation = noop
                                }, options.$$prepared = !0
                            }
                            return options
                        }

                        function applyAnimationStyles(element, options) {
                            applyAnimationFromStyles(element, options), applyAnimationToStyles(element, options)
                        }

                        function applyAnimationFromStyles(element, options) {
                            options.from && (element.css(options.from), options.from = null)
                        }

                        function applyAnimationToStyles(element, options) {
                            options.to && (element.css(options.to), options.to = null)
                        }

                        function mergeAnimationDetails(element, oldAnimation, newAnimation) {
                            var target = oldAnimation.options || {},
                                newOptions = newAnimation.options || {},
                                toAdd = (target.addClass || "") + " " + (newOptions.addClass || ""),
                                toRemove = (target.removeClass || "") + " " + (newOptions.removeClass || ""),
                                classes = resolveElementClasses(element.attr("class"), toAdd, toRemove);
                            newOptions.preparationClasses && (target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses), delete newOptions.preparationClasses);
                            var realDomOperation = target.domOperation !== noop ? target.domOperation : null;
                            return extend(target, newOptions), realDomOperation && (target.domOperation = realDomOperation), classes.addClass ? target.addClass = classes.addClass : target.addClass = null, classes.removeClass ? target.removeClass = classes.removeClass : target.removeClass = null, oldAnimation.addClass = target.addClass, oldAnimation.removeClass = target.removeClass, target
                        }

                        function resolveElementClasses(existing, toAdd, toRemove) {
                            function splitClassesToLookup(classes) {
                                isString(classes) && (classes = classes.split(" "));
                                var obj = {};
                                return forEach(classes, function (klass) {
                                    klass.length && (obj[klass] = !0)
                                }), obj
                            }
                            var ADD_CLASS = 1,
                                REMOVE_CLASS = -1,
                                flags = {};
                            existing = splitClassesToLookup(existing), toAdd = splitClassesToLookup(toAdd), forEach(toAdd, function (value, key) {
                                flags[key] = ADD_CLASS
                            }), toRemove = splitClassesToLookup(toRemove), forEach(toRemove, function (value, key) {
                                flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS
                            });
                            var classes = {
                                addClass: "",
                                removeClass: ""
                            };
                            return forEach(flags, function (val, klass) {
                                var prop, allow;
                                val === ADD_CLASS ? (prop = "addClass", allow = !existing[klass] || existing[klass + REMOVE_CLASS_SUFFIX]) : val === REMOVE_CLASS && (prop = "removeClass", allow = existing[klass] || existing[klass + ADD_CLASS_SUFFIX]), allow && (classes[prop].length && (classes[prop] += " "), classes[prop] += klass)
                            }), classes
                        }

                        function getDomNode(element) {
                            return element instanceof jqLite ? element[0] : element
                        }

                        function applyGeneratedPreparationClasses(element, event, options) {
                            var classes = "";
                            event && (classes = pendClasses(event, EVENT_CLASS_PREFIX, !0)), options.addClass && (classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX))), options.removeClass && (classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX))), classes.length && (options.preparationClasses = classes, element.addClass(classes))
                        }

                        function clearGeneratedClasses(element, options) {
                            options.preparationClasses && (element.removeClass(options.preparationClasses), options.preparationClasses = null), options.activeClasses && (element.removeClass(options.activeClasses), options.activeClasses = null)
                        }

                        function blockTransitions(node, duration) {
                            var value = duration ? "-" + duration + "s" : "";
                            return applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]), [TRANSITION_DELAY_PROP, value]
                        }

                        function blockKeyframeAnimations(node, applyBlock) {
                            var value = applyBlock ? "paused" : "",
                                key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
                            return applyInlineStyle(node, [key, value]), [key, value]
                        }

                        function applyInlineStyle(node, styleTuple) {
                            var prop = styleTuple[0],
                                value = styleTuple[1];
                            node.style[prop] = value
                        }

                        function concatWithSpace(a, b) {
                            return a ? b ? a + " " + b : a : b
                        }

                        function getCssKeyframeDurationStyle(duration) {
                            return [ANIMATION_DURATION_PROP, duration + "s"]
                        }

                        function getCssDelayStyle(delay, isKeyframeAnimation) {
                            var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
                            return [prop, delay + "s"]
                        }

                        function computeCssStyles($window, element, properties) {
                            var styles = Object.create(null),
                                detectedStyles = $window.getComputedStyle(element) || {};
                            return forEach(properties, function (formalStyleName, actualStyleName) {
                                var val = detectedStyles[formalStyleName];
                                if (val) {
                                    var c = val.charAt(0);
                                    ("-" === c || "+" === c || c >= 0) && (val = parseMaxTime(val)), 0 === val && (val = null), styles[actualStyleName] = val
                                }
                            }), styles
                        }

                        function parseMaxTime(str) {
                            var maxValue = 0,
                                values = str.split(/\s*,\s*/);
                            return forEach(values, function (value) {
                                "s" === value.charAt(value.length - 1) && (value = value.substring(0, value.length - 1)), value = parseFloat(value) || 0, maxValue = maxValue ? Math.max(value, maxValue) : value
                            }), maxValue
                        }

                        function truthyTimingValue(val) {
                            return 0 === val || null != val
                        }

                        function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
                            var style = TRANSITION_PROP,
                                value = duration + "s";
                            return applyOnlyDuration ? style += DURATION_KEY : value += " linear all", [style, value]
                        }

                        function createLocalCacheLookup() {
                            var cache = Object.create(null);
                            return {
                                flush: function () {
                                    cache = Object.create(null)
                                },
                                count: function (key) {
                                    var entry = cache[key];
                                    return entry ? entry.total : 0
                                },
                                get: function (key) {
                                    var entry = cache[key];
                                    return entry && entry.value
                                },
                                put: function (key, value) {
                                    cache[key] ? cache[key].total++ : cache[key] = {
                                        total: 1,
                                        value: value
                                    }
                                }
                            }
                        }

                        function registerRestorableStyles(backup, node, properties) {
                            forEach(properties, function (prop) {
                                backup[prop] = isDefined(backup[prop]) ? backup[prop] : node.style.getPropertyValue(prop)
                            })
                        }
                        var TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT, ELEMENT_NODE = 1,
                            ADD_CLASS_SUFFIX = "-add",
                            REMOVE_CLASS_SUFFIX = "-remove",
                            EVENT_CLASS_PREFIX = "ng-",
                            ACTIVE_CLASS_SUFFIX = "-active",
                            PREPARE_CLASS_SUFFIX = "-prepare",
                            NG_ANIMATE_CLASSNAME = "ng-animate",
                            NG_ANIMATE_CHILDREN_DATA = "$$ngAnimateChildren",
                            CSS_PREFIX = "";
                        void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend ? (CSS_PREFIX = "-webkit-", TRANSITION_PROP = "WebkitTransition", TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend") : (TRANSITION_PROP = "transition", TRANSITIONEND_EVENT = "transitionend"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend ? (CSS_PREFIX = "-webkit-", ANIMATION_PROP = "WebkitAnimation", ANIMATIONEND_EVENT = "webkitAnimationEnd animationend") : (ANIMATION_PROP = "animation", ANIMATIONEND_EVENT = "animationend");
                        var copy, extend, forEach, isArray, isDefined, isElement, isFunction, isObject, isString, isUndefined, jqLite, noop, DURATION_KEY = "Duration",
                            PROPERTY_KEY = "Property",
                            DELAY_KEY = "Delay",
                            TIMING_KEY = "TimingFunction",
                            ANIMATION_ITERATION_COUNT_KEY = "IterationCount",
                            ANIMATION_PLAYSTATE_KEY = "PlayState",
                            SAFE_FAST_FORWARD_DURATION_VALUE = 9999,
                            ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY,
                            ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY,
                            TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY,
                            TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY,
                            ngMinErr = angular.$$minErr("ng"),
                            $$rAFSchedulerFactory = ["$$rAF", function ($$rAF) {
                                function scheduler(tasks) {
                                    queue = queue.concat(tasks), nextTick()
                                }

                                function nextTick() {
                                    if (queue.length) {
                                        for (var items = queue.shift(), i = 0; i < items.length; i++) items[i]();
                                        cancelFn || $$rAF(function () {
                                            cancelFn || nextTick()
                                        })
                                    }
                                }
                                var queue, cancelFn;
                                return queue = scheduler.queue = [], scheduler.waitUntilQuiet = function (fn) {
                                    cancelFn && cancelFn(), cancelFn = $$rAF(function () {
                                        cancelFn = null, fn(), nextTick()
                                    })
                                }, scheduler
                            }],
                            $$AnimateChildrenDirective = ["$interpolate", function ($interpolate) {
                                return {
                                    link: function (scope, element, attrs) {
                                        function setData(value) {
                                            value = "on" === value || "true" === value, element.data(NG_ANIMATE_CHILDREN_DATA, value)
                                        }
                                        var val = attrs.ngAnimateChildren;
                                        isString(val) && 0 === val.length ? element.data(NG_ANIMATE_CHILDREN_DATA, !0) : (setData($interpolate(val)(scope)), attrs.$observe("ngAnimateChildren", setData))
                                    }
                                }
                            }],
                            ANIMATE_TIMER_KEY = "$$animateCss",
                            ONE_SECOND = 1e3,
                            ELAPSED_TIME_MAX_DECIMAL_PLACES = 3,
                            CLOSING_TIME_BUFFER = 1.5,
                            DETECT_CSS_PROPERTIES = {
                                transitionDuration: TRANSITION_DURATION_PROP,
                                transitionDelay: TRANSITION_DELAY_PROP,
                                transitionProperty: TRANSITION_PROP + PROPERTY_KEY,
                                animationDuration: ANIMATION_DURATION_PROP,
                                animationDelay: ANIMATION_DELAY_PROP,
                                animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
                            },
                            DETECT_STAGGER_CSS_PROPERTIES = {
                                transitionDuration: TRANSITION_DURATION_PROP,
                                transitionDelay: TRANSITION_DELAY_PROP,
                                animationDuration: ANIMATION_DURATION_PROP,
                                animationDelay: ANIMATION_DELAY_PROP
                            },
                            $AnimateCssProvider = ["$animateProvider", function ($animateProvider) {
                                var gcsLookup = createLocalCacheLookup(),
                                    gcsStaggerLookup = createLocalCacheLookup();
                                this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function ($window, $$jqLite, $$AnimateRunner, $timeout, $$forceReflow, $sniffer, $$rAFScheduler, $$animateQueue) {
                                    function gcsHashFn(node, extraClasses) {
                                        var KEY = "$$ngAnimateParentKey",
                                            parentNode = node.parentNode,
                                            parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
                                        return parentID + "-" + node.getAttribute("class") + "-" + extraClasses
                                    }

                                    function computeCachedCssStyles(node, className, cacheKey, properties) {
                                        var timings = gcsLookup.get(cacheKey);
                                        return timings || (timings = computeCssStyles($window, node, properties), "infinite" === timings.animationIterationCount && (timings.animationIterationCount = 1)), gcsLookup.put(cacheKey, timings), timings
                                    }

                                    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
                                        var stagger;
                                        if (gcsLookup.count(cacheKey) > 0 && (stagger = gcsStaggerLookup.get(cacheKey), !stagger)) {
                                            var staggerClassName = pendClasses(className, "-stagger");
                                            $$jqLite.addClass(node, staggerClassName), stagger = computeCssStyles($window, node, properties), stagger.animationDuration = Math.max(stagger.animationDuration, 0), stagger.transitionDuration = Math.max(stagger.transitionDuration, 0), $$jqLite.removeClass(node, staggerClassName), gcsStaggerLookup.put(cacheKey, stagger)
                                        }
                                        return stagger || {}
                                    }

                                    function waitUntilQuiet(callback) {
                                        rafWaitQueue.push(callback), $$rAFScheduler.waitUntilQuiet(function () {
                                            gcsLookup.flush(), gcsStaggerLookup.flush();
                                            for (var pageWidth = $$forceReflow(), i = 0; i < rafWaitQueue.length; i++) rafWaitQueue[i](pageWidth);
                                            rafWaitQueue.length = 0
                                        })
                                    }

                                    function computeTimings(node, className, cacheKey) {
                                        var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES),
                                            aD = timings.animationDelay,
                                            tD = timings.transitionDelay;
                                        return timings.maxDelay = aD && tD ? Math.max(aD, tD) : aD || tD, timings.maxDuration = Math.max(timings.animationDuration * timings.animationIterationCount, timings.transitionDuration), timings
                                    }
                                    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite),
                                        parentCounter = 0,
                                        rafWaitQueue = [];
                                    return function (element, initialOptions) {
                                        function endFn() {
                                            close()
                                        }

                                        function cancelFn() {
                                            close(!0)
                                        }

                                        function close(rejected) {
                                            if (!(animationClosed || animationCompleted && animationPaused)) {
                                                animationClosed = !0, animationPaused = !1, options.$$skipPreparationClasses || $$jqLite.removeClass(element, preparationClasses), $$jqLite.removeClass(element, activeClasses), blockKeyframeAnimations(node, !1), blockTransitions(node, !1), forEach(temporaryStyles, function (entry) {
                                                    node.style[entry[0]] = ""
                                                }), applyAnimationClasses(element, options), applyAnimationStyles(element, options), Object.keys(restoreStyles).length && forEach(restoreStyles, function (value, prop) {
                                                    value ? node.style.setProperty(prop, value) : node.style.removeProperty(prop)
                                                }), options.onDone && options.onDone(), events && events.length && element.off(events.join(" "), onAnimationProgress);
                                                var animationTimerData = element.data(ANIMATE_TIMER_KEY);
                                                animationTimerData && ($timeout.cancel(animationTimerData[0].timer), element.removeData(ANIMATE_TIMER_KEY)), runner && runner.complete(!rejected)
                                            }
                                        }

                                        function applyBlocking(duration) {
                                            flags.blockTransition && blockTransitions(node, duration), flags.blockKeyframeAnimation && blockKeyframeAnimations(node, !!duration)
                                        }

                                        function closeAndReturnNoopAnimator() {
                                            return runner = new $$AnimateRunner({
                                                end: endFn,
                                                cancel: cancelFn
                                            }), waitUntilQuiet(noop), close(), {
                                                $$willAnimate: !1,
                                                start: function () {
                                                    return runner
                                                },
                                                end: endFn
                                            }
                                        }

                                        function onAnimationProgress(event) {
                                            event.stopPropagation();
                                            var ev = event.originalEvent || event,
                                                timeStamp = ev.$manualTimeStamp || Date.now(),
                                                elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                                            Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration && (animationCompleted = !0, close())
                                        }

                                        function start() {
                                            function triggerAnimationStart() {
                                                if (!animationClosed) {
                                                    if (applyBlocking(!1), forEach(temporaryStyles, function (entry) {
                                                            var key = entry[0],
                                                                value = entry[1];
                                                            node.style[key] = value
                                                        }), applyAnimationClasses(element, options), $$jqLite.addClass(element, activeClasses), flags.recalculateTimingStyles) {
                                                        if (fullClassName = node.getAttribute("class") + " " + preparationClasses, cacheKey = gcsHashFn(node, fullClassName), timings = computeTimings(node, fullClassName, cacheKey), relativeDelay = timings.maxDelay, maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration, 0 === maxDuration) return void close();
                                                        flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0
                                                    }
                                                    if (flags.applyAnimationDelay && (relativeDelay = "boolean" != typeof options.delay && truthyTimingValue(options.delay) ? parseFloat(options.delay) : relativeDelay, maxDelay = Math.max(relativeDelay, 0), timings.animationDelay = relativeDelay, delayStyle = getCssDelayStyle(relativeDelay, !0), temporaryStyles.push(delayStyle), node.style[delayStyle[0]] = delayStyle[1]), maxDelayTime = maxDelay * ONE_SECOND, maxDurationTime = maxDuration * ONE_SECOND, options.easing) {
                                                        var easeProp, easeVal = options.easing;
                                                        flags.hasTransitions && (easeProp = TRANSITION_PROP + TIMING_KEY, temporaryStyles.push([easeProp, easeVal]), node.style[easeProp] = easeVal), flags.hasAnimations && (easeProp = ANIMATION_PROP + TIMING_KEY, temporaryStyles.push([easeProp, easeVal]), node.style[easeProp] = easeVal)
                                                    }
                                                    timings.transitionDuration && events.push(TRANSITIONEND_EVENT), timings.animationDuration && events.push(ANIMATIONEND_EVENT), startTime = Date.now();
                                                    var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime,
                                                        endTime = startTime + timerTime,
                                                        animationsData = element.data(ANIMATE_TIMER_KEY) || [],
                                                        setupFallbackTimer = !0;
                                                    if (animationsData.length) {
                                                        var currentTimerData = animationsData[0];
                                                        setupFallbackTimer = endTime > currentTimerData.expectedEndTime, setupFallbackTimer ? $timeout.cancel(currentTimerData.timer) : animationsData.push(close)
                                                    }
                                                    if (setupFallbackTimer) {
                                                        var timer = $timeout(onAnimationExpired, timerTime, !1);
                                                        animationsData[0] = {
                                                            timer: timer,
                                                            expectedEndTime: endTime
                                                        }, animationsData.push(close), element.data(ANIMATE_TIMER_KEY, animationsData)
                                                    }
                                                    events.length && element.on(events.join(" "), onAnimationProgress), options.to && (options.cleanupStyles && registerRestorableStyles(restoreStyles, node, Object.keys(options.to)), applyAnimationToStyles(element, options))
                                                }
                                            }

                                            function onAnimationExpired() {
                                                var animationsData = element.data(ANIMATE_TIMER_KEY);
                                                if (animationsData) {
                                                    for (var i = 1; i < animationsData.length; i++) animationsData[i]();
                                                    element.removeData(ANIMATE_TIMER_KEY)
                                                }
                                            }
                                            if (!animationClosed) {
                                                if (!node.parentNode) return void close();
                                                var playPause = function (playAnimation) {
                                                        if (animationCompleted) animationPaused && playAnimation && (animationPaused = !1, close());
                                                        else if (animationPaused = !playAnimation, timings.animationDuration) {
                                                            var value = blockKeyframeAnimations(node, animationPaused);
                                                            animationPaused ? temporaryStyles.push(value) : removeFromArray(temporaryStyles, value)
                                                        }
                                                    },
                                                    maxStagger = itemIndex > 0 && (timings.transitionDuration && 0 === stagger.transitionDuration || timings.animationDuration && 0 === stagger.animationDuration) && Math.max(stagger.animationDelay, stagger.transitionDelay);
                                                maxStagger ? $timeout(triggerAnimationStart, Math.floor(maxStagger * itemIndex * ONE_SECOND), !1) : triggerAnimationStart(), runnerHost.resume = function () {
                                                    playPause(!0)
                                                }, runnerHost.pause = function () {
                                                    playPause(!1)
                                                }
                                            }
                                        }
                                        var options = initialOptions || {};
                                        options.$$prepared || (options = prepareAnimationOptions(copy(options)));
                                        var restoreStyles = {},
                                            node = getDomNode(element);
                                        if (!node || !node.parentNode || !$$animateQueue.enabled()) return closeAndReturnNoopAnimator();
                                        var animationClosed, animationPaused, animationCompleted, runner, runnerHost, maxDelay, maxDelayTime, maxDuration, maxDurationTime, startTime, temporaryStyles = [],
                                            classes = element.attr("class"),
                                            styles = packageStyles(options),
                                            events = [];
                                        if (0 === options.duration || !$sniffer.animations && !$sniffer.transitions) return closeAndReturnNoopAnimator();
                                        var method = options.event && isArray(options.event) ? options.event.join(" ") : options.event,
                                            isStructural = method && options.structural,
                                            structuralClassName = "",
                                            addRemoveClassName = "";
                                        isStructural ? structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, !0) : method && (structuralClassName = method), options.addClass && (addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX)), options.removeClass && (addRemoveClassName.length && (addRemoveClassName += " "), addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX)), options.applyClassesEarly && addRemoveClassName.length && applyAnimationClasses(element, options);
                                        var preparationClasses = [structuralClassName, addRemoveClassName].join(" ").trim(),
                                            fullClassName = classes + " " + preparationClasses,
                                            activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX),
                                            hasToStyles = styles.to && Object.keys(styles.to).length > 0,
                                            containsKeyframeAnimation = (options.keyframeStyle || "").length > 0;
                                        if (!containsKeyframeAnimation && !hasToStyles && !preparationClasses) return closeAndReturnNoopAnimator();
                                        var cacheKey, stagger;
                                        if (options.stagger > 0) {
                                            var staggerVal = parseFloat(options.stagger);
                                            stagger = {
                                                transitionDelay: staggerVal,
                                                animationDelay: staggerVal,
                                                transitionDuration: 0,
                                                animationDuration: 0
                                            }
                                        } else cacheKey = gcsHashFn(node, fullClassName), stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
                                        options.$$skipPreparationClasses || $$jqLite.addClass(element, preparationClasses);
                                        var applyOnlyDuration;
                                        if (options.transitionStyle) {
                                            var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
                                            applyInlineStyle(node, transitionStyle), temporaryStyles.push(transitionStyle)
                                        }
                                        if (options.duration >= 0) {
                                            applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
                                            var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
                                            applyInlineStyle(node, durationStyle), temporaryStyles.push(durationStyle)
                                        }
                                        if (options.keyframeStyle) {
                                            var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
                                            applyInlineStyle(node, keyframeStyle), temporaryStyles.push(keyframeStyle)
                                        }
                                        var itemIndex = stagger ? options.staggerIndex >= 0 ? options.staggerIndex : gcsLookup.count(cacheKey) : 0,
                                            isFirst = 0 === itemIndex;
                                        isFirst && !options.skipBlocking && blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
                                        var timings = computeTimings(node, fullClassName, cacheKey),
                                            relativeDelay = timings.maxDelay;
                                        maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration;
                                        var flags = {};
                                        if (flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0, flags.hasTransitionAll = flags.hasTransitions && "all" === timings.transitionProperty, flags.applyTransitionDuration = hasToStyles && (flags.hasTransitions && !flags.hasTransitionAll || flags.hasAnimations && !flags.hasTransitions), flags.applyAnimationDuration = options.duration && flags.hasAnimations, flags.applyTransitionDelay = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions), flags.applyAnimationDelay = truthyTimingValue(options.delay) && flags.hasAnimations, flags.recalculateTimingStyles = addRemoveClassName.length > 0, (flags.applyTransitionDuration || flags.applyAnimationDuration) && (maxDuration = options.duration ? parseFloat(options.duration) : maxDuration, flags.applyTransitionDuration && (flags.hasTransitions = !0, timings.transitionDuration = maxDuration, applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0, temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration))), flags.applyAnimationDuration && (flags.hasAnimations = !0, timings.animationDuration = maxDuration, temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration)))), 0 === maxDuration && !flags.recalculateTimingStyles) return closeAndReturnNoopAnimator();
                                        if (null != options.delay) {
                                            var delayStyle;
                                            "boolean" != typeof options.delay && (delayStyle = parseFloat(options.delay), maxDelay = Math.max(delayStyle, 0)), flags.applyTransitionDelay && temporaryStyles.push(getCssDelayStyle(delayStyle)), flags.applyAnimationDelay && temporaryStyles.push(getCssDelayStyle(delayStyle, !0))
                                        }
                                        return null == options.duration && timings.transitionDuration > 0 && (flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst), maxDelayTime = maxDelay * ONE_SECOND, maxDurationTime = maxDuration * ONE_SECOND, options.skipBlocking || (flags.blockTransition = timings.transitionDuration > 0, flags.blockKeyframeAnimation = timings.animationDuration > 0 && stagger.animationDelay > 0 && 0 === stagger.animationDuration), options.from && (options.cleanupStyles && registerRestorableStyles(restoreStyles, node, Object.keys(options.from)), applyAnimationFromStyles(element, options)), flags.blockTransition || flags.blockKeyframeAnimation ? applyBlocking(maxDuration) : options.skipBlocking || blockTransitions(node, !1), {
                                            $$willAnimate: !0,
                                            end: endFn,
                                            start: function () {
                                                if (!animationClosed) return runnerHost = {
                                                    end: endFn,
                                                    cancel: cancelFn,
                                                    resume: null,
                                                    pause: null
                                                }, runner = new $$AnimateRunner(runnerHost), waitUntilQuiet(start), runner
                                            }
                                        }
                                    }
                                }]
                            }],
                            $$AnimateCssDriverProvider = ["$$animationProvider", function ($$animationProvider) {
                                function isDocumentFragment(node) {
                                    return node.parentNode && 11 === node.parentNode.nodeType
                                }
                                $$animationProvider.drivers.push("$$animateCssDriver");
                                var NG_ANIMATE_SHIM_CLASS_NAME = "ng-animate-shim",
                                    NG_ANIMATE_ANCHOR_CLASS_NAME = "ng-anchor",
                                    NG_OUT_ANCHOR_CLASS_NAME = "ng-anchor-out",
                                    NG_IN_ANCHOR_CLASS_NAME = "ng-anchor-in";
                                this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function ($animateCss, $rootScope, $$AnimateRunner, $rootElement, $sniffer, $$jqLite, $document) {
                                    function filterCssClasses(classes) {
                                        return classes.replace(/\bng-\S+\b/g, "")
                                    }

                                    function getUniqueValues(a, b) {
                                        return isString(a) && (a = a.split(" ")), isString(b) && (b = b.split(" ")), a.filter(function (val) {
                                            return b.indexOf(val) === -1
                                        }).join(" ")
                                    }

                                    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
                                        function calculateAnchorStyles(anchor) {
                                            var styles = {},
                                                coords = getDomNode(anchor).getBoundingClientRect();
                                            return forEach(["width", "height", "top", "left"], function (key) {
                                                var value = coords[key];
                                                switch (key) {
                                                    case "top":
                                                        value += bodyNode.scrollTop;
                                                        break;
                                                    case "left":
                                                        value += bodyNode.scrollLeft
                                                }
                                                styles[key] = Math.floor(value) + "px"
                                            }), styles
                                        }

                                        function prepareOutAnimation() {
                                            var animator = $animateCss(clone, {
                                                addClass: NG_OUT_ANCHOR_CLASS_NAME,
                                                delay: !0,
                                                from: calculateAnchorStyles(outAnchor)
                                            });
                                            return animator.$$willAnimate ? animator : null
                                        }

                                        function getClassVal(element) {
                                            return element.attr("class") || ""
                                        }

                                        function prepareInAnimation() {
                                            var endingClasses = filterCssClasses(getClassVal(inAnchor)),
                                                toAdd = getUniqueValues(endingClasses, startingClasses),
                                                toRemove = getUniqueValues(startingClasses, endingClasses),
                                                animator = $animateCss(clone, {
                                                    to: calculateAnchorStyles(inAnchor),
                                                    addClass: NG_IN_ANCHOR_CLASS_NAME + " " + toAdd,
                                                    removeClass: NG_OUT_ANCHOR_CLASS_NAME + " " + toRemove,
                                                    delay: !0
                                                });
                                            return animator.$$willAnimate ? animator : null
                                        }

                                        function end() {
                                            clone.remove(), outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME)
                                        }
                                        var clone = jqLite(getDomNode(outAnchor).cloneNode(!0)),
                                            startingClasses = filterCssClasses(getClassVal(clone));
                                        outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME), rootBodyElement.append(clone);
                                        var animatorIn, animatorOut = prepareOutAnimation();
                                        if (!animatorOut && (animatorIn = prepareInAnimation(), !animatorIn)) return end();
                                        var startingAnimator = animatorOut || animatorIn;
                                        return {
                                            start: function () {
                                                function endFn() {
                                                    currentAnimation && currentAnimation.end()
                                                }
                                                var runner, currentAnimation = startingAnimator.start();
                                                return currentAnimation.done(function () {
                                                    return currentAnimation = null, !animatorIn && (animatorIn = prepareInAnimation()) ? (currentAnimation = animatorIn.start(), currentAnimation.done(function () {
                                                        currentAnimation = null, end(), runner.complete()
                                                    }), currentAnimation) : (end(), void runner.complete())
                                                }), runner = new $$AnimateRunner({
                                                    end: endFn,
                                                    cancel: endFn
                                                })
                                            }
                                        }
                                    }

                                    function prepareFromToAnchorAnimation(from, to, classes, anchors) {
                                        var fromAnimation = prepareRegularAnimation(from, noop),
                                            toAnimation = prepareRegularAnimation(to, noop),
                                            anchorAnimations = [];
                                        if (forEach(anchors, function (anchor) {
                                                var outElement = anchor.out,
                                                    inElement = anchor["in"],
                                                    animator = prepareAnchoredAnimation(classes, outElement, inElement);
                                                animator && anchorAnimations.push(animator)
                                            }), fromAnimation || toAnimation || 0 !== anchorAnimations.length) return {
                                            start: function () {
                                                function endFn() {
                                                    forEach(animationRunners, function (runner) {
                                                        runner.end()
                                                    })
                                                }
                                                var animationRunners = [];
                                                fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), forEach(anchorAnimations, function (animation) {
                                                    animationRunners.push(animation.start())
                                                });
                                                var runner = new $$AnimateRunner({
                                                    end: endFn,
                                                    cancel: endFn
                                                });
                                                return $$AnimateRunner.all(animationRunners, function (status) {
                                                    runner.complete(status)
                                                }), runner
                                            }
                                        }
                                    }

                                    function prepareRegularAnimation(animationDetails) {
                                        var element = animationDetails.element,
                                            options = animationDetails.options || {};
                                        animationDetails.structural && (options.event = animationDetails.event, options.structural = !0, options.applyClassesEarly = !0, "leave" === animationDetails.event && (options.onDone = options.domOperation)), options.preparationClasses && (options.event = concatWithSpace(options.event, options.preparationClasses));
                                        var animator = $animateCss(element, options);
                                        return animator.$$willAnimate ? animator : null
                                    }
                                    if (!$sniffer.animations && !$sniffer.transitions) return noop;
                                    var bodyNode = $document[0].body,
                                        rootNode = getDomNode($rootElement),
                                        rootBodyElement = jqLite(isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode);
                                    return function (animationDetails) {
                                        return animationDetails.from && animationDetails.to ? prepareFromToAnchorAnimation(animationDetails.from, animationDetails.to, animationDetails.classes, animationDetails.anchors) : prepareRegularAnimation(animationDetails)
                                    }
                                }]
                            }],
                            $$AnimateJsProvider = ["$animateProvider", function ($animateProvider) {
                                this.$get = ["$injector", "$$AnimateRunner", "$$jqLite", function ($injector, $$AnimateRunner, $$jqLite) {
                                    function lookupAnimations(classes) {
                                        classes = isArray(classes) ? classes : classes.split(" ");
                                        for (var matches = [], flagMap = {}, i = 0; i < classes.length; i++) {
                                            var klass = classes[i],
                                                animationFactory = $animateProvider.$$registeredAnimations[klass];
                                            animationFactory && !flagMap[klass] && (matches.push($injector.get(animationFactory)), flagMap[klass] = !0)
                                        }
                                        return matches
                                    }
                                    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
                                    return function (element, event, classes, options) {
                                        function applyOptions() {
                                            options.domOperation(), applyAnimationClasses(element, options)
                                        }

                                        function close() {
                                            animationClosed = !0, applyOptions(), applyAnimationStyles(element, options)
                                        }

                                        function executeAnimationFn(fn, element, event, options, onDone) {
                                            var args;
                                            switch (event) {
                                                case "animate":
                                                    args = [element, options.from, options.to, onDone];
                                                    break;
                                                case "setClass":
                                                    args = [element, classesToAdd, classesToRemove, onDone];
                                                    break;
                                                case "addClass":
                                                    args = [element, classesToAdd, onDone];
                                                    break;
                                                case "removeClass":
                                                    args = [element, classesToRemove, onDone];
                                                    break;
                                                default:
                                                    args = [element, onDone]
                                            }
                                            args.push(options);
                                            var value = fn.apply(fn, args);
                                            if (value)
                                                if (isFunction(value.start) && (value = value.start()), value instanceof $$AnimateRunner) value.done(onDone);
                                                else if (isFunction(value)) return value;
                                            return noop
                                        }

                                        function groupEventedAnimations(element, event, options, animations, fnName) {
                                            var operations = [];
                                            return forEach(animations, function (ani) {
                                                var animation = ani[fnName];
                                                animation && operations.push(function () {
                                                    var runner, endProgressCb, resolved = !1,
                                                        onAnimationComplete = function (rejected) {
                                                            resolved || (resolved = !0, (endProgressCb || noop)(rejected), runner.complete(!rejected))
                                                        };
                                                    return runner = new $$AnimateRunner({
                                                        end: function () {
                                                            onAnimationComplete()
                                                        },
                                                        cancel: function () {
                                                            onAnimationComplete(!0)
                                                        }
                                                    }), endProgressCb = executeAnimationFn(animation, element, event, options, function (result) {
                                                        var cancelled = result === !1;
                                                        onAnimationComplete(cancelled)
                                                    }), runner
                                                })
                                            }), operations
                                        }

                                        function packageAnimations(element, event, options, animations, fnName) {
                                            var operations = groupEventedAnimations(element, event, options, animations, fnName);
                                            if (0 === operations.length) {
                                                var a, b;
                                                "beforeSetClass" === fnName ? (a = groupEventedAnimations(element, "removeClass", options, animations, "beforeRemoveClass"), b = groupEventedAnimations(element, "addClass", options, animations, "beforeAddClass")) : "setClass" === fnName && (a = groupEventedAnimations(element, "removeClass", options, animations, "removeClass"), b = groupEventedAnimations(element, "addClass", options, animations, "addClass")), a && (operations = operations.concat(a)), b && (operations = operations.concat(b))
                                            }
                                            if (0 !== operations.length) return function (callback) {
                                                var runners = [];
                                                return operations.length && forEach(operations, function (animateFn) {
                                                        runners.push(animateFn())
                                                    }), runners.length ? $$AnimateRunner.all(runners, callback) : callback(),
                                                    function (reject) {
                                                        forEach(runners, function (runner) {
                                                            reject ? runner.cancel() : runner.end()
                                                        })
                                                    }
                                            }
                                        }
                                        var animationClosed = !1;
                                        3 === arguments.length && isObject(classes) && (options = classes, classes = null), options = prepareAnimationOptions(options), classes || (classes = element.attr("class") || "", options.addClass && (classes += " " + options.addClass), options.removeClass && (classes += " " + options.removeClass));
                                        var before, after, classesToAdd = options.addClass,
                                            classesToRemove = options.removeClass,
                                            animations = lookupAnimations(classes);
                                        if (animations.length) {
                                            var afterFn, beforeFn;
                                            "leave" === event ? (beforeFn = "leave", afterFn = "afterLeave") : (beforeFn = "before" + event.charAt(0).toUpperCase() + event.substr(1), afterFn = event), "enter" !== event && "move" !== event && (before = packageAnimations(element, event, options, animations, beforeFn)), after = packageAnimations(element, event, options, animations, afterFn)
                                        }
                                        if (before || after) {
                                            var runner;
                                            return {
                                                $$willAnimate: !0,
                                                end: function () {
                                                    return runner ? runner.end() : (close(), runner = new $$AnimateRunner, runner.complete(!0)), runner
                                                },
                                                start: function () {
                                                    function onComplete(success) {
                                                        close(success), runner.complete(success)
                                                    }

                                                    function endAnimations(cancelled) {
                                                        animationClosed || ((closeActiveAnimations || noop)(cancelled), onComplete(cancelled))
                                                    }
                                                    if (runner) return runner;
                                                    runner = new $$AnimateRunner;
                                                    var closeActiveAnimations, chain = [];
                                                    return before && chain.push(function (fn) {
                                                        closeActiveAnimations = before(fn)
                                                    }), chain.length ? chain.push(function (fn) {
                                                        applyOptions(), fn(!0)
                                                    }) : applyOptions(), after && chain.push(function (fn) {
                                                        closeActiveAnimations = after(fn)
                                                    }), runner.setHost({
                                                        end: function () {
                                                            endAnimations()
                                                        },
                                                        cancel: function () {
                                                            endAnimations(!0)
                                                        }
                                                    }), $$AnimateRunner.chain(chain, onComplete), runner
                                                }
                                            }
                                        }
                                    }
                                }]
                            }],
                            $$AnimateJsDriverProvider = ["$$animationProvider", function ($$animationProvider) {
                                $$animationProvider.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function ($$animateJs, $$AnimateRunner) {
                                    function prepareAnimation(animationDetails) {
                                        var element = animationDetails.element,
                                            event = animationDetails.event,
                                            options = animationDetails.options,
                                            classes = animationDetails.classes;
                                        return $$animateJs(element, event, classes, options)
                                    }
                                    return function (animationDetails) {
                                        if (animationDetails.from && animationDetails.to) {
                                            var fromAnimation = prepareAnimation(animationDetails.from),
                                                toAnimation = prepareAnimation(animationDetails.to);
                                            if (!fromAnimation && !toAnimation) return;
                                            return {
                                                start: function () {
                                                    function endFnFactory() {
                                                        return function () {
                                                            forEach(animationRunners, function (runner) {
                                                                runner.end()
                                                            })
                                                        }
                                                    }

                                                    function done(status) {
                                                        runner.complete(status)
                                                    }
                                                    var animationRunners = [];
                                                    fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), $$AnimateRunner.all(animationRunners, done);
                                                    var runner = new $$AnimateRunner({
                                                        end: endFnFactory(),
                                                        cancel: endFnFactory()
                                                    });
                                                    return runner
                                                }
                                            }
                                        }
                                        return prepareAnimation(animationDetails)
                                    }
                                }]
                            }],
                            NG_ANIMATE_ATTR_NAME = "data-ng-animate",
                            NG_ANIMATE_PIN_DATA = "$ngAnimatePin",
                            $$AnimateQueueProvider = ["$animateProvider", function ($animateProvider) {
                                function makeTruthyCssClassMap(classString) {
                                    if (!classString) return null;
                                    var keys = classString.split(ONE_SPACE),
                                        map = Object.create(null);
                                    return forEach(keys, function (key) {
                                        map[key] = !0
                                    }), map
                                }

                                function hasMatchingClasses(newClassString, currentClassString) {
                                    if (newClassString && currentClassString) {
                                        var currentClassMap = makeTruthyCssClassMap(currentClassString);
                                        return newClassString.split(ONE_SPACE).some(function (className) {
                                            return currentClassMap[className]
                                        })
                                    }
                                }

                                function isAllowed(ruleType, currentAnimation, previousAnimation) {
                                    return rules[ruleType].some(function (fn) {
                                        return fn(currentAnimation, previousAnimation)
                                    })
                                }

                                function hasAnimationClasses(animation, and) {
                                    var a = (animation.addClass || "").length > 0,
                                        b = (animation.removeClass || "").length > 0;
                                    return and ? a && b : a || b
                                }
                                var PRE_DIGEST_STATE = 1,
                                    RUNNING_STATE = 2,
                                    ONE_SPACE = " ",
                                    rules = this.rules = {
                                        skip: [],
                                        cancel: [],
                                        join: []
                                    };
                                rules.join.push(function (newAnimation, currentAnimation) {
                                    return !newAnimation.structural && hasAnimationClasses(newAnimation)
                                }), rules.skip.push(function (newAnimation, currentAnimation) {
                                    return !newAnimation.structural && !hasAnimationClasses(newAnimation)
                                }), rules.skip.push(function (newAnimation, currentAnimation) {
                                    return "leave" === currentAnimation.event && newAnimation.structural
                                }), rules.skip.push(function (newAnimation, currentAnimation) {
                                    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural
                                }), rules.cancel.push(function (newAnimation, currentAnimation) {
                                    return currentAnimation.structural && newAnimation.structural
                                }), rules.cancel.push(function (newAnimation, currentAnimation) {
                                    return currentAnimation.state === RUNNING_STATE && newAnimation.structural
                                }), rules.cancel.push(function (newAnimation, currentAnimation) {
                                    if (currentAnimation.structural) return !1;
                                    var nA = newAnimation.addClass,
                                        nR = newAnimation.removeClass,
                                        cA = currentAnimation.addClass,
                                        cR = currentAnimation.removeClass;
                                    return !(isUndefined(nA) && isUndefined(nR) || isUndefined(cA) && isUndefined(cR)) && (hasMatchingClasses(nA, cR) || hasMatchingClasses(nR, cA))
                                }), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$Map", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", "$$isDocumentHidden", function ($$rAF, $rootScope, $rootElement, $document, $$Map, $$animation, $$AnimateRunner, $templateRequest, $$jqLite, $$forceReflow, $$isDocumentHidden) {
                                    function postDigestTaskFactory() {
                                        var postDigestCalled = !1;
                                        return function (fn) {
                                            postDigestCalled ? fn() : $rootScope.$$postDigest(function () {
                                                postDigestCalled = !0, fn()
                                            })
                                        }
                                    }

                                    function normalizeAnimationDetails(element, animation) {
                                        return mergeAnimationDetails(element, animation, {})
                                    }

                                    function findCallbacks(targetParentNode, targetNode, event) {
                                        var matches = [],
                                            entries = callbackRegistry[event];
                                        return entries && forEach(entries, function (entry) {
                                            contains.call(entry.node, targetNode) ? matches.push(entry.callback) : "leave" === event && contains.call(entry.node, targetParentNode) && matches.push(entry.callback)
                                        }), matches
                                    }

                                    function filterFromRegistry(list, matchContainer, matchCallback) {
                                        var containerNode = extractElementNode(matchContainer);
                                        return list.filter(function (entry) {
                                            var isMatch = entry.node === containerNode && (!matchCallback || entry.callback === matchCallback);
                                            return !isMatch
                                        })
                                    }

                                    function cleanupEventListeners(phase, node) {
                                        "close" !== phase || node.parentNode || $animate.off(node)
                                    }

                                    function queueAnimation(originalElement, event, initialOptions) {
                                        function notifyProgress(runner, event, phase, data) {
                                            runInNextPostDigestOrNow(function () {
                                                var callbacks = findCallbacks(parentNode, node, event);
                                                callbacks.length ? $$rAF(function () {
                                                    forEach(callbacks, function (callback) {
                                                        callback(element, phase, data)
                                                    }), cleanupEventListeners(phase, node)
                                                }) : cleanupEventListeners(phase, node)
                                            }), runner.progress(event, phase, data)
                                        }

                                        function close(reject) {
                                            clearGeneratedClasses(element, options), applyAnimationClasses(element, options), applyAnimationStyles(element, options), options.domOperation(), runner.complete(!reject)
                                        }
                                        var options = copy(initialOptions),
                                            element = stripCommentsFromElement(originalElement),
                                            node = getDomNode(element),
                                            parentNode = node && node.parentNode;
                                        options = prepareAnimationOptions(options);
                                        var runner = new $$AnimateRunner,
                                            runInNextPostDigestOrNow = postDigestTaskFactory();
                                        if (isArray(options.addClass) && (options.addClass = options.addClass.join(" ")), options.addClass && !isString(options.addClass) && (options.addClass = null), isArray(options.removeClass) && (options.removeClass = options.removeClass.join(" ")), options.removeClass && !isString(options.removeClass) && (options.removeClass = null), options.from && !isObject(options.from) && (options.from = null), options.to && !isObject(options.to) && (options.to = null), !node) return close(), runner;
                                        var className = [node.getAttribute("class"), options.addClass, options.removeClass].join(" ");
                                        if (!isAnimatableClassName(className)) return close(), runner;
                                        var isStructural = ["enter", "move", "leave"].indexOf(event) >= 0,
                                            documentHidden = $$isDocumentHidden(),
                                            skipAnimations = !animationsEnabled || documentHidden || disabledElementsLookup.get(node),
                                            existingAnimation = !skipAnimations && activeAnimationsLookup.get(node) || {},
                                            hasExistingAnimation = !!existingAnimation.state;
                                        if (skipAnimations || hasExistingAnimation && existingAnimation.state === PRE_DIGEST_STATE || (skipAnimations = !areAnimationsAllowed(node, parentNode, event)), skipAnimations) return documentHidden && notifyProgress(runner, event, "start"), close(), documentHidden && notifyProgress(runner, event, "close"), runner;
                                        isStructural && closeChildAnimations(node);
                                        var newAnimation = {
                                            structural: isStructural,
                                            element: element,
                                            event: event,
                                            addClass: options.addClass,
                                            removeClass: options.removeClass,
                                            close: close,
                                            options: options,
                                            runner: runner
                                        };
                                        if (hasExistingAnimation) {
                                            var skipAnimationFlag = isAllowed("skip", newAnimation, existingAnimation);
                                            if (skipAnimationFlag) return existingAnimation.state === RUNNING_STATE ? (close(), runner) : (mergeAnimationDetails(element, existingAnimation, newAnimation), existingAnimation.runner);
                                            var cancelAnimationFlag = isAllowed("cancel", newAnimation, existingAnimation);
                                            if (cancelAnimationFlag)
                                                if (existingAnimation.state === RUNNING_STATE) existingAnimation.runner.end();
                                                else {
                                                    if (!existingAnimation.structural) return mergeAnimationDetails(element, existingAnimation, newAnimation), existingAnimation.runner;
                                                    existingAnimation.close()
                                                }
                                            else {
                                                var joinAnimationFlag = isAllowed("join", newAnimation, existingAnimation);
                                                if (joinAnimationFlag) {
                                                    if (existingAnimation.state !== RUNNING_STATE) return applyGeneratedPreparationClasses(element, isStructural ? event : null, options), event = newAnimation.event = existingAnimation.event, options = mergeAnimationDetails(element, existingAnimation, newAnimation), existingAnimation.runner;
                                                    normalizeAnimationDetails(element, newAnimation)
                                                }
                                            }
                                        } else normalizeAnimationDetails(element, newAnimation);
                                        var isValidAnimation = newAnimation.structural;
                                        if (isValidAnimation || (isValidAnimation = "animate" === newAnimation.event && Object.keys(newAnimation.options.to || {}).length > 0 || hasAnimationClasses(newAnimation)), !isValidAnimation) return close(), clearElementAnimationState(node), runner;
                                        var counter = (existingAnimation.counter || 0) + 1;
                                        return newAnimation.counter = counter, markElementAnimationState(node, PRE_DIGEST_STATE, newAnimation), $rootScope.$$postDigest(function () {
                                            element = stripCommentsFromElement(originalElement);
                                            var animationDetails = activeAnimationsLookup.get(node),
                                                animationCancelled = !animationDetails;
                                            animationDetails = animationDetails || {};
                                            var parentElement = element.parent() || [],
                                                isValidAnimation = parentElement.length > 0 && ("animate" === animationDetails.event || animationDetails.structural || hasAnimationClasses(animationDetails));
                                            if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) return animationCancelled && (applyAnimationClasses(element, options), applyAnimationStyles(element, options)), (animationCancelled || isStructural && animationDetails.event !== event) && (options.domOperation(), runner.end()), void(isValidAnimation || clearElementAnimationState(node));
                                            event = !animationDetails.structural && hasAnimationClasses(animationDetails, !0) ? "setClass" : animationDetails.event, markElementAnimationState(node, RUNNING_STATE);
                                            var realRunner = $$animation(element, event, animationDetails.options);
                                            runner.setHost(realRunner), notifyProgress(runner, event, "start", {}), realRunner.done(function (status) {
                                                close(!status);
                                                var animationDetails = activeAnimationsLookup.get(node);
                                                animationDetails && animationDetails.counter === counter && clearElementAnimationState(node), notifyProgress(runner, event, "close", {})
                                            })
                                        }), runner
                                    }

                                    function closeChildAnimations(node) {
                                        var children = node.querySelectorAll("[" + NG_ANIMATE_ATTR_NAME + "]");
                                        forEach(children, function (child) {
                                            var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME), 10),
                                                animationDetails = activeAnimationsLookup.get(child);
                                            if (animationDetails) switch (state) {
                                                case RUNNING_STATE:
                                                    animationDetails.runner.end();
                                                case PRE_DIGEST_STATE:
                                                    activeAnimationsLookup["delete"](child)
                                            }
                                        })
                                    }

                                    function clearElementAnimationState(node) {
                                        node.removeAttribute(NG_ANIMATE_ATTR_NAME), activeAnimationsLookup["delete"](node)
                                    }

                                    function areAnimationsAllowed(node, parentNode, event) {
                                        var animateChildren, bodyNode = $document[0].body,
                                            rootNode = getDomNode($rootElement),
                                            bodyNodeDetected = node === bodyNode || "HTML" === node.nodeName,
                                            rootNodeDetected = node === rootNode,
                                            parentAnimationDetected = !1,
                                            elementDisabled = disabledElementsLookup.get(node),
                                            parentHost = jqLite.data(node, NG_ANIMATE_PIN_DATA);
                                        for (parentHost && (parentNode = getDomNode(parentHost)); parentNode && (rootNodeDetected || (rootNodeDetected = parentNode === rootNode), parentNode.nodeType === ELEMENT_NODE);) {
                                            var details = activeAnimationsLookup.get(parentNode) || {};
                                            if (!parentAnimationDetected) {
                                                var parentNodeDisabled = disabledElementsLookup.get(parentNode);
                                                if (parentNodeDisabled === !0 && elementDisabled !== !1) {
                                                    elementDisabled = !0;
                                                    break
                                                }
                                                parentNodeDisabled === !1 && (elementDisabled = !1), parentAnimationDetected = details.structural
                                            }
                                            if (isUndefined(animateChildren) || animateChildren === !0) {
                                                var value = jqLite.data(parentNode, NG_ANIMATE_CHILDREN_DATA);
                                                isDefined(value) && (animateChildren = value)
                                            }
                                            if (parentAnimationDetected && animateChildren === !1) break;
                                            if (bodyNodeDetected || (bodyNodeDetected = parentNode === bodyNode), bodyNodeDetected && rootNodeDetected) break;
                                            parentNode = rootNodeDetected || !(parentHost = jqLite.data(parentNode, NG_ANIMATE_PIN_DATA)) ? parentNode.parentNode : getDomNode(parentHost)
                                        }
                                        var allowAnimation = (!parentAnimationDetected || animateChildren) && elementDisabled !== !0;
                                        return allowAnimation && rootNodeDetected && bodyNodeDetected
                                    }

                                    function markElementAnimationState(node, state, details) {
                                        details = details || {}, details.state = state, node.setAttribute(NG_ANIMATE_ATTR_NAME, state);
                                        var oldValue = activeAnimationsLookup.get(node),
                                            newValue = oldValue ? extend(oldValue, details) : details;
                                        activeAnimationsLookup.set(node, newValue)
                                    }
                                    var activeAnimationsLookup = new $$Map,
                                        disabledElementsLookup = new $$Map,
                                        animationsEnabled = null,
                                        deregisterWatch = $rootScope.$watch(function () {
                                            return 0 === $templateRequest.totalPendingRequests
                                        }, function (isEmpty) {
                                            isEmpty && (deregisterWatch(), $rootScope.$$postDigest(function () {
                                                $rootScope.$$postDigest(function () {
                                                    null === animationsEnabled && (animationsEnabled = !0)
                                                })
                                            }))
                                        }),
                                        callbackRegistry = Object.create(null),
                                        classNameFilter = $animateProvider.classNameFilter(),
                                        isAnimatableClassName = classNameFilter ? function (className) {
                                            return classNameFilter.test(className)
                                        } : function () {
                                            return !0
                                        },
                                        applyAnimationClasses = applyAnimationClassesFactory($$jqLite),
                                        contains = window.Node.prototype.contains || function (arg) {
                                            return this === arg || !!(16 & this.compareDocumentPosition(arg))
                                        },
                                        $animate = {
                                            on: function (event, container, callback) {
                                                var node = extractElementNode(container);
                                                callbackRegistry[event] = callbackRegistry[event] || [], callbackRegistry[event].push({
                                                    node: node,
                                                    callback: callback
                                                }), jqLite(container).on("$destroy", function () {
                                                    var animationDetails = activeAnimationsLookup.get(node);
                                                    animationDetails || $animate.off(event, container, callback)
                                                })
                                            },
                                            off: function (event, container, callback) {
                                                if (1 !== arguments.length || isString(arguments[0])) {
                                                    var entries = callbackRegistry[event];
                                                    entries && (callbackRegistry[event] = 1 === arguments.length ? null : filterFromRegistry(entries, container, callback))
                                                } else {
                                                    container = arguments[0];
                                                    for (var eventType in callbackRegistry) callbackRegistry[eventType] = filterFromRegistry(callbackRegistry[eventType], container)
                                                }
                                            },
                                            pin: function (element, parentElement) {
                                                assertArg(isElement(element), "element", "not an element"), assertArg(isElement(parentElement), "parentElement", "not an element"), element.data(NG_ANIMATE_PIN_DATA, parentElement)
                                            },
                                            push: function (element, event, options, domOperation) {
                                                return options = options || {}, options.domOperation = domOperation, queueAnimation(element, event, options)
                                            },
                                            enabled: function (element, bool) {
                                                var argCount = arguments.length;
                                                if (0 === argCount) bool = !!animationsEnabled;
                                                else {
                                                    var hasElement = isElement(element);
                                                    if (hasElement) {
                                                        var node = getDomNode(element);
                                                        1 === argCount ? bool = !disabledElementsLookup.get(node) : disabledElementsLookup.set(node, !bool)
                                                    } else bool = animationsEnabled = !!element
                                                }
                                                return bool
                                            }
                                        };
                                    return $animate
                                }]
                            }],
                            $$AnimationProvider = ["$animateProvider", function ($animateProvider) {
                                function setRunner(element, runner) {
                                    element.data(RUNNER_STORAGE_KEY, runner)
                                }

                                function removeRunner(element) {
                                    element.removeData(RUNNER_STORAGE_KEY)
                                }

                                function getRunner(element) {
                                    return element.data(RUNNER_STORAGE_KEY)
                                }
                                var NG_ANIMATE_REF_ATTR = "ng-animate-ref",
                                    drivers = this.drivers = [],
                                    RUNNER_STORAGE_KEY = "$$animationRunner";
                                this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$Map", "$$rAFScheduler", function ($$jqLite, $rootScope, $injector, $$AnimateRunner, $$Map, $$rAFScheduler) {
                                    function sortAnimations(animations) {
                                        function processNode(entry) {
                                            if (entry.processed) return entry;
                                            entry.processed = !0;
                                            var elementNode = entry.domNode,
                                                parentNode = elementNode.parentNode;
                                            lookup.set(elementNode, entry);
                                            for (var parentEntry; parentNode;) {
                                                if (parentEntry = lookup.get(parentNode)) {
                                                    parentEntry.processed || (parentEntry = processNode(parentEntry));
                                                    break
                                                }
                                                parentNode = parentNode.parentNode
                                            }
                                            return (parentEntry || tree).children.push(entry), entry
                                        }

                                        function flatten(tree) {
                                            var i, result = [],
                                                queue = [];
                                            for (i = 0; i < tree.children.length; i++) queue.push(tree.children[i]);
                                            var remainingLevelEntries = queue.length,
                                                nextLevelEntries = 0,
                                                row = [];
                                            for (i = 0; i < queue.length; i++) {
                                                var entry = queue[i];
                                                remainingLevelEntries <= 0 && (remainingLevelEntries = nextLevelEntries, nextLevelEntries = 0, result.push(row), row = []), row.push(entry.fn), entry.children.forEach(function (childEntry) {
                                                    nextLevelEntries++, queue.push(childEntry)
                                                }), remainingLevelEntries--
                                            }
                                            return row.length && result.push(row), result
                                        }
                                        var i, tree = {
                                                children: []
                                            },
                                            lookup = new $$Map;
                                        for (i = 0; i < animations.length; i++) {
                                            var animation = animations[i];
                                            lookup.set(animation.domNode, animations[i] = {
                                                domNode: animation.domNode,
                                                fn: animation.fn,
                                                children: []
                                            })
                                        }
                                        for (i = 0; i < animations.length; i++) processNode(animations[i]);
                                        return flatten(tree)
                                    }
                                    var animationQueue = [],
                                        applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
                                    return function (element, event, options) {
                                        function getAnchorNodes(node) {
                                            var SELECTOR = "[" + NG_ANIMATE_REF_ATTR + "]",
                                                items = node.hasAttribute(NG_ANIMATE_REF_ATTR) ? [node] : node.querySelectorAll(SELECTOR),
                                                anchors = [];
                                            return forEach(items, function (node) {
                                                var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
                                                attr && attr.length && anchors.push(node)
                                            }), anchors
                                        }

                                        function groupAnimations(animations) {
                                            var preparedAnimations = [],
                                                refLookup = {};
                                            forEach(animations, function (animation, index) {
                                                var element = animation.element,
                                                    node = getDomNode(element),
                                                    event = animation.event,
                                                    enterOrMove = ["enter", "move"].indexOf(event) >= 0,
                                                    anchorNodes = animation.structural ? getAnchorNodes(node) : [];
                                                if (anchorNodes.length) {
                                                    var direction = enterOrMove ? "to" : "from";
                                                    forEach(anchorNodes, function (anchor) {
                                                        var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
                                                        refLookup[key] = refLookup[key] || {}, refLookup[key][direction] = {
                                                            animationID: index,
                                                            element: jqLite(anchor)
                                                        }
                                                    })
                                                } else preparedAnimations.push(animation)
                                            });
                                            var usedIndicesLookup = {},
                                                anchorGroups = {};
                                            return forEach(refLookup, function (operations, key) {
                                                var from = operations.from,
                                                    to = operations.to;
                                                if (!from || !to) {
                                                    var index = from ? from.animationID : to.animationID,
                                                        indexKey = index.toString();
                                                    return void(usedIndicesLookup[indexKey] || (usedIndicesLookup[indexKey] = !0, preparedAnimations.push(animations[index])))
                                                }
                                                var fromAnimation = animations[from.animationID],
                                                    toAnimation = animations[to.animationID],
                                                    lookupKey = from.animationID.toString();
                                                if (!anchorGroups[lookupKey]) {
                                                    var group = anchorGroups[lookupKey] = {
                                                        structural: !0,
                                                        beforeStart: function () {
                                                            fromAnimation.beforeStart(), toAnimation.beforeStart()
                                                        },
                                                        close: function () {
                                                            fromAnimation.close(), toAnimation.close()
                                                        },
                                                        classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
                                                        from: fromAnimation,
                                                        to: toAnimation,
                                                        anchors: []
                                                    };
                                                    group.classes.length ? preparedAnimations.push(group) : (preparedAnimations.push(fromAnimation), preparedAnimations.push(toAnimation))
                                                }
                                                anchorGroups[lookupKey].anchors.push({
                                                    out: from.element,
                                                    "in": to.element
                                                })
                                            }), preparedAnimations
                                        }

                                        function cssClassesIntersection(a, b) {
                                            a = a.split(" "), b = b.split(" ");
                                            for (var matches = [], i = 0; i < a.length; i++) {
                                                var aa = a[i];
                                                if ("ng-" !== aa.substring(0, 3))
                                                    for (var j = 0; j < b.length; j++)
                                                        if (aa === b[j]) {
                                                            matches.push(aa);
                                                            break
                                                        }
                                            }
                                            return matches.join(" ")
                                        }

                                        function invokeFirstDriver(animationDetails) {
                                            for (var i = drivers.length - 1; i >= 0; i--) {
                                                var driverName = drivers[i],
                                                    factory = $injector.get(driverName),
                                                    driver = factory(animationDetails);
                                                if (driver) return driver
                                            }
                                        }

                                        function beforeStart() {
                                            element.addClass(NG_ANIMATE_CLASSNAME), tempClasses && $$jqLite.addClass(element, tempClasses), prepareClassName && ($$jqLite.removeClass(element, prepareClassName), prepareClassName = null)
                                        }

                                        function updateAnimationRunners(animation, newRunner) {
                                            function update(element) {
                                                var runner = getRunner(element);
                                                runner && runner.setHost(newRunner)
                                            }
                                            animation.from && animation.to ? (update(animation.from.element), update(animation.to.element)) : update(animation.element)
                                        }

                                        function handleDestroyedElement() {
                                            var runner = getRunner(element);
                                            !runner || "leave" === event && options.$$domOperationFired || runner.end()
                                        }

                                        function close(rejected) {
                                            element.off("$destroy", handleDestroyedElement), removeRunner(element), applyAnimationClasses(element, options), applyAnimationStyles(element, options), options.domOperation(), tempClasses && $$jqLite.removeClass(element, tempClasses), element.removeClass(NG_ANIMATE_CLASSNAME), runner.complete(!rejected)
                                        }
                                        options = prepareAnimationOptions(options);
                                        var isStructural = ["enter", "move", "leave"].indexOf(event) >= 0,
                                            runner = new $$AnimateRunner({
                                                end: function () {
                                                    close()
                                                },
                                                cancel: function () {
                                                    close(!0)
                                                }
                                            });
                                        if (!drivers.length) return close(), runner;
                                        setRunner(element, runner);
                                        var classes = mergeClasses(element.attr("class"), mergeClasses(options.addClass, options.removeClass)),
                                            tempClasses = options.tempClasses;
                                        tempClasses && (classes += " " + tempClasses, options.tempClasses = null);
                                        var prepareClassName;
                                        return isStructural && (prepareClassName = "ng-" + event + PREPARE_CLASS_SUFFIX, $$jqLite.addClass(element, prepareClassName)), animationQueue.push({
                                            element: element,
                                            classes: classes,
                                            event: event,
                                            structural: isStructural,
                                            options: options,
                                            beforeStart: beforeStart,
                                            close: close
                                        }), element.on("$destroy", handleDestroyedElement), animationQueue.length > 1 ? runner : ($rootScope.$$postDigest(function () {
                                            var animations = [];
                                            forEach(animationQueue, function (entry) {
                                                getRunner(entry.element) ? animations.push(entry) : entry.close()
                                            }), animationQueue.length = 0;
                                            var groupedAnimations = groupAnimations(animations),
                                                toBeSortedAnimations = [];
                                            forEach(groupedAnimations, function (animationEntry) {
                                                toBeSortedAnimations.push({
                                                    domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
                                                    fn: function () {
                                                        animationEntry.beforeStart();
                                                        var startAnimationFn, closeFn = animationEntry.close,
                                                            targetElement = animationEntry.anchors ? animationEntry.from.element || animationEntry.to.element : animationEntry.element;
                                                        if (getRunner(targetElement)) {
                                                            var operation = invokeFirstDriver(animationEntry);
                                                            operation && (startAnimationFn = operation.start)
                                                        }
                                                        if (startAnimationFn) {
                                                            var animationRunner = startAnimationFn();
                                                            animationRunner.done(function (status) {
                                                                closeFn(!status)
                                                            }), updateAnimationRunners(animationEntry, animationRunner)
                                                        } else closeFn()
                                                    }
                                                })
                                            }), $$rAFScheduler(sortAnimations(toBeSortedAnimations))
                                        }), runner)
                                    }
                                }]
                            }],
                            ngAnimateSwapDirective = ["$animate", "$rootScope", function ($animate, $rootScope) {
                                return {
                                    restrict: "A",
                                    transclude: "element",
                                    terminal: !0,
                                    priority: 600,
                                    link: function (scope, $element, attrs, ctrl, $transclude) {
                                        var previousElement, previousScope;
                                        scope.$watchCollection(attrs.ngAnimateSwap || attrs["for"], function (value) {
                                            previousElement && $animate.leave(previousElement), previousScope && (previousScope.$destroy(), previousScope = null), (value || 0 === value) && (previousScope = scope.$new(), $transclude(previousScope, function (element) {
                                                previousElement = element, $animate.enter(element, null, $element)
                                            }))
                                        })
                                    }
                                }
                            }];
                        angular.module("ngAnimate", [], function () {
                            noop = angular.noop, copy = angular.copy, extend = angular.extend, jqLite = angular.element, forEach = angular.forEach, isArray = angular.isArray, isString = angular.isString, isObject = angular.isObject, isUndefined = angular.isUndefined, isDefined = angular.isDefined, isFunction = angular.isFunction, isElement = angular.isElement
                        }).directive("ngAnimateSwap", ngAnimateSwapDirective).directive("ngAnimateChildren", $$AnimateChildrenDirective).factory("$$rAFScheduler", $$rAFSchedulerFactory).provider("$$animateQueue", $$AnimateQueueProvider).provider("$$animation", $$AnimationProvider).provider("$animateCss", $AnimateCssProvider).provider("$$animateCssDriver", $$AnimateCssDriverProvider).provider("$$animateJs", $$AnimateJsProvider).provider("$$animateJsDriver", $$AnimateJsDriverProvider)
                    }(window, window.angular)
                }, {}],
                24: [function (require, module, exports) {
                    require("./angular-animate"), module.exports = "ngAnimate"
                }, {
                    "./angular-animate": 23
                }],
                25: [function (require, module, exports) {
                    ! function (window) {
                        "use strict";

                        function minErr(module, ErrorConstructor) {
                            return ErrorConstructor = ErrorConstructor || Error,
                                function () {
                                    var paramPrefix, i, SKIP_INDEXES = 2,
                                        templateArgs = arguments,
                                        code = templateArgs[0],
                                        message = "[" + (module ? module + ":" : "") + code + "] ",
                                        template = templateArgs[1];
                                    for (message += template.replace(/\{\d+\}/g, function (match) {
                                            var index = +match.slice(1, -1),
                                                shiftedIndex = index + SKIP_INDEXES;
                                            return shiftedIndex < templateArgs.length ? toDebugString(templateArgs[shiftedIndex]) : match
                                        }), message += "\nhttp://errors.angularjs.org/1.6.2/" + (module ? module + "/" : "") + code, i = SKIP_INDEXES, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&") message += paramPrefix + "p" + (i - SKIP_INDEXES) + "=" + encodeURIComponent(toDebugString(templateArgs[i]));
                                    return new ErrorConstructor(message)
                                }
                        }

                        function isArrayLike(obj) {
                            if (null == obj || isWindow(obj)) return !1;
                            if (isArray(obj) || isString(obj) || jqLite && obj instanceof jqLite) return !0;
                            var length = "length" in Object(obj) && obj.length;
                            return isNumber(length) && (length >= 0 && (length - 1 in obj || obj instanceof Array) || "function" == typeof obj.item)
                        }

                        function forEach(obj, iterator, context) {
                            var key, length;
                            if (obj)
                                if (isFunction(obj))
                                    for (key in obj) "prototype" !== key && "length" !== key && "name" !== key && obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj);
                                else if (isArray(obj) || isArrayLike(obj)) {
                                var isPrimitive = "object" != typeof obj;
                                for (key = 0, length = obj.length; key < length; key++)(isPrimitive || key in obj) && iterator.call(context, obj[key], key, obj)
                            } else if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context, obj);
                            else if (isBlankObject(obj))
                                for (key in obj) iterator.call(context, obj[key], key, obj);
                            else if ("function" == typeof obj.hasOwnProperty)
                                for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj);
                            else
                                for (key in obj) hasOwnProperty.call(obj, key) && iterator.call(context, obj[key], key, obj);
                            return obj
                        }

                        function forEachSorted(obj, iterator, context) {
                            for (var keys = Object.keys(obj).sort(), i = 0; i < keys.length; i++) iterator.call(context, obj[keys[i]], keys[i]);
                            return keys
                        }

                        function reverseParams(iteratorFn) {
                            return function (value, key) {
                                iteratorFn(key, value)
                            }
                        }

                        function nextUid() {
                            return ++uid
                        }

                        function setHashKey(obj, h) {
                            h ? obj.$$hashKey = h : delete obj.$$hashKey
                        }

                        function baseExtend(dst, objs, deep) {
                            for (var h = dst.$$hashKey, i = 0, ii = objs.length; i < ii; ++i) {
                                var obj = objs[i];
                                if (isObject(obj) || isFunction(obj))
                                    for (var keys = Object.keys(obj), j = 0, jj = keys.length; j < jj; j++) {
                                        var key = keys[j],
                                            src = obj[key];
                                        deep && isObject(src) ? isDate(src) ? dst[key] = new Date(src.valueOf()) : isRegExp(src) ? dst[key] = new RegExp(src) : src.nodeName ? dst[key] = src.cloneNode(!0) : isElement(src) ? dst[key] = src.clone() : (isObject(dst[key]) || (dst[key] = isArray(src) ? [] : {}), baseExtend(dst[key], [src], !0)) : dst[key] = src
                                    }
                            }
                            return setHashKey(dst, h), dst
                        }

                        function extend(dst) {
                            return baseExtend(dst, slice.call(arguments, 1), !1)
                        }

                        function merge(dst) {
                            return baseExtend(dst, slice.call(arguments, 1), !0)
                        }

                        function toInt(str) {
                            return parseInt(str, 10)
                        }

                        function inherit(parent, extra) {
                            return extend(Object.create(parent), extra)
                        }

                        function noop() {}

                        function identity($) {
                            return $
                        }

                        function valueFn(value) {
                            return function () {
                                return value
                            }
                        }

                        function hasCustomToString(obj) {
                            return isFunction(obj.toString) && obj.toString !== toString
                        }

                        function isUndefined(value) {
                            return "undefined" == typeof value
                        }

                        function isDefined(value) {
                            return "undefined" != typeof value
                        }

                        function isObject(value) {
                            return null !== value && "object" == typeof value
                        }

                        function isBlankObject(value) {
                            return null !== value && "object" == typeof value && !getPrototypeOf(value)
                        }

                        function isString(value) {
                            return "string" == typeof value
                        }

                        function isNumber(value) {
                            return "number" == typeof value
                        }

                        function isDate(value) {
                            return "[object Date]" === toString.call(value)
                        }

                        function isFunction(value) {
                            return "function" == typeof value
                        }

                        function isRegExp(value) {
                            return "[object RegExp]" === toString.call(value)
                        }

                        function isWindow(obj) {
                            return obj && obj.window === obj
                        }

                        function isScope(obj) {
                            return obj && obj.$evalAsync && obj.$watch
                        }

                        function isFile(obj) {
                            return "[object File]" === toString.call(obj)
                        }

                        function isFormData(obj) {
                            return "[object FormData]" === toString.call(obj)
                        }

                        function isBlob(obj) {
                            return "[object Blob]" === toString.call(obj)
                        }

                        function isBoolean(value) {
                            return "boolean" == typeof value
                        }

                        function isPromiseLike(obj) {
                            return obj && isFunction(obj.then)
                        }

                        function isTypedArray(value) {
                            return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value))
                        }

                        function isArrayBuffer(obj) {
                            return "[object ArrayBuffer]" === toString.call(obj)
                        }

                        function isElement(node) {
                            return !(!node || !(node.nodeName || node.prop && node.attr && node.find))
                        }

                        function makeMap(str) {
                            var i, obj = {},
                                items = str.split(",");
                            for (i = 0; i < items.length; i++) obj[items[i]] = !0;
                            return obj
                        }

                        function nodeName_(element) {
                            return lowercase(element.nodeName || element[0] && element[0].nodeName)
                        }

                        function includes(array, obj) {
                            return Array.prototype.indexOf.call(array, obj) !== -1
                        }

                        function arrayRemove(array, value) {
                            var index = array.indexOf(value);
                            return index >= 0 && array.splice(index, 1), index
                        }

                        function copy(source, destination) {
                            function copyRecurse(source, destination) {
                                var key, h = destination.$$hashKey;
                                if (isArray(source))
                                    for (var i = 0, ii = source.length; i < ii; i++) destination.push(copyElement(source[i]));
                                else if (isBlankObject(source))
                                    for (key in source) destination[key] = copyElement(source[key]);
                                else if (source && "function" == typeof source.hasOwnProperty)
                                    for (key in source) source.hasOwnProperty(key) && (destination[key] = copyElement(source[key]));
                                else
                                    for (key in source) hasOwnProperty.call(source, key) && (destination[key] = copyElement(source[key]));
                                return setHashKey(destination, h), destination
                            }

                            function copyElement(source) {
                                if (!isObject(source)) return source;
                                var index = stackSource.indexOf(source);
                                if (index !== -1) return stackDest[index];
                                if (isWindow(source) || isScope(source)) throw ngMinErr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
                                var needsRecurse = !1,
                                    destination = copyType(source);
                                return void 0 === destination && (destination = isArray(source) ? [] : Object.create(getPrototypeOf(source)), needsRecurse = !0), stackSource.push(source), stackDest.push(destination), needsRecurse ? copyRecurse(source, destination) : destination
                            }

                            function copyType(source) {
                                switch (toString.call(source)) {
                                    case "[object Int8Array]":
                                    case "[object Int16Array]":
                                    case "[object Int32Array]":
                                    case "[object Float32Array]":
                                    case "[object Float64Array]":
                                    case "[object Uint8Array]":
                                    case "[object Uint8ClampedArray]":
                                    case "[object Uint16Array]":
                                    case "[object Uint32Array]":
                                        return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);
                                    case "[object ArrayBuffer]":
                                        if (!source.slice) {
                                            var copied = new ArrayBuffer(source.byteLength);
                                            return new Uint8Array(copied).set(new Uint8Array(source)), copied
                                        }
                                        return source.slice(0);
                                    case "[object Boolean]":
                                    case "[object Number]":
                                    case "[object String]":
                                    case "[object Date]":
                                        return new source.constructor(source.valueOf());
                                    case "[object RegExp]":
                                        var re = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                                        return re.lastIndex = source.lastIndex, re;
                                    case "[object Blob]":
                                        return new source.constructor([source], {
                                            type: source.type
                                        })
                                }
                                if (isFunction(source.cloneNode)) return source.cloneNode(!0)
                            }
                            var stackSource = [],
                                stackDest = [];
                            if (destination) {
                                if (isTypedArray(destination) || isArrayBuffer(destination)) throw ngMinErr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
                                if (source === destination) throw ngMinErr("cpi", "Can't copy! Source and destination are identical.");
                                return isArray(destination) ? destination.length = 0 : forEach(destination, function (value, key) {
                                    "$$hashKey" !== key && delete destination[key]
                                }), stackSource.push(source), stackDest.push(destination), copyRecurse(source, destination)
                            }
                            return copyElement(source)
                        }

                        function equals(o1, o2) {
                            if (o1 === o2) return !0;
                            if (null === o1 || null === o2) return !1;
                            if (o1 !== o1 && o2 !== o2) return !0;
                            var length, key, keySet, t1 = typeof o1,
                                t2 = typeof o2;
                            if (t1 === t2 && "object" === t1) {
                                if (!isArray(o1)) {
                                    if (isDate(o1)) return !!isDate(o2) && equals(o1.getTime(), o2.getTime());
                                    if (isRegExp(o1)) return !!isRegExp(o2) && o1.toString() === o2.toString();
                                    if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2) || isDate(o2) || isRegExp(o2)) return !1;
                                    keySet = createMap();
                                    for (key in o1)
                                        if ("$" !== key.charAt(0) && !isFunction(o1[key])) {
                                            if (!equals(o1[key], o2[key])) return !1;
                                            keySet[key] = !0
                                        } for (key in o2)
                                        if (!(key in keySet) && "$" !== key.charAt(0) && isDefined(o2[key]) && !isFunction(o2[key])) return !1;
                                    return !0
                                }
                                if (!isArray(o2)) return !1;
                                if ((length = o1.length) === o2.length) {
                                    for (key = 0; key < length; key++)
                                        if (!equals(o1[key], o2[key])) return !1;
                                    return !0
                                }
                            }
                            return !1
                        }

                        function concat(array1, array2, index) {
                            return array1.concat(slice.call(array2, index))
                        }

                        function sliceArgs(args, startIndex) {
                            return slice.call(args, startIndex || 0)
                        }

                        function bind(self, fn) {
                            var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
                            return !isFunction(fn) || fn instanceof RegExp ? fn : curryArgs.length ? function () {
                                return arguments.length ? fn.apply(self, concat(curryArgs, arguments, 0)) : fn.apply(self, curryArgs)
                            } : function () {
                                return arguments.length ? fn.apply(self, arguments) : fn.call(self)
                            }
                        }

                        function toJsonReplacer(key, value) {
                            var val = value;
                            return "string" == typeof key && "$" === key.charAt(0) && "$" === key.charAt(1) ? val = void 0 : isWindow(value) ? val = "$WINDOW" : value && window.document === value ? val = "$DOCUMENT" : isScope(value) && (val = "$SCOPE"), val
                        }

                        function toJson(obj, pretty) {
                            if (!isUndefined(obj)) return isNumber(pretty) || (pretty = pretty ? 2 : null), JSON.stringify(obj, toJsonReplacer, pretty)
                        }

                        function fromJson(json) {
                            return isString(json) ? JSON.parse(json) : json
                        }

                        function timezoneToOffset(timezone, fallback) {
                            timezone = timezone.replace(ALL_COLONS, "");
                            var requestedTimezoneOffset = Date.parse("Jan 01, 1970 00:00:00 " + timezone) / 6e4;
                            return isNumberNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset
                        }

                        function addDateMinutes(date, minutes) {
                            return date = new Date(date.getTime()), date.setMinutes(date.getMinutes() + minutes), date
                        }

                        function convertTimezoneToLocal(date, timezone, reverse) {
                            reverse = reverse ? -1 : 1;
                            var dateTimezoneOffset = date.getTimezoneOffset(),
                                timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
                            return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset))
                        }

                        function startingTag(element) {
                            element = jqLite(element).clone();
                            try {
                                element.empty()
                            } catch (e) {}
                            var elemHtml = jqLite("<div>").append(element).html();
                            try {
                                return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function (match, nodeName) {
                                    return "<" + lowercase(nodeName)
                                })
                            } catch (e) {
                                return lowercase(elemHtml)
                            }
                        }

                        function tryDecodeURIComponent(value) {
                            try {
                                return decodeURIComponent(value)
                            } catch (e) {}
                        }

                        function parseKeyValue(keyValue) {
                            var obj = {};
                            return forEach((keyValue || "").split("&"), function (keyValue) {
                                var splitPoint, key, val;
                                keyValue && (key = keyValue = keyValue.replace(/\+/g, "%20"), splitPoint = keyValue.indexOf("="), splitPoint !== -1 && (key = keyValue.substring(0, splitPoint), val = keyValue.substring(splitPoint + 1)), key = tryDecodeURIComponent(key), isDefined(key) && (val = !isDefined(val) || tryDecodeURIComponent(val), hasOwnProperty.call(obj, key) ? isArray(obj[key]) ? obj[key].push(val) : obj[key] = [obj[key], val] : obj[key] = val))
                            }), obj
                        }

                        function toKeyValue(obj) {
                            var parts = [];
                            return forEach(obj, function (value, key) {
                                isArray(value) ? forEach(value, function (arrayValue) {
                                    parts.push(encodeUriQuery(key, !0) + (arrayValue === !0 ? "" : "=" + encodeUriQuery(arrayValue, !0)))
                                }) : parts.push(encodeUriQuery(key, !0) + (value === !0 ? "" : "=" + encodeUriQuery(value, !0)))
                            }), parts.length ? parts.join("&") : ""
                        }

                        function encodeUriSegment(val) {
                            return encodeUriQuery(val, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
                        }

                        function encodeUriQuery(val, pctEncodeSpaces) {
                            return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+")
                        }

                        function getNgAttribute(element, ngAttr) {
                            var attr, i, ii = ngAttrPrefixes.length;
                            for (i = 0; i < ii; ++i)
                                if (attr = ngAttrPrefixes[i] + ngAttr, isString(attr = element.getAttribute(attr))) return attr;
                            return null
                        }

                        function allowAutoBootstrap(document) {
                            var script = document.currentScript,
                                src = script && script.getAttribute("src");
                            if (!src) return !0;
                            var link = document.createElement("a");
                            if (link.href = src, document.location.origin === link.origin) return !0;
                            switch (link.protocol) {
                                case "http:":
                                case "https:":
                                case "ftp:":
                                case "blob:":
                                case "file:":
                                case "data:":
                                    return !0;
                                default:
                                    return !1
                            }
                        }

                        function angularInit(element, bootstrap) {
                            var appElement, module, config = {};
                            if (forEach(ngAttrPrefixes, function (prefix) {
                                    var name = prefix + "app";
                                    !appElement && element.hasAttribute && element.hasAttribute(name) && (appElement = element, module = element.getAttribute(name))
                                }), forEach(ngAttrPrefixes, function (prefix) {
                                    var candidate, name = prefix + "app";
                                    !appElement && (candidate = element.querySelector("[" + name.replace(":", "\\:") + "]")) && (appElement = candidate, module = candidate.getAttribute(name))
                                }), appElement) {
                                if (!isAutoBootstrapAllowed) return void window.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.");
                                config.strictDi = null !== getNgAttribute(appElement, "strict-di"), bootstrap(appElement, module ? [module] : [], config)
                            }
                        }

                        function bootstrap(element, modules, config) {
                            isObject(config) || (config = {});
                            var defaultConfig = {
                                strictDi: !1
                            };
                            config = extend(defaultConfig, config);
                            var doBootstrap = function () {
                                    if (element = jqLite(element), element.injector()) {
                                        var tag = element[0] === window.document ? "document" : startingTag(element);
                                        throw ngMinErr("btstrpd", "App already bootstrapped with this element '{0}'", tag.replace(/</, "&lt;").replace(/>/, "&gt;"))
                                    }
                                    modules = modules || [], modules.unshift(["$provide", function ($provide) {
                                        $provide.value("$rootElement", element)
                                    }]), config.debugInfoEnabled && modules.push(["$compileProvider", function ($compileProvider) {
                                        $compileProvider.debugInfoEnabled(!0)
                                    }]), modules.unshift("ng");
                                    var injector = createInjector(modules, config.strictDi);
                                    return injector.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (scope, element, compile, injector) {
                                        scope.$apply(function () {
                                            element.data("$injector", injector), compile(element)(scope)
                                        })
                                    }]), injector
                                },
                                NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/,
                                NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
                            return window && NG_ENABLE_DEBUG_INFO.test(window.name) && (config.debugInfoEnabled = !0, window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, "")), window && !NG_DEFER_BOOTSTRAP.test(window.name) ? doBootstrap() : (window.name = window.name.replace(NG_DEFER_BOOTSTRAP, ""), angular.resumeBootstrap = function (extraModules) {
                                return forEach(extraModules, function (module) {
                                    modules.push(module)
                                }), doBootstrap()
                            }, void(isFunction(angular.resumeDeferredBootstrap) && angular.resumeDeferredBootstrap()))
                        }

                        function reloadWithDebugInfo() {
                            window.name = "NG_ENABLE_DEBUG_INFO!" + window.name, window.location.reload()
                        }

                        function getTestability(rootElement) {
                            var injector = angular.element(rootElement).injector();
                            if (!injector) throw ngMinErr("test", "no injector found for element argument to getTestability");
                            return injector.get("$$testability")
                        }

                        function snake_case(name, separator) {
                            return separator = separator || "_", name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
                                return (pos ? separator : "") + letter.toLowerCase()
                            })
                        }

                        function bindJQuery() {
                            var originalCleanData;
                            if (!bindJQueryFired) {
                                var jqName = jq();
                                jQuery = isUndefined(jqName) ? window.jQuery : jqName ? window[jqName] : void 0, jQuery && jQuery.fn.on ? (jqLite = jQuery, extend(jQuery.fn, {
                                    scope: JQLitePrototype.scope,
                                    isolateScope: JQLitePrototype.isolateScope,
                                    controller: JQLitePrototype.controller,
                                    injector: JQLitePrototype.injector,
                                    inheritedData: JQLitePrototype.inheritedData
                                }), originalCleanData = jQuery.cleanData, jQuery.cleanData = function (elems) {
                                    for (var events, elem, i = 0; null != (elem = elems[i]); i++) events = jQuery._data(elem, "events"), events && events.$destroy && jQuery(elem).triggerHandler("$destroy");
                                    originalCleanData(elems)
                                }) : jqLite = JQLite, angular.element = jqLite, bindJQueryFired = !0
                            }
                        }

                        function assertArg(arg, name, reason) {
                            if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
                            return arg
                        }

                        function assertArgFn(arg, name, acceptArrayAnnotation) {
                            return acceptArrayAnnotation && isArray(arg) && (arg = arg[arg.length - 1]), assertArg(isFunction(arg), name, "not a function, got " + (arg && "object" == typeof arg ? arg.constructor.name || "Object" : typeof arg)), arg
                        }

                        function assertNotHasOwnProperty(name, context) {
                            if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
                        }

                        function getter(obj, path, bindFnToScope) {
                            if (!path) return obj;
                            for (var key, keys = path.split("."), lastInstance = obj, len = keys.length, i = 0; i < len; i++) key = keys[i], obj && (obj = (lastInstance = obj)[key]);
                            return !bindFnToScope && isFunction(obj) ? bind(lastInstance, obj) : obj
                        }

                        function getBlockNodes(nodes) {
                            for (var blockNodes, node = nodes[0], endNode = nodes[nodes.length - 1], i = 1; node !== endNode && (node = node.nextSibling); i++)(blockNodes || nodes[i] !== node) && (blockNodes || (blockNodes = jqLite(slice.call(nodes, 0, i))), blockNodes.push(node));
                            return blockNodes || nodes
                        }

                        function createMap() {
                            return Object.create(null)
                        }

                        function stringify(value) {
                            if (null == value) return "";
                            switch (typeof value) {
                                case "string":
                                    break;
                                case "number":
                                    value = "" + value;
                                    break;
                                default:
                                    value = !hasCustomToString(value) || isArray(value) || isDate(value) ? toJson(value) : value.toString()
                            }
                            return value
                        }

                        function setupModuleLoader(window) {
                            function ensure(obj, name, factory) {
                                return obj[name] || (obj[name] = factory())
                            }
                            var $injectorMinErr = minErr("$injector"),
                                ngMinErr = minErr("ng"),
                                angular = ensure(window, "angular", Object);
                            return angular.$$minErr = angular.$$minErr || minErr, ensure(angular, "module", function () {
                                var modules = {};
                                return function (name, requires, configFn) {
                                    var assertNotHasOwnProperty = function (name, context) {
                                        if ("hasOwnProperty" === name) throw ngMinErr("badname", "hasOwnProperty is not a valid {0} name", context)
                                    };
                                    return assertNotHasOwnProperty(name, "module"), requires && modules.hasOwnProperty(name) && (modules[name] = null), ensure(modules, name, function () {
                                        function invokeLater(provider, method, insertMethod, queue) {
                                            return queue || (queue = invokeQueue),
                                                function () {
                                                    return queue[insertMethod || "push"]([provider, method, arguments]), moduleInstance
                                                }
                                        }

                                        function invokeLaterAndSetModuleName(provider, method, queue) {
                                            return queue || (queue = invokeQueue),
                                                function (recipeName, factoryFunction) {
                                                    return factoryFunction && isFunction(factoryFunction) && (factoryFunction.$$moduleName = name), queue.push([provider, method, arguments]), moduleInstance
                                                }
                                        }
                                        if (!requires) throw $injectorMinErr("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", name);
                                        var invokeQueue = [],
                                            configBlocks = [],
                                            runBlocks = [],
                                            config = invokeLater("$injector", "invoke", "push", configBlocks),
                                            moduleInstance = {
                                                _invokeQueue: invokeQueue,
                                                _configBlocks: configBlocks,
                                                _runBlocks: runBlocks,
                                                requires: requires,
                                                name: name,
                                                provider: invokeLaterAndSetModuleName("$provide", "provider"),
                                                factory: invokeLaterAndSetModuleName("$provide", "factory"),
                                                service: invokeLaterAndSetModuleName("$provide", "service"),
                                                value: invokeLater("$provide", "value"),
                                                constant: invokeLater("$provide", "constant", "unshift"),
                                                decorator: invokeLaterAndSetModuleName("$provide", "decorator", configBlocks),
                                                animation: invokeLaterAndSetModuleName("$animateProvider", "register"),
                                                filter: invokeLaterAndSetModuleName("$filterProvider", "register"),
                                                controller: invokeLaterAndSetModuleName("$controllerProvider", "register"),
                                                directive: invokeLaterAndSetModuleName("$compileProvider", "directive"),
                                                component: invokeLaterAndSetModuleName("$compileProvider", "component"),
                                                config: config,
                                                run: function (block) {
                                                    return runBlocks.push(block), this
                                                }
                                            };
                                        return configFn && config(configFn), moduleInstance
                                    })
                                }
                            })
                        }

                        function shallowCopy(src, dst) {
                            if (isArray(src)) {
                                dst = dst || [];
                                for (var i = 0, ii = src.length; i < ii; i++) dst[i] = src[i]
                            } else if (isObject(src)) {
                                dst = dst || {};
                                for (var key in src) "$" === key.charAt(0) && "$" === key.charAt(1) || (dst[key] = src[key])
                            }
                            return dst || src
                        }

                        function serializeObject(obj) {
                            var seen = [];
                            return JSON.stringify(obj, function (key, val) {
                                if (val = toJsonReplacer(key, val), isObject(val)) {
                                    if (seen.indexOf(val) >= 0) return "...";
                                    seen.push(val)
                                }
                                return val
                            })
                        }

                        function toDebugString(obj) {
                            return "function" == typeof obj ? obj.toString().replace(/ \{[\s\S]*$/, "") : isUndefined(obj) ? "undefined" : "string" != typeof obj ? serializeObject(obj) : obj
                        }

                        function publishExternalAPI(angular) {
                            extend(angular, {
                                bootstrap: bootstrap,
                                copy: copy,
                                extend: extend,
                                merge: merge,
                                equals: equals,
                                element: jqLite,
                                forEach: forEach,
                                injector: createInjector,
                                noop: noop,
                                bind: bind,
                                toJson: toJson,
                                fromJson: fromJson,
                                identity: identity,
                                isUndefined: isUndefined,
                                isDefined: isDefined,
                                isString: isString,
                                isFunction: isFunction,
                                isObject: isObject,
                                isNumber: isNumber,
                                isElement: isElement,
                                isArray: isArray,
                                version: version,
                                isDate: isDate,
                                lowercase: lowercase,
                                uppercase: uppercase,
                                callbacks: {
                                    $$counter: 0
                                },
                                getTestability: getTestability,
                                reloadWithDebugInfo: reloadWithDebugInfo,
                                $$minErr: minErr,
                                $$csp: csp,
                                $$encodeUriSegment: encodeUriSegment,
                                $$encodeUriQuery: encodeUriQuery,
                                $$stringify: stringify
                            }), (angularModule = setupModuleLoader(window))("ng", ["ngLocale"], ["$provide", function ($provide) {
                                $provide.provider({
                                    $$sanitizeUri: $$SanitizeUriProvider
                                }), $provide.provider("$compile", $CompileProvider).directive({
                                    a: htmlAnchorDirective,
                                    input: inputDirective,
                                    textarea: inputDirective,
                                    form: formDirective,
                                    script: scriptDirective,
                                    select: selectDirective,
                                    option: optionDirective,
                                    ngBind: ngBindDirective,
                                    ngBindHtml: ngBindHtmlDirective,
                                    ngBindTemplate: ngBindTemplateDirective,
                                    ngClass: ngClassDirective,
                                    ngClassEven: ngClassEvenDirective,
                                    ngClassOdd: ngClassOddDirective,
                                    ngCloak: ngCloakDirective,
                                    ngController: ngControllerDirective,
                                    ngForm: ngFormDirective,
                                    ngHide: ngHideDirective,
                                    ngIf: ngIfDirective,
                                    ngInclude: ngIncludeDirective,
                                    ngInit: ngInitDirective,
                                    ngNonBindable: ngNonBindableDirective,
                                    ngPluralize: ngPluralizeDirective,
                                    ngRepeat: ngRepeatDirective,
                                    ngShow: ngShowDirective,
                                    ngStyle: ngStyleDirective,
                                    ngSwitch: ngSwitchDirective,
                                    ngSwitchWhen: ngSwitchWhenDirective,
                                    ngSwitchDefault: ngSwitchDefaultDirective,
                                    ngOptions: ngOptionsDirective,
                                    ngTransclude: ngTranscludeDirective,
                                    ngModel: ngModelDirective,
                                    ngList: ngListDirective,
                                    ngChange: ngChangeDirective,
                                    pattern: patternDirective,
                                    ngPattern: patternDirective,
                                    required: requiredDirective,
                                    ngRequired: requiredDirective,
                                    minlength: minlengthDirective,
                                    ngMinlength: minlengthDirective,
                                    maxlength: maxlengthDirective,
                                    ngMaxlength: maxlengthDirective,
                                    ngValue: ngValueDirective,
                                    ngModelOptions: ngModelOptionsDirective
                                }).directive({
                                    ngInclude: ngIncludeFillContentDirective
                                }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives), $provide.provider({
                                    $anchorScroll: $AnchorScrollProvider,
                                    $animate: $AnimateProvider,
                                    $animateCss: $CoreAnimateCssProvider,
                                    $$animateJs: $$CoreAnimateJsProvider,
                                    $$animateQueue: $$CoreAnimateQueueProvider,
                                    $$AnimateRunner: $$AnimateRunnerFactoryProvider,
                                    $$animateAsyncRun: $$AnimateAsyncRunFactoryProvider,
                                    $browser: $BrowserProvider,
                                    $cacheFactory: $CacheFactoryProvider,
                                    $controller: $ControllerProvider,
                                    $document: $DocumentProvider,
                                    $$isDocumentHidden: $$IsDocumentHiddenProvider,
                                    $exceptionHandler: $ExceptionHandlerProvider,
                                    $filter: $FilterProvider,
                                    $$forceReflow: $$ForceReflowProvider,
                                    $interpolate: $InterpolateProvider,
                                    $interval: $IntervalProvider,
                                    $http: $HttpProvider,
                                    $httpParamSerializer: $HttpParamSerializerProvider,
                                    $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
                                    $httpBackend: $HttpBackendProvider,
                                    $xhrFactory: $xhrFactoryProvider,
                                    $jsonpCallbacks: $jsonpCallbacksProvider,
                                    $location: $LocationProvider,
                                    $log: $LogProvider,
                                    $parse: $ParseProvider,
                                    $rootScope: $RootScopeProvider,
                                    $q: $QProvider,
                                    $$q: $$QProvider,
                                    $sce: $SceProvider,
                                    $sceDelegate: $SceDelegateProvider,
                                    $sniffer: $SnifferProvider,
                                    $templateCache: $TemplateCacheProvider,
                                    $templateRequest: $TemplateRequestProvider,
                                    $$testability: $$TestabilityProvider,
                                    $timeout: $TimeoutProvider,
                                    $window: $WindowProvider,
                                    $$rAF: $$RAFProvider,
                                    $$jqLite: $$jqLiteProvider,
                                    $$Map: $$MapProvider,
                                    $$cookieReader: $$CookieReaderProvider
                                })
                            }])
                        }

                        function jqNextId() {
                            return ++jqId
                        }

                        function cssKebabToCamel(name) {
                            return kebabToCamel(name.replace(MS_HACK_REGEXP, "ms-"))
                        }

                        function fnCamelCaseReplace(all, letter) {
                            return letter.toUpperCase()
                        }

                        function kebabToCamel(name) {
                            return name.replace(DASH_LOWERCASE_REGEXP, fnCamelCaseReplace)
                        }

                        function jqLiteIsTextNode(html) {
                            return !HTML_REGEXP.test(html)
                        }

                        function jqLiteAcceptsData(node) {
                            var nodeType = node.nodeType;
                            return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT
                        }

                        function jqLiteHasData(node) {
                            for (var key in jqCache[node.ng339]) return !0;
                            return !1
                        }

                        function jqLiteCleanData(nodes) {
                            for (var i = 0, ii = nodes.length; i < ii; i++) jqLiteRemoveData(nodes[i])
                        }

                        function jqLiteBuildFragment(html, context) {
                            var tmp, tag, wrap, i, fragment = context.createDocumentFragment(),
                                nodes = [];
                            if (jqLiteIsTextNode(html)) nodes.push(context.createTextNode(html));
                            else {
                                for (tmp = fragment.appendChild(context.createElement("div")), tag = (TAG_NAME_REGEXP.exec(html) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2], i = wrap[0]; i--;) tmp = tmp.lastChild;
                                nodes = concat(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
                            }
                            return fragment.textContent = "", fragment.innerHTML = "", forEach(nodes, function (node) {
                                fragment.appendChild(node)
                            }), fragment
                        }

                        function jqLiteParseHTML(html, context) {
                            context = context || window.document;
                            var parsed;
                            return (parsed = SINGLE_TAG_REGEXP.exec(html)) ? [context.createElement(parsed[1])] : (parsed = jqLiteBuildFragment(html, context)) ? parsed.childNodes : []
                        }

                        function jqLiteWrapNode(node, wrapper) {
                            var parent = node.parentNode;
                            parent && parent.replaceChild(wrapper, node), wrapper.appendChild(node)
                        }

                        function JQLite(element) {
                            if (element instanceof JQLite) return element;
                            var argIsString;
                            if (isString(element) && (element = trim(element), argIsString = !0), !(this instanceof JQLite)) {
                                if (argIsString && "<" !== element.charAt(0)) throw jqLiteMinErr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
                                return new JQLite(element)
                            }
                            argIsString ? jqLiteAddNodes(this, jqLiteParseHTML(element)) : isFunction(element) ? jqLiteReady(element) : jqLiteAddNodes(this, element)
                        }

                        function jqLiteClone(element) {
                            return element.cloneNode(!0)
                        }

                        function jqLiteDealoc(element, onlyDescendants) {
                            if (onlyDescendants || jqLiteRemoveData(element), element.querySelectorAll)
                                for (var descendants = element.querySelectorAll("*"), i = 0, l = descendants.length; i < l; i++) jqLiteRemoveData(descendants[i])
                        }

                        function jqLiteOff(element, type, fn, unsupported) {
                            if (isDefined(unsupported)) throw jqLiteMinErr("offargs", "jqLite#off() does not support the `selector` argument");
                            var expandoStore = jqLiteExpandoStore(element),
                                events = expandoStore && expandoStore.events,
                                handle = expandoStore && expandoStore.handle;
                            if (handle)
                                if (type) {
                                    var removeHandler = function (type) {
                                        var listenerFns = events[type];
                                        isDefined(fn) && arrayRemove(listenerFns || [], fn), isDefined(fn) && listenerFns && listenerFns.length > 0 || (element.removeEventListener(type, handle), delete events[type])
                                    };
                                    forEach(type.split(" "), function (type) {
                                        removeHandler(type), MOUSE_EVENT_MAP[type] && removeHandler(MOUSE_EVENT_MAP[type])
                                    })
                                } else
                                    for (type in events) "$destroy" !== type && element.removeEventListener(type, handle), delete events[type]
                        }

                        function jqLiteRemoveData(element, name) {
                            var expandoId = element.ng339,
                                expandoStore = expandoId && jqCache[expandoId];
                            if (expandoStore) {
                                if (name) return void delete expandoStore.data[name];
                                expandoStore.handle && (expandoStore.events.$destroy && expandoStore.handle({}, "$destroy"), jqLiteOff(element)), delete jqCache[expandoId], element.ng339 = void 0
                            }
                        }

                        function jqLiteExpandoStore(element, createIfNecessary) {
                            var expandoId = element.ng339,
                                expandoStore = expandoId && jqCache[expandoId];
                            return createIfNecessary && !expandoStore && (element.ng339 = expandoId = jqNextId(), expandoStore = jqCache[expandoId] = {
                                events: {},
                                data: {},
                                handle: void 0
                            }), expandoStore
                        }

                        function jqLiteData(element, key, value) {
                            if (jqLiteAcceptsData(element)) {
                                var prop, isSimpleSetter = isDefined(value),
                                    isSimpleGetter = !isSimpleSetter && key && !isObject(key),
                                    massGetter = !key,
                                    expandoStore = jqLiteExpandoStore(element, !isSimpleGetter),
                                    data = expandoStore && expandoStore.data;
                                if (isSimpleSetter) data[kebabToCamel(key)] = value;
                                else {
                                    if (massGetter) return data;
                                    if (isSimpleGetter) return data && data[kebabToCamel(key)];
                                    for (prop in key) data[kebabToCamel(prop)] = key[prop]
                                }
                            }
                        }

                        function jqLiteHasClass(element, selector) {
                            return !!element.getAttribute && (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + selector + " ") > -1
                        }

                        function jqLiteRemoveClass(element, cssClasses) {
                            cssClasses && element.setAttribute && forEach(cssClasses.split(" "), function (cssClass) {
                                element.setAttribute("class", trim((" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + trim(cssClass) + " ", " ")))
                            })
                        }

                        function jqLiteAddClass(element, cssClasses) {
                            if (cssClasses && element.setAttribute) {
                                var existingClasses = (" " + (element.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
                                forEach(cssClasses.split(" "), function (cssClass) {
                                    cssClass = trim(cssClass), existingClasses.indexOf(" " + cssClass + " ") === -1 && (existingClasses += cssClass + " ")
                                }), element.setAttribute("class", trim(existingClasses))
                            }
                        }

                        function jqLiteAddNodes(root, elements) {
                            if (elements)
                                if (elements.nodeType) root[root.length++] = elements;
                                else {
                                    var length = elements.length;
                                    if ("number" == typeof length && elements.window !== elements) {
                                        if (length)
                                            for (var i = 0; i < length; i++) root[root.length++] = elements[i]
                                    } else root[root.length++] = elements
                                }
                        }

                        function jqLiteController(element, name) {
                            return jqLiteInheritedData(element, "$" + (name || "ngController") + "Controller")
                        }

                        function jqLiteInheritedData(element, name, value) {
                            element.nodeType === NODE_TYPE_DOCUMENT && (element = element.documentElement);
                            for (var names = isArray(name) ? name : [name]; element;) {
                                for (var i = 0, ii = names.length; i < ii; i++)
                                    if (isDefined(value = jqLite.data(element, names[i]))) return value;
                                element = element.parentNode || element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host
                            }
                        }

                        function jqLiteEmpty(element) {
                            for (jqLiteDealoc(element, !0); element.firstChild;) element.removeChild(element.firstChild)
                        }

                        function jqLiteRemove(element, keepData) {
                            keepData || jqLiteDealoc(element);
                            var parent = element.parentNode;
                            parent && parent.removeChild(element)
                        }

                        function jqLiteDocumentLoaded(action, win) {
                            win = win || window, "complete" === win.document.readyState ? win.setTimeout(action) : jqLite(win).on("load", action)
                        }

                        function jqLiteReady(fn) {
                            function trigger() {
                                window.document.removeEventListener("DOMContentLoaded", trigger), window.removeEventListener("load", trigger), fn()
                            }
                            "complete" === window.document.readyState ? window.setTimeout(fn) : (window.document.addEventListener("DOMContentLoaded", trigger), window.addEventListener("load", trigger))
                        }

                        function getBooleanAttrName(element, name) {
                            var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
                            return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr
                        }

                        function getAliasedAttrName(name) {
                            return ALIASED_ATTR[name]
                        }

                        function createEventHandler(element, events) {
                            var eventHandler = function (event, type) {
                                event.isDefaultPrevented = function () {
                                    return event.defaultPrevented
                                };
                                var eventFns = events[type || event.type],
                                    eventFnsLength = eventFns ? eventFns.length : 0;
                                if (eventFnsLength) {
                                    if (isUndefined(event.immediatePropagationStopped)) {
                                        var originalStopImmediatePropagation = event.stopImmediatePropagation;
                                        event.stopImmediatePropagation = function () {
                                            event.immediatePropagationStopped = !0, event.stopPropagation && event.stopPropagation(), originalStopImmediatePropagation && originalStopImmediatePropagation.call(event)
                                        }
                                    }
                                    event.isImmediatePropagationStopped = function () {
                                        return event.immediatePropagationStopped === !0
                                    };
                                    var handlerWrapper = eventFns.specialHandlerWrapper || defaultHandlerWrapper;
                                    eventFnsLength > 1 && (eventFns = shallowCopy(eventFns));
                                    for (var i = 0; i < eventFnsLength; i++) event.isImmediatePropagationStopped() || handlerWrapper(element, event, eventFns[i])
                                }
                            };
                            return eventHandler.elem = element, eventHandler
                        }

                        function defaultHandlerWrapper(element, event, handler) {
                            handler.call(element, event)
                        }

                        function specialMouseHandlerWrapper(target, event, handler) {
                            var related = event.relatedTarget;
                            related && (related === target || jqLiteContains.call(target, related)) || handler.call(target, event)
                        }

                        function $$jqLiteProvider() {
                            this.$get = function () {
                                return extend(JQLite, {
                                    hasClass: function (node, classes) {
                                        return node.attr && (node = node[0]), jqLiteHasClass(node, classes)
                                    },
                                    addClass: function (node, classes) {
                                        return node.attr && (node = node[0]), jqLiteAddClass(node, classes)
                                    },
                                    removeClass: function (node, classes) {
                                        return node.attr && (node = node[0]), jqLiteRemoveClass(node, classes)
                                    }
                                })
                            }
                        }

                        function hashKey(obj, nextUidFn) {
                            var key = obj && obj.$$hashKey;
                            if (key) return "function" == typeof key && (key = obj.$$hashKey()), key;
                            var objType = typeof obj;
                            return key = "function" === objType || "object" === objType && null !== obj ? obj.$$hashKey = objType + ":" + (nextUidFn || nextUid)() : objType + ":" + obj
                        }

                        function NgMapShim() {
                            this._keys = [], this._values = [], this._lastKey = NaN, this._lastIndex = -1
                        }

                        function stringifyFn(fn) {
                            return Function.prototype.toString.call(fn)
                        }

                        function extractArgs(fn) {
                            var fnText = stringifyFn(fn).replace(STRIP_COMMENTS, ""),
                                args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
                            return args
                        }

                        function anonFn(fn) {
                            var args = extractArgs(fn);
                            return args ? "function(" + (args[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
                        }

                        function annotate(fn, strictDi, name) {
                            var $inject, argDecl, last;
                            if ("function" == typeof fn) {
                                if (!($inject = fn.$inject)) {
                                    if ($inject = [], fn.length) {
                                        if (strictDi) throw isString(name) && name || (name = fn.name || anonFn(fn)), $injectorMinErr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", name);
                                        argDecl = extractArgs(fn), forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
                                            arg.replace(FN_ARG, function (all, underscore, name) {
                                                $inject.push(name)
                                            })
                                        })
                                    }
                                    fn.$inject = $inject
                                }
                            } else isArray(fn) ? (last = fn.length - 1, assertArgFn(fn[last], "fn"), $inject = fn.slice(0, last)) : assertArgFn(fn, "fn", !0);
                            return $inject
                        }

                        function createInjector(modulesToLoad, strictDi) {
                            function supportObject(delegate) {
                                return function (key, value) {
                                    return isObject(key) ? void forEach(key, reverseParams(delegate)) : delegate(key, value)
                                }
                            }

                            function provider(name, provider_) {
                                if (assertNotHasOwnProperty(name, "service"), (isFunction(provider_) || isArray(provider_)) && (provider_ = providerInjector.instantiate(provider_)), !provider_.$get) throw $injectorMinErr("pget", "Provider '{0}' must define $get factory method.", name);
                                return providerCache[name + providerSuffix] = provider_
                            }

                            function enforceReturnValue(name, factory) {
                                return function () {
                                    var result = instanceInjector.invoke(factory, this);
                                    if (isUndefined(result)) throw $injectorMinErr("undef", "Provider '{0}' must return a value from $get factory method.", name);
                                    return result
                                }
                            }

                            function factory(name, factoryFn, enforce) {
                                return provider(name, {
                                    $get: enforce !== !1 ? enforceReturnValue(name, factoryFn) : factoryFn
                                })
                            }

                            function service(name, constructor) {
                                return factory(name, ["$injector", function ($injector) {
                                    return $injector.instantiate(constructor)
                                }])
                            }

                            function value(name, val) {
                                return factory(name, valueFn(val), !1)
                            }

                            function constant(name, value) {
                                assertNotHasOwnProperty(name, "constant"), providerCache[name] = value, instanceCache[name] = value
                            }

                            function decorator(serviceName, decorFn) {
                                var origProvider = providerInjector.get(serviceName + providerSuffix),
                                    orig$get = origProvider.$get;
                                origProvider.$get = function () {
                                    var origInstance = instanceInjector.invoke(orig$get, origProvider);
                                    return instanceInjector.invoke(decorFn, null, {
                                        $delegate: origInstance
                                    })
                                }
                            }

                            function loadModules(modulesToLoad) {
                                assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), "modulesToLoad", "not an array");
                                var moduleFn, runBlocks = [];
                                return forEach(modulesToLoad, function (module) {
                                    function runInvokeQueue(queue) {
                                        var i, ii;
                                        for (i = 0, ii = queue.length; i < ii; i++) {
                                            var invokeArgs = queue[i],
                                                provider = providerInjector.get(invokeArgs[0]);
                                            provider[invokeArgs[1]].apply(provider, invokeArgs[2])
                                        }
                                    }
                                    if (!loadedModules.get(module)) {
                                        loadedModules.set(module, !0);
                                        try {
                                            isString(module) ? (moduleFn = angularModule(module), runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks), runInvokeQueue(moduleFn._invokeQueue), runInvokeQueue(moduleFn._configBlocks)) : isFunction(module) ? runBlocks.push(providerInjector.invoke(module)) : isArray(module) ? runBlocks.push(providerInjector.invoke(module)) : assertArgFn(module, "module")
                                        } catch (e) {
                                            throw isArray(module) && (module = module[module.length - 1]), e.message && e.stack && e.stack.indexOf(e.message) === -1 && (e = e.message + "\n" + e.stack), $injectorMinErr("modulerr", "Failed to instantiate module {0} due to:\n{1}", module, e.stack || e.message || e)
                                        }
                                    }
                                }), runBlocks
                            }

                            function createInternalInjector(cache, factory) {
                                function getService(serviceName, caller) {
                                    if (cache.hasOwnProperty(serviceName)) {
                                        if (cache[serviceName] === INSTANTIATING) throw $injectorMinErr("cdep", "Circular dependency found: {0}", serviceName + " <- " + path.join(" <- "));
                                        return cache[serviceName]
                                    }
                                    try {
                                        return path.unshift(serviceName), cache[serviceName] = INSTANTIATING, cache[serviceName] = factory(serviceName, caller), cache[serviceName]
                                    } catch (err) {
                                        throw cache[serviceName] === INSTANTIATING && delete cache[serviceName], err
                                    } finally {
                                        path.shift()
                                    }
                                }

                                function injectionArgs(fn, locals, serviceName) {
                                    for (var args = [], $inject = createInjector.$$annotate(fn, strictDi, serviceName), i = 0, length = $inject.length; i < length; i++) {
                                        var key = $inject[i];
                                        if ("string" != typeof key) throw $injectorMinErr("itkn", "Incorrect injection token! Expected service name as string, got {0}", key);
                                        args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName))
                                    }
                                    return args
                                }

                                function isClass(func) {
                                    if (msie || "function" != typeof func) return !1;
                                    var result = func.$$ngIsClass;
                                    return isBoolean(result) || (result = func.$$ngIsClass = /^(?:class\b|constructor\()/.test(stringifyFn(func))), result
                                }

                                function invoke(fn, self, locals, serviceName) {
                                    "string" == typeof locals && (serviceName = locals, locals = null);
                                    var args = injectionArgs(fn, locals, serviceName);
                                    return isArray(fn) && (fn = fn[fn.length - 1]), isClass(fn) ? (args.unshift(null), new(Function.prototype.bind.apply(fn, args))) : fn.apply(self, args)
                                }

                                function instantiate(Type, locals, serviceName) {
                                    var ctor = isArray(Type) ? Type[Type.length - 1] : Type,
                                        args = injectionArgs(Type, locals, serviceName);
                                    return args.unshift(null), new(Function.prototype.bind.apply(ctor, args))
                                }
                                return {
                                    invoke: invoke,
                                    instantiate: instantiate,
                                    get: getService,
                                    annotate: createInjector.$$annotate,
                                    has: function (name) {
                                        return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name)
                                    }
                                }
                            }
                            strictDi = strictDi === !0;
                            var INSTANTIATING = {},
                                providerSuffix = "Provider",
                                path = [],
                                loadedModules = new NgMap,
                                providerCache = {
                                    $provide: {
                                        provider: supportObject(provider),
                                        factory: supportObject(factory),
                                        service: supportObject(service),
                                        value: supportObject(value),
                                        constant: supportObject(constant),
                                        decorator: decorator
                                    }
                                },
                                providerInjector = providerCache.$injector = createInternalInjector(providerCache, function (serviceName, caller) {
                                    throw angular.isString(caller) && path.push(caller), $injectorMinErr("unpr", "Unknown provider: {0}", path.join(" <- "))
                                }),
                                instanceCache = {},
                                protoInstanceInjector = createInternalInjector(instanceCache, function (serviceName, caller) {
                                    var provider = providerInjector.get(serviceName + providerSuffix, caller);
                                    return instanceInjector.invoke(provider.$get, provider, void 0, serviceName)
                                }),
                                instanceInjector = protoInstanceInjector;
                            providerCache["$injector" + providerSuffix] = {
                                $get: valueFn(protoInstanceInjector)
                            };
                            var runBlocks = loadModules(modulesToLoad);
                            return instanceInjector = protoInstanceInjector.get("$injector"), instanceInjector.strictDi = strictDi, forEach(runBlocks, function (fn) {
                                fn && instanceInjector.invoke(fn)
                            }), instanceInjector
                        }

                        function $AnchorScrollProvider() {
                            var autoScrollingEnabled = !0;
                            this.disableAutoScrolling = function () {
                                autoScrollingEnabled = !1
                            }, this.$get = ["$window", "$location", "$rootScope", function ($window, $location, $rootScope) {
                                function getFirstAnchor(list) {
                                    var result = null;
                                    return Array.prototype.some.call(list, function (element) {
                                        if ("a" === nodeName_(element)) return result = element, !0
                                    }), result
                                }

                                function getYOffset() {
                                    var offset = scroll.yOffset;
                                    if (isFunction(offset)) offset = offset();
                                    else if (isElement(offset)) {
                                        var elem = offset[0],
                                            style = $window.getComputedStyle(elem);
                                        offset = "fixed" !== style.position ? 0 : elem.getBoundingClientRect().bottom
                                    } else isNumber(offset) || (offset = 0);
                                    return offset
                                }

                                function scrollTo(elem) {
                                    if (elem) {
                                        elem.scrollIntoView();
                                        var offset = getYOffset();
                                        if (offset) {
                                            var elemTop = elem.getBoundingClientRect().top;
                                            $window.scrollBy(0, elemTop - offset)
                                        }
                                    } else $window.scrollTo(0, 0)
                                }

                                function scroll(hash) {
                                    hash = isString(hash) ? hash : isNumber(hash) ? hash.toString() : $location.hash();
                                    var elm;
                                    hash ? (elm = document.getElementById(hash)) ? scrollTo(elm) : (elm = getFirstAnchor(document.getElementsByName(hash))) ? scrollTo(elm) : "top" === hash && scrollTo(null) : scrollTo(null)
                                }
                                var document = $window.document;
                                return autoScrollingEnabled && $rootScope.$watch(function () {
                                    return $location.hash()
                                }, function (newVal, oldVal) {
                                    newVal === oldVal && "" === newVal || jqLiteDocumentLoaded(function () {
                                        $rootScope.$evalAsync(scroll)
                                    })
                                }), scroll
                            }]
                        }

                        function mergeClasses(a, b) {
                            return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), a + " " + b) : a : b : ""
                        }

                        function extractElementNode(element) {
                            for (var i = 0; i < element.length; i++) {
                                var elm = element[i];
                                if (elm.nodeType === ELEMENT_NODE) return elm
                            }
                        }

                        function splitClasses(classes) {
                            isString(classes) && (classes = classes.split(" "));
                            var obj = createMap();
                            return forEach(classes, function (klass) {
                                klass.length && (obj[klass] = !0)
                            }), obj
                        }

                        function prepareAnimateOptions(options) {
                            return isObject(options) ? options : {}
                        }

                        function Browser(window, document, $log, $sniffer) {
                            function completeOutstandingRequest(fn) {
                                try {
                                    fn.apply(null, sliceArgs(arguments, 1))
                                } finally {
                                    if (outstandingRequestCount--, 0 === outstandingRequestCount)
                                        for (; outstandingRequestCallbacks.length;) try {
                                            outstandingRequestCallbacks.pop()()
                                        } catch (e) {
                                            $log.error(e)
                                        }
                                }
                            }

                            function getHash(url) {
                                var index = url.indexOf("#");
                                return index === -1 ? "" : url.substr(index)
                            }

                            function cacheStateAndFireUrlChange() {
                                pendingLocation = null, fireStateOrUrlChange()
                            }

                            function cacheState() {
                                cachedState = getCurrentState(), cachedState = isUndefined(cachedState) ? null : cachedState, equals(cachedState, lastCachedState) && (cachedState = lastCachedState), lastCachedState = cachedState, lastHistoryState = cachedState
                            }

                            function fireStateOrUrlChange() {
                                var prevLastHistoryState = lastHistoryState;
                                cacheState(), lastBrowserUrl === self.url() && prevLastHistoryState === cachedState || (lastBrowserUrl = self.url(), lastHistoryState = cachedState, forEach(urlChangeListeners, function (listener) {
                                    listener(self.url(), cachedState)
                                }))
                            }
                            var self = this,
                                location = window.location,
                                history = window.history,
                                setTimeout = window.setTimeout,
                                clearTimeout = window.clearTimeout,
                                pendingDeferIds = {};
                            self.isMock = !1;
                            var outstandingRequestCount = 0,
                                outstandingRequestCallbacks = [];
                            self.$$completeOutstandingRequest = completeOutstandingRequest,
                                self.$$incOutstandingRequestCount = function () {
                                    outstandingRequestCount++
                                }, self.notifyWhenNoOutstandingRequests = function (callback) {
                                    0 === outstandingRequestCount ? callback() : outstandingRequestCallbacks.push(callback)
                                };
                            var cachedState, lastHistoryState, lastBrowserUrl = location.href,
                                baseElement = document.find("base"),
                                pendingLocation = null,
                                getCurrentState = $sniffer.history ? function () {
                                    try {
                                        return history.state
                                    } catch (e) {}
                                } : noop;
                            cacheState(), self.url = function (url, replace, state) {
                                if (isUndefined(state) && (state = null), location !== window.location && (location = window.location), history !== window.history && (history = window.history), url) {
                                    var sameState = lastHistoryState === state;
                                    if (lastBrowserUrl === url && (!$sniffer.history || sameState)) return self;
                                    var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
                                    return lastBrowserUrl = url, lastHistoryState = state, !$sniffer.history || sameBase && sameState ? (sameBase || (pendingLocation = url), replace ? location.replace(url) : sameBase ? location.hash = getHash(url) : location.href = url, location.href !== url && (pendingLocation = url)) : (history[replace ? "replaceState" : "pushState"](state, "", url), cacheState()), pendingLocation && (pendingLocation = url), self
                                }
                                return pendingLocation || location.href.replace(/%27/g, "'")
                            }, self.state = function () {
                                return cachedState
                            };
                            var urlChangeListeners = [],
                                urlChangeInit = !1,
                                lastCachedState = null;
                            self.onUrlChange = function (callback) {
                                return urlChangeInit || ($sniffer.history && jqLite(window).on("popstate", cacheStateAndFireUrlChange), jqLite(window).on("hashchange", cacheStateAndFireUrlChange), urlChangeInit = !0), urlChangeListeners.push(callback), callback
                            }, self.$$applicationDestroyed = function () {
                                jqLite(window).off("hashchange popstate", cacheStateAndFireUrlChange)
                            }, self.$$checkUrlChange = fireStateOrUrlChange, self.baseHref = function () {
                                var href = baseElement.attr("href");
                                return href ? href.replace(/^(https?:)?\/\/[^\/]*/, "") : ""
                            }, self.defer = function (fn, delay) {
                                var timeoutId;
                                return outstandingRequestCount++, timeoutId = setTimeout(function () {
                                    delete pendingDeferIds[timeoutId], completeOutstandingRequest(fn)
                                }, delay || 0), pendingDeferIds[timeoutId] = !0, timeoutId
                            }, self.defer.cancel = function (deferId) {
                                return !!pendingDeferIds[deferId] && (delete pendingDeferIds[deferId], clearTimeout(deferId), completeOutstandingRequest(noop), !0)
                            }
                        }

                        function $BrowserProvider() {
                            this.$get = ["$window", "$log", "$sniffer", "$document", function ($window, $log, $sniffer, $document) {
                                return new Browser($window, $document, $log, $sniffer)
                            }]
                        }

                        function $CacheFactoryProvider() {
                            this.$get = function () {
                                function cacheFactory(cacheId, options) {
                                    function refresh(entry) {
                                        entry !== freshEnd && (staleEnd ? staleEnd === entry && (staleEnd = entry.n) : staleEnd = entry, link(entry.n, entry.p), link(entry, freshEnd), freshEnd = entry, freshEnd.n = null)
                                    }

                                    function link(nextEntry, prevEntry) {
                                        nextEntry !== prevEntry && (nextEntry && (nextEntry.p = prevEntry), prevEntry && (prevEntry.n = nextEntry))
                                    }
                                    if (cacheId in caches) throw minErr("$cacheFactory")("iid", "CacheId '{0}' is already taken!", cacheId);
                                    var size = 0,
                                        stats = extend({}, options, {
                                            id: cacheId
                                        }),
                                        data = createMap(),
                                        capacity = options && options.capacity || Number.MAX_VALUE,
                                        lruHash = createMap(),
                                        freshEnd = null,
                                        staleEnd = null;
                                    return caches[cacheId] = {
                                        put: function (key, value) {
                                            if (!isUndefined(value)) {
                                                if (capacity < Number.MAX_VALUE) {
                                                    var lruEntry = lruHash[key] || (lruHash[key] = {
                                                        key: key
                                                    });
                                                    refresh(lruEntry)
                                                }
                                                return key in data || size++, data[key] = value, size > capacity && this.remove(staleEnd.key), value
                                            }
                                        },
                                        get: function (key) {
                                            if (capacity < Number.MAX_VALUE) {
                                                var lruEntry = lruHash[key];
                                                if (!lruEntry) return;
                                                refresh(lruEntry)
                                            }
                                            return data[key]
                                        },
                                        remove: function (key) {
                                            if (capacity < Number.MAX_VALUE) {
                                                var lruEntry = lruHash[key];
                                                if (!lruEntry) return;
                                                lruEntry === freshEnd && (freshEnd = lruEntry.p), lruEntry === staleEnd && (staleEnd = lruEntry.n), link(lruEntry.n, lruEntry.p), delete lruHash[key]
                                            }
                                            key in data && (delete data[key], size--)
                                        },
                                        removeAll: function () {
                                            data = createMap(), size = 0, lruHash = createMap(), freshEnd = staleEnd = null
                                        },
                                        destroy: function () {
                                            data = null, stats = null, lruHash = null, delete caches[cacheId]
                                        },
                                        info: function () {
                                            return extend({}, stats, {
                                                size: size
                                            })
                                        }
                                    }
                                }
                                var caches = {};
                                return cacheFactory.info = function () {
                                    var info = {};
                                    return forEach(caches, function (cache, cacheId) {
                                        info[cacheId] = cache.info()
                                    }), info
                                }, cacheFactory.get = function (cacheId) {
                                    return caches[cacheId]
                                }, cacheFactory
                            }
                        }

                        function $TemplateCacheProvider() {
                            this.$get = ["$cacheFactory", function ($cacheFactory) {
                                return $cacheFactory("templates")
                            }]
                        }

                        function UNINITIALIZED_VALUE() {}

                        function $CompileProvider($provide, $$sanitizeUriProvider) {
                            function parseIsolateBindings(scope, directiveName, isController) {
                                var LOCAL_REGEXP = /^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/,
                                    bindings = createMap();
                                return forEach(scope, function (definition, scopeName) {
                                    if (definition in bindingCache) return void(bindings[scopeName] = bindingCache[definition]);
                                    var match = definition.match(LOCAL_REGEXP);
                                    if (!match) throw $compileMinErr("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", directiveName, scopeName, definition, isController ? "controller bindings definition" : "isolate scope definition");
                                    bindings[scopeName] = {
                                        mode: match[1][0],
                                        collection: "*" === match[2],
                                        optional: "?" === match[3],
                                        attrName: match[4] || scopeName
                                    }, match[4] && (bindingCache[definition] = bindings[scopeName])
                                }), bindings
                            }

                            function parseDirectiveBindings(directive, directiveName) {
                                var bindings = {
                                    isolateScope: null,
                                    bindToController: null
                                };
                                if (isObject(directive.scope) && (directive.bindToController === !0 ? (bindings.bindToController = parseIsolateBindings(directive.scope, directiveName, !0), bindings.isolateScope = {}) : bindings.isolateScope = parseIsolateBindings(directive.scope, directiveName, !1)), isObject(directive.bindToController) && (bindings.bindToController = parseIsolateBindings(directive.bindToController, directiveName, !0)), bindings.bindToController && !directive.controller) throw $compileMinErr("noctrl", "Cannot bind to controller without directive '{0}'s controller.", directiveName);
                                return bindings
                            }

                            function assertValidDirectiveName(name) {
                                var letter = name.charAt(0);
                                if (!letter || letter !== lowercase(letter)) throw $compileMinErr("baddir", "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", name);
                                if (name !== name.trim()) throw $compileMinErr("baddir", "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces", name)
                            }

                            function getDirectiveRequire(directive) {
                                var require = directive.require || directive.controller && directive.name;
                                return !isArray(require) && isObject(require) && forEach(require, function (value, key) {
                                    var match = value.match(REQUIRE_PREFIX_REGEXP),
                                        name = value.substring(match[0].length);
                                    name || (require[key] = match[0] + key)
                                }), require
                            }

                            function getDirectiveRestrict(restrict, name) {
                                if (restrict && (!isString(restrict) || !/[EACM]/.test(restrict))) throw $compileMinErr("badrestrict", "Restrict property '{0}' of directive '{1}' is invalid", restrict, name);
                                return restrict || "EA"
                            }
                            var hasDirectives = {},
                                Suffix = "Directive",
                                COMMENT_DIRECTIVE_REGEXP = /^\s*directive:\s*([\w-]+)\s+(.*)$/,
                                CLASS_DIRECTIVE_REGEXP = /(([\w-]+)(?::([^;]+))?;?)/,
                                ALL_OR_NOTHING_ATTRS = makeMap("ngSrc,ngSrcset,src,srcset"),
                                REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
                                EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/,
                                bindingCache = createMap();
                            this.directive = function registerDirective(name, directiveFactory) {
                                return assertArg(name, "name"), assertNotHasOwnProperty(name, "directive"), isString(name) ? (assertValidDirectiveName(name), assertArg(directiveFactory, "directiveFactory"), hasDirectives.hasOwnProperty(name) || (hasDirectives[name] = [], $provide.factory(name + Suffix, ["$injector", "$exceptionHandler", function ($injector, $exceptionHandler) {
                                    var directives = [];
                                    return forEach(hasDirectives[name], function (directiveFactory, index) {
                                        try {
                                            var directive = $injector.invoke(directiveFactory);
                                            isFunction(directive) ? directive = {
                                                compile: valueFn(directive)
                                            } : !directive.compile && directive.link && (directive.compile = valueFn(directive.link)), directive.priority = directive.priority || 0, directive.index = index, directive.name = directive.name || name, directive.require = getDirectiveRequire(directive), directive.restrict = getDirectiveRestrict(directive.restrict, name), directive.$$moduleName = directiveFactory.$$moduleName, directives.push(directive)
                                        } catch (e) {
                                            $exceptionHandler(e)
                                        }
                                    }), directives
                                }])), hasDirectives[name].push(directiveFactory)) : forEach(name, reverseParams(registerDirective)), this
                            }, this.component = function (name, options) {
                                function factory($injector) {
                                    function makeInjectable(fn) {
                                        return isFunction(fn) || isArray(fn) ? function (tElement, tAttrs) {
                                            return $injector.invoke(fn, this, {
                                                $element: tElement,
                                                $attrs: tAttrs
                                            })
                                        } : fn
                                    }
                                    var template = options.template || options.templateUrl ? options.template : "",
                                        ddo = {
                                            controller: controller,
                                            controllerAs: identifierForController(options.controller) || options.controllerAs || "$ctrl",
                                            template: makeInjectable(template),
                                            templateUrl: makeInjectable(options.templateUrl),
                                            transclude: options.transclude,
                                            scope: {},
                                            bindToController: options.bindings || {},
                                            restrict: "E",
                                            require: options.require
                                        };
                                    return forEach(options, function (val, key) {
                                        "$" === key.charAt(0) && (ddo[key] = val)
                                    }), ddo
                                }
                                var controller = options.controller || function () {};
                                return forEach(options, function (val, key) {
                                    "$" === key.charAt(0) && (factory[key] = val, isFunction(controller) && (controller[key] = val))
                                }), factory.$inject = ["$injector"], this.directive(name, factory)
                            }, this.aHrefSanitizationWhitelist = function (regexp) {
                                return isDefined(regexp) ? ($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.aHrefSanitizationWhitelist()
                            }, this.imgSrcSanitizationWhitelist = function (regexp) {
                                return isDefined(regexp) ? ($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp), this) : $$sanitizeUriProvider.imgSrcSanitizationWhitelist()
                            };
                            var debugInfoEnabled = !0;
                            this.debugInfoEnabled = function (enabled) {
                                return isDefined(enabled) ? (debugInfoEnabled = enabled, this) : debugInfoEnabled
                            };
                            var preAssignBindingsEnabled = !1;
                            this.preAssignBindingsEnabled = function (enabled) {
                                return isDefined(enabled) ? (preAssignBindingsEnabled = enabled, this) : preAssignBindingsEnabled
                            };
                            var TTL = 10;
                            this.onChangesTtl = function (value) {
                                return arguments.length ? (TTL = value, this) : TTL
                            };
                            var commentDirectivesEnabledConfig = !0;
                            this.commentDirectivesEnabled = function (value) {
                                return arguments.length ? (commentDirectivesEnabledConfig = value, this) : commentDirectivesEnabledConfig
                            };
                            var cssClassDirectivesEnabledConfig = !0;
                            this.cssClassDirectivesEnabled = function (value) {
                                return arguments.length ? (cssClassDirectivesEnabledConfig = value, this) : cssClassDirectivesEnabledConfig
                            }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function ($injector, $interpolate, $exceptionHandler, $templateRequest, $parse, $controller, $rootScope, $sce, $animate, $$sanitizeUri) {
                                function flushOnChangesQueue() {
                                    try {
                                        if (!--onChangesTtl) throw onChangesQueue = void 0, $compileMinErr("infchng", "{0} $onChanges() iterations reached. Aborting!\n", TTL);
                                        $rootScope.$apply(function () {
                                            for (var errors = [], i = 0, ii = onChangesQueue.length; i < ii; ++i) try {
                                                onChangesQueue[i]()
                                            } catch (e) {
                                                errors.push(e)
                                            }
                                            if (onChangesQueue = void 0, errors.length) throw errors
                                        })
                                    } finally {
                                        onChangesTtl++
                                    }
                                }

                                function Attributes(element, attributesToCopy) {
                                    if (attributesToCopy) {
                                        var i, l, key, keys = Object.keys(attributesToCopy);
                                        for (i = 0, l = keys.length; i < l; i++) key = keys[i], this[key] = attributesToCopy[key]
                                    } else this.$attr = {};
                                    this.$$element = element
                                }

                                function setSpecialAttr(element, attrName, value) {
                                    specialAttrHolder.innerHTML = "<span " + attrName + ">";
                                    var attributes = specialAttrHolder.firstChild.attributes,
                                        attribute = attributes[0];
                                    attributes.removeNamedItem(attribute.name), attribute.value = value, element.attributes.setNamedItem(attribute)
                                }

                                function safeAddClass($element, className) {
                                    try {
                                        $element.addClass(className)
                                    } catch (e) {}
                                }

                                function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                                    $compileNodes instanceof jqLite || ($compileNodes = jqLite($compileNodes));
                                    var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
                                    compile.$$addScopeClass($compileNodes);
                                    var namespace = null;
                                    return function (scope, cloneConnectFn, options) {
                                        if (!$compileNodes) throw $compileMinErr("multilink", "This element has already been linked.");
                                        assertArg(scope, "scope"), previousCompileContext && previousCompileContext.needsNewScope && (scope = scope.$parent.$new()), options = options || {};
                                        var parentBoundTranscludeFn = options.parentBoundTranscludeFn,
                                            transcludeControllers = options.transcludeControllers,
                                            futureParentElement = options.futureParentElement;
                                        parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude && (parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude), namespace || (namespace = detectNamespaceForChildElements(futureParentElement));
                                        var $linkNode;
                                        if ($linkNode = "html" !== namespace ? jqLite(wrapTemplate(namespace, jqLite("<div>").append($compileNodes).html())) : cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes, transcludeControllers)
                                            for (var controllerName in transcludeControllers) $linkNode.data("$" + controllerName + "Controller", transcludeControllers[controllerName].instance);
                                        return compile.$$addScopeInfo($linkNode, scope), cloneConnectFn && cloneConnectFn($linkNode, scope), compositeLinkFn && compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn), cloneConnectFn || ($compileNodes = compositeLinkFn = null), $linkNode
                                    }
                                }

                                function detectNamespaceForChildElements(parentElement) {
                                    var node = parentElement && parentElement[0];
                                    return node && "foreignobject" !== nodeName_(node) && toString.call(node).match(/SVG/) ? "svg" : "html"
                                }

                                function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
                                    function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
                                        var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn, stableNodeList;
                                        if (nodeLinkFnFound) {
                                            var nodeListLength = nodeList.length;
                                            for (stableNodeList = new Array(nodeListLength), i = 0; i < linkFns.length; i += 3) idx = linkFns[i], stableNodeList[idx] = nodeList[idx]
                                        } else stableNodeList = nodeList;
                                        for (i = 0, ii = linkFns.length; i < ii;) node = stableNodeList[linkFns[i++]], nodeLinkFn = linkFns[i++], childLinkFn = linkFns[i++], nodeLinkFn ? (nodeLinkFn.scope ? (childScope = scope.$new(), compile.$$addScopeInfo(jqLite(node), childScope)) : childScope = scope, childBoundTranscludeFn = nodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, nodeLinkFn.transclude, parentBoundTranscludeFn) : !nodeLinkFn.templateOnThisElement && parentBoundTranscludeFn ? parentBoundTranscludeFn : !parentBoundTranscludeFn && transcludeFn ? createBoundTranscludeFn(scope, transcludeFn) : null, nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn)) : childLinkFn && childLinkFn(scope, node.childNodes, void 0, parentBoundTranscludeFn)
                                    }
                                    for (var attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound, linkFns = [], notLiveList = isArray(nodeList) || nodeList instanceof jqLite, i = 0; i < nodeList.length; i++) attrs = new Attributes, 11 === msie && mergeConsecutiveTextNodes(nodeList, i, notLiveList), directives = collectDirectives(nodeList[i], [], attrs, 0 === i ? maxPriority : void 0, ignoreDirective), nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement, null, [], [], previousCompileContext) : null, nodeLinkFn && nodeLinkFn.scope && compile.$$addScopeClass(attrs.$$element), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !(childNodes = nodeList[i].childNodes) || !childNodes.length ? null : compileNodes(childNodes, nodeLinkFn ? (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude : transcludeFn), (nodeLinkFn || childLinkFn) && (linkFns.push(i, nodeLinkFn, childLinkFn), linkFnFound = !0, nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn), previousCompileContext = null;
                                    return linkFnFound ? compositeLinkFn : null
                                }

                                function mergeConsecutiveTextNodes(nodeList, idx, notLiveList) {
                                    var sibling, node = nodeList[idx],
                                        parent = node.parentNode;
                                    if (node.nodeType === NODE_TYPE_TEXT)
                                        for (;;) {
                                            if (sibling = parent ? node.nextSibling : nodeList[idx + 1], !sibling || sibling.nodeType !== NODE_TYPE_TEXT) break;
                                            node.nodeValue = node.nodeValue + sibling.nodeValue, sibling.parentNode && sibling.parentNode.removeChild(sibling), notLiveList && sibling === nodeList[idx + 1] && nodeList.splice(idx + 1, 1)
                                        }
                                }

                                function createBoundTranscludeFn(scope, transcludeFn, previousBoundTranscludeFn) {
                                    function boundTranscludeFn(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {
                                        return transcludedScope || (transcludedScope = scope.$new(!1, containingScope), transcludedScope.$$transcluded = !0), transcludeFn(transcludedScope, cloneFn, {
                                            parentBoundTranscludeFn: previousBoundTranscludeFn,
                                            transcludeControllers: controllers,
                                            futureParentElement: futureParentElement
                                        })
                                    }
                                    var boundSlots = boundTranscludeFn.$$slots = createMap();
                                    for (var slotName in transcludeFn.$$slots) transcludeFn.$$slots[slotName] ? boundSlots[slotName] = createBoundTranscludeFn(scope, transcludeFn.$$slots[slotName], previousBoundTranscludeFn) : boundSlots[slotName] = null;
                                    return boundTranscludeFn
                                }

                                function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                                    var match, nodeName, className, nodeType = node.nodeType,
                                        attrsMap = attrs.$attr;
                                    switch (nodeType) {
                                        case NODE_TYPE_ELEMENT:
                                            nodeName = nodeName_(node), addDirective(directives, directiveNormalize(nodeName), "E", maxPriority, ignoreDirective);
                                            for (var attr, name, nName, ngAttrName, value, isNgAttr, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                                                var attrStartName = !1,
                                                    attrEndName = !1;
                                                attr = nAttrs[j], name = attr.name, value = attr.value, ngAttrName = directiveNormalize(name), isNgAttr = NG_ATTR_BINDING.test(ngAttrName), isNgAttr && (name = name.replace(PREFIX_REGEXP, "").substr(8).replace(/_(.)/g, function (match, letter) {
                                                    return letter.toUpperCase()
                                                }));
                                                var multiElementMatch = ngAttrName.match(MULTI_ELEMENT_DIR_RE);
                                                multiElementMatch && directiveIsMultiElement(multiElementMatch[1]) && (attrStartName = name, attrEndName = name.substr(0, name.length - 5) + "end", name = name.substr(0, name.length - 6)), nName = directiveNormalize(name.toLowerCase()), attrsMap[nName] = name, !isNgAttr && attrs.hasOwnProperty(nName) || (attrs[nName] = value, getBooleanAttrName(node, nName) && (attrs[nName] = !0)), addAttrInterpolateDirective(node, directives, value, nName, isNgAttr), addDirective(directives, nName, "A", maxPriority, ignoreDirective, attrStartName, attrEndName)
                                            }
                                            if ("input" === nodeName && "hidden" === node.getAttribute("type") && node.setAttribute("autocomplete", "off"), !cssClassDirectivesEnabled) break;
                                            if (className = node.className, isObject(className) && (className = className.animVal), isString(className) && "" !== className)
                                                for (; match = CLASS_DIRECTIVE_REGEXP.exec(className);) nName = directiveNormalize(match[2]), addDirective(directives, nName, "C", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[3])), className = className.substr(match.index + match[0].length);
                                            break;
                                        case NODE_TYPE_TEXT:
                                            addTextInterpolateDirective(directives, node.nodeValue);
                                            break;
                                        case NODE_TYPE_COMMENT:
                                            if (!commentDirectivesEnabled) break;
                                            collectCommentDirectives(node, directives, attrs, maxPriority, ignoreDirective)
                                    }
                                    return directives.sort(byPriority), directives
                                }

                                function collectCommentDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                                    try {
                                        var match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                                        if (match) {
                                            var nName = directiveNormalize(match[1]);
                                            addDirective(directives, nName, "M", maxPriority, ignoreDirective) && (attrs[nName] = trim(match[2]))
                                        }
                                    } catch (e) {}
                                }

                                function groupScan(node, attrStart, attrEnd) {
                                    var nodes = [],
                                        depth = 0;
                                    if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                                        do {
                                            if (!node) throw $compileMinErr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", attrStart, attrEnd);
                                            node.nodeType === NODE_TYPE_ELEMENT && (node.hasAttribute(attrStart) && depth++, node.hasAttribute(attrEnd) && depth--), nodes.push(node), node = node.nextSibling
                                        } while (depth > 0)
                                    } else nodes.push(node);
                                    return jqLite(nodes)
                                }

                                function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                                    return function (scope, element, attrs, controllers, transcludeFn) {
                                        return element = groupScan(element[0], attrStart, attrEnd), linkFn(scope, element, attrs, controllers, transcludeFn)
                                    }
                                }

                                function compilationGenerator(eager, $compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) {
                                    var compiled;
                                    return eager ? compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext) : function () {
                                        return compiled || (compiled = compile($compileNodes, transcludeFn, maxPriority, ignoreDirective, previousCompileContext), $compileNodes = transcludeFn = previousCompileContext = null), compiled.apply(this, arguments)
                                    }
                                }

                                function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection, originalReplaceDirective, preLinkFns, postLinkFns, previousCompileContext) {
                                    function addLinkFns(pre, post, attrStart, attrEnd) {
                                        pre && (attrStart && (pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd)), pre.require = directive.require, pre.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (pre = cloneAndAnnotateFn(pre, {
                                            isolateScope: !0
                                        })), preLinkFns.push(pre)), post && (attrStart && (post = groupElementsLinkFnWrapper(post, attrStart, attrEnd)), post.require = directive.require, post.directiveName = directiveName, (newIsolateScopeDirective === directive || directive.$$isolateScope) && (post = cloneAndAnnotateFn(post, {
                                            isolateScope: !0
                                        })), postLinkFns.push(post))
                                    }

                                    function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                                        function controllersBoundTransclude(scope, cloneAttachFn, futureParentElement, slotName) {
                                            var transcludeControllers;
                                            if (isScope(scope) || (slotName = futureParentElement, futureParentElement = cloneAttachFn, cloneAttachFn = scope, scope = void 0), hasElementTranscludeDirective && (transcludeControllers = elementControllers), futureParentElement || (futureParentElement = hasElementTranscludeDirective ? $element.parent() : $element), !slotName) return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                                            var slotTranscludeFn = boundTranscludeFn.$$slots[slotName];
                                            if (slotTranscludeFn) return slotTranscludeFn(scope, cloneAttachFn, transcludeControllers, futureParentElement, scopeToChild);
                                            if (isUndefined(slotTranscludeFn)) throw $compileMinErr("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', slotName, startingTag($element))
                                        }
                                        var i, ii, linkFn, isolateScope, controllerScope, elementControllers, transcludeFn, $element, attrs, scopeBindingInfo;
                                        compileNode === linkNode ? (attrs = templateAttrs, $element = templateAttrs.$$element) : ($element = jqLite(linkNode), attrs = new Attributes($element, templateAttrs)), controllerScope = scope, newIsolateScopeDirective ? isolateScope = scope.$new(!0) : newScopeDirective && (controllerScope = scope.$parent), boundTranscludeFn && (transcludeFn = controllersBoundTransclude, transcludeFn.$$boundTransclude = boundTranscludeFn, transcludeFn.isSlotFilled = function (slotName) {
                                            return !!boundTranscludeFn.$$slots[slotName]
                                        }), controllerDirectives && (elementControllers = setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective)), newIsolateScopeDirective && (compile.$$addScopeInfo($element, isolateScope, !0, !(templateDirective && (templateDirective === newIsolateScopeDirective || templateDirective === newIsolateScopeDirective.$$originalDirective))), compile.$$addScopeClass($element, !0), isolateScope.$$isolateBindings = newIsolateScopeDirective.$$isolateBindings, scopeBindingInfo = initializeDirectiveBindings(scope, attrs, isolateScope, isolateScope.$$isolateBindings, newIsolateScopeDirective), scopeBindingInfo.removeWatches && isolateScope.$on("$destroy", scopeBindingInfo.removeWatches));
                                        for (var name in elementControllers) {
                                            var controllerDirective = controllerDirectives[name],
                                                controller = elementControllers[name],
                                                bindings = controllerDirective.$$bindings.bindToController;
                                            if (preAssignBindingsEnabled) {
                                                bindings ? controller.bindingInfo = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective) : controller.bindingInfo = {};
                                                var controllerResult = controller();
                                                controllerResult !== controller.instance && (controller.instance = controllerResult, $element.data("$" + controllerDirective.name + "Controller", controllerResult), controller.bindingInfo.removeWatches && controller.bindingInfo.removeWatches(), controller.bindingInfo = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective))
                                            } else controller.instance = controller(), $element.data("$" + controllerDirective.name + "Controller", controller.instance), controller.bindingInfo = initializeDirectiveBindings(controllerScope, attrs, controller.instance, bindings, controllerDirective)
                                        }
                                        for (forEach(controllerDirectives, function (controllerDirective, name) {
                                                var require = controllerDirective.require;
                                                controllerDirective.bindToController && !isArray(require) && isObject(require) && extend(elementControllers[name].instance, getControllers(name, require, $element, elementControllers))
                                            }), forEach(elementControllers, function (controller) {
                                                var controllerInstance = controller.instance;
                                                if (isFunction(controllerInstance.$onChanges)) try {
                                                    controllerInstance.$onChanges(controller.bindingInfo.initialChanges)
                                                } catch (e) {
                                                    $exceptionHandler(e)
                                                }
                                                if (isFunction(controllerInstance.$onInit)) try {
                                                    controllerInstance.$onInit()
                                                } catch (e) {
                                                    $exceptionHandler(e)
                                                }
                                                isFunction(controllerInstance.$doCheck) && (controllerScope.$watch(function () {
                                                    controllerInstance.$doCheck()
                                                }), controllerInstance.$doCheck()), isFunction(controllerInstance.$onDestroy) && controllerScope.$on("$destroy", function () {
                                                    controllerInstance.$onDestroy()
                                                })
                                            }), i = 0, ii = preLinkFns.length; i < ii; i++) linkFn = preLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                                        var scopeToChild = scope;
                                        for (newIsolateScopeDirective && (newIsolateScopeDirective.template || null === newIsolateScopeDirective.templateUrl) && (scopeToChild = isolateScope), childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, void 0, boundTranscludeFn), i = postLinkFns.length - 1; i >= 0; i--) linkFn = postLinkFns[i], invokeLinkFn(linkFn, linkFn.isolateScope ? isolateScope : scope, $element, attrs, linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers), transcludeFn);
                                        forEach(elementControllers, function (controller) {
                                            var controllerInstance = controller.instance;
                                            isFunction(controllerInstance.$postLink) && controllerInstance.$postLink()
                                        })
                                    }
                                    previousCompileContext = previousCompileContext || {};
                                    for (var directive, directiveName, $template, linkFn, directiveValue, terminalPriority = -Number.MAX_VALUE, newScopeDirective = previousCompileContext.newScopeDirective, controllerDirectives = previousCompileContext.controllerDirectives, newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective, templateDirective = previousCompileContext.templateDirective, nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective, hasTranscludeDirective = !1, hasTemplate = !1, hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective, $compileNode = templateAttrs.$$element = jqLite(compileNode), replaceDirective = originalReplaceDirective, childTranscludeFn = transcludeFn, didScanForMultipleTransclusion = !1, mightHaveMultipleTransclusionError = !1, i = 0, ii = directives.length; i < ii; i++) {
                                        directive = directives[i];
                                        var attrStart = directive.$$start,
                                            attrEnd = directive.$$end;
                                        if (attrStart && ($compileNode = groupScan(compileNode, attrStart, attrEnd)), $template = void 0, terminalPriority > directive.priority) break;
                                        if (directiveValue = directive.scope, directiveValue && (directive.templateUrl || (isObject(directiveValue) ? (assertNoDuplicate("new/isolated scope", newIsolateScopeDirective || newScopeDirective, directive, $compileNode), newIsolateScopeDirective = directive) : assertNoDuplicate("new/isolated scope", newIsolateScopeDirective, directive, $compileNode)), newScopeDirective = newScopeDirective || directive), directiveName = directive.name, !didScanForMultipleTransclusion && (directive.replace && (directive.templateUrl || directive.template) || directive.transclude && !directive.$$tlb)) {
                                            for (var candidateDirective, scanningIndex = i + 1; candidateDirective = directives[scanningIndex++];)
                                                if (candidateDirective.transclude && !candidateDirective.$$tlb || candidateDirective.replace && (candidateDirective.templateUrl || candidateDirective.template)) {
                                                    mightHaveMultipleTransclusionError = !0;
                                                    break
                                                } didScanForMultipleTransclusion = !0
                                        }
                                        if (!directive.templateUrl && directive.controller && (controllerDirectives = controllerDirectives || createMap(), assertNoDuplicate("'" + directiveName + "' controller", controllerDirectives[directiveName], directive, $compileNode), controllerDirectives[directiveName] = directive), directiveValue = directive.transclude)
                                            if (hasTranscludeDirective = !0, directive.$$tlb || (assertNoDuplicate("transclusion", nonTlbTranscludeDirective, directive, $compileNode), nonTlbTranscludeDirective = directive), "element" === directiveValue) hasElementTranscludeDirective = !0, terminalPriority = directive.priority, $template = $compileNode, $compileNode = templateAttrs.$$element = jqLite(compile.$$createComment(directiveName, templateAttrs[directiveName])), compileNode = $compileNode[0], replaceWith(jqCollection, sliceArgs($template), compileNode), $template[0].$$parentNode = $template[0].parentNode, childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, terminalPriority, replaceDirective && replaceDirective.name, {
                                                nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                            });
                                            else {
                                                var slots = createMap();
                                                if (isObject(directiveValue)) {
                                                    $template = [];
                                                    var slotMap = createMap(),
                                                        filledSlots = createMap();
                                                    forEach(directiveValue, function (elementSelector, slotName) {
                                                        var optional = "?" === elementSelector.charAt(0);
                                                        elementSelector = optional ? elementSelector.substring(1) : elementSelector, slotMap[elementSelector] = slotName, slots[slotName] = null, filledSlots[slotName] = optional
                                                    }), forEach($compileNode.contents(), function (node) {
                                                        var slotName = slotMap[directiveNormalize(nodeName_(node))];
                                                        slotName ? (filledSlots[slotName] = !0, slots[slotName] = slots[slotName] || [], slots[slotName].push(node)) : $template.push(node)
                                                    }), forEach(filledSlots, function (filled, slotName) {
                                                        if (!filled) throw $compileMinErr("reqslot", "Required transclusion slot `{0}` was not filled.", slotName)
                                                    });
                                                    for (var slotName in slots) slots[slotName] && (slots[slotName] = compilationGenerator(mightHaveMultipleTransclusionError, slots[slotName], transcludeFn))
                                                } else $template = jqLite(jqLiteClone(compileNode)).contents();
                                                $compileNode.empty(), childTranscludeFn = compilationGenerator(mightHaveMultipleTransclusionError, $template, transcludeFn, void 0, void 0, {
                                                    needsNewScope: directive.$$isolateScope || directive.$$newScope
                                                }), childTranscludeFn.$$slots = slots
                                            } if (directive.template)
                                            if (hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template, directiveValue = denormalizeTemplate(directiveValue), directive.replace) {
                                                if (replaceDirective = directive, $template = jqLiteIsTextNode(directiveValue) ? [] : removeComments(wrapTemplate(directive.templateNamespace, trim(directiveValue))), compileNode = $template[0], 1 !== $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", directiveName, "");
                                                replaceWith(jqCollection, $compileNode, compileNode);
                                                var newTemplateAttrs = {
                                                        $attr: {}
                                                    },
                                                    templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs),
                                                    unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));
                                                (newIsolateScopeDirective || newScopeDirective) && markDirectiveScope(templateDirectives, newIsolateScopeDirective, newScopeDirective), directives = directives.concat(templateDirectives).concat(unprocessedDirectives), mergeTemplateAttributes(templateAttrs, newTemplateAttrs), ii = directives.length
                                            } else $compileNode.html(directiveValue);
                                        if (directive.templateUrl) hasTemplate = !0, assertNoDuplicate("template", templateDirective, directive, $compileNode), templateDirective = directive, directive.replace && (replaceDirective = directive), nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode, templateAttrs, jqCollection, hasTranscludeDirective && childTranscludeFn, preLinkFns, postLinkFns, {
                                            controllerDirectives: controllerDirectives,
                                            newScopeDirective: newScopeDirective !== directive && newScopeDirective,
                                            newIsolateScopeDirective: newIsolateScopeDirective,
                                            templateDirective: templateDirective,
                                            nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                        }), ii = directives.length;
                                        else if (directive.compile) try {
                                            linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                                            var context = directive.$$originalDirective || directive;
                                            isFunction(linkFn) ? addLinkFns(null, bind(context, linkFn), attrStart, attrEnd) : linkFn && addLinkFns(bind(context, linkFn.pre), bind(context, linkFn.post), attrStart, attrEnd)
                                        } catch (e) {
                                            $exceptionHandler(e, startingTag($compileNode))
                                        }
                                        directive.terminal && (nodeLinkFn.terminal = !0, terminalPriority = Math.max(terminalPriority, directive.priority))
                                    }
                                    return nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === !0, nodeLinkFn.transcludeOnThisElement = hasTranscludeDirective, nodeLinkFn.templateOnThisElement = hasTemplate, nodeLinkFn.transclude = childTranscludeFn, previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective, nodeLinkFn
                                }

                                function getControllers(directiveName, require, $element, elementControllers) {
                                    var value;
                                    if (isString(require)) {
                                        var match = require.match(REQUIRE_PREFIX_REGEXP),
                                            name = require.substring(match[0].length),
                                            inheritType = match[1] || match[3],
                                            optional = "?" === match[2];
                                        if ("^^" === inheritType ? $element = $element.parent() : (value = elementControllers && elementControllers[name], value = value && value.instance), !value) {
                                            var dataName = "$" + name + "Controller";
                                            value = inheritType ? $element.inheritedData(dataName) : $element.data(dataName)
                                        }
                                        if (!value && !optional) throw $compileMinErr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", name, directiveName)
                                    } else if (isArray(require)) {
                                        value = [];
                                        for (var i = 0, ii = require.length; i < ii; i++) value[i] = getControllers(directiveName, require[i], $element, elementControllers)
                                    } else isObject(require) && (value = {}, forEach(require, function (controller, property) {
                                        value[property] = getControllers(directiveName, controller, $element, elementControllers)
                                    }));
                                    return value || null
                                }

                                function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective) {
                                    var elementControllers = createMap();
                                    for (var controllerKey in controllerDirectives) {
                                        var directive = controllerDirectives[controllerKey],
                                            locals = {
                                                $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                                                $element: $element,
                                                $attrs: attrs,
                                                $transclude: transcludeFn
                                            },
                                            controller = directive.controller;
                                        "@" === controller && (controller = attrs[directive.name]);
                                        var controllerInstance = $controller(controller, locals, !0, directive.controllerAs);
                                        elementControllers[directive.name] = controllerInstance, $element.data("$" + directive.name + "Controller", controllerInstance.instance)
                                    }
                                    return elementControllers
                                }

                                function markDirectiveScope(directives, isolateScope, newScope) {
                                    for (var j = 0, jj = directives.length; j < jj; j++) directives[j] = inherit(directives[j], {
                                        $$isolateScope: isolateScope,
                                        $$newScope: newScope
                                    })
                                }

                                function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName, endAttrName) {
                                    if (name === ignoreDirective) return null;
                                    var match = null;
                                    if (hasDirectives.hasOwnProperty(name))
                                        for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++)
                                            if (directive = directives[i], (isUndefined(maxPriority) || maxPriority > directive.priority) && directive.restrict.indexOf(location) !== -1) {
                                                if (startAttrName && (directive = inherit(directive, {
                                                        $$start: startAttrName,
                                                        $$end: endAttrName
                                                    })), !directive.$$bindings) {
                                                    var bindings = directive.$$bindings = parseDirectiveBindings(directive, directive.name);
                                                    isObject(bindings.isolateScope) && (directive.$$isolateBindings = bindings.isolateScope)
                                                }
                                                tDirectives.push(directive), match = directive
                                            } return match
                                }

                                function directiveIsMultiElement(name) {
                                    if (hasDirectives.hasOwnProperty(name))
                                        for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++)
                                            if (directive = directives[i], directive.multiElement) return !0;
                                    return !1
                                }

                                function mergeTemplateAttributes(dst, src) {
                                    var srcAttr = src.$attr,
                                        dstAttr = dst.$attr;
                                    forEach(dst, function (value, key) {
                                        "$" !== key.charAt(0) && (src[key] && src[key] !== value && (value.length ? value += ("style" === key ? ";" : " ") + src[key] : value = src[key]), dst.$set(key, value, !0, srcAttr[key]))
                                    }), forEach(src, function (value, key) {
                                        dst.hasOwnProperty(key) || "$" === key.charAt(0) || (dst[key] = value, "class" !== key && "style" !== key && (dstAttr[key] = srcAttr[key]))
                                    })
                                }

                                function compileTemplateUrl(directives, $compileNode, tAttrs, $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                                    var afterTemplateNodeLinkFn, afterTemplateChildLinkFn, linkQueue = [],
                                        beforeTemplateCompileNode = $compileNode[0],
                                        origAsyncDirective = directives.shift(),
                                        derivedSyncDirective = inherit(origAsyncDirective, {
                                            templateUrl: null,
                                            transclude: null,
                                            replace: null,
                                            $$originalDirective: origAsyncDirective
                                        }),
                                        templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl,
                                        templateNamespace = origAsyncDirective.templateNamespace;
                                    return $compileNode.empty(), $templateRequest(templateUrl).then(function (content) {
                                            var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;
                                            if (content = denormalizeTemplate(content), origAsyncDirective.replace) {
                                                if ($template = jqLiteIsTextNode(content) ? [] : removeComments(wrapTemplate(templateNamespace, trim(content))), compileNode = $template[0], 1 !== $template.length || compileNode.nodeType !== NODE_TYPE_ELEMENT) throw $compileMinErr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", origAsyncDirective.name, templateUrl);
                                                tempTemplateAttrs = {
                                                    $attr: {}
                                                }, replaceWith($rootElement, $compileNode, compileNode);
                                                var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);
                                                isObject(origAsyncDirective.scope) && markDirectiveScope(templateDirectives, !0), directives = templateDirectives.concat(directives), mergeTemplateAttributes(tAttrs, tempTemplateAttrs)
                                            } else compileNode = beforeTemplateCompileNode, $compileNode.html(content);
                                            for (directives.unshift(derivedSyncDirective), afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns, previousCompileContext), forEach($rootElement, function (node, i) {
                                                    node === compileNode && ($rootElement[i] = $compileNode[0])
                                                }), afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn); linkQueue.length;) {
                                                var scope = linkQueue.shift(),
                                                    beforeTemplateLinkNode = linkQueue.shift(),
                                                    linkRootElement = linkQueue.shift(),
                                                    boundTranscludeFn = linkQueue.shift(),
                                                    linkNode = $compileNode[0];
                                                if (!scope.$$destroyed) {
                                                    if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                                        var oldClasses = beforeTemplateLinkNode.className;
                                                        previousCompileContext.hasElementTranscludeDirective && origAsyncDirective.replace || (linkNode = jqLiteClone(compileNode)), replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode), safeAddClass(jqLite(linkNode), oldClasses)
                                                    }
                                                    childBoundTranscludeFn = afterTemplateNodeLinkFn.transcludeOnThisElement ? createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn) : boundTranscludeFn, afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, childBoundTranscludeFn)
                                                }
                                            }
                                            linkQueue = null
                                        })["catch"](function (error) {
                                            error instanceof Error && $exceptionHandler(error)
                                        }),
                                        function (ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                                            var childBoundTranscludeFn = boundTranscludeFn;
                                            scope.$$destroyed || (linkQueue ? linkQueue.push(scope, node, rootElement, childBoundTranscludeFn) : (afterTemplateNodeLinkFn.transcludeOnThisElement && (childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude, boundTranscludeFn)), afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, childBoundTranscludeFn)))
                                        }
                                }

                                function byPriority(a, b) {
                                    var diff = b.priority - a.priority;
                                    return 0 !== diff ? diff : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
                                }

                                function assertNoDuplicate(what, previousDirective, directive, element) {
                                    function wrapModuleNameIfDefined(moduleName) {
                                        return moduleName ? " (module: " + moduleName + ")" : ""
                                    }
                                    if (previousDirective) throw $compileMinErr("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", previousDirective.name, wrapModuleNameIfDefined(previousDirective.$$moduleName), directive.name, wrapModuleNameIfDefined(directive.$$moduleName), what, startingTag(element))
                                }

                                function addTextInterpolateDirective(directives, text) {
                                    var interpolateFn = $interpolate(text, !0);
                                    interpolateFn && directives.push({
                                        priority: 0,
                                        compile: function (templateNode) {
                                            var templateNodeParent = templateNode.parent(),
                                                hasCompileParent = !!templateNodeParent.length;
                                            return hasCompileParent && compile.$$addBindingClass(templateNodeParent),
                                                function (scope, node) {
                                                    var parent = node.parent();
                                                    hasCompileParent || compile.$$addBindingClass(parent), compile.$$addBindingInfo(parent, interpolateFn.expressions), scope.$watch(interpolateFn, function (value) {
                                                        node[0].nodeValue = value
                                                    })
                                                }
                                        }
                                    })
                                }

                                function wrapTemplate(type, template) {
                                    switch (type = lowercase(type || "html")) {
                                        case "svg":
                                        case "math":
                                            var wrapper = window.document.createElement("div");
                                            return wrapper.innerHTML = "<" + type + ">" + template + "</" + type + ">", wrapper.childNodes[0].childNodes;
                                        default:
                                            return template
                                    }
                                }

                                function getTrustedContext(node, attrNormalizedName) {
                                    if ("srcdoc" === attrNormalizedName) return $sce.HTML;
                                    var tag = nodeName_(node);
                                    if ("src" === attrNormalizedName || "ngSrc" === attrNormalizedName) {
                                        if (["img", "video", "audio", "source", "track"].indexOf(tag) === -1) return $sce.RESOURCE_URL
                                    } else if ("xlinkHref" === attrNormalizedName || "form" === tag && "action" === attrNormalizedName || "link" === tag && "href" === attrNormalizedName) return $sce.RESOURCE_URL
                                }

                                function addAttrInterpolateDirective(node, directives, value, name, isNgAttr) {
                                    var trustedContext = getTrustedContext(node, name),
                                        mustHaveExpression = !isNgAttr,
                                        allOrNothing = ALL_OR_NOTHING_ATTRS[name] || isNgAttr,
                                        interpolateFn = $interpolate(value, mustHaveExpression, trustedContext, allOrNothing);
                                    if (interpolateFn) {
                                        if ("multiple" === name && "select" === nodeName_(node)) throw $compileMinErr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", startingTag(node));
                                        if (EVENT_HANDLER_ATTR_REGEXP.test(name)) throw $compileMinErr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                        directives.push({
                                            priority: 100,
                                            compile: function () {
                                                return {
                                                    pre: function (scope, element, attr) {
                                                        var $$observers = attr.$$observers || (attr.$$observers = createMap()),
                                                            newValue = attr[name];
                                                        newValue !== value && (interpolateFn = newValue && $interpolate(newValue, !0, trustedContext, allOrNothing), value = newValue), interpolateFn && (attr[name] = interpolateFn(scope), ($$observers[name] || ($$observers[name] = [])).$$inter = !0, (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function (newValue, oldValue) {
                                                            "class" === name && newValue !== oldValue ? attr.$updateClass(newValue, oldValue) : attr.$set(name, newValue)
                                                        }))
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }

                                function replaceWith($rootElement, elementsToRemove, newNode) {
                                    var i, ii, firstElementToRemove = elementsToRemove[0],
                                        removeCount = elementsToRemove.length,
                                        parent = firstElementToRemove.parentNode;
                                    if ($rootElement)
                                        for (i = 0, ii = $rootElement.length; i < ii; i++)
                                            if ($rootElement[i] === firstElementToRemove) {
                                                $rootElement[i++] = newNode;
                                                for (var j = i, j2 = j + removeCount - 1, jj = $rootElement.length; j < jj; j++, j2++) j2 < jj ? $rootElement[j] = $rootElement[j2] : delete $rootElement[j];
                                                $rootElement.length -= removeCount - 1, $rootElement.context === firstElementToRemove && ($rootElement.context = newNode);
                                                break
                                            } parent && parent.replaceChild(newNode, firstElementToRemove);
                                    var fragment = window.document.createDocumentFragment();
                                    for (i = 0; i < removeCount; i++) fragment.appendChild(elementsToRemove[i]);
                                    for (jqLite.hasData(firstElementToRemove) && (jqLite.data(newNode, jqLite.data(firstElementToRemove)), jqLite(firstElementToRemove).off("$destroy")), jqLite.cleanData(fragment.querySelectorAll("*")), i = 1; i < removeCount; i++) delete elementsToRemove[i];
                                    elementsToRemove[0] = newNode, elementsToRemove.length = 1
                                }

                                function cloneAndAnnotateFn(fn, annotation) {
                                    return extend(function () {
                                        return fn.apply(null, arguments)
                                    }, fn, annotation)
                                }

                                function invokeLinkFn(linkFn, scope, $element, attrs, controllers, transcludeFn) {
                                    try {
                                        linkFn(scope, $element, attrs, controllers, transcludeFn)
                                    } catch (e) {
                                        $exceptionHandler(e, startingTag($element))
                                    }
                                }

                                function initializeDirectiveBindings(scope, attrs, destination, bindings, directive) {
                                    function recordChanges(key, currentValue, previousValue) {
                                        !isFunction(destination.$onChanges) || currentValue === previousValue || currentValue !== currentValue && previousValue !== previousValue || (onChangesQueue || (scope.$$postDigest(flushOnChangesQueue), onChangesQueue = []), changes || (changes = {}, onChangesQueue.push(triggerOnChangesHook)), changes[key] && (previousValue = changes[key].previousValue), changes[key] = new SimpleChange(previousValue, currentValue))
                                    }

                                    function triggerOnChangesHook() {
                                        destination.$onChanges(changes), changes = void 0
                                    }
                                    var changes, removeWatchCollection = [],
                                        initialChanges = {};
                                    return forEach(bindings, function (definition, scopeName) {
                                        var lastValue, parentGet, parentSet, compare, removeWatch, attrName = definition.attrName,
                                            optional = definition.optional,
                                            mode = definition.mode;
                                        switch (mode) {
                                            case "@":
                                                optional || hasOwnProperty.call(attrs, attrName) || (destination[scopeName] = attrs[attrName] = void 0), removeWatch = attrs.$observe(attrName, function (value) {
                                                    if (isString(value) || isBoolean(value)) {
                                                        var oldValue = destination[scopeName];
                                                        recordChanges(scopeName, value, oldValue), destination[scopeName] = value
                                                    }
                                                }), attrs.$$observers[attrName].$$scope = scope, lastValue = attrs[attrName], isString(lastValue) ? destination[scopeName] = $interpolate(lastValue)(scope) : isBoolean(lastValue) && (destination[scopeName] = lastValue), initialChanges[scopeName] = new SimpleChange(_UNINITIALIZED_VALUE, destination[scopeName]), removeWatchCollection.push(removeWatch);
                                                break;
                                            case "=":
                                                if (!hasOwnProperty.call(attrs, attrName)) {
                                                    if (optional) break;
                                                    attrs[attrName] = void 0
                                                }
                                                if (optional && !attrs[attrName]) break;
                                                parentGet = $parse(attrs[attrName]), compare = parentGet.literal ? equals : function (a, b) {
                                                    return a === b || a !== a && b !== b
                                                }, parentSet = parentGet.assign || function () {
                                                    throw lastValue = destination[scopeName] = parentGet(scope), $compileMinErr("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", attrs[attrName], attrName, directive.name)
                                                }, lastValue = destination[scopeName] = parentGet(scope);
                                                var parentValueWatch = function (parentValue) {
                                                    return compare(parentValue, destination[scopeName]) || (compare(parentValue, lastValue) ? parentSet(scope, parentValue = destination[scopeName]) : destination[scopeName] = parentValue), lastValue = parentValue
                                                };
                                                parentValueWatch.$stateful = !0, removeWatch = definition.collection ? scope.$watchCollection(attrs[attrName], parentValueWatch) : scope.$watch($parse(attrs[attrName], parentValueWatch), null, parentGet.literal), removeWatchCollection.push(removeWatch);
                                                break;
                                            case "<":
                                                if (!hasOwnProperty.call(attrs, attrName)) {
                                                    if (optional) break;
                                                    attrs[attrName] = void 0
                                                }
                                                if (optional && !attrs[attrName]) break;
                                                parentGet = $parse(attrs[attrName]);
                                                var deepWatch = parentGet.literal,
                                                    initialValue = destination[scopeName] = parentGet(scope);
                                                initialChanges[scopeName] = new SimpleChange(_UNINITIALIZED_VALUE, destination[scopeName]), removeWatch = scope.$watch(parentGet, function (newValue, oldValue) {
                                                    if (oldValue === newValue) {
                                                        if (oldValue === initialValue || deepWatch && equals(oldValue, initialValue)) return;
                                                        oldValue = initialValue
                                                    }
                                                    recordChanges(scopeName, newValue, oldValue), destination[scopeName] = newValue
                                                }, deepWatch), removeWatchCollection.push(removeWatch);
                                                break;
                                            case "&":
                                                if (parentGet = attrs.hasOwnProperty(attrName) ? $parse(attrs[attrName]) : noop, parentGet === noop && optional) break;
                                                destination[scopeName] = function (locals) {
                                                    return parentGet(scope, locals)
                                                }
                                        }
                                    }), {
                                        initialChanges: initialChanges,
                                        removeWatches: removeWatchCollection.length && function () {
                                            for (var i = 0, ii = removeWatchCollection.length; i < ii; ++i) removeWatchCollection[i]()
                                        }
                                    }
                                }
                                var onChangesQueue, SIMPLE_ATTR_NAME = /^\w/,
                                    specialAttrHolder = window.document.createElement("div"),
                                    commentDirectivesEnabled = commentDirectivesEnabledConfig,
                                    cssClassDirectivesEnabled = cssClassDirectivesEnabledConfig,
                                    onChangesTtl = TTL;
                                Attributes.prototype = {
                                    $normalize: directiveNormalize,
                                    $addClass: function (classVal) {
                                        classVal && classVal.length > 0 && $animate.addClass(this.$$element, classVal)
                                    },
                                    $removeClass: function (classVal) {
                                        classVal && classVal.length > 0 && $animate.removeClass(this.$$element, classVal)
                                    },
                                    $updateClass: function (newClasses, oldClasses) {
                                        var toAdd = tokenDifference(newClasses, oldClasses);
                                        toAdd && toAdd.length && $animate.addClass(this.$$element, toAdd);
                                        var toRemove = tokenDifference(oldClasses, newClasses);
                                        toRemove && toRemove.length && $animate.removeClass(this.$$element, toRemove)
                                    },
                                    $set: function (key, value, writeAttr, attrName) {
                                        var nodeName, node = this.$$element[0],
                                            booleanKey = getBooleanAttrName(node, key),
                                            aliasedKey = getAliasedAttrName(key),
                                            observer = key;
                                        if (booleanKey ? (this.$$element.prop(key, value), attrName = booleanKey) : aliasedKey && (this[aliasedKey] = value, observer = aliasedKey), this[key] = value, attrName ? this.$attr[key] = attrName : (attrName = this.$attr[key], attrName || (this.$attr[key] = attrName = snake_case(key, "-"))), nodeName = nodeName_(this.$$element), "a" === nodeName && ("href" === key || "xlinkHref" === key) || "img" === nodeName && "src" === key) this[key] = value = $$sanitizeUri(value, "src" === key);
                                        else if ("img" === nodeName && "srcset" === key && isDefined(value)) {
                                            for (var result = "", trimmedSrcset = trim(value), srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, pattern = /\s/.test(trimmedSrcset) ? srcPattern : /(,)/, rawUris = trimmedSrcset.split(pattern), nbrUrisWith2parts = Math.floor(rawUris.length / 2), i = 0; i < nbrUrisWith2parts; i++) {
                                                var innerIdx = 2 * i;
                                                result += $$sanitizeUri(trim(rawUris[innerIdx]), !0), result += " " + trim(rawUris[innerIdx + 1])
                                            }
                                            var lastTuple = trim(rawUris[2 * i]).split(/\s/);
                                            result += $$sanitizeUri(trim(lastTuple[0]), !0), 2 === lastTuple.length && (result += " " + trim(lastTuple[1])), this[key] = value = result
                                        }
                                        writeAttr !== !1 && (null === value || isUndefined(value) ? this.$$element.removeAttr(attrName) : SIMPLE_ATTR_NAME.test(attrName) ? this.$$element.attr(attrName, value) : setSpecialAttr(this.$$element[0], attrName, value));
                                        var $$observers = this.$$observers;
                                        $$observers && forEach($$observers[observer], function (fn) {
                                            try {
                                                fn(value)
                                            } catch (e) {
                                                $exceptionHandler(e)
                                            }
                                        })
                                    },
                                    $observe: function (key, fn) {
                                        var attrs = this,
                                            $$observers = attrs.$$observers || (attrs.$$observers = createMap()),
                                            listeners = $$observers[key] || ($$observers[key] = []);
                                        return listeners.push(fn), $rootScope.$evalAsync(function () {
                                                listeners.$$inter || !attrs.hasOwnProperty(key) || isUndefined(attrs[key]) || fn(attrs[key])
                                            }),
                                            function () {
                                                arrayRemove(listeners, fn)
                                            }
                                    }
                                };
                                var startSymbol = $interpolate.startSymbol(),
                                    endSymbol = $interpolate.endSymbol(),
                                    denormalizeTemplate = "{{" === startSymbol && "}}" === endSymbol ? identity : function (template) {
                                        return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol)
                                    },
                                    NG_ATTR_BINDING = /^ngAttr[A-Z]/,
                                    MULTI_ELEMENT_DIR_RE = /^(.+)Start$/;
                                return compile.$$addBindingInfo = debugInfoEnabled ? function ($element, binding) {
                                    var bindings = $element.data("$binding") || [];
                                    isArray(binding) ? bindings = bindings.concat(binding) : bindings.push(binding), $element.data("$binding", bindings)
                                } : noop, compile.$$addBindingClass = debugInfoEnabled ? function ($element) {
                                    safeAddClass($element, "ng-binding")
                                } : noop, compile.$$addScopeInfo = debugInfoEnabled ? function ($element, scope, isolated, noTemplate) {
                                    var dataName = isolated ? noTemplate ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                                    $element.data(dataName, scope)
                                } : noop, compile.$$addScopeClass = debugInfoEnabled ? function ($element, isolated) {
                                    safeAddClass($element, isolated ? "ng-isolate-scope" : "ng-scope")
                                } : noop, compile.$$createComment = function (directiveName, comment) {
                                    var content = "";
                                    return debugInfoEnabled && (content = " " + (directiveName || "") + ": ", comment && (content += comment + " ")), window.document.createComment(content)
                                }, compile
                            }]
                        }

                        function SimpleChange(previous, current) {
                            this.previousValue = previous, this.currentValue = current
                        }

                        function directiveNormalize(name) {
                            return name.replace(PREFIX_REGEXP, "").replace(SPECIAL_CHARS_REGEXP, fnCamelCaseReplace)
                        }

                        function tokenDifference(str1, str2) {
                            var values = "",
                                tokens1 = str1.split(/\s+/),
                                tokens2 = str2.split(/\s+/);
                            outer: for (var i = 0; i < tokens1.length; i++) {
                                for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
                                    if (token === tokens2[j]) continue outer;
                                values += (values.length > 0 ? " " : "") + token
                            }
                            return values
                        }

                        function removeComments(jqNodes) {
                            jqNodes = jqLite(jqNodes);
                            var i = jqNodes.length;
                            if (i <= 1) return jqNodes;
                            for (; i--;) {
                                var node = jqNodes[i];
                                (node.nodeType === NODE_TYPE_COMMENT || node.nodeType === NODE_TYPE_TEXT && "" === node.nodeValue.trim()) && splice.call(jqNodes, i, 1)
                            }
                            return jqNodes
                        }

                        function identifierForController(controller, ident) {
                            if (ident && isString(ident)) return ident;
                            if (isString(controller)) {
                                var match = CNTRL_REG.exec(controller);
                                if (match) return match[3]
                            }
                        }

                        function $ControllerProvider() {
                            var controllers = {},
                                globals = !1;
                            this.has = function (name) {
                                return controllers.hasOwnProperty(name)
                            }, this.register = function (name, constructor) {
                                assertNotHasOwnProperty(name, "controller"), isObject(name) ? extend(controllers, name) : controllers[name] = constructor
                            }, this.allowGlobals = function () {
                                globals = !0
                            }, this.$get = ["$injector", "$window", function ($injector, $window) {
                                function addIdentifier(locals, identifier, instance, name) {
                                    if (!locals || !isObject(locals.$scope)) throw minErr("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", name, identifier);
                                    locals.$scope[identifier] = instance
                                }
                                return function (expression, locals, later, ident) {
                                    var instance, match, constructor, identifier;
                                    if (later = later === !0, ident && isString(ident) && (identifier = ident), isString(expression)) {
                                        if (match = expression.match(CNTRL_REG), !match) throw $controllerMinErr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", expression);
                                        if (constructor = match[1], identifier = identifier || match[3], expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, !0) || (globals ? getter($window, constructor, !0) : void 0), !expression) throw $controllerMinErr("ctrlreg", "The controller with the name '{0}' is not registered.", constructor);
                                        assertArgFn(expression, constructor, !0)
                                    }
                                    if (later) {
                                        var controllerPrototype = (isArray(expression) ? expression[expression.length - 1] : expression).prototype;
                                        return instance = Object.create(controllerPrototype || null), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), extend(function () {
                                            var result = $injector.invoke(expression, instance, locals, constructor);
                                            return result !== instance && (isObject(result) || isFunction(result)) && (instance = result, identifier && addIdentifier(locals, identifier, instance, constructor || expression.name)), instance
                                        }, {
                                            instance: instance,
                                            identifier: identifier
                                        })
                                    }
                                    return instance = $injector.instantiate(expression, locals, constructor), identifier && addIdentifier(locals, identifier, instance, constructor || expression.name), instance
                                }
                            }]
                        }

                        function $DocumentProvider() {
                            this.$get = ["$window", function (window) {
                                return jqLite(window.document)
                            }]
                        }

                        function $$IsDocumentHiddenProvider() {
                            this.$get = ["$document", "$rootScope", function ($document, $rootScope) {
                                function changeListener() {
                                    hidden = doc.hidden
                                }
                                var doc = $document[0],
                                    hidden = doc && doc.hidden;
                                return $document.on("visibilitychange", changeListener), $rootScope.$on("$destroy", function () {
                                        $document.off("visibilitychange", changeListener)
                                    }),
                                    function () {
                                        return hidden
                                    }
                            }]
                        }

                        function $ExceptionHandlerProvider() {
                            this.$get = ["$log", function ($log) {
                                return function (exception, cause) {
                                    $log.error.apply($log, arguments)
                                }
                            }]
                        }

                        function serializeValue(v) {
                            return isObject(v) ? isDate(v) ? v.toISOString() : toJson(v) : v
                        }

                        function $HttpParamSerializerProvider() {
                            this.$get = function () {
                                return function (params) {
                                    if (!params) return "";
                                    var parts = [];
                                    return forEachSorted(params, function (value, key) {
                                        null === value || isUndefined(value) || (isArray(value) ? forEach(value, function (v) {
                                            parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(v)))
                                        }) : parts.push(encodeUriQuery(key) + "=" + encodeUriQuery(serializeValue(value))))
                                    }), parts.join("&")
                                }
                            }
                        }

                        function $HttpParamSerializerJQLikeProvider() {
                            this.$get = function () {
                                return function (params) {
                                    function serialize(toSerialize, prefix, topLevel) {
                                        null === toSerialize || isUndefined(toSerialize) || (isArray(toSerialize) ? forEach(toSerialize, function (value, index) {
                                            serialize(value, prefix + "[" + (isObject(value) ? index : "") + "]")
                                        }) : isObject(toSerialize) && !isDate(toSerialize) ? forEachSorted(toSerialize, function (value, key) {
                                            serialize(value, prefix + (topLevel ? "" : "[") + key + (topLevel ? "" : "]"))
                                        }) : parts.push(encodeUriQuery(prefix) + "=" + encodeUriQuery(serializeValue(toSerialize))))
                                    }
                                    if (!params) return "";
                                    var parts = [];
                                    return serialize(params, "", !0), parts.join("&")
                                }
                            }
                        }

                        function defaultHttpResponseTransform(data, headers) {
                            if (isString(data)) {
                                var tempData = data.replace(JSON_PROTECTION_PREFIX, "").trim();
                                if (tempData) {
                                    var contentType = headers("Content-Type");
                                    (contentType && 0 === contentType.indexOf(APPLICATION_JSON) || isJsonLike(tempData)) && (data = fromJson(tempData))
                                }
                            }
                            return data
                        }

                        function isJsonLike(str) {
                            var jsonStart = str.match(JSON_START);
                            return jsonStart && JSON_ENDS[jsonStart[0]].test(str)
                        }

                        function parseHeaders(headers) {
                            function fillInParsed(key, val) {
                                key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val)
                            }
                            var i, parsed = createMap();
                            return isString(headers) ? forEach(headers.split("\n"), function (line) {
                                i = line.indexOf(":"), fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)))
                            }) : isObject(headers) && forEach(headers, function (headerVal, headerKey) {
                                fillInParsed(lowercase(headerKey), trim(headerVal))
                            }), parsed
                        }

                        function headersGetter(headers) {
                            var headersObj;
                            return function (name) {
                                if (headersObj || (headersObj = parseHeaders(headers)), name) {
                                    var value = headersObj[lowercase(name)];
                                    return void 0 === value && (value = null), value
                                }
                                return headersObj
                            }
                        }

                        function transformData(data, headers, status, fns) {
                            return isFunction(fns) ? fns(data, headers, status) : (forEach(fns, function (fn) {
                                data = fn(data, headers, status)
                            }), data)
                        }

                        function isSuccess(status) {
                            return 200 <= status && status < 300
                        }

                        function $HttpProvider() {
                            var defaults = this.defaults = {
                                    transformResponse: [defaultHttpResponseTransform],
                                    transformRequest: [function (d) {
                                        return !isObject(d) || isFile(d) || isBlob(d) || isFormData(d) ? d : toJson(d)
                                    }],
                                    headers: {
                                        common: {
                                            Accept: "application/json, text/plain, */*"
                                        },
                                        post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                                        put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
                                        patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
                                    },
                                    xsrfCookieName: "XSRF-TOKEN",
                                    xsrfHeaderName: "X-XSRF-TOKEN",
                                    paramSerializer: "$httpParamSerializer",
                                    jsonpCallbackParam: "callback"
                                },
                                useApplyAsync = !1;
                            this.useApplyAsync = function (value) {
                                return isDefined(value) ? (useApplyAsync = !!value, this) : useApplyAsync
                            };
                            var interceptorFactories = this.interceptors = [];
                            this.$get = ["$browser", "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function ($browser, $httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector, $sce) {
                                function $http(requestConfig) {
                                    function chainInterceptors(promise, interceptors) {
                                        for (var i = 0, ii = interceptors.length; i < ii;) {
                                            var thenFn = interceptors[i++],
                                                rejectFn = interceptors[i++];
                                            promise = promise.then(thenFn, rejectFn)
                                        }
                                        return interceptors.length = 0, promise
                                    }

                                    function completeOutstandingRequest() {
                                        $browser.$$completeOutstandingRequest(noop)
                                    }

                                    function executeHeaderFns(headers, config) {
                                        var headerContent, processedHeaders = {};
                                        return forEach(headers, function (headerFn, header) {
                                            isFunction(headerFn) ? (headerContent = headerFn(config), null != headerContent && (processedHeaders[header] = headerContent)) : processedHeaders[header] = headerFn
                                        }), processedHeaders
                                    }

                                    function mergeHeaders(config) {
                                        var defHeaderName, lowercaseDefHeaderName, reqHeaderName, defHeaders = defaults.headers,
                                            reqHeaders = extend({}, config.headers);
                                        defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);
                                        defaultHeadersIteration: for (defHeaderName in defHeaders) {
                                            lowercaseDefHeaderName = lowercase(defHeaderName);
                                            for (reqHeaderName in reqHeaders)
                                                if (lowercase(reqHeaderName) === lowercaseDefHeaderName) continue defaultHeadersIteration;
                                            reqHeaders[defHeaderName] = defHeaders[defHeaderName]
                                        }
                                        return executeHeaderFns(reqHeaders, shallowCopy(config))
                                    }

                                    function serverRequest(config) {
                                        var headers = config.headers,
                                            reqData = transformData(config.data, headersGetter(headers), void 0, config.transformRequest);
                                        return isUndefined(reqData) && forEach(headers, function (value, header) {
                                            "content-type" === lowercase(header) && delete headers[header]
                                        }), isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials) && (config.withCredentials = defaults.withCredentials), sendReq(config, reqData).then(transformResponse, transformResponse)
                                    }

                                    function transformResponse(response) {
                                        var resp = extend({}, response);
                                        return resp.data = transformData(response.data, response.headers, response.status, config.transformResponse), isSuccess(response.status) ? resp : $q.reject(resp)
                                    }
                                    if (!isObject(requestConfig)) throw minErr("$http")("badreq", "Http request configuration must be an object.  Received: {0}", requestConfig);
                                    if (!isString($sce.valueOf(requestConfig.url))) throw minErr("$http")("badreq", "Http request configuration url must be a string or a $sce trusted object.  Received: {0}", requestConfig.url);
                                    var config = extend({
                                        method: "get",
                                        transformRequest: defaults.transformRequest,
                                        transformResponse: defaults.transformResponse,
                                        paramSerializer: defaults.paramSerializer,
                                        jsonpCallbackParam: defaults.jsonpCallbackParam
                                    }, requestConfig);
                                    config.headers = mergeHeaders(requestConfig), config.method = uppercase(config.method), config.paramSerializer = isString(config.paramSerializer) ? $injector.get(config.paramSerializer) : config.paramSerializer, $browser.$$incOutstandingRequestCount();
                                    var requestInterceptors = [],
                                        responseInterceptors = [],
                                        promise = $q.resolve(config);
                                    return forEach(reversedInterceptors, function (interceptor) {
                                        (interceptor.request || interceptor.requestError) && requestInterceptors.unshift(interceptor.request, interceptor.requestError), (interceptor.response || interceptor.responseError) && responseInterceptors.push(interceptor.response, interceptor.responseError)
                                    }), promise = chainInterceptors(promise, requestInterceptors), promise = promise.then(serverRequest), promise = chainInterceptors(promise, responseInterceptors), promise = promise["finally"](completeOutstandingRequest)
                                }

                                function createShortMethods(names) {
                                    forEach(arguments, function (name) {
                                        $http[name] = function (url, config) {
                                            return $http(extend({}, config || {}, {
                                                method: name,
                                                url: url
                                            }))
                                        }
                                    })
                                }

                                function createShortMethodsWithData(name) {
                                    forEach(arguments, function (name) {
                                        $http[name] = function (url, data, config) {
                                            return $http(extend({}, config || {}, {
                                                method: name,
                                                url: url,
                                                data: data
                                            }))
                                        }
                                    })
                                }

                                function sendReq(config, reqData) {
                                    function createApplyHandlers(eventHandlers) {
                                        if (eventHandlers) {
                                            var applyHandlers = {};
                                            return forEach(eventHandlers, function (eventHandler, key) {
                                                applyHandlers[key] = function (event) {
                                                    function callEventHandler() {
                                                        eventHandler(event)
                                                    }
                                                    useApplyAsync ? $rootScope.$applyAsync(callEventHandler) : $rootScope.$$phase ? callEventHandler() : $rootScope.$apply(callEventHandler)
                                                }
                                            }), applyHandlers
                                        }
                                    }

                                    function done(status, response, headersString, statusText) {
                                        function resolveHttpPromise() {
                                            resolvePromise(response, status, headersString, statusText)
                                        }
                                        cache && (isSuccess(status) ? cache.put(url, [status, response, parseHeaders(headersString), statusText]) : cache.remove(url)), useApplyAsync ? $rootScope.$applyAsync(resolveHttpPromise) : (resolveHttpPromise(), $rootScope.$$phase || $rootScope.$apply())
                                    }

                                    function resolvePromise(response, status, headers, statusText) {
                                        status = status >= -1 ? status : 0, (isSuccess(status) ? deferred.resolve : deferred.reject)({
                                            data: response,
                                            status: status,
                                            headers: headersGetter(headers),
                                            config: config,
                                            statusText: statusText
                                        })
                                    }

                                    function resolvePromiseWithResult(result) {
                                        resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText)
                                    }

                                    function removePendingReq() {
                                        var idx = $http.pendingRequests.indexOf(config);
                                        idx !== -1 && $http.pendingRequests.splice(idx, 1)
                                    }
                                    var cache, cachedResp, deferred = $q.defer(),
                                        promise = deferred.promise,
                                        reqHeaders = config.headers,
                                        isJsonp = "jsonp" === lowercase(config.method),
                                        url = config.url;
                                    if (isJsonp ? url = $sce.getTrustedResourceUrl(url) : isString(url) || (url = $sce.valueOf(url)), url = buildUrl(url, config.paramSerializer(config.params)), isJsonp && (url = sanitizeJsonpCallbackParam(url, config.jsonpCallbackParam)), $http.pendingRequests.push(config), promise.then(removePendingReq, removePendingReq), !config.cache && !defaults.cache || config.cache === !1 || "GET" !== config.method && "JSONP" !== config.method || (cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache), cache && (cachedResp = cache.get(url), isDefined(cachedResp) ? isPromiseLike(cachedResp) ? cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult) : isArray(cachedResp) ? resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]) : resolvePromise(cachedResp, 200, {}, "OK") : cache.put(url, promise)), isUndefined(cachedResp)) {
                                        var xsrfValue = urlIsSameOrigin(config.url) ? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName] : void 0;
                                        xsrfValue && (reqHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue), $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType, createApplyHandlers(config.eventHandlers), createApplyHandlers(config.uploadEventHandlers))
                                    }
                                    return promise
                                }

                                function buildUrl(url, serializedParams) {
                                    return serializedParams.length > 0 && (url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams), url
                                }

                                function sanitizeJsonpCallbackParam(url, key) {
                                    if (/[&?][^=]+=JSON_CALLBACK/.test(url)) throw $httpMinErr("badjsonp", 'Illegal use of JSON_CALLBACK in url, "{0}"', url);
                                    var callbackParamRegex = new RegExp("[&?]" + key + "=");
                                    if (callbackParamRegex.test(url)) throw $httpMinErr("badjsonp", 'Illegal use of callback param, "{0}", in url, "{1}"', key, url);
                                    return url += (url.indexOf("?") === -1 ? "?" : "&") + key + "=JSON_CALLBACK"
                                }
                                var defaultCache = $cacheFactory("$http");
                                defaults.paramSerializer = isString(defaults.paramSerializer) ? $injector.get(defaults.paramSerializer) : defaults.paramSerializer;
                                var reversedInterceptors = [];
                                return forEach(interceptorFactories, function (interceptorFactory) {
                                    reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory))
                                }), $http.pendingRequests = [], createShortMethods("get", "delete", "head", "jsonp"), createShortMethodsWithData("post", "put", "patch"), $http.defaults = defaults, $http
                            }]
                        }

                        function $xhrFactoryProvider() {
                            this.$get = function () {
                                return function () {
                                    return new window.XMLHttpRequest
                                }
                            }
                        }

                        function $HttpBackendProvider() {
                            this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function ($browser, $jsonpCallbacks, $document, $xhrFactory) {
                                return createHttpBackend($browser, $xhrFactory, $browser.defer, $jsonpCallbacks, $document[0])
                            }]
                        }

                        function createHttpBackend($browser, createXhr, $browserDefer, callbacks, rawDocument) {
                            function jsonpReq(url, callbackPath, done) {
                                url = url.replace("JSON_CALLBACK", callbackPath);
                                var script = rawDocument.createElement("script"),
                                    callback = null;
                                return script.type = "text/javascript", script.src = url, script.async = !0, callback = function (event) {
                                    script.removeEventListener("load", callback), script.removeEventListener("error", callback), rawDocument.body.removeChild(script), script = null;
                                    var status = -1,
                                        text = "unknown";
                                    event && ("load" !== event.type || callbacks.wasCalled(callbackPath) || (event = {
                                        type: "error"
                                    }), text = event.type, status = "error" === event.type ? 404 : 200), done && done(status, text)
                                }, script.addEventListener("load", callback), script.addEventListener("error", callback), rawDocument.body.appendChild(script), callback
                            }
                            return function (method, url, post, callback, headers, timeout, withCredentials, responseType, eventHandlers, uploadEventHandlers) {
                                function timeoutRequest() {
                                    jsonpDone && jsonpDone(), xhr && xhr.abort()
                                }

                                function completeRequest(callback, status, response, headersString, statusText) {
                                    isDefined(timeoutId) && $browserDefer.cancel(timeoutId), jsonpDone = xhr = null, callback(status, response, headersString, statusText)
                                }
                                if (url = url || $browser.url(), "jsonp" === lowercase(method)) var callbackPath = callbacks.createCallback(url),
                                    jsonpDone = jsonpReq(url, callbackPath, function (status, text) {
                                        var response = 200 === status && callbacks.getResponse(callbackPath);
                                        completeRequest(callback, status, response, "", text), callbacks.removeCallback(callbackPath)
                                    });
                                else {
                                    var xhr = createXhr(method, url);
                                    xhr.open(method, url, !0), forEach(headers, function (value, key) {
                                        isDefined(value) && xhr.setRequestHeader(key, value)
                                    }), xhr.onload = function () {
                                        var statusText = xhr.statusText || "",
                                            response = "response" in xhr ? xhr.response : xhr.responseText,
                                            status = 1223 === xhr.status ? 204 : xhr.status;
                                        0 === status && (status = response ? 200 : "file" === urlResolve(url).protocol ? 404 : 0), completeRequest(callback, status, response, xhr.getAllResponseHeaders(), statusText)
                                    };
                                    var requestError = function () {
                                        completeRequest(callback, -1, null, null, "")
                                    };
                                    if (xhr.onerror = requestError, xhr.onabort = requestError, xhr.ontimeout = requestError, forEach(eventHandlers, function (value, key) {
                                            xhr.addEventListener(key, value)
                                        }), forEach(uploadEventHandlers, function (value, key) {
                                            xhr.upload.addEventListener(key, value)
                                        }), withCredentials && (xhr.withCredentials = !0), responseType) try {
                                        xhr.responseType = responseType
                                    } catch (e) {
                                        if ("json" !== responseType) throw e
                                    }
                                    xhr.send(isUndefined(post) ? null : post)
                                }
                                if (timeout > 0) var timeoutId = $browserDefer(timeoutRequest, timeout);
                                else isPromiseLike(timeout) && timeout.then(timeoutRequest)
                            }
                        }

                        function $InterpolateProvider() {
                            var startSymbol = "{{",
                                endSymbol = "}}";
                            this.startSymbol = function (value) {
                                return value ? (startSymbol = value, this) : startSymbol
                            }, this.endSymbol = function (value) {
                                return value ? (endSymbol = value, this) : endSymbol
                            }, this.$get = ["$parse", "$exceptionHandler", "$sce", function ($parse, $exceptionHandler, $sce) {
                                function escape(ch) {
                                    return "\\\\\\" + ch
                                }

                                function unescapeText(text) {
                                    return text.replace(escapedStartRegexp, startSymbol).replace(escapedEndRegexp, endSymbol)
                                }

                                function constantWatchDelegate(scope, listener, objectEquality, constantInterp) {
                                    var unwatch = scope.$watch(function (scope) {
                                        return unwatch(), constantInterp(scope)
                                    }, listener, objectEquality);
                                    return unwatch
                                }

                                function $interpolate(text, mustHaveExpression, trustedContext, allOrNothing) {
                                    function parseStringifyInterceptor(value) {
                                        try {
                                            return value = getValue(value), allOrNothing && !isDefined(value) ? value : stringify(value)
                                        } catch (err) {
                                            $exceptionHandler($interpolateMinErr.interr(text, err))
                                        }
                                    }
                                    if (!text.length || text.indexOf(startSymbol) === -1) {
                                        var constantInterp;
                                        if (!mustHaveExpression) {
                                            var unescapedText = unescapeText(text);
                                            constantInterp = valueFn(unescapedText), constantInterp.exp = text, constantInterp.expressions = [], constantInterp.$$watchDelegate = constantWatchDelegate
                                        }
                                        return constantInterp
                                    }
                                    allOrNothing = !!allOrNothing;
                                    for (var startIndex, endIndex, exp, index = 0, expressions = [], parseFns = [], textLength = text.length, concat = [], expressionPositions = []; index < textLength;) {
                                        if ((startIndex = text.indexOf(startSymbol, index)) === -1 || (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) === -1) {
                                            index !== textLength && concat.push(unescapeText(text.substring(index)));
                                            break
                                        }
                                        index !== startIndex && concat.push(unescapeText(text.substring(index, startIndex))), exp = text.substring(startIndex + startSymbolLength, endIndex), expressions.push(exp), parseFns.push($parse(exp, parseStringifyInterceptor)), index = endIndex + endSymbolLength, expressionPositions.push(concat.length), concat.push("")
                                    }
                                    if (trustedContext && concat.length > 1 && $interpolateMinErr.throwNoconcat(text), !mustHaveExpression || expressions.length) {
                                        var compute = function (values) {
                                                for (var i = 0, ii = expressions.length; i < ii; i++) {
                                                    if (allOrNothing && isUndefined(values[i])) return;
                                                    concat[expressionPositions[i]] = values[i]
                                                }
                                                return concat.join("")
                                            },
                                            getValue = function (value) {
                                                return trustedContext ? $sce.getTrusted(trustedContext, value) : $sce.valueOf(value)
                                            };
                                        return extend(function (context) {
                                            var i = 0,
                                                ii = expressions.length,
                                                values = new Array(ii);
                                            try {
                                                for (; i < ii; i++) values[i] = parseFns[i](context);
                                                return compute(values)
                                            } catch (err) {
                                                $exceptionHandler($interpolateMinErr.interr(text, err))
                                            }
                                        }, {
                                            exp: text,
                                            expressions: expressions,
                                            $$watchDelegate: function (scope, listener) {
                                                var lastValue;
                                                return scope.$watchGroup(parseFns, function (values, oldValues) {
                                                    var currValue = compute(values);
                                                    isFunction(listener) && listener.call(this, currValue, values !== oldValues ? lastValue : currValue, scope), lastValue = currValue
                                                })
                                            }
                                        })
                                    }
                                }
                                var startSymbolLength = startSymbol.length,
                                    endSymbolLength = endSymbol.length,
                                    escapedStartRegexp = new RegExp(startSymbol.replace(/./g, escape), "g"),
                                    escapedEndRegexp = new RegExp(endSymbol.replace(/./g, escape), "g");
                                return $interpolate.startSymbol = function () {
                                    return startSymbol
                                }, $interpolate.endSymbol = function () {
                                    return endSymbol
                                }, $interpolate
                            }]
                        }

                        function $IntervalProvider() {
                            this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function ($rootScope, $window, $q, $$q, $browser) {
                                function interval(fn, delay, count, invokeApply) {
                                    function callback() {
                                        hasParams ? fn.apply(null, args) : fn(iteration)
                                    }
                                    var hasParams = arguments.length > 4,
                                        args = hasParams ? sliceArgs(arguments, 4) : [],
                                        setInterval = $window.setInterval,
                                        clearInterval = $window.clearInterval,
                                        iteration = 0,
                                        skipApply = isDefined(invokeApply) && !invokeApply,
                                        deferred = (skipApply ? $$q : $q).defer(),
                                        promise = deferred.promise;
                                    return count = isDefined(count) ? count : 0, promise.$$intervalId = setInterval(function () {
                                        skipApply ? $browser.defer(callback) : $rootScope.$evalAsync(callback), deferred.notify(iteration++), count > 0 && iteration >= count && (deferred.resolve(iteration), clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId]), skipApply || $rootScope.$apply()
                                    }, delay), intervals[promise.$$intervalId] = deferred, promise
                                }
                                var intervals = {};
                                return interval.cancel = function (promise) {
                                    return !!(promise && promise.$$intervalId in intervals) && (intervals[promise.$$intervalId].promise["catch"](noop), intervals[promise.$$intervalId].reject("canceled"), $window.clearInterval(promise.$$intervalId), delete intervals[promise.$$intervalId], !0)
                                }, interval
                            }]
                        }

                        function encodePath(path) {
                            for (var segments = path.split("/"), i = segments.length; i--;) segments[i] = encodeUriSegment(segments[i]);
                            return segments.join("/")
                        }

                        function parseAbsoluteUrl(absoluteUrl, locationObj) {
                            var parsedUrl = urlResolve(absoluteUrl);
                            locationObj.$$protocol = parsedUrl.protocol, locationObj.$$host = parsedUrl.hostname, locationObj.$$port = toInt(parsedUrl.port) || DEFAULT_PORTS[parsedUrl.protocol] || null
                        }

                        function parseAppUrl(url, locationObj) {
                            if (DOUBLE_SLASH_REGEX.test(url)) throw $locationMinErr("badpath", 'Invalid url "{0}".', url);
                            var prefixed = "/" !== url.charAt(0);
                            prefixed && (url = "/" + url);
                            var match = urlResolve(url);
                            locationObj.$$path = decodeURIComponent(prefixed && "/" === match.pathname.charAt(0) ? match.pathname.substring(1) : match.pathname), locationObj.$$search = parseKeyValue(match.search), locationObj.$$hash = decodeURIComponent(match.hash), locationObj.$$path && "/" !== locationObj.$$path.charAt(0) && (locationObj.$$path = "/" + locationObj.$$path)
                        }

                        function startsWith(str, search) {
                            return str.slice(0, search.length) === search
                        }

                        function stripBaseUrl(base, url) {
                            if (startsWith(url, base)) return url.substr(base.length)
                        }

                        function stripHash(url) {
                            var index = url.indexOf("#");
                            return index === -1 ? url : url.substr(0, index)
                        }

                        function trimEmptyHash(url) {
                            return url.replace(/(#.+)|#$/, "$1")
                        }

                        function stripFile(url) {
                            return url.substr(0, stripHash(url).lastIndexOf("/") + 1)
                        }

                        function serverBase(url) {
                            return url.substring(0, url.indexOf("/", url.indexOf("//") + 2))
                        }

                        function LocationHtml5Url(appBase, appBaseNoFile, basePrefix) {
                            this.$$html5 = !0, basePrefix = basePrefix || "", parseAbsoluteUrl(appBase, this), this.$$parse = function (url) {
                                var pathUrl = stripBaseUrl(appBaseNoFile, url);
                                if (!isString(pathUrl)) throw $locationMinErr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', url, appBaseNoFile);
                                parseAppUrl(pathUrl, this), this.$$path || (this.$$path = "/"), this.$$compose()
                            }, this.$$compose = function () {
                                var search = toKeyValue(this.$$search),
                                    hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                                this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBaseNoFile + this.$$url.substr(1), this.$$urlUpdatedByLocation = !0
                            }, this.$$parseLinkUrl = function (url, relHref) {
                                if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
                                var appUrl, prevAppUrl, rewrittenUrl;
                                return isDefined(appUrl = stripBaseUrl(appBase, url)) ? (prevAppUrl = appUrl, rewrittenUrl = basePrefix && isDefined(appUrl = stripBaseUrl(basePrefix, appUrl)) ? appBaseNoFile + (stripBaseUrl("/", appUrl) || appUrl) : appBase + prevAppUrl) : isDefined(appUrl = stripBaseUrl(appBaseNoFile, url)) ? rewrittenUrl = appBaseNoFile + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
                            }
                        }

                        function LocationHashbangUrl(appBase, appBaseNoFile, hashPrefix) {
                            parseAbsoluteUrl(appBase, this), this.$$parse = function (url) {
                                function removeWindowsDriveName(path, url, base) {
                                    var firstPathSegmentMatch, windowsFilePathExp = /^\/[A-Z]:(\/.*)/;
                                    return startsWith(url, base) && (url = url.replace(base, "")), windowsFilePathExp.exec(url) ? path : (firstPathSegmentMatch = windowsFilePathExp.exec(path), firstPathSegmentMatch ? firstPathSegmentMatch[1] : path)
                                }
                                var withoutHashUrl, withoutBaseUrl = stripBaseUrl(appBase, url) || stripBaseUrl(appBaseNoFile, url);
                                isUndefined(withoutBaseUrl) || "#" !== withoutBaseUrl.charAt(0) ? this.$$html5 ? withoutHashUrl = withoutBaseUrl : (withoutHashUrl = "", isUndefined(withoutBaseUrl) && (appBase = url, this.replace())) : (withoutHashUrl = stripBaseUrl(hashPrefix, withoutBaseUrl), isUndefined(withoutHashUrl) && (withoutHashUrl = withoutBaseUrl)), parseAppUrl(withoutHashUrl, this), this.$$path = removeWindowsDriveName(this.$$path, withoutHashUrl, appBase), this.$$compose()
                            }, this.$$compose = function () {
                                var search = toKeyValue(this.$$search),
                                    hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                                this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : ""), this.$$urlUpdatedByLocation = !0
                            }, this.$$parseLinkUrl = function (url, relHref) {
                                return stripHash(appBase) === stripHash(url) && (this.$$parse(url), !0)
                            }
                        }

                        function LocationHashbangInHtml5Url(appBase, appBaseNoFile, hashPrefix) {
                            this.$$html5 = !0, LocationHashbangUrl.apply(this, arguments), this.$$parseLinkUrl = function (url, relHref) {
                                if (relHref && "#" === relHref[0]) return this.hash(relHref.slice(1)), !0;
                                var rewrittenUrl, appUrl;
                                return appBase === stripHash(url) ? rewrittenUrl = url : (appUrl = stripBaseUrl(appBaseNoFile, url)) ? rewrittenUrl = appBase + hashPrefix + appUrl : appBaseNoFile === url + "/" && (rewrittenUrl = appBaseNoFile), rewrittenUrl && this.$$parse(rewrittenUrl), !!rewrittenUrl
                            }, this.$$compose = function () {
                                var search = toKeyValue(this.$$search),
                                    hash = this.$$hash ? "#" + encodeUriSegment(this.$$hash) : "";
                                this.$$url = encodePath(this.$$path) + (search ? "?" + search : "") + hash, this.$$absUrl = appBase + hashPrefix + this.$$url, this.$$urlUpdatedByLocation = !0
                            }
                        }

                        function locationGetter(property) {
                            return function () {
                                return this[property]
                            }
                        }

                        function locationGetterSetter(property, preprocess) {
                            return function (value) {
                                return isUndefined(value) ? this[property] : (this[property] = preprocess(value), this.$$compose(), this)
                            }
                        }

                        function $LocationProvider() {
                            var hashPrefix = "!",
                                html5Mode = {
                                    enabled: !1,
                                    requireBase: !0,
                                    rewriteLinks: !0
                                };
                            this.hashPrefix = function (prefix) {
                                return isDefined(prefix) ? (hashPrefix = prefix, this) : hashPrefix
                            }, this.html5Mode = function (mode) {
                                return isBoolean(mode) ? (html5Mode.enabled = mode, this) : isObject(mode) ? (isBoolean(mode.enabled) && (html5Mode.enabled = mode.enabled), isBoolean(mode.requireBase) && (html5Mode.requireBase = mode.requireBase), (isBoolean(mode.rewriteLinks) || isString(mode.rewriteLinks)) && (html5Mode.rewriteLinks = mode.rewriteLinks), this) : html5Mode
                            }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function ($rootScope, $browser, $sniffer, $rootElement, $window) {
                                function setBrowserUrlWithFallback(url, replace, state) {
                                    var oldUrl = $location.url(),
                                        oldState = $location.$$state;
                                    try {
                                        $browser.url(url, replace, state), $location.$$state = $browser.state()
                                    } catch (e) {
                                        throw $location.url(oldUrl), $location.$$state = oldState, e
                                    }
                                }

                                function afterLocationChange(oldUrl, oldState) {
                                    $rootScope.$broadcast("$locationChangeSuccess", $location.absUrl(), oldUrl, $location.$$state, oldState)
                                }
                                var $location, LocationMode, appBase, baseHref = $browser.baseHref(),
                                    initialUrl = $browser.url();
                                if (html5Mode.enabled) {
                                    if (!baseHref && html5Mode.requireBase) throw $locationMinErr("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                                    appBase = serverBase(initialUrl) + (baseHref || "/"), LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url
                                } else appBase = stripHash(initialUrl), LocationMode = LocationHashbangUrl;
                                var appBaseNoFile = stripFile(appBase);
                                $location = new LocationMode(appBase, appBaseNoFile, "#" + hashPrefix), $location.$$parseLinkUrl(initialUrl, initialUrl), $location.$$state = $browser.state();
                                var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;
                                $rootElement.on("click", function (event) {
                                    var rewriteLinks = html5Mode.rewriteLinks;
                                    if (rewriteLinks && !event.ctrlKey && !event.metaKey && !event.shiftKey && 2 !== event.which && 2 !== event.button) {
                                        for (var elm = jqLite(event.target);
                                            "a" !== nodeName_(elm[0]);)
                                            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
                                        if (!isString(rewriteLinks) || !isUndefined(elm.attr(rewriteLinks))) {
                                            var absHref = elm.prop("href"),
                                                relHref = elm.attr("href") || elm.attr("xlink:href");
                                            isObject(absHref) && "[object SVGAnimatedString]" === absHref.toString() && (absHref = urlResolve(absHref.animVal).href), IGNORE_URI_REGEXP.test(absHref) || !absHref || elm.attr("target") || event.isDefaultPrevented() || $location.$$parseLinkUrl(absHref, relHref) && (event.preventDefault(), $location.absUrl() !== $browser.url() && ($rootScope.$apply(), $window.angular["ff-684208-preventDefault"] = !0))
                                        }
                                    }
                                }), trimEmptyHash($location.absUrl()) !== trimEmptyHash(initialUrl) && $browser.url($location.absUrl(), !0);
                                var initializing = !0;
                                return $browser.onUrlChange(function (newUrl, newState) {
                                    return startsWith(newUrl, appBaseNoFile) ? ($rootScope.$evalAsync(function () {
                                        var defaultPrevented, oldUrl = $location.absUrl(),
                                            oldState = $location.$$state;
                                        newUrl = trimEmptyHash(newUrl), $location.$$parse(newUrl), $location.$$state = newState, defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, newState, oldState).defaultPrevented, $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState, setBrowserUrlWithFallback(oldUrl, !1, oldState)) : (initializing = !1, afterLocationChange(oldUrl, oldState)))
                                    }), void($rootScope.$$phase || $rootScope.$digest())) : void($window.location.href = newUrl)
                                }), $rootScope.$watch(function () {
                                    if (initializing || $location.$$urlUpdatedByLocation) {
                                        $location.$$urlUpdatedByLocation = !1;
                                        var oldUrl = trimEmptyHash($browser.url()),
                                            newUrl = trimEmptyHash($location.absUrl()),
                                            oldState = $browser.state(),
                                            currentReplace = $location.$$replace,
                                            urlOrStateChanged = oldUrl !== newUrl || $location.$$html5 && $sniffer.history && oldState !== $location.$$state;
                                        (initializing || urlOrStateChanged) && (initializing = !1, $rootScope.$evalAsync(function () {
                                            var newUrl = $location.absUrl(),
                                                defaultPrevented = $rootScope.$broadcast("$locationChangeStart", newUrl, oldUrl, $location.$$state, oldState).defaultPrevented;
                                            $location.absUrl() === newUrl && (defaultPrevented ? ($location.$$parse(oldUrl), $location.$$state = oldState) : (urlOrStateChanged && setBrowserUrlWithFallback(newUrl, currentReplace, oldState === $location.$$state ? null : $location.$$state), afterLocationChange(oldUrl, oldState)))
                                        }))
                                    }
                                    $location.$$replace = !1
                                }), $location
                            }]
                        }

                        function $LogProvider() {
                            var debug = !0,
                                self = this;
                            this.debugEnabled = function (flag) {
                                return isDefined(flag) ? (debug = flag, this) : debug
                            }, this.$get = ["$window", function ($window) {
                                function formatError(arg) {
                                    return arg instanceof Error && (arg.stack ? arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? "Error: " + arg.message + "\n" + arg.stack : arg.stack : arg.sourceURL && (arg = arg.message + "\n" + arg.sourceURL + ":" + arg.line)), arg
                                }

                                function consoleLog(type) {
                                    var console = $window.console || {},
                                        logFn = console[type] || console.log || noop,
                                        hasApply = !1;
                                    try {
                                        hasApply = !!logFn.apply
                                    } catch (e) {}
                                    return hasApply ? function () {
                                        var args = [];
                                        return forEach(arguments, function (arg) {
                                            args.push(formatError(arg))
                                        }), logFn.apply(console, args)
                                    } : function (arg1, arg2) {
                                        logFn(arg1, null == arg2 ? "" : arg2)
                                    }
                                }
                                return {
                                    log: consoleLog("log"),
                                    info: consoleLog("info"),
                                    warn: consoleLog("warn"),
                                    error: consoleLog("error"),
                                    debug: function () {
                                        var fn = consoleLog("debug");
                                        return function () {
                                            debug && fn.apply(self, arguments)
                                        }
                                    }()
                                }
                            }]
                        }

                        function getStringValue(name) {
                            return name + ""
                        }

                        function ifDefined(v, d) {
                            return "undefined" != typeof v ? v : d
                        }

                        function plusFn(l, r) {
                            return "undefined" == typeof l ? r : "undefined" == typeof r ? l : l + r
                        }

                        function isStateless($filter, filterName) {
                            var fn = $filter(filterName);
                            return !fn.$stateful
                        }

                        function findConstantAndWatchExpressions(ast, $filter) {
                            var allConstants, argsToWatch, isStatelessFilter;
                            switch (ast.type) {
                                case AST.Program:
                                    allConstants = !0, forEach(ast.body, function (expr) {
                                        findConstantAndWatchExpressions(expr.expression, $filter), allConstants = allConstants && expr.expression.constant
                                    }), ast.constant = allConstants;
                                    break;
                                case AST.Literal:
                                    ast.constant = !0, ast.toWatch = [];
                                    break;
                                case AST.UnaryExpression:
                                    findConstantAndWatchExpressions(ast.argument, $filter), ast.constant = ast.argument.constant, ast.toWatch = ast.argument.toWatch;
                                    break;
                                case AST.BinaryExpression:
                                    findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.left.toWatch.concat(ast.right.toWatch);
                                    break;
                                case AST.LogicalExpression:
                                    findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = ast.constant ? [] : [ast];
                                    break;
                                case AST.ConditionalExpression:
                                    findConstantAndWatchExpressions(ast.test, $filter), findConstantAndWatchExpressions(ast.alternate, $filter), findConstantAndWatchExpressions(ast.consequent, $filter), ast.constant = ast.test.constant && ast.alternate.constant && ast.consequent.constant, ast.toWatch = ast.constant ? [] : [ast];
                                    break;
                                case AST.Identifier:
                                    ast.constant = !1, ast.toWatch = [ast];
                                    break;
                                case AST.MemberExpression:
                                    findConstantAndWatchExpressions(ast.object, $filter), ast.computed && findConstantAndWatchExpressions(ast.property, $filter), ast.constant = ast.object.constant && (!ast.computed || ast.property.constant), ast.toWatch = [ast];
                                    break;
                                case AST.CallExpression:
                                    isStatelessFilter = !!ast.filter && isStateless($filter, ast.callee.name), allConstants = isStatelessFilter, argsToWatch = [], forEach(ast.arguments, function (expr) {
                                        findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                                    }), ast.constant = allConstants, ast.toWatch = isStatelessFilter ? argsToWatch : [ast];
                                    break;
                                case AST.AssignmentExpression:
                                    findConstantAndWatchExpressions(ast.left, $filter), findConstantAndWatchExpressions(ast.right, $filter), ast.constant = ast.left.constant && ast.right.constant, ast.toWatch = [ast];
                                    break;
                                case AST.ArrayExpression:
                                    allConstants = !0, argsToWatch = [], forEach(ast.elements, function (expr) {
                                        findConstantAndWatchExpressions(expr, $filter), allConstants = allConstants && expr.constant, expr.constant || argsToWatch.push.apply(argsToWatch, expr.toWatch)
                                    }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                                    break;
                                case AST.ObjectExpression:
                                    allConstants = !0, argsToWatch = [], forEach(ast.properties, function (property) {
                                        findConstantAndWatchExpressions(property.value, $filter), allConstants = allConstants && property.value.constant && !property.computed, property.value.constant || argsToWatch.push.apply(argsToWatch, property.value.toWatch), property.computed && (findConstantAndWatchExpressions(property.key, $filter), property.key.constant || argsToWatch.push.apply(argsToWatch, property.key.toWatch))
                                    }), ast.constant = allConstants, ast.toWatch = argsToWatch;
                                    break;
                                case AST.ThisExpression:
                                    ast.constant = !1, ast.toWatch = [];
                                    break;
                                case AST.LocalsExpression:
                                    ast.constant = !1, ast.toWatch = []
                            }
                        }

                        function getInputs(body) {
                            if (1 === body.length) {
                                var lastExpression = body[0].expression,
                                    candidate = lastExpression.toWatch;
                                return 1 !== candidate.length ? candidate : candidate[0] !== lastExpression ? candidate : void 0
                            }
                        }

                        function isAssignable(ast) {
                            return ast.type === AST.Identifier || ast.type === AST.MemberExpression
                        }

                        function assignableAST(ast) {
                            if (1 === ast.body.length && isAssignable(ast.body[0].expression)) return {
                                type: AST.AssignmentExpression,
                                left: ast.body[0].expression,
                                right: {
                                    type: AST.NGValueParameter
                                },
                                operator: "="
                            }
                        }

                        function isLiteral(ast) {
                            return 0 === ast.body.length || 1 === ast.body.length && (ast.body[0].expression.type === AST.Literal || ast.body[0].expression.type === AST.ArrayExpression || ast.body[0].expression.type === AST.ObjectExpression)
                        }

                        function isConstant(ast) {
                            return ast.constant
                        }

                        function ASTCompiler(astBuilder, $filter) {
                            this.astBuilder = astBuilder, this.$filter = $filter
                        }

                        function ASTInterpreter(astBuilder, $filter) {
                            this.astBuilder = astBuilder, this.$filter = $filter
                        }

                        function getValueOf(value) {
                            return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value)
                        }

                        function $ParseProvider() {
                            var identStart, identContinue, cache = createMap(),
                                literals = {
                                    "true": !0,
                                    "false": !1,
                                    "null": null,
                                    undefined: void 0
                                };
                            this.addLiteral = function (literalName, literalValue) {
                                literals[literalName] = literalValue
                            }, this.setIdentifierFns = function (identifierStart, identifierContinue) {
                                return identStart = identifierStart, identContinue = identifierContinue, this
                            }, this.$get = ["$filter", function ($filter) {
                                function $parse(exp, interceptorFn) {
                                    var parsedExpression, oneTime, cacheKey;
                                    switch (typeof exp) {
                                        case "string":
                                            if (exp = exp.trim(), cacheKey = exp, parsedExpression = cache[cacheKey], !parsedExpression) {
                                                ":" === exp.charAt(0) && ":" === exp.charAt(1) && (oneTime = !0, exp = exp.substring(2));
                                                var lexer = new Lexer($parseOptions),
                                                    parser = new Parser(lexer, $filter, $parseOptions);
                                                parsedExpression = parser.parse(exp), parsedExpression.constant ? parsedExpression.$$watchDelegate = constantWatchDelegate : oneTime ? parsedExpression.$$watchDelegate = parsedExpression.literal ? oneTimeLiteralWatchDelegate : oneTimeWatchDelegate : parsedExpression.inputs && (parsedExpression.$$watchDelegate = inputsWatchDelegate), cache[cacheKey] = parsedExpression
                                            }
                                            return addInterceptor(parsedExpression, interceptorFn);
                                        case "function":
                                            return addInterceptor(exp, interceptorFn);
                                        default:
                                            return addInterceptor(noop, interceptorFn)
                                    }
                                }

                                function expressionInputDirtyCheck(newValue, oldValueOfValue, compareObjectIdentity) {
                                    return null == newValue || null == oldValueOfValue ? newValue === oldValueOfValue : !("object" == typeof newValue && !compareObjectIdentity && (newValue = getValueOf(newValue), "object" == typeof newValue)) && (newValue === oldValueOfValue || newValue !== newValue && oldValueOfValue !== oldValueOfValue)
                                }

                                function inputsWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                                    var lastResult, inputExpressions = parsedExpression.inputs;
                                    if (1 === inputExpressions.length) {
                                        var oldInputValueOf = expressionInputDirtyCheck;
                                        return inputExpressions = inputExpressions[0], scope.$watch(function (scope) {
                                            var newInputValue = inputExpressions(scope);
                                            return expressionInputDirtyCheck(newInputValue, oldInputValueOf, parsedExpression.literal) || (lastResult = parsedExpression(scope, void 0, void 0, [newInputValue]), oldInputValueOf = newInputValue && getValueOf(newInputValue)), lastResult
                                        }, listener, objectEquality, prettyPrintExpression)
                                    }
                                    for (var oldInputValueOfValues = [], oldInputValues = [], i = 0, ii = inputExpressions.length; i < ii; i++) oldInputValueOfValues[i] = expressionInputDirtyCheck, oldInputValues[i] = null;
                                    return scope.$watch(function (scope) {
                                        for (var changed = !1, i = 0, ii = inputExpressions.length; i < ii; i++) {
                                            var newInputValue = inputExpressions[i](scope);
                                            (changed || (changed = !expressionInputDirtyCheck(newInputValue, oldInputValueOfValues[i], parsedExpression.literal))) && (oldInputValues[i] = newInputValue, oldInputValueOfValues[i] = newInputValue && getValueOf(newInputValue))
                                        }
                                        return changed && (lastResult = parsedExpression(scope, void 0, void 0, oldInputValues)), lastResult
                                    }, listener, objectEquality, prettyPrintExpression)
                                }

                                function oneTimeWatchDelegate(scope, listener, objectEquality, parsedExpression, prettyPrintExpression) {
                                    function oneTimeWatch(scope) {
                                        return parsedExpression(scope)
                                    }

                                    function oneTimeListener(value, old, scope) {
                                        lastValue = value, isFunction(listener) && listener(value, old, scope), isDefined(value) && scope.$$postDigest(function () {
                                            isDefined(lastValue) && unwatch()
                                        })
                                    }
                                    var unwatch, lastValue;
                                    return unwatch = parsedExpression.inputs ? inputsWatchDelegate(scope, oneTimeListener, objectEquality, parsedExpression, prettyPrintExpression) : scope.$watch(oneTimeWatch, oneTimeListener, objectEquality)
                                }

                                function oneTimeLiteralWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                                    function isAllDefined(value) {
                                        var allDefined = !0;
                                        return forEach(value, function (val) {
                                            isDefined(val) || (allDefined = !1)
                                        }), allDefined
                                    }
                                    var unwatch, lastValue;
                                    return unwatch = scope.$watch(function (scope) {
                                        return parsedExpression(scope)
                                    }, function (value, old, scope) {
                                        lastValue = value, isFunction(listener) && listener(value, old, scope), isAllDefined(value) && scope.$$postDigest(function () {
                                            isAllDefined(lastValue) && unwatch()
                                        })
                                    }, objectEquality)
                                }

                                function constantWatchDelegate(scope, listener, objectEquality, parsedExpression) {
                                    var unwatch = scope.$watch(function (scope) {
                                        return unwatch(), parsedExpression(scope)
                                    }, listener, objectEquality);
                                    return unwatch
                                }

                                function addInterceptor(parsedExpression, interceptorFn) {
                                    if (!interceptorFn) return parsedExpression;
                                    var watchDelegate = parsedExpression.$$watchDelegate,
                                        useInputs = !1,
                                        regularWatch = watchDelegate !== oneTimeLiteralWatchDelegate && watchDelegate !== oneTimeWatchDelegate,
                                        fn = regularWatch ? function (scope, locals, assign, inputs) {
                                            var value = useInputs && inputs ? inputs[0] : parsedExpression(scope, locals, assign, inputs);
                                            return interceptorFn(value, scope, locals)
                                        } : function (scope, locals, assign, inputs) {
                                            var value = parsedExpression(scope, locals, assign, inputs),
                                                result = interceptorFn(value, scope, locals);
                                            return isDefined(value) ? result : value
                                        };
                                    return useInputs = !parsedExpression.inputs, parsedExpression.$$watchDelegate && parsedExpression.$$watchDelegate !== inputsWatchDelegate ? (fn.$$watchDelegate = parsedExpression.$$watchDelegate, fn.inputs = parsedExpression.inputs) : interceptorFn.$stateful || (fn.$$watchDelegate = inputsWatchDelegate, fn.inputs = parsedExpression.inputs ? parsedExpression.inputs : [parsedExpression]), fn
                                }
                                var noUnsafeEval = csp().noUnsafeEval,
                                    $parseOptions = {
                                        csp: noUnsafeEval,
                                        literals: copy(literals),
                                        isIdentifierStart: isFunction(identStart) && identStart,
                                        isIdentifierContinue: isFunction(identContinue) && identContinue
                                    };
                                return $parse
                            }]
                        }

                        function $QProvider() {
                            var errorOnUnhandledRejections = !0;
                            this.$get = ["$rootScope", "$exceptionHandler", function ($rootScope, $exceptionHandler) {
                                return qFactory(function (callback) {
                                    $rootScope.$evalAsync(callback)
                                }, $exceptionHandler, errorOnUnhandledRejections)
                            }], this.errorOnUnhandledRejections = function (value) {
                                return isDefined(value) ? (errorOnUnhandledRejections = value, this) : errorOnUnhandledRejections
                            }
                        }

                        function $$QProvider() {
                            var errorOnUnhandledRejections = !0;
                            this.$get = ["$browser", "$exceptionHandler", function ($browser, $exceptionHandler) {
                                return qFactory(function (callback) {
                                    $browser.defer(callback)
                                }, $exceptionHandler, errorOnUnhandledRejections)
                            }], this.errorOnUnhandledRejections = function (value) {
                                return isDefined(value) ? (errorOnUnhandledRejections = value, this) : errorOnUnhandledRejections
                            }
                        }

                        function qFactory(nextTick, exceptionHandler, errorOnUnhandledRejections) {
                            function defer() {
                                return new Deferred
                            }

                            function Deferred() {
                                var promise = this.promise = new Promise;
                                this.resolve = function (val) {
                                    resolvePromise(promise, val)
                                }, this.reject = function (reason) {
                                    rejectPromise(promise, reason)
                                }, this.notify = function (progress) {
                                    notifyPromise(promise, progress)
                                }
                            }

                            function Promise() {
                                this.$$state = {
                                    status: 0
                                }
                            }

                            function processQueue(state) {
                                var fn, promise, pending;
                                pending = state.pending, state.processScheduled = !1, state.pending = void 0;
                                try {
                                    for (var i = 0, ii = pending.length; i < ii; ++i) {
                                        state.pur = !0, promise = pending[i][0], fn = pending[i][state.status];
                                        try {
                                            isFunction(fn) ? resolvePromise(promise, fn(state.value)) : 1 === state.status ? resolvePromise(promise, state.value) : rejectPromise(promise, state.value)
                                        } catch (e) {
                                            rejectPromise(promise, e)
                                        }
                                    }
                                } finally {
                                    --queueSize, errorOnUnhandledRejections && 0 === queueSize && nextTick(processChecks)
                                }
                            }

                            function processChecks() {
                                for (; !queueSize && checkQueue.length;) {
                                    var toCheck = checkQueue.shift();
                                    if (!toCheck.pur) {
                                        toCheck.pur = !0;
                                        var errorMessage = "Possibly unhandled rejection: " + toDebugString(toCheck.value);
                                        toCheck.value instanceof Error ? exceptionHandler(toCheck.value, errorMessage) : exceptionHandler(errorMessage)
                                    }
                                }
                            }

                            function scheduleProcessQueue(state) {
                                !errorOnUnhandledRejections || state.pending || 2 !== state.status || state.pur || (0 === queueSize && 0 === checkQueue.length && nextTick(processChecks), checkQueue.push(state)), !state.processScheduled && state.pending && (state.processScheduled = !0, ++queueSize, nextTick(function () {
                                    processQueue(state)
                                }))
                            }

                            function resolvePromise(promise, val) {
                                promise.$$state.status || (val === promise ? $$reject(promise, $qMinErr("qcycle", "Expected promise to be resolved with value other than itself '{0}'", val)) : $$resolve(promise, val))
                            }

                            function $$resolve(promise, val) {
                                function doResolve(val) {
                                    done || (done = !0, $$resolve(promise, val))
                                }

                                function doReject(val) {
                                    done || (done = !0, $$reject(promise, val))
                                }

                                function doNotify(progress) {
                                    notifyPromise(promise, progress)
                                }
                                var then, done = !1;
                                try {
                                    (isObject(val) || isFunction(val)) && (then = val.then), isFunction(then) ? (promise.$$state.status = -1, then.call(val, doResolve, doReject, doNotify)) : (promise.$$state.value = val, promise.$$state.status = 1, scheduleProcessQueue(promise.$$state))
                                } catch (e) {
                                    doReject(e)
                                }
                            }

                            function rejectPromise(promise, reason) {
                                promise.$$state.status || $$reject(promise, reason)
                            }

                            function $$reject(promise, reason) {
                                promise.$$state.value = reason, promise.$$state.status = 2, scheduleProcessQueue(promise.$$state)
                            }

                            function notifyPromise(promise, progress) {
                                var callbacks = promise.$$state.pending;
                                promise.$$state.status <= 0 && callbacks && callbacks.length && nextTick(function () {
                                    for (var callback, result, i = 0, ii = callbacks.length; i < ii; i++) {
                                        result = callbacks[i][0], callback = callbacks[i][3];
                                        try {
                                            notifyPromise(result, isFunction(callback) ? callback(progress) : progress)
                                        } catch (e) {
                                            exceptionHandler(e)
                                        }
                                    }
                                })
                            }

                            function reject(reason) {
                                var result = new Promise;
                                return rejectPromise(result, reason), result
                            }

                            function handleCallback(value, resolver, callback) {
                                var callbackOutput = null;
                                try {
                                    isFunction(callback) && (callbackOutput = callback())
                                } catch (e) {
                                    return reject(e)
                                }
                                return isPromiseLike(callbackOutput) ? callbackOutput.then(function () {
                                    return resolver(value)
                                }, reject) : resolver(value)
                            }

                            function when(value, callback, errback, progressBack) {
                                var result = new Promise;
                                return resolvePromise(result, value), result.then(callback, errback, progressBack)
                            }

                            function all(promises) {
                                var result = new Promise,
                                    counter = 0,
                                    results = isArray(promises) ? [] : {};
                                return forEach(promises, function (promise, key) {
                                    counter++, when(promise).then(function (value) {
                                        results[key] = value, --counter || resolvePromise(result, results)
                                    }, function (reason) {
                                        rejectPromise(result, reason)
                                    })
                                }), 0 === counter && resolvePromise(result, results), result
                            }

                            function race(promises) {
                                var deferred = defer();
                                return forEach(promises, function (promise) {
                                    when(promise).then(deferred.resolve, deferred.reject)
                                }), deferred.promise
                            }

                            function $Q(resolver) {
                                function resolveFn(value) {
                                    resolvePromise(promise, value)
                                }

                                function rejectFn(reason) {
                                    rejectPromise(promise, reason)
                                }
                                if (!isFunction(resolver)) throw $qMinErr("norslvr", "Expected resolverFn, got '{0}'", resolver);
                                var promise = new Promise;
                                return resolver(resolveFn, rejectFn), promise
                            }
                            var $qMinErr = minErr("$q", TypeError),
                                queueSize = 0,
                                checkQueue = [];
                            extend(Promise.prototype, {
                                then: function (onFulfilled, onRejected, progressBack) {
                                    if (isUndefined(onFulfilled) && isUndefined(onRejected) && isUndefined(progressBack)) return this;
                                    var result = new Promise;
                                    return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([result, onFulfilled, onRejected, progressBack]), this.$$state.status > 0 && scheduleProcessQueue(this.$$state), result
                                },
                                "catch": function (callback) {
                                    return this.then(null, callback)
                                },
                                "finally": function (callback, progressBack) {
                                    return this.then(function (value) {
                                        return handleCallback(value, resolve, callback)
                                    }, function (error) {
                                        return handleCallback(error, reject, callback)
                                    }, progressBack)
                                }
                            });
                            var resolve = when;
                            return $Q.prototype = Promise.prototype, $Q.defer = defer, $Q.reject = reject, $Q.when = when, $Q.resolve = resolve, $Q.all = all, $Q.race = race, $Q
                        }

                        function $$RAFProvider() {
                            this.$get = ["$window", "$timeout", function ($window, $timeout) {
                                var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame,
                                    cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame,
                                    rafSupported = !!requestAnimationFrame,
                                    raf = rafSupported ? function (fn) {
                                        var id = requestAnimationFrame(fn);
                                        return function () {
                                            cancelAnimationFrame(id)
                                        }
                                    } : function (fn) {
                                        var timer = $timeout(fn, 16.66, !1);
                                        return function () {
                                            $timeout.cancel(timer)
                                        }
                                    };
                                return raf.supported = rafSupported, raf
                            }]
                        }

                        function $RootScopeProvider() {
                            function createChildScopeClass(parent) {
                                function ChildScope() {
                                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = nextUid(), this.$$ChildScope = null
                                }
                                return ChildScope.prototype = parent, ChildScope
                            }
                            var TTL = 10,
                                $rootScopeMinErr = minErr("$rootScope"),
                                lastDirtyWatch = null,
                                applyAsyncId = null;
                            this.digestTtl = function (value) {
                                return arguments.length && (TTL = value), TTL
                            }, this.$get = ["$exceptionHandler", "$parse", "$browser", function ($exceptionHandler, $parse, $browser) {
                                function destroyChildScope($event) {
                                    $event.currentScope.$$destroyed = !0
                                }

                                function cleanUpScope($scope) {
                                    9 === msie && ($scope.$$childHead && cleanUpScope($scope.$$childHead), $scope.$$nextSibling && cleanUpScope($scope.$$nextSibling)), $scope.$parent = $scope.$$nextSibling = $scope.$$prevSibling = $scope.$$childHead = $scope.$$childTail = $scope.$root = $scope.$$watchers = null
                                }

                                function Scope() {
                                    this.$id = nextUid(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
                                }

                                function beginPhase(phase) {
                                    if ($rootScope.$$phase) throw $rootScopeMinErr("inprog", "{0} already in progress", $rootScope.$$phase);
                                    $rootScope.$$phase = phase
                                }

                                function clearPhase() {
                                    $rootScope.$$phase = null
                                }

                                function incrementWatchersCount(current, count) {
                                    do current.$$watchersCount += count; while (current = current.$parent)
                                }

                                function decrementListenerCount(current, count, name) {
                                    do current.$$listenerCount[name] -= count, 0 === current.$$listenerCount[name] && delete current.$$listenerCount[name]; while (current = current.$parent)
                                }

                                function initWatchVal() {}

                                function flushApplyAsync() {
                                    for (; applyAsyncQueue.length;) try {
                                        applyAsyncQueue.shift()()
                                    } catch (e) {
                                        $exceptionHandler(e)
                                    }
                                    applyAsyncId = null
                                }

                                function scheduleApplyAsync() {
                                    null === applyAsyncId && (applyAsyncId = $browser.defer(function () {
                                        $rootScope.$apply(flushApplyAsync)
                                    }))
                                }
                                Scope.prototype = {
                                    constructor: Scope,
                                    $new: function (isolate, parent) {
                                        var child;
                                        return parent = parent || this, isolate ? (child = new Scope, child.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = createChildScopeClass(this)), child = new this.$$ChildScope), child.$parent = parent, child.$$prevSibling = parent.$$childTail, parent.$$childHead ? (parent.$$childTail.$$nextSibling = child, parent.$$childTail = child) : parent.$$childHead = parent.$$childTail = child, (isolate || parent !== this) && child.$on("$destroy", destroyChildScope), child
                                    },
                                    $watch: function (watchExp, listener, objectEquality, prettyPrintExpression) {
                                        var get = $parse(watchExp);
                                        if (get.$$watchDelegate) return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
                                        var scope = this,
                                            array = scope.$$watchers,
                                            watcher = {
                                                fn: listener,
                                                last: initWatchVal,
                                                get: get,
                                                exp: prettyPrintExpression || watchExp,
                                                eq: !!objectEquality
                                            };
                                        return lastDirtyWatch = null, isFunction(listener) || (watcher.fn = noop), array || (array = scope.$$watchers = [], array.$$digestWatchIndex = -1), array.unshift(watcher), array.$$digestWatchIndex++, incrementWatchersCount(this, 1),
                                            function () {
                                                var index = arrayRemove(array, watcher);
                                                index >= 0 && (incrementWatchersCount(scope, -1), index < array.$$digestWatchIndex && array.$$digestWatchIndex--), lastDirtyWatch = null
                                            }
                                    },
                                    $watchGroup: function (watchExpressions, listener) {
                                        function watchGroupAction() {
                                            changeReactionScheduled = !1, firstRun ? (firstRun = !1, listener(newValues, newValues, self)) : listener(newValues, oldValues, self)
                                        }
                                        var oldValues = new Array(watchExpressions.length),
                                            newValues = new Array(watchExpressions.length),
                                            deregisterFns = [],
                                            self = this,
                                            changeReactionScheduled = !1,
                                            firstRun = !0;
                                        if (!watchExpressions.length) {
                                            var shouldCall = !0;
                                            return self.$evalAsync(function () {
                                                    shouldCall && listener(newValues, newValues, self)
                                                }),
                                                function () {
                                                    shouldCall = !1
                                                }
                                        }
                                        return 1 === watchExpressions.length ? this.$watch(watchExpressions[0], function (value, oldValue, scope) {
                                            newValues[0] = value, oldValues[0] = oldValue, listener(newValues, value === oldValue ? newValues : oldValues, scope)
                                        }) : (forEach(watchExpressions, function (expr, i) {
                                            var unwatchFn = self.$watch(expr, function (value, oldValue) {
                                                newValues[i] = value, oldValues[i] = oldValue, changeReactionScheduled || (changeReactionScheduled = !0, self.$evalAsync(watchGroupAction))
                                            });
                                            deregisterFns.push(unwatchFn)
                                        }), function () {
                                            for (; deregisterFns.length;) deregisterFns.shift()()
                                        })
                                    },
                                    $watchCollection: function (obj, listener) {
                                        function $watchCollectionInterceptor(_value) {
                                            newValue = _value;
                                            var newLength, key, bothNaN, newItem, oldItem;
                                            if (!isUndefined(newValue)) {
                                                if (isObject(newValue))
                                                    if (isArrayLike(newValue)) {
                                                        oldValue !== internalArray && (oldValue = internalArray, oldLength = oldValue.length = 0, changeDetected++), newLength = newValue.length, oldLength !== newLength && (changeDetected++, oldValue.length = oldLength = newLength);
                                                        for (var i = 0; i < newLength; i++) oldItem = oldValue[i], newItem = newValue[i], bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[i] = newItem)
                                                    } else {
                                                        oldValue !== internalObject && (oldValue = internalObject = {}, oldLength = 0, changeDetected++), newLength = 0;
                                                        for (key in newValue) hasOwnProperty.call(newValue, key) && (newLength++, newItem = newValue[key], oldItem = oldValue[key], key in oldValue ? (bothNaN = oldItem !== oldItem && newItem !== newItem, bothNaN || oldItem === newItem || (changeDetected++, oldValue[key] = newItem)) : (oldLength++, oldValue[key] = newItem, changeDetected++));
                                                        if (oldLength > newLength) {
                                                            changeDetected++;
                                                            for (key in oldValue) hasOwnProperty.call(newValue, key) || (oldLength--, delete oldValue[key])
                                                        }
                                                    }
                                                else oldValue !== newValue && (oldValue = newValue, changeDetected++);
                                                return changeDetected
                                            }
                                        }

                                        function $watchCollectionAction() {
                                            if (initRun ? (initRun = !1, listener(newValue, newValue, self)) : listener(newValue, veryOldValue, self), trackVeryOldValue)
                                                if (isObject(newValue))
                                                    if (isArrayLike(newValue)) {
                                                        veryOldValue = new Array(newValue.length);
                                                        for (var i = 0; i < newValue.length; i++) veryOldValue[i] = newValue[i]
                                                    } else {
                                                        veryOldValue = {};
                                                        for (var key in newValue) hasOwnProperty.call(newValue, key) && (veryOldValue[key] = newValue[key])
                                                    }
                                            else veryOldValue = newValue
                                        }
                                        $watchCollectionInterceptor.$stateful = !0;
                                        var newValue, oldValue, veryOldValue, self = this,
                                            trackVeryOldValue = listener.length > 1,
                                            changeDetected = 0,
                                            changeDetector = $parse(obj, $watchCollectionInterceptor),
                                            internalArray = [],
                                            internalObject = {},
                                            initRun = !0,
                                            oldLength = 0;
                                        return this.$watch(changeDetector, $watchCollectionAction)
                                    },
                                    $digest: function () {
                                        var watch, value, last, fn, get, watchers, dirty, next, current, logIdx, asyncTask, ttl = TTL,
                                            target = this,
                                            watchLog = [];
                                        beginPhase("$digest"), $browser.$$checkUrlChange(), this === $rootScope && null !== applyAsyncId && ($browser.defer.cancel(applyAsyncId), flushApplyAsync()), lastDirtyWatch = null;
                                        do {
                                            dirty = !1, current = target;
                                            for (var asyncQueuePosition = 0; asyncQueuePosition < asyncQueue.length; asyncQueuePosition++) {
                                                try {
                                                    asyncTask = asyncQueue[asyncQueuePosition], asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals)
                                                } catch (e) {
                                                    $exceptionHandler(e)
                                                }
                                                lastDirtyWatch = null
                                            }
                                            asyncQueue.length = 0;
                                            traverseScopesLoop: do {
                                                if (watchers = current.$$watchers)
                                                    for (watchers.$$digestWatchIndex = watchers.length; watchers.$$digestWatchIndex--;) try {
                                                        if (watch = watchers[watchers.$$digestWatchIndex])
                                                            if (get = watch.get, (value = get(current)) === (last = watch.last) || (watch.eq ? equals(value, last) : isNumberNaN(value) && isNumberNaN(last))) {
                                                                if (watch === lastDirtyWatch) {
                                                                    dirty = !1;
                                                                    break traverseScopesLoop
                                                                }
                                                            } else dirty = !0, lastDirtyWatch = watch, watch.last = watch.eq ? copy(value, null) : value, fn = watch.fn, fn(value, last === initWatchVal ? value : last, current), ttl < 5 && (logIdx = 4 - ttl, watchLog[logIdx] || (watchLog[logIdx] = []), watchLog[logIdx].push({
                                                                msg: isFunction(watch.exp) ? "fn: " + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                                                newVal: value,
                                                                oldVal: last
                                                            }))
                                                    } catch (e) {
                                                        $exceptionHandler(e)
                                                    }
                                                if (!(next = current.$$watchersCount && current.$$childHead || current !== target && current.$$nextSibling))
                                                    for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent
                                            } while (current = next);
                                            if ((dirty || asyncQueue.length) && !ttl--) throw clearPhase(), $rootScopeMinErr("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", TTL, watchLog)
                                        } while (dirty || asyncQueue.length);
                                        for (clearPhase(); postDigestQueuePosition < postDigestQueue.length;) try {
                                            postDigestQueue[postDigestQueuePosition++]()
                                        } catch (e) {
                                            $exceptionHandler(e)
                                        }
                                        postDigestQueue.length = postDigestQueuePosition = 0, $browser.$$checkUrlChange()
                                    },
                                    $destroy: function () {
                                        if (!this.$$destroyed) {
                                            var parent = this.$parent;
                                            this.$broadcast("$destroy"), this.$$destroyed = !0, this === $rootScope && $browser.$$applicationDestroyed(), incrementWatchersCount(this, -this.$$watchersCount);
                                            for (var eventName in this.$$listenerCount) decrementListenerCount(this, this.$$listenerCount[eventName], eventName);
                                            parent && parent.$$childHead === this && (parent.$$childHead = this.$$nextSibling), parent && parent.$$childTail === this && (parent.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = noop, this.$on = this.$watch = this.$watchGroup = function () {
                                                return noop
                                            }, this.$$listeners = {}, this.$$nextSibling = null, cleanUpScope(this)
                                        }
                                    },
                                    $eval: function (expr, locals) {
                                        return $parse(expr)(this, locals)
                                    },
                                    $evalAsync: function (expr, locals) {
                                        $rootScope.$$phase || asyncQueue.length || $browser.defer(function () {
                                            asyncQueue.length && $rootScope.$digest()
                                        }), asyncQueue.push({
                                            scope: this,
                                            expression: $parse(expr),
                                            locals: locals
                                        })
                                    },
                                    $$postDigest: function (fn) {
                                        postDigestQueue.push(fn)
                                    },
                                    $apply: function (expr) {
                                        try {
                                            beginPhase("$apply");
                                            try {
                                                return this.$eval(expr)
                                            } finally {
                                                clearPhase()
                                            }
                                        } catch (e) {
                                            $exceptionHandler(e)
                                        } finally {
                                            try {
                                                $rootScope.$digest()
                                            } catch (e) {
                                                throw $exceptionHandler(e), e
                                            }
                                        }
                                    },
                                    $applyAsync: function (expr) {
                                        function $applyAsyncExpression() {
                                            scope.$eval(expr)
                                        }
                                        var scope = this;
                                        expr && applyAsyncQueue.push($applyAsyncExpression), expr = $parse(expr), scheduleApplyAsync()
                                    },
                                    $on: function (name, listener) {
                                        var namedListeners = this.$$listeners[name];
                                        namedListeners || (this.$$listeners[name] = namedListeners = []), namedListeners.push(listener);
                                        var current = this;
                                        do current.$$listenerCount[name] || (current.$$listenerCount[name] = 0), current.$$listenerCount[name]++; while (current = current.$parent);
                                        var self = this;
                                        return function () {
                                            var indexOfListener = namedListeners.indexOf(listener);
                                            indexOfListener !== -1 && (namedListeners[indexOfListener] = null, decrementListenerCount(self, 1, name))
                                        }
                                    },
                                    $emit: function (name, args) {
                                        var namedListeners, i, length, empty = [],
                                            scope = this,
                                            stopPropagation = !1,
                                            event = {
                                                name: name,
                                                targetScope: scope,
                                                stopPropagation: function () {
                                                    stopPropagation = !0
                                                },
                                                preventDefault: function () {
                                                    event.defaultPrevented = !0
                                                },
                                                defaultPrevented: !1
                                            },
                                            listenerArgs = concat([event], arguments, 1);
                                        do {
                                            for (namedListeners = scope.$$listeners[name] || empty, event.currentScope = scope, i = 0, length = namedListeners.length; i < length; i++)
                                                if (namedListeners[i]) try {
                                                    namedListeners[i].apply(null, listenerArgs)
                                                } catch (e) {
                                                    $exceptionHandler(e)
                                                } else namedListeners.splice(i, 1), i--, length--;
                                            if (stopPropagation) return event.currentScope = null, event;
                                            scope = scope.$parent
                                        } while (scope);
                                        return event.currentScope = null, event
                                    },
                                    $broadcast: function (name, args) {
                                        var target = this,
                                            current = target,
                                            next = target,
                                            event = {
                                                name: name,
                                                targetScope: target,
                                                preventDefault: function () {
                                                    event.defaultPrevented = !0
                                                },
                                                defaultPrevented: !1
                                            };
                                        if (!target.$$listenerCount[name]) return event;
                                        for (var listeners, i, length, listenerArgs = concat([event], arguments, 1); current = next;) {
                                            for (event.currentScope = current, listeners = current.$$listeners[name] || [], i = 0, length = listeners.length; i < length; i++)
                                                if (listeners[i]) try {
                                                    listeners[i].apply(null, listenerArgs)
                                                } catch (e) {
                                                    $exceptionHandler(e)
                                                } else listeners.splice(i, 1), i--, length--;
                                            if (!(next = current.$$listenerCount[name] && current.$$childHead || current !== target && current.$$nextSibling))
                                                for (; current !== target && !(next = current.$$nextSibling);) current = current.$parent
                                        }
                                        return event.currentScope = null, event
                                    }
                                };
                                var $rootScope = new Scope,
                                    asyncQueue = $rootScope.$$asyncQueue = [],
                                    postDigestQueue = $rootScope.$$postDigestQueue = [],
                                    applyAsyncQueue = $rootScope.$$applyAsyncQueue = [],
                                    postDigestQueuePosition = 0;
                                return $rootScope
                            }]
                        }

                        function $$SanitizeUriProvider() {
                            var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/,
                                imgSrcSanitizationWhitelist = /^\s*((https?|ftp|file|blob):|data:image\/)/;
                            this.aHrefSanitizationWhitelist = function (regexp) {
                                return isDefined(regexp) ? (aHrefSanitizationWhitelist = regexp, this) : aHrefSanitizationWhitelist
                            }, this.imgSrcSanitizationWhitelist = function (regexp) {
                                return isDefined(regexp) ? (imgSrcSanitizationWhitelist = regexp, this) : imgSrcSanitizationWhitelist
                            }, this.$get = function () {
                                return function (uri, isImage) {
                                    var normalizedVal, regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                                    return normalizedVal = urlResolve(uri).href, "" === normalizedVal || normalizedVal.match(regex) ? uri : "unsafe:" + normalizedVal
                                }
                            }
                        }

                        function snakeToCamel(name) {
                            return name.replace(UNDERSCORE_LOWERCASE_REGEXP, fnCamelCaseReplace)
                        }

                        function adjustMatcher(matcher) {
                            if ("self" === matcher) return matcher;
                            if (isString(matcher)) {
                                if (matcher.indexOf("***") > -1) throw $sceMinErr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", matcher);
                                return matcher = escapeForRegexp(matcher).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*"), new RegExp("^" + matcher + "$")
                            }
                            if (isRegExp(matcher)) return new RegExp("^" + matcher.source + "$");
                            throw $sceMinErr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
                        }

                        function adjustMatchers(matchers) {
                            var adjustedMatchers = [];
                            return isDefined(matchers) && forEach(matchers, function (matcher) {
                                adjustedMatchers.push(adjustMatcher(matcher))
                            }), adjustedMatchers
                        }

                        function $SceDelegateProvider() {
                            this.SCE_CONTEXTS = SCE_CONTEXTS;
                            var resourceUrlWhitelist = ["self"],
                                resourceUrlBlacklist = [];
                            this.resourceUrlWhitelist = function (value) {
                                return arguments.length && (resourceUrlWhitelist = adjustMatchers(value)), resourceUrlWhitelist
                            }, this.resourceUrlBlacklist = function (value) {
                                return arguments.length && (resourceUrlBlacklist = adjustMatchers(value)), resourceUrlBlacklist
                            }, this.$get = ["$injector", function ($injector) {
                                function matchUrl(matcher, parsedUrl) {
                                    return "self" === matcher ? urlIsSameOrigin(parsedUrl) : !!matcher.exec(parsedUrl.href)
                                }

                                function isResourceUrlAllowedByPolicy(url) {
                                    var i, n, parsedUrl = urlResolve(url.toString()),
                                        allowed = !1;
                                    for (i = 0, n = resourceUrlWhitelist.length; i < n; i++)
                                        if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
                                            allowed = !0;
                                            break
                                        } if (allowed)
                                        for (i = 0, n = resourceUrlBlacklist.length; i < n; i++)
                                            if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
                                                allowed = !1;
                                                break
                                            } return allowed
                                }

                                function generateHolderType(Base) {
                                    var holderType = function (trustedValue) {
                                        this.$$unwrapTrustedValue = function () {
                                            return trustedValue
                                        }
                                    };
                                    return Base && (holderType.prototype = new Base), holderType.prototype.valueOf = function () {
                                        return this.$$unwrapTrustedValue()
                                    }, holderType.prototype.toString = function () {
                                        return this.$$unwrapTrustedValue().toString()
                                    }, holderType
                                }

                                function trustAs(type, trustedValue) {
                                    var Constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                                    if (!Constructor) throw $sceMinErr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", type, trustedValue);
                                    if (null === trustedValue || isUndefined(trustedValue) || "" === trustedValue) return trustedValue;
                                    if ("string" != typeof trustedValue) throw $sceMinErr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", type);
                                    return new Constructor(trustedValue)
                                }

                                function valueOf(maybeTrusted) {
                                    return maybeTrusted instanceof trustedValueHolderBase ? maybeTrusted.$$unwrapTrustedValue() : maybeTrusted
                                }

                                function getTrusted(type, maybeTrusted) {
                                    if (null === maybeTrusted || isUndefined(maybeTrusted) || "" === maybeTrusted) return maybeTrusted;
                                    var constructor = byType.hasOwnProperty(type) ? byType[type] : null;
                                    if (constructor && maybeTrusted instanceof constructor) return maybeTrusted.$$unwrapTrustedValue();
                                    if (type === SCE_CONTEXTS.RESOURCE_URL) {
                                        if (isResourceUrlAllowedByPolicy(maybeTrusted)) return maybeTrusted;
                                        throw $sceMinErr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", maybeTrusted.toString())
                                    }
                                    if (type === SCE_CONTEXTS.HTML) return htmlSanitizer(maybeTrusted);
                                    throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
                                }
                                var htmlSanitizer = function (html) {
                                    throw $sceMinErr("unsafe", "Attempting to use an unsafe value in a safe context.")
                                };
                                $injector.has("$sanitize") && (htmlSanitizer = $injector.get("$sanitize"));
                                var trustedValueHolderBase = generateHolderType(),
                                    byType = {};
                                return byType[SCE_CONTEXTS.HTML] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.CSS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.URL] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.JS] = generateHolderType(trustedValueHolderBase), byType[SCE_CONTEXTS.RESOURCE_URL] = generateHolderType(byType[SCE_CONTEXTS.URL]), {
                                    trustAs: trustAs,
                                    getTrusted: getTrusted,
                                    valueOf: valueOf
                                }
                            }]
                        }

                        function $SceProvider() {
                            var enabled = !0;
                            this.enabled = function (value) {
                                return arguments.length && (enabled = !!value), enabled
                            }, this.$get = ["$parse", "$sceDelegate", function ($parse, $sceDelegate) {
                                if (enabled && msie < 8) throw $sceMinErr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                                var sce = shallowCopy(SCE_CONTEXTS);
                                sce.isEnabled = function () {
                                    return enabled
                                }, sce.trustAs = $sceDelegate.trustAs, sce.getTrusted = $sceDelegate.getTrusted, sce.valueOf = $sceDelegate.valueOf, enabled || (sce.trustAs = sce.getTrusted = function (type, value) {
                                    return value
                                }, sce.valueOf = identity), sce.parseAs = function (type, expr) {
                                    var parsed = $parse(expr);
                                    return parsed.literal && parsed.constant ? parsed : $parse(expr, function (value) {
                                        return sce.getTrusted(type, value)
                                    })
                                };
                                var parse = sce.parseAs,
                                    getTrusted = sce.getTrusted,
                                    trustAs = sce.trustAs;
                                return forEach(SCE_CONTEXTS, function (enumValue, name) {
                                    var lName = lowercase(name);
                                    sce[snakeToCamel("parse_as_" + lName)] = function (expr) {
                                        return parse(enumValue, expr)
                                    }, sce[snakeToCamel("get_trusted_" + lName)] = function (value) {
                                        return getTrusted(enumValue, value)
                                    }, sce[snakeToCamel("trust_as_" + lName)] = function (value) {
                                        return trustAs(enumValue, value)
                                    }
                                }), sce
                            }]
                        }

                        function $SnifferProvider() {
                            this.$get = ["$window", "$document", function ($window, $document) {
                                var eventSupport = {},
                                    isNw = $window.nw && $window.nw.process,
                                    isChromePackagedApp = !isNw && $window.chrome && ($window.chrome.app && $window.chrome.app.runtime || !$window.chrome.app && $window.chrome.runtime && $window.chrome.runtime.id),
                                    hasHistoryPushState = !isChromePackagedApp && $window.history && $window.history.pushState,
                                    android = toInt((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]),
                                    boxee = /Boxee/i.test(($window.navigator || {}).userAgent),
                                    document = $document[0] || {},
                                    bodyStyle = document.body && document.body.style,
                                    transitions = !1,
                                    animations = !1;
                                return bodyStyle && (transitions = !!("transition" in bodyStyle || "webkitTransition" in bodyStyle), animations = !!("animation" in bodyStyle || "webkitAnimation" in bodyStyle)), {
                                    history: !(!hasHistoryPushState || android < 4 || boxee),
                                    hasEvent: function (event) {
                                        if ("input" === event && msie) return !1;
                                        if (isUndefined(eventSupport[event])) {
                                            var divElm = document.createElement("div");
                                            eventSupport[event] = "on" + event in divElm
                                        }
                                        return eventSupport[event]
                                    },
                                    csp: csp(),
                                    transitions: transitions,
                                    animations: animations,
                                    android: android
                                }
                            }]
                        }

                        function $TemplateRequestProvider() {
                            var httpOptions;
                            this.httpOptions = function (val) {
                                return val ? (httpOptions = val, this) : httpOptions
                            }, this.$get = ["$exceptionHandler", "$templateCache", "$http", "$q", "$sce", function ($exceptionHandler, $templateCache, $http, $q, $sce) {
                                function handleRequestFn(tpl, ignoreRequestError) {
                                    function handleError(resp) {
                                        return ignoreRequestError || (resp = $templateRequestMinErr("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", tpl, resp.status, resp.statusText), $exceptionHandler(resp)), $q.reject(resp)
                                    }
                                    handleRequestFn.totalPendingRequests++, isString(tpl) && !isUndefined($templateCache.get(tpl)) || (tpl = $sce.getTrustedResourceUrl(tpl));
                                    var transformResponse = $http.defaults && $http.defaults.transformResponse;
                                    return isArray(transformResponse) ? transformResponse = transformResponse.filter(function (transformer) {
                                        return transformer !== defaultHttpResponseTransform
                                    }) : transformResponse === defaultHttpResponseTransform && (transformResponse = null), $http.get(tpl, extend({
                                        cache: $templateCache,
                                        transformResponse: transformResponse
                                    }, httpOptions))["finally"](function () {
                                        handleRequestFn.totalPendingRequests--
                                    }).then(function (response) {
                                        return $templateCache.put(tpl, response.data), response.data
                                    }, handleError)
                                }
                                return handleRequestFn.totalPendingRequests = 0, handleRequestFn
                            }]
                        }

                        function $$TestabilityProvider() {
                            this.$get = ["$rootScope", "$browser", "$location", function ($rootScope, $browser, $location) {
                                var testability = {};
                                return testability.findBindings = function (element, expression, opt_exactMatch) {
                                    var bindings = element.getElementsByClassName("ng-binding"),
                                        matches = [];
                                    return forEach(bindings, function (binding) {
                                        var dataBinding = angular.element(binding).data("$binding");
                                        dataBinding && forEach(dataBinding, function (bindingName) {
                                            if (opt_exactMatch) {
                                                var matcher = new RegExp("(^|\\s)" + escapeForRegexp(expression) + "(\\s|\\||$)");
                                                matcher.test(bindingName) && matches.push(binding)
                                            } else bindingName.indexOf(expression) !== -1 && matches.push(binding)
                                        })
                                    }), matches
                                }, testability.findModels = function (element, expression, opt_exactMatch) {
                                    for (var prefixes = ["ng-", "data-ng-", "ng\\:"], p = 0; p < prefixes.length; ++p) {
                                        var attributeEquals = opt_exactMatch ? "=" : "*=",
                                            selector = "[" + prefixes[p] + "model" + attributeEquals + '"' + expression + '"]',
                                            elements = element.querySelectorAll(selector);
                                        if (elements.length) return elements
                                    }
                                }, testability.getLocation = function () {
                                    return $location.url()
                                }, testability.setLocation = function (url) {
                                    url !== $location.url() && ($location.url(url), $rootScope.$digest())
                                }, testability.whenStable = function (callback) {
                                    $browser.notifyWhenNoOutstandingRequests(callback)
                                }, testability
                            }]
                        }

                        function $TimeoutProvider() {
                            this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function ($rootScope, $browser, $q, $$q, $exceptionHandler) {
                                function timeout(fn, delay, invokeApply) {
                                    isFunction(fn) || (invokeApply = delay, delay = fn, fn = noop);
                                    var timeoutId, args = sliceArgs(arguments, 3),
                                        skipApply = isDefined(invokeApply) && !invokeApply,
                                        deferred = (skipApply ? $$q : $q).defer(),
                                        promise = deferred.promise;
                                    return timeoutId = $browser.defer(function () {
                                        try {
                                            deferred.resolve(fn.apply(null, args))
                                        } catch (e) {
                                            deferred.reject(e), $exceptionHandler(e)
                                        } finally {
                                            delete deferreds[promise.$$timeoutId]
                                        }
                                        skipApply || $rootScope.$apply()
                                    }, delay), promise.$$timeoutId = timeoutId, deferreds[timeoutId] = deferred, promise
                                }
                                var deferreds = {};
                                return timeout.cancel = function (promise) {
                                    return !!(promise && promise.$$timeoutId in deferreds) && (deferreds[promise.$$timeoutId].promise["catch"](noop), deferreds[promise.$$timeoutId].reject("canceled"), delete deferreds[promise.$$timeoutId], $browser.defer.cancel(promise.$$timeoutId))
                                }, timeout
                            }]
                        }

                        function urlResolve(url) {
                            var href = url;
                            return msie && (urlParsingNode.setAttribute("href", href), href = urlParsingNode.href), urlParsingNode.setAttribute("href", href), {
                                href: urlParsingNode.href,
                                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
                                host: urlParsingNode.host,
                                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
                                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
                                hostname: urlParsingNode.hostname,
                                port: urlParsingNode.port,
                                pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
                            }
                        }

                        function urlIsSameOrigin(requestUrl) {
                            var parsed = isString(requestUrl) ? urlResolve(requestUrl) : requestUrl;
                            return parsed.protocol === originUrl.protocol && parsed.host === originUrl.host
                        }

                        function $WindowProvider() {
                            this.$get = valueFn(window)
                        }

                        function $$CookieReader($document) {
                            function safeGetCookie(rawDocument) {
                                try {
                                    return rawDocument.cookie || ""
                                } catch (e) {
                                    return ""
                                }
                            }

                            function safeDecodeURIComponent(str) {
                                try {
                                    return decodeURIComponent(str)
                                } catch (e) {
                                    return str
                                }
                            }
                            var rawDocument = $document[0] || {},
                                lastCookies = {},
                                lastCookieString = "";
                            return function () {
                                var cookieArray, cookie, i, index, name, currentCookieString = safeGetCookie(rawDocument);
                                if (currentCookieString !== lastCookieString)
                                    for (lastCookieString = currentCookieString, cookieArray = lastCookieString.split("; "), lastCookies = {}, i = 0; i < cookieArray.length; i++) cookie = cookieArray[i], index = cookie.indexOf("="), index > 0 && (name = safeDecodeURIComponent(cookie.substring(0, index)), isUndefined(lastCookies[name]) && (lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1))));
                                return lastCookies
                            }
                        }

                        function $$CookieReaderProvider() {
                            this.$get = $$CookieReader
                        }

                        function $FilterProvider($provide) {
                            function register(name, factory) {
                                if (isObject(name)) {
                                    var filters = {};
                                    return forEach(name, function (filter, key) {
                                        filters[key] = register(key, filter)
                                    }), filters
                                }
                                return $provide.factory(name + suffix, factory)
                            }
                            var suffix = "Filter";
                            this.register = register, this.$get = ["$injector", function ($injector) {
                                return function (name) {
                                    return $injector.get(name + suffix)
                                }
                            }], register("currency", currencyFilter), register("date", dateFilter), register("filter", filterFilter), register("json", jsonFilter), register("limitTo", limitToFilter), register("lowercase", lowercaseFilter), register("number", numberFilter), register("orderBy", orderByFilter), register("uppercase", uppercaseFilter)
                        }

                        function filterFilter() {
                            return function (array, expression, comparator, anyPropertyKey) {
                                if (!isArrayLike(array)) {
                                    if (null == array) return array;
                                    throw minErr("filter")("notarray", "Expected array but received: {0}", array)
                                }
                                anyPropertyKey = anyPropertyKey || "$";
                                var predicateFn, matchAgainstAnyProp, expressionType = getTypeForFilter(expression);
                                switch (expressionType) {
                                    case "function":
                                        predicateFn = expression;
                                        break;
                                    case "boolean":
                                    case "null":
                                    case "number":
                                    case "string":
                                        matchAgainstAnyProp = !0;
                                    case "object":
                                        predicateFn = createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp);
                                        break;
                                    default:
                                        return array
                                }
                                return Array.prototype.filter.call(array, predicateFn)
                            }
                        }

                        function createPredicateFn(expression, comparator, anyPropertyKey, matchAgainstAnyProp) {
                            var predicateFn, shouldMatchPrimitives = isObject(expression) && anyPropertyKey in expression;
                            return comparator === !0 ? comparator = equals : isFunction(comparator) || (comparator = function (actual, expected) {
                                return !isUndefined(actual) && (null === actual || null === expected ? actual === expected : !(isObject(expected) || isObject(actual) && !hasCustomToString(actual)) && (actual = lowercase("" + actual), expected = lowercase("" + expected), actual.indexOf(expected) !== -1))
                            }), predicateFn = function (item) {
                                return shouldMatchPrimitives && !isObject(item) ? deepCompare(item, expression[anyPropertyKey], comparator, anyPropertyKey, !1) : deepCompare(item, expression, comparator, anyPropertyKey, matchAgainstAnyProp)
                            }
                        }

                        function deepCompare(actual, expected, comparator, anyPropertyKey, matchAgainstAnyProp, dontMatchWholeObject) {
                            var actualType = getTypeForFilter(actual),
                                expectedType = getTypeForFilter(expected);
                            if ("string" === expectedType && "!" === expected.charAt(0)) return !deepCompare(actual, expected.substring(1), comparator, anyPropertyKey, matchAgainstAnyProp);
                            if (isArray(actual)) return actual.some(function (item) {
                                return deepCompare(item, expected, comparator, anyPropertyKey, matchAgainstAnyProp)
                            });
                            switch (actualType) {
                                case "object":
                                    var key;
                                    if (matchAgainstAnyProp) {
                                        for (key in actual)
                                            if ("$" !== key.charAt(0) && deepCompare(actual[key], expected, comparator, anyPropertyKey, !0)) return !0;
                                        return !dontMatchWholeObject && deepCompare(actual, expected, comparator, anyPropertyKey, !1)
                                    }
                                    if ("object" === expectedType) {
                                        for (key in expected) {
                                            var expectedVal = expected[key];
                                            if (!isFunction(expectedVal) && !isUndefined(expectedVal)) {
                                                var matchAnyProperty = key === anyPropertyKey,
                                                    actualVal = matchAnyProperty ? actual : actual[key];
                                                if (!deepCompare(actualVal, expectedVal, comparator, anyPropertyKey, matchAnyProperty, matchAnyProperty)) return !1
                                            }
                                        }
                                        return !0
                                    }
                                    return comparator(actual, expected);
                                case "function":
                                    return !1;
                                default:
                                    return comparator(actual, expected)
                            }
                        }

                        function getTypeForFilter(val) {
                            return null === val ? "null" : typeof val
                        }

                        function currencyFilter($locale) {
                            var formats = $locale.NUMBER_FORMATS;
                            return function (amount, currencySymbol, fractionSize) {
                                return isUndefined(currencySymbol) && (currencySymbol = formats.CURRENCY_SYM), isUndefined(fractionSize) && (fractionSize = formats.PATTERNS[1].maxFrac), null == amount ? amount : formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol)
                            }
                        }

                        function numberFilter($locale) {
                            var formats = $locale.NUMBER_FORMATS;
                            return function (number, fractionSize) {
                                return null == number ? number : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize)
                            }
                        }

                        function parse(numStr) {
                            var digits, numberOfIntegerDigits, i, j, zeros, exponent = 0;
                            for ((numberOfIntegerDigits = numStr.indexOf(DECIMAL_SEP)) > -1 && (numStr = numStr.replace(DECIMAL_SEP, "")), (i = numStr.search(/e/i)) > 0 ? (numberOfIntegerDigits < 0 && (numberOfIntegerDigits = i), numberOfIntegerDigits += +numStr.slice(i + 1), numStr = numStr.substring(0, i)) : numberOfIntegerDigits < 0 && (numberOfIntegerDigits = numStr.length), i = 0; numStr.charAt(i) === ZERO_CHAR; i++);
                            if (i === (zeros = numStr.length)) digits = [0], numberOfIntegerDigits = 1;
                            else {
                                for (zeros--; numStr.charAt(zeros) === ZERO_CHAR;) zeros--;
                                for (numberOfIntegerDigits -= i, digits = [], j = 0; i <= zeros; i++, j++) digits[j] = +numStr.charAt(i)
                            }
                            return numberOfIntegerDigits > MAX_DIGITS && (digits = digits.splice(0, MAX_DIGITS - 1), exponent = numberOfIntegerDigits - 1, numberOfIntegerDigits = 1), {
                                d: digits,
                                e: exponent,
                                i: numberOfIntegerDigits
                            }
                        }

                        function roundNumber(parsedNumber, fractionSize, minFrac, maxFrac) {
                            var digits = parsedNumber.d,
                                fractionLen = digits.length - parsedNumber.i;
                            fractionSize = isUndefined(fractionSize) ? Math.min(Math.max(minFrac, fractionLen), maxFrac) : +fractionSize;
                            var roundAt = fractionSize + parsedNumber.i,
                                digit = digits[roundAt];
                            if (roundAt > 0) {
                                digits.splice(Math.max(parsedNumber.i, roundAt));
                                for (var j = roundAt; j < digits.length; j++) digits[j] = 0
                            } else {
                                fractionLen = Math.max(0, fractionLen), parsedNumber.i = 1, digits.length = Math.max(1, roundAt = fractionSize + 1), digits[0] = 0;
                                for (var i = 1; i < roundAt; i++) digits[i] = 0
                            }
                            if (digit >= 5)
                                if (roundAt - 1 < 0) {
                                    for (var k = 0; k > roundAt; k--) digits.unshift(0), parsedNumber.i++;
                                    digits.unshift(1), parsedNumber.i++
                                } else digits[roundAt - 1]++;
                            for (; fractionLen < Math.max(0, fractionSize); fractionLen++) digits.push(0);
                            var carry = digits.reduceRight(function (carry, d, i, digits) {
                                return d += carry, digits[i] = d % 10, Math.floor(d / 10)
                            }, 0);
                            carry && (digits.unshift(carry), parsedNumber.i++)
                        }

                        function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
                            if (!isString(number) && !isNumber(number) || isNaN(number)) return "";
                            var parsedNumber, isInfinity = !isFinite(number),
                                isZero = !1,
                                numStr = Math.abs(number) + "",
                                formattedText = "";
                            if (isInfinity) formattedText = "∞";
                            else {
                                parsedNumber = parse(numStr), roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac);
                                var digits = parsedNumber.d,
                                    integerLen = parsedNumber.i,
                                    exponent = parsedNumber.e,
                                    decimals = [];
                                for (isZero = digits.reduce(function (isZero, d) {
                                        return isZero && !d
                                    }, !0); integerLen < 0;) digits.unshift(0), integerLen++;
                                integerLen > 0 ? decimals = digits.splice(integerLen, digits.length) : (decimals = digits, digits = [0]);
                                var groups = [];
                                for (digits.length >= pattern.lgSize && groups.unshift(digits.splice(-pattern.lgSize, digits.length).join("")); digits.length > pattern.gSize;) groups.unshift(digits.splice(-pattern.gSize, digits.length).join(""));
                                digits.length && groups.unshift(digits.join("")), formattedText = groups.join(groupSep), decimals.length && (formattedText += decimalSep + decimals.join("")), exponent && (formattedText += "e+" + exponent)
                            }
                            return number < 0 && !isZero ? pattern.negPre + formattedText + pattern.negSuf : pattern.posPre + formattedText + pattern.posSuf
                        }

                        function padNumber(num, digits, trim, negWrap) {
                            var neg = "";
                            for ((num < 0 || negWrap && num <= 0) && (negWrap ? num = -num + 1 : (num = -num, neg = "-")), num = "" + num; num.length < digits;) num = ZERO_CHAR + num;
                            return trim && (num = num.substr(num.length - digits)), neg + num
                        }

                        function dateGetter(name, size, offset, trim, negWrap) {
                            return offset = offset || 0,
                                function (date) {
                                    var value = date["get" + name]();
                                    return (offset > 0 || value > -offset) && (value += offset), 0 === value && offset === -12 && (value = 12), padNumber(value, size, trim, negWrap)
                                }
                        }

                        function dateStrGetter(name, shortForm, standAlone) {
                            return function (date, formats) {
                                var value = date["get" + name](),
                                    propPrefix = (standAlone ? "STANDALONE" : "") + (shortForm ? "SHORT" : ""),
                                    get = uppercase(propPrefix + name);
                                return formats[get][value]
                            }
                        }

                        function timeZoneGetter(date, formats, offset) {
                            var zone = -1 * offset,
                                paddedZone = zone >= 0 ? "+" : "";
                            return paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
                        }

                        function getFirstThursdayOfYear(year) {
                            var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
                            return new Date(year, 0, (dayOfWeekOnFirst <= 4 ? 5 : 12) - dayOfWeekOnFirst)
                        }

                        function getThursdayThisWeek(datetime) {
                            return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate() + (4 - datetime.getDay()))
                        }

                        function weekGetter(size) {
                            return function (date) {
                                var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
                                    thisThurs = getThursdayThisWeek(date),
                                    diff = +thisThurs - +firstThurs,
                                    result = 1 + Math.round(diff / 6048e5);
                                return padNumber(result, size)
                            }
                        }

                        function ampmGetter(date, formats) {
                            return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
                        }

                        function eraGetter(date, formats) {
                            return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1]
                        }

                        function longEraGetter(date, formats) {
                            return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1]
                        }

                        function dateFilter($locale) {
                            function jsonStringToDate(string) {
                                var match;
                                if (match = string.match(R_ISO8601_STR)) {
                                    var date = new Date(0),
                                        tzHour = 0,
                                        tzMin = 0,
                                        dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                                        timeSetter = match[8] ? date.setUTCHours : date.setHours;
                                    match[9] && (tzHour = toInt(match[9] + match[10]), tzMin = toInt(match[9] + match[11])), dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
                                    var h = toInt(match[4] || 0) - tzHour,
                                        m = toInt(match[5] || 0) - tzMin,
                                        s = toInt(match[6] || 0),
                                        ms = Math.round(1e3 * parseFloat("0." + (match[7] || 0)));
                                    return timeSetter.call(date, h, m, s, ms), date
                                }
                                return string
                            }
                            var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
                            return function (date, format, timezone) {
                                var fn, match, text = "",
                                    parts = [];
                                if (format = format || "mediumDate", format = $locale.DATETIME_FORMATS[format] || format, isString(date) && (date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date)), isNumber(date) && (date = new Date(date)), !isDate(date) || !isFinite(date.getTime())) return date;
                                for (; format;) match = DATE_FORMATS_SPLIT.exec(format), match ? (parts = concat(parts, match, 1), format = parts.pop()) : (parts.push(format), format = null);
                                var dateTimezoneOffset = date.getTimezoneOffset();
                                return timezone && (dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset), date = convertTimezoneToLocal(date, timezone, !0)), forEach(parts, function (value) {
                                    fn = DATE_FORMATS[value], text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset) : "''" === value ? "'" : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                                }), text
                            }
                        }

                        function jsonFilter() {
                            return function (object, spacing) {
                                return isUndefined(spacing) && (spacing = 2), toJson(object, spacing)
                            }
                        }

                        function limitToFilter() {
                            return function (input, limit, begin) {
                                return limit = Math.abs(Number(limit)) === 1 / 0 ? Number(limit) : toInt(limit), isNumberNaN(limit) ? input : (isNumber(input) && (input = input.toString()), isArrayLike(input) ? (begin = !begin || isNaN(begin) ? 0 : toInt(begin), begin = begin < 0 ? Math.max(0, input.length + begin) : begin, limit >= 0 ? sliceFn(input, begin, begin + limit) : 0 === begin ? sliceFn(input, limit, input.length) : sliceFn(input, Math.max(0, begin + limit), begin)) : input)
                            }
                        }

                        function sliceFn(input, begin, end) {
                            return isString(input) ? input.slice(begin, end) : slice.call(input, begin, end)
                        }

                        function orderByFilter($parse) {
                            function processPredicates(sortPredicates) {
                                return sortPredicates.map(function (predicate) {
                                    var descending = 1,
                                        get = identity;
                                    if (isFunction(predicate)) get = predicate;
                                    else if (isString(predicate) && ("+" !== predicate.charAt(0) && "-" !== predicate.charAt(0) || (descending = "-" === predicate.charAt(0) ? -1 : 1, predicate = predicate.substring(1)), "" !== predicate && (get = $parse(predicate), get.constant))) {
                                        var key = get();
                                        get = function (value) {
                                            return value[key]
                                        }
                                    }
                                    return {
                                        get: get,
                                        descending: descending
                                    }
                                })
                            }

                            function isPrimitive(value) {
                                switch (typeof value) {
                                    case "number":
                                    case "boolean":
                                    case "string":
                                        return !0;
                                    default:
                                        return !1
                                }
                            }

                            function objectValue(value) {
                                return isFunction(value.valueOf) && (value = value.valueOf(), isPrimitive(value)) ? value : hasCustomToString(value) && (value = value.toString(), isPrimitive(value)) ? value : value
                            }

                            function getPredicateValue(value, index) {
                                var type = typeof value;
                                return null === value ? (type = "string", value = "null") : "object" === type && (value = objectValue(value)), {
                                    value: value,
                                    type: type,
                                    index: index
                                }
                            }

                            function defaultCompare(v1, v2) {
                                var result = 0,
                                    type1 = v1.type,
                                    type2 = v2.type;
                                if (type1 === type2) {
                                    var value1 = v1.value,
                                        value2 = v2.value;
                                    "string" === type1 ? (value1 = value1.toLowerCase(), value2 = value2.toLowerCase()) : "object" === type1 && (isObject(value1) && (value1 = v1.index), isObject(value2) && (value2 = v2.index)), value1 !== value2 && (result = value1 < value2 ? -1 : 1)
                                } else result = type1 < type2 ? -1 : 1;
                                return result
                            }
                            return function (array, sortPredicate, reverseOrder, compareFn) {
                                function getComparisonObject(value, index) {
                                    return {
                                        value: value,
                                        tieBreaker: {
                                            value: index,
                                            type: "number",
                                            index: index
                                        },
                                        predicateValues: predicates.map(function (predicate) {
                                            return getPredicateValue(predicate.get(value), index)
                                        })
                                    }
                                }

                                function doComparison(v1, v2) {
                                    for (var i = 0, ii = predicates.length; i < ii; i++) {
                                        var result = compare(v1.predicateValues[i], v2.predicateValues[i]);
                                        if (result) return result * predicates[i].descending * descending
                                    }
                                    return compare(v1.tieBreaker, v2.tieBreaker) * descending
                                }
                                if (null == array) return array;
                                if (!isArrayLike(array)) throw minErr("orderBy")("notarray", "Expected array but received: {0}", array);
                                isArray(sortPredicate) || (sortPredicate = [sortPredicate]), 0 === sortPredicate.length && (sortPredicate = ["+"]);
                                var predicates = processPredicates(sortPredicate),
                                    descending = reverseOrder ? -1 : 1,
                                    compare = isFunction(compareFn) ? compareFn : defaultCompare,
                                    compareValues = Array.prototype.map.call(array, getComparisonObject);
                                return compareValues.sort(doComparison), array = compareValues.map(function (item) {
                                    return item.value
                                })
                            }
                        }

                        function ngDirective(directive) {
                            return isFunction(directive) && (directive = {
                                link: directive
                            }), directive.restrict = directive.restrict || "AC", valueFn(directive)
                        }

                        function nullFormRenameControl(control, name) {
                            control.$name = name
                        }

                        function FormController($element, $attrs, $scope, $animate, $interpolate) {
                            this.$$controls = [], this.$error = {}, this.$$success = {}, this.$pending = void 0, this.$name = $interpolate($attrs.name || $attrs.ngForm || "")($scope), this.$dirty = !1, this.$pristine = !0, this.$valid = !0, this.$invalid = !1, this.$submitted = !1, this.$$parentForm = nullFormCtrl, this.$$element = $element, this.$$animate = $animate, setupValidity(this)
                        }

                        function setupValidity(instance) {
                            instance.$$classCache = {}, instance.$$classCache[INVALID_CLASS] = !(instance.$$classCache[VALID_CLASS] = instance.$$element.hasClass(VALID_CLASS))
                        }

                        function addSetValidityMethod(context) {
                            function createAndSet(ctrl, name, value, controller) {
                                ctrl[name] || (ctrl[name] = {}), set(ctrl[name], value, controller)
                            }

                            function unsetAndCleanup(ctrl, name, value, controller) {
                                ctrl[name] && unset(ctrl[name], value, controller), isObjectEmpty(ctrl[name]) && (ctrl[name] = void 0)
                            }

                            function cachedToggleClass(ctrl, className, switchValue) {
                                switchValue && !ctrl.$$classCache[className] ? (ctrl.$$animate.addClass(ctrl.$$element, className), ctrl.$$classCache[className] = !0) : !switchValue && ctrl.$$classCache[className] && (ctrl.$$animate.removeClass(ctrl.$$element, className), ctrl.$$classCache[className] = !1)
                            }

                            function toggleValidationCss(ctrl, validationErrorKey, isValid) {
                                validationErrorKey = validationErrorKey ? "-" + snake_case(validationErrorKey, "-") : "", cachedToggleClass(ctrl, VALID_CLASS + validationErrorKey, isValid === !0), cachedToggleClass(ctrl, INVALID_CLASS + validationErrorKey, isValid === !1)
                            }
                            var clazz = context.clazz,
                                set = context.set,
                                unset = context.unset;
                            clazz.prototype.$setValidity = function (validationErrorKey, state, controller) {
                                isUndefined(state) ? createAndSet(this, "$pending", validationErrorKey, controller) : unsetAndCleanup(this, "$pending", validationErrorKey, controller), isBoolean(state) ? state ? (unset(this.$error, validationErrorKey, controller), set(this.$$success, validationErrorKey, controller)) : (set(this.$error, validationErrorKey, controller), unset(this.$$success, validationErrorKey, controller)) : (unset(this.$error, validationErrorKey, controller), unset(this.$$success, validationErrorKey, controller)), this.$pending ? (cachedToggleClass(this, PENDING_CLASS, !0), this.$valid = this.$invalid = void 0, toggleValidationCss(this, "", null)) : (cachedToggleClass(this, PENDING_CLASS, !1), this.$valid = isObjectEmpty(this.$error), this.$invalid = !this.$valid, toggleValidationCss(this, "", this.$valid));
                                var combinedState;
                                combinedState = this.$pending && this.$pending[validationErrorKey] ? void 0 : !this.$error[validationErrorKey] && (!!this.$$success[validationErrorKey] || null), toggleValidationCss(this, validationErrorKey, combinedState), this.$$parentForm.$setValidity(validationErrorKey, combinedState, this)
                            }
                        }

                        function isObjectEmpty(obj) {
                            if (obj)
                                for (var prop in obj)
                                    if (obj.hasOwnProperty(prop)) return !1;
                            return !0
                        }

                        function stringBasedInputType(ctrl) {
                            ctrl.$formatters.push(function (value) {
                                return ctrl.$isEmpty(value) ? value : value.toString()
                            })
                        }

                        function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl)
                        }

                        function baseInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            var type = lowercase(element[0].type);
                            if (!$sniffer.android) {
                                var composing = !1;
                                element.on("compositionstart", function () {
                                    composing = !0
                                }), element.on("compositionend", function () {
                                    composing = !1, listener()
                                })
                            }
                            var timeout, listener = function (ev) {
                                if (timeout && ($browser.defer.cancel(timeout), timeout = null), !composing) {
                                    var value = element.val(),
                                        event = ev && ev.type;
                                    "password" === type || attr.ngTrim && "false" === attr.ngTrim || (value = trim(value)), (ctrl.$viewValue !== value || "" === value && ctrl.$$hasNativeValidators) && ctrl.$setViewValue(value, event)
                                }
                            };
                            if ($sniffer.hasEvent("input")) element.on("input", listener);
                            else {
                                var deferListener = function (ev, input, origValue) {
                                    timeout || (timeout = $browser.defer(function () {
                                        timeout = null, input && input.value === origValue || listener(ev)
                                    }))
                                };
                                element.on("keydown", function (event) {
                                    var key = event.keyCode;
                                    91 === key || 15 < key && key < 19 || 37 <= key && key <= 40 || deferListener(event, this, this.value)
                                }), $sniffer.hasEvent("paste") && element.on("paste cut", deferListener)
                            }
                            element.on("change", listener), PARTIAL_VALIDATION_TYPES[type] && ctrl.$$hasNativeValidators && type === attr.type && element.on(PARTIAL_VALIDATION_EVENTS, function (ev) {
                                if (!timeout) {
                                    var validity = this[VALIDITY_STATE_PROPERTY],
                                        origBadInput = validity.badInput,
                                        origTypeMismatch = validity.typeMismatch;
                                    timeout = $browser.defer(function () {
                                        timeout = null, validity.badInput === origBadInput && validity.typeMismatch === origTypeMismatch || listener(ev)
                                    })
                                }
                            }), ctrl.$render = function () {
                                var value = ctrl.$isEmpty(ctrl.$viewValue) ? "" : ctrl.$viewValue;
                                element.val() !== value && element.val(value)
                            }
                        }

                        function weekParser(isoWeek, existingDate) {
                            if (isDate(isoWeek)) return isoWeek;
                            if (isString(isoWeek)) {
                                WEEK_REGEXP.lastIndex = 0;
                                var parts = WEEK_REGEXP.exec(isoWeek);
                                if (parts) {
                                    var year = +parts[1],
                                        week = +parts[2],
                                        hours = 0,
                                        minutes = 0,
                                        seconds = 0,
                                        milliseconds = 0,
                                        firstThurs = getFirstThursdayOfYear(year),
                                        addDays = 7 * (week - 1);
                                    return existingDate && (hours = existingDate.getHours(), minutes = existingDate.getMinutes(), seconds = existingDate.getSeconds(), milliseconds = existingDate.getMilliseconds()), new Date(year, 0, firstThurs.getDate() + addDays, hours, minutes, seconds, milliseconds)
                                }
                            }
                            return NaN
                        }

                        function createDateParser(regexp, mapping) {
                            return function (iso, date) {
                                var parts, map;
                                if (isDate(iso)) return iso;
                                if (isString(iso)) {
                                    if ('"' === iso.charAt(0) && '"' === iso.charAt(iso.length - 1) && (iso = iso.substring(1, iso.length - 1)), ISO_DATE_REGEXP.test(iso)) return new Date(iso);
                                    if (regexp.lastIndex = 0, parts = regexp.exec(iso)) return parts.shift(), map = date ? {
                                        yyyy: date.getFullYear(),
                                        MM: date.getMonth() + 1,
                                        dd: date.getDate(),
                                        HH: date.getHours(),
                                        mm: date.getMinutes(),
                                        ss: date.getSeconds(),
                                        sss: date.getMilliseconds() / 1e3
                                    } : {
                                        yyyy: 1970,
                                        MM: 1,
                                        dd: 1,
                                        HH: 0,
                                        mm: 0,
                                        ss: 0,
                                        sss: 0
                                    }, forEach(parts, function (part, index) {
                                        index < mapping.length && (map[mapping[index]] = +part)
                                    }), new Date(map.yyyy, map.MM - 1, map.dd, map.HH, map.mm, map.ss || 0, 1e3 * map.sss || 0)
                                }
                                return NaN
                            }
                        }

                        function createDateInputType(type, regexp, parseDate, format) {
                            return function (scope, element, attr, ctrl, $sniffer, $browser, $filter) {
                                function isValidDate(value) {
                                    return value && !(value.getTime && value.getTime() !== value.getTime())
                                }

                                function parseObservedDateValue(val) {
                                    return isDefined(val) && !isDate(val) ? parseDate(val) || void 0 : val
                                }
                                badInputChecker(scope, element, attr, ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
                                var previousDate, timezone = ctrl && ctrl.$options.getOption("timezone");
                                if (ctrl.$$parserName = type, ctrl.$parsers.push(function (value) {
                                        if (ctrl.$isEmpty(value)) return null;
                                        if (regexp.test(value)) {
                                            var parsedDate = parseDate(value, previousDate);
                                            return timezone && (parsedDate = convertTimezoneToLocal(parsedDate, timezone)), parsedDate
                                        }
                                    }), ctrl.$formatters.push(function (value) {
                                        if (value && !isDate(value)) throw ngModelMinErr("datefmt", "Expected `{0}` to be a date", value);
                                        return isValidDate(value) ? (previousDate = value, previousDate && timezone && (previousDate = convertTimezoneToLocal(previousDate, timezone, !0)), $filter("date")(value, format, timezone)) : (previousDate = null, "")
                                    }), isDefined(attr.min) || attr.ngMin) {
                                    var minVal;
                                    ctrl.$validators.min = function (value) {
                                        return !isValidDate(value) || isUndefined(minVal) || parseDate(value) >= minVal
                                    }, attr.$observe("min", function (val) {
                                        minVal = parseObservedDateValue(val), ctrl.$validate()
                                    })
                                }
                                if (isDefined(attr.max) || attr.ngMax) {
                                    var maxVal;
                                    ctrl.$validators.max = function (value) {
                                        return !isValidDate(value) || isUndefined(maxVal) || parseDate(value) <= maxVal
                                    }, attr.$observe("max", function (val) {
                                        maxVal = parseObservedDateValue(val), ctrl.$validate()
                                    })
                                }
                            }
                        }

                        function badInputChecker(scope, element, attr, ctrl) {
                            var node = element[0],
                                nativeValidation = ctrl.$$hasNativeValidators = isObject(node.validity);
                            nativeValidation && ctrl.$parsers.push(function (value) {
                                var validity = element.prop(VALIDITY_STATE_PROPERTY) || {};
                                return validity.badInput || validity.typeMismatch ? void 0 : value
                            })
                        }

                        function numberFormatterParser(ctrl) {
                            ctrl.$$parserName = "number", ctrl.$parsers.push(function (value) {
                                return ctrl.$isEmpty(value) ? null : NUMBER_REGEXP.test(value) ? parseFloat(value) : void 0
                            }), ctrl.$formatters.push(function (value) {
                                if (!ctrl.$isEmpty(value)) {
                                    if (!isNumber(value)) throw ngModelMinErr("numfmt", "Expected `{0}` to be a number", value);
                                    value = value.toString()
                                }
                                return value
                            })
                        }

                        function parseNumberAttrVal(val) {
                            return isDefined(val) && !isNumber(val) && (val = parseFloat(val)), isNumberNaN(val) ? void 0 : val
                        }

                        function isNumberInteger(num) {
                            return (0 | num) === num
                        }

                        function countDecimals(num) {
                            var numString = num.toString(),
                                decimalSymbolIndex = numString.indexOf(".");
                            if (decimalSymbolIndex === -1) {
                                if (-1 < num && num < 1) {
                                    var match = /e-(\d+)$/.exec(numString);
                                    if (match) return Number(match[1])
                                }
                                return 0
                            }
                            return numString.length - decimalSymbolIndex - 1
                        }

                        function isValidForStep(viewValue, stepBase, step) {
                            var value = Number(viewValue),
                                isNonIntegerValue = !isNumberInteger(value),
                                isNonIntegerStepBase = !isNumberInteger(stepBase),
                                isNonIntegerStep = !isNumberInteger(step);
                            if (isNonIntegerValue || isNonIntegerStepBase || isNonIntegerStep) {
                                var valueDecimals = isNonIntegerValue ? countDecimals(value) : 0,
                                    stepBaseDecimals = isNonIntegerStepBase ? countDecimals(stepBase) : 0,
                                    stepDecimals = isNonIntegerStep ? countDecimals(step) : 0,
                                    decimalCount = Math.max(valueDecimals, stepBaseDecimals, stepDecimals),
                                    multiplier = Math.pow(10, decimalCount);
                                value *= multiplier, stepBase *= multiplier, step *= multiplier, isNonIntegerValue && (value = Math.round(value)), isNonIntegerStepBase && (stepBase = Math.round(stepBase)), isNonIntegerStep && (step = Math.round(step))
                            }
                            return (value - stepBase) % step === 0
                        }

                        function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            badInputChecker(scope, element, attr, ctrl), numberFormatterParser(ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
                            var minVal, maxVal;
                            if ((isDefined(attr.min) || attr.ngMin) && (ctrl.$validators.min = function (value) {
                                    return ctrl.$isEmpty(value) || isUndefined(minVal) || value >= minVal
                                }, attr.$observe("min", function (val) {
                                    minVal = parseNumberAttrVal(val), ctrl.$validate()
                                })), (isDefined(attr.max) || attr.ngMax) && (ctrl.$validators.max = function (value) {
                                    return ctrl.$isEmpty(value) || isUndefined(maxVal) || value <= maxVal
                                }, attr.$observe("max", function (val) {
                                    maxVal = parseNumberAttrVal(val), ctrl.$validate()
                                })), isDefined(attr.step) || attr.ngStep) {
                                var stepVal;
                                ctrl.$validators.step = function (modelValue, viewValue) {
                                    return ctrl.$isEmpty(viewValue) || isUndefined(stepVal) || isValidForStep(viewValue, minVal || 0, stepVal)
                                }, attr.$observe("step", function (val) {
                                    stepVal = parseNumberAttrVal(val), ctrl.$validate()
                                })
                            }
                        }

                        function rangeInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            function setInitialValueAndObserver(htmlAttrName, changeFn) {
                                element.attr(htmlAttrName, attr[htmlAttrName]), attr.$observe(htmlAttrName, changeFn)
                            }

                            function minChange(val) {
                                if (minVal = parseNumberAttrVal(val), !isNumberNaN(ctrl.$modelValue))
                                    if (supportsRange) {
                                        var elVal = element.val();
                                        minVal > elVal && (elVal = minVal, element.val(elVal)), ctrl.$setViewValue(elVal)
                                    } else ctrl.$validate()
                            }

                            function maxChange(val) {
                                if (maxVal = parseNumberAttrVal(val), !isNumberNaN(ctrl.$modelValue))
                                    if (supportsRange) {
                                        var elVal = element.val();
                                        maxVal < elVal && (element.val(maxVal), elVal = maxVal < minVal ? minVal : maxVal), ctrl.$setViewValue(elVal)
                                    } else ctrl.$validate()
                            }

                            function stepChange(val) {
                                stepVal = parseNumberAttrVal(val), isNumberNaN(ctrl.$modelValue) || (supportsRange && ctrl.$viewValue !== element.val() ? ctrl.$setViewValue(element.val()) : ctrl.$validate())
                            }
                            badInputChecker(scope, element, attr, ctrl), numberFormatterParser(ctrl), baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
                            var supportsRange = ctrl.$$hasNativeValidators && "range" === element[0].type,
                                minVal = supportsRange ? 0 : void 0,
                                maxVal = supportsRange ? 100 : void 0,
                                stepVal = supportsRange ? 1 : void 0,
                                validity = element[0].validity,
                                hasMinAttr = isDefined(attr.min),
                                hasMaxAttr = isDefined(attr.max),
                                hasStepAttr = isDefined(attr.step),
                                originalRender = ctrl.$render;
                            ctrl.$render = supportsRange && isDefined(validity.rangeUnderflow) && isDefined(validity.rangeOverflow) ? function () {
                                originalRender(), ctrl.$setViewValue(element.val())
                            } : originalRender, hasMinAttr && (ctrl.$validators.min = supportsRange ? function () {
                                return !0
                            } : function (modelValue, viewValue) {
                                return ctrl.$isEmpty(viewValue) || isUndefined(minVal) || viewValue >= minVal
                            }, setInitialValueAndObserver("min", minChange)), hasMaxAttr && (ctrl.$validators.max = supportsRange ? function () {
                                return !0
                            } : function (modelValue, viewValue) {
                                return ctrl.$isEmpty(viewValue) || isUndefined(maxVal) || viewValue <= maxVal
                            }, setInitialValueAndObserver("max", maxChange)), hasStepAttr && (ctrl.$validators.step = supportsRange ? function () {
                                return !validity.stepMismatch
                            } : function (modelValue, viewValue) {
                                return ctrl.$isEmpty(viewValue) || isUndefined(stepVal) || isValidForStep(viewValue, minVal || 0, stepVal)
                            }, setInitialValueAndObserver("step", stepChange))
                        }

                        function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "url", ctrl.$validators.url = function (modelValue, viewValue) {
                                var value = modelValue || viewValue;
                                return ctrl.$isEmpty(value) || URL_REGEXP.test(value)
                            }
                        }

                        function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
                            baseInputType(scope, element, attr, ctrl, $sniffer, $browser), stringBasedInputType(ctrl), ctrl.$$parserName = "email", ctrl.$validators.email = function (modelValue, viewValue) {
                                var value = modelValue || viewValue;
                                return ctrl.$isEmpty(value) || EMAIL_REGEXP.test(value)
                            }
                        }

                        function radioInputType(scope, element, attr, ctrl) {
                            var doTrim = !attr.ngTrim || "false" !== trim(attr.ngTrim);
                            isUndefined(attr.name) && element.attr("name", nextUid());
                            var listener = function (ev) {
                                var value;
                                element[0].checked && (value = attr.value, doTrim && (value = trim(value)), ctrl.$setViewValue(value, ev && ev.type))
                            };
                            element.on("click", listener), ctrl.$render = function () {
                                var value = attr.value;
                                doTrim && (value = trim(value)), element[0].checked = value === ctrl.$viewValue
                            }, attr.$observe("value", ctrl.$render)
                        }

                        function parseConstantExpr($parse, context, name, expression, fallback) {
                            var parseFn;
                            if (isDefined(expression)) {
                                if (parseFn = $parse(expression), !parseFn.constant) throw ngModelMinErr("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", name, expression);
                                return parseFn(context)
                            }
                            return fallback
                        }

                        function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
                            var trueValue = parseConstantExpr($parse, scope, "ngTrueValue", attr.ngTrueValue, !0),
                                falseValue = parseConstantExpr($parse, scope, "ngFalseValue", attr.ngFalseValue, !1),
                                listener = function (ev) {
                                    ctrl.$setViewValue(element[0].checked, ev && ev.type)
                                };
                            element.on("click", listener), ctrl.$render = function () {
                                element[0].checked = ctrl.$viewValue
                            }, ctrl.$isEmpty = function (value) {
                                return value === !1
                            }, ctrl.$formatters.push(function (value) {
                                return equals(value, trueValue)
                            }), ctrl.$parsers.push(function (value) {
                                return value ? trueValue : falseValue
                            })
                        }

                        function classDirective(name, selector) {
                            function arrayDifference(tokens1, tokens2) {
                                if (!tokens1 || !tokens1.length) return [];
                                if (!tokens2 || !tokens2.length) return tokens1;
                                var values = [];
                                outer: for (var i = 0; i < tokens1.length; i++) {
                                    for (var token = tokens1[i], j = 0; j < tokens2.length; j++)
                                        if (token === tokens2[j]) continue outer;
                                    values.push(token)
                                }
                                return values
                            }

                            function split(classString) {
                                return classString && classString.split(" ")
                            }

                            function toClassString(classValue) {
                                var classString = classValue;
                                return isArray(classValue) ? classString = classValue.map(toClassString).join(" ") : isObject(classValue) && (classString = Object.keys(classValue).filter(function (key) {
                                    return classValue[key]
                                }).join(" ")), classString
                            }

                            function toFlatValue(classValue) {
                                var flatValue = classValue;
                                if (isArray(classValue)) flatValue = classValue.map(toFlatValue);
                                else if (isObject(classValue)) {
                                    var hasUndefined = !1;
                                    flatValue = Object.keys(classValue).filter(function (key) {
                                        var value = classValue[key];
                                        return !hasUndefined && isUndefined(value) && (hasUndefined = !0), value
                                    }), hasUndefined && flatValue.push(void 0)
                                }
                                return flatValue
                            }
                            name = "ngClass" + name;
                            var indexWatchExpression;
                            return ["$parse", function ($parse) {
                                return {
                                    restrict: "AC",
                                    link: function (scope, element, attr) {
                                        function addClasses(classString) {
                                            classString = digestClassCounts(split(classString), 1), attr.$addClass(classString)
                                        }

                                        function removeClasses(classString) {
                                            classString = digestClassCounts(split(classString), -1), attr.$removeClass(classString)
                                        }

                                        function updateClasses(oldClassString, newClassString) {
                                            var oldClassArray = split(oldClassString),
                                                newClassArray = split(newClassString),
                                                toRemoveArray = arrayDifference(oldClassArray, newClassArray),
                                                toAddArray = arrayDifference(newClassArray, oldClassArray),
                                                toRemoveString = digestClassCounts(toRemoveArray, -1),
                                                toAddString = digestClassCounts(toAddArray, 1);
                                            attr.$addClass(toAddString), attr.$removeClass(toRemoveString)
                                        }

                                        function digestClassCounts(classArray, count) {
                                            var classesToUpdate = [];
                                            return forEach(classArray, function (className) {
                                                (count > 0 || classCounts[className]) && (classCounts[className] = (classCounts[className] || 0) + count, classCounts[className] === +(count > 0) && classesToUpdate.push(className))
                                            }), classesToUpdate.join(" ")
                                        }

                                        function ngClassIndexWatchAction(newModulo) {
                                            newModulo === selector ? addClasses(oldClassString) : removeClasses(oldClassString), oldModulo = newModulo
                                        }

                                        function ngClassOneTimeWatchAction(newClassValue) {
                                            var newClassString = toClassString(newClassValue);
                                            newClassString !== oldClassString && ngClassWatchAction(newClassString)
                                        }

                                        function ngClassWatchAction(newClassString) {
                                            oldModulo === selector && updateClasses(oldClassString, newClassString), oldClassString = newClassString
                                        }
                                        var oldClassString, expression = attr[name].trim(),
                                            isOneTime = ":" === expression.charAt(0) && ":" === expression.charAt(1),
                                            watchInterceptor = isOneTime ? toFlatValue : toClassString,
                                            watchExpression = $parse(expression, watchInterceptor),
                                            watchAction = isOneTime ? ngClassOneTimeWatchAction : ngClassWatchAction,
                                            classCounts = element.data("$classCounts"),
                                            oldModulo = !0;
                                        classCounts || (classCounts = createMap(), element.data("$classCounts", classCounts)), "ngClass" !== name && (indexWatchExpression || (indexWatchExpression = $parse("$index", function ($index) {
                                            return 1 & $index
                                        })), scope.$watch(indexWatchExpression, ngClassIndexWatchAction)), scope.$watch(watchExpression, watchAction, isOneTime)
                                    }
                                }
                            }]
                        }

                        function NgModelController($scope, $exceptionHandler, $attr, $element, $parse, $animate, $timeout, $q, $interpolate) {
                            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = void 0, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = void 0, this.$name = $interpolate($attr.name || "", !1)($scope), this.$$parentForm = nullFormCtrl, this.$options = defaultModelOptions, this.$$parsedNgModel = $parse($attr.ngModel), this.$$parsedNgModelAssign = this.$$parsedNgModel.assign, this.$$ngModelGet = this.$$parsedNgModel, this.$$ngModelSet = this.$$parsedNgModelAssign, this.$$pendingDebounce = null, this.$$parserValid = void 0, this.$$currentValidationRunId = 0, this.$$scope = $scope, this.$$attr = $attr, this.$$element = $element, this.$$animate = $animate, this.$$timeout = $timeout, this.$$parse = $parse, this.$$q = $q, this.$$exceptionHandler = $exceptionHandler, setupValidity(this), setupModelWatcher(this)
                        }

                        function setupModelWatcher(ctrl) {
                            ctrl.$$scope.$watch(function () {
                                var modelValue = ctrl.$$ngModelGet(ctrl.$$scope);
                                if (modelValue !== ctrl.$modelValue && (ctrl.$modelValue === ctrl.$modelValue || modelValue === modelValue)) {
                                    ctrl.$modelValue = ctrl.$$rawModelValue = modelValue, ctrl.$$parserValid = void 0;
                                    for (var formatters = ctrl.$formatters, idx = formatters.length, viewValue = modelValue; idx--;) viewValue = formatters[idx](viewValue);
                                    ctrl.$viewValue !== viewValue && (ctrl.$$updateEmptyClasses(viewValue), ctrl.$viewValue = ctrl.$$lastCommittedViewValue = viewValue, ctrl.$render(), ctrl.$$runValidators(ctrl.$modelValue, ctrl.$viewValue, noop))
                                }
                                return modelValue
                            })
                        }

                        function ModelOptions(options) {
                            this.$$options = options
                        }

                        function defaults(dst, src) {
                            forEach(src, function (value, key) {
                                isDefined(dst[key]) || (dst[key] = value)
                            })
                        }
                        var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/,
                            VALIDITY_STATE_PROPERTY = "validity",
                            hasOwnProperty = Object.prototype.hasOwnProperty,
                            lowercase = function (string) {
                                return isString(string) ? string.toLowerCase() : string
                            },
                            uppercase = function (string) {
                                return isString(string) ? string.toUpperCase() : string
                            },
                            manualLowercase = function (s) {
                                return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
                                    return String.fromCharCode(32 | ch.charCodeAt(0))
                                }) : s
                            },
                            manualUppercase = function (s) {
                                return isString(s) ? s.replace(/[a-z]/g, function (ch) {
                                    return String.fromCharCode(ch.charCodeAt(0) & -33)
                                }) : s
                            };
                        "i" !== "I".toLowerCase() && (lowercase = manualLowercase, uppercase = manualUppercase);
                        var msie, jqLite, jQuery, angularModule, slice = [].slice,
                            splice = [].splice,
                            push = [].push,
                            toString = Object.prototype.toString,
                            getPrototypeOf = Object.getPrototypeOf,
                            ngMinErr = minErr("ng"),
                            angular = window.angular || (window.angular = {}),
                            uid = 0;
                        msie = window.document.documentMode;
                        var isNumberNaN = Number.isNaN || function (num) {
                            return num !== num
                        };
                        noop.$inject = [], identity.$inject = [];
                        var isArray = Array.isArray,
                            TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
                            trim = function (value) {
                                return isString(value) ? value.trim() : value
                            },
                            escapeForRegexp = function (s) {
                                return s.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
                            },
                            csp = function () {
                                function noUnsafeEval() {
                                    try {
                                        return new Function(""), !1
                                    } catch (e) {
                                        return !0
                                    }
                                }
                                if (!isDefined(csp.rules)) {
                                    var ngCspElement = window.document.querySelector("[ng-csp]") || window.document.querySelector("[data-ng-csp]");
                                    if (ngCspElement) {
                                        var ngCspAttribute = ngCspElement.getAttribute("ng-csp") || ngCspElement.getAttribute("data-ng-csp");
                                        csp.rules = {
                                            noUnsafeEval: !ngCspAttribute || ngCspAttribute.indexOf("no-unsafe-eval") !== -1,
                                            noInlineStyle: !ngCspAttribute || ngCspAttribute.indexOf("no-inline-style") !== -1
                                        }
                                    } else csp.rules = {
                                        noUnsafeEval: noUnsafeEval(),
                                        noInlineStyle: !1
                                    }
                                }
                                return csp.rules
                            },
                            jq = function () {
                                if (isDefined(jq.name_)) return jq.name_;
                                var el, i, prefix, name, ii = ngAttrPrefixes.length;
                                for (i = 0; i < ii; ++i)
                                    if (prefix = ngAttrPrefixes[i], el = window.document.querySelector("[" + prefix.replace(":", "\\:") + "jq]")) {
                                        name = el.getAttribute(prefix + "jq");
                                        break
                                    } return jq.name_ = name
                            },
                            ALL_COLONS = /:/g,
                            ngAttrPrefixes = ["ng-", "data-ng-", "ng:", "x-ng-"],
                            isAutoBootstrapAllowed = allowAutoBootstrap(window.document),
                            SNAKE_CASE_REGEXP = /[A-Z]/g,
                            bindJQueryFired = !1,
                            NODE_TYPE_ELEMENT = 1,
                            NODE_TYPE_ATTRIBUTE = 2,
                            NODE_TYPE_TEXT = 3,
                            NODE_TYPE_COMMENT = 8,
                            NODE_TYPE_DOCUMENT = 9,
                            NODE_TYPE_DOCUMENT_FRAGMENT = 11,
                            version = {
                                full: "1.6.2",
                                major: 1,
                                minor: 6,
                                dot: 2,
                                codeName: "llamacorn-lovehug"
                            };
                        JQLite.expando = "ng339";
                        var jqCache = JQLite.cache = {},
                            jqId = 1;
                        JQLite._data = function (node) {
                            return this.cache[node[this.expando]] || {}
                        };
                        var DASH_LOWERCASE_REGEXP = /-([a-z])/g,
                            MS_HACK_REGEXP = /^-ms-/,
                            MOUSE_EVENT_MAP = {
                                mouseleave: "mouseout",
                                mouseenter: "mouseover"
                            },
                            jqLiteMinErr = minErr("jqLite"),
                            SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                            HTML_REGEXP = /<|&#?\w+;/,
                            TAG_NAME_REGEXP = /<([\w:-]+)/,
                            XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                            wrapMap = {
                                option: [1, '<select multiple="multiple">', "</select>"],
                                thead: [1, "<table>", "</table>"],
                                col: [2, "<table><colgroup>", "</colgroup></table>"],
                                tr: [2, "<table><tbody>", "</tbody></table>"],
                                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                                _default: [0, "", ""]
                            };
                        wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
                        var jqLiteContains = window.Node.prototype.contains || function (arg) {
                                return !!(16 & this.compareDocumentPosition(arg))
                            },
                            JQLitePrototype = JQLite.prototype = {
                                ready: jqLiteReady,
                                toString: function () {
                                    var value = [];
                                    return forEach(this, function (e) {
                                        value.push("" + e)
                                    }), "[" + value.join(", ") + "]"
                                },
                                eq: function (index) {
                                    return jqLite(index >= 0 ? this[index] : this[this.length + index])
                                },
                                length: 0,
                                push: push,
                                sort: [].sort,
                                splice: [].splice
                            },
                            BOOLEAN_ATTR = {};
                        forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (value) {
                            BOOLEAN_ATTR[lowercase(value)] = value
                        });
                        var BOOLEAN_ELEMENTS = {};
                        forEach("input,select,option,textarea,button,form,details".split(","), function (value) {
                            BOOLEAN_ELEMENTS[value] = !0
                        });
                        var ALIASED_ATTR = {
                            ngMinlength: "minlength",
                            ngMaxlength: "maxlength",
                            ngMin: "min",
                            ngMax: "max",
                            ngPattern: "pattern",
                            ngStep: "step"
                        };
                        forEach({
                            data: jqLiteData,
                            removeData: jqLiteRemoveData,
                            hasData: jqLiteHasData,
                            cleanData: jqLiteCleanData
                        }, function (fn, name) {
                            JQLite[name] = fn
                        }), forEach({
                            data: jqLiteData,
                            inheritedData: jqLiteInheritedData,
                            scope: function (element) {
                                return jqLite.data(element, "$scope") || jqLiteInheritedData(element.parentNode || element, ["$isolateScope", "$scope"])
                            },
                            isolateScope: function (element) {
                                return jqLite.data(element, "$isolateScope") || jqLite.data(element, "$isolateScopeNoTemplate")
                            },
                            controller: jqLiteController,
                            injector: function (element) {
                                return jqLiteInheritedData(element, "$injector")
                            },
                            removeAttr: function (element, name) {
                                element.removeAttribute(name)
                            },
                            hasClass: jqLiteHasClass,
                            css: function (element, name, value) {
                                return name = cssKebabToCamel(name), isDefined(value) ? void(element.style[name] = value) : element.style[name]
                            },
                            attr: function (element, name, value) {
                                var ret, nodeType = element.nodeType;
                                if (nodeType !== NODE_TYPE_TEXT && nodeType !== NODE_TYPE_ATTRIBUTE && nodeType !== NODE_TYPE_COMMENT && element.getAttribute) {
                                    var lowercasedName = lowercase(name),
                                        isBooleanAttr = BOOLEAN_ATTR[lowercasedName];
                                    return isDefined(value) ? void(null === value || value === !1 && isBooleanAttr ? element.removeAttribute(name) : element.setAttribute(name, isBooleanAttr ? lowercasedName : value)) : (ret = element.getAttribute(name), isBooleanAttr && null !== ret && (ret = lowercasedName), null === ret ? void 0 : ret)
                                }
                            },
                            prop: function (element, name, value) {
                                return isDefined(value) ? void(element[name] = value) : element[name]
                            },
                            text: function () {
                                function getText(element, value) {
                                    if (isUndefined(value)) {
                                        var nodeType = element.nodeType;
                                        return nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT ? element.textContent : ""
                                    }
                                    element.textContent = value
                                }
                                return getText.$dv = "", getText
                            }(),
                            val: function (element, value) {
                                if (isUndefined(value)) {
                                    if (element.multiple && "select" === nodeName_(element)) {
                                        var result = [];
                                        return forEach(element.options, function (option) {
                                            option.selected && result.push(option.value || option.text)
                                        }), result
                                    }
                                    return element.value
                                }
                                element.value = value
                            },
                            html: function (element, value) {
                                return isUndefined(value) ? element.innerHTML : (jqLiteDealoc(element, !0), void(element.innerHTML = value))
                            },
                            empty: jqLiteEmpty
                        }, function (fn, name) {
                            JQLite.prototype[name] = function (arg1, arg2) {
                                var i, key, nodeCount = this.length;
                                if (fn !== jqLiteEmpty && isUndefined(2 === fn.length && fn !== jqLiteHasClass && fn !== jqLiteController ? arg1 : arg2)) {
                                    if (isObject(arg1)) {
                                        for (i = 0; i < nodeCount; i++)
                                            if (fn === jqLiteData) fn(this[i], arg1);
                                            else
                                                for (key in arg1) fn(this[i], key, arg1[key]);
                                        return this
                                    }
                                    for (var value = fn.$dv, jj = isUndefined(value) ? Math.min(nodeCount, 1) : nodeCount, j = 0; j < jj; j++) {
                                        var nodeValue = fn(this[j], arg1, arg2);
                                        value = value ? value + nodeValue : nodeValue
                                    }
                                    return value
                                }
                                for (i = 0; i < nodeCount; i++) fn(this[i], arg1, arg2);
                                return this
                            }
                        }), forEach({
                            removeData: jqLiteRemoveData,
                            on: function (element, type, fn, unsupported) {
                                if (isDefined(unsupported)) throw jqLiteMinErr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                                if (jqLiteAcceptsData(element)) {
                                    var expandoStore = jqLiteExpandoStore(element, !0),
                                        events = expandoStore.events,
                                        handle = expandoStore.handle;
                                    handle || (handle = expandoStore.handle = createEventHandler(element, events));
                                    for (var types = type.indexOf(" ") >= 0 ? type.split(" ") : [type], i = types.length, addHandler = function (type, specialHandlerWrapper, noEventListener) {
                                            var eventFns = events[type];
                                            eventFns || (eventFns = events[type] = [], eventFns.specialHandlerWrapper = specialHandlerWrapper, "$destroy" === type || noEventListener || element.addEventListener(type, handle)), eventFns.push(fn)
                                        }; i--;) type = types[i], MOUSE_EVENT_MAP[type] ? (addHandler(MOUSE_EVENT_MAP[type], specialMouseHandlerWrapper), addHandler(type, void 0, !0)) : addHandler(type)
                                }
                            },
                            off: jqLiteOff,
                            one: function (element, type, fn) {
                                element = jqLite(element), element.on(type, function onFn() {
                                    element.off(type, fn), element.off(type, onFn)
                                }), element.on(type, fn)
                            },
                            replaceWith: function (element, replaceNode) {
                                var index, parent = element.parentNode;
                                jqLiteDealoc(element), forEach(new JQLite(replaceNode), function (node) {
                                    index ? parent.insertBefore(node, index.nextSibling) : parent.replaceChild(node, element), index = node
                                })
                            },
                            children: function (element) {
                                var children = [];
                                return forEach(element.childNodes, function (element) {
                                    element.nodeType === NODE_TYPE_ELEMENT && children.push(element)
                                }), children
                            },
                            contents: function (element) {
                                return element.contentDocument || element.childNodes || []
                            },
                            append: function (element, node) {
                                var nodeType = element.nodeType;
                                if (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_DOCUMENT_FRAGMENT) {
                                    node = new JQLite(node);
                                    for (var i = 0, ii = node.length; i < ii; i++) {
                                        var child = node[i];
                                        element.appendChild(child)
                                    }
                                }
                            },
                            prepend: function (element, node) {
                                if (element.nodeType === NODE_TYPE_ELEMENT) {
                                    var index = element.firstChild;
                                    forEach(new JQLite(node), function (child) {
                                        element.insertBefore(child, index)
                                    })
                                }
                            },
                            wrap: function (element, wrapNode) {
                                jqLiteWrapNode(element, jqLite(wrapNode).eq(0).clone()[0])
                            },
                            remove: jqLiteRemove,
                            detach: function (element) {
                                jqLiteRemove(element, !0)
                            },
                            after: function (element, newElement) {
                                var index = element,
                                    parent = element.parentNode;
                                if (parent) {
                                    newElement = new JQLite(newElement);
                                    for (var i = 0, ii = newElement.length; i < ii; i++) {
                                        var node = newElement[i];
                                        parent.insertBefore(node, index.nextSibling), index = node
                                    }
                                }
                            },
                            addClass: jqLiteAddClass,
                            removeClass: jqLiteRemoveClass,
                            toggleClass: function (element, selector, condition) {
                                selector && forEach(selector.split(" "), function (className) {
                                    var classCondition = condition;
                                    isUndefined(classCondition) && (classCondition = !jqLiteHasClass(element, className)), (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className)
                                })
                            },
                            parent: function (element) {
                                var parent = element.parentNode;
                                return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null
                            },
                            next: function (element) {
                                return element.nextElementSibling
                            },
                            find: function (element, selector) {
                                return element.getElementsByTagName ? element.getElementsByTagName(selector) : []
                            },
                            clone: jqLiteClone,
                            triggerHandler: function (element, event, extraParameters) {
                                var dummyEvent, eventFnsCopy, handlerArgs, eventName = event.type || event,
                                    expandoStore = jqLiteExpandoStore(element),
                                    events = expandoStore && expandoStore.events,
                                    eventFns = events && events[eventName];
                                eventFns && (dummyEvent = {
                                    preventDefault: function () {
                                        this.defaultPrevented = !0
                                    },
                                    isDefaultPrevented: function () {
                                        return this.defaultPrevented === !0
                                    },
                                    stopImmediatePropagation: function () {
                                        this.immediatePropagationStopped = !0
                                    },
                                    isImmediatePropagationStopped: function () {
                                        return this.immediatePropagationStopped === !0
                                    },
                                    stopPropagation: noop,
                                    type: eventName,
                                    target: element
                                }, event.type && (dummyEvent = extend(dummyEvent, event)), eventFnsCopy = shallowCopy(eventFns), handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent], forEach(eventFnsCopy, function (fn) {
                                    dummyEvent.isImmediatePropagationStopped() || fn.apply(element, handlerArgs)
                                }))
                            }
                        }, function (fn, name) {
                            JQLite.prototype[name] = function (arg1, arg2, arg3) {
                                for (var value, i = 0, ii = this.length; i < ii; i++) isUndefined(value) ? (value = fn(this[i], arg1, arg2, arg3), isDefined(value) && (value = jqLite(value))) : jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
                                return isDefined(value) ? value : this
                            }
                        }), JQLite.prototype.bind = JQLite.prototype.on, JQLite.prototype.unbind = JQLite.prototype.off;
                        var nanKey = Object.create(null);
                        NgMapShim.prototype = {
                            _idx: function (key) {
                                return key === this._lastKey ? this._lastIndex : (this._lastKey = key, this._lastIndex = this._keys.indexOf(key), this._lastIndex)
                            },
                            _transformKey: function (key) {
                                return isNumberNaN(key) ? nanKey : key
                            },
                            get: function (key) {
                                key = this._transformKey(key);
                                var idx = this._idx(key);
                                if (idx !== -1) return this._values[idx]
                            },
                            set: function (key, value) {
                                key = this._transformKey(key);
                                var idx = this._idx(key);
                                idx === -1 && (idx = this._lastIndex = this._keys.length), this._keys[idx] = key, this._values[idx] = value
                            },
                            "delete": function (key) {
                                key = this._transformKey(key);
                                var idx = this._idx(key);
                                return idx !== -1 && (this._keys.splice(idx, 1), this._values.splice(idx, 1), this._lastKey = NaN, this._lastIndex = -1, !0)
                            }
                        };
                        var NgMap = NgMapShim,
                            $$MapProvider = [function () {
                                this.$get = [function () {
                                    return NgMap
                                }]
                            }],
                            ARROW_ARG = /^([^(]+?)=>/,
                            FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m,
                            FN_ARG_SPLIT = /,/,
                            FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
                            STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
                            $injectorMinErr = minErr("$injector");
                        createInjector.$$annotate = annotate;
                        var $animateMinErr = minErr("$animate"),
                            ELEMENT_NODE = 1,
                            NG_ANIMATE_CLASSNAME = "ng-animate",
                            $$CoreAnimateJsProvider = function () {
                                this.$get = noop
                            },
                            $$CoreAnimateQueueProvider = function () {
                                var postDigestQueue = new NgMap,
                                    postDigestElements = [];
                                this.$get = ["$$AnimateRunner", "$rootScope", function ($$AnimateRunner, $rootScope) {
                                    function updateData(data, classes, value) {
                                        var changed = !1;
                                        return classes && (classes = isString(classes) ? classes.split(" ") : isArray(classes) ? classes : [], forEach(classes, function (className) {
                                            className && (changed = !0, data[className] = value)
                                        })), changed
                                    }

                                    function handleCSSClassChanges() {
                                        forEach(postDigestElements, function (element) {
                                            var data = postDigestQueue.get(element);
                                            if (data) {
                                                var existing = splitClasses(element.attr("class")),
                                                    toAdd = "",
                                                    toRemove = "";
                                                forEach(data, function (status, className) {
                                                    var hasClass = !!existing[className];
                                                    status !== hasClass && (status ? toAdd += (toAdd.length ? " " : "") + className : toRemove += (toRemove.length ? " " : "") + className)
                                                }), forEach(element, function (elm) {
                                                    toAdd && jqLiteAddClass(elm, toAdd), toRemove && jqLiteRemoveClass(elm, toRemove)
                                                }), postDigestQueue["delete"](element)
                                            }
                                        }), postDigestElements.length = 0
                                    }

                                    function addRemoveClassesPostDigest(element, add, remove) {
                                        var data = postDigestQueue.get(element) || {},
                                            classesAdded = updateData(data, add, !0),
                                            classesRemoved = updateData(data, remove, !1);
                                        (classesAdded || classesRemoved) && (postDigestQueue.set(element, data), postDigestElements.push(element), 1 === postDigestElements.length && $rootScope.$$postDigest(handleCSSClassChanges))
                                    }
                                    return {
                                        enabled: noop,
                                        on: noop,
                                        off: noop,
                                        pin: noop,
                                        push: function (element, event, options, domOperation) {
                                            domOperation && domOperation(), options = options || {}, options.from && element.css(options.from), options.to && element.css(options.to), (options.addClass || options.removeClass) && addRemoveClassesPostDigest(element, options.addClass, options.removeClass);
                                            var runner = new $$AnimateRunner;
                                            return runner.complete(), runner
                                        }
                                    }
                                }]
                            },
                            $AnimateProvider = ["$provide", function ($provide) {
                                var provider = this;
                                this.$$registeredAnimations = Object.create(null), this.register = function (name, factory) {
                                    if (name && "." !== name.charAt(0)) throw $animateMinErr("notcsel", "Expecting class selector starting with '.' got '{0}'.", name);
                                    var key = name + "-animation";
                                    provider.$$registeredAnimations[name.substr(1)] = key, $provide.factory(key, factory)
                                }, this.classNameFilter = function (expression) {
                                    if (1 === arguments.length && (this.$$classNameFilter = expression instanceof RegExp ? expression : null, this.$$classNameFilter)) {
                                        var reservedRegex = new RegExp("(\\s+|\\/)" + NG_ANIMATE_CLASSNAME + "(\\s+|\\/)");
                                        if (reservedRegex.test(this.$$classNameFilter.toString())) throw $animateMinErr("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME)
                                    }
                                    return this.$$classNameFilter
                                }, this.$get = ["$$animateQueue", function ($$animateQueue) {
                                    function domInsert(element, parentElement, afterElement) {
                                        if (afterElement) {
                                            var afterNode = extractElementNode(afterElement);
                                            !afterNode || afterNode.parentNode || afterNode.previousElementSibling || (afterElement = null)
                                        }
                                        afterElement ? afterElement.after(element) : parentElement.prepend(element)
                                    }
                                    return {
                                        on: $$animateQueue.on,
                                        off: $$animateQueue.off,
                                        pin: $$animateQueue.pin,
                                        enabled: $$animateQueue.enabled,
                                        cancel: function (runner) {
                                            runner.end && runner.end()
                                        },
                                        enter: function (element, parent, after, options) {
                                            return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "enter", prepareAnimateOptions(options))
                                        },
                                        move: function (element, parent, after, options) {
                                            return parent = parent && jqLite(parent), after = after && jqLite(after), parent = parent || after.parent(), domInsert(element, parent, after), $$animateQueue.push(element, "move", prepareAnimateOptions(options))
                                        },
                                        leave: function (element, options) {
                                            return $$animateQueue.push(element, "leave", prepareAnimateOptions(options), function () {
                                                element.remove()
                                            })
                                        },
                                        addClass: function (element, className, options) {
                                            return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addclass, className), $$animateQueue.push(element, "addClass", options)
                                        },
                                        removeClass: function (element, className, options) {
                                            return options = prepareAnimateOptions(options), options.removeClass = mergeClasses(options.removeClass, className), $$animateQueue.push(element, "removeClass", options)
                                        },
                                        setClass: function (element, add, remove, options) {
                                            return options = prepareAnimateOptions(options), options.addClass = mergeClasses(options.addClass, add), options.removeClass = mergeClasses(options.removeClass, remove), $$animateQueue.push(element, "setClass", options)
                                        },
                                        animate: function (element, from, to, className, options) {
                                            return options = prepareAnimateOptions(options), options.from = options.from ? extend(options.from, from) : from, options.to = options.to ? extend(options.to, to) : to, className = className || "ng-inline-animate", options.tempClasses = mergeClasses(options.tempClasses, className), $$animateQueue.push(element, "animate", options)
                                        }
                                    }
                                }]
                            }],
                            $$AnimateAsyncRunFactoryProvider = function () {
                                this.$get = ["$$rAF", function ($$rAF) {
                                    function waitForTick(fn) {
                                        waitQueue.push(fn), waitQueue.length > 1 || $$rAF(function () {
                                            for (var i = 0; i < waitQueue.length; i++) waitQueue[i]();
                                            waitQueue = []
                                        })
                                    }
                                    var waitQueue = [];
                                    return function () {
                                        var passed = !1;
                                        return waitForTick(function () {
                                                passed = !0
                                            }),
                                            function (callback) {
                                                passed ? callback() : waitForTick(callback)
                                            }
                                    }
                                }]
                            },
                            $$AnimateRunnerFactoryProvider = function () {
                                this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden", "$timeout", function ($q, $sniffer, $$animateAsyncRun, $$isDocumentHidden, $timeout) {
                                    function AnimateRunner(host) {
                                        this.setHost(host);
                                        var rafTick = $$animateAsyncRun(),
                                            timeoutTick = function (fn) {
                                                $timeout(fn, 0, !1)
                                            };
                                        this._doneCallbacks = [], this._tick = function (fn) {
                                            $$isDocumentHidden() ? timeoutTick(fn) : rafTick(fn)
                                        }, this._state = 0
                                    }
                                    var INITIAL_STATE = 0,
                                        DONE_PENDING_STATE = 1,
                                        DONE_COMPLETE_STATE = 2;
                                    return AnimateRunner.chain = function (chain, callback) {
                                        function next() {
                                            return index === chain.length ? void callback(!0) : void chain[index](function (response) {
                                                return response === !1 ? void callback(!1) : (index++, void next())
                                            })
                                        }
                                        var index = 0;
                                        next()
                                    }, AnimateRunner.all = function (runners, callback) {
                                        function onProgress(response) {
                                            status = status && response, ++count === runners.length && callback(status)
                                        }
                                        var count = 0,
                                            status = !0;
                                        forEach(runners, function (runner) {
                                            runner.done(onProgress)
                                        })
                                    }, AnimateRunner.prototype = {
                                        setHost: function (host) {
                                            this.host = host || {}
                                        },
                                        done: function (fn) {
                                            this._state === DONE_COMPLETE_STATE ? fn() : this._doneCallbacks.push(fn)
                                        },
                                        progress: noop,
                                        getPromise: function () {
                                            if (!this.promise) {
                                                var self = this;
                                                this.promise = $q(function (resolve, reject) {
                                                    self.done(function (status) {
                                                        status === !1 ? reject() : resolve()
                                                    })
                                                })
                                            }
                                            return this.promise
                                        },
                                        then: function (resolveHandler, rejectHandler) {
                                            return this.getPromise().then(resolveHandler, rejectHandler)
                                        },
                                        "catch": function (handler) {
                                            return this.getPromise()["catch"](handler)
                                        },
                                        "finally": function (handler) {
                                            return this.getPromise()["finally"](handler)
                                        },
                                        pause: function () {
                                            this.host.pause && this.host.pause()
                                        },
                                        resume: function () {
                                            this.host.resume && this.host.resume()
                                        },
                                        end: function () {
                                            this.host.end && this.host.end(), this._resolve(!0)
                                        },
                                        cancel: function () {
                                            this.host.cancel && this.host.cancel(), this._resolve(!1)
                                        },
                                        complete: function (response) {
                                            var self = this;
                                            self._state === INITIAL_STATE && (self._state = DONE_PENDING_STATE, self._tick(function () {
                                                self._resolve(response)
                                            }))
                                        },
                                        _resolve: function (response) {
                                            this._state !== DONE_COMPLETE_STATE && (forEach(this._doneCallbacks, function (fn) {
                                                fn(response)
                                            }), this._doneCallbacks.length = 0, this._state = DONE_COMPLETE_STATE)
                                        }
                                    }, AnimateRunner
                                }]
                            },
                            $CoreAnimateCssProvider = function () {
                                this.$get = ["$$rAF", "$q", "$$AnimateRunner", function ($$rAF, $q, $$AnimateRunner) {
                                    return function (element, initialOptions) {
                                        function run() {
                                            return $$rAF(function () {
                                                applyAnimationContents(), closed || runner.complete(), closed = !0
                                            }), runner
                                        }

                                        function applyAnimationContents() {
                                            options.addClass && (element.addClass(options.addClass), options.addClass = null), options.removeClass && (element.removeClass(options.removeClass), options.removeClass = null), options.to && (element.css(options.to), options.to = null)
                                        }
                                        var options = initialOptions || {};
                                        options.$$prepared || (options = copy(options)), options.cleanupStyles && (options.from = options.to = null), options.from && (element.css(options.from), options.from = null);
                                        var closed, runner = new $$AnimateRunner;
                                        return {
                                            start: run,
                                            end: run
                                        }
                                    }
                                }]
                            },
                            $compileMinErr = minErr("$compile"),
                            _UNINITIALIZED_VALUE = new UNINITIALIZED_VALUE;
                        $CompileProvider.$inject = ["$provide", "$$sanitizeUriProvider"], SimpleChange.prototype.isFirstChange = function () {
                            return this.previousValue === _UNINITIALIZED_VALUE
                        };
                        var PREFIX_REGEXP = /^((?:x|data)[:\-_])/i,
                            SPECIAL_CHARS_REGEXP = /[:\-_]+(.)/g,
                            $controllerMinErr = minErr("$controller"),
                            CNTRL_REG = /^(\S+)(\s+as\s+([\w$]+))?$/,
                            $$ForceReflowProvider = function () {
                                this.$get = ["$document", function ($document) {
                                    return function (domNode) {
                                        return domNode ? !domNode.nodeType && domNode instanceof jqLite && (domNode = domNode[0]) : domNode = $document[0].body, domNode.offsetWidth + 1
                                    }
                                }]
                            },
                            APPLICATION_JSON = "application/json",
                            CONTENT_TYPE_APPLICATION_JSON = {
                                "Content-Type": APPLICATION_JSON + ";charset=utf-8"
                            },
                            JSON_START = /^\[|^\{(?!\{)/,
                            JSON_ENDS = {
                                "[": /]$/,
                                "{": /}$/
                            },
                            JSON_PROTECTION_PREFIX = /^\)]\}',?\n/,
                            $httpMinErr = minErr("$http"),
                            $interpolateMinErr = angular.$interpolateMinErr = minErr("$interpolate");
                        $interpolateMinErr.throwNoconcat = function (text) {
                            throw $interpolateMinErr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", text)
                        }, $interpolateMinErr.interr = function (text, err) {
                            return $interpolateMinErr("interr", "Can't interpolate: {0}\n{1}", text, err.toString())
                        };
                        var $jsonpCallbacksProvider = function () {
                                this.$get = ["$window", function ($window) {
                                    function createCallback(callbackId) {
                                        var callback = function (data) {
                                            callback.data = data, callback.called = !0
                                        };
                                        return callback.id = callbackId, callback
                                    }
                                    var callbacks = $window.angular.callbacks,
                                        callbackMap = {};
                                    return {
                                        createCallback: function (url) {
                                            var callbackId = "_" + (callbacks.$$counter++).toString(36),
                                                callbackPath = "angular.callbacks." + callbackId,
                                                callback = createCallback(callbackId);
                                            return callbackMap[callbackPath] = callbacks[callbackId] = callback, callbackPath
                                        },
                                        wasCalled: function (callbackPath) {
                                            return callbackMap[callbackPath].called
                                        },
                                        getResponse: function (callbackPath) {
                                            return callbackMap[callbackPath].data
                                        },
                                        removeCallback: function (callbackPath) {
                                            var callback = callbackMap[callbackPath];
                                            delete callbacks[callback.id], delete callbackMap[callbackPath]
                                        }
                                    }
                                }]
                            },
                            PATH_MATCH = /^([^?#]*)(\?([^#]*))?(#(.*))?$/,
                            DEFAULT_PORTS = {
                                http: 80,
                                https: 443,
                                ftp: 21
                            },
                            $locationMinErr = minErr("$location"),
                            DOUBLE_SLASH_REGEX = /^\s*[\\/]{2,}/,
                            locationPrototype = {
                                $$absUrl: "",
                                $$html5: !1,
                                $$replace: !1,
                                absUrl: locationGetter("$$absUrl"),
                                url: function (url) {
                                    if (isUndefined(url)) return this.$$url;
                                    var match = PATH_MATCH.exec(url);
                                    return (match[1] || "" === url) && this.path(decodeURIComponent(match[1])), (match[2] || match[1] || "" === url) && this.search(match[3] || ""), this.hash(match[5] || ""), this
                                },
                                protocol: locationGetter("$$protocol"),
                                host: locationGetter("$$host"),
                                port: locationGetter("$$port"),
                                path: locationGetterSetter("$$path", function (path) {
                                    return path = null !== path ? path.toString() : "", "/" === path.charAt(0) ? path : "/" + path
                                }),
                                search: function (search, paramValue) {
                                    switch (arguments.length) {
                                        case 0:
                                            return this.$$search;
                                        case 1:
                                            if (isString(search) || isNumber(search)) search = search.toString(), this.$$search = parseKeyValue(search);
                                            else {
                                                if (!isObject(search)) throw $locationMinErr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                                                search = copy(search, {}), forEach(search, function (value, key) {
                                                    null == value && delete search[key]
                                                }), this.$$search = search
                                            }
                                            break;
                                        default:
                                            isUndefined(paramValue) || null === paramValue ? delete this.$$search[search] : this.$$search[search] = paramValue
                                    }
                                    return this.$$compose(), this
                                },
                                hash: locationGetterSetter("$$hash", function (hash) {
                                    return null !== hash ? hash.toString() : ""
                                }),
                                replace: function () {
                                    return this.$$replace = !0, this
                                }
                            };
                        forEach([LocationHashbangInHtml5Url, LocationHashbangUrl, LocationHtml5Url], function (Location) {
                            Location.prototype = Object.create(locationPrototype), Location.prototype.state = function (state) {
                                if (!arguments.length) return this.$$state;
                                if (Location !== LocationHtml5Url || !this.$$html5) throw $locationMinErr("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
                                return this.$$state = isUndefined(state) ? null : state, this.$$urlUpdatedByLocation = !0, this
                            }
                        });
                        var $parseMinErr = minErr("$parse"),
                            objectValueOf = {}.constructor.prototype.valueOf,
                            OPERATORS = createMap();
                        forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (operator) {
                            OPERATORS[operator] = !0
                        });
                        var ESCAPE = {
                                n: "\n",
                                f: "\f",
                                r: "\r",
                                t: "\t",
                                v: "\x0B",
                                "'": "'",
                                '"': '"'
                            },
                            Lexer = function (options) {
                                this.options = options
                            };
                        Lexer.prototype = {
                            constructor: Lexer,
                            lex: function (text) {
                                for (this.text = text, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                                    var ch = this.text.charAt(this.index);
                                    if ('"' === ch || "'" === ch) this.readString(ch);
                                    else if (this.isNumber(ch) || "." === ch && this.isNumber(this.peek())) this.readNumber();
                                    else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent();
                                    else if (this.is(ch, "(){}[].,;:?")) this.tokens.push({
                                        index: this.index,
                                        text: ch
                                    }), this.index++;
                                    else if (this.isWhitespace(ch)) this.index++;
                                    else {
                                        var ch2 = ch + this.peek(),
                                            ch3 = ch2 + this.peek(2),
                                            op1 = OPERATORS[ch],
                                            op2 = OPERATORS[ch2],
                                            op3 = OPERATORS[ch3];
                                        if (op1 || op2 || op3) {
                                            var token = op3 ? ch3 : op2 ? ch2 : ch;
                                            this.tokens.push({
                                                index: this.index,
                                                text: token,
                                                operator: !0
                                            }), this.index += token.length
                                        } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                                    }
                                }
                                return this.tokens
                            },
                            is: function (ch, chars) {
                                return chars.indexOf(ch) !== -1
                            },
                            peek: function (i) {
                                var num = i || 1;
                                return this.index + num < this.text.length && this.text.charAt(this.index + num)
                            },
                            isNumber: function (ch) {
                                return "0" <= ch && ch <= "9" && "string" == typeof ch
                            },
                            isWhitespace: function (ch) {
                                return " " === ch || "\r" === ch || "\t" === ch || "\n" === ch || "\x0B" === ch || " " === ch
                            },
                            isIdentifierStart: function (ch) {
                                return this.options.isIdentifierStart ? this.options.isIdentifierStart(ch, this.codePointAt(ch)) : this.isValidIdentifierStart(ch)
                            },
                            isValidIdentifierStart: function (ch) {
                                return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || "$" === ch
                            },
                            isIdentifierContinue: function (ch) {
                                return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(ch, this.codePointAt(ch)) : this.isValidIdentifierContinue(ch)
                            },
                            isValidIdentifierContinue: function (ch, cp) {
                                return this.isValidIdentifierStart(ch, cp) || this.isNumber(ch)
                            },
                            codePointAt: function (ch) {
                                return 1 === ch.length ? ch.charCodeAt(0) : (ch.charCodeAt(0) << 10) + ch.charCodeAt(1) - 56613888
                            },
                            peekMultichar: function () {
                                var ch = this.text.charAt(this.index),
                                    peek = this.peek();
                                if (!peek) return ch;
                                var cp1 = ch.charCodeAt(0),
                                    cp2 = peek.charCodeAt(0);
                                return cp1 >= 55296 && cp1 <= 56319 && cp2 >= 56320 && cp2 <= 57343 ? ch + peek : ch
                            },
                            isExpOperator: function (ch) {
                                return "-" === ch || "+" === ch || this.isNumber(ch)
                            },
                            throwError: function (error, start, end) {
                                end = end || this.index;
                                var colStr = isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end;
                                throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text)
                            },
                            readNumber: function () {
                                for (var number = "", start = this.index; this.index < this.text.length;) {
                                    var ch = lowercase(this.text.charAt(this.index));
                                    if ("." === ch || this.isNumber(ch)) number += ch;
                                    else {
                                        var peekCh = this.peek();
                                        if ("e" === ch && this.isExpOperator(peekCh)) number += ch;
                                        else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && "e" === number.charAt(number.length - 1)) number += ch;
                                        else {
                                            if (!this.isExpOperator(ch) || peekCh && this.isNumber(peekCh) || "e" !== number.charAt(number.length - 1)) break;
                                            this.throwError("Invalid exponent")
                                        }
                                    }
                                    this.index++
                                }
                                this.tokens.push({
                                    index: start,
                                    text: number,
                                    constant: !0,
                                    value: Number(number)
                                })
                            },
                            readIdent: function () {
                                var start = this.index;
                                for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
                                    var ch = this.peekMultichar();
                                    if (!this.isIdentifierContinue(ch)) break;
                                    this.index += ch.length
                                }
                                this.tokens.push({
                                    index: start,
                                    text: this.text.slice(start, this.index),
                                    identifier: !0
                                })
                            },
                            readString: function (quote) {
                                var start = this.index;
                                this.index++;
                                for (var string = "", rawString = quote, escape = !1; this.index < this.text.length;) {
                                    var ch = this.text.charAt(this.index);
                                    if (rawString += ch, escape) {
                                        if ("u" === ch) {
                                            var hex = this.text.substring(this.index + 1, this.index + 5);
                                            hex.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + hex + "]"), this.index += 4, string += String.fromCharCode(parseInt(hex, 16))
                                        } else {
                                            var rep = ESCAPE[ch];
                                            string += rep || ch
                                        }
                                        escape = !1
                                    } else if ("\\" === ch) escape = !0;
                                    else {
                                        if (ch === quote) return this.index++, void this.tokens.push({
                                            index: start,
                                            text: rawString,
                                            constant: !0,
                                            value: string
                                        });
                                        string += ch
                                    }
                                    this.index++
                                }
                                this.throwError("Unterminated quote", start)
                            }
                        };
                        var AST = function (lexer, options) {
                            this.lexer = lexer, this.options = options
                        };
                        AST.Program = "Program", AST.ExpressionStatement = "ExpressionStatement", AST.AssignmentExpression = "AssignmentExpression", AST.ConditionalExpression = "ConditionalExpression", AST.LogicalExpression = "LogicalExpression", AST.BinaryExpression = "BinaryExpression", AST.UnaryExpression = "UnaryExpression", AST.CallExpression = "CallExpression", AST.MemberExpression = "MemberExpression", AST.Identifier = "Identifier", AST.Literal = "Literal", AST.ArrayExpression = "ArrayExpression", AST.Property = "Property", AST.ObjectExpression = "ObjectExpression", AST.ThisExpression = "ThisExpression", AST.LocalsExpression = "LocalsExpression", AST.NGValueParameter = "NGValueParameter", AST.prototype = {
                            ast: function (text) {
                                this.text = text, this.tokens = this.lexer.lex(text);
                                var value = this.program();
                                return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), value
                            },
                            program: function () {
                                for (var body = [];;)
                                    if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && body.push(this.expressionStatement()), !this.expect(";")) return {
                                        type: AST.Program,
                                        body: body
                                    }
                            },
                            expressionStatement: function () {
                                return {
                                    type: AST.ExpressionStatement,
                                    expression: this.filterChain()
                                }
                            },
                            filterChain: function () {
                                for (var left = this.expression(); this.expect("|");) left = this.filter(left);
                                return left
                            },
                            expression: function () {
                                return this.assignment()
                            },
                            assignment: function () {
                                var result = this.ternary();
                                if (this.expect("=")) {
                                    if (!isAssignable(result)) throw $parseMinErr("lval", "Trying to assign a value to a non l-value");
                                    result = {
                                        type: AST.AssignmentExpression,
                                        left: result,
                                        right: this.assignment(),
                                        operator: "="
                                    }
                                }
                                return result
                            },
                            ternary: function () {
                                var alternate, consequent, test = this.logicalOR();
                                return this.expect("?") && (alternate = this.expression(), this.consume(":")) ? (consequent = this.expression(), {
                                    type: AST.ConditionalExpression,
                                    test: test,
                                    alternate: alternate,
                                    consequent: consequent
                                }) : test
                            },
                            logicalOR: function () {
                                for (var left = this.logicalAND(); this.expect("||");) left = {
                                    type: AST.LogicalExpression,
                                    operator: "||",
                                    left: left,
                                    right: this.logicalAND()
                                };
                                return left
                            },
                            logicalAND: function () {
                                for (var left = this.equality(); this.expect("&&");) left = {
                                    type: AST.LogicalExpression,
                                    operator: "&&",
                                    left: left,
                                    right: this.equality()
                                };
                                return left
                            },
                            equality: function () {
                                for (var token, left = this.relational(); token = this.expect("==", "!=", "===", "!==");) left = {
                                    type: AST.BinaryExpression,
                                    operator: token.text,
                                    left: left,
                                    right: this.relational()
                                };
                                return left
                            },
                            relational: function () {
                                for (var token, left = this.additive(); token = this.expect("<", ">", "<=", ">=");) left = {
                                    type: AST.BinaryExpression,
                                    operator: token.text,
                                    left: left,
                                    right: this.additive()
                                };
                                return left
                            },
                            additive: function () {
                                for (var token, left = this.multiplicative(); token = this.expect("+", "-");) left = {
                                    type: AST.BinaryExpression,
                                    operator: token.text,
                                    left: left,
                                    right: this.multiplicative()
                                };
                                return left
                            },
                            multiplicative: function () {
                                for (var token, left = this.unary(); token = this.expect("*", "/", "%");) left = {
                                    type: AST.BinaryExpression,
                                    operator: token.text,
                                    left: left,
                                    right: this.unary()
                                };
                                return left
                            },
                            unary: function () {
                                var token;
                                return (token = this.expect("+", "-", "!")) ? {
                                    type: AST.UnaryExpression,
                                    operator: token.text,
                                    prefix: !0,
                                    argument: this.unary()
                                } : this.primary()
                            },
                            primary: function () {
                                var primary;
                                this.expect("(") ? (primary = this.filterChain(), this.consume(")")) : this.expect("[") ? primary = this.arrayDeclaration() : this.expect("{") ? primary = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? primary = copy(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? primary = {
                                    type: AST.Literal,
                                    value: this.options.literals[this.consume().text]
                                } : this.peek().identifier ? primary = this.identifier() : this.peek().constant ? primary = this.constant() : this.throwError("not a primary expression", this.peek());
                                for (var next; next = this.expect("(", "[", ".");) "(" === next.text ? (primary = {
                                    type: AST.CallExpression,
                                    callee: primary,
                                    arguments: this.parseArguments()
                                }, this.consume(")")) : "[" === next.text ? (primary = {
                                    type: AST.MemberExpression,
                                    object: primary,
                                    property: this.expression(),
                                    computed: !0
                                }, this.consume("]")) : "." === next.text ? primary = {
                                    type: AST.MemberExpression,
                                    object: primary,
                                    property: this.identifier(),
                                    computed: !1
                                } : this.throwError("IMPOSSIBLE");
                                return primary
                            },
                            filter: function (baseExpression) {
                                for (var args = [baseExpression], result = {
                                        type: AST.CallExpression,
                                        callee: this.identifier(),
                                        arguments: args,
                                        filter: !0
                                    }; this.expect(":");) args.push(this.expression());
                                return result
                            },
                            parseArguments: function () {
                                var args = [];
                                if (")" !== this.peekToken().text)
                                    do args.push(this.filterChain()); while (this.expect(","));
                                return args
                            },
                            identifier: function () {
                                var token = this.consume();
                                return token.identifier || this.throwError("is not a valid identifier", token), {
                                    type: AST.Identifier,
                                    name: token.text
                                }
                            },
                            constant: function () {
                                return {
                                    type: AST.Literal,
                                    value: this.consume().value
                                }
                            },
                            arrayDeclaration: function () {
                                var elements = [];
                                if ("]" !== this.peekToken().text)
                                    do {
                                        if (this.peek("]")) break;
                                        elements.push(this.expression())
                                    } while (this.expect(","));
                                return this.consume("]"), {
                                    type: AST.ArrayExpression,
                                    elements: elements
                                }
                            },
                            object: function () {
                                var property, properties = [];
                                if ("}" !== this.peekToken().text)
                                    do {
                                        if (this.peek("}")) break;
                                        property = {
                                            type: AST.Property,
                                            kind: "init"
                                        }, this.peek().constant ? (property.key = this.constant(), property.computed = !1, this.consume(":"), property.value = this.expression()) : this.peek().identifier ? (property.key = this.identifier(), property.computed = !1, this.peek(":") ? (this.consume(":"), property.value = this.expression()) : property.value = property.key) : this.peek("[") ? (this.consume("["), property.key = this.expression(), this.consume("]"), property.computed = !0, this.consume(":"), property.value = this.expression()) : this.throwError("invalid key", this.peek()), properties.push(property)
                                    } while (this.expect(","));
                                return this.consume("}"), {
                                    type: AST.ObjectExpression,
                                    properties: properties
                                }
                            },
                            throwError: function (msg, token) {
                                throw $parseMinErr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, token.index + 1, this.text, this.text.substring(token.index))
                            },
                            consume: function (e1) {
                                if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                                var token = this.expect(e1);
                                return token || this.throwError("is unexpected, expecting [" + e1 + "]", this.peek()), token
                            },
                            peekToken: function () {
                                if (0 === this.tokens.length) throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                                return this.tokens[0]
                            },
                            peek: function (e1, e2, e3, e4) {
                                return this.peekAhead(0, e1, e2, e3, e4)
                            },
                            peekAhead: function (i, e1, e2, e3, e4) {
                                if (this.tokens.length > i) {
                                    var token = this.tokens[i],
                                        t = token.text;
                                    if (t === e1 || t === e2 || t === e3 || t === e4 || !e1 && !e2 && !e3 && !e4) return token
                                }
                                return !1
                            },
                            expect: function (e1, e2, e3, e4) {
                                var token = this.peek(e1, e2, e3, e4);
                                return !!token && (this.tokens.shift(), token)
                            },
                            selfReferential: {
                                "this": {
                                    type: AST.ThisExpression
                                },
                                $locals: {
                                    type: AST.LocalsExpression
                                }
                            }
                        }, ASTCompiler.prototype = {
                            compile: function (expression) {
                                var self = this,
                                    ast = this.astBuilder.ast(expression);
                                this.state = {
                                    nextId: 0,
                                    filters: {},
                                    fn: {
                                        vars: [],
                                        body: [],
                                        own: {}
                                    },
                                    assign: {
                                        vars: [],
                                        body: [],
                                        own: {}
                                    },
                                    inputs: []
                                }, findConstantAndWatchExpressions(ast, self.$filter);
                                var assignable, extra = "";
                                if (this.stage = "assign", assignable = assignableAST(ast)) {
                                    this.state.computing = "assign";
                                    var result = this.nextId();
                                    this.recurse(assignable, result), this.return_(result),
                                        extra = "fn.assign=" + this.generateFunction("assign", "s,v,l")
                                }
                                var toWatch = getInputs(ast.body);
                                self.stage = "inputs", forEach(toWatch, function (watch, key) {
                                    var fnKey = "fn" + key;
                                    self.state[fnKey] = {
                                        vars: [],
                                        body: [],
                                        own: {}
                                    }, self.state.computing = fnKey;
                                    var intoId = self.nextId();
                                    self.recurse(watch, intoId), self.return_(intoId), self.state.inputs.push(fnKey), watch.watchId = key
                                }), this.state.computing = "fn", this.stage = "main", this.recurse(ast);
                                var fnString = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + extra + this.watchFns() + "return fn;",
                                    fn = new Function("$filter", "getStringValue", "ifDefined", "plus", fnString)(this.$filter, getStringValue, ifDefined, plusFn);
                                return this.state = this.stage = void 0, fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
                            },
                            USE: "use",
                            STRICT: "strict",
                            watchFns: function () {
                                var result = [],
                                    fns = this.state.inputs,
                                    self = this;
                                return forEach(fns, function (name) {
                                    result.push("var " + name + "=" + self.generateFunction(name, "s"))
                                }), fns.length && result.push("fn.inputs=[" + fns.join(",") + "];"), result.join("")
                            },
                            generateFunction: function (name, params) {
                                return "function(" + params + "){" + this.varsPrefix(name) + this.body(name) + "};"
                            },
                            filterPrefix: function () {
                                var parts = [],
                                    self = this;
                                return forEach(this.state.filters, function (id, filter) {
                                    parts.push(id + "=$filter(" + self.escape(filter) + ")")
                                }), parts.length ? "var " + parts.join(",") + ";" : ""
                            },
                            varsPrefix: function (section) {
                                return this.state[section].vars.length ? "var " + this.state[section].vars.join(",") + ";" : ""
                            },
                            body: function (section) {
                                return this.state[section].body.join("")
                            },
                            recurse: function (ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
                                var left, right, args, expression, computed, self = this;
                                if (recursionFn = recursionFn || noop, !skipWatchIdCheck && isDefined(ast.watchId)) return intoId = intoId || this.nextId(), void this.if_("i", this.lazyAssign(intoId, this.computedMember("i", ast.watchId)), this.lazyRecurse(ast, intoId, nameId, recursionFn, create, !0));
                                switch (ast.type) {
                                    case AST.Program:
                                        forEach(ast.body, function (expression, pos) {
                                            self.recurse(expression.expression, void 0, void 0, function (expr) {
                                                right = expr
                                            }), pos !== ast.body.length - 1 ? self.current().body.push(right, ";") : self.return_(right)
                                        });
                                        break;
                                    case AST.Literal:
                                        expression = this.escape(ast.value), this.assign(intoId, expression), recursionFn(intoId || expression);
                                        break;
                                    case AST.UnaryExpression:
                                        this.recurse(ast.argument, void 0, void 0, function (expr) {
                                            right = expr
                                        }), expression = ast.operator + "(" + this.ifDefined(right, 0) + ")", this.assign(intoId, expression), recursionFn(expression);
                                        break;
                                    case AST.BinaryExpression:
                                        this.recurse(ast.left, void 0, void 0, function (expr) {
                                            left = expr
                                        }), this.recurse(ast.right, void 0, void 0, function (expr) {
                                            right = expr
                                        }), expression = "+" === ast.operator ? this.plus(left, right) : "-" === ast.operator ? this.ifDefined(left, 0) + ast.operator + this.ifDefined(right, 0) : "(" + left + ")" + ast.operator + "(" + right + ")", this.assign(intoId, expression), recursionFn(expression);
                                        break;
                                    case AST.LogicalExpression:
                                        intoId = intoId || this.nextId(), self.recurse(ast.left, intoId), self.if_("&&" === ast.operator ? intoId : self.not(intoId), self.lazyRecurse(ast.right, intoId)), recursionFn(intoId);
                                        break;
                                    case AST.ConditionalExpression:
                                        intoId = intoId || this.nextId(), self.recurse(ast.test, intoId), self.if_(intoId, self.lazyRecurse(ast.alternate, intoId), self.lazyRecurse(ast.consequent, intoId)), recursionFn(intoId);
                                        break;
                                    case AST.Identifier:
                                        intoId = intoId || this.nextId(), nameId && (nameId.context = "inputs" === self.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", ast.name) + "?l:s"), nameId.computed = !1, nameId.name = ast.name), self.if_("inputs" === self.stage || self.not(self.getHasOwnProperty("l", ast.name)), function () {
                                            self.if_("inputs" === self.stage || "s", function () {
                                                create && 1 !== create && self.if_(self.isNull(self.nonComputedMember("s", ast.name)), self.lazyAssign(self.nonComputedMember("s", ast.name), "{}")), self.assign(intoId, self.nonComputedMember("s", ast.name))
                                            })
                                        }, intoId && self.lazyAssign(intoId, self.nonComputedMember("l", ast.name))), recursionFn(intoId);
                                        break;
                                    case AST.MemberExpression:
                                        left = nameId && (nameId.context = this.nextId()) || this.nextId(), intoId = intoId || this.nextId(), self.recurse(ast.object, left, void 0, function () {
                                            self.if_(self.notNull(left), function () {
                                                ast.computed ? (right = self.nextId(), self.recurse(ast.property, right), self.getStringValue(right), create && 1 !== create && self.if_(self.not(self.computedMember(left, right)), self.lazyAssign(self.computedMember(left, right), "{}")), expression = self.computedMember(left, right), self.assign(intoId, expression), nameId && (nameId.computed = !0, nameId.name = right)) : (create && 1 !== create && self.if_(self.isNull(self.nonComputedMember(left, ast.property.name)), self.lazyAssign(self.nonComputedMember(left, ast.property.name), "{}")), expression = self.nonComputedMember(left, ast.property.name), self.assign(intoId, expression), nameId && (nameId.computed = !1, nameId.name = ast.property.name))
                                            }, function () {
                                                self.assign(intoId, "undefined")
                                            }), recursionFn(intoId)
                                        }, !!create);
                                        break;
                                    case AST.CallExpression:
                                        intoId = intoId || this.nextId(), ast.filter ? (right = self.filter(ast.callee.name), args = [], forEach(ast.arguments, function (expr) {
                                            var argument = self.nextId();
                                            self.recurse(expr, argument), args.push(argument)
                                        }), expression = right + "(" + args.join(",") + ")", self.assign(intoId, expression), recursionFn(intoId)) : (right = self.nextId(), left = {}, args = [], self.recurse(ast.callee, right, left, function () {
                                            self.if_(self.notNull(right), function () {
                                                forEach(ast.arguments, function (expr) {
                                                    self.recurse(expr, ast.constant ? void 0 : self.nextId(), void 0, function (argument) {
                                                        args.push(argument)
                                                    })
                                                }), expression = left.name ? self.member(left.context, left.name, left.computed) + "(" + args.join(",") + ")" : right + "(" + args.join(",") + ")", self.assign(intoId, expression)
                                            }, function () {
                                                self.assign(intoId, "undefined")
                                            }), recursionFn(intoId)
                                        }));
                                        break;
                                    case AST.AssignmentExpression:
                                        right = this.nextId(), left = {}, this.recurse(ast.left, void 0, left, function () {
                                            self.if_(self.notNull(left.context), function () {
                                                self.recurse(ast.right, right), expression = self.member(left.context, left.name, left.computed) + ast.operator + right, self.assign(intoId, expression), recursionFn(intoId || expression)
                                            })
                                        }, 1);
                                        break;
                                    case AST.ArrayExpression:
                                        args = [], forEach(ast.elements, function (expr) {
                                            self.recurse(expr, ast.constant ? void 0 : self.nextId(), void 0, function (argument) {
                                                args.push(argument)
                                            })
                                        }), expression = "[" + args.join(",") + "]", this.assign(intoId, expression), recursionFn(intoId || expression);
                                        break;
                                    case AST.ObjectExpression:
                                        args = [], computed = !1, forEach(ast.properties, function (property) {
                                            property.computed && (computed = !0)
                                        }), computed ? (intoId = intoId || this.nextId(), this.assign(intoId, "{}"), forEach(ast.properties, function (property) {
                                            property.computed ? (left = self.nextId(), self.recurse(property.key, left)) : left = property.key.type === AST.Identifier ? property.key.name : "" + property.key.value, right = self.nextId(), self.recurse(property.value, right), self.assign(self.member(intoId, left, property.computed), right)
                                        })) : (forEach(ast.properties, function (property) {
                                            self.recurse(property.value, ast.constant ? void 0 : self.nextId(), void 0, function (expr) {
                                                args.push(self.escape(property.key.type === AST.Identifier ? property.key.name : "" + property.key.value) + ":" + expr)
                                            })
                                        }), expression = "{" + args.join(",") + "}", this.assign(intoId, expression)), recursionFn(intoId || expression);
                                        break;
                                    case AST.ThisExpression:
                                        this.assign(intoId, "s"), recursionFn(intoId || "s");
                                        break;
                                    case AST.LocalsExpression:
                                        this.assign(intoId, "l"), recursionFn(intoId || "l");
                                        break;
                                    case AST.NGValueParameter:
                                        this.assign(intoId, "v"), recursionFn(intoId || "v")
                                }
                            },
                            getHasOwnProperty: function (element, property) {
                                var key = element + "." + property,
                                    own = this.current().own;
                                return own.hasOwnProperty(key) || (own[key] = this.nextId(!1, element + "&&(" + this.escape(property) + " in " + element + ")")), own[key]
                            },
                            assign: function (id, value) {
                                if (id) return this.current().body.push(id, "=", value, ";"), id
                            },
                            filter: function (filterName) {
                                return this.state.filters.hasOwnProperty(filterName) || (this.state.filters[filterName] = this.nextId(!0)), this.state.filters[filterName]
                            },
                            ifDefined: function (id, defaultValue) {
                                return "ifDefined(" + id + "," + this.escape(defaultValue) + ")"
                            },
                            plus: function (left, right) {
                                return "plus(" + left + "," + right + ")"
                            },
                            return_: function (id) {
                                this.current().body.push("return ", id, ";")
                            },
                            if_: function (test, alternate, consequent) {
                                if (test === !0) alternate();
                                else {
                                    var body = this.current().body;
                                    body.push("if(", test, "){"), alternate(), body.push("}"), consequent && (body.push("else{"), consequent(), body.push("}"))
                                }
                            },
                            not: function (expression) {
                                return "!(" + expression + ")"
                            },
                            isNull: function (expression) {
                                return expression + "==null"
                            },
                            notNull: function (expression) {
                                return expression + "!=null"
                            },
                            nonComputedMember: function (left, right) {
                                var SAFE_IDENTIFIER = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/,
                                    UNSAFE_CHARACTERS = /[^$_a-zA-Z0-9]/g;
                                return SAFE_IDENTIFIER.test(right) ? left + "." + right : left + '["' + right.replace(UNSAFE_CHARACTERS, this.stringEscapeFn) + '"]'
                            },
                            computedMember: function (left, right) {
                                return left + "[" + right + "]"
                            },
                            member: function (left, right, computed) {
                                return computed ? this.computedMember(left, right) : this.nonComputedMember(left, right)
                            },
                            getStringValue: function (item) {
                                this.assign(item, "getStringValue(" + item + ")")
                            },
                            lazyRecurse: function (ast, intoId, nameId, recursionFn, create, skipWatchIdCheck) {
                                var self = this;
                                return function () {
                                    self.recurse(ast, intoId, nameId, recursionFn, create, skipWatchIdCheck)
                                }
                            },
                            lazyAssign: function (id, value) {
                                var self = this;
                                return function () {
                                    self.assign(id, value)
                                }
                            },
                            stringEscapeRegex: /[^ a-zA-Z0-9]/g,
                            stringEscapeFn: function (c) {
                                return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
                            },
                            escape: function (value) {
                                if (isString(value)) return "'" + value.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
                                if (isNumber(value)) return value.toString();
                                if (value === !0) return "true";
                                if (value === !1) return "false";
                                if (null === value) return "null";
                                if ("undefined" == typeof value) return "undefined";
                                throw $parseMinErr("esc", "IMPOSSIBLE")
                            },
                            nextId: function (skip, init) {
                                var id = "v" + this.state.nextId++;
                                return skip || this.current().vars.push(id + (init ? "=" + init : "")), id
                            },
                            current: function () {
                                return this.state[this.state.computing]
                            }
                        }, ASTInterpreter.prototype = {
                            compile: function (expression) {
                                var self = this,
                                    ast = this.astBuilder.ast(expression);
                                findConstantAndWatchExpressions(ast, self.$filter);
                                var assignable, assign;
                                (assignable = assignableAST(ast)) && (assign = this.recurse(assignable));
                                var inputs, toWatch = getInputs(ast.body);
                                toWatch && (inputs = [], forEach(toWatch, function (watch, key) {
                                    var input = self.recurse(watch);
                                    watch.input = input, inputs.push(input), watch.watchId = key
                                }));
                                var expressions = [];
                                forEach(ast.body, function (expression) {
                                    expressions.push(self.recurse(expression.expression))
                                });
                                var fn = 0 === ast.body.length ? noop : 1 === ast.body.length ? expressions[0] : function (scope, locals) {
                                    var lastValue;
                                    return forEach(expressions, function (exp) {
                                        lastValue = exp(scope, locals)
                                    }), lastValue
                                };
                                return assign && (fn.assign = function (scope, value, locals) {
                                    return assign(scope, locals, value)
                                }), inputs && (fn.inputs = inputs), fn.literal = isLiteral(ast), fn.constant = isConstant(ast), fn
                            },
                            recurse: function (ast, context, create) {
                                var left, right, args, self = this;
                                if (ast.input) return this.inputs(ast.input, ast.watchId);
                                switch (ast.type) {
                                    case AST.Literal:
                                        return this.value(ast.value, context);
                                    case AST.UnaryExpression:
                                        return right = this.recurse(ast.argument), this["unary" + ast.operator](right, context);
                                    case AST.BinaryExpression:
                                        return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                                    case AST.LogicalExpression:
                                        return left = this.recurse(ast.left), right = this.recurse(ast.right), this["binary" + ast.operator](left, right, context);
                                    case AST.ConditionalExpression:
                                        return this["ternary?:"](this.recurse(ast.test), this.recurse(ast.alternate), this.recurse(ast.consequent), context);
                                    case AST.Identifier:
                                        return self.identifier(ast.name, context, create);
                                    case AST.MemberExpression:
                                        return left = this.recurse(ast.object, !1, !!create), ast.computed || (right = ast.property.name), ast.computed && (right = this.recurse(ast.property)), ast.computed ? this.computedMember(left, right, context, create) : this.nonComputedMember(left, right, context, create);
                                    case AST.CallExpression:
                                        return args = [], forEach(ast.arguments, function (expr) {
                                            args.push(self.recurse(expr))
                                        }), ast.filter && (right = this.$filter(ast.callee.name)), ast.filter || (right = this.recurse(ast.callee, !0)), ast.filter ? function (scope, locals, assign, inputs) {
                                            for (var values = [], i = 0; i < args.length; ++i) values.push(args[i](scope, locals, assign, inputs));
                                            var value = right.apply(void 0, values, inputs);
                                            return context ? {
                                                context: void 0,
                                                name: void 0,
                                                value: value
                                            } : value
                                        } : function (scope, locals, assign, inputs) {
                                            var value, rhs = right(scope, locals, assign, inputs);
                                            if (null != rhs.value) {
                                                for (var values = [], i = 0; i < args.length; ++i) values.push(args[i](scope, locals, assign, inputs));
                                                value = rhs.value.apply(rhs.context, values)
                                            }
                                            return context ? {
                                                value: value
                                            } : value
                                        };
                                    case AST.AssignmentExpression:
                                        return left = this.recurse(ast.left, !0, 1), right = this.recurse(ast.right),
                                            function (scope, locals, assign, inputs) {
                                                var lhs = left(scope, locals, assign, inputs),
                                                    rhs = right(scope, locals, assign, inputs);
                                                return lhs.context[lhs.name] = rhs, context ? {
                                                    value: rhs
                                                } : rhs
                                            };
                                    case AST.ArrayExpression:
                                        return args = [], forEach(ast.elements, function (expr) {
                                                args.push(self.recurse(expr))
                                            }),
                                            function (scope, locals, assign, inputs) {
                                                for (var value = [], i = 0; i < args.length; ++i) value.push(args[i](scope, locals, assign, inputs));
                                                return context ? {
                                                    value: value
                                                } : value
                                            };
                                    case AST.ObjectExpression:
                                        return args = [], forEach(ast.properties, function (property) {
                                                property.computed ? args.push({
                                                    key: self.recurse(property.key),
                                                    computed: !0,
                                                    value: self.recurse(property.value)
                                                }) : args.push({
                                                    key: property.key.type === AST.Identifier ? property.key.name : "" + property.key.value,
                                                    computed: !1,
                                                    value: self.recurse(property.value)
                                                })
                                            }),
                                            function (scope, locals, assign, inputs) {
                                                for (var value = {}, i = 0; i < args.length; ++i) args[i].computed ? value[args[i].key(scope, locals, assign, inputs)] = args[i].value(scope, locals, assign, inputs) : value[args[i].key] = args[i].value(scope, locals, assign, inputs);
                                                return context ? {
                                                    value: value
                                                } : value
                                            };
                                    case AST.ThisExpression:
                                        return function (scope) {
                                            return context ? {
                                                value: scope
                                            } : scope
                                        };
                                    case AST.LocalsExpression:
                                        return function (scope, locals) {
                                            return context ? {
                                                value: locals
                                            } : locals
                                        };
                                    case AST.NGValueParameter:
                                        return function (scope, locals, assign) {
                                            return context ? {
                                                value: assign
                                            } : assign
                                        }
                                }
                            },
                            "unary+": function (argument, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = argument(scope, locals, assign, inputs);
                                    return arg = isDefined(arg) ? +arg : 0, context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "unary-": function (argument, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = argument(scope, locals, assign, inputs);
                                    return arg = isDefined(arg) ? -arg : -0, context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "unary!": function (argument, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = !argument(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary+": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var lhs = left(scope, locals, assign, inputs),
                                        rhs = right(scope, locals, assign, inputs),
                                        arg = plusFn(lhs, rhs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary-": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var lhs = left(scope, locals, assign, inputs),
                                        rhs = right(scope, locals, assign, inputs),
                                        arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary*": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary/": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary%": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary===": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary!==": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary==": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary!=": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary<": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary>": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary<=": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary>=": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary&&": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "binary||": function (left, right, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            "ternary?:": function (test, alternate, consequent, context) {
                                return function (scope, locals, assign, inputs) {
                                    var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
                                    return context ? {
                                        value: arg
                                    } : arg
                                }
                            },
                            value: function (value, context) {
                                return function () {
                                    return context ? {
                                        context: void 0,
                                        name: void 0,
                                        value: value
                                    } : value
                                }
                            },
                            identifier: function (name, context, create) {
                                return function (scope, locals, assign, inputs) {
                                    var base = locals && name in locals ? locals : scope;
                                    create && 1 !== create && base && null == base[name] && (base[name] = {});
                                    var value = base ? base[name] : void 0;
                                    return context ? {
                                        context: base,
                                        name: name,
                                        value: value
                                    } : value
                                }
                            },
                            computedMember: function (left, right, context, create) {
                                return function (scope, locals, assign, inputs) {
                                    var rhs, value, lhs = left(scope, locals, assign, inputs);
                                    return null != lhs && (rhs = right(scope, locals, assign, inputs), rhs = getStringValue(rhs), create && 1 !== create && lhs && !lhs[rhs] && (lhs[rhs] = {}), value = lhs[rhs]), context ? {
                                        context: lhs,
                                        name: rhs,
                                        value: value
                                    } : value
                                }
                            },
                            nonComputedMember: function (left, right, context, create) {
                                return function (scope, locals, assign, inputs) {
                                    var lhs = left(scope, locals, assign, inputs);
                                    create && 1 !== create && lhs && null == lhs[right] && (lhs[right] = {});
                                    var value = null != lhs ? lhs[right] : void 0;
                                    return context ? {
                                        context: lhs,
                                        name: right,
                                        value: value
                                    } : value
                                }
                            },
                            inputs: function (input, watchId) {
                                return function (scope, value, locals, inputs) {
                                    return inputs ? inputs[watchId] : input(scope, value, locals)
                                }
                            }
                        };
                        var Parser = function (lexer, $filter, options) {
                            this.lexer = lexer, this.$filter = $filter, this.options = options, this.ast = new AST(lexer, options), this.astCompiler = options.csp ? new ASTInterpreter(this.ast, $filter) : new ASTCompiler(this.ast, $filter)
                        };
                        Parser.prototype = {
                            constructor: Parser,
                            parse: function (text) {
                                return this.astCompiler.compile(text)
                            }
                        };
                        var $sceMinErr = minErr("$sce"),
                            SCE_CONTEXTS = {
                                HTML: "html",
                                CSS: "css",
                                URL: "url",
                                RESOURCE_URL: "resourceUrl",
                                JS: "js"
                            },
                            UNDERSCORE_LOWERCASE_REGEXP = /_([a-z])/g,
                            $templateRequestMinErr = minErr("$compile"),
                            urlParsingNode = window.document.createElement("a"),
                            originUrl = urlResolve(window.location.href);
                        $$CookieReader.$inject = ["$document"], $FilterProvider.$inject = ["$provide"];
                        var MAX_DIGITS = 22,
                            DECIMAL_SEP = ".",
                            ZERO_CHAR = "0";
                        currencyFilter.$inject = ["$locale"], numberFilter.$inject = ["$locale"];
                        var DATE_FORMATS = {
                                yyyy: dateGetter("FullYear", 4, 0, !1, !0),
                                yy: dateGetter("FullYear", 2, 0, !0, !0),
                                y: dateGetter("FullYear", 1, 0, !1, !0),
                                MMMM: dateStrGetter("Month"),
                                MMM: dateStrGetter("Month", !0),
                                MM: dateGetter("Month", 2, 1),
                                M: dateGetter("Month", 1, 1),
                                LLLL: dateStrGetter("Month", !1, !0),
                                dd: dateGetter("Date", 2),
                                d: dateGetter("Date", 1),
                                HH: dateGetter("Hours", 2),
                                H: dateGetter("Hours", 1),
                                hh: dateGetter("Hours", 2, -12),
                                h: dateGetter("Hours", 1, -12),
                                mm: dateGetter("Minutes", 2),
                                m: dateGetter("Minutes", 1),
                                ss: dateGetter("Seconds", 2),
                                s: dateGetter("Seconds", 1),
                                sss: dateGetter("Milliseconds", 3),
                                EEEE: dateStrGetter("Day"),
                                EEE: dateStrGetter("Day", !0),
                                a: ampmGetter,
                                Z: timeZoneGetter,
                                ww: weekGetter(2),
                                w: weekGetter(1),
                                G: eraGetter,
                                GG: eraGetter,
                                GGG: eraGetter,
                                GGGG: longEraGetter
                            },
                            DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
                            NUMBER_STRING = /^-?\d+$/;
                        dateFilter.$inject = ["$locale"];
                        var lowercaseFilter = valueFn(lowercase),
                            uppercaseFilter = valueFn(uppercase);
                        orderByFilter.$inject = ["$parse"];
                        var htmlAnchorDirective = valueFn({
                                restrict: "E",
                                compile: function (element, attr) {
                                    if (!attr.href && !attr.xlinkHref) return function (scope, element) {
                                        if ("a" === element[0].nodeName.toLowerCase()) {
                                            var href = "[object SVGAnimatedString]" === toString.call(element.prop("href")) ? "xlink:href" : "href";
                                            element.on("click", function (event) {
                                                element.attr(href) || event.preventDefault()
                                            })
                                        }
                                    }
                                }
                            }),
                            ngAttributeAliasDirectives = {};
                        forEach(BOOLEAN_ATTR, function (propName, attrName) {
                            function defaultLinkFn(scope, element, attr) {
                                scope.$watch(attr[normalized], function (value) {
                                    attr.$set(attrName, !!value)
                                })
                            }
                            if ("multiple" !== propName) {
                                var normalized = directiveNormalize("ng-" + attrName),
                                    linkFn = defaultLinkFn;
                                "checked" === propName && (linkFn = function (scope, element, attr) {
                                    attr.ngModel !== attr[normalized] && defaultLinkFn(scope, element, attr)
                                }), ngAttributeAliasDirectives[normalized] = function () {
                                    return {
                                        restrict: "A",
                                        priority: 100,
                                        link: linkFn
                                    }
                                }
                            }
                        }), forEach(ALIASED_ATTR, function (htmlAttr, ngAttr) {
                            ngAttributeAliasDirectives[ngAttr] = function () {
                                return {
                                    priority: 100,
                                    link: function (scope, element, attr) {
                                        if ("ngPattern" === ngAttr && "/" === attr.ngPattern.charAt(0)) {
                                            var match = attr.ngPattern.match(REGEX_STRING_REGEXP);
                                            if (match) return void attr.$set("ngPattern", new RegExp(match[1], match[2]))
                                        }
                                        scope.$watch(attr[ngAttr], function (value) {
                                            attr.$set(ngAttr, value)
                                        })
                                    }
                                }
                            }
                        }), forEach(["src", "srcset", "href"], function (attrName) {
                            var normalized = directiveNormalize("ng-" + attrName);
                            ngAttributeAliasDirectives[normalized] = function () {
                                return {
                                    priority: 99,
                                    link: function (scope, element, attr) {
                                        var propName = attrName,
                                            name = attrName;
                                        "href" === attrName && "[object SVGAnimatedString]" === toString.call(element.prop("href")) && (name = "xlinkHref", attr.$attr[name] = "xlink:href", propName = null), attr.$observe(normalized, function (value) {
                                            return value ? (attr.$set(name, value), void(msie && propName && element.prop(propName, attr[name]))) : void("href" === attrName && attr.$set(name, null))
                                        })
                                    }
                                }
                            }
                        });
                        var nullFormCtrl = {
                                $addControl: noop,
                                $$renameControl: nullFormRenameControl,
                                $removeControl: noop,
                                $setValidity: noop,
                                $setDirty: noop,
                                $setPristine: noop,
                                $setSubmitted: noop
                            },
                            PENDING_CLASS = "ng-pending",
                            SUBMITTED_CLASS = "ng-submitted";
                        FormController.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"], FormController.prototype = {
                            $rollbackViewValue: function () {
                                forEach(this.$$controls, function (control) {
                                    control.$rollbackViewValue()
                                })
                            },
                            $commitViewValue: function () {
                                forEach(this.$$controls, function (control) {
                                    control.$commitViewValue()
                                })
                            },
                            $addControl: function (control) {
                                assertNotHasOwnProperty(control.$name, "input"), this.$$controls.push(control), control.$name && (this[control.$name] = control), control.$$parentForm = this
                            },
                            $$renameControl: function (control, newName) {
                                var oldName = control.$name;
                                this[oldName] === control && delete this[oldName], this[newName] = control, control.$name = newName
                            },
                            $removeControl: function (control) {
                                control.$name && this[control.$name] === control && delete this[control.$name], forEach(this.$pending, function (value, name) {
                                    this.$setValidity(name, null, control)
                                }, this), forEach(this.$error, function (value, name) {
                                    this.$setValidity(name, null, control)
                                }, this), forEach(this.$$success, function (value, name) {
                                    this.$setValidity(name, null, control)
                                }, this), arrayRemove(this.$$controls, control), control.$$parentForm = nullFormCtrl
                            },
                            $setDirty: function () {
                                this.$$animate.removeClass(this.$$element, PRISTINE_CLASS), this.$$animate.addClass(this.$$element, DIRTY_CLASS), this.$dirty = !0, this.$pristine = !1, this.$$parentForm.$setDirty()
                            },
                            $setPristine: function () {
                                this.$$animate.setClass(this.$$element, PRISTINE_CLASS, DIRTY_CLASS + " " + SUBMITTED_CLASS), this.$dirty = !1, this.$pristine = !0, this.$submitted = !1, forEach(this.$$controls, function (control) {
                                    control.$setPristine()
                                })
                            },
                            $setUntouched: function () {
                                forEach(this.$$controls, function (control) {
                                    control.$setUntouched()
                                })
                            },
                            $setSubmitted: function () {
                                this.$$animate.addClass(this.$$element, SUBMITTED_CLASS), this.$submitted = !0, this.$$parentForm.$setSubmitted()
                            }
                        }, addSetValidityMethod({
                            clazz: FormController,
                            set: function (object, property, controller) {
                                var list = object[property];
                                if (list) {
                                    var index = list.indexOf(controller);
                                    index === -1 && list.push(controller)
                                } else object[property] = [controller]
                            },
                            unset: function (object, property, controller) {
                                var list = object[property];
                                list && (arrayRemove(list, controller), 0 === list.length && delete object[property])
                            }
                        });
                        var formDirectiveFactory = function (isNgForm) {
                                return ["$timeout", "$parse", function ($timeout, $parse) {
                                    function getSetter(expression) {
                                        return "" === expression ? $parse('this[""]').assign : $parse(expression).assign || noop
                                    }
                                    var formDirective = {
                                        name: "form",
                                        restrict: isNgForm ? "EAC" : "E",
                                        require: ["form", "^^?form"],
                                        controller: FormController,
                                        compile: function (formElement, attr) {
                                            formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);
                                            var nameAttr = attr.name ? "name" : !(!isNgForm || !attr.ngForm) && "ngForm";
                                            return {
                                                pre: function (scope, formElement, attr, ctrls) {
                                                    var controller = ctrls[0];
                                                    if (!("action" in attr)) {
                                                        var handleFormSubmission = function (event) {
                                                            scope.$apply(function () {
                                                                controller.$commitViewValue(), controller.$setSubmitted()
                                                            }), event.preventDefault()
                                                        };
                                                        formElement[0].addEventListener("submit", handleFormSubmission), formElement.on("$destroy", function () {
                                                            $timeout(function () {
                                                                formElement[0].removeEventListener("submit", handleFormSubmission)
                                                            }, 0, !1)
                                                        })
                                                    }
                                                    var parentFormCtrl = ctrls[1] || controller.$$parentForm;
                                                    parentFormCtrl.$addControl(controller);
                                                    var setter = nameAttr ? getSetter(controller.$name) : noop;
                                                    nameAttr && (setter(scope, controller), attr.$observe(nameAttr, function (newValue) {
                                                        controller.$name !== newValue && (setter(scope, void 0), controller.$$parentForm.$$renameControl(controller, newValue), (setter = getSetter(controller.$name))(scope, controller))
                                                    })), formElement.on("$destroy", function () {
                                                        controller.$$parentForm.$removeControl(controller), setter(scope, void 0), extend(controller, nullFormCtrl)
                                                    })
                                                }
                                            }
                                        }
                                    };
                                    return formDirective
                                }]
                            },
                            formDirective = formDirectiveFactory(),
                            ngFormDirective = formDirectiveFactory(!0),
                            ISO_DATE_REGEXP = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
                            URL_REGEXP = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
                            EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
                            NUMBER_REGEXP = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
                            DATE_REGEXP = /^(\d{4,})-(\d{2})-(\d{2})$/,
                            DATETIMELOCAL_REGEXP = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
                            WEEK_REGEXP = /^(\d{4,})-W(\d\d)$/,
                            MONTH_REGEXP = /^(\d{4,})-(\d\d)$/,
                            TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
                            PARTIAL_VALIDATION_EVENTS = "keydown wheel mousedown",
                            PARTIAL_VALIDATION_TYPES = createMap();
                        forEach("date,datetime-local,month,time,week".split(","), function (type) {
                            PARTIAL_VALIDATION_TYPES[type] = !0
                        });
                        var inputType = {
                                text: textInputType,
                                date: createDateInputType("date", DATE_REGEXP, createDateParser(DATE_REGEXP, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
                                "datetime-local": createDateInputType("datetimelocal", DATETIMELOCAL_REGEXP, createDateParser(DATETIMELOCAL_REGEXP, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
                                time: createDateInputType("time", TIME_REGEXP, createDateParser(TIME_REGEXP, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
                                week: createDateInputType("week", WEEK_REGEXP, weekParser, "yyyy-Www"),
                                month: createDateInputType("month", MONTH_REGEXP, createDateParser(MONTH_REGEXP, ["yyyy", "MM"]), "yyyy-MM"),
                                number: numberInputType,
                                url: urlInputType,
                                email: emailInputType,
                                radio: radioInputType,
                                range: rangeInputType,
                                checkbox: checkboxInputType,
                                hidden: noop,
                                button: noop,
                                submit: noop,
                                reset: noop,
                                file: noop
                            },
                            inputDirective = ["$browser", "$sniffer", "$filter", "$parse", function ($browser, $sniffer, $filter, $parse) {
                                return {
                                    restrict: "E",
                                    require: ["?ngModel"],
                                    link: {
                                        pre: function (scope, element, attr, ctrls) {
                                            ctrls[0] && (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrls[0], $sniffer, $browser, $filter, $parse)
                                        }
                                    }
                                }
                            }],
                            CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/,
                            ngValueDirective = function () {
                                function updateElementValue(element, attr, value) {
                                    var propValue = isDefined(value) ? value : 9 === msie ? "" : null;
                                    element.prop("value", propValue), attr.$set("value", value)
                                }
                                return {
                                    restrict: "A",
                                    priority: 100,
                                    compile: function (tpl, tplAttr) {
                                        return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue) ? function (scope, elm, attr) {
                                            var value = scope.$eval(attr.ngValue);
                                            updateElementValue(elm, attr, value)
                                        } : function (scope, elm, attr) {
                                            scope.$watch(attr.ngValue, function (value) {
                                                updateElementValue(elm, attr, value)
                                            })
                                        }
                                    }
                                }
                            },
                            ngBindDirective = ["$compile", function ($compile) {
                                return {
                                    restrict: "AC",
                                    compile: function (templateElement) {
                                        return $compile.$$addBindingClass(templateElement),
                                            function (scope, element, attr) {
                                                $compile.$$addBindingInfo(element, attr.ngBind), element = element[0], scope.$watch(attr.ngBind, function (value) {
                                                    element.textContent = stringify(value)
                                                })
                                            }
                                    }
                                }
                            }],
                            ngBindTemplateDirective = ["$interpolate", "$compile", function ($interpolate, $compile) {
                                return {
                                    compile: function (templateElement) {
                                        return $compile.$$addBindingClass(templateElement),
                                            function (scope, element, attr) {
                                                var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
                                                $compile.$$addBindingInfo(element, interpolateFn.expressions), element = element[0], attr.$observe("ngBindTemplate", function (value) {
                                                    element.textContent = isUndefined(value) ? "" : value
                                                })
                                            }
                                    }
                                }
                            }],
                            ngBindHtmlDirective = ["$sce", "$parse", "$compile", function ($sce, $parse, $compile) {
                                return {
                                    restrict: "A",
                                    compile: function (tElement, tAttrs) {
                                        var ngBindHtmlGetter = $parse(tAttrs.ngBindHtml),
                                            ngBindHtmlWatch = $parse(tAttrs.ngBindHtml, function (val) {
                                                return $sce.valueOf(val)
                                            });
                                        return $compile.$$addBindingClass(tElement),
                                            function (scope, element, attr) {
                                                $compile.$$addBindingInfo(element, attr.ngBindHtml), scope.$watch(ngBindHtmlWatch, function () {
                                                    var value = ngBindHtmlGetter(scope);
                                                    element.html($sce.getTrustedHtml(value) || "")
                                                })
                                            }
                                    }
                                }
                            }],
                            ngChangeDirective = valueFn({
                                restrict: "A",
                                require: "ngModel",
                                link: function (scope, element, attr, ctrl) {
                                    ctrl.$viewChangeListeners.push(function () {
                                        scope.$eval(attr.ngChange)
                                    })
                                }
                            }),
                            ngClassDirective = classDirective("", !0),
                            ngClassOddDirective = classDirective("Odd", 0),
                            ngClassEvenDirective = classDirective("Even", 1),
                            ngCloakDirective = ngDirective({
                                compile: function (element, attr) {
                                    attr.$set("ngCloak", void 0), element.removeClass("ng-cloak")
                                }
                            }),
                            ngControllerDirective = [function () {
                                return {
                                    restrict: "A",
                                    scope: !0,
                                    controller: "@",
                                    priority: 500
                                }
                            }],
                            ngEventDirectives = {},
                            forceAsyncEvents = {
                                blur: !0,
                                focus: !0
                            };
                        forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (eventName) {
                            var directiveName = directiveNormalize("ng-" + eventName);
                            ngEventDirectives[directiveName] = ["$parse", "$rootScope", function ($parse, $rootScope) {
                                return {
                                    restrict: "A",
                                    compile: function ($element, attr) {
                                        var fn = $parse(attr[directiveName]);
                                        return function (scope, element) {
                                            element.on(eventName, function (event) {
                                                var callback = function () {
                                                    fn(scope, {
                                                        $event: event
                                                    })
                                                };
                                                forceAsyncEvents[eventName] && $rootScope.$$phase ? scope.$evalAsync(callback) : scope.$apply(callback)
                                            })
                                        }
                                    }
                                }
                            }]
                        });
                        var ngIfDirective = ["$animate", "$compile", function ($animate, $compile) {
                                return {
                                    multiElement: !0,
                                    transclude: "element",
                                    priority: 600,
                                    terminal: !0,
                                    restrict: "A",
                                    $$tlb: !0,
                                    link: function ($scope, $element, $attr, ctrl, $transclude) {
                                        var block, childScope, previousElements;
                                        $scope.$watch($attr.ngIf, function (value) {
                                            value ? childScope || $transclude(function (clone, newScope) {
                                                childScope = newScope, clone[clone.length++] = $compile.$$createComment("end ngIf", $attr.ngIf), block = {
                                                    clone: clone
                                                }, $animate.enter(clone, $element.parent(), $element)
                                            }) : (previousElements && (previousElements.remove(), previousElements = null), childScope && (childScope.$destroy(), childScope = null), block && (previousElements = getBlockNodes(block.clone), $animate.leave(previousElements).done(function (response) {
                                                response !== !1 && (previousElements = null)
                                            }), block = null))
                                        })
                                    }
                                }
                            }],
                            ngIncludeDirective = ["$templateRequest", "$anchorScroll", "$animate", function ($templateRequest, $anchorScroll, $animate) {
                                return {
                                    restrict: "ECA",
                                    priority: 400,
                                    terminal: !0,
                                    transclude: "element",
                                    controller: angular.noop,
                                    compile: function (element, attr) {
                                        var srcExp = attr.ngInclude || attr.src,
                                            onloadExp = attr.onload || "",
                                            autoScrollExp = attr.autoscroll;
                                        return function (scope, $element, $attr, ctrl, $transclude) {
                                            var currentScope, previousElement, currentElement, changeCounter = 0,
                                                cleanupLastIncludeContent = function () {
                                                    previousElement && (previousElement.remove(), previousElement = null), currentScope && (currentScope.$destroy(), currentScope = null), currentElement && ($animate.leave(currentElement).done(function (response) {
                                                        response !== !1 && (previousElement = null)
                                                    }), previousElement = currentElement, currentElement = null)
                                                };
                                            scope.$watch(srcExp, function (src) {
                                                var afterAnimation = function (response) {
                                                        response === !1 || !isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll()
                                                    },
                                                    thisChangeId = ++changeCounter;
                                                src ? ($templateRequest(src, !0).then(function (response) {
                                                    if (!scope.$$destroyed && thisChangeId === changeCounter) {
                                                        var newScope = scope.$new();
                                                        ctrl.template = response;
                                                        var clone = $transclude(newScope, function (clone) {
                                                            cleanupLastIncludeContent(), $animate.enter(clone, null, $element).done(afterAnimation)
                                                        });
                                                        currentScope = newScope, currentElement = clone, currentScope.$emit("$includeContentLoaded", src), scope.$eval(onloadExp)
                                                    }
                                                }, function () {
                                                    scope.$$destroyed || thisChangeId === changeCounter && (cleanupLastIncludeContent(), scope.$emit("$includeContentError", src))
                                                }), scope.$emit("$includeContentRequested", src)) : (cleanupLastIncludeContent(), ctrl.template = null)
                                            })
                                        }
                                    }
                                }
                            }],
                            ngIncludeFillContentDirective = ["$compile", function ($compile) {
                                return {
                                    restrict: "ECA",
                                    priority: -400,
                                    require: "ngInclude",
                                    link: function (scope, $element, $attr, ctrl) {
                                        return toString.call($element[0]).match(/SVG/) ? ($element.empty(), void $compile(jqLiteBuildFragment(ctrl.template, window.document).childNodes)(scope, function (clone) {
                                            $element.append(clone)
                                        }, {
                                            futureParentElement: $element
                                        })) : ($element.html(ctrl.template), void $compile($element.contents())(scope))
                                    }
                                }
                            }],
                            ngInitDirective = ngDirective({
                                priority: 450,
                                compile: function () {
                                    return {
                                        pre: function (scope, element, attrs) {
                                            scope.$eval(attrs.ngInit)
                                        }
                                    }
                                }
                            }),
                            ngListDirective = function () {
                                return {
                                    restrict: "A",
                                    priority: 100,
                                    require: "ngModel",
                                    link: function (scope, element, attr, ctrl) {
                                        var ngList = attr.ngList || ", ",
                                            trimValues = "false" !== attr.ngTrim,
                                            separator = trimValues ? trim(ngList) : ngList,
                                            parse = function (viewValue) {
                                                if (!isUndefined(viewValue)) {
                                                    var list = [];
                                                    return viewValue && forEach(viewValue.split(separator), function (value) {
                                                        value && list.push(trimValues ? trim(value) : value)
                                                    }), list
                                                }
                                            };
                                        ctrl.$parsers.push(parse), ctrl.$formatters.push(function (value) {
                                            if (isArray(value)) return value.join(ngList)
                                        }), ctrl.$isEmpty = function (value) {
                                            return !value || !value.length
                                        }
                                    }
                                }
                            },
                            VALID_CLASS = "ng-valid",
                            INVALID_CLASS = "ng-invalid",
                            PRISTINE_CLASS = "ng-pristine",
                            DIRTY_CLASS = "ng-dirty",
                            UNTOUCHED_CLASS = "ng-untouched",
                            TOUCHED_CLASS = "ng-touched",
                            EMPTY_CLASS = "ng-empty",
                            NOT_EMPTY_CLASS = "ng-not-empty",
                            ngModelMinErr = minErr("ngModel");
                        NgModelController.$inject = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$q", "$interpolate"], NgModelController.prototype = {
                            $$initGetterSetters: function () {
                                if (this.$options.getOption("getterSetter")) {
                                    var invokeModelGetter = this.$$parse(this.$$attr.ngModel + "()"),
                                        invokeModelSetter = this.$$parse(this.$$attr.ngModel + "($$$p)");
                                    this.$$ngModelGet = function ($scope) {
                                        var modelValue = this.$$parsedNgModel($scope);
                                        return isFunction(modelValue) && (modelValue = invokeModelGetter($scope)), modelValue
                                    }, this.$$ngModelSet = function ($scope, newValue) {
                                        isFunction(this.$$parsedNgModel($scope)) ? invokeModelSetter($scope, {
                                            $$$p: newValue
                                        }) : this.$$parsedNgModelAssign($scope, newValue)
                                    }
                                } else if (!this.$$parsedNgModel.assign) throw ngModelMinErr("nonassign", "Expression '{0}' is non-assignable. Element: {1}", this.$$attr.ngModel, startingTag(this.$$element))
                            },
                            $render: noop,
                            $isEmpty: function (value) {
                                return isUndefined(value) || "" === value || null === value || value !== value
                            },
                            $$updateEmptyClasses: function (value) {
                                this.$isEmpty(value) ? (this.$$animate.removeClass(this.$$element, NOT_EMPTY_CLASS), this.$$animate.addClass(this.$$element, EMPTY_CLASS)) : (this.$$animate.removeClass(this.$$element, EMPTY_CLASS), this.$$animate.addClass(this.$$element, NOT_EMPTY_CLASS))
                            },
                            $setPristine: function () {
                                this.$dirty = !1, this.$pristine = !0, this.$$animate.removeClass(this.$$element, DIRTY_CLASS), this.$$animate.addClass(this.$$element, PRISTINE_CLASS)
                            },
                            $setDirty: function () {
                                this.$dirty = !0, this.$pristine = !1, this.$$animate.removeClass(this.$$element, PRISTINE_CLASS), this.$$animate.addClass(this.$$element, DIRTY_CLASS), this.$$parentForm.$setDirty()
                            },
                            $setUntouched: function () {
                                this.$touched = !1, this.$untouched = !0, this.$$animate.setClass(this.$$element, UNTOUCHED_CLASS, TOUCHED_CLASS)
                            },
                            $setTouched: function () {
                                this.$touched = !0, this.$untouched = !1, this.$$animate.setClass(this.$$element, TOUCHED_CLASS, UNTOUCHED_CLASS)
                            },
                            $rollbackViewValue: function () {
                                this.$$timeout.cancel(this.$$pendingDebounce), this.$viewValue = this.$$lastCommittedViewValue, this.$render()
                            },
                            $validate: function () {
                                if (!isNumberNaN(this.$modelValue)) {
                                    var viewValue = this.$$lastCommittedViewValue,
                                        modelValue = this.$$rawModelValue,
                                        prevValid = this.$valid,
                                        prevModelValue = this.$modelValue,
                                        allowInvalid = this.$options.getOption("allowInvalid"),
                                        that = this;
                                    this.$$runValidators(modelValue, viewValue, function (allValid) {
                                        allowInvalid || prevValid === allValid || (that.$modelValue = allValid ? modelValue : void 0, that.$modelValue !== prevModelValue && that.$$writeModelToScope())
                                    })
                                }
                            },
                            $$runValidators: function (modelValue, viewValue, doneCallback) {
                                function processParseErrors() {
                                    var errorKey = that.$$parserName || "parse";
                                    return isUndefined(that.$$parserValid) ? (setValidity(errorKey, null), !0) : (that.$$parserValid || (forEach(that.$validators, function (v, name) {
                                        setValidity(name, null)
                                    }), forEach(that.$asyncValidators, function (v, name) {
                                        setValidity(name, null)
                                    })), setValidity(errorKey, that.$$parserValid), that.$$parserValid)
                                }

                                function processSyncValidators() {
                                    var syncValidatorsValid = !0;
                                    return forEach(that.$validators, function (validator, name) {
                                        var result = Boolean(validator(modelValue, viewValue));
                                        syncValidatorsValid = syncValidatorsValid && result, setValidity(name, result)
                                    }), !!syncValidatorsValid || (forEach(that.$asyncValidators, function (v, name) {
                                        setValidity(name, null)
                                    }), !1)
                                }

                                function processAsyncValidators() {
                                    var validatorPromises = [],
                                        allValid = !0;
                                    forEach(that.$asyncValidators, function (validator, name) {
                                        var promise = validator(modelValue, viewValue);
                                        if (!isPromiseLike(promise)) throw ngModelMinErr("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", promise);
                                        setValidity(name, void 0), validatorPromises.push(promise.then(function () {
                                            setValidity(name, !0)
                                        }, function () {
                                            allValid = !1, setValidity(name, !1)
                                        }))
                                    }), validatorPromises.length ? that.$$q.all(validatorPromises).then(function () {
                                        validationDone(allValid)
                                    }, noop) : validationDone(!0)
                                }

                                function setValidity(name, isValid) {
                                    localValidationRunId === that.$$currentValidationRunId && that.$setValidity(name, isValid)
                                }

                                function validationDone(allValid) {
                                    localValidationRunId === that.$$currentValidationRunId && doneCallback(allValid)
                                }
                                this.$$currentValidationRunId++;
                                var localValidationRunId = this.$$currentValidationRunId,
                                    that = this;
                                return processParseErrors() && processSyncValidators() ? void processAsyncValidators() : void validationDone(!1)
                            },
                            $commitViewValue: function () {
                                var viewValue = this.$viewValue;
                                this.$$timeout.cancel(this.$$pendingDebounce), (this.$$lastCommittedViewValue !== viewValue || "" === viewValue && this.$$hasNativeValidators) && (this.$$updateEmptyClasses(viewValue), this.$$lastCommittedViewValue = viewValue, this.$pristine && this.$setDirty(), this.$$parseAndValidate())
                            },
                            $$parseAndValidate: function () {
                                function writeToModelIfNeeded() {
                                    that.$modelValue !== prevModelValue && that.$$writeModelToScope()
                                }
                                var viewValue = this.$$lastCommittedViewValue,
                                    modelValue = viewValue,
                                    that = this;
                                if (this.$$parserValid = !isUndefined(modelValue) || void 0, this.$$parserValid)
                                    for (var i = 0; i < this.$parsers.length; i++)
                                        if (modelValue = this.$parsers[i](modelValue), isUndefined(modelValue)) {
                                            this.$$parserValid = !1;
                                            break
                                        } isNumberNaN(this.$modelValue) && (this.$modelValue = this.$$ngModelGet(this.$$scope));
                                var prevModelValue = this.$modelValue,
                                    allowInvalid = this.$options.getOption("allowInvalid");
                                this.$$rawModelValue = modelValue, allowInvalid && (this.$modelValue = modelValue, writeToModelIfNeeded()), this.$$runValidators(modelValue, this.$$lastCommittedViewValue, function (allValid) {
                                    allowInvalid || (that.$modelValue = allValid ? modelValue : void 0, writeToModelIfNeeded())
                                })
                            },
                            $$writeModelToScope: function () {
                                this.$$ngModelSet(this.$$scope, this.$modelValue), forEach(this.$viewChangeListeners, function (listener) {
                                    try {
                                        listener()
                                    } catch (e) {
                                        this.$$exceptionHandler(e)
                                    }
                                }, this)
                            },
                            $setViewValue: function (value, trigger) {
                                this.$viewValue = value, this.$options.getOption("updateOnDefault") && this.$$debounceViewValueCommit(trigger)
                            },
                            $$debounceViewValueCommit: function (trigger) {
                                var debounceDelay = this.$options.getOption("debounce");
                                isNumber(debounceDelay[trigger]) ? debounceDelay = debounceDelay[trigger] : isNumber(debounceDelay["default"]) && (debounceDelay = debounceDelay["default"]), this.$$timeout.cancel(this.$$pendingDebounce);
                                var that = this;
                                debounceDelay > 0 ? this.$$pendingDebounce = this.$$timeout(function () {
                                    that.$commitViewValue()
                                }, debounceDelay) : this.$$scope.$root.$$phase ? this.$commitViewValue() : this.$$scope.$apply(function () {
                                    that.$commitViewValue()
                                })
                            },
                            $overrideModelOptions: function (options) {
                                this.$options = this.$options.createChild(options)
                            }
                        }, addSetValidityMethod({
                            clazz: NgModelController,
                            set: function (object, property) {
                                object[property] = !0
                            },
                            unset: function (object, property) {
                                delete object[property]
                            }
                        });
                        var defaultModelOptions, ngModelDirective = ["$rootScope", function ($rootScope) {
                                return {
                                    restrict: "A",
                                    require: ["ngModel", "^?form", "^?ngModelOptions"],
                                    controller: NgModelController,
                                    priority: 1,
                                    compile: function (element) {
                                        return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS), {
                                            pre: function (scope, element, attr, ctrls) {
                                                var modelCtrl = ctrls[0],
                                                    formCtrl = ctrls[1] || modelCtrl.$$parentForm,
                                                    optionsCtrl = ctrls[2];
                                                optionsCtrl && (modelCtrl.$options = optionsCtrl.$options), modelCtrl.$$initGetterSetters(), formCtrl.$addControl(modelCtrl), attr.$observe("name", function (newValue) {
                                                    modelCtrl.$name !== newValue && modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue)
                                                }), scope.$on("$destroy", function () {
                                                    modelCtrl.$$parentForm.$removeControl(modelCtrl)
                                                })
                                            },
                                            post: function (scope, element, attr, ctrls) {
                                                function setTouched() {
                                                    modelCtrl.$setTouched()
                                                }
                                                var modelCtrl = ctrls[0];
                                                modelCtrl.$options.getOption("updateOn") && element.on(modelCtrl.$options.getOption("updateOn"), function (ev) {
                                                    modelCtrl.$$debounceViewValueCommit(ev && ev.type)
                                                }), element.on("blur", function () {
                                                    modelCtrl.$touched || ($rootScope.$$phase ? scope.$evalAsync(setTouched) : scope.$apply(setTouched))
                                                })
                                            }
                                        }
                                    }
                                }
                            }],
                            DEFAULT_REGEXP = /(\s+|^)default(\s+|$)/;
                        ModelOptions.prototype = {
                            getOption: function (name) {
                                return this.$$options[name]
                            },
                            createChild: function (options) {
                                var inheritAll = !1;
                                return options = extend({}, options), forEach(options, function (option, key) {
                                    "$inherit" === option ? "*" === key ? inheritAll = !0 : (options[key] = this.$$options[key], "updateOn" === key && (options.updateOnDefault = this.$$options.updateOnDefault)) : "updateOn" === key && (options.updateOnDefault = !1, options[key] = trim(option.replace(DEFAULT_REGEXP, function () {
                                        return options.updateOnDefault = !0, " "
                                    })))
                                }, this), inheritAll && (delete options["*"], defaults(options, this.$$options)), defaults(options, defaultModelOptions.$$options), new ModelOptions(options)
                            }
                        }, defaultModelOptions = new ModelOptions({
                            updateOn: "",
                            updateOnDefault: !0,
                            debounce: 0,
                            getterSetter: !1,
                            allowInvalid: !1,
                            timezone: null
                        });
                        var ngModelOptionsDirective = function () {
                                function NgModelOptionsController($attrs, $scope) {
                                    this.$$attrs = $attrs, this.$$scope = $scope
                                }
                                return NgModelOptionsController.$inject = ["$attrs", "$scope"], NgModelOptionsController.prototype = {
                                    $onInit: function () {
                                        var parentOptions = this.parentCtrl ? this.parentCtrl.$options : defaultModelOptions,
                                            modelOptionsDefinition = this.$$scope.$eval(this.$$attrs.ngModelOptions);
                                        this.$options = parentOptions.createChild(modelOptionsDefinition)
                                    }
                                }, {
                                    restrict: "A",
                                    priority: 10,
                                    require: {
                                        parentCtrl: "?^^ngModelOptions"
                                    },
                                    bindToController: !0,
                                    controller: NgModelOptionsController
                                }
                            },
                            ngNonBindableDirective = ngDirective({
                                terminal: !0,
                                priority: 1e3
                            }),
                            ngOptionsMinErr = minErr("ngOptions"),
                            NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                            ngOptionsDirective = ["$compile", "$document", "$parse", function ($compile, $document, $parse) {
                                function parseOptionsExpression(optionsExp, selectElement, scope) {
                                    function Option(selectValue, viewValue, label, group, disabled) {
                                        this.selectValue = selectValue, this.viewValue = viewValue, this.label = label, this.group = group, this.disabled = disabled
                                    }

                                    function getOptionValuesKeys(optionValues) {
                                        var optionValuesKeys;
                                        if (!keyName && isArrayLike(optionValues)) optionValuesKeys = optionValues;
                                        else {
                                            optionValuesKeys = [];
                                            for (var itemKey in optionValues) optionValues.hasOwnProperty(itemKey) && "$" !== itemKey.charAt(0) && optionValuesKeys.push(itemKey)
                                        }
                                        return optionValuesKeys
                                    }
                                    var match = optionsExp.match(NG_OPTIONS_REGEXP);
                                    if (!match) throw ngOptionsMinErr("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", optionsExp, startingTag(selectElement));
                                    var valueName = match[5] || match[7],
                                        keyName = match[6],
                                        selectAs = / as /.test(match[0]) && match[1],
                                        trackBy = match[9],
                                        valueFn = $parse(match[2] ? match[1] : valueName),
                                        selectAsFn = selectAs && $parse(selectAs),
                                        viewValueFn = selectAsFn || valueFn,
                                        trackByFn = trackBy && $parse(trackBy),
                                        getTrackByValueFn = trackBy ? function (value, locals) {
                                            return trackByFn(scope, locals)
                                        } : function (value) {
                                            return hashKey(value)
                                        },
                                        getTrackByValue = function (value, key) {
                                            return getTrackByValueFn(value, getLocals(value, key))
                                        },
                                        displayFn = $parse(match[2] || match[1]),
                                        groupByFn = $parse(match[3] || ""),
                                        disableWhenFn = $parse(match[4] || ""),
                                        valuesFn = $parse(match[8]),
                                        locals = {},
                                        getLocals = keyName ? function (value, key) {
                                            return locals[keyName] = key, locals[valueName] = value, locals
                                        } : function (value) {
                                            return locals[valueName] = value, locals
                                        };
                                    return {
                                        trackBy: trackBy,
                                        getTrackByValue: getTrackByValue,
                                        getWatchables: $parse(valuesFn, function (optionValues) {
                                            var watchedArray = [];
                                            optionValues = optionValues || [];
                                            for (var optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; index < optionValuesLength; index++) {
                                                var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index],
                                                    value = optionValues[key],
                                                    locals = getLocals(value, key),
                                                    selectValue = getTrackByValueFn(value, locals);
                                                if (watchedArray.push(selectValue), match[2] || match[1]) {
                                                    var label = displayFn(scope, locals);
                                                    watchedArray.push(label)
                                                }
                                                if (match[4]) {
                                                    var disableWhen = disableWhenFn(scope, locals);
                                                    watchedArray.push(disableWhen)
                                                }
                                            }
                                            return watchedArray
                                        }),
                                        getOptions: function () {
                                            for (var optionItems = [], selectValueMap = {}, optionValues = valuesFn(scope) || [], optionValuesKeys = getOptionValuesKeys(optionValues), optionValuesLength = optionValuesKeys.length, index = 0; index < optionValuesLength; index++) {
                                                var key = optionValues === optionValuesKeys ? index : optionValuesKeys[index],
                                                    value = optionValues[key],
                                                    locals = getLocals(value, key),
                                                    viewValue = viewValueFn(scope, locals),
                                                    selectValue = getTrackByValueFn(viewValue, locals),
                                                    label = displayFn(scope, locals),
                                                    group = groupByFn(scope, locals),
                                                    disabled = disableWhenFn(scope, locals),
                                                    optionItem = new Option(selectValue, viewValue, label, group, disabled);
                                                optionItems.push(optionItem), selectValueMap[selectValue] = optionItem
                                            }
                                            return {
                                                items: optionItems,
                                                selectValueMap: selectValueMap,
                                                getOptionFromViewValue: function (value) {
                                                    return selectValueMap[getTrackByValue(value)]
                                                },
                                                getViewValueFromOption: function (option) {
                                                    return trackBy ? copy(option.viewValue) : option.viewValue
                                                }
                                            }
                                        }
                                    }
                                }

                                function ngOptionsPostLink(scope, selectElement, attr, ctrls) {
                                    function addOptionElement(option, parent) {
                                        var optionElement = optionTemplate.cloneNode(!1);
                                        parent.appendChild(optionElement), updateOptionElement(option, optionElement)
                                    }

                                    function getAndUpdateSelectedOption(viewValue) {
                                        var option = options.getOptionFromViewValue(viewValue),
                                            element = option && option.element;
                                        return element && !element.selected && (element.selected = !0), option
                                    }

                                    function updateOptionElement(option, element) {
                                        option.element = element, element.disabled = option.disabled, option.label !== element.label && (element.label = option.label, element.textContent = option.label), element.value = option.selectValue
                                    }

                                    function updateOptions() {
                                        var previousValue = options && selectCtrl.readValue();
                                        if (options)
                                            for (var i = options.items.length - 1; i >= 0; i--) {
                                                var option = options.items[i];
                                                jqLiteRemove(isDefined(option.group) ? option.element.parentNode : option.element)
                                            }
                                        options = ngOptions.getOptions();
                                        var groupElementMap = {};
                                        if (providedEmptyOption && selectElement.prepend(selectCtrl.emptyOption), options.items.forEach(function (option) {
                                                var groupElement;
                                                isDefined(option.group) ? (groupElement = groupElementMap[option.group], groupElement || (groupElement = optGroupTemplate.cloneNode(!1), listFragment.appendChild(groupElement), groupElement.label = null === option.group ? "null" : option.group, groupElementMap[option.group] = groupElement), addOptionElement(option, groupElement)) : addOptionElement(option, listFragment)
                                            }), selectElement[0].appendChild(listFragment), ngModelCtrl.$render(), !ngModelCtrl.$isEmpty(previousValue)) {
                                            var nextValue = selectCtrl.readValue(),
                                                isNotPrimitive = ngOptions.trackBy || multiple;
                                            (isNotPrimitive ? equals(previousValue, nextValue) : previousValue === nextValue) || (ngModelCtrl.$setViewValue(nextValue), ngModelCtrl.$render())
                                        }
                                    }
                                    for (var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, i = 0, children = selectElement.children(), ii = children.length; i < ii; i++)
                                        if ("" === children[i].value) {
                                            selectCtrl.hasEmptyOption = !0, selectCtrl.emptyOption = children.eq(i);
                                            break
                                        } var providedEmptyOption = !!selectCtrl.emptyOption,
                                        unknownOption = jqLite(optionTemplate.cloneNode(!1));
                                    unknownOption.val("?");
                                    var options, ngOptions = parseOptionsExpression(attr.ngOptions, selectElement, scope),
                                        listFragment = $document[0].createDocumentFragment();
                                    selectCtrl.generateUnknownOptionValue = function (val) {
                                        return "?"
                                    }, multiple ? (selectCtrl.writeValue = function (values) {
                                        var selectedOptions = values && values.map(getAndUpdateSelectedOption) || [];
                                        options.items.forEach(function (option) {
                                            option.element.selected && !includes(selectedOptions, option) && (option.element.selected = !1)
                                        })
                                    }, selectCtrl.readValue = function () {
                                        var selectedValues = selectElement.val() || [],
                                            selections = [];
                                        return forEach(selectedValues, function (value) {
                                            var option = options.selectValueMap[value];
                                            option && !option.disabled && selections.push(options.getViewValueFromOption(option))
                                        }), selections
                                    }, ngOptions.trackBy && scope.$watchCollection(function () {
                                        if (isArray(ngModelCtrl.$viewValue)) return ngModelCtrl.$viewValue.map(function (value) {
                                            return ngOptions.getTrackByValue(value)
                                        })
                                    }, function () {
                                        ngModelCtrl.$render()
                                    })) : (selectCtrl.writeValue = function (value) {
                                        var selectedOption = options.selectValueMap[selectElement.val()],
                                            option = options.getOptionFromViewValue(value);
                                        selectedOption && selectedOption.element.removeAttribute("selected"), option ? (selectElement[0].value !== option.selectValue && (selectCtrl.removeUnknownOption(), selectCtrl.unselectEmptyOption(), selectElement[0].value = option.selectValue, option.element.selected = !0), option.element.setAttribute("selected", "selected")) : providedEmptyOption ? selectCtrl.selectEmptyOption() : selectCtrl.unknownOption.parent().length ? selectCtrl.updateUnknownOption(value) : selectCtrl.renderUnknownOption(value)
                                    }, selectCtrl.readValue = function () {
                                        var selectedOption = options.selectValueMap[selectElement.val()];
                                        return selectedOption && !selectedOption.disabled ? (selectCtrl.unselectEmptyOption(), selectCtrl.removeUnknownOption(), options.getViewValueFromOption(selectedOption)) : null
                                    }, ngOptions.trackBy && scope.$watch(function () {
                                        return ngOptions.getTrackByValue(ngModelCtrl.$viewValue)
                                    }, function () {
                                        ngModelCtrl.$render()
                                    })), providedEmptyOption && (selectCtrl.emptyOption.remove(), $compile(selectCtrl.emptyOption)(scope), selectCtrl.emptyOption[0].nodeType === NODE_TYPE_COMMENT ? (selectCtrl.hasEmptyOption = !1, selectCtrl.registerOption = function (optionScope, optionEl) {
                                        "" === optionEl.val() && (selectCtrl.hasEmptyOption = !0, selectCtrl.emptyOption = optionEl, selectCtrl.emptyOption.removeClass("ng-scope"), ngModelCtrl.$render(), optionEl.on("$destroy", function () {
                                            selectCtrl.hasEmptyOption = !1, selectCtrl.emptyOption = void 0
                                        }))
                                    }) : selectCtrl.emptyOption.removeClass("ng-scope")), selectElement.empty(), updateOptions(), scope.$watchCollection(ngOptions.getWatchables, updateOptions)
                                }
                                var optionTemplate = window.document.createElement("option"),
                                    optGroupTemplate = window.document.createElement("optgroup");
                                return {
                                    restrict: "A",
                                    terminal: !0,
                                    require: ["select", "ngModel"],
                                    link: {
                                        pre: function (scope, selectElement, attr, ctrls) {
                                            ctrls[0].registerOption = noop
                                        },
                                        post: ngOptionsPostLink
                                    }
                                }
                            }],
                            ngPluralizeDirective = ["$locale", "$interpolate", "$log", function ($locale, $interpolate, $log) {
                                var BRACE = /{}/g,
                                    IS_WHEN = /^when(Minus)?(.+)$/;
                                return {
                                    link: function (scope, element, attr) {
                                        function updateElementText(newText) {
                                            element.text(newText || "")
                                        }
                                        var lastCount, numberExp = attr.count,
                                            whenExp = attr.$attr.when && element.attr(attr.$attr.when),
                                            offset = attr.offset || 0,
                                            whens = scope.$eval(whenExp) || {},
                                            whensExpFns = {},
                                            startSymbol = $interpolate.startSymbol(),
                                            endSymbol = $interpolate.endSymbol(),
                                            braceReplacement = startSymbol + numberExp + "-" + offset + endSymbol,
                                            watchRemover = angular.noop;
                                        forEach(attr, function (expression, attributeName) {
                                            var tmpMatch = IS_WHEN.exec(attributeName);
                                            if (tmpMatch) {
                                                var whenKey = (tmpMatch[1] ? "-" : "") + lowercase(tmpMatch[2]);
                                                whens[whenKey] = element.attr(attr.$attr[attributeName])
                                            }
                                        }), forEach(whens, function (expression, key) {
                                            whensExpFns[key] = $interpolate(expression.replace(BRACE, braceReplacement))
                                        }), scope.$watch(numberExp, function (newVal) {
                                            var count = parseFloat(newVal),
                                                countIsNaN = isNumberNaN(count);
                                            if (countIsNaN || count in whens || (count = $locale.pluralCat(count - offset)), !(count === lastCount || countIsNaN && isNumberNaN(lastCount))) {
                                                watchRemover();
                                                var whenExpFn = whensExpFns[count];
                                                isUndefined(whenExpFn) ? (null != newVal && $log.debug("ngPluralize: no rule defined for '" + count + "' in " + whenExp), watchRemover = noop, updateElementText()) : watchRemover = scope.$watch(whenExpFn, updateElementText), lastCount = count
                                            }
                                        })
                                    }
                                }
                            }],
                            ngRepeatDirective = ["$parse", "$animate", "$compile", function ($parse, $animate, $compile) {
                                var NG_REMOVED = "$$NG_REMOVED",
                                    ngRepeatMinErr = minErr("ngRepeat"),
                                    updateScope = function (scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
                                        scope[valueIdentifier] = value, keyIdentifier && (scope[keyIdentifier] = key), scope.$index = index, scope.$first = 0 === index, scope.$last = index === arrayLength - 1, scope.$middle = !(scope.$first || scope.$last), scope.$odd = !(scope.$even = 0 === (1 & index))
                                    },
                                    getBlockStart = function (block) {
                                        return block.clone[0]
                                    },
                                    getBlockEnd = function (block) {
                                        return block.clone[block.clone.length - 1]
                                    };
                                return {
                                    restrict: "A",
                                    multiElement: !0,
                                    transclude: "element",
                                    priority: 1e3,
                                    terminal: !0,
                                    $$tlb: !0,
                                    compile: function ($element, $attr) {
                                        var expression = $attr.ngRepeat,
                                            ngRepeatEndComment = $compile.$$createComment("end ngRepeat", expression),
                                            match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                                        if (!match) throw ngRepeatMinErr("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
                                        var lhs = match[1],
                                            rhs = match[2],
                                            aliasAs = match[3],
                                            trackByExp = match[4];
                                        if (match = lhs.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/), !match) throw ngRepeatMinErr("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs);
                                        var valueIdentifier = match[3] || match[1],
                                            keyIdentifier = match[2];
                                        if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) throw ngRepeatMinErr("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", aliasAs);
                                        var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn, hashFnLocals = {
                                            $id: hashKey
                                        };
                                        return trackByExp ? trackByExpGetter = $parse(trackByExp) : (trackByIdArrayFn = function (key, value) {
                                                return hashKey(value)
                                            }, trackByIdObjFn = function (key) {
                                                return key
                                            }),
                                            function ($scope, $element, $attr, ctrl, $transclude) {
                                                trackByExpGetter && (trackByIdExpFn = function (key, value, index) {
                                                    return keyIdentifier && (hashFnLocals[keyIdentifier] = key), hashFnLocals[valueIdentifier] = value, hashFnLocals.$index = index, trackByExpGetter($scope, hashFnLocals)
                                                });
                                                var lastBlockMap = createMap();
                                                $scope.$watchCollection(rhs, function (collection) {
                                                    var index, length, nextNode, collectionLength, key, value, trackById, trackByIdFn, collectionKeys, block, nextBlockOrder, elementsToRemove, previousNode = $element[0],
                                                        nextBlockMap = createMap();
                                                    if (aliasAs && ($scope[aliasAs] = collection), isArrayLike(collection)) collectionKeys = collection, trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                                                    else {
                                                        trackByIdFn = trackByIdExpFn || trackByIdObjFn, collectionKeys = [];
                                                        for (var itemKey in collection) hasOwnProperty.call(collection, itemKey) && "$" !== itemKey.charAt(0) && collectionKeys.push(itemKey)
                                                    }
                                                    for (collectionLength = collectionKeys.length, nextBlockOrder = new Array(collectionLength), index = 0; index < collectionLength; index++)
                                                        if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], trackById = trackByIdFn(key, value, index), lastBlockMap[trackById]) block = lastBlockMap[trackById], delete lastBlockMap[trackById], nextBlockMap[trackById] = block, nextBlockOrder[index] = block;
                                                        else {
                                                            if (nextBlockMap[trackById]) throw forEach(nextBlockOrder, function (block) {
                                                                block && block.scope && (lastBlockMap[block.id] = block)
                                                            }), ngRepeatMinErr("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", expression, trackById, value);
                                                            nextBlockOrder[index] = {
                                                                id: trackById,
                                                                scope: void 0,
                                                                clone: void 0
                                                            }, nextBlockMap[trackById] = !0
                                                        } for (var blockKey in lastBlockMap) {
                                                        if (block = lastBlockMap[blockKey], elementsToRemove = getBlockNodes(block.clone), $animate.leave(elementsToRemove), elementsToRemove[0].parentNode)
                                                            for (index = 0, length = elementsToRemove.length; index < length; index++) elementsToRemove[index][NG_REMOVED] = !0;
                                                        block.scope.$destroy()
                                                    }
                                                    for (index = 0; index < collectionLength; index++)
                                                        if (key = collection === collectionKeys ? index : collectionKeys[index], value = collection[key], block = nextBlockOrder[index], block.scope) {
                                                            nextNode = previousNode;
                                                            do nextNode = nextNode.nextSibling; while (nextNode && nextNode[NG_REMOVED]);
                                                            getBlockStart(block) !== nextNode && $animate.move(getBlockNodes(block.clone), null, previousNode), previousNode = getBlockEnd(block), updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                                                        } else $transclude(function (clone, scope) {
                                                            block.scope = scope;
                                                            var endNode = ngRepeatEndComment.cloneNode(!1);
                                                            clone[clone.length++] = endNode, $animate.enter(clone, null, previousNode), previousNode = endNode, block.clone = clone, nextBlockMap[block.id] = block, updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength)
                                                        });
                                                    lastBlockMap = nextBlockMap
                                                })
                                            }
                                    }
                                }
                            }],
                            NG_HIDE_CLASS = "ng-hide",
                            NG_HIDE_IN_PROGRESS_CLASS = "ng-hide-animate",
                            ngShowDirective = ["$animate", function ($animate) {
                                return {
                                    restrict: "A",
                                    multiElement: !0,
                                    link: function (scope, element, attr) {
                                        scope.$watch(attr.ngShow, function (value) {
                                            $animate[value ? "removeClass" : "addClass"](element, NG_HIDE_CLASS, {
                                                tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                                            })
                                        })
                                    }
                                }
                            }],
                            ngHideDirective = ["$animate", function ($animate) {
                                return {
                                    restrict: "A",
                                    multiElement: !0,
                                    link: function (scope, element, attr) {
                                        scope.$watch(attr.ngHide, function (value) {
                                            $animate[value ? "addClass" : "removeClass"](element, NG_HIDE_CLASS, {
                                                tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                                            })
                                        })
                                    }
                                }
                            }],
                            ngStyleDirective = ngDirective(function (scope, element, attr) {
                                scope.$watch(attr.ngStyle, function (newStyles, oldStyles) {
                                    oldStyles && newStyles !== oldStyles && forEach(oldStyles, function (val, style) {
                                        element.css(style, "")
                                    }), newStyles && element.css(newStyles)
                                }, !0)
                            }),
                            ngSwitchDirective = ["$animate", "$compile", function ($animate, $compile) {
                                return {
                                    require: "ngSwitch",
                                    controller: ["$scope", function () {
                                        this.cases = {}
                                    }],
                                    link: function (scope, element, attr, ngSwitchController) {
                                        var watchExpr = attr.ngSwitch || attr.on,
                                            selectedTranscludes = [],
                                            selectedElements = [],
                                            previousLeaveAnimations = [],
                                            selectedScopes = [],
                                            spliceFactory = function (array, index) {
                                                return function (response) {
                                                    response !== !1 && array.splice(index, 1)
                                                }
                                            };
                                        scope.$watch(watchExpr, function (value) {
                                            for (var i, ii; previousLeaveAnimations.length;) $animate.cancel(previousLeaveAnimations.pop());
                                            for (i = 0, ii = selectedScopes.length; i < ii; ++i) {
                                                var selected = getBlockNodes(selectedElements[i].clone);
                                                selectedScopes[i].$destroy();
                                                var runner = previousLeaveAnimations[i] = $animate.leave(selected);
                                                runner.done(spliceFactory(previousLeaveAnimations, i))
                                            }
                                            selectedElements.length = 0, selectedScopes.length = 0, (selectedTranscludes = ngSwitchController.cases["!" + value] || ngSwitchController.cases["?"]) && forEach(selectedTranscludes, function (selectedTransclude) {
                                                selectedTransclude.transclude(function (caseElement, selectedScope) {
                                                    selectedScopes.push(selectedScope);
                                                    var anchor = selectedTransclude.element;
                                                    caseElement[caseElement.length++] = $compile.$$createComment("end ngSwitchWhen");
                                                    var block = {
                                                        clone: caseElement
                                                    };
                                                    selectedElements.push(block), $animate.enter(caseElement, anchor.parent(), anchor)
                                                })
                                            })
                                        })
                                    }
                                }
                            }],
                            ngSwitchWhenDirective = ngDirective({
                                transclude: "element",
                                priority: 1200,
                                require: "^ngSwitch",
                                multiElement: !0,
                                link: function (scope, element, attrs, ctrl, $transclude) {
                                    var cases = attrs.ngSwitchWhen.split(attrs.ngSwitchWhenSeparator).sort().filter(function (element, index, array) {
                                        return array[index - 1] !== element
                                    });
                                    forEach(cases, function (whenCase) {
                                        ctrl.cases["!" + whenCase] = ctrl.cases["!" + whenCase] || [], ctrl.cases["!" + whenCase].push({
                                            transclude: $transclude,
                                            element: element
                                        })
                                    })
                                }
                            }),
                            ngSwitchDefaultDirective = ngDirective({
                                transclude: "element",
                                priority: 1200,
                                require: "^ngSwitch",
                                multiElement: !0,
                                link: function (scope, element, attr, ctrl, $transclude) {
                                    ctrl.cases["?"] = ctrl.cases["?"] || [], ctrl.cases["?"].push({
                                        transclude: $transclude,
                                        element: element
                                    })
                                }
                            }),
                            ngTranscludeMinErr = minErr("ngTransclude"),
                            ngTranscludeDirective = ["$compile", function ($compile) {
                                return {
                                    restrict: "EAC",
                                    terminal: !0,
                                    compile: function (tElement) {
                                        var fallbackLinkFn = $compile(tElement.contents());
                                        return tElement.empty(),
                                            function ($scope, $element, $attrs, controller, $transclude) {
                                                function ngTranscludeCloneAttachFn(clone, transcludedScope) {
                                                    clone.length && notWhitespace(clone) ? $element.append(clone) : (useFallbackContent(), transcludedScope.$destroy())
                                                }

                                                function useFallbackContent() {
                                                    fallbackLinkFn($scope, function (clone) {
                                                        $element.append(clone)
                                                    })
                                                }

                                                function notWhitespace(nodes) {
                                                    for (var i = 0, ii = nodes.length; i < ii; i++) {
                                                        var node = nodes[i];
                                                        if (node.nodeType !== NODE_TYPE_TEXT || node.nodeValue.trim()) return !0
                                                    }
                                                }
                                                if (!$transclude) throw ngTranscludeMinErr("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", startingTag($element));
                                                $attrs.ngTransclude === $attrs.$attr.ngTransclude && ($attrs.ngTransclude = "");
                                                var slotName = $attrs.ngTransclude || $attrs.ngTranscludeSlot;
                                                $transclude(ngTranscludeCloneAttachFn, null, slotName), slotName && !$transclude.isSlotFilled(slotName) && useFallbackContent()
                                            }
                                    }
                                }
                            }],
                            scriptDirective = ["$templateCache", function ($templateCache) {
                                return {
                                    restrict: "E",
                                    terminal: !0,
                                    compile: function (element, attr) {
                                        if ("text/ng-template" === attr.type) {
                                            var templateUrl = attr.id,
                                                text = element[0].text;
                                            $templateCache.put(templateUrl, text)
                                        }
                                    }
                                }
                            }],
                            noopNgModelController = {
                                $setViewValue: noop,
                                $render: noop
                            },
                            SelectController = ["$element", "$scope", function ($element, $scope) {
                                function scheduleRender() {
                                    renderScheduled || (renderScheduled = !0, $scope.$$postDigest(function () {
                                        renderScheduled = !1, self.ngModelCtrl.$render()
                                    }))
                                }

                                function scheduleViewValueUpdate(renderAfter) {
                                    updateScheduled || (updateScheduled = !0, $scope.$$postDigest(function () {
                                        $scope.$$destroyed || (updateScheduled = !1, self.ngModelCtrl.$setViewValue(self.readValue()), renderAfter && self.ngModelCtrl.$render());
                                    }))
                                }

                                function setOptionAsSelected(optionEl) {
                                    optionEl.prop("selected", !0), optionEl.attr("selected", !0)
                                }
                                var self = this,
                                    optionsMap = new NgMap;
                                self.selectValueMap = {}, self.ngModelCtrl = noopNgModelController, self.multiple = !1, self.unknownOption = jqLite(window.document.createElement("option")), self.hasEmptyOption = !1, self.emptyOption = void 0, self.renderUnknownOption = function (val) {
                                    var unknownVal = self.generateUnknownOptionValue(val);
                                    self.unknownOption.val(unknownVal), $element.prepend(self.unknownOption), setOptionAsSelected(self.unknownOption), $element.val(unknownVal)
                                }, self.updateUnknownOption = function (val) {
                                    var unknownVal = self.generateUnknownOptionValue(val);
                                    self.unknownOption.val(unknownVal), setOptionAsSelected(self.unknownOption), $element.val(unknownVal)
                                }, self.generateUnknownOptionValue = function (val) {
                                    return "? " + hashKey(val) + " ?"
                                }, self.removeUnknownOption = function () {
                                    self.unknownOption.parent() && self.unknownOption.remove()
                                }, self.selectEmptyOption = function () {
                                    self.emptyOption && ($element.val(""), setOptionAsSelected(self.emptyOption))
                                }, self.unselectEmptyOption = function () {
                                    self.hasEmptyOption && self.emptyOption.removeAttr("selected")
                                }, $scope.$on("$destroy", function () {
                                    self.renderUnknownOption = noop
                                }), self.readValue = function () {
                                    var val = $element.val(),
                                        realVal = val in self.selectValueMap ? self.selectValueMap[val] : val;
                                    return self.hasOption(realVal) ? realVal : null
                                }, self.writeValue = function (value) {
                                    var currentlySelectedOption = $element[0].options[$element[0].selectedIndex];
                                    if (currentlySelectedOption && currentlySelectedOption.removeAttribute("selected"), self.hasOption(value)) {
                                        self.removeUnknownOption();
                                        var hashedVal = hashKey(value);
                                        $element.val(hashedVal in self.selectValueMap ? hashedVal : value);
                                        var selectedOption = $element[0].options[$element[0].selectedIndex];
                                        setOptionAsSelected(jqLite(selectedOption))
                                    } else null == value && self.emptyOption ? (self.removeUnknownOption(), self.selectEmptyOption()) : self.unknownOption.parent().length ? self.updateUnknownOption(value) : self.renderUnknownOption(value)
                                }, self.addOption = function (value, element) {
                                    if (element[0].nodeType !== NODE_TYPE_COMMENT) {
                                        assertNotHasOwnProperty(value, '"option value"'), "" === value && (self.hasEmptyOption = !0, self.emptyOption = element);
                                        var count = optionsMap.get(value) || 0;
                                        optionsMap.set(value, count + 1), scheduleRender()
                                    }
                                }, self.removeOption = function (value) {
                                    var count = optionsMap.get(value);
                                    count && (1 === count ? (optionsMap["delete"](value), "" === value && (self.hasEmptyOption = !1, self.emptyOption = void 0)) : optionsMap.set(value, count - 1))
                                }, self.hasOption = function (value) {
                                    return !!optionsMap.get(value)
                                };
                                var renderScheduled = !1,
                                    updateScheduled = !1;
                                self.registerOption = function (optionScope, optionElement, optionAttrs, interpolateValueFn, interpolateTextFn) {
                                    if (optionAttrs.$attr.ngValue) {
                                        var oldVal, hashedVal = NaN;
                                        optionAttrs.$observe("value", function (newVal) {
                                            var removal, previouslySelected = optionElement.prop("selected");
                                            isDefined(hashedVal) && (self.removeOption(oldVal), delete self.selectValueMap[hashedVal], removal = !0), hashedVal = hashKey(newVal), oldVal = newVal, self.selectValueMap[hashedVal] = newVal, self.addOption(newVal, optionElement), optionElement.attr("value", hashedVal), removal && previouslySelected && scheduleViewValueUpdate()
                                        })
                                    } else interpolateValueFn ? optionAttrs.$observe("value", function (newVal) {
                                        self.readValue();
                                        var removal, previouslySelected = optionElement.prop("selected");
                                        isDefined(oldVal) && (self.removeOption(oldVal), removal = !0), oldVal = newVal, self.addOption(newVal, optionElement), removal && previouslySelected && scheduleViewValueUpdate()
                                    }) : interpolateTextFn ? optionScope.$watch(interpolateTextFn, function (newVal, oldVal) {
                                        optionAttrs.$set("value", newVal);
                                        var previouslySelected = optionElement.prop("selected");
                                        oldVal !== newVal && self.removeOption(oldVal), self.addOption(newVal, optionElement), oldVal && previouslySelected && scheduleViewValueUpdate()
                                    }) : self.addOption(optionAttrs.value, optionElement);
                                    optionAttrs.$observe("disabled", function (newVal) {
                                        ("true" === newVal || newVal && optionElement.prop("selected")) && (self.multiple ? scheduleViewValueUpdate(!0) : (self.ngModelCtrl.$setViewValue(null), self.ngModelCtrl.$render()))
                                    }), optionElement.on("$destroy", function () {
                                        var currentValue = self.readValue(),
                                            removeValue = optionAttrs.value;
                                        self.removeOption(removeValue), scheduleRender(), (self.multiple && currentValue && currentValue.indexOf(removeValue) !== -1 || currentValue === removeValue) && scheduleViewValueUpdate(!0)
                                    })
                                }
                            }],
                            selectDirective = function () {
                                function selectPreLink(scope, element, attr, ctrls) {
                                    var selectCtrl = ctrls[0],
                                        ngModelCtrl = ctrls[1];
                                    if (!ngModelCtrl) return void(selectCtrl.registerOption = noop);
                                    if (selectCtrl.ngModelCtrl = ngModelCtrl, element.on("change", function () {
                                            selectCtrl.removeUnknownOption(), scope.$apply(function () {
                                                ngModelCtrl.$setViewValue(selectCtrl.readValue())
                                            })
                                        }), attr.multiple) {
                                        selectCtrl.multiple = !0, selectCtrl.readValue = function () {
                                            var array = [];
                                            return forEach(element.find("option"), function (option) {
                                                if (option.selected && !option.disabled) {
                                                    var val = option.value;
                                                    array.push(val in selectCtrl.selectValueMap ? selectCtrl.selectValueMap[val] : val)
                                                }
                                            }), array
                                        }, selectCtrl.writeValue = function (value) {
                                            forEach(element.find("option"), function (option) {
                                                option.selected = !!value && (includes(value, option.value) || includes(value, selectCtrl.selectValueMap[option.value]))
                                            })
                                        };
                                        var lastView, lastViewRef = NaN;
                                        scope.$watch(function () {
                                            lastViewRef !== ngModelCtrl.$viewValue || equals(lastView, ngModelCtrl.$viewValue) || (lastView = shallowCopy(ngModelCtrl.$viewValue), ngModelCtrl.$render()), lastViewRef = ngModelCtrl.$viewValue
                                        }), ngModelCtrl.$isEmpty = function (value) {
                                            return !value || 0 === value.length
                                        }
                                    }
                                }

                                function selectPostLink(scope, element, attrs, ctrls) {
                                    var ngModelCtrl = ctrls[1];
                                    if (ngModelCtrl) {
                                        var selectCtrl = ctrls[0];
                                        ngModelCtrl.$render = function () {
                                            selectCtrl.writeValue(ngModelCtrl.$viewValue)
                                        }
                                    }
                                }
                                return {
                                    restrict: "E",
                                    require: ["select", "?ngModel"],
                                    controller: SelectController,
                                    priority: 1,
                                    link: {
                                        pre: selectPreLink,
                                        post: selectPostLink
                                    }
                                }
                            },
                            optionDirective = ["$interpolate", function ($interpolate) {
                                return {
                                    restrict: "E",
                                    priority: 100,
                                    compile: function (element, attr) {
                                        var interpolateValueFn, interpolateTextFn;
                                        return isDefined(attr.ngValue) || (isDefined(attr.value) ? interpolateValueFn = $interpolate(attr.value, !0) : (interpolateTextFn = $interpolate(element.text(), !0), interpolateTextFn || attr.$set("value", element.text()))),
                                            function (scope, element, attr) {
                                                var selectCtrlName = "$selectController",
                                                    parent = element.parent(),
                                                    selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
                                                selectCtrl && selectCtrl.registerOption(scope, element, attr, interpolateValueFn, interpolateTextFn)
                                            }
                                    }
                                }
                            }],
                            requiredDirective = function () {
                                return {
                                    restrict: "A",
                                    require: "?ngModel",
                                    link: function (scope, elm, attr, ctrl) {
                                        ctrl && (attr.required = !0, ctrl.$validators.required = function (modelValue, viewValue) {
                                            return !attr.required || !ctrl.$isEmpty(viewValue)
                                        }, attr.$observe("required", function () {
                                            ctrl.$validate()
                                        }))
                                    }
                                }
                            },
                            patternDirective = function () {
                                return {
                                    restrict: "A",
                                    require: "?ngModel",
                                    link: function (scope, elm, attr, ctrl) {
                                        if (ctrl) {
                                            var regexp, patternExp = attr.ngPattern || attr.pattern;
                                            attr.$observe("pattern", function (regex) {
                                                if (isString(regex) && regex.length > 0 && (regex = new RegExp("^" + regex + "$")), regex && !regex.test) throw minErr("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", patternExp, regex, startingTag(elm));
                                                regexp = regex || void 0, ctrl.$validate()
                                            }), ctrl.$validators.pattern = function (modelValue, viewValue) {
                                                return ctrl.$isEmpty(viewValue) || isUndefined(regexp) || regexp.test(viewValue)
                                            }
                                        }
                                    }
                                }
                            },
                            maxlengthDirective = function () {
                                return {
                                    restrict: "A",
                                    require: "?ngModel",
                                    link: function (scope, elm, attr, ctrl) {
                                        if (ctrl) {
                                            var maxlength = -1;
                                            attr.$observe("maxlength", function (value) {
                                                var intVal = toInt(value);
                                                maxlength = isNumberNaN(intVal) ? -1 : intVal, ctrl.$validate()
                                            }), ctrl.$validators.maxlength = function (modelValue, viewValue) {
                                                return maxlength < 0 || ctrl.$isEmpty(viewValue) || viewValue.length <= maxlength
                                            }
                                        }
                                    }
                                }
                            },
                            minlengthDirective = function () {
                                return {
                                    restrict: "A",
                                    require: "?ngModel",
                                    link: function (scope, elm, attr, ctrl) {
                                        if (ctrl) {
                                            var minlength = 0;
                                            attr.$observe("minlength", function (value) {
                                                minlength = toInt(value) || 0, ctrl.$validate()
                                            }), ctrl.$validators.minlength = function (modelValue, viewValue) {
                                                return ctrl.$isEmpty(viewValue) || viewValue.length >= minlength
                                            }
                                        }
                                    }
                                }
                            };
                        return window.angular.bootstrap ? void(window.console && console.log("WARNING: Tried to load angular more than once.")) : (bindJQuery(), publishExternalAPI(angular), angular.module("ngLocale", [], ["$provide", function ($provide) {
                            function getDecimals(n) {
                                n += "";
                                var i = n.indexOf(".");
                                return i == -1 ? 0 : n.length - i - 1
                            }

                            function getVF(n, opt_precision) {
                                var v = opt_precision;
                                void 0 === v && (v = Math.min(getDecimals(n), 3));
                                var base = Math.pow(10, v),
                                    f = (n * base | 0) % base;
                                return {
                                    v: v,
                                    f: f
                                }
                            }
                            var PLURAL_CATEGORY = {
                                ZERO: "zero",
                                ONE: "one",
                                TWO: "two",
                                FEW: "few",
                                MANY: "many",
                                OTHER: "other"
                            };
                            $provide.value("$locale", {
                                DATETIME_FORMATS: {
                                    AMPMS: ["AM", "PM"],
                                    DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                    ERANAMES: ["Before Christ", "Anno Domini"],
                                    ERAS: ["BC", "AD"],
                                    FIRSTDAYOFWEEK: 6,
                                    MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                    SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                    STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    WEEKENDRANGE: [5, 6],
                                    fullDate: "EEEE, MMMM d, y",
                                    longDate: "MMMM d, y",
                                    medium: "MMM d, y h:mm:ss a",
                                    mediumDate: "MMM d, y",
                                    mediumTime: "h:mm:ss a",
                                    "short": "M/d/yy h:mm a",
                                    shortDate: "M/d/yy",
                                    shortTime: "h:mm a"
                                },
                                NUMBER_FORMATS: {
                                    CURRENCY_SYM: "$",
                                    DECIMAL_SEP: ".",
                                    GROUP_SEP: ",",
                                    PATTERNS: [{
                                        gSize: 3,
                                        lgSize: 3,
                                        maxFrac: 3,
                                        minFrac: 0,
                                        minInt: 1,
                                        negPre: "-",
                                        negSuf: "",
                                        posPre: "",
                                        posSuf: ""
                                    }, {
                                        gSize: 3,
                                        lgSize: 3,
                                        maxFrac: 2,
                                        minFrac: 2,
                                        minInt: 1,
                                        negPre: "-¤",
                                        negSuf: "",
                                        posPre: "¤",
                                        posSuf: ""
                                    }]
                                },
                                id: "en-us",
                                localeID: "en_US",
                                pluralCat: function (n, opt_precision) {
                                    var i = 0 | n,
                                        vf = getVF(n, opt_precision);
                                    return 1 == i && 0 == vf.v ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER
                                }
                            })
                        }]), void jqLite(function () {
                            angularInit(window.document, bootstrap)
                        }))
                    }(window), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>')
                }, {}],
                26: [function (require, module, exports) {
                    require("./angular"), module.exports = angular
                }, {
                    "./angular": 25
                }],
                27: [function (require, module, exports) {
                    var throttle = require("./throttle");
                    module.exports = function (delay, atBegin, callback) {
                        return void 0 === callback ? throttle(delay, atBegin, !1) : throttle(delay, callback, atBegin !== !1)
                    }
                }, {
                    "./throttle": 28
                }],
                28: [function (require, module, exports) {
                    module.exports = function (delay, noTrailing, callback, debounceMode) {
                        function wrapper() {
                            function exec() {
                                lastExec = Number(new Date), callback.apply(self, args)
                            }

                            function clear() {
                                timeoutID = void 0
                            }
                            var self = this,
                                elapsed = Number(new Date) - lastExec,
                                args = arguments;
                            debounceMode && !timeoutID && exec(), timeoutID && clearTimeout(timeoutID), void 0 === debounceMode && elapsed > delay ? exec() : noTrailing !== !0 && (timeoutID = setTimeout(debounceMode ? clear : exec, void 0 === debounceMode ? delay - elapsed : delay))
                        }
                        var timeoutID, lastExec = 0;
                        return "boolean" != typeof noTrailing && (debounceMode = callback, callback = noTrailing, noTrailing = void 0), wrapper
                    }
                }, {}]
            }, {}, [2]);
        }, 1000);
    }
}