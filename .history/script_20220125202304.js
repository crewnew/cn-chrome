let url = "";

setInterval(() => {
  const isLinkedin = window.location.href.includes(
    "https://www.linkedin.com/in"
  );
  const isUpwork = window.location.href.includes(
    "https://www.upwork.com/freelancers/"
  );
  if (url !== window.location.href && (isLinkedin || isUpwork)) {
    url = window.location.href;

    console.log("do request");
  }
}, 500);
