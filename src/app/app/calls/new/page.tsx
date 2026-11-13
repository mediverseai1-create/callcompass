import { getCtx } from "@/lib/session";
import { createCall } from "../../../actions";
export default async function NewCall({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { sb, plan, used } = await getCtx();
  const { data: deals } = await sb.from("deals").select("id,name,company").order("created_at", { ascending: false });
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold">Add a call</h1>
      <p className="text-sm text-ink/70">{used} of {plan.callsPerMonth} calls used this month. {plan.aiAnalysis ? "AI analysis is included." : "Your plan includes metrics only; upgrade for AI analysis."}</p>
      {error && <p role="alert" className="rounded bg-red-100 p-2 text-sm text-red-800">{error}</p>}
      <form action={createCall} className="card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="title">Call title</label><input id="title" name="title" required maxLength={160} className="input" /></div>
          <div><label className="label" htmlFor="rep_name">Rep name (as written in transcript)</label><input id="rep_name" name="rep_name" required maxLength={60} className="input" /></div>
          <div><label className="label" htmlFor="call_date">Date</label><input id="call_date" name="call_date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className="input" /></div>
          <div><label className="label" htmlFor="deal_id">Deal (optional)</label><select id="deal_id" name="deal_id" className="input"><option value="">None</option>{deals?.map((d: any) => <option key={d.id} value={d.id}>{d.company} — {d.name}</option>)}</select></div>
        </div>
        <div><label className="label" htmlFor="transcript">Transcript</label><textarea id="transcript" name="transcript" rows={12} className="input font-mono" placeholder={"Alex: Thanks for joining. What prompted you to look at this?\nSam: Our forecast keeps slipping..."} /><p className="mt-1 text-xs text-ink/60">One speaker turn per line, formatted “Name: text”.</p></div>
        <div><label className="label" htmlFor="file">Or upload a .txt transcript</label><input id="file" name="file" type="file" accept=".txt,text/plain" className="text-sm" /></div>
        <button className="btn-pink">Analyze call</button>
      </form>
    </div>
  );
}
