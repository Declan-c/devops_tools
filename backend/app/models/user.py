from app.core.database import Base
from sqlalchemy import Column, Integer, String, Boolean

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(255))
    email = Column(String(100))
    phone = Column(String(50), unique=True, index=True)
    roles = Column(String(10))
    is_active = Column(Boolean, default=True)

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)
    description = Column(String(255))