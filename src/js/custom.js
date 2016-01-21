/////////////////
/// JS TABS
/////////////////

$(document).ready(function () {

  //PrettyPhoto (used for videos)
  $("a[rel^='prettyPhoto']").prettyPhoto({
    social_tools: '',
    deeplinking: false
  });

  //Rel="external" links open new tab
  $("a[rel*='external']").attr({'target': '_blank'});

  //Navigation toggling
  var $navigation = $('.navigation');

  $navigation.each(function () {
    $thisNav = $(this);

    $thisNav.find('.navigation-toggle, .close').on('click', function () {
      $thisNav.toggleClass('open');
    });

    $thisNav.find('.navigation-list a').on('click', function () {
      $thisNav.removeClass('open');
    });
  });

  var tabs_data = [];

  //Tabs are scoped to the page level
  $('.page').each(function () {

    //Initialize variables
    var $page,
      $tabs_handles,
      $tabs_contents,
      matched_pairs;

    //Default variable values
    $page = $(this);

    $tabs_handles = $page.find('a.tab-handle');
    $tabs_contents = $page.find('.tab-content');

    matched_pairs = [];

    //Show first tab by default and hide the rest
    $tabs_contents.not(':eq(0)').addClass('tab-hide');

    $tabs_handles.each(function () {
      var $handle = $(this);
      var thisHref = $handle.attr('href');

      //If it's a hash fragment URL (e.g. #videography)
      if (0 === thisHref.indexOf('#')) {
        //just to be proper, reassemble ID selector (even though hash hrefs start with #);
        var hash = thisHref.slice(1);

        var $match = $tabs_contents.filter('#' + hash); 

        if(1 === $match.length) {
          var data_obj = {
            hash: hash,
            title: $handle.find('.full').text(),
            handle: $handle,
            content: $match,
            activateMe: function () {
              $tabs_handles.not(this.handle).removeClass('active');
              this.handle.addClass('active');

              $tabs_contents.not(this.content).addClass('tab-hide');
              this.content.removeClass('tab-hide');
            }
          };

          matched_pairs.push(data_obj);
          tabs_data.push(data_obj);
        }
        else
        {
          console.warn('Multiple matches found for ' + thisHref);
        }
      }
    });

    //Begin linking elements with jquery code
    $.each(matched_pairs, function (i, o) {
      o.handle.on('click', function (event) {
        //disable jump links
        event.preventDefault();

        o.activateMe();
      });
    });

    if(matched_pairs.length > 0) {
      matched_pairs[0].activateMe();
    }
  });

  // console.log(tabs_data);


  $(window).on('load hashchange', function() {
    var newHash = (window.location.hash.length > 1) ? window.location.hash.slice(1) : null;
    // console.log(newHash);

    for(var i = 0; i < tabs_data.length; i++) {
      var o = tabs_data[i];
      if (newHash == o.hash) {
        o.activateMe();
          console.log($(o.handle).closest('.page').offset().top);
          $(window).scrollTop(
            $(o.handle).closest('.page').offset().top
          );
      }


    }
  });


  //Contact page marquee
  $('.page-contact .page-title-area').marquee({
    duplicated: true,
    duration: 10000,
    gap: 0,
  });
});
