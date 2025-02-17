from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_env: str = "development"
    app_secret_key: str = "declan0221"
    debug: bool = False
    
    db_host: str = "172.18.82.143"
    db_port: int = 5432
    db_name: str = "sre_tools"
    db_user: str = "root"
    db_password: str = "7Y5QbBYFZp"
    
    prometheus_url: str = "http://localhost:9090"

    access_token_expire_minutes: int = 30
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()