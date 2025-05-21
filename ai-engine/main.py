from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import re


load_dotenv()

# ----------------------------
# FastAPI App and CORS Config
# ----------------------------
app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://fyp-2-frontend.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# MongoDB Connection
# ----------------------------
client = MongoClient(
    "mongodb+srv://ahmedafzal:Ahmed123@backenddb.jxgs6.mongodb.net/Smart-News-Hub"
)
db = client["Smart-News-Hub"]
collection = db["articles"]

# ----------------------------
# Utility Functions
# ----------------------------
def clean_html(raw_html):
    if not isinstance(raw_html, str):
        return ""
    clean = re.sub("<.*?>", "", raw_html)
    return clean.strip().lower()

def preprocess_articles():
    articles_cursor = collection.find()
    articles = list(articles_cursor)
    corpus = []

    for article in articles:
        title = clean_html(article.get("title", ""))
        summary = clean_html(article.get("summary", ""))
        content = clean_html(article.get("content", ""))
        tags = " ".join(article.get("tags", []))
        text = f"{title} {summary} {content} {tags}"
        corpus.append(text)

    return articles, corpus

# ----------------------------
# Model Input Schema
# ----------------------------
class RecommendRequest(BaseModel):
    article_index: int
    top_n: int = 5

# ----------------------------
# Recommendation Endpoint
# ----------------------------
@app.post("/recommend")
def get_recommendations(request: RecommendRequest):
    articles, corpus = preprocess_articles()

    if request.article_index < 0 or request.article_index >= len(articles):
        raise HTTPException(status_code=400, detail="Invalid article index")

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    sim_scores = list(enumerate(cosine_sim[request.article_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1: request.top_n + 1]

    recommendations = [
        {
            "id": str(articles[i].get("_id", "")),
            "title": clean_html(articles[i].get("title", "")),
            "score": round(score, 2),
        }
        for i, score in sim_scores
    ]

    return {
        "original_title": clean_html(articles[request.article_index].get("title", "")),
        "recommendations": recommendations,
    }

# ----------------------------
# LangChain Chat Setup
# ----------------------------
llm = OpenAI(temperature=0.7)
memory = ConversationBufferMemory()

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template="""
You are a helpful content assistant.

Conversation History:
{history}

User: {input}

AI:
"""
)

conversation_chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

# ----------------------------
# Chat Endpoint
# ----------------------------
@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_input = data.get("input")
    if not user_input:
        raise HTTPException(status_code=400, detail="Input is required")
    
    response = conversation_chain.run(input=user_input)
    return {"response": response}
