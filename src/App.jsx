import { useEffect, useState } from "react";
import { getAllPeople } from "./lib/db.js";
import BentoGrid from "./components/BentoGrid.jsx";

export default function App() {
  const [people, setPeople] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getAllPeople().then(setPeople).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-5xl w-full">
                {!selectedId ? (
                    <BentoGrid people={people} onSelect={setSelectedId} />
                ) : (
                    <div className="text-center p-10">
                        <button
                            onClick={() => setSelectedId(null)}
                            className="mb-6 text-cyan-400 underline">
                            ← Back
                        </button>
                        <h1 className="text-3xl font-bold">
                            Selected: {selectedId.toUpperCase()}
                        </h1>
                        <p className="text-gray-400 mt-4">
                            (Next step: load profile view here.)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}