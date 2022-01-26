let url = "";

setInterval(() => {
  if (
    url !== window.location.href &&
    (window.location.href.includes("https://www.linkedin.com/in") ||
      window.location.href.includes("https://www.upwork.com/freelancers/"))
  ) {
    url = window.location.href;

    console.log("do request");
  }
}, 500);
