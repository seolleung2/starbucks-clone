const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

// css 만으로는 돋보기 아이콘 클릭 시 인풋이 가려져 포커스가 안되기 때문에
// javascript 로 감싸고 있는 부모 요소 클릭 시 가려진 인풋의 포커스를 강제하기

searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});

// focus 의 반대 ->  blur
searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

const badgeEl = document.querySelector("header .badges");

// scroll 할 때마다 함수가 아주 짧은 시간내에 많이 실행해 버린다. 버벅임. 좋지 않음. lodash debounce 쓸 거같음
// 0.3 초 단위로 부하를 줘서 함수가 우르르 실행되는 것을 방지하는 lodash 의 throttle. 일정시간 내 한번씩만 실행되도록 제한을 걸음.

// _.throttle(함수, 시간)
window.addEventListener(
  "scroll",
  _.throttle(function () {
    // console.log("scroll!!", window.scrollY);

    if (window.scrollY > 500) {
      // badge 숨기기
      // badgeEl.style.display = "none";
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      // gsap.to(요소, 지속시간, 옵션);
    } else {
      // badge 보여주기
      // badgeEl.style.display = "block";
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
    }
  }, 300)
);

const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    // delay: 몇 초 뒤에 실행?
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});

// 공지사항 슬리이드 SWIPER JS
new Swiper(".notice-line .swiper", {
  direction: "vertical",
  autoplay: true, // 자동 실행 여부
  loop: true, // 반복 실행 여부
});

// 프로모션 이미지 슬라이드
new Swiper(".promotion .swiper", {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true,
  loop: true,
  // autoplay: {
  //   delay: 5000,
  // },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

// For Toggle Promotion Element
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
let isHidePromotion = false;

promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // isHidePromotion = false;
    // promotionEl.style.display = "none";
    promotionEl.classList.add("hide");
  } else {
    // isHidePromotion = true;
    // promotionEl.style.display = "block";
    promotionEl.classList.remove("hide");
  }
});
