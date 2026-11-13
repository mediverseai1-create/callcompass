import Link from "next/link";
import { AuthPage } from "@/components/auth-form";
import { signIn } from "../actions";
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return <AuthPage title="Sign in" action={signIn} params={searchParams} submit="Sign in" footer={<><Link href="/forgot" className="underline">Forgot password?</Link> · <Link href="/signup" className="underline">Create account</Link></>} />;
}
