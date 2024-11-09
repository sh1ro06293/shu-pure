import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

from .schema.schema import Message

prompt = Message(
    role="system",
    content="食材を入力するのでその材料を使ったおつまみのレシピと作り方を教えてください。その時のお酒のおすすめも教えてください。出力にはマークダウンを使用しないでください。",
)


async def post_appi(messegas):

    # url = os.getenv("API_URL")
    url = "http://127.0.0.1:8002/"

    payload = json.dumps(
        {
            "model": "gpt-4o-mini",
            "messages": messegas,
        }
    )

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('API_KEY')}",  # ダブルクォートを修正
    }

    response = requests.post(
        url, headers=headers, data=payload
    )

    response_json = response.json()
    # messagesを取り出す
    messages = Message(
        role=response_json["choices"][0]["message"]["role"],
        content=response_json["choices"][0]["message"]["content"],
    )

    return messages
