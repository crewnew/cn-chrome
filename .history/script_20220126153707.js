// Since linkedin doesn't really redirect after you click on any button there
// I had to use interval to check all the time if url changes and later on add changes

// Initial clear url
let url = "";
// Create div on init
const userDiv = document.createElement("div");

// GraphQL query
const query = (formattedUrl) => `query Chrome
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

setInterval(() => {
  // Checkers
  const isLinkedin = window.location.href.includes("linkedin.com/in");
  const isUpwork = window.location.href.includes("upwork.com/freelancers/");

  console.log("1");

  // Check if url changed and if it is linkedin or upwork
  if (url !== window.location.href && (isLinkedin || isUpwork)) {
    console.log("2");

    userDiv.style.display = "none";

    url = window.location.href;

    if (isLinkedin) {
      console.log("3");

      // Format linkedin url, remove subdomain and http, www
      let formattedUrl = `linkedin${window.location.href.split("linkedin")[1]}`;

      // Cut last slash after user name
      formattedUrl = formattedUrl.substring(0, formattedUrl.length - 1);

      fetchDataAndSetPopupInformation(formattedUrl);
    }

    if (isUpwork) {
      // Format upwork url, remove subdomain and http, www
      const formattedUrl = `upwork${window.location.href.split("upwork")[1]}`;

      fetchDataAndSetPopupInformation(formattedUrl);
    }
  }
}, 500);

const fetchDataAndSetPopupInformation = (formattedUrl) => {
  fetch("https://apps.crewnew.com/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query(formattedUrl),
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      if (!data?.data?.webs[0]?.user) return;
      const formattedResponse = data?.data?.webs[0]?.user;
      userDiv.style.display = "block";

      userDiv.style.cssText = `position:fixed;left:1.5rem;bottom:-2rem;transform:translateY(-50%);background-color:#fff;z-index:999;padding:1rem 2rem;border-radius:10px;box-shadow: 0 0 5px 1px;`;

      userDiv.innerHTML = `
            User: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.id}" target="_blank">${formattedResponse?.name} (${formattedResponse?.id})</a><br>
            Manager: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.manager.id}" target="_blank">${formattedResponse?.manager?.name} (${formattedResponse?.manager?.id})</a>
        `;

      document.querySelector("body").appendChild(userDiv);
    });
};
