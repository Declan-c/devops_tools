from pydantic import BaseModel, EmailStr, field_validator
import re

class UserRegister(BaseModel):
    username: str
    password: str
    email: EmailStr
    phone: str
    roles: str

    @field_validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('密码至少8位')
        if not re.search(r"[A-Z]", v):
            raise ValueError('必须包含大写字母')
        if not re.search(r"\d", v):
            raise ValueError('必须包含数字')
        return v

    @field_validator('phone')
    def validate_phone(cls, v):
        if not re.match(r'^1[3-9]\d{9}$', v):
            raise ValueError('手机号格式错误')
        return v

class UserInDB(BaseModel):
    username: str
    email: EmailStr
    is_active: bool

class Token(BaseModel):
    access_token: str
    token_type: str

class UserProfile(BaseModel):
    username: str
    email: str
    is_active: bool
    roles: str

class Config:
    from_attributes = True