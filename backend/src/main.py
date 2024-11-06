from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import hashlib
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from contextlib import asynccontextmanager

from .schema.schema import UserCreate
from .database.database import get_db, create_item
from .database.models import User

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
async def get_data():
    response = {"message": "Hello World!"}
    return response


@app.get("/login")
async def login():
    response = {"message": "Login Page"}
    return response


# ユーザー登録エンドポイント
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.Email == user.Email)
    result = await db.execute(stmt)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # パスワードをハッシュ化して保存
    hashed_password = hash_password(user.Password)
    new_user = User(Name=user.Name, Email=user.Email, Password=hashed_password)
    await create_item(new_user,db)

    return {"id": new_user.Id, "name": new_user.Name, "email": new_user.Email}


def hash_password(password: str) -> str:
    # ハッシュ化関数の実装
    return hashlib.sha256(password.encode()).hexdigest()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
