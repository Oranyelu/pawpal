import React from 'react'

function PetDetails() {
  return (
    <div><button
  onClick={() => navigate(`/adopt/${pet.id}`)}
  className="bg-emerald-700 text-white px-6 py-2 rounded-xl hover:bg-emerald-800 transition"
>
  Request Adoption
</button>
</div>
  )
}

export default PetDetails