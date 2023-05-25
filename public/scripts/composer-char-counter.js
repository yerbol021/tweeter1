$(document).ready(function() {
  // console.log("readyChar");
  $("#tweet-text").on("input", function() {
    let textLength = $(this).val().length;
    let remainingChars = 140 - textLength;
    $(".counter").text(remainingChars);

    if (remainingChars < 0) {
      $(".counter").addClass("invalid");
    } else {
      $(".counter").removeClass("invalid");
    }
  });
});
