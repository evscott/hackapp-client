import fetch from "cross-fetch";

/**
 * Takes a promise and adds a timeout to it so it expires after
 * so many milliseconds.
 * @param {Promise<any>} promise The promise to resolve
 * @param {int} timeout The timeout for the promise
 */
const addTimeout = (promise, timeout) => {
  const timer = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error("Request timed out"));
    }, timeout);
  });
  // Applies a timeout to the given promise
  return Promise.race([promise, timer]);
};

export default function fetchWithTimeout(path, options, timeout = 6000) {
  const promise = fetch(path, options);
  return addTimeout(promise, timeout);
}
