let params = new URL(document.location).searchParams;
let userId = params.get("user");
console.log(userId);

//post tweet (not comment)
const postComment = (comment) => {
  return fetch("http://localhost:3000/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())

    .then((data) => data)

    .catch((error) => console.log("Oops something went wrong!"));
};

const submitCommentBtn = document.querySelector(
  ".create_tweet_navigation button:nth-child(2)"
);

//create new tweet (not comment)
submitCommentBtn.addEventListener("click", (e) => {
  const newCommentBody = document.querySelector("input#create").value;

  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const newComment = {
    userId: parseInt(`${userId}`),
    content: `${newCommentBody}`,
    likes: 0,
    retweets: 0,
    date: `${date}`,
  };
  window.location.replace(`/index.html?user=${userId}`);
  return postComment(newComment);
});

//previous page logic
let previousPageBtn = document.querySelector("button#previous_page_btn");
previousPageBtn.addEventListener("click", (e) => {
  window.location.replace(`/index.html?user=${userId}`);
});

export default {
  postComment,
};
