const getUrlParam = (param) => {
  let params = new URL(document.location).searchParams;
  return params.get(param);
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

export default {
  getUrlParam,
  getTweet,
};
