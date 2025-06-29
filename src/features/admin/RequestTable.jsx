const RequestTable = ({ requests }) => {
  if (!requests.length) return <p>No adoption requests yet.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="w-full text-left">
        <thead className="text-gray-600">
          <tr>
            <th>Pet</th>
            <th>User Email</th>
            <th>Message</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-t text-sm">
              <td>{r.petName}</td>
              <td>{r.userEmail}</td>
              <td>{r.message}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
