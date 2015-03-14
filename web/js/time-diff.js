
/* jshint white:false */

(function() {
  'use strict';
  var meet_date;

  meet_date = '2010-03-27 11:30:00.000+0530';

  $('#met-time-diff').text(moment.preciseDiff(moment(meet_date)));

}).call(this);
