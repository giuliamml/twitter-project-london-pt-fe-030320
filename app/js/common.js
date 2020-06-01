const getUrlParam = (param) => {
  let params = new URL(document.location).searchParams;
  return params.get(param);
};

const getCurrentDate = () => {
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    return date
};

export default {
  getUrlParam,
  getCurrentDate
};

