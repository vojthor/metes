export function fetch(url, options) {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers();
  }

  options.headers.set("X-CSRF-TOKEN", MetesAppCfg.csrfToken);

  return window
    .fetch(url, {
      credentials: "same-origin",
      ...options,
    })
    .then(checkStatus);
}

export function fetchJSON(url, options) {
  if (!(options.headers instanceof Headers)) {
    options.headers = new Headers();
  }

  options.headers.set("Content-Type", "application/json");

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options)
    .then(parseJSON)
    .catch(function(error) {
      return parseJSON(error.response).then(function(rejection) {
        return Promise.reject(rejection);
      });
    });
}

export function fetchAPI(url, options) {
  url = `/api/v1/${url}`;

  return fetchJSON(url, options);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);

    error.response = response;

    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
