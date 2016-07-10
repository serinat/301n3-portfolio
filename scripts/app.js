(function(module){
  function Project(projectObj) {
    this.title = projectObj.title;
    this.publishedOn = projectObj.publishedOn;
    this.body = projectObj.body;
    this.category = projectObj.category;
  }

  Project.all = [];

  Project.prototype.toHtml = function () {
    var template = Handlebars.compile($('#myPortfolio').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published about ' + this.daysAgo + ' days ago' : '(draft)';
  // var templateScript = $('#myPortfolio').html();

    return template(this);
  };

//Function takes projectData and instantiates all the projects//
  Project.loadAll = function(projectData) {
    projectData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // projectData.forEach(function(ele) {
    //   Project.all.push(new Project(ele));

    //Transformation of one collection into another
    Project.all = projectData.map(function(ele) {
      return new Project(ele);
    });
  };
// Function retrieves data from either a local or remote source,
// processes it, then hands off control to the View.
  Project.fetchAll = function(callback) {
    if (localStorage.projectData) {
    //Function loads projectData once it is in local storage
      Project.loadAll(JSON.parse(localStorage.projectData));
    //Renders the index page
      // projectView.initIndexPage();
      callback();
    } else {
    //Retrieve the JSON file from the server with AJAX
      $.get('data/projects.json',function(projectData){
      //Store the resulting JSON data
        Project.loadAll(projectData);
      //Cache the data in localStorage to skip server call moving forward
        localStorage.projectData = JSON.stringify(projectData);
      //Render index page
        // projectView.initIndexPage();
        callback();
      });
    }
  };
  //Get a rough count of all words in all projects
  Project.numWordsAll = function() {
    return Project.all.map(function(project) {
    // Get the total number of words in this project
      return project.body.split(' ').length;
    })
  .reduce(function(a, b) {
    // Sum up all the values in the collection
    return a + b;
  });
  };

  Project.allProjects = function() {
    return Project.all.map(function(ele){
      return ele.title;
    })
  .reduce(function(a, b){
    if(a.indexOf(b) === -1) {
      a.push(b);
    }
    return a;
  },[]);
  };

  Project.numWordsByProject = function() {
    return Project.allProjects().map(function(title) {
      return {
        title : title,
        wordCount : Project.all.filter(function(value) {
          return value.title == title;
        })
        .map(function(ele){
          return ele.body.split(' ').length;
        }).reduce(function(a, b){
          return a + b;
        })
      };
    });
  };
  module.Project = Project;
})(window);
