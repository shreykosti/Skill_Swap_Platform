
"use client";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  return (
    <div>
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          console.log("SignIn Response:", res);
        }}
      >
        signin
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        signout
      </button>
      {JSON.stringify(session)}
    </div>
  );
}
