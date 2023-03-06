// const nav = document.querySelector("nav");
// const navEls = document.querySelectorAll("nav > ul > li > a");
// const allNav = document.querySelector(".all-nav");
// const allNavInner = document.querySelector(".all-nav .inner");

// //마우스오버 슬라이드다운
// navEls.forEach((el) => {
//   el.addEventListener("mouseenter", () => {
//     allNav.style.height = allNavInner.clientHeight + "px";
//   });
// });

// //마우스아웃 슬라이드업
// nav.addEventListener("mouseleave", () => {
//   allNav.style.height = 0;
// });

//메인하단 배너존
// const mainBannerPause= document.querySelector(".main-banner .swiper-button-pause")
// const mainBannerPlay= document.querySelector(".main-banner .swiper-button-play")
// const mainBanner = new Swiper('.main-banner', {
//   loop: true,
//   slidesPerView: 4,
//   slidesPerGroup: 1,
//   autoplay: {
//     delay : 3000,
//   },
//   navigation: {
//     prevEl: '.main-banner .swiper-button-prev',
//     nextEl: '.main-banner .swiper-button-next',
//   },
// });

// // mainBannerPause.addEventListener("click", function(){
// //   mainBanner.autoplay.stop();
// //   mainBannerPause.style.display = "none";
// //   mainBannerPlay.style.display = "block";
// // })
// const swiperStop = (swiper) => {
//   swiper.autoplay.stop();
// }
// const bannerStop = () => {
//   swiperStop(mainBanner);
//   mainBannerPause.style.display = "none";
//   mainBannerPlay.style.display = "block";
// }
// mainBannerPause.addEventListener("click",bannerStop);

// // mainBannerPlay.addEventListener("click", function(){
// //   mainBanner.autoplay.start();
// //   mainBannerPlay.style.display = "none";
// //   mainBannerPause.style.display = "block";
// // });
// const swiperPlay = (swiper) => {
//   swiper.autoplay.start();
// }
// const bannerPlay = () => {
//   swiperPlay(mainBanner);
//   mainBannerPlay.style.display = "none";
//   mainBannerPause.style.display = "block";
// }
// mainBannerPlay.addEventListener("click", bannerPlay);

//메인 팝업존
// const mainPopupLinks= document.querySelectorAll(".main-popup .swiper-slide > a");
// const mainPopupPause= document.querySelector(".main-popup-wrap .swiper-button-pause");
// const mainPopupPlay= document.querySelector(".main-popup-wrap .swiper-button-play");
// const mainPopup = new Swiper('.main-popup', {
//   speed : 500,
//   loop: true,
//   autoplay: {
//     delay : 3000,
//   },
//   pagination: {
//     el: ".main-popup-wrap .swiper-pagination",
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<button type="button" class="' + className + '">' + (index + 1) + '</button>';
//     },
//   },
//   on: {
//     init: function(){
// 			mainPopupLinks.forEach((el)=>{
// 				el.setAttribute("tabindex","-1");
// 			});
// 			document.querySelectorAll(".main-popup .swiper-slide-active > a").forEach((el)=>{
// 				el.setAttribute("tabindex","0");
// 			});
//     },
//     transitionEnd: function(){
//       mainPopupLinks.forEach((el)=>{
// 				el.setAttribute("tabindex","-1");
// 			});
// 			document.querySelectorAll(".main-popup .swiper-slide-active > a").forEach((el)=>{
// 				el.setAttribute("tabindex","0");
// 			});
//     }
//   }
// });

// // mainPopupPause.addEventListener("click", function(){
// //   mainPopup.autoplay.stop();
// // });
// mainPopupPause.addEventListener("click", () => swiperStop(mainPopup));

// // mainPopupPlay.addEventListener("click", function(){
// //   mainPopup.autoplay.start();
// // });
// mainPopupPlay.addEventListener("click", () => swiperPlay(mainPopup));

// //탭
// const tabLi= document.querySelectorAll(".tab-bar li");
// const tabLink= document.querySelectorAll(".tab-bar li a");
// tabLink.forEach((el)=>{
//   el.addEventListener("click",(e)=>{
//     e.preventDefault();
//     tabLi.forEach(el=>el.classList.remove("active"));
//     el.parentNode.classList.add("active")
//   });
// });


/* 추가 */
//달력 6주 삭제
const calendarTr = document.querySelectorAll(".calendar tbody tr:last-child");
calendarTr.forEach((el) => {
	let checkNull = el.children[0].children[0];
	checkNull.textContent === '' ? el.style.display = "none" : el.style.display = "block";
})

//게시판 반응형 th값
const mTable = () => {
	if($(window).width() < 641 ){
		$(".list thead th").each(function(i){
			let thTitle = $(this).text();
			$(".list tbody tr").each(function(j){
				$(".list tbody tr").eq(j).children("td").eq(i).prepend(`<span class="tit">${thTitle} : </span>`);
			});
		});
	} else {
		$("span.tit").remove();
	}
}
mTable();


// $(function(){
//   injeinc.init();
// });


// /*Injeinc Libary*/
// var injeinc = {
// 	'init':function(){
// 		// injeinc.tab();
// 		injeinc.datepicker();
// 		injeinc.fileBtn();
// 		injeinc.modal();
// 	},
// 	'tab':function(){
// 		$(".tab-content").each(function(){
// 			var tabBar = $(this).children(".tab-bar");
// 			var tabPage = $(this).children(".tab-page");
// 			if(!$(this).hasClass("not-used")){
// 				if(tabBar.children("li.active").length == 0 && !tabBar.children("li").eq(0).children("a").hasClass("use-link")){
// 					injeinc.tabReset($(this));
// 					tabBar.children("li").eq(0).addClass("active");
// 					tabPage.eq(0).addClass("active");
// 				}
// 				tabBar.children("li").children("a").unbind("click").click(function(e){ //탭버튼 클릭이벤트
// 					if(!$(this).hasClass("use-link")){
// 						e.preventDefault();
// 						injeinc.tabReset($(this));
// 						$(this).parent().parent().siblings(".tab-page").eq($(this).parent().index()).addClass("active");
// 						$(this).parent().addClass("active");
// 					}
// 				}).keydown(function(e){
// 					if($(this).parent().hasClass("active") && e.keyCode == 9){
// 						var focusItem = injeinc.findFocusItem($(this).parents(".tab-bar").eq(0).siblings(".tab-page.active"));
// 						if(focusItem.length == 0 || $(this).hasClass("use-link")){
// 							if($(this).parent().next().children("a").length > 0){
// 								e.preventDefault();
// 								$(this).parent().next().children("a").trigger("click").focus();
// 							}
// 						}else{
// 							e.preventDefault();
// 							focusItem.eq(0).focus();
// 						}
// 					}
// 				});
// 			}
// 		});
// 		$(".tab-page").each(function(){
// 			if(!$(this).parent(".tab-content").hasClass("not-used")){
// 				var focusItem = injeinc.findFocusItem($(this)); //탭페이지 포커스 이동
// 				if(focusItem.length > 0){
// 					focusItem.last().unbind("keydown").keydown(function(e){
// 						var inTabPage = $(this).parents(".tab-page").eq(0);
// 						var inTabBar = inTabPage.siblings(".tab-bar");
// 						var target = inTabBar.children("li.active").next();
// 						if(e.keyCode == 9 && target.length > 0){
// 							e.preventDefault();
// 							if(!target.children("a").hasClass("use-link")){
// 								target.children("a").trigger("click");
// 							}else{
// 								inTabBar.children("li").removeClass("active");
// 								target.addClass("active");
// 							}
// 							target.children("a").focus();
// 						}
// 					});
// 				}
// 			}
// 		});
// 	},
// 	'tabReset':function(tabItem){
// 		if(tabItem.hasClass("tab-content")){
// 			tabItem.children(".tab-bar").children("li.active").removeClass("active");
// 			tabItem.children(".tab-page").removeClass("active");
// 		}else{
// 			tabItem.parents(".tab-content").eq(0).children(".tab-bar").children("li.active").removeClass("active");
// 			tabItem.parents(".tab-content").eq(0).children(".tab-page").removeClass("active");
// 		}
// 	},
// 	'datepicker':function(){
// 		var holidayData = [
// 			{'mmdd':'1-1','title':'신정'},
// 			{'mmdd':'3-1','title':'3.1절'},
// 			{'mmdd':'5-5','title':'어린이날'},
// 			{'mmdd':'5-10','title':'석가탄신일'},
// 			{'mmdd':'6-6','title':'현충일'},
// 			{'mmdd':'8-15','title':'광복절'},
// 			{'mmdd':'10-3','title':'개천절'},
// 			{'mmdd':'10-9','title':'한글날'},
// 			{'mmdd':'12-25','title':'크리스마스'}
// 		];

// 		$(".useDatepicker").each(function(){
// 			if(!$(this).hasClass(".hasDatepicker")){
// 				var minDate = $(this).attr("data-minDate");
// 				var maxDate = $(this).attr("data-maxDate");
// 				var dateFormat = "yy-mm-dd";
// 				if($(this).attr("data-format")){
// 					dateFormat = $(this).attr("data-format");
// 				}
// 				$(this).datepicker({
// 					prevText: '이전 달',
// 					nextText: '다음 달',
// 					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
// 					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
// 					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
// 					dayNamesShort: ['일','월','화','수','목','금','토'],
// 					dayNamesMin: ['일','월','화','수','목','금','토'],
// 					dateFormat: dateFormat,
// 					showMonthAfterYear: true,
// 					yearSuffix: '&nbsp;/',
// 					minDate: minDate,
// 					maxDate: maxDate,
// 					beforeShowDay: function(date){
// 						var holidayCheck = false;
// 						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
// 						for(var i=0; i<holidayData.length; i++){
// 							if(holidayData[i].mmdd == mmdd){
// 								holidayCheck = true;
// 								return [true, "date-holiday", holidayData[i].title];
// 								break;
// 							}
// 						}
// 						if(holidayCheck == false){
// 							return [true, ""];
// 						}
// 					},
// 					onSelect: function(selectedDate){
// 					},
// 					onClose: function(selectedDate){
// 						if($(this).hasClass("data-form")) {
// 							if(selectedDate != "" && $(this).parent().children(".data-top").val() != ""){
// 								if(selectedDate >= $(this).parent().children(".data-top").val()){
// 									alert("시작날짜는 종료날짜보다 작아야 합니다.");
// 									$(this).val("");
// 									return;
// 								}
// 							}
// 						}else if($(this).hasClass("data-top")) {
// 							if(selectedDate != "" && $(this).parent().children(".data-form").val() != ""){
// 								if($(this).parent().children(".data-form").val() >= selectedDate){
// 									alert("종료날짜는 시작날짜보다 커야 합니다.");
// 									$(this).val("");
// 									return;
// 								}
// 							}
// 						}
// 					}
// 				});
// 			}
// 		});
// 	},
// 	'fileBtn':function(){
// 		$("input.file-btn").each(function(){
// 			if($(this).css("display") != "none"){
// 				var file_name = $(this).attr("id");
// 				var file_class = $(this).attr("class").replace("file-btn","");
// 				$(this).after('<span id="for_'+file_name+'"><input type="text" class="'+file_class+'" value="" title="사진"> <a href="#" class="btn_inline for_file-btn">찾아보기</a></span>');
// 				$(this).hide();
// 				$(this).change(function(){
// 					$("#for_"+file_name+" input[type='text']").val($(this).val());
// 				});
// 				$("#for_"+file_name+" .for_file-btn").click(function(e){
// 					e.preventDefault();
// 					var id = $(this).parent().attr("id").replace("for_","");
// 					$("#"+id).click();
// 				});
// 			}
// 		});
// 	},
// 	'modal':function(){
// 		$(document).on("click",".modal-open",function(e){
// 			e.preventDefault();
// 			var targetModal = $(this).attr("href");
// 			injeinc.modalClose();
// 			injeinc.modalOpen(targetModal);
// 			$("html").animate({scrollTop:$(this.hash).offset().top + - 100},500);
// 		});
// 		$(document).on("click","#overlay, .modal-close",function(e){
// 			e.preventDefault();
// 			injeinc.modalClose();
// 		});
// 	},
// 	'modalOpen':function(id){
// 		// $(window).scrollTop(0);
// 		$("#overlay").show();
// 		$(id).addClass("active");
// 		$(id).find(".modal-close").eq(0).focus();
// 	},
// 	'modalClose':function(){
// 		var modalId = $(".modal-wrap.active").attr("id");
// 		$(".modal-wrap").removeClass("active");
// 		$("#overlay").hide();
// 		$("a.modal-open[href='#"+modalId+"']").focus();
// 	},
// 	'findFocusItem':function(area){
// 		return area.find("input, select, textarea, button, a");
// 	}

// };