import pandas as pd
import matplotlib.pyplot as plt

def is_float(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

def process_and_plot(csv_path):
    df = pd.read_csv(csv_path)
    x = df['diameter mean'].values
    x = [float(i) for i in x if is_float(i)]
    y = df['Toxicity Conc Mean'].values
    y = [float(i) for i in y if is_float(i)]
    y = y[:len(x)]  # Ensure x and y are the same length
    plt.figure()
    plt.scatter(x, y, s=1.5)
    plt.xlabel('Diameter Mean')
    plt.ylabel('Toxicity Conc. Mean')
    plt.savefig('./public/output/plot.png')  # Ensure this directory exists
    return df.describe().to_json()  # Example processing

if __name__ == "__main__":
    import sys
    result = process_and_plot(sys.argv[1])
    print(result)