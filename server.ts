import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Authentication Endpoint
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.json({
        user: {
          id: "USR-001",
          name: "Academic Advisor",
          email: email,
          role: "SENIOR_ADVISOR",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        },
        token: "mock-jwt-token-12345"
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Advanced Explainability Engine (Simulated SHAP/LIME values)
  app.post("/api/predict", (req, res) => {
    const { 
      attendance_pct, 
      quiz_avg, 
      study_hours_wk, 
      midterm, 
      on_time_submit_pct 
    } = req.body;

    const baseScore = 0.3;
    const score = 
      (attendance_pct / 100) * 0.35 +
      (quiz_avg / 100) * 0.25 +
      (Math.min(study_hours_wk, 20) / 20) * 0.15 +
      (midterm / 100) * 0.15 +
      (on_time_submit_pct / 100) * 0.1;

    const risk_prob = 1 - score;
    const at_risk = risk_prob > 0.45;

    // Simulated SHAP / Feature Contributions
    const contributions = [
      { feature: "Attendance", impact: (attendance_pct - 80) * 0.4 },
      { feature: "Quiz Performance", impact: (quiz_avg - 70) * 0.3 },
      { feature: "Study Commitment", impact: (study_hours_wk - 10) * 0.2 },
      { feature: "Midterm Logic", impact: (midterm - 60) * 0.1 }
    ];

    const interventions = [];
    if (attendance_pct < 75) interventions.push({ id: 1, text: "Mandatory Counselor Check-in", type: "CRITICAL" });
    if (quiz_avg < 60) interventions.push({ id: 2, text: "Enroll in Foundation Workshop", type: "ACADEMIC" });
    if (study_hours_wk < 5) interventions.push({ id: 3, text: "Effective Study Habits Seminar", type: "LIFESTYLE" });
    if (on_time_submit_pct < 80) interventions.push({ id: 4, text: "Automated Deadline Nudges", type: "TECH" });

    res.json({
      risk_prob,
      at_risk,
      interventions,
      contributions,
      metrics: {
        latency_ms: Math.floor(Math.random() * 40) + 10,
        model_ver: "v2.4.1-stable"
      }
    });
  });

  // Batch Scoring Simulation for Classroom View
  app.get("/api/batch-score", (req, res) => {
    const names = ["Alex Rivera", "Jordan Chen", "Maya Patel", "Sam Wilson", "Elena Rodriguez", "Chris Lee", "Taylor Swift", "Morgan Freeman"];
    const students = names.map((name, i) => {
      const risk = Math.random();
      return {
        id: `STU-${1000 + i}`,
        name,
        risk: risk.toFixed(2),
        status: risk > 0.5 ? "CRITICAL" : risk > 0.3 ? "WATCH" : "STABLE",
        lastActivity: "2h ago"
      };
    });
    res.json(students);
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
