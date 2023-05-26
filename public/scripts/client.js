$(document).ready(function() {
  console.log("ready");
  $('form').submit(function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    const tweetText = $(this).find('textarea').val();

    if (tweetText ==="" || tweetText === null){
      $('#error-message').text('⚠️  Tweet area cannot be empty! ⚠️ ').slideToggle('slow');
      return;
    } else if (tweetText.length > 140) {
      $('#error-message').text('⚠️  Sorry, max is 140 symbols ⚠️ ').slideToggle('slow');;
      return;
    }

    $.post('/tweets', formData)
      .done(function(response) {
        loadTweets(response)
      })
      .fail(function(error) {
        console.log('server error:', error);
      })
  });
  
  const createTweetElement = function(tweetData) {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const tweetElement = `
  <article class="tweet">
  <header class="header2">
    <div class="imgName">
      <img src="${escape(tweetData.user.avatars)}">
      <h2 class="name">${escape(tweetData.user.name)}</h2>
    </div>
    <span class="handle">${escape(tweetData.user.handle)}</span>
  </header>
  <div class="message">
    <p>${escape(tweetData.content.text)}</p>
  </div>
  <hr>
  <footer>
    <span class="date">${escape(timeago.format(tweetData.created_at))}</span>
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
    const tweetContainer = $('.tweets-container');
    const sortedTweets = tweets;
    sortedTweets.sort(function(a,b) {
      return b.created_at -a.created_at
    })

    console.log("these are sortedt tweet: ", sortedTweets );
    
    tweetContainer.empty();
    for (const tweet of sortedTweets) {
      const $tweet = createTweetElement(tweet);
      tweetContainer.append($tweet);
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
