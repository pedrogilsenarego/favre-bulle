"use client";

import NewsletterForm from "@/components/NewsletterForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/hello", { method: "GET" });
    //if(res !==null) {setMessage(res?.body?.JSON.stringify())}
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-blue-600">Welcome to Favre Bulle Website</p>
        <p className="text-zinc-500">Please register for our Newsletter</p>
        <NewsletterForm className="gap-2 items-center flex flex-col" />
        <p>sa{message}</p>
      </div>
    </main>
  );
}
