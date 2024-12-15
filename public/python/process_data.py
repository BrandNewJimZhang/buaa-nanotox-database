import pandas as pd
import sys
import json

def process_data(file_path):
    # Step 1: Load the Excel file using pandas
    df = pd.read_excel(file_path)

    # Step 2: Define columns that need to be numeric
    numeric_columns = ['diameter mean', 'Chemical Purity Mean(%)', 'surface(m2/g)', 'zp mean', 'Toxcity Conc Mean']

    # Step 3: Filter out rows where any of the numeric columns contain non-numeric values
    df = df.dropna(subset=numeric_columns)  # Drop rows with missing values in numeric columns
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')  # Convert to numeric, coerce errors to NaN

    df = df.dropna()  # Drop rows with non-numeric values (i.e., NaN)

    # Step 4: Return the cleaned data as JSON
    cleaned_data = df.to_dict(orient='list')
    return json.dumps(cleaned_data)

if __name__ == "__main__":
    file_path = sys.argv[1]
    cleaned_data = process_data(file_path)
    print(cleaned_data)
