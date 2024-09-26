import React, { useEffect, useRef, useCallback } from "react";

const Table = ({ users, pageNumber, onLoadMore }) => {
  const userList = Array.isArray(users.data) ? users.data : [];

  const loader = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

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
      <div ref={loader} className="text-center py-4">
        <span>Loading more...</span>
      </div>
    </div>
  );
};

export default Table;
