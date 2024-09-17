import { useEffect, useState } from "react";


  /**
 * Represents a book in a library.
 * 
 * @typedef {Object} BooksData
 * @property {number} id - The unique identifier of the book.
 * @property {string} name - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} language - The language the book is written in.
 * @property {number} pages - The number of pages in the book.
 * @property {boolean} borrowed - Indicates whether the book is currently borrowed.
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

  return [data, setData];
};

export const getData = async (path, method, body) => {
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
    setTimeout(() => resolve(resp.json()), 2000)
  );
};
