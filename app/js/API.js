const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = () => fetch(TWEETS_URL).then((res) => res.json());
const getUsers = () => fetch(USERS_URL).then((res) => res.json());

//get user's data and render them
const getUserData = async (id, name, tag) => {
  fetch(`http://localhost:3000/users/${id}`)
    .then((response) => response.json())
    .then((user) => {
      name.innerHTML = user.name;
      tag.innerHTML = `@${user.name
        .split(" ")
        .join("")
        .toLowerCase()}`;
      console.log("filtered user >>>", user);
    });
};

//get tweet with rich comments
const getTweet = async (id) => {
  let url = `http://localhost:3000/tweets/${id}?_expand=user&_embed=comments`;

  let response = await fetch(url);
  let tweet = await response.json();

  let commentUrl = `http://localhost:3000/tweets/${id}/comments?_expand=user`;

  response = await fetch(commentUrl);
  let data = await response.json();

  tweet.comments = data;

  return tweet;
};

//post new comment and render it
const postComment = async (id, comment) => {
  let tweetCommentsUrl = `http://localhost:3000/tweets/${id}/comments`;
  let data;
  try {
    let response = await fetch(tweetCommentsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    data = await response.json();
  } catch (error) {
    console.error(error, "Oops something went wrong!");
  }
  return data;
};



export default {
  getTweets,
  getUsers,
  getUserData,
  getTweet,
  postComment
};
