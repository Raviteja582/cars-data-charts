import { BaseSyntheticEvent } from "react";
import { auth } from "store/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfileOverview = () => {
  const navigate = useNavigate();

  const handleSignOut = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    try {
      await signOut(auth);
      sessionStorage.clear();
      navigate("/basic");
    } catch (error) {
      console.error("failed to signOut", error);
    }
  };
  return (
    <div className="m-auto box-border p-10">
      <button
        onClick={handleSignOut}
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileOverview;
