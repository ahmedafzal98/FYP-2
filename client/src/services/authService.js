const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const authService = async (endpoint, authData) => {
  console.log(authData);

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: authData.uid,
        name: authData.name,
        email: authData.email,
        photoUrl: authData.photoUrl,
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
