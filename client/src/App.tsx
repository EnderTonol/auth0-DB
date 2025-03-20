import { useAuth0 } from "@auth0/auth0-react";
import { Divider, Button, Input } from "@heroui/react";
import axios from 'axios';
import { useState,useEffect } from "react";

function App() {
    const [todos,setTodos] = useState([]);
    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect();
    };

    if (isAuthenticated && user) {
        console.log("logged in");
        console.log(user);
        axios.post("http://localhost:3000/sign-in", {
            username: user.name,
            email: user.email,
            firstSignUpDate: new Date().toISOString(),
            _uid: user.nickname
        })
        .then((res) => {
            console.log(res.data?.message);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    useEffect(() => {
        if (user?.nickname) { 
            axios.get(`http://localhost:3000/todos/${user.nickname}`)
                .then((res) => {
                    console.log("client:", res.data);
                    setTodos(res.data.todos); 
                })
                .catch((err) => {
                    console.error("Error fetching todos:", err);
                });
        }
    }, [user?.nickname]); 
    
    

    return (
        <>
            <div className="flex flex-col justify-center items-center h-svh">
                <h1 className="text-3xl">{user && user.name}</h1>
                <Divider className="mb-6" />
                {
                    isAuthenticated ? <Button size="lg" onPress={() => logout()}>Logout</Button> : <Button size="lg" color="primary" onPress={handleLogin}>Login</Button>
                }
                <div>
                    <Input label="todo" type="text"/>
                    <Button>Add Todo</Button>
                </div>
                <div>
                    {
                        Array.isArray(todos) && todos.length > 0 && 
                        todos.map((itm, idx) => (
                            <li key={idx}>{itm}</li>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default App;
