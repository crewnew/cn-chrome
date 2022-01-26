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
      const formattedUrl = `l${window.location.href.split("https://www.l")[1]}`;
      console.log(formattedUrl);
    }

    if (isUpwork) {
      const formattedUrl = `u${window.location.href.split("https://www.u")[1]}`;
      console.log(formattedUrl);
    }
  }
}, 500);
