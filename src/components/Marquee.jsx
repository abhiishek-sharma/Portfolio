// Two rows of oversized outlined text that slide in opposite directions as you scroll.
const ROW = "Applied AI ✦ LLM Evaluation ✦ Agentic Systems ✦ Production Software ✦ ";

const Marquee = () => (
    <section aria-hidden="true" className="marquee relative overflow-hidden bg-[#0d0d1a] py-16 md:py-24 select-none">
        {[0, 1].map((row) => (
            <div
                key={row}
                className={`marquee-row whitespace-nowrap font-display font-black uppercase leading-none text-[12vw] md:text-[8vw] ${row ? "text-[#00d4ff]" : "text-outline"}`}
                data-direction={row ? 1 : -1}
            >
                {ROW.repeat(3)}
            </div>
        ))}
    </section>
);

export default Marquee;
