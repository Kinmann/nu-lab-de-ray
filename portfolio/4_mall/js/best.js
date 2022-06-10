$(function () {
    $.ajax({
        url: "json/best.json",
        dataType: "json",
        success: function (data) {

            let content = $(".exhibition").eq(0).children(".contents");
            let contents_box = content.children(".contents_box");
            for (i in data) {
                let $title = data[i].title;
                let $desc = data[i].desc;
                let $price = data[i].price;
                let $sale = data[i].sale;
                let $url = data[i].url;
                let $discount = data[i].discount;

                contents_box.eq(i).find("img").eq(0).attr("src",$url);
                contents_box.eq(i).find(".thumbnail_percent").text($discount+"%");
                contents_box.eq(i).find("h4 > a").text($title);
                contents_box.eq(i).find(".desc").text($desc);
                contents_box.eq(i).find(".price").text($price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원");
                contents_box.eq(i).find(".sale").text($sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원");

            }
        }
    })
});