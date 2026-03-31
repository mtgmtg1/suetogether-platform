# ============================================================
# ML Pipeline Config
import os


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    VLM_MODEL_PATH: str = os.getenv("VLM_MODEL_PATH", "naver-clova-ix/donut-base")
    LAYOUTLM_MODEL_PATH: str = os.getenv("LAYOUTLM_MODEL_PATH", "microsoft/layoutlmv3-base")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    MAX_CHUNK_SIZE: int = int(os.getenv("MAX_CHUNK_SIZE", "1000"))
    CHUNK_OVERLAP: int = int(os.getenv("CHUNK_OVERLAP", "200"))


settings = Settings()
