"use client";
import { toast } from "react-toastify";
export default async function page() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={() => toast("Hello, world!")}>Show Toast</button>
    </div>
  );
}
