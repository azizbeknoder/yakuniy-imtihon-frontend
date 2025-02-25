"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { register } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      setUser(user);
      toast.success("Registered successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-card dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Register
        </h2>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mb-4 outline-none dark:border-none"
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mb-4 outline-none dark:border-none"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 outline-none dark:border-none"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 outline-none dark:border-none"
          required
        />
        <Button type="submit" className="w-full mb-4">
          Register
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => router.push("/login")}
          className="w-full text-blue-500 dark:text-blue-300"
        >
          Already have an account? Login
        </Button>
      </form>
    </div>
  );
}
