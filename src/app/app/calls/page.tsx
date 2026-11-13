import Link from "next/link";
import { getCtx } from "@/lib/session";
export default async function Calls() {
  const { sb } = await getCtx();
  const { data: calls } = await sb.from("calls").select("id,title,rep_name,call_date,metrics,ai_status").order("call_date", { ascending: false });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Calls</h1><Link href="/app/calls/new" className="btn-pink">Add call</Link></div>
      {calls?.length ? (
        <div className="card overflow-x-auto p-0"><table className="w-full text-left text-sm"><thead className="bg-violet-100"><tr><th className="p-3">Call</th><th>Rep</th><th>Date</th><th>Rep talk</th><th>Questions</th><th>AI</th></tr></thead>
          <tbody>{calls.map((c: any) => <tr key={c.id} className="border-t"><td className="p-3"><Link className="font-medium underline" href={`/app/calls/${c.id}`}>{c.title}</Link></td><td>{c.rep_name}</td><td>{c.call_date}</td><td>{c.metrics?.repTalkPct}%</td><td>{c.metrics?.questionCount}</td><td>{c.ai_status}</td></tr>)}</tbody></table></div>
      ) : <div className="card text-sm">No calls yet. Add a transcript to get talk-ratio, question and next-step metrics.</div>}
    </div>
  );
}
