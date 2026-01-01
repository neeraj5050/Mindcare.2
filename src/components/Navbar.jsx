// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom"; // ← Added useNavigate
import { signOut } from "firebase/auth"; // ← For logout
import { auth } from "../firebaseConfig"; // ← Your Firebase config
import logo from "../pages/image/logo.png";

// import logo from '/path/to/logo.svg';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ← To redirect after logout

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Journal", path: "/journal" },
    { name: "Mood Tracker", path: "/mood" },
    { name: "Music", path: "/music" },
    { name: "Relax", path: "/relax" },
    { name: "Help", path: "/help" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("✅ Logged out successfully!");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      alert("❌ Logout failed. Please try again.");
    }
  };

  const currentPath = location.pathname;

  return (
    <div
      style={{
        background: "#d0e8d0",
        borderRadius: "20px",
        padding: "20px 40px",
        margin: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        top: "20px",
        zIndex: 1000,
      }}
    >
      {/* Logo + Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
        <img
          src={logo}
          alt="MindCare Logo"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
        <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#2e7d32", margin: 0 }}>
          MINDCARE
        </h1>
      </div>

      {/* Navigation Buttons + Logout */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", alignItems: "center" }}>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link key={item.name} to={item.path} style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "12px 28px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: isActive ? "#4caf50" : "#a5d6a7",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 6px 15px rgba(76,175,80,0.4)" : "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  transform: isActive ? "translateY(-3px)" : "translateY(0)",
                }}
                onMouseEnter={(e) => !isActive && (e.target.style.background = "#81c784")}
                onMouseLeave={(e) => !isActive && (e.target.style.background = "#a5d6a7")}
              >
                {item.name}
              </button>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: "600",
            background: "#e57373", // Soft red for logout
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(229,115,115,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ef5350")}
          onMouseLeave={(e) => (e.target.style.background = "#e57373")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
// src/components/Navbar.jsx
// src/components/Navbar.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import PillNav from "../component/PillNav"; // ← Your pill navigation component
// import logo from "../pages/image/logo.png"; // ← Your actual logo path

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navItems = [
//     { label: "Home", href: "/home" },
//     { label: "Chatbot", href: "/chatbot" },
//     { label: "Journal", href: "/journal" },
//     { label: "Mood Tracker", href: "/mood" },
//     { label: "Music", href: "/music" },
//     { label: "Relax", href: "/relax" },
//     { label: "Help", href: "/help" },
//     { label: "logout", href: "/login" },
//   ];

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       alert("✅ Logged out successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("❌ Logout failed.");
//     }
//   };

//   return (
//     <div
//       style={{
//         background: "#d0e8d0",
//         borderRadius: "30px",
//         padding: "30px 40px",
//         margin: "20px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         position: "sticky",
//         top: "20px",
//         zIndex: 1000,
//       }}
//     >
//       {/* Logo + Title */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "20px",
//           marginBottom: "30px",
//         }}
//       >
//         <img
//           src={logo}
//           alt="MindCare Logo"
//           style={{
//             width: "70px",
//             height: "70px",
//             borderRadius: "50%",
//             objectFit: "contain",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//           }}
//         />
//         <h1
//           style={{
//             fontSize: "44px",
//             fontWeight: "bold",
//             color: "#2e7d32",
//             margin: 0,
//           }}
//         >
//           MINDCARE
//         </h1>
//       </div>

//       {/* Pill Navigation */}
//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
//         <PillNav
//           logo={null} // We already show logo above, so hide it in PillNav
//           items={navItems}
//           activeHref={location.pathname} // Automatically highlights current page
//           baseColor="#a5d6a7"           // Inactive button background (light green)
//           pillColor="#4caf50"           // Moving pill background (darker green)
//           pillTextColor="#ffffff"       // Text color when active (white)
//           hoveredPillTextColor="#ffffff"
//           textColor="#2e7d32"            // Inactive text color (dark green)
//           ease="power3.out"
//           className="mindcare-pill-nav"
//         />
//       </div>

      // {/* Logout Button - Separate, below the pill nav */}
      /* <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 32px",
            fontSize: "18px",
            fontWeight: "600",
            background: "#e57373",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(229,115,115,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ef5350")}
          onMouseLeave={(e) => (e.target.style.background = "#e57373")}
        >
          Logout
        </button>
//       </div> */
//     </div>
// //   );
// };

// export default Navbar;
// src/components/Navbar.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import PillNav from "../component/PillNav"; // ← Your PillNav component path
// import logo from "../pages/image/logo.png";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       alert("✅ Logged out successfully!");
//       navigate("/"); // Redirect to login page
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("❌ Failed to log out. Try again.");
//     }
//   };

//   const navItems = [
//     { label: "Home", href: "/home" },
//     { label: "Chatbot", href: "/chatbot" },
//     { label: "Journal", href: "/journal" },
//     { label: "Mood Tracker", href: "/mood" },
//     { label: "Music", href: "/music" },
//     { label: "Relax", href: "/relax" },
//     { label: "Help", href: "/help" },
//     // Special logout item (no href, we'll handle click manually)
//     { label: "Logout", href: "/login" }, 
//   ];

//   // Custom click handler for Logout
//   const handleItemClick = (item) => {
//     if (item.label === "Logout") {
//       handleLogout();
//     }
//   };

//   return (
//     <div
//       style={{
//         background: "#d0e8d0",
//         borderRadius: "30px",
//         padding: "30px 40px",
//         margin: "20px auto",
//         maxWidth: "1200px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//         position: "sticky",
//         top: "20px",
//         zIndex: 1000,
//       }}
//     >
//       {/* Title Only - No Logo on Left */}
//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <h1
//           style={{
//             fontSize: "44px",
//             fontWeight: "bold",
//             color: "#2e7d32",
//             margin: 0,
//           }}
//         >
//           MINDCARE
//         </h1>
//       </div>

//       {/* Pill Navigation with Logout at the end */}
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <PillNav
//           // logo={null} // Completely hides logo inside PillNav
//           items={navItems}
//           // activeHref={location.pathname === "#" ? "/home" : location.pathname} // Prevent logout from being "active"
//           onItemClick={handleItemClick} // ← Important: custom click for Logout
//           baseColor="#a5d6a7"            // Light green background
//           pillColor="#4caf50"             // Moving pill (active)
//           pillTextColor="#ffffff"         // Active text
//           textColor="#2e7d32"             // Inactive text
//           hoveredPillTextColor="#ffffff"
//           ease="power3.out"
//           className="mindcare-nav"
//         />
//       </div>
//     </div>
//   );
// };

// export default Navbar;