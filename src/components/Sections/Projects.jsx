export default function Projects({ items = [] }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-semibold mb-2 text-cyan-300">Projects</h3>
            {items.map((proj, i) => (
                <a
                key={i}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group mb-3">
                    <div className="text-sm font-medium group-hover:text-cyan-300 transition">{proj.name}</div>
                    <div className="text-xs text-gray-400">{proj.tags?.join(", ")}</div>
                </a>
            ))}
        </section>
    );
}