/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const URL = "https://accounts.spotify.com/api/token";
const client_id = "625e44fdf4c54d3ab62a5d1c95e3f353";
const client_secret = "9401a23a8e6c47bdac04f93de44f7890";

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
            Authorization: `Basic ${new ArrayBuffer(
              client_id + ":" + client_secret
            ).toString("base64")}`,
          },
          body: "grant_type=client_credentials",
        });
        console.log(res);
        if (!res.ok) throw new Error("Could not get an access token");
        const data = await res.json();
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
    <AuthContext.Provider value={{ token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
