"use client";
import { MoveRight, ShieldAlert } from "lucide-react";
import { set } from "mongoose";
import Image from "next/image";
import { NextResponse } from "next/server";
import React, { FormEvent, useState } from "react";

interface Response extends NextResponse {
  message: string;
  error?: {
    name?: string;
    email?: string;
    password?: string[];
  };
}

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string[];
  } | null>(null);

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setFormErrors(null);

    const request = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const response: Response = await request.json();
    if (!request.ok) {
      if (response.message) {
        setMessage("User already exists");
      } else {
        setFormErrors(response.error!);
        console.log(formErrors?.password);
      }
    }

    // Redirect and Send Notification
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
      {message && (
        <div role="alert" className="alert alert-error mb-2 text-white">
          <ShieldAlert />
          <span>{message}</span>
        </div>
      )}
      <button type="submit" className="btn btn-primary w-full text-lg">
        Continue <MoveRight />
      </button>
    </form>
  );
};

export default Form;
