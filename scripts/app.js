var projects = [];

function Project(projectObj) {
  this.title = projectObj.title;
  this.publishedOn = projectObj.publishedOn;
  this.body = projectObj.body;
  this.category = projectObj.category;
}

Project.prototype.toHtml = function () {

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published about ' + this.daysAgo + ' days ago' : '(draft)';
  var templateScript = $('#myPortfolio').html();

  var template = Handlebars.compile(templateScript);

  return template(this);

//   var $newProject = $('project.template').clone();
//
//   $newProject.find('h2').text(this.title);
//   $newProject.find('time').text(this.publishedOn);
//   $newProject.find('.project-body').html(this.body);
//
//   $newProject.append('<hr>');
//
//   $newProject.removeClass('template');
//
//   return $newProject;
// };
};
$(document).ready(function() {
  projectData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    projects.push(new Project(ele));
  });
  projects.forEach(function(a){
    $('#projects').append(a.toHtml());
  });
});
