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

      const query = `query Chrome
{
 webs(where: {url: {_like: "%${formattedUrl}%"}}) {
   user {
     id
     name
     manager {
       id
       name
     }
   }
 }
}`;

      fetch("https://apps.crewnew.com/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((r) => r.json())
        .then((data) => console.log(data?.webs?.[0]?.user));
    }

    if (isUpwork) {
      const formattedUrl = `upwork${window.location.href.split("upwork")[1]}`;
      console.log(formattedUrl);

      const query = `query Chrome
{
 webs(where: {url: {_like: "%${formattedUrl}%"}}) {
   user {
     id
     name
     manager {
       id
       name
     }
   }
 }
}`;

      fetch("https://apps.crewnew.com/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((r) => r.json())
        .then((data) => console.log(data?.webs?.[0]?.user));
    }
  }
}, 500);
