export default function Location({ location }) {
    if (!location) return null;
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="font-semibold mb-2 text-cyan-300">Location</h3>
            <p className="text-sm text-gray-300">{location.city}, {location.country}</p>
        </section>
    );
}