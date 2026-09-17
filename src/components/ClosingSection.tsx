import { useState } from "react";

export function ClosingSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // wire up to your actual newsletter service here
  };

  return (
    <section className="w-dvw min-h-dvh flex flex-col items-center justify-center gap-12 bg-black text-white px-6 py-24">
      <div className="text-center max-w-2xl flex flex-col gap-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Come see them in person
        </h2>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto">
          Every figure you've met here stands somewhere real — bronze and marble, waiting past a doorway you can actually walk through. Plan your visit, or let us tell you when new stories arrive.
        </p>
      </div>

      <a
        href="#"
        className="bg-amber-400 hover:bg-amber-300 transition-colors text-black font-semibold text-base md:text-lg px-8 py-4 rounded-full"
      >
        Plan your visit
      </a>

      <div className="w-full max-w-md border-t border-white/10 pt-10 flex flex-col items-center gap-4">
        <p className="text-sm text-gray-400 text-center">
          Or get notified when a new exhibit is added
        </p>

        {submitted ? (
          <p className="text-amber-400 text-sm">You're on the list — thank you.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              Notify me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}