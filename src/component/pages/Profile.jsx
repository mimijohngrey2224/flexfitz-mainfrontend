import { useContext } from "react";
// import EcomContext from "../context/EcomContext";

function Profile() {
  const { user } = useContext(EcomContext);

  if (!user) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      <div className="bg-gray-100 p-6 rounded shadow-md w-80 text-center">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;
