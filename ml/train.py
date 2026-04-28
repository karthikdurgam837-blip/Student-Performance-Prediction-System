import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_react
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

def train_model():
    # Load
    try:
        df = pd.read_csv("data/student_data.csv")
    except:
        from simulation import generate_student_data
        df = generate_student_data(2000)
        
    X = df.drop('passed', axis=1)
    y = df['passed']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Pipeline
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('rf', RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42))
    ])
    
    print("Training model...")
    pipeline.fit(X_train, y_train)
    
    # Evaluate
    y_pred = pipeline.predict(X_test)
    print("\nEvaluation Report:")
    print(classification_report(y_test, y_pred))
    
    # Save
    joblib.dump(pipeline, "models/student_model.joblib")
    print("\nModel saved to models/student_model.joblib")

if __name__ == "__main__":
    train_model()
