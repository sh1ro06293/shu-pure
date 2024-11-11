from typing import Optional
from typing import List


from pydantic import BaseModel, Field, EmailStr


class UserCreate(BaseModel):
    Name: Optional[str] = None
    Email: EmailStr
    Password: str


class UserLogin(BaseModel):
    Email: EmailStr
    Password: str


class Message(BaseModel):
    role: str
    content: str


class Messagas(BaseModel):
    messages: List[Message]
    notFoodList: list = None

    def length(self) -> int:
        return len(self.messages)

    def getmessage(self, index) -> Message:
        return self.messages[index]


class SaveMessage(BaseModel):
    message: str
    user_id: int
