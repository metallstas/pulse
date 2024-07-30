const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    navPosition: 'bottom',
    controls: false,
    nav: true,
    
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  $(function() {
  
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(className) {
      $(className).each(function(i){
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    }

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__back')

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation' ).fadeIn();
    })
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #order, #thanks' ).fadeOut('fast');
    })

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    })

    function validateForm(selector) {
      $(selector).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true,
          }
        },
  
        messages: {
            name: "Пожалуйста введите имя",
            phone: "Пожалуйста введите номер телефона",
            email: {
              required: "Пожалуйсиа введите почту",
              email: "Неправильно введен адрес почты"
            }
          }
      })
    }
    
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask("+375 (99) 999-99-99")

    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
    });

    $(window).scroll(function() {
      if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn()
      } else {
        $('.pageup').fadeOut()
      }
    })

    new WOW().init(); 

  });
