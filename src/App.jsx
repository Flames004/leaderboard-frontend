import { useEffect, useState } from "react";
import UserSelector from "./components/UserSelector";
import AddUserForm from "./components/AddUserForm";
import { fetchUsers, addUser, claimPoints } from "./services/api";
import ClaimHistory from "./components/ClaimHistory";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [lastClaim, setLastClaim] = useState(null);
  const [refreshHistoryFlag, setRefreshHistoryFlag] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch users on load
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (name) => {
    try {
      setError(null);
      await addUser(name);
      await loadUsers();
    } catch (err) {
      setError(err.message);
      console.error('Failed to add user:', err);
    }
  };

  const handleClaim = async () => {
    if (!selectedUserId) return alert("Please select a user");
    try {
      setError(null);
      const res = await claimPoints(selectedUserId);
      setLastClaim(res.data);
      setRefreshHistoryFlag((prev) => prev + 1); // 🔁 triggers history refresh
      await loadUsers(); // update leaderboard
    } catch (err) {
      setError(err.message);
      console.error('Failed to claim points:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard App</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded border border-red-300">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 bg-blue-100 text-blue-700 p-3 rounded">
          Loading...
        </div>
      )}

      <AddUserForm onAdd={handleAddUser} />
      <UserSelector
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      <button
        onClick={handleClaim}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        🎲 Claim Points
      </button>

      {lastClaim && (
        <div className="mb-4 bg-green-100 text-green-700 p-2 rounded">
          {lastClaim.user.name} claimed {lastClaim.points} points!
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <ul className="divide-y border rounded">
        {users.map((user) => (
          <li key={user._id} className="p-2 flex justify-between">
            <span>
              {user.rank}. {user.name}
            </span>
            <span>{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
      <ClaimHistory refreshTrigger={refreshHistoryFlag} />
    </div>
  );
}

export default App;
