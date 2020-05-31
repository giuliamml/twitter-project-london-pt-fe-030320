import API from "./API.js";
import sharedEl from "./sharedEl.js";

// Your code here

API.getTweets().then((tweets) => {
  let tweetsList = tweets;
  console.log(tweetsList);

  const pageWrapper = document.querySelector(".tweets_wrapper");

  tweetsList.forEach((tweet) => {
    const tweetDiv = document.createElement("div");
    tweetDiv.className = "tweet";

    const tweetHeading = document.createElement("div");
    tweetHeading.className = "heading";
    tweetHeading.innerHTML = `<p>${tweet.user.name}</p>
                                <p>${tweet.date}</p>`;

    const tweetText = document.createElement("div");
    tweetText.className = "tweet_text";
    tweetText.innerHTML = `<p>${tweet.content}<p>`;

    //redirect to tweet page logic
    tweetText.addEventListener("click", () => {
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
      console.log(newRetweetsCount);
      incrementTweetInteraction(tweet.id, tweet.likes, newRetweetsCount);
      retweetBtnCount.innerText = `${parseInt(newRetweetsCount)}`;
      retweetBtn.style.backgroundImage = "url('./images/retweetVector.svg')";
      retweetBtnCount.style.color = "#DD00F0"; //not updating color on the span
    });

    //comment button
    let commentBtn = document.createElement("button");
    commentBtn.className = "comment_button";
    commentBtn.innerText = `${tweet.comments.length}`;
    commentBtn.style.backgroundImage = "url('./images/comment.svg')";
    commentBtn.style.backgroundRepeat = "no-repeat";

    commentBtn.addEventListener("click", (e) => {
      console.log("clicked");

      //post comment
      const postComment = (comment) => {
        return fetch(`http://localhost:3000/tweets/${tweetId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        })
          .then((response) => response.json())

          .then((data) => data)

          .catch((error) => console.log(error, "Oops something went wrong!"));
      };

      
      let directCommentForm = sharedEl.createDirectForm();
      tweetDiv.append(directCommentForm);
    });

    tweetInteractions.append(likeBtn, retweetBtn, commentBtn);
    tweetDiv.append(tweetHeading, tweetText, tweetInteractions);
    pageWrapper.append(tweetDiv);
  });
});

let params = new URL(document.location).searchParams;
let userId = params.get("user");
console.log(userId);

const userName = document.querySelector(".account_information h3:nth-child(1)");
const userTag = document.querySelector(".account_information p:nth-child(2)");

const getSelectedUser = async (url = "http://localhost:3000/users") => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let filteredUser = data.filter((user) => user.id == userId);
      userName.innerHTML = filteredUser[0].name;
      userTag.innerHTML = `@${filteredUser[0].name
        .split(" ")
        .join("")
        .toLowerCase()}`;
      console.log("filtered user >>>", filteredUser);
    });
};
getSelectedUser();

const createTweetBtn = document.querySelector("button#new_tweet");

const createTweet = () => {
  createTweetBtn.addEventListener("click", (e) => {
    console.log("clicked");
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
