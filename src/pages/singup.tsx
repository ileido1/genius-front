import { useState } from "react"
import { signup } from "../services/login"
import { useAuth } from "../context/AuthProvider"
import { Navigate, redirect,useNavigate  } from "react-router-dom"

export const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await signup(username, password);
            setResponse("User created successfully");
            navigate('/login');
          } catch (error:any) {
            setResponse("Error during signup");
          }
      
    }
    const auth = useAuth();
    if(auth.isAuthenticated)return <Navigate to="/" />
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username"  onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Sing up" />
                <p>{response}</p>
                
            </form>
        </div>
    )
    }