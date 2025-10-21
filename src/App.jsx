import { useEffect, useState } from "react";
import { getAllPeople } from "./lib/db.js";
import BentoGrid from "./components/BentoGrid.jsx";
import ProfileView from "./components/ProfileView/ProfileView.jsx";

export default function App() {
  const [people, setPeople] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        getAllPeople().then(setPeople);
    }, []);

    useEffect(() => {
        if (!selectedId)  {
            setSelectedPerson(null);
            return;
        }
        const person = people.find(p => p.id === selectedId);
        setSelectedPerson(person);
    }, [selectedId, people]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {!selectedPerson ? (
                <BentoGrid people={people} onSelect={setSelectedId} />
            ) : (
                <ProfileView
                    person={selectedPerson}
                    onBack={() => setSelectedId(null)} />
            )}
        </div>
    );
}