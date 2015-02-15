
/* jshint white:false */

(function() {
  'use strict';
  var scrollToID;

  $('.scroll-link').on('click', function(event) {
    var sectionID;
    event.preventDefault();
    sectionID = $(this).attr("href");
    console.log("Link clicked " + sectionID);
    return scrollToID(sectionID, 750);
  });

  scrollToID = function(id, speed) {
    var mainNav, offSet, targetOffset;
    offSet = 50;
    targetOffset = $(id).offset().top - offSet;
    mainNav = $("main-nav");
    $("html,body").animate({
      scrollTop: targetOffset
    }, speed);
    if (mainNav.hasClass("open")) {
      mainNav.css("height", "1px").removeClass("in").addClass("collapse");
      return mainNav.removeClass("open");
    }
  };

  $(window).scroll(function() {
    var scrollChangePoint, windowScrollTopLocation;
    windowScrollTopLocation = $(window).scrollTop();
    scrollChangePoint = $(window).height() / 10 * 4;
    if (windowScrollTopLocation >= scrollChangePoint) {
      return $(".cover-container").each(function() {
        if ($(this).position().top <= windowScrollTopLocation + scrollChangePoint) {
          $(".nav-item.active").removeClass('active');
          return $(".nav-item." + $(this).attr('id')).addClass('active');
        }
      });
    }
  }).scroll();

}).call(this);
