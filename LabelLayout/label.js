/**
 * Created by lyl on 2016/6/29.
 */

var timeoutid;
$(document).ready(function () {
    $("#tabfirst li").each(function (index) {
        var liNode = $(this);
        $(this).mouseover(function () {
            timeoutid = setTimeout(function () {
                $("div.content").removeClass("content");
                $("#tabfirst li.tabin").removeClass("tabin");
                $("div").eq(index).addClass("content");
                liNode.addClass("tabin");
            }, 300);
        }).mouseout(function () {
            clearTimeout(timeoutid);
        });
    });

    $("#contentsecond").load("body.html");
    $("#tabsecond li").each(function (index) {
        $(this).click(function () {
            $("#tabsecond li.tabin").removeClass("tabin");
            $(this).addClass("tabin");

            if (index == 0) {
                $("#contentsecond").load("body.html");
            } else if (index == 1) {
                $("#contentsecond").load("body1.html h2");
            } else if (index == 2) {
                $("#contentsecond").load("body1.html");
            }

        });

    });

});