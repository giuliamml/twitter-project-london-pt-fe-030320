import API from "./API.js";
import Common from "./common.js";

let id = Common.getUrlParam("tweet");   

//simplified
const tweetBody = document.querySelector(".tweet_body p");
const tweetUserName = document.querySelector("div#text h3");
const tweetTag = document.querySelector("div#text p");
const likesCount = document.querySelector("button#likes > span");
const retweetCount = document.querySelector("button#retweet > span");
const commentCount = document.querySelector("button#comments > span");

const main = async () => {
  let tweet = await API.getTweet(id);

  tweetBody.innerText = tweet.content;
  tweetUserName.innerText = tweet.user.name;
  tweetTag.innerHTML = `@${tweet.user.name
    .split(" ")
    .join("")
    .toLowerCase()}`;

  likesCount.innerText = `${tweet.likes}`;
  retweetCount.innerText = `${tweet.retweets}`;
  commentCount.innerText = `${tweet.comments.length}`;

  let commentsWrapper = document.querySelector("div.comments_wrapper");
  tweet.comments.forEach((comment) => {
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

  //direct comment logic
  let commentBtn = document.querySelector("button#comments");
  commentBtn.addEventListener("click", (e) => {
    console.log("clicked");
    e.preventDefault();

    const tweetDiv = document.querySelector("div.selected_tweet");

    let commentForm = document.createElement("form");
    commentForm.className = "direct_comment_form";
    commentForm.id = "single_tweet_page";

    let commentInput = document.createElement("input");
    commentInput.className = "direct_comment_text";
    commentInput.setAttribute("type", "text");
    commentInput.placeholder = "Your Comment";
    commentInput.id = "single_tweet_page";

    let backBtn = document.createElement("button");
    backBtn.className = "remove_div_btn";
    backBtn.style.backgroundImage = "url('./images/Arrow 1.svg')";
    backBtn.style.backgroundRepeat = "no-repeat";

    let commentSubmit = document.createElement("input");
    commentSubmit.className = "direct_comment_submit";
    commentSubmit.setAttribute("type", "submit");
    commentSubmit.id = "single_tweet_page";
    commentSubmit.value = "Tweet";

    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.replace(`/tweet_page.html?tweet=${tweetId}`);
    });

    commentForm.append(
      commentInput,
      backBtn,
      commentSubmit
    );

    tweetDiv.append(commentForm);

    //create new comment
    commentSubmit.addEventListener("click", async (e) => {
      e.preventDefault();

      const newComment = {
        tweetId: id,
        userId: userId,
        content: commentInput.value,
        date: Common.getCurrentDate(),
      };

      await API.postComment(id, newComment);

      window.location.replace(`/tweet_page.html?tweet=${id}`);

    });
  });

  //back to home button
  const previousPageBtn = document.querySelector("button#previous_page");
  let userId = tweet.userId;
  previousPageBtn.addEventListener("click", (e) =>
    window.location.replace(`/index.html?user=${userId}`)
  );
};

main();
