"use client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { NextResponse } from "next/server";
import React, { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SignUpResponse extends NextResponse {
  message: string;
  error?: {
    name?: string;
    email?: string;
    password?: string[];
  };
}
interface LogInResponse extends NextResponse {
  message: string;
  error?: {
    email?: string;
    password?: string[];
  };
}

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    const request = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: JSON.stringify({ email, password }),
    });

    const response: LogInResponse = await request.json();
    if (!request.ok) {
      if (response.message) {
        toast({
          description: response.message,
          variant: "destructive",
        });
      } else {
        setFormErrors(response.error!);
      }
    } else {
      toast({
        title: "Welcome back!",
        description: response.message,
        variant: "success",
      });
    }
  };

  return (
    <form onSubmit={handleForm}>
      <label className="form-control w-full max-w-xs mb-2">
        <div className="input input-bordered flex items-center gap-2">
          <Image
            className="opacity-70"
            src="/email.svg"
            alt="Email SVG"
            width={16}
            height={16}
            priority
          />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        {formErrors && formErrors.email && (
          <div className="label">
            <li className="label-text-alt text-red-500 text-xs">
              {formErrors.email}
            </li>
          </div>
        )}
      </label>
      <label className="form-control w-full max-w-xs mb-2">
        <div
          className={`input input-bordered ${
            formErrors && formErrors.password ? "input-error" : null
          } flex items-center gap-2`}
        >
          <Image
            className="opacity-70"
            src="/password.svg"
            alt="Password SVG"
            width={16}
            height={16}
            priority
          />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        {formErrors && formErrors.password && (
          <div className="label">
            <div className="label-text-alt text-red-500 text-xs">
              {formErrors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </div>
          </div>
        )}
      </label>
      <button type="submit" className="btn btn-primary w-full text-lg">
        Log In <MoveRight />
      </button>
    </form>
  );
};

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string[];
  } | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    const request = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const response: SignUpResponse = await request.json();
    if (!request.ok) {
      if (response.message) {
        toast({
          description: response.message,
          variant: "destructive",
        });
      } else {
        setFormErrors(response.error!);
      }
    } else {
      router.push("/auth/login");
      toast({
        title: "Please log in to continue!",
        description: response.message,
        variant: "success",
      });
    }
  };

  return (
    <form onSubmit={handleForm}>
      <label className="form-control w-full max-w-xs mb-2">
        <div className="input input-bordered flex items-center gap-2">
          <Image
            className="opacity-70"
            src="/name.svg"
            alt="Name SVG"
            width={16}
            height={16}
            priority
          />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {formErrors && formErrors.name && (
          <div className="label">
            <li className="label-text-alt text-red-500 text-xs">
              {formErrors.name}
            </li>
          </div>
        )}
      </label>
      <label className="form-control w-full max-w-xs mb-2">
        <div className="input input-bordered flex items-center gap-2">
          <Image
            className="opacity-70"
            src="/email.svg"
            alt="Email SVG"
            width={16}
            height={16}
            priority
          />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        {formErrors && formErrors.email && (
          <div className="label">
            <li className="label-text-alt text-red-500 text-xs">
              {formErrors.email}
            </li>
          </div>
        )}
      </label>
      <label className="form-control w-full max-w-xs mb-2">
        <div
          className={`input input-bordered ${
            formErrors && formErrors.password ? "input-error" : null
          } flex items-center gap-2`}
        >
          <Image
            className="opacity-70"
            src="/password.svg"
            alt="Password SVG"
            width={16}
            height={16}
            priority
          />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        {formErrors && formErrors.password && (
          <div className="label">
            <div className="label-text-alt text-red-500 text-xs">
              {formErrors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </div>
          </div>
        )}
      </label>
      <button type="submit" className="btn btn-primary w-full text-lg">
        Continue <MoveRight />
      </button>
    </form>
  );
};

export { SignUpForm, LogInForm };
