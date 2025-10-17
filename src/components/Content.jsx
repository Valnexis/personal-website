import React, { useState } from "react";
import BentoBox from "./BentoBox";
import PersonSelector from "./PersonSelector";

export default function Content() {
    const [personId, setPersonId] = useState('person1'); // you are person1 by default

    return (
        <div>
            <PersonSelector value={personId} onChange={setPersonId} />
            <BentoBox personId={personId} />
        </div>
    );
}