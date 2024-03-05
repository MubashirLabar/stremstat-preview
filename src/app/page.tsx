"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <img className="h-auto w-[250px]" src="/logo.png" alt="logo" />
    </div>
  );
}
