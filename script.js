// Since linkedin doesn't really redirect after you click on any button there
// I had to use interval to check all the time if url changes and later on add changes
// Initial clear url
let url = "google.com";
// Create div on init
const userDiv = document.createElement("div");

//For counting slashes on GitHub link
function countInstances(string, word) {
  return string.split(word).length - 1;
}

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
  // Adding a new site needs one entry here
  const isLinkedin = window.location.href.includes("linkedin.com/in");
  const isUpwork = window.location.href.includes("upwork.com/freelancers/");
  const isFreelancer = window.location.href.includes("freelancer.com/u");
  const isPPH = window.location.href.includes("peopleperhour.com/");
  const isAngel = window.location.href.includes("angel.co/u");
  const isRemoteHub = window.location.href.includes("remotehub.com/");
  const isStackOverFlow = window.location.href.includes("stackoverflow.com/users/");
  const isGitHub = window.location.href.includes("github.com/");

  // Check if url changed and which provider is it
  if (
    url !== window.location.href &&
    (isLinkedin || isUpwork || isFreelancer || isPPH || isAngel || isRemoteHub || isStackOverFlow || isGitHub)
  ) {
    userDiv.style.display = "none";

    url = window.location.href;

    if (isLinkedin) {
      // Format linkedin url, remove subdomain and http, www
      let formattedUrl = `linkedin${window.location.href.split("linkedin")[1]}`;
      // Format linkedin url, remove everything after ?
      formattedUrl = `${formattedUrl.split("?")[0]}`;
      // Cut last slash after user name
      formattedUrl = formattedUrl.substring(0, formattedUrl.length - 1);

      fetchDataAndSetPopupInformation(formattedUrl);
    }

    if (isUpwork) {
      // Format upwork url, remove subdomain and http, www
      let formattedUrl = `upwork${window.location.href.split("upwork")[1]}`;
      // Format upwork url, remove everything after ?
      formattedUrl = `${formattedUrl.split("?")[0]}`;
      fetchDataAndSetPopupInformation(formattedUrl);
    }

    if (isFreelancer) {
         // Format upwork url, remove subdomain and http, www
        let formattedUrl = `freelancer${
        window.location.href.split("freelancer")[1]
      }`;
      // Format Freelancer url, remove everything after ?
      formattedUrl = `${formattedUrl.split("?")[0]}`;

      fetchDataAndSetPopupInformation(formattedUrl);
    }

    if (isPPH) {
      if (`${window.location.href.length}` > 30) {
      let formattedUrl = `peopleperhour${
        window.location.href.split("peopleperhour")[1]
      }`;
      formattedUrl = `${formattedUrl.split("?")[0]}`;
      fetchDataAndSetPopupInformation(formattedUrl);
    }}

    if (isAngel) {
      // Format freelancer url, remove subdomain and http, www
      let formattedUrl = `angel${
        window.location.href.split("angel")[1]
      }`;
      // Format angel url, remove everything after ?
      formattedUrl = `${formattedUrl.split("?")[0]}`;

      fetchDataAndSetPopupInformation(formattedUrl);
    }

    if (isRemoteHub) {
      if (`${window.location.href.length}` > 26) {
        let formattedUrl = `remotehub${
          window.location.href.split("remotehub")[1]
        }`;
        formattedUrl = `${formattedUrl.split("?")[0]}`;
        fetchDataAndSetPopupInformation(formattedUrl);
      }
    }

    if (isStackOverFlow) {
      if (`${window.location.href.length}` > 32) {
        // Format freelancer url, remove subdomain and http, www
        let formattedUrl = `stackoverflow${
          window.location.href.split("stackoverflow")[1]
        }`;
        // Format angel url, remove everything after ?
        formattedUrl = `${formattedUrl.split("?")[0]}`;
        fetchDataAndSetPopupInformation(formattedUrl);
      }
    }

    if (isGitHub){
      if (`${window.location.href.length}` > 19) {
        // Format freelancer url, remove subdomain and http, www
        let formattedUrl = `github${
          window.location.href.split("github")[1]
        }`;
        // Format angel url, remove everything after ?
        formattedUrl = `${formattedUrl.split("?")[0]}`;
        // If it's repository link instead of profile link, still show
        if (countInstances(formattedUrl, "/") >=2){
          formattedUrl = `github.com/${formattedUrl.split("/")[1]}`;
        }
        fetchDataAndSetPopupInformation(formattedUrl);
      }
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

      userDiv.style.cssText = `position:fixed;left:1.5rem;bottom:-2rem;transform:translateY(-50%);background-color:#fff;z-index:99999999;padding:1rem 2rem;border-radius:10px;box-shadow: 0 0 5px 1px;`;

      userDiv.innerHTML = `
            User: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.id}" target="_blank">${formattedResponse?.name} (${formattedResponse?.id})</a><br>
            Manager: <a href="https://cms.crewnew.com/admin/collections/users/${formattedResponse?.manager.id}" target="_blank">${formattedResponse?.manager?.name} (${formattedResponse?.manager?.id})</a>
        `;

      document.querySelector("body").appendChild(userDiv);
    });
};
