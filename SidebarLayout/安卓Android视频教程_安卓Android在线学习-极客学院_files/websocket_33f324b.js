var EVENTDOMAIN={domain:function(e){var s=/http:\/\/([^\/]+)\//i,a=e.match(s);return a=a[1],d_arr=a.split("."),a=d_arr[d_arr.length-2]+"."+d_arr[d_arr.length-1]},domain_pre:function(e){var s=/http:\/\/([^\/]+)\//i,a=e.match(s);return a=a[1],d_arr=a.split("."),d_arr[0]},domain_arr:function(e){var s=/http:\/\/([^\/]+)\//i,a=e.match(s);return a=a[1],d_arr=a.split(".")},currentUrl:window.location.href},EVENT_HOST_ARR=EVENTDOMAIN.domain_arr(window.location.href),EVENT_HOST_PRE="."+EVENT_HOST_ARR[1]+"."+EVENT_HOST_ARR[2],jkWebSocket=jkWebSocket||{};jkWebSocket={adress:"ws://comet"+EVENT_HOST_PRE,flash:"http://e.jikexueyuan.com/headerandfooter/js/WebSocketMain.swf",init:function(){this.unread(),this.bind(),this.creatMessage()},bind:function(){$("#messagebox").bind("click",this.massageShow),$(".set-read").bind("click",this.setread)},unread:function(){$.ajax({type:"get",url:"/message/v1/unread",success:function(e){if(200==e.code){var s=$(".unread-num");0!=e.data.unread_num?($("#messagebox").removeClass("my-massage2").addClass("my-massage"),s.html(e.data.unread_num),$(".bounce1,.bounce2,.bounce3").css("display","inline-block"),$(".news-list").show(),$(".nonews").hide(),$("#this-news").height(350)):($("#messagebox").removeClass("my-massage").addClass("my-massage2"),s.html("&nbsp;"),$(".set-read").hide(),$(".news-list").empty().hide(),$("#this-news>h3>span").hide(),$(".nonews").show(),$("#this-news").css("height","auto"),$(".bounce1,.bounce2,.bounce3").hide())}},dataType:"json",error:function(){}})},creatMessageList:function(e){function s(e,s,a,n,t,i){var r="<li msg_id ="+e+" >";return r+='<div class="cf">',r+='<a class="answer" href='+s+' target = "_blank" >'+n+"</a>",r+="<em>"+t+"</em></div>",r+="<p><a href="+a+' target = "_blank">'+i+"</a></p>",r+="</li>"}if(e.data.total_items<=0)return!1;$(".nonews").hide();var a=$(".news-list");a.show();for(var e=e.data,n=0;n<e.list.length;n++){var t=e.list[n],i=t.extra.title_url,r=t.extra.content_url,o=t.title,c=t.content,u=t.msg_id,d=jkWebSocket.creatTime(Date.parse(t.created_at.replace(/[-]/g,"/"))/1e3),m=s(u,i,r,o,d,c);a.append(m)}$(".news-list li a").click(function(){var e=$(this).parents("li").attr("msg_id"),s=$(this).parents("li"),a=parseInt($(".unread-num").eq(0).text());a>0&&(a--,$(".unread-num").html(a)),$.ajax({type:"get",url:"/message/v1/read",data:{ids:e},success:function(e){200==e.code?(s.remove(),a>0?$(".unread-num").html(a):($(".set-read").hide(),$(".news-list").empty().hide(),$("#this-news>h3>span").hide(),$("#this-news").css("height","auto"),$("#messagebox").removeClass("my-massage").addClass("my-massage2"),$(".unread-num").html("&nbsp;"),$(".nonews").show())):console.log(e.msg)},dataType:"json",error:function(){console.log("网络错误")}})})},creatTime:function(e){var s,a,n,t,i=parseInt((new Date).getTime()/1e3);if(t=i-e,n=parseInt(t/86400),a=parseInt(t/3600),s=parseInt(t/60),n>0&&4>n)return n+"天前";if(0>=n&&a>0)return a+"小时前";if(0>=a&&s>0)return s+"分钟前";if(0==s)return"刚刚";if(n>=4){var r=new Date(1e3*e),o=r.getMonth()+1;return r.getFullYear()+"年"+o+"月"+r.getDate()+"日"}},setread:function(){var e=[],s=$(".news-list li").length-1;$(".news-list li").each(function(a){var n=$(this).attr("msg_id");if(e.push(n),a==s){var t=e.join(",");$.ajax({type:"get",url:"/message/v1/read",data:{ids:t},success:function(e){200==e.code&&($(".set-read").hide(),$(".news-list").empty().hide(),$("#this-news>h3>span").hide(),$("#this-news").css("height","auto"),$("#messagebox").removeClass("my-massage").addClass("my-massage2"),$(".unread-num").html("&nbsp;"),$(".nonews").show())},dataType:"json",error:function(){console.log("网络错误")}})}})},messageList:function(){$.ajax({type:"get",url:"/message/v1/unread_list",success:function(e){if(200==e.code){var s=$(".news-list");s.empty(),jkWebSocket.creatMessageList(e)}},dataType:"json",error:function(){console.log("网络错误")}})},messageNumber:null,pingTimeout:null,pingInterval:null,messageTime:function(e){var s=this,a=1e3*parseInt(e)||15e4;clearInterval(s.messageNumber),s.messageNumber=setInterval(function(){jkWebSocket.creatMessage()},a)},creatMessage:function(){var e=this;clearInterval(e.messageNumber),WEB_SOCKET_SWF_LOCATION=jkWebSocket.flash,ws=new WebSocket(jkWebSocket.adress),ws.onopen=function(){},ws.onmessage=function(s){if("ping"==s.data)return void ws.send("pong");e.pingTimeout=s.data.pingTimeout;var a=$.cookie("uid"),n=$.cookie("authcode"),t={type:"login",data:{app_id:1,from:"web",uid:a,token:encodeURIComponent(n)}},i=JSON.parse(s.data);switch(i.type){case"connect":ws.send(JSON.stringify(t));break;case"auth":var r=i.data.result;if("ok"==r)return;"error"==r&&e.messageTime(e.pingTimeout);break;case"notify":var o=jsonA.data.unread_num;0!=o?($("#messagebox").removeClass("my-massage2").addClass("my-massage"),$(".unread-num").html(o),$(".bounce1,.bounce2,.bounce3").css("display","inline-block")):($("#messagebox").removeClass("my-massage").addClass("my-massage2"),$(".unread-num").html("&nbsp;"),$(".bounce1,.bounce2,.bounce3").hide());break;default:ws.close()}},ws.onerror=function(){console.log("error")},ws.onclose=function(){e.messageTime(e.pingTimeout)}},massageShow:function(){$("#messagebox").unbind("click"),jkWebSocket.messageList(),JKXY.stopEventBubble(),$("#this-news").slideDown(200,function(){$(document).bind("click",function(){$("#this-news").hide(),$("#messagebox").unbind("click"),$("#messagebox").bind("click",jkWebSocket.massageShow)})}),$("#this-news").bind("click",function(){JKXY.stopEventBubble()})}},$(function(){var e=$.cookie("uid");e&&jkWebSocket.init()});