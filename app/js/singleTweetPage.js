import API from "./API.js";

let params = new URL(document.location).searchParams;
let tweetId = params.get("tweet");
console.log(tweetId);

const selectedTweetUserName = document.querySelector("div#text h3");
const selectedTweetTag = document.querySelector("div#text p");
const selectedTweetBody = document.querySelector(".tweet_body p");

const selectedTweetLikesCount = document.querySelector("button#likes > span");
const selectedTweetRetweetsCount = document.querySelector(
  "button#retweet > span"
);
const selectedTweetCommentsCount = document.querySelector(
  "button#comments > span"
);

API.getTweets().then((tweets) => console.log(tweets));

const getSelectedTweet = (
  url = "http://localhost:3000/tweets?_expand=user&_embed=comments"
) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let selectedTweet = data.filter((tweet) => tweet.id == tweetId);
      selectedTweetBody.innerText = selectedTweet[0].content;
      selectedTweetUserName.innerText = selectedTweet[0].user.name;
      selectedTweetTag.innerHTML = `@${selectedTweet[0].user.name
        .split(" ")
        .join("")
        .toLowerCase()}`;

      selectedTweetLikesCount.innerText = `${selectedTweet[0].likes}`;
      selectedTweetRetweetsCount.innerText = `${selectedTweet[0].retweets}`;
      selectedTweetCommentsCount.innerText = `${selectedTweet[0].comments.length}`;
      console.log("filtered user >>>", selectedTweet);

      //comments logic

      const getSelectedTweet = (
        url = `http://localhost:3000/tweets/${tweetId}/comments?_expand=user`
      ) => {
        fetch(url)
          .then((response) => response.json())
          .then((richComments) => {
            console.log("comment data", richComments);
            let tweetCommentsArray = richComments;
            console.log(tweetCommentsArray);
            tweetCommentsArray.forEach((comment) => {
              let commentsWrapper = document.querySelector("div.comments_wrapper");
      
              let commentDiv = document.createElement("div");
              commentDiv.className = "comment_div";
              let commentUserData = document.createElement("div");
              commentUserData.className = "comment_user_data";
              let commentUserAvatar = document.createElement("img");
              commentUserAvatar.className = "comment_user_avatar";
              commentUserAvatar.src = "./images/Avatar.svg";
              //add username and avatar logic
              let commentUserName = document.createElement("p");
              commentUserName.className = "comment_username";
              commentUserName.innerText = `${comment.user.name}`;
              let commentUserTagName = document.createElement("p");
              commentUserTagName.className = "comment_tagname";
              commentUserTagName.innerText = `@${comment.user.name
                .split(" ")
                .join("")
                .toLowerCase()}`;
              let commentBody = document.createElement("p");
              commentBody.className = "comment_body";
              commentBody.innerText = `${comment.content}`;
      
              let pinkLine = document.createElement("div");
              pinkLine.className = "pink_line";
              let whiteLine = document.createElement("div");
              whiteLine.className = "white_line";
      
              commentUserData.append(
                commentUserAvatar,
                commentUserName,
                commentUserTagName,
                pinkLine,
                whiteLine
              );
              commentDiv.append(commentUserData, commentBody);
              commentsWrapper.append(commentDiv);
            });
          });
      };
      getSelectedTweet();

      

 
      //direct comment logic
      let directCommentBtn = document.querySelector("button#comments");
      directCommentBtn.addEventListener("click", (e) => {
        console.log("clicked");

        const selectedTweet = document.querySelector("div.selected_tweet");

        let directCommentForm = document.createElement("form");
        directCommentForm.className = "direct_comment_form";
        directCommentForm.id = "single_tweet_page";

        let directCommentInput = document.createElement("input");
        directCommentInput.className = "direct_comment_input";
        directCommentInput.setAttribute("type", "text");
        directCommentInput.placeholder = "Your Comment";
        directCommentInput.id = "single_tweet_page";

        let removeDivBtn = document.createElement("button");
        removeDivBtn.className = "remove_div_btn";
        removeDivBtn.style.backgroundImage = "url('./images/Arrow 1.svg')";
        removeDivBtn.style.backgroundRepeat = "no-repeat";

        let directCommentSubmit = document.createElement("input");
        directCommentSubmit.className = "direct_comment_submit";
        directCommentSubmit.setAttribute("type", "submit");
        directCommentSubmit.id = "single_tweet_page";
        directCommentSubmit.value = "Tweet";

        removeDivBtn.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.replace(`/tweet_page.html?tweet=${tweetId}`);
        });

        directCommentForm.append(
          directCommentInput,
          removeDivBtn,
          directCommentSubmit
        );

        selectedTweet.append(directCommentForm);
      });

      //back to home button
      const previousPageBtn = document.querySelector("button#previous_page");
      let userId = selectedTweet[0].userId;
      previousPageBtn.addEventListener("click", (e) =>
        window.location.replace(`/index.html?user=${userId}`)
      );
    });
};
getSelectedTweet();
