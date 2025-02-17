from app.core.database import SessionLocal
from app.models.user import User, Role
from app.core.security import get_password_hash

def init_db():
    db = SessionLocal()

    # 初始化角色
    roles = [
        {"name": "admin", "description": "系统管理员"},
        {"name": "operator", "description": "运维人员"},
        {"name": "viewer", "description": "只读用户"}
    ]
    for role_data in roles:
        if not db.query(Role).filter(Role.name == role_data["name"]).first():
            db.add(Role(**role_data))
    
    # 初始化管理员用户
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        admin = User(
            username="admin",
            email="admin@example.com",
            hashed_password=get_password_hash("admin123"),
            roles = "admin",
            is_active=True
        )
        db.add(admin)
        db.commit()

    db.close()

if __name__ == "__main__":
    init_db()