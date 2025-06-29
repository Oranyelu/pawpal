const RequestTable = ({ requests }) => {
  if (!requests.length) return <p>No adoption requests yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Pet</th>
            <th className="border p-2 text-left">User</th>
            <th className="border p-2 text-left">Message</th>
            <th className="border p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50">
              <td className="border p-2">{req.petName}</td>
              <td className="border p-2">{req.userEmail}</td>
              <td className="border p-2">{req.message}</td>
              <td className="border p-2">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
