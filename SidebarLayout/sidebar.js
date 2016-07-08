/**
 * Created by lyl on 2016/6/29.
 */
$(document).ready(function () {
    var jWindow = $(window);
    jWindow.scroll(function () {
        var scrollHeight = jWindow.scrollTop();
        var headerHeight = $("#header").height() + $(".navpositon").height() + $(".w-1000").height() + 20;
        var contentHeight = $("#main").height() - headerHeight;

        console.log(scrollHeight + "......" + contentHeight + "....." + headerHeight);

        if (scrollHeight > headerHeight && scrollHeight < contentHeight - headerHeight) {
            $("#aside").css({
                position: "absolute",
                top: scrollHeight + "px"
            });
        } else if (scrollHeight <= headerHeight) {
            $("#aside").css({
                position: "absolute",
                top: headerHeight + "px"
            });
        }
    });
});
