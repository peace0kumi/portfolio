;(function ( $, win, doc, undefined ) {
    'use strict'

    var __LIBRARY;

    if ('undefined' === typeof win.uilabLibrary) {
        win.uilabLibrary = {};
    }

    __LIBRARY = win.uilabLibrary;

    // Tab
    ;(function(__LIBRARY){
        var COMP;
        var pluginName = 'tab';
        var defaults = {
            mode: 'static', // static, fade
            speed: 1000,
            event : 'click', // 'focusin'
            tab : '[data-js=tab__anchor]',
            panel : '[data-js=tab__panel]',
            activeClassName : 'is-active',
            disabledName : 'is-disabled'
        };

        function Plugin ( element, options ) {
            this.element = element;
            this._name = pluginName;
            this._defaults = defaults;
            this.options = $.extend( {}, this._defaults, options );
            this.flag = false;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {

            init: function () {
                this.buildCache();
                this.bindEvents();
            },

            destroy: function() {
                this.unbindEvents();
                this.$element.removeData();
            },

            buildCache: function () {
                this.$element = $(this.element);
                this.$tab = this.$element.find(this.options.tab);
                this.$panel = this.$element.find(this.options.panel);
            },

            bindEvents: function() {
                var plugin = this;
                var eventName = (function(){
                    var events = plugin.options.event;
                    if( events === 'focusin' ){
                        return 'focusin.'+plugin._name+' mouseenter.'+plugin._name;
                    } else if( events === 'click') {
                        return 'click.'+plugin._name+' keydown.'+plugin._name;
                    }
                    return events+'.'+plugin._name;
                })();

                plugin.$tab.on( eventName, function(e) {
                    e.stopPropagation();

                    var $this = $(this);

                    if ( $this.hasClass( plugin.options.activeClassName ) || $this.hasClass( plugin.options.disabledName ) ){ return; }

                    var ky = e.which;

                    if( e.type === 'click' || e.type === 'focusin' ){
                        e.preventDefault();
                        plugin.hide( this );
                        plugin.show( this );
                    }

                });
            },

            unbindEvents: function() {
                var plugin = this;

                plugin.$element.off('.'+plugin._name);
            },

            show: function( _target ) {
                var plugin = this,
                    $anchor = $( _target );

                    $anchor
                    .addClass( plugin.options.activeClassName )
                    .attr({
                        'aria-selected' : true
                    });

                plugin.flag = true;

                var $panel = $($anchor.attr('href'));

                if (plugin.options.mode === 'fade') {
                    $panel.stop().fadeIn();
                } else {
                    $panel.stop().show();
                }

            },

            hide: function( _except ) {
                var plugin = this;

                plugin.$tab.not( _except ).each(function(){
                    var $anchor = $(this);
                        $anchor
                        .removeClass( plugin.options.activeClassName )
                        .attr({
                            'aria-selected' : false
                        });

                    plugin.flag = false;

                    var $panel = $($anchor.attr('href'));

                    if (plugin.options.mode === 'fade') {
                        $panel.stop().hide();
                    } else {
                        $panel.stop().hide();
                    }

                });
            }

        });

        if('undefined' === typeof __LIBRARY[ pluginName ] ) {
            __LIBRARY[ pluginName ] = {};
        }

        COMP = __LIBRARY[ pluginName ];

        COMP.init = function( $els, options ) {
            $els.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

        $(function(){
            $('[data-js="tab"]').each(function(){
                COMP.init( $(this), $(this).data('Options') );
            });
        });
    })(__LIBRARY);

    // Modal
    ;(function(__LIBRARY){
        var COMP;
        var pluginName = 'modal';

        if('undefined' === typeof __LIBRARY[ pluginName ] ) {
            __LIBRARY[ pluginName ] = {};
        }

        COMP = __LIBRARY[ pluginName ];

        COMP.init = function( $els, options ) {
            $els.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, $('[data-remodal-id=modal]').remodal(options) );
                }
            });
        }

        $(function(){
            $('[data-remodal-id=modal]').each(function(){
                COMP.init( $(this), $(this).data('Options') );
            });
        });
    })(__LIBRARY);

    // Accordion
    ;(function(__LIBRARY){
        var COMP;
        var pluginName = 'accordion';
        var defaults = {
            mode : 'slide', //slide
            toggle : true,
            speed: 300,
            anchor: '[data-js=accordion__anchor]',
            panel: '[data-js=accordion__panel]',
            activeClass: 'is-active',
            firstItemOpen: true
        };

        function Plugin( element, options ) {
            this.element = element;
            this._defaults = defaults;
            this.options = $.extend( {}, this._defaults, options );
            this.init();
        }

        $.extend( Plugin.prototype, {
            init: function () {
                this.buildCache();
                this.bindEvents();
                this.options.firstItemOpen ? this.open(this.$firstAnchor) : null;
            },
            buildCache: function() {
                this.$element = $(this.element);
                this.$anchor = this.$element.find(this.options.anchor);
                this.$panel = this.$element.find(this.options.panel);
                this.$firstAnchor = this.$anchor.eq(0);
            },
            bindEvents: function() {
                var plugin = this;

                plugin.$anchor.on('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    plugin.options.toggle ? plugin.toggle( $(this) ) : plugin.static( $(this) );
                })
            },
            open: function( _target, _toggle ) {
                var plugin = this;

                var $anchor = _target,
                    $panel = $($anchor.data('target'));

                plugin.changeStatus( $anchor, true );
                plugin.options.mode === 'static' ? $panel.show() : $panel.stop().slideDown(plugin.options.speed);
            },
            close: function( _target, _toggle ) {
                var plugin = this;
                var $anchor = $(_target),
                    $panel = _toggle ? $($anchor.data('target')) : plugin.$panel;

                plugin.changeStatus( $anchor, false );
                plugin.options.mode === 'static' ? $panel.hide() : $panel.stop().slideUp(plugin.options.speed);
            },
            toggle: function( _target ) {
                var plugin = this;

                $(_target).data('isOpen') ? plugin.close( _target, true ) : plugin.open( _target, true );
            },
            static: function( _target ) {
                var plugin = this;

                plugin.close( _target );
                plugin.open( _target );
            },
            changeStatus: function( anchor, isOpen ) {
                var plugin = this;

                if ( !plugin.options.toggle ) {
                    plugin.$anchor.data('isOpen', false).attr('aria-expanded', false);
                }

                anchor.data('isOpen', isOpen).attr('aria-expanded', isOpen);
            }
        });

        if('undefined' === typeof __LIBRARY[ pluginName ] ) {
            __LIBRARY[ pluginName ] = {};
        }

        COMP = __LIBRARY[ pluginName ];

        COMP.init = function( $els, options ) {
            $els.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

        $(function(){
            $('[data-js="accordion"]').each(function(){
                COMP.init( $(this), $(this).data('options') );
            });
        });
    })(__LIBRARY);

    // Dropdown
    ;(function(__LIBRARY){
        var COMP;
        var pluginName = 'dropdown';
        var defaults = {
            mode : 'slide', //static, slide
            speed: 300,
            anchor: '[data-js=dropdown__anchor]',
            panel: '[data-js=dropdown__panel]',
            item: '[data-js=dropdown__item]',
            activeClass: 'is-active'
        };

        function Plugin( element, options ) {
            this.element = element;
            this._name = pluginName;
            this._defaults = defaults;
            this.options = $.extend( {}, this._defaults, options );
            this.isOpen = false;
            this.init();
        }

        $.extend( Plugin.prototype, {
            init: function () {
                this.buildCache();
                this.bindEvents();
            },
            buildCache: function() {
                this.$element = $(this.element);
                this.$anchor = this.$element.find(this.options.anchor);
                this.$panel = this.$element.find(this.options.panel);
                this.$item = this.$panel.find(this.options.item);
                this.$firstItem = this.$panel.find(this.options.item + ':first-child');
                this.$lastItem = this.$panel.find(this.options.item + ':last-child');
            },
            bindEvents: function() {
                var plugin = this;

                plugin.$anchor.on('click.' + plugin._name, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    plugin.toggle();
                });

                plugin.$anchor.on('keydown.' + plugin._name, function(e){
                    var key = e.keyCode;
                    e.stopPropagation();
                    if ( key === 40 && !plugin.isOpen || key === 13  && !plugin.isOpen ) {
                        e.preventDefault();
                        plugin.open(true);
                        plugin.$firstItem.focus();
                    } else if ( key === 38 && plugin.isOpen ) {
                        e.preventDefault();
                        plugin.close();
                    }
                });

                plugin.$item.on('click.' + plugin._name, function(e) {
                    var _self = $(this);

                    e.stopPropagation();
                    e.preventDefault();
                    plugin.$anchor.attr('aria-activedescendant', _self.attr('id'));
                    plugin.$anchor.text(_self.text());
                    plugin.close( true );
                });

                plugin.$item.on('keydown.' + plugin._name, function(e) {
                    var key = e.keyCode,
                        _self = $(this);

                    e.stopPropagation();
                    if ( key === 40 ) {
                        e.preventDefault();
                        _self.next().focus();
                    } else if ( key === 38 ) {
                        e.preventDefault();
                        _self.prev().focus();
                    }
                });

                plugin.$firstItem.on('keydown.' + plugin._name, function(e){
                    var key = e.keyCode;

                    if ( key === 9 && e.shiftKey ) {
                        e.stopPropagation();
                        e.preventDefault();
                        plugin.close( true );
                    }
                });

                plugin.$lastItem.on('keydown.' + plugin._name, function(e){
                    var key = e.keyCode;

                    if ( key === 9 && !e.shiftKey ) {
                        e.stopPropagation();
                        e.preventDefault();
                        plugin.close( true );
                    }
                });

                $(document).on('click.' + plugin._name, function(e){
                    var $panel = plugin.$panel;

                    if ( plugin.isOpen && !$panel.is(e.target) && $panel.has(e.target).length === 0 ){
                        e.stopPropagation();
                        e.preventDefault();
                        plugin.close();
                    }
                });
            },
            unbindEvents: function() {
                var plugin = this;

                plugin.$anchor.off('.' + plugin._name);
                plugin.$item.off('.' + plugin._name);
                plugin.$firstItem.off('.' + plugin._name);
                plugin.$lastItem.off('.' + plugin._name);
            },
            toggle: function() {
                var plugin = this;

                plugin.isOpen ? plugin.close() : plugin.open();
            },
            open: function() {
                var plugin = this,
                     option = plugin.options;

                plugin.changeStatus(true);

                if (option.mode === 'static') {
                    plugin.$panel.show();
                } else if (option.mode === 'slide') {
                    plugin.$panel.stop().slideDown(option.speed);
                }
            },
            close: function( isForce ) {
                var plugin = this,
                    option = plugin.options;

                plugin.changeStatus(false);
                if (option.mode === 'static') {
                    plugin.$panel.hide();
                } else if (option.mode === 'slide') {
                    plugin.$panel.stop().slideUp(option.speed);
                }

                if ( isForce ) {
                    plugin.$anchor.focus();
                }
            },
            changeStatus: function( isOpen ) {
                var plugin = this;

                plugin.isOpen = isOpen;
            }
        });

        if('undefined' === typeof __LIBRARY[ pluginName ] ) {
            __LIBRARY[ pluginName ] = {};
        }

        COMP = __LIBRARY[ pluginName ];

        COMP.init = function( $els, options ) {
            $els.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };

        $(function(){
            $('[data-js="dropdown"]').each(function(){
                COMP.init( $(this), $(this).data('options') );
            });
        });
    })(__LIBRARY);

})( jQuery, window, document );