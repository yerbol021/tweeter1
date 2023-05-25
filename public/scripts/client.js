$(document).ready(function() {
  console.log("ready");
  $('form').submit(function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    const tweetText = $(this).find('textarea').val();

    if (tweetText ==="" || tweetText === null){
      alert("Tweet area cannot be empty!");
      return;
    } else if (tweetText.length > 140) {
      alert("Sorry, max is 140 symbols");
      return;
    }

    $.post('/tweets', formData)
      .done(function(response) {
        console.log('ok');
      })
      .fail(function(error) {
        console.log('server error:', error);
      })
  });
  
  const createTweetElement = function(tweetData) {
  
    const tweetElement = `
  <article class="tweet">
  <header class="header2">
    <div class="imgName">
      <img src="${tweetData.user.avatars}">
      <h2 class="name">${tweetData.user.name}</h2>
    </div>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="message">
    <p>${tweetData.content.text}</p>
  </div>
  <hr>
  <footer>
    <span class="date">${timeago.format(tweetData.created_at)}</span>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
  </article>`
    return $(tweetElement);
  }
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);
    }
  }

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
    })
      .done(function(response) {
        console.log(response);
        renderTweets(response);
      });
  };

  loadTweets()
});
