export default function Experience({ items= [] }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-semibold mb-2 text-cyan-300">Experience</h3>
            {items.map((ex, i ) => (
                <div key={i} className="mb-2 text-sm">
                    <div className="font-medium">{ex.company}</div>
                    <div className="text-gray-400">{ex.title}</div>
                    <div className="text-xs text-gray-500">{ex.years}</div>
                    <ul className="list-disc list-inside text-gray-400">
                        {ex.points?.map((p, j) => (
                            <li key={j}>{p}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
}