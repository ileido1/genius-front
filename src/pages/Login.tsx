import { useState } from "react"
import { login } from "../services/login"
import { useAuth } from "../context/AuthProvider"
import { Navigate, redirect } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try
        {
            const user = await login(username, password)
            auth.saveUserTokens(user.access, user.refresh)
            redirect('/promts')
        }catch(e)
        {
            console.error(e)
        }
      
    }
  
    if(auth.isAuthenticated)return <Navigate to="/promts" />
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username"  onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
    }