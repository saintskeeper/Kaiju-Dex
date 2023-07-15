import { useState } from 'react'
import { firebase, db}  from '../../lib/Firebase/firebase'


function DiscordForm() {
  const [discordID, setDiscordID] = useState('');
  const [number, setNumber] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error
    setError('');

    // Get a reference to the firestore collection and the lastAssigned document
    const numbersRef = db.collection('numbers');
    const metadataRef = db.collection('metadata').doc('lastAssigned');

    // Check if the Discord ID already has a number assigned
    const existingDocs = await numbersRef.where('discordID', '==', discordID).get();

    if (!existingDocs.empty) {
      setError("This Discord ID already has a number assigned.");
      return;
    }

    try {
      // Start a transaction
      const newNumber = await db.runTransaction(async (transaction) => {
        // Get the current lastAssigned document
        const lastAssignedDoc = await transaction.get(metadataRef);

        // If it doesn't exist or number reached maximum limit, throw an error
        if (!lastAssignedDoc.exists || lastAssignedDoc.data().number >= 1000) {
          throw "No more numbers to assign!";
        }

        // Increment the number
        const newNumber = lastAssignedDoc.data().number + 1;

        // Update the lastAssigned document with the new number
        transaction.update(metadataRef, { number: newNumber });

        // Return the new number so we can use it after the transaction
        return newNumber;
      });

      // If the transaction was successful, newNumber contains the new number
      // Assign this number to the new user
      await numbersRef.add({
        number: newNumber,
        discordID: discordID,
      });

      // Update state
      setNumber(newNumber);
    } catch (error) {
      setError("Error assigning number: " + error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discordID">
            Discord ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discordID"
            type="text"
            value={discordID}
            onChange={event => setDiscordID(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
      {number &&
          <p className="text-center mt-4">Your number is: <span className="font-bold">{number}</span></p>
      }
      {error &&
          <p className="text-center mt-4 text-red-500">{error}</p>
      }
    </div>
  )
}

export default DiscordForm
