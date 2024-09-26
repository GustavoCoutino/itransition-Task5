const Table = ({ users, pageNumber, onNextPage, onPreviousPage }) => {
  const userList = Array.isArray(users.data) ? users.data : [];
  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.identifier} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{user.identifier}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={onPreviousPage}
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {pageNumber}</span>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={onNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
