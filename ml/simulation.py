import pandas as pd
import numpy as np

def generate_student_data(n_samples=1000):
    np.random.seed(42)
    
    # Features
    attendance_pct = np.random.normal(82, 10, n_samples).clip(0, 100)
    quiz_avg = np.random.normal(70, 15, n_samples).clip(0, 100)
    study_hours_wk = np.random.gamma(5, 2, n_samples).clip(1, 30)
    midterm = (0.7 * quiz_avg + np.random.normal(0, 5, n_samples)).clip(0, 100)
    on_time_submit_pct = np.random.normal(85, 12, n_samples).clip(0, 100)
    
    # Target Logic (Simplified but noisy)
    # A student passes if weight of features is high
    score = (
        0.3 * (attendance_pct/100) + 
        0.3 * (quiz_avg/100) + 
        0.2 * (study_hours_wk/20) + 
        0.2 * (on_time_submit_pct/100)
    )
    
    noise = np.random.normal(0, 0.05, n_samples)
    final_score = (score + noise).clip(0, 1)
    
    # Class: 1 = Pass, 0 = At Risk (Fail/Poor)
    passed = (final_score > 0.55).astype(int)
    
    df = pd.DataFrame({
        'attendance_pct': attendance_pct,
        'quiz_avg': quiz_avg,
        'study_hours_wk': study_hours_wk,
        'midterm': midterm,
        'on_time_submit_pct': on_time_submit_pct,
        'passed': passed
    })
    
    return df

if __name__ == "__main__":
    df = generate_student_data(5000)
    df.to_csv("data/student_data.csv", index=False)
    print("Dataset generated successfully in data/student_data.csv")
