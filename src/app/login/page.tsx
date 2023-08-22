"use client"

import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password })
        });
        const { accessToken } = await res.json();
        console.log(accessToken);
        if (accessToken) {
            router.push("/")
        } else {
            alert("Login Failed")
        }
    }
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            JWT Token
            <form className="flex flex-col justify-center items-center w-full h-screen" onSubmit={handleSubmit}>
                <label>Username:
                    <input name="username" type="text" className="text-black outline-none border rounded-lg px-2" placeholder="username" />
                </label>
                <label>Password:
                    <input name="password" type="password" className="text-black outline-none border rounded-lg px-2" placeholder="password" />
                </label>
                <button type="submit" className="border bg-blue-300 ease-in duration-300 hover:scale-105 rounded-lg px-3 py-2 hover:bg-blue-800 hover:text-white" >Login</button>
            </form>
        </div>
    )
}

export default Login;