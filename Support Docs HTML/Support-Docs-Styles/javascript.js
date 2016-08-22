/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });

  // show form controls when the textarea receives focus
  $(".answer-body textarea").one("focus", function() {
    $(".answer-form-controls").show();
  });

  $(".comment-container textarea").one("focus", function() {
    $(".comment-form-controls").show();
  });

  $("ul.article-list li a").each(function(i, e) {
    var e = $(e);
    var link = e.attr('href');
    var path = window.location.pathname;
    if (path.indexOf(link) > -1) {
      e.parent().addClass('active');
      // $('.sidebar-container').scrollTop(e.offset().top - 134);
    }
  });

  // Given a jquery element, animates that element to the proper container size
  var expandContainer = function(elem, innerHeight, dur) {
    var header = elem.find('> h3');
    var section = elem.find('> ul');
    var target = header.outerHeight(true);
    if (innerHeight != undefined) {
      target += innerHeight;
    } else if (!elem.hasClass('closed-section')) {
      target += section.outerHeight(true);
    }
    elem.animate({
      height: target + 'px'
    }, dur || 200);
  }

  var expandableTopSection = function(e, topSections) {
    var elem = $(e);
    var header = elem.find('> h3');
    header.click(function() {
      // Close all other top sections
      topSections.each(function(i, e2) {
        if (e != e2) {
          var local = $(e2);
          local.addClass('closed-section');
          expandContainer(local);
        }
      });
      // Toggle the state of the clicked tab
      elem.toggleClass('closed-section');
      expandContainer(elem);
    });
  }

  var expandableInnerSection = function(e, innerSections) {
    var elem = $(e);
    var header = elem.find('> h3');
    header.click(function() {
      // Close all other inner sections
      innerSections.each(function(i, e2) {
        if (e != e2) {
          var local = $(e2);
          local.addClass('closed-section');
          expandContainer(local);
        }
      });
      // Toggle the state of the clicked tab
      elem.toggleClass('closed-section');
      expandContainer(elem);
      // Compute the expected "close height" of the other tabs
      var revisionContainer = elem.parent().parent();
      var sections = revisionContainer.find('li.section');
      var expectedHeight = 0;
      for (var i = 0; i < sections.length; i++) {
        var section = $(sections[i]);
        var header = section.find('> h3');
        var articleList = section.find('> ul.article-list');
        expectedHeight += header.outerHeight(true);
        if (!section.hasClass('closed-section')) {
          expectedHeight += articleList.outerHeight(true);
        }
      }
      // Resize the parent container appropriately
      expandContainer(revisionContainer, expectedHeight);
    });
  }

  var startClosed = function(i, e) {
    var elem = $(e);
    if (elem.find('ul.article-list > li.active').length == 0) {
      elem.addClass('closed-section');
      expandContainer(elem, undefined, 1);
    }
  }

  var innerSections = $('ul.printer-section-list > li.section');
  innerSections.each(function(i, e) { expandableInnerSection(e, innerSections); });
  innerSections.each(startClosed);
  var topSections = $('li.printer-revision');
  topSections.each(function(i, e) { expandableTopSection(e, topSections); });
  topSections.each(startClosed);

});
