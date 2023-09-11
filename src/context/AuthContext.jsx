import { createContext, useContext, useState, useEffect } from "react";

const URL = "https://accounts.spotify.com/api/token";
const body =
  "grant_type=client_credentials&client_id=625e44fdf4c54d3ab62a5d1c95e3f353&client_secret=9401a23a8e6c47bdac04f93de44f7890";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`${URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body,
        });
        if (!res.ok)
          throw new Error(`${res.status} Could not get an access token`);
        const data = await res.json();
        console.log(data);
        setToken(data.access_token);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
