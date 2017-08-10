$(document).ready(function(event) {
    $("#phone-button-menu").click(function(event){
        $(this).parent(".phone-middle-header").next().toggleClass("phone-display-none");
        $(this).parent(".phone-middle-header").next().next().toggleClass("phone-display-none");
        $(this).parent(".phone-middle-header").toggleClass("phone-menu_style");
        $(this).parent(".phone-middle-header").next().children(".header-menu-item").children(".header-menu-link").toggleClass("markers-link");
        $(this).parent(".phone-middle-header").next().children("#markers").children(".header-menu-link").children(".header-menu-link__text").toggleClass("markers-link_black");
        $(this).toggleClass("phone-button_style");
        $(this).toggleClass("phone-border-none");
        $(this).next().toggleClass("phone-button_style");
        $(this).next().children(".phone-search-button").toggleClass("phone-search-button_active");
        if ($(this).parent(".phone-middle-header").next().is(':visible')){
            $(this).children(".phone-button__text").html('Закрити');
        }else{
            $(this).children(".phone-button__text").html('Меню');
        }
    });

    $(".filter-button").click(function(event){
        $(this).parent(".col-lg-9").next().children(".filter-block").toggleClass("phone-tablet_none");
        if ($(this).parent(".col-lg-9").next().children(".filter-block").is(':visible')){
            $(this).html('<i class="fa fa-times fa-lg color_white"></i>');
        }else{
            $(this).html('<i class="fa fa-filter fa-lg color_white"></i>');
        }
    });


    if ($('.img-slider').length){
        $('.img-slider').slick({
            centerMode: true,
            centerPadding: '10%',
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '10%',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '10%',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

});