from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .routers import auth

app = FastAPI(
    title="自动化巡检系统API",
    version="0.1.0",
    docs_url="/docs" if settings.app_env == "development" else None
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由注册
app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}