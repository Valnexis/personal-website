/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(motion|PersonCard)$" }] */
import { motion } from "framer-motion";
import PersonCard from "./PersonCard.jsx";

export default function BentoGrid({ people, onSelect }) {
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 }}
    };
    return (
        <motion.div
            className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial={false}
            animate="show"
        >
            {people.map(p => (
                <motion.div key={p.id} variants={{
                    hidden: { y:20, opacity: 0 },
                    show: { y: 0, opacity: 1 }
                }}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.4 }}
                >
                    <PersonCard person={p} onSelect={onSelect} />
                </motion.div>
            ))}
        </motion.div>
    );
}