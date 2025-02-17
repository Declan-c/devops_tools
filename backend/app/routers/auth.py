from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.models.user import User, Role
from app.schemas.user import Token, UserProfile, UserRegister
from app.core.security import verify_password, create_access_token, get_current_user
from app.deps import get_db
from app.schemas.user import UserRegister
from app.core.security import get_password_hash

router = APIRouter()

@router.post("/api/auth/token", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="无效的用户名或密码",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/api/auth/profile", response_model=UserProfile)
async def read_user_profile(current_user: User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "is_active": current_user.is_active,
        "roles": current_user.roles
    }

@router.post("/api/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    # 检查用户名是否已存在
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=400,
            detail="用户名已存在"
        )
    
    # 检查邮箱是否已注册
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=400,
            detail="邮箱已注册"
        )
    
    # 检查手机号是否已使用
    if db.query(User).filter(User.phone == user.phone).first():
        raise HTTPException(
            status_code=400,
            detail="手机号已使用"
        )
    
    # 创建用户
    db_user = User(
        username=user.username,
        email=user.email,
        phone=user.phone,
        hashed_password=get_password_hash(user.password),
        roles=user.roles
    )
    
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="注册失败，请稍后再试"
        )
    
    return {"message": "用户注册成功"}

@router.get("/api/roles")
async def get_roles(db: Session = Depends(get_db)):
    roles = db.query(Role).all()
    return [{"id": r.id, "name": r.name} for r in roles]