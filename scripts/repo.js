(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'github/user/repos?per_page=10&sorted=updated',
      type: 'GET',
      // headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        console.log(data);
        repos.all = data;
        callback(data);
      }
    });
  };

  repos.with = function(attr) {
    console.log(repos.all);
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
