var projects = [];

function Project(projectObj) {
  this.title = projectObj.title;
  this.publishedOn = projectObj.publishedOn;
  this.body = projectObj.body;
}

Project.prototype.toHtml = function () {
  var $newProject = $('project.template').clone();

  $newProject.find('h2').text(this.title);
  $newProject.find('time').text(this.publishedOn);
  $newProject.find('.project-body').html(this.body);

  $newProject.append('<hr>');

  $newProject.removeClass('template');

  return $newProject;
};

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
