export function ExhibitMap() {
  return (
    <section className="w-dvw min-h-dvh flex flex-col font-serif">
      {/* top: info + map */}
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 bg-[#0d1526]">
        <div className="p-10 md:p-16 text-white flex flex-col justify-center gap-6">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold">The Freed Ones</h3>
            <div className="w-12 h-px bg-white/40 mt-4" />
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Opening Hours</p>
            <p className="text-base md:text-lg">10:00 — 18:00</p>
            <p className="text-base md:text-lg text-gray-400">Wednesday: Closed</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">General Admission</p>
            <p className="text-base md:text-lg">Adults: $12</p>
            <p className="text-base md:text-lg">Special: $5</p>
            <p className="text-base md:text-lg">Kids: Free</p>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-0">
          <iframe
            src="https://www.google.com/maps?q=Vy%C5%A1ehrad,Prague&output=embed"
            className="w-full h-full border-0"
            style={{ filter: "invert(92%) hue-rotate(180deg) brightness(0.9) contrast(0.9)" }}
            loading="lazy"
            title="Exhibit location"
          />
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label="Open directions"
          >
            →
          </button>
        </div>
      </div>

      {/* bottom: prev / next nav */}
      <div className="grid grid-cols-2">
        <button className="bg-[#1c2b22] hover:bg-[#223528] transition-colors p-8 md:p-10 text-left">
          <p className="text-xs text-gray-400 mb-1">Previous</p>
          <p className="text-white text-lg md:text-2xl font-semibold">Beethoven</p>
        </button>
        <button className="bg-[#b8722f] hover:bg-[#c47f3a] transition-colors p-8 md:p-10 text-right">
          <p className="text-xs text-white/70 mb-1">Next</p>
          <p className="text-white text-lg md:text-2xl font-semibold">Ctirad & Šárka</p>
        </button>
      </div>
    </section>
  );
}