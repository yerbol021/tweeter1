const createTweetElement = function(tweetData) {
  const tweetElement = `
<article class="tweets-container">
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
  <span class="date">${tweetData.created_at}</span>
  <div class="icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
  </div>
</footer>
</article>`
return tweetElement;
}

const tweetData = 
{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet);

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}