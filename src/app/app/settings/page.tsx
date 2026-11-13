import { getCtx } from "@/lib/session";
import { renameOrg } from "../../actions";
export default async function SettingsPage() {
  const { org, user } = await getCtx();
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form action={renameOrg} className="card space-y-3"><label className="label" htmlFor="name">Workspace name</label><input id="name" name="name" defaultValue={org.name} required maxLength={80} className="input" /><button className="btn-pink">Save</button></form>
      <div className="card text-sm"><p className="font-medium">Account</p><p>{user.email}</p><p className="mt-2 text-ink/70">To change your password, sign out and use “Forgot password” on the sign-in page.</p></div>
    </div>
  );
}
