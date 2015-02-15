
/* jshint white:false */

(function() {
  'use strict';
  var scrollToID;

  $('.scroll-link').on('click', function(event) {
    var sectionID;
    event.preventDefault();
    sectionID = $(this).attr("href");
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
        var activeElementId;
        if ($(this).position().top <= windowScrollTopLocation + scrollChangePoint) {
          activeElementId = $(this).attr('id');
          $(".nav-item.active").removeClass('active');
          return $(".nav-item").each(function() {
            var navItem;
            navItem = $(this);
            return $(this).children().each(function() {
              if ($(this).attr("href") === "#" + activeElementId) {
                return navItem.addClass('active');
              }
            });
          });
        }
      });
    }
  }).scroll();

}).call(this);
