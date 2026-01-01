// src/pages/Mood.jsx
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [todayMood, setTodayMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const moods = [
    { name: "Happy", emoji: "😊", color: "#fff59d" },
    { name: "Calm", emoji: "😌", color: "#a7ffeb" },
    { name: "Okay", emoji: "😐", color: "#c8e6c9" },
    { name: "Sad", emoji: "😢", color: "#bbdefb" },
    { name: "Anxious", emoji: "😰", color: "#ffccbc" },
    { name: "Angry", emoji: "😣", color: "#ffab91" },
  ];

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
      return;
    }

    const checkTodayMood = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const q = query(
        collection(db, "users", auth.currentUser.uid, "moods"),
        where("date", ">=", today),
        orderBy("date", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setTodayMood(data.mood);
      }
      setLoading(false);
    };

    checkTodayMood();
  }, [navigate]);

  const saveMood = async (moodName) => {
    if (todayMood || saving) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "moods"), {
        mood: moodName,
        date: new Date(),
      });

      setTodayMood(moodName);
      alert("🌿 Your mood has been gently saved. Thank you for checking in.");
    } catch (err) {
      console.error("Mood save error:", err);
      alert("Couldn't save your mood. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f0f7ea", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: "900px", margin: "40px auto", width: "100%", padding: "0 20px" }}>
        <div style={{
          background: "white",
          borderRadius: "30px",
          padding: "50px 40px",
          boxShadow: "0 15px 45px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "34px", fontWeight: "bold", color: "#2e7d32", margin: "0 0 16px 0" }}>
            🌿 Daily Mood Check-In
          </h2>
          <p style={{ fontSize: "20px", color: "#4caf50", margin: "0 0 40px 0" }}>
            {todayDate}
          </p>
          <p style={{ fontSize: "18px", color: "#33691e", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto 50px" }}>
            How are you feeling <em>right now</em>? There’s no wrong answer — we’re here with kindness.
          </p>

          {loading && (
            <p style={{ fontSize: "18px", color: "#4caf50" }}>Checking your mood...</p>
          )}

          {!loading && todayMood ? (
            <div style={{ padding: "40px", background: "#e8f5e8", borderRadius: "24px" }}>
              <div style={{ fontSize: "100px", marginBottom: "20px" }}>
                {moods.find(m => m.name === todayMood)?.emoji || "🌱"}
              </div>
              <h3 style={{ fontSize: "26px", color: "#2e7d32", margin: "0 0 16px 0" }}>
                You felt <strong>{todayMood}</strong> today
              </h3>
              <p style={{ fontSize: "18px", color: "#4caf50" }}>
                Thank you for sharing. Come back tomorrow — we’ll be here. 💙
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => saveMood(mood.name)}
                    disabled={saving}
                    style={{
                      padding: "24px 16px",
                      background: mood.color,
                      border: "none",
                      borderRadius: "24px",
                      cursor: "pointer",
                      boxShadow: selectedMood === mood.name ? "0 8px 25px rgba(0,0,0,0.2)" : "0 4px 15px rgba(0,0,0,0.1)",
                      transform: selectedMood === mood.name ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => !saving && (e.target.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => !saving && (e.target.style.transform = selectedMood === mood.name ? "scale(1.05)" : "scale(1)")}
                  >
                    <div style={{ fontSize: "60px", marginBottom: "12px" }}>{mood.emoji}</div>
                    <div style={{ fontSize: "18px", fontWeight: "600", color: "#2e7d32" }}>
                      {mood.name}
                    </div>
                  </button>
                ))}
              </div>

              {saving && (
                <p style={{ fontSize: "18px", color: "#4caf50", fontStyle: "italic" }}>
                  Saving your feeling...
                </p>
              )}
            </>
          )}

          <p style={{ fontSize: "16px", color: "#666", marginTop: "50px", lineHeight: "1.6" }}>
            Tracking your mood helps you understand yourself better. You're doing great just by showing up. 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mood;