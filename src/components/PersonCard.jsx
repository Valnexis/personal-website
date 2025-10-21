export default function PersonCard({ person, onSelect }) {
    return (
        <button
            onClick={() => onSelect(person.id)}
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 text-left hover:border-cyan-400/60 hover:bg-white/20 transition text-white">
            <div className="flex items-center gap-4">
                <img src={person.avatar} alt={person.name} className="h-14 w-14 rounded-xl object-cover"/>
                <div>
                    <h2 className="text-lg font-semibold">{person.name}</h2>
                    <p className="text-sm text-gray-400">{person.role}</p>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-300">{person.profile}</p>
        </button>
    );
}