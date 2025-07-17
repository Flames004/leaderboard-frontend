import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistory();
      setHistory(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">📜 Claim History</h2>
      {history.length === 0 ? (
        <p className="text-sm text-gray-500">No claims yet.</p>
      ) : (
        <ul className="border rounded divide-y">
          {history.map((entry, index) => (
            <li key={index} className="p-2 flex justify-between text-sm">
              <span>
                <strong>{entry.user}</strong> claimed <strong>{entry.points}</strong> pts
              </span>
              <span className="text-gray-500">
                {new Date(entry.time).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClaimHistory;
