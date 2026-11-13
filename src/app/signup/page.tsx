import Link from "next/link";
import { AuthPage } from "@/components/auth-form";
import { signUp } from "../actions";
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return <AuthPage title="Create your workspace" action={signUp} params={searchParams} submit="Create account" footer={<>Have an account? <Link href="/login" className="underline">Sign in</Link></>} />;
}
