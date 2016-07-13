page('/', homeController.index);

// page('/projects',
//   projectController.loadAll,
//   projectController.index);

page('/about', aboutController.index);

page('/project/:id',
  projectController.loadById,
  projectController.index);

page('/project', '/');
page('/category', '/');

page('/category/:categoryName',
  projectController.loadByCategory,
  projectController.index);

page('/project/:projectName',
  projectController.loadByProject,
  projectController.index);

page('/contact', contactController.index);

page();
