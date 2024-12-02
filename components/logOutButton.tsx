"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        toast({
          title: "Goodbye!",
          description: "You have been signed out.",
        });
        router.push("/auth/login");
      } else {
        const error = await response.json();
        console.log("Sign-out failed:", error);
      }
    } catch (error) {
      console.log("An error occurred during sign-out:", error);
    }
  };
  return (
    <button className="btn btn-primary" onClick={handleLogOut}>
      Sign Out
    </button>
  );
};

export default LogOutButton;
