const createTweetElement = function(tweet) {
  const tweetElement = `
<article class="tweets-container">
<header class="header2">
  <div class="imgName">
    <img src="${tweet.user.avatars}">
    <h2 class="name">${tweet.user.name}</h2>
  </div>
  <span class="handle">${tweet.user.handle}</span>
</header>
<div class="message">
  <p>${tweet.content.text}</p>
</div>
<hr>
<footer>
  <span class="date">${tweet.created_at}</span>
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