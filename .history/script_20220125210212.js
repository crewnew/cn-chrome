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
        .then((data) => {
          const users = data?.data?.webs;
          const e = document.createElement("div");
          e.innerHTML = `
          <div style="position:fixed;right:0;top:50%;transform:translateX(-50%);background-color:red;z-index:999;padding:1rem 2rem;border-radius:10px;">
          User: <a href="https://cms.crewnew.com/admin/collections/users/${user.id}">${user.name} (${user.id})>></a><br>
          Manager: <a href="https://cms.crewnew.com/admin/collections/users/${user.manager.id}">${user.manager.name} (${user.manager.id})>></a>
          </div>`;

          document.querySelector("body").appendChild(e);
        });
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
        .then((data) => console.log(data?.data?.webs[0]?.user));
    }
  }
}, 500);