import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

class TextService:
    @staticmethod
    def analyze_text(text):
        sia = SentimentIntensityAnalyzer()
        return sia.polarity_scores(text)
