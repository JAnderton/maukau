### jshint white:false ###

'use strict'

$('.scroll-link').on 'click', (event) ->
  event.preventDefault()
  sectionID = $(this).attr("href")
  scrollToID(sectionID, 750)

scrollToID = (id, speed) ->
  offSet = 50
  targetOffset = $(id).offset().top - offSet
  mainNav = $("main-nav")
  $("html,body").animate({scrollTop:targetOffset}, speed)
  if (mainNav.hasClass("open"))
    mainNav.css("height", "1px").removeClass("in").addClass("collapse")
    mainNav.removeClass("open")

$(window).scroll ->
  windowScrollTopLocation = $(window).scrollTop()
  scrollChangePoint = $(window).height() / 10 * 4

  if (windowScrollTopLocation >= scrollChangePoint)
    $(".cover-container").each ->
      if ($(this).position().top <= windowScrollTopLocation + scrollChangePoint)
        activeElementId = $(this).attr('id')
        $(".nav-item.active").removeClass 'active'

        $(".nav-item").each ->
          navItem = $(this)
          $(this).children().each ->
            if ($(this).attr("href") == "#" + activeElementId)
              navItem.addClass 'active'
.scroll()
