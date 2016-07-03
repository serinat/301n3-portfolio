(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
  };

  module.homeController = homeController;
})(window);
