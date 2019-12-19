$(document).ready(function(){
    $('.myslick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        responsive: [
          {
            breakpoint: 800,
            settings: {
              arrows: false,
              centerMode: false,
              slidesToShow: 1,
              arrows: true,
              dots: false
            }
          }]
      });
});
$(document).ready(function(){
  $('.cert-slider').slick({
    slidesToShow: 3,
    infinite: true,
    prevArrow: '<i class="material-icons prev2">keyboard_arrow_left</i>',
    nextArrow: '<i class="material-icons next2">keyboard_arrow_right</i>',
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: true,
          slidesToShow: 2
        }
      }]
  });
});
$(".butt2").click(function(){
      
  $("html").addClass("openNav");

});
$(".bcanc").click(function(){

$("html").removeClass("openNav");

});

let forma = document.getElementById("form_link");
let my_button = document.getElementById("my_button");
let button_type = document.getElementById("button_type");
let button_text = document.getElementById("button_text");
let name = document.getElementById("name");
let email = document.getElementById("email");
let comment = document.getElementById("comment");
let close_form = document.getElementById("close_form");
let arrow = document.getElementById("arrow");
let direction = 0;
getDataStorage();

var start;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  forma.style.height = Math.min(170 + progress/2, 370) + 'px';
  my_button.style.top = Math.min(115 + progress/2, 315) + 'px';
  close_form.style.width = Math.min(progress/15, 30) + 'px';
  close_form.style.height = close_form.style.width;
  if (progress > 0) {
    name.style.display = "block";
  }
  if (progress > 80) {
    email.style.display = "block";
  }
  if (progress > 160) {
    comment.style.display = "block";
    comment.style.height = Math.min(progress/2 - 80, 110) + 'px';
  }
  if (progress/2 - 80 > 110) {
    arrow.style.display = "block";
  }
  if (progress < 1000) {
    window.requestAnimationFrame(step);
  }
}

$(".butt3").click(function(){
  if (direction == 0) {
    start=null;
    window.requestAnimationFrame(step);
    button_text.innerHTML = "Send";
    history.pushState(1, "title", "#form_link");
    direction = 1;
    getDataStorage();
  }
  else {
    button_type.type = "submit";
  }
});

$(".slbutt").click(function(){
  forma.scrollIntoView({block: "center", behavior: "smooth"});
  $(".butt3").click();
});

function reverse_step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  forma.style.height = Math.max(170, 370 - progress/2) + 'px';
  my_button.style.top = Math.max(115, 315 - progress/2) + 'px';
  close_form.style.width = Math.max(0, 30 - progress/15) + 'px';
  close_form.style.height = close_form.style.width;
  if (progress > 0) {
    comment.style.height = Math.max(0, 110 - progress/2) + 'px';
  }
  if (progress/2 > 110) {
    comment.style.display = "none";
  }
  if (progress > 300) {
    email.style.display = "none";
  }
  if (progress/2 + 170 > 370) {
    name.style.display = "none";
  }
  if (progress < 1000) {
    window.requestAnimationFrame(reverse_step);
  }
}

$(".close_form").click(function(){
  start=null;
  arrow.style.display = "none";
  window.requestAnimationFrame(reverse_step);
  button_text.innerHTML = "Add Contacts";
  button_type.type = "button";
  history.pushState(0, "title", " ");
  direction = 0;
});

window.onpopstate = function(event) {
  if(event.state==1) {
    $(".butt3").click();
  }
  else {
    $(".close_form").click();
  }
};

function updateStorage() {
  localStorage.setItem("name", document.getElementById("name").value);
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("comment", $("#comment").val());
}

function getDataStorage() {
  document.getElementById("name").value = localStorage.getItem("name");
  document.getElementById("email").value = localStorage.getItem("email");
  $("#comment").val(localStorage.getItem("comment"));
}

window.addEventListener("DOMContentLoaded", function (event) {
  let profit = document.getElementById("form_link");
  profit.addEventListener("input", function(event) {
    updateStorage();
  });
});

