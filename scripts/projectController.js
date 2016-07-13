(function(module) {
  var projectController = {};

  // Project.createTable();

  projectController.index = function(ctx, next) {
    projectView.index(ctx.projects);
  };

  projectController.loadById = function(ctx, next) {
    var projectData = function(project) {
      ctx.projects = project;
      next();
    };
  //   Project.fetchAll(projectView.initIndexPage);
  //       $('.tab-content').hide();
  //       $('#projects').show();
  // };
    Project.findWhere('id', ctx.params.id, projectData);
  };

  projectController.loadByCategory = function(ctx, next) {
    var categoryData = function(projectsInCategory) {
      ctx.projects = projectsInCategory;
      next();
    };

    Project.findWhere('category', ctx.params.categoryName, categoryData);
  };

  projectController.loadAll = function(ctx, next) {
    var projectData = function(allProjects) {
      ctx.projects = Project.all;
      next();
    };

    if (Project.all.length) {
      ctx.projects = Project.all;
      next();
    } else {
      Project.fetchAll(projectData);
    }
  };

  module.projectController = projectController;
})(window);
