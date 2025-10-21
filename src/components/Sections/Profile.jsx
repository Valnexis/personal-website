export default function Profile({ person }) {
    return (
        <section className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <header className="flex items-center gap-3 mb-3">
                <img src={person.avatar} alt={`${person.name} avatar`} className="h-12 w-12 rounded-lg object-cover"/>
                <div>
                    <h2 className="font-semibold taxt-lg">{person.name}</h2>
                    <p className="text-sm text-gray-400">{person.role}</p>
                </div>
            </header>
            <p className="text-sm leading-6 text-gray-200">{person.profile}</p>
        </section>
    );
}