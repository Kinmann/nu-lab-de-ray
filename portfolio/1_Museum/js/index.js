function bgchange() {
    let scrollTop = $(window).scrollTop();
    let viewport = $(window).height();
    let mainTop = $(".dates").offset().top-100;
    let footerTop = $("footer").offset().top;
    let BGColor = $(".bg_color");

    if (scrollTop <=mainTop) {
        BGColor.css("background-color","#ea8823")
    } 
    else if (scrollTop >= mainTop && scrollTop + viewport < footerTop+200) {
        BGColor.css("background-color","white");
        $("footer").css("filter","none");
        $(".menu").css("filter","none");
        $(".search").css("filter","none");
        $(".home").css("filter","none");
    }
    else  {
        $("footer").css("filter","invert()");
        $(".menu").css("filter","invert()");
        $(".search").css("filter","invert()");
        $(".home").css("filter","invert()");
        BGColor.css("background-color","black");
        

    };

}

window.addEventListener('scroll',bgchange);

$(function() {
        let slider_img_width = parseInt($(".weekly_slider_wrap").width());
        let slider_window_left = parseInt($(".weekly_slider_window").offset().left);
        let slider_window_width = parseInt($(".weekly_slider_window").width());
        let slider_content_width = parseInt($(".slider_img").width())/2;;
        let indexNo = 0;
    

    $(".weekly_slider_wrap").draggable({
        axis: "x", 
        containment: [-slider_img_width -slider_content_width + slider_window_width+slider_window_left, 40, slider_window_left+slider_content_width, 40],
        stop: function() {
            slider_img_width = parseInt($(".weekly_slider_wrap").width());
            slider_window_left = parseInt($(".weekly_slider_window").offset().left);
            slider_window_width = parseInt($(".weekly_slider_window").width());
            slider_content_width = parseInt($(".slider_img").width())/2;

            let wrap_left = parseInt($(".weekly_slider_wrap").offset().left);
            let moveRight = -slider_img_width + slider_window_left + slider_window_width - slider_content_width - slider_content_width/3;
            console.log(wrap_left);
            let moveNext = parseInt($(".weekly_slider_wrap").find("li").eq(0).width());
            
            if (wrap_left >= slider_window_left) {
                $(".weekly_slider_wrap").stop().animate({"left":0}, 600)
            }
            else if (wrap_left - 100 <= -slider_img_width + slider_window_left + slider_window_width - slider_content_width) {
                $(".weekly_slider_wrap").stop().animate({"left": moveRight}, 600)
            }
            else {
                let nextTar = $(".weekly_slider_wrap").find(".slider_start").next().offset().left
            }
            console.log(moveNext)
        }
    });
})