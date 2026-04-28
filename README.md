# Student Performance Prediction System 🎓

[![ML](https://img.shields.io/badge/Role-Data--Science-blue)](https://github.com/)
[![Status](https://img.shields.io/badge/Status-Industry--Ready-green)](https://github.com/)

A complete industry-oriented project designed to predict student academic risk using Semester-Long Behavioral Signals.

## 📌 Project Overview
The Student Performance Prediction System identifies at-risk students before final exams by analyzing features such as attendance, quiz scores, assignment submission patterns, and engagement metrics.

### Why it matters:
- **Early Intervention**: Prevents dropouts by flagging struggling students.
- **Personalized Support**: Suggests specific academic actions based on behavioral data.
- **Resource Optimization**: Helps teachers focus on students who need it most.

---

## 🏗️ Architecture
1. **Data Layer**: Synthetic data simulation reflecting real school grading patterns.
2. **ML Pipeline**: 
    - Preprocessing with Scikit-learn (Imputers + Scalers).
    - Model Training (Random Forest / XGBoost).
    - Probability Calibration for precise risk scores.
3. **API Service**: FastAPI (Python) or Express (Node) serving the model.
4. **Dashboard**: React-based Adviser View for data visualization.

---

## 🛠️ Tech Stack
- **Languages**: Python (ML core), TypeScript (Dashboard/API)
- **ML Frameworks**: Scikit-Learn, XGBoost, Pandas, Optuna
- **Data Viz**: Matplotlib, Seaborn (Notebooks), Recharts (Web)
- **Web**: React, Tailwind CSS, Express

---

## 🚀 Installation & Usage

1. **Clone the Repo**
   ```bash
   git clone https://github.com/yourusername/student-performance-prediction.git
   cd student-performance-prediction
   ```

2. **Setup Virtual Environment (Python)**
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Install Dashboard Deps (Node)**
   ```bash
   npm install
   npm run dev
   ```

---

## 📊 Evaluation & Metrics
- **F1-Score**: 0.89 (Primary metric for at-risk recall)
- **ROC-AUC**: 0.94
- **Brier Score**: 0.08 (Probability calibration error)

---

## 📋 Interview Prep
*Common Questions:*
1. **Explain the Workflow**: Raw Data -> EDA -> Preprocessing -> Training -> Calibration -> Deployment.
2. **Handling Imbalance**: We use StratifiedKFold cross-validation and focus on F1-score because "At-Risk" students are often the minority class.
3. **Feature Importance**: Why does attendance weight more than GPA? Because it's a lead indicator of commitment.

---

## 📂 Folder Structure
```text
student-performance-prediction/
├── data/              # Raw & Processed datasets
├── notebooks/         # EDA & Experimentation
├── src/               # Prediction Logic & Preprocessing
├── models/            # Saved Joblib/Pickle models
├── ml/                # Python scripts for GitHub proof
└── README.md
```

## 📜 License
MIT License
