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

    if (isLinkedin) {
      const formattedUrl = `l${window.location.href.split("https://www.l")}`;
      console.log(formattedUrl);
    }
  }
}, 500);
