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

  projectView.populateFilters = function() {
    $('project').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('h2').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        $('#project-filter').append(optionTag);

        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  projectView.handleProjectFilter = function() {
    $('#project-filter').on('change', function() {
      if ($(this).val()) {
        $('project').hide();
      //$('project[data-project="' + $(this).val() + '"]').fadeIn();
        $('h2:contains(" ' + $ (this).val() + ' ")').parent().fadeIn();
      } else {
        $('project').fadeIn();
        $('project.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('project').hide();
        $('project[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('project').fadeIn();
        $('project.template').hide();
      }
      $('#project-filter').val('');
    });
  };

  $('.ion-navicon-round').click(function() {
    $('.main-nav ul').toggle();
  });

  projectView.initIndexPage = function() {
      $('#projects').empty();
    Project.all.forEach(function(a){
      $('#projects').append(render(a));
    });

// $(document).ready(function() {
    // projectView.handleMainNav();
    projectView.populateFilters();
    projectView.handleCategoryFilter();
    projectView.handleProjectFilter();
  };

  projectView.initAdminPage = function() {
    Project.numWordsByProject().forEach(function(stat) {
      var template = Handlebars.compile($('#project-template').html());
      $('.project-stats').append(template(stat));
    });

    $('#project-stats .projects').text(Project.all.length);
    $('#project-stats .words').text(Project.numWordsAll());
  };

  module.projectView = projectView;
})(window);
