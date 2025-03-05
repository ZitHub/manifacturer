export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`http://localhost:4000${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function sendData<T>(endpoint: string, body: T): Promise<T> {
  const response = await fetch(`http://localhost:4000${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to post data");
  }

  return response.json();
}

export async function putData<T>(
  endpoint: string,
  id: string,
  body: T
): Promise<T> {
  const response = await fetch(`http://localhost:4000${endpoint}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to put data");
  }

  return response.json();
}

export async function deleteData<T>(endpoint: string, id: string): Promise<T> {
  const response = await fetch(`http://localhost:4000${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }

  return response.json();
}
