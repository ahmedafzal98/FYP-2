const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const authService = async (endpoint, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Auth Failed: ${res.status} - ${errorText}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export default authService;
