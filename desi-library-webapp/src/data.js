import { useEffect, useState, useCallback } from "react";

/**
 * Represents a book in a library.
 *
 * @typedef {Object} BooksData
 * @property {number} id
 * @property {string} name
 * @property {string} author
 * @property {string} language
 * @property {number} pages
 * @property {boolean} borrowed
 */

/**
 * useData hook for communicating with the backend.
 * @param {*} path Relative path from root, ie /books/getallbooks
 * @param {*} method HTTP method to use, ie GET
 * @param {*} body Body if chosen method requires it.
 * @returns {BooksData} The data that was requested.
 */
export const useData = (path, method, body) => {
  const [data, setData] = useState();

  useEffect(() => {
    let ignore = false;
    request(path, method, body).then((json) => {
      if (!ignore) {
        setData(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [path, method, body]);

  const refetch = useCallback(
    async (callback) => {
      const json = await request(path, method, body);
      setData(json);
      callback && callback(data);
      return json;
    },
    [path, method, body]
  );

  return [data, setData, refetch];
};

export const makeRequest = async (path, method, body) => {
  const json = await request(path, method, body);
  return json;
};

const baseUrl = "http://localhost:5000";

const request = async (path, method, body) => {
  const resp = await fetch(`${baseUrl}${path}`, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: body && JSON.stringify(body),
  });

  /** This artificial delay is intentional -- please do not remove it! */
  return await new Promise((resolve) =>
    setTimeout(() => resolve(method === "PUT" ? resp : resp.json()), 2000)
  );
};
