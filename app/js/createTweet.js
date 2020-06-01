import API from "./API.js";
import Common from "./common.js";

let userId = Common.getUrlParam("user");

const submitBtn = document.querySelector(
  ".create_tweet_navigation button:nth-child(2)"
);

//create new tweet event
submitBtn.addEventListener("click", (e) => {
  const newTweetBody = document.querySelector("input#create").value;

  const newComment = {
    userId: parseInt(userId),
    content: `${newTweetBody}`,
    likes: 0,
    retweets: 0,
    date: Common.getCurrentDate(),
  };

  window.location.replace(`/index.html?user=${userId}`);
  return API.postTweet(newComment);
});

//previous page logic
let previousPageBtn = document.querySelector("button#previous_page_btn");
previousPageBtn.addEventListener("click", (e) => {
  window.location.replace(`/index.html?user=${userId}`);
});
