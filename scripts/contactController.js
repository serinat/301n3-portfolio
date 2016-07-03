(function(module) {
  var contactController = {};

  contactController.index = function() {
    $('.tab-content').hide();
    $('#contact').show();
  };

  module.contactController = contactController;
})(window);
