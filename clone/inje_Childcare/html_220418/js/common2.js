$(function(){
    animate();
    //전체메뉴 열기
    $(".allNav").on("click",function(e){
        e.preventDefault();
        $("#gnb").addClass("active");
        $("#overlay").show();
    });
    //전체메뉴 닫기
    $(".allNavClose").on("click",function(e){
        e.preventDefault();
        $("#gnb, #overlay").removeClass("active");
        $("#overlay").hide();
    });
    //모달 배경 눌렀을때 메뉴 닫기
    $("#overlay").on("click",function(e){
        e.preventDefault();
        $("#gnb").removeClass("active");
    });
    //section navBar
    $("#sectionBtn li a").on("click",function(e){
        e.preventDefault();
        var target = $(this.hash);
        $("html").animate({scrollTop:target.offset().top + - 90},600);
        // $(".section").removeClass("active");
        // $(target).addClass("active");
        sectionMove();
    });
    //gnb
    $("#gnb li a").on("click",function(e){
        e.preventDefault();
        var idx  = $(this).parent().index(),
            sectionBtn = $("#sectionBtn li");
        $("#overlay").hide();
        $("#gnb").removeClass("active");
        $("html").animate({scrollTop:$(this.hash).offset().top + -90},600);
        sectionBtn.removeClass("active");
        sectionBtn.eq(idx).addClass("active");
        // $(".section").removeClass("active");
        // $(".section" + (idx + 1)).addClass("active");
    });    
});


$(window).scroll(function(){
    animate();
    sectionMove();
});

$(window).resize(function(){
    animate();
    if(window.innerWidth < 500){
		$("body").addClass("mobile");
		$("meta[name=viewport]").attr("content","width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes");
        $("table th").filter(function(){
            return this.style.width == "100px"
        }).addClass("w100").removeAttr("style");
	}else{
		$("body").removeClass("mobile");
		$("meta[name=viewport]").attr("content","width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no");
	}
}).resize();

//section scroll에 따른 함수
function sectionMove(){
    $(".section").each(function(i){
        var windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            offsetTop = $(this).offset().top;
        if(windowHeight + scrollTop > offsetTop + 490){
            $("#sectionBtn li").removeClass("active");
            $("#sectionBtn li").eq(i).addClass("active");
        }
    });
}
//animation 효과 함수
function animate(){
    $(".animate").each(function(){
        var windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            offsetTop = $(this).offset().top;
        if(windowHeight + scrollTop > offsetTop + 30){
            $(this).addClass("on");
        }else{
            //$(this).removeClass("on");
        }
    });
}

