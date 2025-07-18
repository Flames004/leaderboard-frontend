import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';

const ClaimHistory = ({refreshTrigger}) => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getHistory();
        setHistory(res.data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [refreshTrigger]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">📜 Claim History</h2>
      
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-2 rounded text-sm">
          Failed to load history: {error}
        </div>
      )}

      {loading && (
        <div className="text-sm text-gray-500">Loading history...</div>
      )}

      {!loading && !error && history.length === 0 ? (
        <p className="text-sm text-gray-500">No claims yet.</p>
      ) : !loading && !error ? (
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
      ) : null}
    </div>
  );
};

export default ClaimHistory;
