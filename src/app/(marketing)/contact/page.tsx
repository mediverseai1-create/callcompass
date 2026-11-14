import { Marketing } from "@/components/shell";
import { Eyebrow, Section } from "@/components/sections";
export const metadata = { title: "Contact — CallCompass" };
export default function Contact() {
  return (
    <Marketing>
      <Section>
        <Eyebrow>Contact</Eyebrow><h1 className="text-4xl font-bold uppercase">Talk to us</h1>
        <p className="mt-3 max-w-xl text-ink/80">Questions about plans, data handling or what is on the roadmap? Send us a note and we will reply by email.</p>
        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="card"><h2 className="font-bold">Sales and plans</h2><a className="mt-1 block text-sm underline" href="mailto:sales@callcompass.example">sales@callcompass.example</a></div>
          <div className="card"><h2 className="font-bold">Support</h2><a className="mt-1 block text-sm underline" href="mailto:support@callcompass.example">support@callcompass.example</a></div>
        </div>
        <p className="mt-4 text-xs text-ink/60">Placeholder addresses: replace with your real mailboxes before launch.</p>
      </Section>
    </Marketing>
  );
}
