import {  useState } from "react"
import { Link, redirect } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
interface Defaultprops {
    children: React.ReactNode
}   
const logout = 'http://127.0.0.1:8000/api/logout/';

export const Header = ({children} : Defaultprops) => {
    const auth = useAuth()
     const  handlelogout = async (e:React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault
        try {
            const response = await fetch(logout, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh: auth.getRefreshToken()})
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                
                auth.logout()
                redirect('/login')

            }
        } catch (error) {
        console.error(error);
        throw new Error('Error logging in');
    }
       
 }
 
 return (
        <>
         <AppBar position="static">
      <Toolbar>
    
        
          <Button color="inherit" >
            <Link to="/promts">Home</Link>
          </Button >
        
          {!auth.isAuthenticated &&  <Button color="inherit" >
            <Link to="/login">Login</Link>
          </Button>}
          {!auth.isAuthenticated &&   <Button  color="inherit">
            <Link to="/signup">Register</Link>
          </Button>}
        <Button color="inherit" >
          <a href="#" onClick={handlelogout}>Log out</a>
        </Button>
      </Toolbar>
    </AppBar>

        <main>{children}</main>
        </>
    )
}
