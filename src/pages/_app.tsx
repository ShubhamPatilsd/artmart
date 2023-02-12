import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { db } from "@/db/db";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
