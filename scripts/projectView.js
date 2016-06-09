var projectView = {};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    console.log($(this).data('content'));
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

$(document).ready(function() {
  $(projectView.handleMainNav());
});
// $('.main-nav').on('click', '.tab', function(e) {
//   e.preventDefault();
//   $('.tab-content').hide();
//   var $link = $(this).data('content');
//   $('#' + $link).fadeIn();
// });
