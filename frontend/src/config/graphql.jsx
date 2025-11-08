
const GRAPHQL_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/`
  : import.meta.env.DEV
  ? '/graphql'
  : 'http://localhost:5050/';

export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors && json.errors.length) {
    const message = json.errors.map((e) => e.message).join("\n");
    const error = new Error(message);
    error.details = json.errors;
    throw error;
  }

  return json.data;
}

export default GRAPHQL_URL;
