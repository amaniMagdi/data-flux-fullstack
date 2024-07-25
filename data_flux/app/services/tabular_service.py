import pandas as pd

# Contain the business logic and interact with the data layer
class TabularService:
    @staticmethod
    def process_tabular_data(data):
        df = pd.DataFrame(data)
        # Perform data processing and analysis
        return df.describe().to_dict()
