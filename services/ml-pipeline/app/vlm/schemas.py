from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

# [Flow: VLM Schema Definition -> Request/Response Models]

class ProcessRequest(BaseModel):
    """
    단일 문서 처리 요청 스키마
    """
    document_url: str = Field(..., description="처리할 문서 이미지 또는 PDF의 URL")
    model_name: str = Field(default="layoutlmv3", description="사용할 모델 (layoutlmv3 또는 donut)")

class BoundingBox(BaseModel):
    """
    바운딩 박스 스키마
    """
    x1: int
    y1: int
    x2: int
    y2: int

class ExtractedEntity(BaseModel):
    """
    추출된 엔티티 스키마
    """
    label: str = Field(..., description="엔티티 라벨 (예: 이름, 날짜, 금액 등)")
    value: str = Field(..., description="추출된 텍스트 값")
    confidence: float = Field(..., description="추출 신뢰도 점수 (0~1)")
    bbox: Optional[BoundingBox] = Field(None, description="엔티티의 바운딩 박스")

class ProcessResponse(BaseModel):
    """
    단일 문서 처리 응답 스키마
    """
    document_url: str = Field(..., description="처리된 문서의 URL")
    model_used: str = Field(..., description="사용된 모델 이름")
    entities: List[ExtractedEntity] = Field(..., description="추출된 엔티티 목록")
    raw_text: Optional[str] = Field(None, description="추출된 원본 텍스트 (Donut 등의 경우)")

class BatchProcessRequest(BaseModel):
    """
    배치 문서 처리 요청 스키마
    """
    documents: List[ProcessRequest] = Field(..., description="처리할 문서 요청 목록")

class BatchProcessResponse(BaseModel):
    """
    배치 문서 처리 응답 스키마
    """
    results: List[ProcessResponse] = Field(..., description="처리된 문서 결과 목록")
    failed_count: int = Field(default=0, description="처리 실패한 문서 수")

class ModelInfo(BaseModel):
    """
    모델 정보 스키마
    """
    name: str = Field(..., description="모델 이름")
    description: str = Field(..., description="모델 설명")
    is_active: bool = Field(default=True, description="사용 가능 여부")

class ModelListResponse(BaseModel):
    """
    사용 가능한 모델 목록 응답 스키마
    """
    models: List[ModelInfo] = Field(..., description="사용 가능한 모델 목록")
