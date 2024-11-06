from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "UserTable"

    Id = Column(Integer, primary_key=True)
    Name = Column(String, nullable=False)
    Email = Column(String, nullable=False, unique=True)
    Password = Column(String, nullable=False)
