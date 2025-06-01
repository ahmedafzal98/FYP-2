import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAuthValidation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
          method: "GET",
          credentials: "include", // to send cookies
        });

        if (res.ok) {
          const data = await res.json();
          setData(data);

          dispatch(loginSuccess(data));
        } else {
          dispatch(clearUser());
        }
      } catch (err) {
        setError(err.message);
        // dispatch(clearUser());
      } finally {
        setLoading(false); // Done validating
      }
    };

    validateToken();
  }, [dispatch]);

  return { data, loading, error }; // return to use in App.js
};

export default useAuthValidation;
