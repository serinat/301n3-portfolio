(function(module) {

  var projectView = {};

  // projectView.handleMainNav = function() {
  //   $('.main-nav').on('click', '.tab', function() {
  //     $('.tab-content').hide();
  //   // console.log($(this).data('content'));
  //     $('#' + $(this).data('content')).fadeIn();
  //   });
  //
  //   $('.main-nav .tab:first').click();
  // };

  var render = function(project) {
    var template = Handlebars.compile($('#myPortfolio-template').text());

    project.daysAgo = parseInt((new Date() - new Date(project.publishedOn)) / 60 / 60 / 24 / 1000);
    project.publishStatus = project.publishedOn ? 'published ' + project.daysAgo + ' days ago' : '(draft)';
    project.body = marked(project.body);

    return template(project);
  };

  // projectView.populateFilters = function() {
  //   $('project').each(function() {
  //     if (!$(this).hasClass('template')) {
  //       var val = $(this).find('h2').text();
  //       var optionTag = '<option value="' + val + '">' + val + '</option>';
  //       $('#project-filter').append(optionTag);
  //
  //       val = $(this).attr('data-category');
  //       optionTag = '<option value="' + val + '">' + val + '</option>';
  //       if ($('#category-filter option[value="' + val + '"]').length === 0) {
  //         $('#category-filter').append(optionTag);
  //       }
  //     }
  //   });
  // };

  projectView.populateFilters = function() {
    var options,
      template = Handlebars.compile($('#repo-template').text());

    options = Project.allProjects().map(function(project) { return template({val: project}); });
    if ($('#project-filter option').length < 2) {
      $('#project-filter').append(options);
    };

    Project.allCategories(function(rows) {
      if ($('#category-filter option').length < 2) {
        $('#category-filter').append(
            rows.map(function(row) {
              return template({val: row.category});
            })
          );
      };
    });
  };

  // projectView.handleProjectFilter = function() {
  //   $('#project-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('project').hide();
  //     //$('project[data-project="' + $(this).val() + '"]').fadeIn();
  //       $('h2:contains(" ' + $ (this).val() + ' ")').parent().fadeIn();
  //     } else {
  //       $('project').fadeIn();
  //       $('project.template').hide();
  //     }
  //     $('#category-filter').val('');
  //   });
  // };

  // projectView.handleCategoryFilter = function() {
  //   $('#category-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('project').hide();
  //       $('project[data-category="' + $(this).val() + '"]').fadeIn();
  //     } else {
  //       $('project').fadeIn();
  //       $('project.template').hide();
  //     }
  //     $('#project-filter').val('');
  //   });
  // };

  projectView.handleFilters = function() {
    $('#filters').one('change', 'select', function() {
      resource = this.id.replace('-filter', '');
      page('/' + resource + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

  $('.ion-navicon-round').click(function() {
    $('.main-nav ul').toggle();
  });

  // projectView.initIndexPage = function() {
  //     $('#projects').empty();
  //   Project.all.forEach(function(a){
  //     $('#projects').append(render(a));
  //   });

// $(document).ready(function() {
    // projectView.handleMainNav();
  //   projectView.populateFilters();
  //   projectView.handleCategoryFilter();
  //   projectView.handleProjectFilter();
  // };

  projectView.index = function(projects) {
    $('#projects').show().siblings().hide();

    $('#projects project').remove();
    projects.forEach(function(a) {
      $('#projects').append(render(a));
    });

    projectView.populateFilters();

    projectView.handleFilters();

    if ($('#projects project').length > 1) {
      $('.project-body *:nth-of-type(n+2)').hide();
    }
  };

  projectView.initAdminPage = function() {
    var template = Handlebars.compile($('#project-template').html());

    Project.numWordsByProject().forEach(function(stat) {
      $('.project-stats').append(template(stat));
    });

    $('#project-stats .projects').text(Project.all.length);
    $('#project-stats .words').text(Project.numWordsAll());
  };

  module.projectView = projectView;
})(window);
