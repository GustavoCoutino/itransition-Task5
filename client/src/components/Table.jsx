const Table = ({ users }) => {
  const userList = Array.isArray(users.data) ? users.data : [];
  return (
    <div className="mt-4 pt-20">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Record Number</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr
                key={`${user.identifier}-${index}`}
                className="hover:bg-gray-100"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.identifier}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
