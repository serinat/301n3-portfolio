(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'github.com/user/repos?per_page=10&sorted=updated',
      type: 'GET',
      // headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        repos.all = data;
        callback(data);
      }
    // }).done(callback);
  });

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
