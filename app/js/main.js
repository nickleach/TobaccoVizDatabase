$('#map').usmap({
  // The click action
  click: function(event, data) {
    $('#clicked-state')
      .text('You clicked: '+data.name)
      .parent().effect('highlight', {color: '#C7F464'}, 2000);
  }
});
