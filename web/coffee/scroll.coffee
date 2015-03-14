### jshint white:false ###

'use strict'

$('.scroll-link').on 'click', (event) ->
    event.preventDefault()
    sectionID = $(this).attr("href")
    scrollToID(sectionID, 750)

scrollToID = (id, speed) ->
    offSet = 50
    targetOffset = $(id).offset().top - offSet
    $("html,body").animate({scrollTop: targetOffset}, speed)

markElementActive = (element) ->
    $('.nav-item.active').removeClass 'active'
    element.addClass 'active'

hasMovedSignificantlyDownThePage = (windowScrollTopLocation, scrollChangePoint) ->
    return windowScrollTopLocation >= scrollChangePoint

elementInScrollArea = (element, windowScrollTopLocation, scrollChangePoint) ->
    return (element.position().top <= windowScrollTopLocation + scrollChangePoint)

$(window).scroll ->
    windowScrollTopLocation = $(window).scrollTop()
    scrollChangePoint = $(window).height() / 10 * 4

    if (hasMovedSignificantlyDownThePage(windowScrollTopLocation, scrollChangePoint))
        $(".cover-container").each ->
            containerElement = $(this)
            if (elementInScrollArea(containerElement, windowScrollTopLocation, scrollChangePoint))
                activeElementId = containerElement.attr('id')

                $(".nav-item").each ->
                    navItem = $(this)
                    [possibleMatch, ...] = navItem.children().filter ->
                        $(this).attr("href") == "#" + activeElementId
                    if (possibleMatch?)
                        markElementActive(navItem)
    else
        markElementActive($("#homeLink"))

.scroll()
