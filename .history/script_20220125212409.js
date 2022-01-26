let url = "";
const userDiv = document.createElement("div");
userDiv.style.display = "none";

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
          if (!data?.data?.webs[0]?.user) return;
          const formattedResponse = data?.data?.webs[0]?.user;
          userDiv.style.display = "block";

          userDiv.style.cssText = `position:fixed;right:5px;top:50%;transform:translateY(-50%);background-color:#fff;z-index:999;padding:1rem 2rem;border-radius:10px;box-shadow: 0 0 5px 1px;`;

          userDiv.innerHTML = `
                User: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.id}" target="_blank">${formattedResponse?.name} (${formattedResponse?.id})</a><br>
                Manager: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.manager.id}" target="_blank">${formattedResponse?.manager?.name} (${formattedResponse?.manager?.id})</a>
           `;

          document.querySelector("body").appendChild(userDiv);
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
        .then((data) => {
          if (!data?.data?.webs[0]?.user) return;
          const formattedResponse = data?.data?.webs[0]?.user;
          userDiv.style.cssText = `display:block;position:fixed;right:5px;top:50%;transform:translateY(-50%);background-color:#fff;z-index:999;padding:1rem 2rem;border-radius:10px;box-shadow: 0 0 5px 1px;`;

          userDiv.innerHTML = `
                  User: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.id}" target="_blank">${formattedResponse?.name} (${formattedResponse?.id})</a><br>
                  Manager: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.manager.id}" target="_blank">${formattedResponse?.manager?.name} (${formattedResponse?.manager?.id})</a>
             `;

          document.querySelector("body").appendChild(userDiv);
        });
    }
  }
}, 500);
