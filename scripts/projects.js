// var projectData = [
//   {
//     title: 'First Thursday Gallery Finder',
//     publishedOn: '2016-02-25',
//     body: '<p>An interactive map using geolocation, gallery details, and searchbox for art walk visitors. Check it out <a href=\'http://lillianszugyi.github.io/art-gallery-finder/\'>here</a></p>',
//     category: 'Art'
//   },
//   {
//     title: 'Cookie-Stand by Pat',
//     publishedOn: '2016-02-07',
//     body: '<p>First real-world application website for salmon cookie shops opened by Pat. Check it out <a href =\'http://serinat.github.io/cookie-stand/\'>here</a></p>',
//     category: 'Food'
//   }
// ];
(function(module) {
  function Project (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Project.all = [];

  Project.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS projects (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'author VARCHAR(255) NOT NULL, ' +
        'authorUrl VARCHAR (255), ' +
        'category VARCHAR(20), ' +
        'publishedOn DATETIME, ' +
        'body TEXT NOT NULL);',
      callback
    );
  };

  Project.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM projects WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
    callback
  );
  };

  Project.allProjects = function() {
    return Project.all.map(function(project) {
      return project.project;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Project.allCategories = function(callback) {
    webDB.execute('SELECT DISTINCT category FROM projects;', callback);
  };

  module.Project = Project;
})(window);
