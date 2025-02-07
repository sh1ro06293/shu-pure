from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import hashlib
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from contextlib import asynccontextmanager
from typing import List, Optional

from .schema.schema import (
    UserCreate,
    Messagas,
    UserLogin,
    Message,
    SaveMessage,
    LikeRecipe,
)
from .database.database import get_db, create_item
from .database.models import User, ChatRecipe
from .database.models import User, ChatRecipe
from .post import post_appi, prompt

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_data():
    response = {"message": "Hello World!"}
    return response


@app.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.Email == user.Email)
    result = await db.execute(stmt)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        hashed_password = hash_password(user.Password)

        if existing_user.Password == hashed_password:
            return {
                "id": existing_user.Id,
                "name": existing_user.Name,
                "email": existing_user.Email,
            }
        else:
            raise HTTPException(status_code=400, detail="パスワードが間違っています。")
    else:
        raise HTTPException(status_code=400, detail="メールアドレスが間違っています。")


@app.post("/register")
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.Email == user.Email)
    result = await db.execute(stmt)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="すでにメースアドレスが使用されています。"
        )

    # パスワードをハッシュ化して保存
    hashed_password = hash_password(user.Password)
    new_user = User(Name=user.Name, Email=user.Email, Password=hashed_password)
    await create_item(new_user, db)

    return {"id": new_user.Id, "name": new_user.Name, "email": new_user.Email}


def hash_password(password: str) -> str:
    # ハッシュ化関数の実装
    return hashlib.sha256(password.encode()).hexdigest()


@app.post("/chat")
async def chat(messages: Messagas):
    messages_list = []
    messages_list.append(dict(prompt))

    if messages.notFoodList:
        print(messages.notFoodList)
        not_food_prompt = Message(
            role="system",
            content=f"{messages.notFoodList}は使用しないでください。",
        )
        messages_list.append(dict(not_food_prompt))

    for i in range(messages.length()):
        messages_list.append(dict(messages.getmessage(i)))

    print(messages_list)
    response = await post_appi(messages_list)
    return response


@app.post("/save_recipe")
async def save_chat(items: SaveMessage, db: AsyncSession = Depends(get_db)):
    item = items.message
    user_id = items.user_id
    # print(recipe, user_id)
    titele = item.split("\n")[0].split("：")[1]
    food = item.split("材料：")[1].split("作り方：")[0]
    recipe = item.split("作り方：")[1].split("お酒のおすすめ：")[0]
    drink = item.split("お酒のおすすめ：")[1]
    likeRecipe = False

    print(food)
    print(recipe)
    print(drink)

    chat_recipe = ChatRecipe(
        UserId=user_id,
        Recipe=recipe,
        Title=titele,
        Food=food,
        Drink=drink,
        LikeRecipe=likeRecipe,
    )

    await create_item(chat_recipe, db)
    return {"message": "レシピを保存しました。"}


@app.get("/save_recipe/{user_id}")
async def get_chat_recipe_ids(user_id: int, db: AsyncSession = Depends(get_db)):
    stmt = select(ChatRecipe).where(ChatRecipe.UserId == user_id)
    result = await db.execute(stmt)
    chat_recipes = result.scalars().all()

    recipes = []
    for chat_recipe in chat_recipes:
        recipe = {
            "message": chat_recipe.Title,
            "id": chat_recipe.Id,
            "like": chat_recipe.LikeRecipe,
        }
        recipes.append(recipe)
    print(recipes)

    return {"recipes": recipes}


@app.get("/save_recipe/{user_id}/{recipeid}")
async def get_chat_recipe_ids(
    user_id: int, recipeid: int, db: AsyncSession = Depends(get_db)
):
    print(user_id, recipeid)
    # 条件を修正: "and" ではなく "&" を使う（SQLAlchemyの条件式）
    stmt = select(ChatRecipe).where(
        (ChatRecipe.UserId == user_id) & (ChatRecipe.Id == recipeid)
    )
    result = await db.execute(stmt)
    chat_recipe = result.scalars().first()  # 単一の結果を取得

    if not chat_recipe:
        raise HTTPException(
            status_code=404, detail="このユーザーのレシピは見つかりません。"
        )
    data = {
        "title": chat_recipe.Title,
        "recipe": chat_recipe.Recipe,
        "food": chat_recipe.Food,
        "drink": chat_recipe.Drink,
        "like": chat_recipe.LikeRecipe,
    }
    return {"message": data}


@app.post("/like")
async def post_like_recipe(items: LikeRecipe, db: AsyncSession = Depends(get_db)):
    recipe_id = items.recipeid

    # レシピを取得
    query = select(ChatRecipe).where(ChatRecipe.Id == recipe_id)
    result = await db.execute(query)
    recipe = result.scalars().one_or_none()

    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # LikeRecipe フィールドを更新
    recipe.LikeRecipe = items.like

    # 更新をコミット
    try:
        await db.commit()
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update recipe like")

    return {"message": "Recipe like updated successfully"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
