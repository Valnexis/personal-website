export default function Toolbox({ tools = [] }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-semibold mb-2 text-cyan-300">Toolbox</h3>
            <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/20 text-cyan-200 text-xs">{tool}</span>
                ))}
            </div>
        </section>
    );
}