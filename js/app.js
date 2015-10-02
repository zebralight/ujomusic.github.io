/*! ujo-music02-10-2015 */
!function(){function initHeader(){width=$(".header").width(),height=$(".header").height(),target={x:width/2,y:height/2},canvas=document.getElementById("plexus"),canvas.width=width,canvas.height=height,ctx=canvas.getContext("2d"),points=[];for(var x=0;width>x;x+=width/20)for(var y=0;height>y;y+=height/20){var px=x+Math.random()*width/20,py=y+Math.random()*height/20,p={x:px,originX:px,y:py,originY:py};points.push(p)}for(var i=0;i<points.length;i++){for(var closest=[],p1=points[i],j=0;j<points.length;j++){var p2=points[j];if(p1!=p2){for(var placed=!1,k=0;5>k;k++)placed||void 0==closest[k]&&(closest[k]=p2,placed=!0);for(var k=0;5>k;k++)placed||getDistance(p1,p2)<getDistance(p1,closest[k])&&(closest[k]=p2,placed=!0)}}p1.closest=closest}for(var i in points){var c=new Circle(points[i],2+Math.random(),"rgba(255,255,255,0.3)");points[i].circle=c}}function addListeners(){window.addEventListener("resize",resize)}function resize(){width=$(".header").outerWidth(),height=$(".header").outerHeight(),canvas.width=width,canvas.height=height,initHeader(),initAnimation()}function initAnimation(){animate()}function animate(){ctx.clearRect(0,0,width,height);for(var i in points)points[i].active=.01,points[i].circle.active=.01,drawLines(points[i]),points[i].circle.draw()}function drawLines(p){if(p.active)for(var i in p.closest)ctx.beginPath(),ctx.moveTo(p.x,p.y),ctx.lineTo(p.closest[i].x,p.closest[i].y),ctx.strokeStyle="rgba(156,217,249,"+p.active+")",ctx.stroke()}function Circle(pos,rad,color){var _this=this;!function(){_this.pos=pos||null,_this.radius=rad||null,_this.color=color||null}(),this.draw=function(){_this.active&&(ctx.beginPath(),ctx.arc(_this.pos.x,_this.pos.y,_this.radius,0,2*Math.PI,!1),ctx.fillStyle="rgba(156,217,249,"+_this.active+")",ctx.fill())}}function getDistance(p1,p2){return Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)}function formatDate(d){function pad(s){return 10>s?"0"+s:s}var date=new Date(d);return[pad(date.getDate()),pad(date.getMonth()+1),date.getFullYear()].join("/")}function animateSlides(){$(".slider-history").removeClass("on"),$(".slides-holder").animate({left:-1*(activeSlide-1)*slideWidth},500,function(){$(".slider-history-holder .slider-history:nth-child("+activeSlide+")").addClass("on")})}function isEmail(email){var regex=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;return regex.test(email)}function submitSubscription(){$("#newsletter").parent().removeClass("error"),$("#newslettermsg").hide(),$("#newslettermsg").html(""),$("#newslettermsg").removeClass("text-danger"),$("#newslettermsg").removeClass("text-success"),isEmail($("#newsletter").val())?$.ajax({type:"GET",url:"http://wtf.us11.list-manage1.com/subscribe/post-json?u=5b0868a9cb58b8b0f36aacd90&id=4002d0fa0e&c=?",data:{EMAIL:$("#newsletter").val()},cache:!1,dataType:"json",contentType:"application/json; charset=utf-8",error:function(err){$("#newslettermsg").html("Could not connect to the registration server. Please try again later."),$("#newslettermsg").addClass("text-danger")},success:function(data){console.log(data),"success"!==data.result?($("#newslettermsg").html(data.msg),$("#newslettermsg").addClass("text-danger")):($("#newsletter").val(""),$("#newslettermsg").addClass("text-success"),$("#newslettermsg").html(data.msg),$("#subscribe").hide()),$("#newslettermsg").show()}}):($("#newsletter").parent().addClass("error"),$("#newslettermsg").html("Please enter a valid e-mail address"),$("#newslettermsg").addClass("text-danger"),$("#newslettermsg").show())}function submitContactForm(){var error=!1;$("#name").parent().removeClass("error"),$("#email").parent().removeClass("error"),$("#message").parent().removeClass("error"),$("#contactmsg").hide(),$("#contactmsg").html(""),$("#contactmsg").removeClass("text-danger"),$("#contactmsg").removeClass("text-success"),$("#name").val().length<=3&&($("#name").parent().addClass("error"),error=!0),isEmail($("#email").val())||($("#email").parent().addClass("error"),error=!0),$("#message").val().length<=3&&($("#message").parent().addClass("error"),error=!0),error?($("#contactmsg").html("Please fill all the fields"),$("#contactmsg").addClass("text-danger"),$("#contactmsg").show()):($("#send").hide(),$("#contactmsg").html("Sending..."),$("#contactmsg").show(),$.post("http://blog.ujomusic.com/contact.php",{name:$("#name").val(),email:$("#email").val(),message:$("#message").val()},function(data){console.log(data),data.success!==!0?($("#contactmsg").html("Could not connect to the server. Please try again later."),$("#contactmsg").addClass("text-danger")):($("#name").val(""),$("#email").val(""),$("#message").val(""),$("#contactmsg").addClass("text-success"),$("#contactmsg").html("Your message was sent!")),$("#send").show(),$("#contactmsg").show()},"json"))}var width,height,canvas,ctx,points,target,blogURL="http://blog.ujomusic.com/",feedURL=blogURL+"feed/json/";initHeader(),initAnimation(),addListeners(),$.getJSON(feedURL,function(data){if(console.log(data),data.length>0)for(var x=0;1>=x;x++){var content=$("<textarea />").html(data[x].content).text();console.log(content),$(".blog-post-"+(x+1)+" a").text(data[x].title),$(".blog-post-"+(x+1)+" a").attr("href",data[x].permalink),$(".blog-post-"+(x+1)+" div.date").html(formatDate(data[x].date)),$(".blog-post-"+(x+1)+" p").html(content)}});var activeSlide=1,slideWidth=800;$("a.next").click(function(e){e.preventDefault(),activeSlide++,activeSlide>4&&(activeSlide=1),animateSlides()}),$("a.prev").click(function(e){e.preventDefault(),activeSlide--,1>activeSlide&&(activeSlide=4),animateSlides()}),$("#newslettermsg").hide(),$("#subscribe").click(function(e){e.preventDefault(),submitSubscription()}),$("#newsletter").keypress(function(e){13==e.which&&submitSubscription()}),$("#contactmsg").hide(),$("#send").click(function(e){e.preventDefault(),submitContactForm()}),$("#name,#email").keypress(function(e){13==e.which&&submitContactForm()}),$(".prototype").click(function(e){e.preventDefault()})}(),function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r,i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date,a=s.createElement(o),m=s.getElementsByTagName(o)[0],a.async=1,a.src=g,m.parentNode.insertBefore(a,m)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-68390837-1","auto"),ga("send","pageview");