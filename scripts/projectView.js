var projectView = {};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

$(document).ready(function() {
  projectView.handleMainNav();
});
// $('.main-nav').on('click', '.tab', function(e) {
//   e.preventDefault();
//   $('.tab-content').hide();
//   var $link = $(this).data('content');
//   $('#' + $link).fadeIn();
// });
