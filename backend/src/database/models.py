from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "UserTable"

    Id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Email = Column(String, nullable=False, unique=True)
    Password = Column(String, nullable=False)


class ChatRecipe(Base):
    __tablename__ = "ChatRecipeTable"

    Id = Column(Integer, primary_key=True)
    UserId = Column(Integer, nullable=False)
    Recipe = Column(String, nullable=False)
    Title = Column(String, nullable=False)
    Food = Column(String, nullable=False)
    Drink = Column(String, nullable=False)
    LikeRecipe = Column(Boolean, nullable=False)
