
/* jshint white:false */

(function() {
  'use strict';
  var elementInScrollArea, hasMovedSignificantlyDownThePage, markElementActive, scrollToID;

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

  markElementActive = function(element) {
    $('.nav-item.active').removeClass('active');
    return element.addClass('active');
  };

  hasMovedSignificantlyDownThePage = function(windowScrollTopLocation, scrollChangePoint) {
    return windowScrollTopLocation >= scrollChangePoint;
  };

  elementInScrollArea = function(element, windowScrollTopLocation, scrollChangePoint) {
    return element.position().top <= windowScrollTopLocation + scrollChangePoint;
  };

  $(window).scroll(function() {
    var scrollChangePoint, windowScrollTopLocation;
    windowScrollTopLocation = $(window).scrollTop();
    scrollChangePoint = $(window).height() / 10 * 4;
    if (hasMovedSignificantlyDownThePage(windowScrollTopLocation, scrollChangePoint)) {
      return $(".cover-container").each(function() {
        var activeElementId, containerElement;
        containerElement = $(this);
        if (elementInScrollArea(containerElement, windowScrollTopLocation, scrollChangePoint)) {
          activeElementId = containerElement.attr('id');
          return $(".nav-item").each(function() {
            var navItem, possibleMatch, _ref;
            navItem = $(this);
            _ref = navItem.children().filter(function() {
              return $(this).attr("href") === "#" + activeElementId;
            }), possibleMatch = _ref[0];
            if ((possibleMatch != null)) {
              return markElementActive(navItem);
            }
          });
        }
      });
    } else {
      return markElementActive($("#homeLink"));
    }
  }).scroll();

}).call(this);
