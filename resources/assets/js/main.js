$(function() {
    $('#showcase-slider').slick({
        slidesToShow: 1,
        appendArrows: '.slick-arrows',
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        dots: false
	      }
	    }
  	]
    });

    $('.slider').slick({
        responsive: [
        {
            breakpoint: 5000,
            settings: "unslick"
        },
        {
          breakpoint: 960,
          settings: {
            dots: true,
            arrows: false,
            slidesToShow: 3,
            infinite: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: false,
            // centerMode: true,
            slidesToShow: 1,
            infinite: false
          }
        }
    ]
    });

    // Set height for figures inside slider

    var setFigureHeights = function() {
      if (window.matchMedia("(max-width: 960px)").matches) {
        var figureHeight = 0;
        var $sliders = $('.slider');

        $sliders.each(function(index, item) {

          var $figures = $(item).find('.figures-list_item');

          $figures.each(function(index, item) {
            if ($(item).height() > figureHeight) {
              figureHeight = $(item).height();
            }
          });

          $figures.css('height', figureHeight);
        });
      }
    }

    $(window).on('resize orientationchange', function() {
      // force enable/disable slick on window resize
      $('.slider').slick('resize');

      setFigureHeights();
    });

    $('.selectpicker').selectpicker({
      dropupAuto: false,
      size: 3
    });

    $('.fancy').fancybox({
      padding: 0,
      beforeShow : function(){
       this.title =  $(this.element).data("caption");
      },
      helpers: {
            buttons: {},
            thumbs: {
                width: 20,
                height: 20,
                source: function () {
                    return "";
                }
            }
        }
    });

    // keep the Fancybox thumbnails from moving around if not needed
    $.fancybox.helpers.thumbs.onUpdate_backup = $.fancybox.helpers.thumbs.onUpdate;
    $.fancybox.helpers.thumbs.onUpdate = function(opts, obj) {
        if (this.list) {
            var thumbs_total_width = (opts.width + 4) * obj.group.length;
            if(thumbs_total_width > $(window).width())
                $.fancybox.helpers.thumbs.onUpdate_backup(opts, obj);
            else {
                this.list.stop(true).animate({
                    'left': Math.floor($(window).width() * 0.5 - (thumbs_total_width * 0.5))
                }, 150);
            }
        }
    };


    // Main nav

    var $mainNav = $('#main-nav');

    $('.main-nav-toggler').click(function() {
        $mainNav.addClass('opened');
        $('body').addClass('main-nav-opened');
    });

    $('.main-nav-close').click(function() {
        $('body').removeClass('main-nav-opened');
        $mainNav.removeClass('opened');
    });

    // Header search

    $('.search-togler').click(function() {
      $('#header-search').addClass('expand');

      setTimeout(function() {

        $('.header-search-input').focus();

        $(document).one('click', function(event) {
          if (!$(event.target).closest('#header-search').length) {
            $('#header-search').removeClass('expand');
          }
        });
      }, 700);
    });

    $('#font-menu button').each(function(index, item) {

      $(item).click(function() {

        var fontSize = $(this).css('font-size');

        $('body').css('font-size', fontSize);

      });
    });

    if (window.matchMedia("(min-width: 960px)").matches) {
      $(window).on('scroll', function() {

       if ($(window).scrollTop() > 100) {
        $('#fixed-header').show();
       } else {
        $('#fixed-header').hide();
       }
      });
    }

    setFigureHeights();
});