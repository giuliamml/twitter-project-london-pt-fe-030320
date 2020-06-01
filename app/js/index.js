import API from "./API.js";
import sharedEl from "./sharedEl.js";
import Common from "./common.js";

let userId = Common.getUrlParam("user");
console.log(userId);

// Your code here

API.getTweets().then((tweets) => {
  let tweetsList = tweets;
  const pageWrapper = document.querySelector(".tweets_wrapper");

  tweetsList.forEach((tweet) => {
    const tweetDiv = document.createElement("div");
    tweetDiv.className = "tweet";

    const tweetHeading = document.createElement("div");
    tweetHeading.className = "heading";
    tweetHeading.innerHTML = `<p>${tweet.user.name}</p>
                                <p>${tweet.date}</p>`;

    const tweetContent = document.createElement("div");
    tweetContent.className = "tweet_text";
    tweetContent.innerHTML = `<p>${tweet.content}<p>`;

    //redirect to single tweet page
    tweetContent.addEventListener("click", () => {
      window.location.replace(`/tweet_page.html?tweet=${tweet.id}`);
    });

    //interactions div
    const tweetInteractions = document.createElement("div");
    tweetInteractions.id = "interactions";

    //like button
    let likeBtn = document.createElement("button");
    likeBtn.className = "like_button";

    let likeBtnCount = document.createElement("span");
    likeBtnCount.innerText = `${tweet.likes}`;
    likeBtn.style.backgroundImage = "url('./images/like.svg')";
    likeBtn.style.backgroundRepeat = "no-repeat";

    likeBtn.append(likeBtnCount);

    likeBtn.addEventListener("click", (e) => {
      let newLikesCount = `${parseInt(tweet.likes) + Number(1)}`;

      incrementTweetInteraction(tweet.id, newLikesCount, tweet.retweets);

      likeBtnCount.innerText = `${newLikesCount}`;
      likeBtn.style.backgroundImage = "url('./images/likeVector.svg')";
      likeBtnCount.style.color = "#DD00F0";
    });

    //retweet button
    let retweetBtn = document.createElement("button");
    retweetBtn.className = "retweet_button";

    let retweetBtnCount = document.createElement("span");
    retweetBtnCount.innerText = `${tweet.retweets}`;
    retweetBtn.style.backgroundImage = "url('./images/retweet.svg')";
    retweetBtn.style.backgroundRepeat = "no-repeat";

    retweetBtn.append(retweetBtnCount);

    retweetBtn.addEventListener("click", (e) => {
      let newRetweetsCount = `${parseInt(tweet.retweets) + Number(1)}`;

      incrementTweetInteraction(tweet.id, tweet.likes, newRetweetsCount);

      retweetBtnCount.innerText = `${parseInt(newRetweetsCount)}`;
      retweetBtn.style.backgroundImage = "url('./images/retweetVector.svg')";
      retweetBtnCount.style.color = "#DD00F0";
    });

    //comment button
    let commentBtn = document.createElement("button");
    commentBtn.className = "comment_button";
    commentBtn.innerText = `${tweet.comments.length}`;
    // not updating right amount, fetch on different db
    commentBtn.style.backgroundImage = "url('./images/comment.svg')";
    commentBtn.style.backgroundRepeat = "no-repeat";

    commentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //create comment form
      let directCommentForm = sharedEl.createDirectForm();
      tweetDiv.append(directCommentForm);
      console.log(tweet.id);

      let submitBtn = document.querySelector("input.direct_comment_submit");
      submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let commentBody = document.querySelector("input.direct_comment_input");

        const newComment = {
          tweetId: tweet.id,
          userId: userId,
          content: commentBody.value,
          date: Common.getCurrentDate(),
        };

        //post comment
        await API.postComment(tweet.id, newComment);
        window.location.replace(`index.html?user=${userId}`);
      });
    });

    tweetInteractions.append(likeBtn, retweetBtn, commentBtn);
    tweetDiv.append(tweetHeading, tweetContent, tweetInteractions);
    pageWrapper.append(tweetDiv);
  });
});

//get user data and render them
const userName = document.querySelector(".account_information h3:nth-child(1)");
const userTag = document.querySelector(".account_information p:nth-child(2)");

API.getUserData(userId, userName, userTag);

//redirect to create tweet page
const createTweetBtn = document.querySelector("button#new_tweet");

const createTweet = () => {
  createTweetBtn.addEventListener("click", (e) => {
    window.location.replace(`/create_tweet.html?user=${userId}`);
  });
};
createTweet();

const incrementTweetInteraction = (
  id,
  updatedLikesCount,
  updatedRetweetsCount
) => {
  let newTweet = {
    likes: updatedLikesCount,
    retweets: updatedRetweetsCount,
  };

  return fetch(`http://localhost:3000/tweets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTweet),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return "Oops we couldn't update that!";
      }
    })

    .catch((error) => {
      return "Oops we couldn't update that!";
    });
};
