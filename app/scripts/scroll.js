
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
    var offSet, targetOffset;
    offSet = 50;
    targetOffset = $(id).offset().top - offSet;
    return $("html,body").animate({
      scrollTop: targetOffset
    }, speed);
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
            var navItem, possibleMatch, _ref;
            navItem = $(this);
            _ref = $(this).children().filter(function() {
              return $(this).attr("href") === "#" + activeElementId;
            }), possibleMatch = _ref[0];
            if ((possibleMatch != null)) {
              return navItem.addClass('active');
            }
          });
        }
      });
    }
  }).scroll();

}).call(this);
