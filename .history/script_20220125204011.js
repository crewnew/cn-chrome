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

      fetch("https://apps.crewnew.com/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query Chrome
  {
   webs(where: {url: {_like: "%linkedin.com/in/kaspar-palgi%"}}) {
     user {
       id
       name
       manager {
         id
         name
       }
     }
   }
 }"`,
        }),
      })
        .then((r) => r.json())
        .then((data) => console.log("data returned:", data));
    }

    if (isUpwork) {
      const formattedUrl = `upwork${window.location.href.split("upwork")[1]}`;
      console.log(formattedUrl);
    }
  }
}, 500);
