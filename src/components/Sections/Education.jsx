export default function Education({ items = [] }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-semibold mb-2 text-cyan-300">Education</h3>
            {items.map((ed, i) => (
                <div key={i} className="text-sm mb-2">
                    <div className="font-medium">{ed.school}</div>
                    <div className="text-gray-400">{ed.degree}</div>
                    <div className="text-xs text-gray-500">{ed.years}</div>
                </div>
            ))}
        </section>
    );
}