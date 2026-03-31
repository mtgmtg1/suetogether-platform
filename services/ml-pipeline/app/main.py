# ============================================================
# ML Pipeline - FastAPI Main (Scaffolding)
# [Flow: FastAPI 초기화 → VLM Router 등록 → RAG Router 등록 → Health Check]
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SueTogether ML Pipeline",
    description="VLM + RAG 처리 파이프라인",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router imports - Phase 2에서 Jules 에이전트가 구현
from app.vlm.router import router as vlm_router
from app.rag.router import router as rag_router

app.include_router(vlm_router, prefix="/vlm", tags=["VLM"])
app.include_router(rag_router, prefix="/rag", tags=["RAG"])


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-pipeline"}
