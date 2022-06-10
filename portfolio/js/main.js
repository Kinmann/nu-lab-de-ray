//menu nav controll

$(function () {
    $(window).on("wheel", function (event) {
        let E = event.originalEvent;
        let y = E.deltaY;

        if (y < 0) {
            $(".menu_main").stop().slideDown();
        }
        else {
            $(".menu_main").stop().slideUp();
        };
    });
});


// mainpage img scroll
$(function () {
    $(".img").mouseenter(function () {
        let $height = $(this).find("img").height() - $(this).height();
        $(this).find("img").stop().animate({ marginTop: -$height }, 6000, "linear");
    }).mouseleave(function () {
        $(this).find("img").stop().animate({ marginTop: 0 }, 2000);
    })
});


//MENU_DOT

//menu_dot color change
$(function () {
    $(window).scroll(function () {

        //FOR SECTIONS
        $("section").each(function () {
            let hereTop = $(this).offset().top;
            let hereBottom = $(this).offset().top + $(this).outerHeight();

            if ($(window).scrollTop() >= hereTop - 200 && $(window).scrollTop() <= hereBottom - 200) {
                $(".menu_dot").find("li").removeClass("here");
                $(".menu_dot").find("li").eq($(this).index()).addClass("here");
            };
        });

        //FOR FOOTER
        let footerTop = $("footer").offset().top;
        let footerBottom = $("footer").offset().top + $("footer").outerHeight();

        if ($(window).scrollTop() >= footerTop - 200 && $(window).scrollTop() <= footerBottom - 200) {
            $(".menu_dot").find("li").removeClass("here");
            $(".menu_dot").find("li").last().addClass("here");
        };
    });
});
//menu_dot click move
$(function () {
    $(".menu_dot").find("li").click(function () {
        let toGo = $(this).index();
        $(window).animate({ scrollTop: $("section").eq(toGo).offset().top });

    });
});

//Rep_color filler
$(function () {
    let rep_colors = {
        prj1: ["#fff", "#FFC72C", "black"],
        prj2: ["#132faa", "#000", "#cc1936"],
        prj3: ["#baba51", "#008b8b", "#f5f5f5"],
        prj4: ["#fff", "#f5f5f5", "#74a2a3"],
    };
    let key = Object.keys(rep_colors);

    for (i in key) {
        for (j in key[i]) {
            $(".rep_color").eq(i).find("li").eq(j).css("background-color", rep_colors[key[i]][j]);
        }
        $(".rep_color").eq(i).find("li").each(function () {
            if ($(this).index() >= rep_colors[key[i]].length) {
                $(this).remove();
            }
        })
    }
});

//jump to index
$(function () {
    $(".menu_main_2nd").find("li > a").click(function (e) {
        e.preventDefault();
        
        $("html").animate({scrollTop: $(this.hash).offset().top-70}, 500);
    })
    $(".about").find("a").click(function(e) {
        e.preventDefault();
        console.log($(this));
        $("html").animate({scrollTop: $(this.hash).offset().top-70}, 500);
    })
    $(".logo").click(function() {
        $("html").animate({scrollTop:0}, 500);
    })
})

//works sliding
$(function () {
    $(".works").hover(function() {
        $(".menu_main_2nd").stop().slideToggle();
    })
})

/*******Bubbling effect starts
window.onload = function () {

    var c = document.getElementById('c'),
        $ = c.getContext('2d'),
        w = c.width = window.innerWidth,
        h = c.height = window.innerHeight;

    var i, bubblesNumber = w * h > 750000 ? 200 : 150,
        objects = [],
        maxRadius = w * h > 500000 ? 50 : 35,
        maxYVelocity = 2;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };

    Vector.prototype.multiply = function (value) {
        this.x *= value;
        this.y *= value;
        return this;
    };

    Vector.prototype.getMagnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    function Fragment(position, velocity, radius, hue) {
        this.position = position;
        this.velocity = velocity;
        this.startSpeed = this.velocity.getMagnitude();
        this.radius = radius;
        this.hue = hue;
    }

    Fragment.prototype.update = function (world) {
        this.velocity.multiply(world.physicalProperties.friction);
        this.position.add(this.velocity);
        this.radius *= this.velocity.getMagnitude() / this.startSpeed;
        if (this.radius < 0.1) {
            world.objects.splice(world.objects.indexOf(this), 1);
        }
    }

    Fragment.prototype.render = function ($) {
        $.beginPath();
        $.fillStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        $.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        $.fill();
    };

    function Bubble(x, y, speed, radius, fragments, swing, hue) {
        this.x = x;
        this.y = y;
        this.startX = this.x;
        this.speed = speed;
        this.radius = radius;
        this.fragments = fragments;
        this.swing = swing;
        this.hue = hue;
    }

    Bubble.prototype.update = function (world) {
        this.x = this.startX + Math.cos(this.y / 80) * this.swing;
        this.y += this.speed;
        if (this.y + this.radius < 0) {
            this.y = world.physicalProperties.height + this.radius;
        }
    }

    Bubble.prototype.render = function ($) {
        $.beginPath();
        $.fillStyle = 'hsl(' + this.hue + ', 100%, 80%)';
        $.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        $.fill();
    };

    Bubble.prototype.pop = function (world) {
        world.objects.splice(world.objects.indexOf(this), 1);
        for (var i = 0; i < this.fragments; i++) {
            world.objects.push(new Fragment(new Vector(this.x, this.y), new Vector(randomInRange(-2, 2), randomInRange(-2, 2)), randomInRange(2, this.radius / 4), this.hue));
        }
    };

    function World(physicalProperties, objects, ctx, background) {
        this.physicalProperties = physicalProperties;
        this.objects = objects;
        this.ctx = ctx;
        this.background = background;
        this.frameID = 0;
    }

    World.prototype.update = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(this);
        }
    };

    World.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.physicalProperties.width, this.physicalProperties.height);
        if (this.background) {
            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, this.physicalProperties.width, this.physicalProperties.height);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].render(this.ctx);
        }
    };

    World.prototype.animate = function () {
        this.update();
        this.render();
        this.frameID = requestAnimationFrame(this.animate.bind(this));
    };

    for (i = 0; i < bubblesNumber; i++) {
        objects.push(new Bubble(Math.random() * w, Math.random() * h, -randomInRange(0.5, maxYVelocity), randomInRange(5, maxRadius), randomInRange(7, 10), randomInRange(-40, 40), randomInRange(240, 360)));
    }

    var world = new World({
        width: c.width,
        height: c.height,
        friction: 0.997
    }, objects, $, 'transparent');

    $.globalCompositeOperation = 'lighter';

    world.animate();

    window.addEventListener('resize', function () {
        w = world.physicalProperties.width = c.width = window.innerWidth;
        h = world.physicalProperties.height = c.height = window.innerHeight;
        $.globalCompositeOperation = 'lighter';
    });

    window.addEventListener('mousemove', function (e) {
        for (var i = 0; i < world.objects.length; i++) {
            if ((world.objects[i] instanceof Bubble) && (e.clientX > world.objects[i].x - world.objects[i].radius && e.clientX < world.objects[i].x + world.objects[i].radius && e.clientY < world.objects[i].y + world.objects[i].radius && e.clientY > world.objects[i].y - world.objects[i].radius)) {
                world.objects[i].pop(world);
            }
        }
    });

    window.addEventListener('touchmove', function (e) {
        for (var i = 0; i < world.objects.length; i++) {
            if ((world.objects[i] instanceof Bubble) && (e.touches[0].clientX > world.objects[i].x - world.objects[i].radius && e.touches[0].clientX < world.objects[i].x + world.objects[i].radius && e.touches[0].clientY < world.objects[i].y + world.objects[i].radius && e.touches[0].clientY > world.objects[i].y - world.objects[i].radius)) {
                world.objects[i].pop(world);
            }
        }
    });

};
 bubbling effect ends ***********************/