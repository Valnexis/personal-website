import people from "../data/people.json";
/**
 * Simulate fetching all people.
 * @returns {Promise<Array>}
 */

export async function getAllPeople() {
        await new Promise(res => setTimeout(res, 300));
        return people;
}