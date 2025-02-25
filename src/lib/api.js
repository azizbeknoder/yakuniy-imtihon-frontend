// Simulating API calls with local data
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDataFn(endpoint) {
  await delay(500); // Simulate network delay
  const data = await import("../data/products.json");
  if (endpoint.startsWith("/products/")) {
    const id = endpoint.split("/").pop();
    return data.default.find((product) => product.id.toString() === id);
  }
  return data.default;
}

export async function postDataFn(endpoint, data) {
  await delay(500);
  console.log("POST request:", endpoint, data);
  return { success: true };
}

export async function updateDataFn(endpoint, id, data) {
  await delay(500);
  console.log("PUT request:", `${endpoint}/${id}`, data);
  return { success: true };
}

export async function deleteDataFn(endpoint, id) {
  await delay(500);
  console.log("DELETE request:", `${endpoint}/${id}`);
  return { success: true };
}

export async function login(data) {
  await delay(500);
  if (data.email === "user@example.com" && data.password === "password") {
    return {
      name: "John Doe",
      email: "user@example.com",
      avatar: "/globe.svg",
    };
  }
  throw new Error("Invalid credentials");
}

export async function register(data) {
  await delay(500);
  console.log("Register:", data);
  return { name: data.name, email: data.email, avatar: "/avatar.png" };
}
