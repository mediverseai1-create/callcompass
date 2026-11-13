import Link from "next/link";
import { AuthPage } from "@/components/auth-form";
import { forgot } from "../actions";
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return <AuthPage title="Reset password" action={forgot} params={searchParams} password={false} submit="Send reset link" footer={<Link href="/login" className="underline">Back to sign in</Link>} />;
}
