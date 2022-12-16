
var secTop = {};
var pageListTotal = 8;
var pageIdx;
var pageNumCount;


$(function(){
	$("html, body").scrollTop(0);

	$(".btn_gnbOpen").click(function(e){
		e.preventDefault();
		$("#gnb").addClass("active");
		$("#overlay").show();
	});
	$(".btn_gnbClose, #overlay").click(function(e){
		e.preventDefault();
		$("#gnb").removeClass("active");
		$("#overlay").hide();
	});
	$("#gnb li a").click(function(e){
		if(!$(this).parent().hasClass("onlyPhone")){
			e.preventDefault();
			var no = $(this).parent().index() + 1;
			mainSectionControl.move(no);
			$("#gnb").removeClass("active");
			$("#overlay").hide();
		}
	});

	$("#section1").addClass("active");
	
	$("#slider ul").bxSlider({
		auto:true,
		autoControls:true,
		pager:true,
		pagerType:'short'
	});

	if($("#container .section").length > 0){
		var mainSection = $("#container .section");
		for(i=0; i<mainSection.length; i++){
			secTop[(i+1)] = mainSection.eq(i).offset().top + 10;
		}
	}

	$("#sectionBtn li a").click(function(e){
		e.preventDefault();
		var no = $(this).parent().index() + 1;
		mainSectionControl.move(no);
	});

	$(".tabContent").each(function(){
		var tabBar = $(".tabBar");
		var tabPage = $(".tabPage");
		if(!$(this).hasClass("notUsed")){
			if(tabBar.children("li.active").length == 0 && !tabBar.find("li").eq(0).children("a").hasClass("useLink")){
				injeinc.tabReset($(this));
				tabBar.children("li").eq(0).addClass("active");
				tabPage.eq(0).addClass("active");
			}
			tabBar.find("a").unbind().click(function(e){ //탭버튼 클릭이벤트
				if(!$(this).hasClass("useLink")){
					e.preventDefault();
					injeinc.tabReset($(this));
					$(this).parent().parent().siblings(".tabPage").eq($(this).parent().index()).addClass("active");
					$(this).parent().addClass("active");
				}
			}).keydown(function(e){
				if($(this).parent().hasClass("active") && e.keyCode == 9){
					var focusItem = injeinc.findFocusItem($(this).parents(".tabBar").eq(0).siblings(".tabPage.active"));
					if(focusItem.length == 0 || $(this).hasClass("useLink")){
						if($(this).parent().next().children("a").length > 0){
							e.preventDefault();
							$(this).parent().next().children("a").trigger("click").focus();
						}
					}else{
						e.preventDefault();
						focusItem.eq(0).focus();
					}
				}
			});
		}
	});
	$(".tabPage").each(function(){
		if(!$(this).parent(".tabContent").hasClass("notUsed")){
			var focusItem = injeinc.findFocusItem($(this)); //탭페이지 포커스 이동
			if(focusItem.length > 0){
				focusItem.last().unbind().keydown(function(e){
					var inTabPage = $(this).parents(".tabPage").eq(0);
					var inTabBar = inTabPage.siblings(".tabBar");
					var target = inTabBar.children("li.active").next();
					if(e.keyCode == 9 && target.length > 0){
						e.preventDefault();
						if(!target.children("a").hasClass("useLink")){
							target.children("a").trigger("click");
						}else{
							inTabBar.children("li").removeClass("active");
							target.addClass("active");
						}
						target.children("a").focus();
					}
				});
			}
		}
	});
	$(".btn_popup").click(function(e){
		e.preventDefault();
		$("#overlay").show();
		$("#mainFunctionList").show();
	});

	//구축사례
	resposiveSize();
	mainCaseWrap();

	$(".typeTab li a").click(function(e){
		e.preventDefault();
		var typeNo = $(this).attr("data-type");
		$(".typeTab li").removeClass("active");
		$(this).parent().addClass("active");
		$("#section3 .mainCaseWrap ul li").removeClass("active");
		if(typeNo == '0'){
			$("#section3 .mainCaseWrap ul li").removeClass("item").addClass("item");
		}else{
			$("#section3 .mainCaseWrap ul li").removeClass("item");
			$("#section3 .mainCaseWrap ul li.type"+typeNo).addClass("item");
		}
		mainCaseWrap();
	});

	$(".mainCaseWrap .paging .last").click(function(e){
		e.preventDefault();
		$(".mainCaseWrap").find(".active").removeClass("active");
		$(".mainCaseWrap .pagingNo .num").last().addClass("active");

		pageIdx = $(".mainCaseWrap .pagingNo .num").last().index() + 1;
		mainCaseActive();
		
	});
	$(".mainCaseWrap .paging .first").click(function(e){
		e.preventDefault();
		$(".mainCaseWrap").find(".active").removeClass("active");
		$(".mainCaseWrap .pagingNo .num").first().addClass("active");

		pageIdx = $(".mainCaseWrap .pagingNo .num").first().index() + 1;
		mainCaseActive();
		
	});
	$(".mainCaseWrap .paging .next").click(function(e){
		e.preventDefault();
		if($(".mainCaseWrap .pagingNo .num.active").is(":last-child") == false){
			
			$(".mainCaseWrap .pagingNo .num.active").next().addClass("active");
			
			$(".mainCaseWrap .pagingNo .num.active").first().removeClass("active");
			$(".mainCaseWrap > ul > li.item").removeClass("active");

			pageIdx = $(".mainCaseWrap .pagingNo .num.active").index() + 1;
			mainCaseActive();
		}
	});
	$(".mainCaseWrap .paging .prev").click(function(e){
		e.preventDefault();
		if($(".mainCaseWrap .pagingNo .num.active").is(":first-child") == false){
			$(".mainCaseWrap .pagingNo .num.active").prev().addClass("active");
			$(".mainCaseWrap .pagingNo .num.active").last().removeClass("active");
			$(".mainCaseWrap > ul > li.item").removeClass("active");

			pageIdx = $(".mainCaseWrap .pagingNo .num.active").index() + 1;
			mainCaseActive();
		}
	});
		
});

$(window).resize(function(){
	if($("#container .section").length > 0){
		var mainSection = $("#container .section");
		for(i=0; i<mainSection.length; i++){
			secTop[(i+1)] = mainSection.eq(i).offset().top;
		}
	}

	//구축사례
	resposiveSize();
	mainCaseWrap();
});

$(window).scroll(function(){
	var scrollTopPx = $(window).scrollTop() + ($(window).height()/2);
	mainSectionControl.scroll(scrollTopPx);
});

function mainCaseWrap(){
	if($(".mainCaseWrap > ul > li.item").length > pageListTotal){
		$(".mainCaseWrap > ul > li.item").removeClass("active");
		for(i=0; i<pageListTotal; i++){
			$(".mainCaseWrap > ul > li.item").eq(i).addClass("active");
		}
		
		var mainCaseLi = $(".mainCaseWrap > ul > li.item").length;
		var pageTotal = parseInt(mainCaseLi / pageListTotal);
		if(mainCaseLi%pageListTotal != 0){
			pageTotal++;
		}
		var pageNoHtml = "";
		for(i=0; i<pageTotal; i++){
			pageNoHtml += '<a href="#" class="num num'+(i+1)+'">'+(i+1)+'</a>';
		}
		$(".mainCaseWrap .paging .pagingNo").html(pageNoHtml);
		$(".mainCaseWrap .paging .num1").addClass("active");

		/*pageNumCount = 11;
		if($(".mainCaseWrap .paging .num").length > pageNumCount)){
			for(i=pageNumCount; i<pageTotal; i++){
				$(".mainCaseWrap .paging .num").eq(i).hide();
			}
		}*/

	}else{
		$(".mainCaseWrap > ul > li.item").addClass("active");
		$(".mainCaseWrap .paging .pagingNo").html('<a href="#" class="num num1 active">1</a>');
	};
	$(".mainCaseWrap .pagingNo .num").each(function(){		
		$(this).click(function(e){
			e.preventDefault();
			$(".mainCaseWrap").find(".active").removeClass("active");
			$(this).addClass("active");
			pageIdx = $(this).index() + 1;
			mainCaseActive();
		});
	});
	
}

function mainCaseActive(){
	var caseActiveStart = pageListTotal * (pageIdx-1);
	var caseActiveEnd = pageListTotal * pageIdx;
	
	for(i=caseActiveStart; i<caseActiveEnd; i++){
		var caseActive = $(".mainCaseWrap > ul > li.item").eq(i);
		caseActive.addClass("active");
	}
}

function resposiveSize(){
	var windowWidth = $(window).width();
	if(windowWidth < 960){
		pageListTotal = 6;
		pageNumCount = 5;
	}else{
		pageListTotal = 8;
	}                                               
}

var mainSectionControl = {
	"down": function(){
		var scrollTopPx = $(window).scrollTop();
		if(scrollTopPx >= secTop[6]){
			$("html, body").stop().animate({"scrollTop": secTop[7]+"px"}, 300);

		}else if(scrollTopPx >= secTop[5]){
			$("html, body").stop().animate({"scrollTop": secTop[6]+"px"}, 300);

		}else if(scrollTopPx >= secTop[4]){
			$("html, body").stop().animate({"scrollTop": secTop[5]+"px"}, 300);

		}else if(scrollTopPx >= secTop[3]){
			$("html, body").stop().animate({"scrollTop": secTop[4]+"px"}, 300);

		}else if(scrollTopPx >= secTop[2]){
			$("html, body").stop().animate({"scrollTop": secTop[3]+"px"}, 300);

		}else if(scrollTopPx >= secTop[1]){
			$("html, body").stop().animate({"scrollTop": secTop[2]+"px"}, 300);

		}
	},
	"up": function(){
		var scrollTopPx = $(window).scrollTop();
		if(scrollTopPx <= secTop[1]){

		}else if(scrollTopPx <= secTop[2]){
			$("html, body").stop().animate({"scrollTop": secTop[1]+"px"}, 300);

		}else if(scrollTopPx <= secTop[3]){
			$("html, body").stop().animate({"scrollTop": secTop[2]+"px"}, 300);

		}else if(scrollTopPx <= secTop[4]){
			$("html, body").stop().animate({"scrollTop": secTop[3]+"px"}, 300);

		}else if(scrollTopPx <= secTop[5]){
			$("html, body").stop().animate({"scrollTop": secTop[4]+"px"}, 300);

		}else if(scrollTopPx <= secTop[6]){
			$("html, body").stop().animate({"scrollTop": secTop[5]+"px"}, 300);

		}else if(scrollTopPx <= secTop[7]){
			$("html, body").stop().animate({"scrollTop": secTop[6]+"px"}, 300);

		}
	},
	"move": function(no){
		$("html, body").stop().animate({"scrollTop":(secTop[no]-100)+"px"}, 800);
	},
	"scroll": function(scrollTopPx){
		$("html").removeClass("scrolled_row1").removeClass("scrolled_row2").removeClass("scrolled_row3").removeClass("scrolled_row4").removeClass("scrolled_row5").removeClass("scrolled_row6").removeClass("scrolled_row7");
		if(scrollTopPx >= secTop[7]){
			$("html").addClass("scrolled_row7");
			$("#section7").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(6).addClass("active");

		}else if(scrollTopPx >= secTop[6]){
			$("html").addClass("scrolled_row6");
			$("#section6").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(5).addClass("active");

		}else if(scrollTopPx >= secTop[5]){
			$("html").addClass("scrolled_row5");
			$("#section5").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(4).addClass("active");

		}else if(scrollTopPx >= secTop[4]){
			$("html").addClass("scrolled_row4");
			$("#section4").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(3).addClass("active");

		}else if(scrollTopPx >= secTop[3]){
			$("html").addClass("scrolled_row3");
			$("#section3").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(2).addClass("active");

		}else if(scrollTopPx >= secTop[2]){
			$("html").addClass("scrolled_row2");
			$("#section2").addClass("active");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(1).addClass("active");

		}else if(scrollTopPx >= secTop[1]){
			$(".section").not("#section1").removeClass("active");

			$("html").addClass("scrolled_row1");
			$("#sectionBtn li").removeClass("active");
			$("#sectionBtn li").eq(0).addClass("active");
		}
	}
}