from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from fastapi import Depends

from dotenv import load_dotenv

load_dotenv()

import os


DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")
print(DB_USER), print(DB_PASS), print(DB_NAME)

# f-stringで環境変数を埋め込み
DATABASE_URL = f"mysql+aiomysql://{DB_USER}:{DB_PASS}@localhost/{DB_NAME}"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine, expire_on_commit=False, class_=AsyncSession
)

# 非同期セッションを生成する依存関数
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def create_item(item, db: AsyncSession):
    db.add(item)
    await db.commit()  # 非同期でコミット
    await db.refresh(item)  # 非同期でリフレッシュ
    return item
