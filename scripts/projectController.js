(function(module) {
  var projectController = {};

  projectController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
        $('.tab-content').hide();
        $('#projects').show();
  };

  module.projectController = projectController;
})(window);
