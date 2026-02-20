import React, { useState } from "react";

const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Sophia", "Elijah", "Isabella", "Lucas", "Mia", "Mason", "Charlotte", "Ethan", "Amelia"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson"];
const streets = ["Oak St", "Maple Ave", "Cedar Ln", "Pine Rd", "Elm Dr", "Main St", "Park Ave", "Lake Rd"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH"];

const FakeNameGenerator = () => {
  const [person, setPerson] = useState(null);

  const generate = () => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const streetNum = Math.floor(Math.random() * 9999) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zip = Math.floor(Math.random() * 90000) + 10000;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 99)}@example.com`;
    setPerson({
      name: `${first} ${last}`,
      address: `${streetNum} ${street}, ${city}, ${state} ${zip}`,
      email,
    });
  };

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 bg-gray-50">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">Fake Name Generator</h1>
      <p className="mb-6 text-sm sm:text-lg text-gray-600 text-center max-w-xl">
        Generate random fake names and details for testing.
      </p>
      <div className="w-full max-w-md space-y-4">
        <button onClick={generate} className="btn-gradient px-6 py-2 rounded-lg text-white w-full">
          Generate
        </button>
        {person && (
          <div className="bg-white rounded-xl border p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">{person.name}</span>
              <button onClick={() => copy(person.name)} className="text-sm text-blue-600 hover:underline">Copy</button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>{person.address}</span>
              <button onClick={() => copy(person.address)} className="text-blue-600 hover:underline">Copy</button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>{person.email}</span>
              <button onClick={() => copy(person.email)} className="text-blue-600 hover:underline">Copy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeNameGenerator;
