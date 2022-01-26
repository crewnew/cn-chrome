let url = "";

setInterval(() => {
  const isLinkedin = window.location.href.includes("linkedin.com/in");
  const isUpwork = window.location.href.includes("upwork.com/freelancers/");
  if (url !== window.location.href && (isLinkedin || isUpwork)) {
    url = window.location.href;

    if (isLinkedin) {
      const formattedUrl = `linkedin${
        window.location.href.split("linkedin")[1]
      }`;
      console.log(formattedUrl);
    }

    if (isUpwork) {
      const formattedUrl = `upwork${window.location.href.split("upwork")[1]}`;
      console.log(formattedUrl);
    }
  }
}, 500);
