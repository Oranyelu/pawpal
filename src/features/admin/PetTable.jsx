const PetTable = ({ pets, onEdit, onDelete }) => {
  if (pets.length === 0) return <p>No pets available yet.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="w-full text-left">
        <thead className="text-gray-600">
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="border-t">
              <td>{pet.name}</td>
              <td>{pet.breed}</td>
              <td>{pet.age}</td>
              <td>{pet.gender}</td>
              <td className="space-x-2">
                <button onClick={() => onEdit(pet)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => onDelete(pet.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;
