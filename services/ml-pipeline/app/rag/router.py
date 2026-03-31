from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, List

from app.rag.schemas import (
    EmbedRequest, EmbedResponse,
    BatchEmbedRequest, BatchEmbedResponse,
    SearchRequest, SearchResponse,
    GenerateRequest, GenerateResponse
)
from app.rag.embeddings import EmbeddingsService
from app.rag.retriever import RetrieverService
from app.rag.generator import GeneratorService

# [Flow: RAG Router -> Endpoints (/embed, /embed-batch, /search, /generate, /health) -> Invoke Services -> Return Schema Responses]

router = APIRouter()

# 서비스 인스턴스 초기화
embeddings_service = EmbeddingsService()
retriever_service = RetrieverService(embeddings_service=embeddings_service)
generator_service = GeneratorService()

@router.post("/embed", response_model=EmbedResponse)
async def embed_text(request: EmbedRequest) -> EmbedResponse:
    """
    단일 텍스트 청크에 대한 임베딩 벡터를 생성합니다.
    """
    try:
        embedding = embeddings_service.embed_text(request.text)
        metadata = {
            "document_id": request.document_id,
            "page_number": request.page_number
        }
        return EmbedResponse(
            embedding=embedding,
            text=request.text,
            metadata=metadata
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating embedding: {str(e)}")

@router.post("/embed-batch", response_model=BatchEmbedResponse)
async def embed_batch_texts(request: BatchEmbedRequest) -> BatchEmbedResponse:
    """
    여러 텍스트 청크에 대한 임베딩 벡터를 일괄 생성합니다.
    """
    try:
        embeddings = embeddings_service.embed_batch(request.texts)
        return BatchEmbedResponse(embeddings=embeddings)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating batch embeddings: {str(e)}")

@router.post("/search", response_model=SearchResponse)
async def search_vectors(request: SearchRequest) -> SearchResponse:
    """
    주어진 질문(Query)을 기반으로 가장 유사한 문서 청크를 검색합니다.
    """
    try:
        results = retriever_service.search(
            query=request.query,
            top_k=request.top_k,
            filters=request.filters
        )
        return SearchResponse(
            results=results,
            query_used=request.query
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing vector search: {str(e)}")

@router.post("/generate", response_model=GenerateResponse)
async def generate_rag_response(request: GenerateRequest) -> GenerateResponse:
    """
    검색을 통해 관련 문서 청크를 찾고, 이를 바탕으로 LLM 답변을 생성합니다. (RAG)
    """
    try:
        # 1. 문서 검색 (Retriever)
        filters = {"document_ids": request.document_ids} if request.document_ids else None
        search_results = retriever_service.search(
            query=request.query,
            top_k=5,
            filters=filters
        )

        # 검색 결과가 없는 경우 처리 (선택적)
        if not search_results:
            return GenerateResponse(
                answer="관련된 문서를 찾을 수 없습니다.",
                citations=[]
            )

        # 2. 답변 생성 (Generator)
        generation_result = generator_service.generate_response(
            query=request.query,
            context_chunks=search_results
        )

        return generation_result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating RAG response: {str(e)}")

@router.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    RAG 모듈 상태 확인 엔드포인트
    """
    return {
        "status": "healthy",
        "service": "rag",
        "components": {
            "embeddings": True,
            "retriever_db_connected": getattr(retriever_service, 'connected', False),
            "generator": True
        }
    }
