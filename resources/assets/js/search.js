$(function() {
      var availableTags = [
      {label: "ActionScript"},
      {label: "AppleScript"},
      {label: "Asp"},
      {label: "BASIC"},
      {label: "C"},
      {label: "C++"},
      {label: "Clojure"},
      {label: "COBOL"},
      {label: "ColdFusion"},
      {label: "Erlang"},
      {label: "Fortran"},
      {label: "Groovy"},
      {label: "Haskell"},
      {label: "Java"},
      {label: "JavaScript"},
      {label: "Lisp"},
      {label: "Perl"},
      {label: "PHP"},
      {label: "Python"},
      {label: "Ruby"},
      {label: "Scala"},
      {label: "Scheme"}
    ];

      $("#site-search").autocomplete({
            source: availableTags
      }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .data( "ui-autocomplete-item", item )
          .append('<a href="#">' + item.label + '</a>')
          .appendTo( ul );
      };

      $("#site-search-wrap").bind("autocompleteopen", function(event, ui) {
          $(this).addClass("tips-opened");
      });

      $('#site-search-wrap').bind("autocompleteclose", function(event, ui) {
          $(this).removeClass("tips-opened");
      });
});