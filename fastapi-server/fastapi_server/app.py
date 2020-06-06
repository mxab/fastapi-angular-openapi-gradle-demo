# copied and modified from https://fastapi.tiangolo.com/tutorial/extra-models/
import uuid
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import List
app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str = None


class UserInDB(BaseModel):
    username: str
    hashed_password: str
    email: EmailStr
    full_name: str = None


def fake_password_hasher(raw_password: str):
    return "supersecret" + raw_password


db = {}

def fake_save_user(user_in: UserIn):
    hashed_password = fake_password_hasher(user_in.password)
    user_in_db = UserInDB(**user_in.dict(), hashed_password=hashed_password)
    id = uuid.uuid4()
    db[id] = user_in_db
    return user_in_db


@app.post("/users", response_model=UserOut)
async def create_user(*, user_in: UserIn):
    user_saved = fake_save_user(user_in)
    return user_saved

@app.get("/users", response_model=List[UserOut])
async def list_users():
    global db
    return list(db.values())
    