
const loginurl = 'http://127.0.0.1:8000/api/signin/';
const registerurl = 'http://127.0.0.1:8000/api/register/';

export const login = async (username: string, password: string) => {
    try {
        const response = await fetch(loginurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        if (response.ok) {
            const data = await response.json()
            return data
            
        }
    } catch (error) {
    console.error(error);
    throw new Error('Error logging in');
}
}
export const signup = async (username: string, password: string) => {
    try {
        const response = await fetch(registerurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        if (response.ok) {
            return await response.json()
        }else {
            const error = await response.json();
            throw error; 
          }
        } catch (error) {
          throw new Error(error);
        }
}