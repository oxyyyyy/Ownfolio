// ---------------------------------------------------------
// Progress bar animation
$(document).ready(function() {
    setTimeout(function() {
        $('.progress .progress-bar').css("width",
            function() {
                return $(this).attr("aria-valuenow") + "%";
            }
        )
    }, 1000);
});

// ---------------------------------------------------------
// Circle progress bar

$(document).ready(function() {
    setTimeout(function() {
        $('#circle').circleProgress({
            value: 0.8,
            size: 200,
            startAngle: -Math.PI / 2,
            thickness: 4,
            fill: "#23c6ec"
        });
    }, 500);
});

// ---------------------------------------------------------
// Smooth anchors + active menu item on scroll
// For the top-menu!

// Smooth anchors
$(document).ready(function() {
    $("#top-menu").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - $("nav").height();
        $('body,html').animate({
            scrollTop: top
        }, 750);
    });
});

// Highlight current menu item
$(document).ready(function() {
    // Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = $("nav").height() + 1,
        // All list items
        menuItems = $(".nav-link"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 200;
        // Removing dat fucking smooth anchor!
        // $('html, body').stop().animate({
        //     scrollTop: offsetTop
        // }, 1000);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 200;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .removeClass("active_link")
                .filter("[href='#" + id + "']").addClass("active_link");
        }
    });
});

// ---------------------------------------------------------
// Smooth anchors + active menu item on scroll
// For the left-menu!

// Smooth anchors
$(document).ready(function() {
    $("#left-menu").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - $("nav").height();
        $('body,html').animate({
            scrollTop: top
        }, 750);
    });
});

// Highlight current menu item
$(document).ready(function() {
    // Cache selectors
    var lastId,
        topMenu = $("#left-menu"),
        topMenuHeight = $("nav").height() + 1,
        // All list items
        menuItems = $(".nav__item"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 200;
        // Removing dat fucking smooth anchor!
        // $('html, body').stop().animate({
        //     scrollTop: offsetTop
        // }, 1000);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 200;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .removeClass("nav__item--current")
                .filter("[href='#" + id + "']").addClass("nav__item--current");
        }
    });
});

// ---------------------------------------------------------
// WOW.js init

new WOW().init();

// ---------------------------------------------------------
// Mansory grid (codedrops)

(function() {
    var support = {
            transitions: Modernizr.csstransitions
        },
        // transition end event name
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        onEndTransition = function(el, callback) {
            var onEndCallbackFn = function(ev) {
                if (support.transitions) {
                    if (ev.target != this) return;
                    this.removeEventListener(transEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') {
                    callback.call(this);
                }
            };
            if (support.transitions) {
                el.addEventListener(transEndEventName, onEndCallbackFn);
            } else {
                onEndCallbackFn();
            }
        };

    new GridFx(document.querySelector('.grid'), {
        imgPosition: {
            x: -0.5,
            y: 1
        },
        onOpenItem: function(instance, item) {
            instance.items.forEach(function(el) {
                if (item != el) {
                    var delay = Math.floor(Math.random() * 50);
                    el.style.WebkitTransition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
                    el.style.transition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
                    el.style.WebkitTransform = 'scale3d(0.1,0.1,1)';
                    el.style.transform = 'scale3d(0.1,0.1,1)';
                    el.style.opacity = 0;
                }
            });
        },
        onCloseItem: function(instance, item) {
            instance.items.forEach(function(el) {
                if (item != el) {
                    el.style.WebkitTransition = 'opacity .4s, -webkit-transform .4s';
                    el.style.transition = 'opacity .4s, transform .4s';
                    el.style.WebkitTransform = 'scale3d(1,1,1)';
                    el.style.transform = 'scale3d(1,1,1)';
                    el.style.opacity = 1;

                    onEndTransition(el, function() {
                        el.style.transition = 'none';
                        el.style.WebkitTransform = 'none';
                    });
                }
            });
        }
    });
})();

// ---------------------------------------------------------
// Smooth scroll for "Look portfolio" btn

$(function() {
    $('#look_portfolio_btn').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// ---------------------------------------------------------
$('.nav-link').click(function() {
    $('#navbarSupportedContent').removeClass('show');
});

// ---------------------------------------------------------
// Ajax footer contact form

$(document).ready(function() {

    var form = $('#contact_form');
    var formStatus = $('#contact_form_submit');

    $(form).submit(function(event) {

        event.preventDefault();

        var formData = $(form).serialize();

        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
                beforeSend: function() {
                    $(formStatus).html('<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>');
                }
            })

            .done(function(response) {
                // Make sure that the formStatus div has the 'success' class.
                $(formStatus).removeClass('error bounceIn');
                $(formStatus).addClass('success bounceIn');

                // Set the message text.
                $(formStatus).text(response);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            })

            .fail(function(data) {
                // Make sure that the formStatus div has the 'error' class.
                $(formStatus).removeClass('success bounceIn');
                $(formStatus).addClass('error bounceIn');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formStatus).text(data.responseText);
                } else {
                    $(formStatus).text('Error.');
                }
            });

    });

});

// ---------------------------------------------------------
// Ajax modal form

$(document).ready(function() {

    var form = $('#modal_form');
    var formStatus = $('#modal_form_submit');

    $(form).submit(function(event) {

        event.preventDefault();

        var formData = $(form).serialize();

        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
                beforeSend: function() {
                    $(formStatus).html('<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>');
                }
            })

            .done(function(response) {
                // Make sure that the formStatus div has the 'success' class.
                $(formStatus).removeClass('error bounceIn');
                $(formStatus).addClass('success bounceIn');

                // Set the message text.
                $(formStatus).text(response);

                // Clear the form.
                $('#name2').val('');
                $('#tel').val('');
            })

            .fail(function(data) {
                // Make sure that the formStatus div has the 'error' class.
                $(formStatus).removeClass('success bounceIn');
                $(formStatus).addClass('error bounceIn');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formStatus).text(data.responseText);
                } else {
                    $(formStatus).text('Error.');
                }
            });

    });

});
