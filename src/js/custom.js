/////////////////
/// JS TABS
/////////////////

$(document).ready(function () {

  //Tabs are scoped to the page level
  $('.page').each(function () {
    var $page = $(this);

    var $tabs_handles = $page.find('a.tab-handle');
    var $tabs_contents = $page.find('.tab-content');

    //Show first tab by default and hide the rest
    $tabs_contents.not(':eq(0)').addClass('tab-hide');

    var matched_pairs = [];

    $tabs_handles.each(function () {
      var $handle = $(this);
      var thisHref = $handle.attr('href');

      //If it's a hash fragment URL (e.g. #videography)
      if (0 === thisHref.indexOf('#')) {
        var $match = $tabs_contents.filter('#' + thisHref.slice(1));

        if(1 === $match.length) {
          matched_pairs.push({
            handle: $handle,
            content: $match
          });
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

        $tabs_handles.not(o.handle).removeClass('active');
        o.handle.addClass('active');

        $tabs_contents.not(o.content).addClass('tab-hide');
        o.content.removeClass('tab-hide');
      });
    });

    $tabs_handles.filter(':eq(0)').addClass('active');
    $tabs_contents.not(':eq(0)').addClass('tab-hide');

    // console.log(
    //   $page.find('.page-title').text(),
    //   $tabs_handles.length,
    //   $tabs_contents.length,
    //   matched_pairs.length
    // );

  });

})
