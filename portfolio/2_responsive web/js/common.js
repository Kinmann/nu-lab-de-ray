
// HEADER COLOUR TRANSFORMATION BY SCROLLING
$(function() {
    var scroll_pos = 0;
    $(window).scroll(function () {

        scroll_pos = $(this).scrollTop();

        if (scroll_pos > 100) {
            $("header").css("background-color", "black")
        } else {
            $("header").css("background-color", "transparent")
        }
    });
});




//WIDGET CONTROL

//WIDGET CLOSES WHEN WINDOW RESIZES
$(function() {
    $(window).resize(function () {
        $(".nav_widget_curtain").hide();
        if (window.innerWidth > 1249) {
            $(".nav_widget").css("right", "-20%");
            $(".nav_widget").css("left", '');
        } else {
            $(".nav_widget").css("left", "-30%");
            $(".nav_widget").css("right", '');
        }
    });

    //WIDGET OPENS
    $(".icon_menu").click(function () {
        $(".nav_widget_curtain").fadeIn();
        $(".nav_widget").show();
        if (window.innerWidth > 1249) {
            $(".nav_widget").animate({
                right: 0
            });
        } else {
            $(".nav_widget").animate({
                left: 0
            });
        }

    });
    
    //WIDGET CLOSES
    $(".widget_close").click(function () {
        $(".nav_widget_curtain").fadeOut();
        if (window.innerWidth > 1249) {
            $(".nav_widget").animate({
                right: '-20%'
            }, function () {
                $(".nav_widget").hide();
            });
        } else {
            $(".nav_widget").animate({
                left: '-50%'
            }, function () {
                $(".nav_widget").hide();
            });
        }
    });
});

