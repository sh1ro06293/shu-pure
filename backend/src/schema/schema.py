from typing import Optional

from pydantic import BaseModel, Field, EmailStr


class UserCreate(BaseModel):
    Name: Optional[str] = None
    Email: EmailStr
    Password: str

