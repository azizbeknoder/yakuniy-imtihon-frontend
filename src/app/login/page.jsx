"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { login, register } from "@/api/api"; // API funksiyalari
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let user;
      if (isLogin) {
        user = await login({ email, password });
      } else {
        user = await register({ name, email, password });
      }

      setUser(user);
                    

      console.log(user);
      

      // Tokenni localStorage-ga saqlash
      localStorage.setItem("Authorization", user.access_token);

      // toast.success(`${isLogin ? "Logged in" : "Registered"} successfully`);
      if(user.status == 200){
          router.push("/");
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isLogin ? "Login" : "Register"}
        </h2>
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
            required
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          required
        />
        <Button type="submit" className="w-full mb-4">
          {isLogin ? "Login" : "Register"}
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-blue-500"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </Button>
      </form>
    </div>
  );
}
