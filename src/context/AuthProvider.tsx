import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

interface AuthProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUserTokens: (accessToken: string, refreshToken: string) => {},
  getRefreshToken: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  


  async function requestNewAccessToken(refreshToken: string) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({refresh: refreshToken})
      })
        if (response.ok){
          const data = await response.json();
          saveUserTokens(data.access, data.refresh);

        }
    } catch (error) {
      console.error(error);
    }
  }

  function getAccessToken() {
    return accessToken
  }
  function getRefreshToken() {
    const token= localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return null;
    }
  }
  async function CheckAuth() {
    const token = getRefreshToken();
    if (token) {
      await requestNewAccessToken(token);
    }else{
      setIsAuthenticated(false);
    }
  }
  useEffect(() => {
    CheckAuth();
  },[]);

  function saveUserTokens(accessToken: string, refreshToken: string) {
   setAccessToken(accessToken);
   localStorage.setItem('token', refreshToken);
   setIsAuthenticated(true);
  }
  function logout() {
    setAccessToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }
  return(
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUserTokens,getRefreshToken,logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
