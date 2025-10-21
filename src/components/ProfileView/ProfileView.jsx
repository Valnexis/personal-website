import Profile from "../Sections/Profile.jsx";
import Education from "../Sections/Education.jsx";
import Experience from "../Sections/Experience.jsx";
import Toolbox from "../Sections/Toolbox.jsx";
import Location from "../Sections/Location.jsx";
import Projects from "../Sections/Projects.jsx";

export default function ProfileView({ person, onBack }) {
    if (!person) return null;

    return (
        <div className="p-6 space-y-4 text-white">
            <button onClick={onBack} className="text-sm px-3 py-1 rounded-lg border border-white/20 hover:border-cyan-400/60 transition">← Back</button>
            <div className="grid md:grid-cols-2 gap-4">
                <Profile person={person}/>
                <Education items={person.education} />
                <Experience items={person.experience} />
                <Toolbox tools={person.toolbox} />
                <Location location={person.location} />
                <Projects items={person.projects} />
            </div>
        </div>
    );
}