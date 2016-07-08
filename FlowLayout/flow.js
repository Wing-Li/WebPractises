/**
 * Created by lyl on 2016/6/28.
 */
$(document).ready(function () {

    $(window).on("load", function () {
        imgLocation();

        var dataImg = {
            "data": [{"src": "a1.jpg"},
                {"src": "a2.jpg"},
                {"src": "a3.jpg"},
                {"src": "a4.jpg"},
                {"src": "a5.jpg"},
                {"src": "a6.jpg"},
                {"src": "a7.jpg"},
                {"src": "a8.jpg"},
                {"src": "a9.jpg"},
                {"src": "a10.jpg"},
                {"src": "a11.jpg"}
            ]
        };

        window.onscroll = function () {
            if (scrollside()) {
                $.each(dataImg.data, function (index, value) {
                    var box = $("<div>").addClass("box").appendTo("#contaniner");
                    var content = $("<div>").addClass("content").appendTo(box);
                    //console.log("../img/"+$(value).attr("src"));
                    $("<img>").attr("src", "../img/" + $(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });
});

function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(window).height();
    var scrollHeight = $(document).scrollTop();
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
}

function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var boxArr = [];

    box.each(function (index, value) {
        //console.log(index + ":" + value);
        var boxHeight = box.eq(index).height();
        if (index < num) {
            boxArr[index] = boxHeight;
            //console.log("盒子的高度："+boxHeight);
        } else {
            var minBoxHeight = Math.min.apply(null, boxArr);
            //console.log("盒子最小高度："+minBoxHeight)

            var minBoxIndex = $.inArray(minBoxHeight, boxArr);
            //console.log("最小盒子的位置："+minBoxIndex)

            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });

            boxArr[minBoxIndex] += box.eq(index).height();
        }

    });

}