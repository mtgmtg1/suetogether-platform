from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

# [Flow: RAG Schema Definition -> Request/Response Models]

class EmbedRequest(BaseModel):
    """
    단일 텍스트 임베딩 요청 스키마
    """
    text: str = Field(..., description="임베딩을 생성할 텍스트")
    document_id: Optional[str] = Field(None, description="선택적 메타데이터: 문서 ID")
    page_number: Optional[int] = Field(None, description="선택적 메타데이터: PDF 페이지 번호")

class EmbedResponse(BaseModel):
    """
    단일 텍스트 임베딩 응답 스키마
    """
    embedding: List[float] = Field(..., description="생성된 임베딩 벡터")
    text: str = Field(..., description="원본 텍스트 청크")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="관련 메타데이터")

class BatchEmbedRequest(BaseModel):
    """
    배치 텍스트 임베딩 요청 스키마
    """
    texts: List[str] = Field(..., description="임베딩을 생성할 텍스트 목록")
    metadatas: Optional[List[Dict[str, Any]]] = Field(None, description="각 텍스트에 대한 메타데이터 목록")

class BatchEmbedResponse(BaseModel):
    """
    배치 텍스트 임베딩 응답 스키마
    """
    embeddings: List[List[float]] = Field(..., description="생성된 임베딩 벡터 목록")

class SearchRequest(BaseModel):
    """
    벡터 검색 요청 스키마
    """
    query: str = Field(..., description="검색할 질문 또는 키워드")
    top_k: int = Field(default=5, description="반환할 상위 결과 수")
    filters: Optional[Dict[str, Any]] = Field(None, description="검색 결과 필터링 (예: 특정 document_id)")

class SearchResult(BaseModel):
    """
    검색 결과 항목 스키마
    """
    content: str = Field(..., description="검색된 문서 내용")
    score: float = Field(..., description="유사도 점수")
    document_id: str = Field(..., description="문서 ID")
    page_number: Optional[int] = Field(None, description="문서의 페이지 번호 (Citations용)")

class SearchResponse(BaseModel):
    """
    벡터 검색 응답 스키마
    """
    results: List[SearchResult] = Field(..., description="검색된 결과 목록")
    query_used: str = Field(..., description="검색에 사용된 쿼리")

class GenerateRequest(BaseModel):
    """
    RAG 생성 요청 스키마
    """
    query: str = Field(..., description="사용자 질문")
    document_ids: Optional[List[str]] = Field(None, description="특정 문서 내에서만 검색/생성할 경우 ID 목록")

class Citation(BaseModel):
    """
    생성 응답의 출처 스키마
    """
    document_id: str = Field(..., description="출처 문서 ID")
    page_number: Optional[int] = Field(None, description="출처 페이지 번호")
    snippet: str = Field(..., description="참조된 원본 텍스트 조각")

class GenerateResponse(BaseModel):
    """
    RAG 생성 응답 스키마
    """
    answer: str = Field(..., description="LLM이 생성한 답변")
    citations: List[Citation] = Field(..., description="답변 생성에 사용된 출처 정보")
