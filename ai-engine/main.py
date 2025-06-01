from fastapi import FastAPI, HTTPException
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
import os

load_dotenv()

# Set OpenAI API key explicitly if needed
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

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

client = MongoClient(
   os.getenv("MONGODB_URI") or "your_mongodb_connection_string_here"
)
db = client["Smart-News-Hub"]
collection = db["articles"]

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

   # Debug print
   # print(corpus)
   return articles, corpus

class RecommendRequest(BaseModel):
   article_index: int
   top_n: int = 5

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

class ChatRequest(BaseModel):
    input: str

@app.post("/chat")
def chat(request: ChatRequest):
   user_input = request.input
   if not user_input:
       raise HTTPException(status_code=400, detail="Input is required")
  
   response = conversation_chain.run(input=user_input)
   return {"response": response}
