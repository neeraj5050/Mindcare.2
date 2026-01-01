// import React, { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "./firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (auth.currentUser) {
//         const docRef = doc(db, "users", auth.currentUser.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
//         }
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h1>Welcome to Your Mental Health Space</h1>
//       {userData ? (
//         <div>
//           <p>Hello, {userData.name}!</p>
//           <p>Age: {userData.age} | Profession: {userData.profession}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading your info...</p>
//       )}
//       <br />
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;