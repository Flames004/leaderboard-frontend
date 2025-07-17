const UserSelector = ({ users, selectedUserId, setSelectedUserId }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select User
      </label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">-- Choose a user --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;
