from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any

from app.config import settings
from app.vlm.schemas import (
    ProcessRequest, ProcessResponse,
    BatchProcessRequest, BatchProcessResponse,
    ModelListResponse, ModelInfo
)
from app.vlm.layoutlm_service import LayoutLMService
from app.vlm.donut_service import DonutService

# [Flow: VLM Router -> Endpoints (/process, /process-batch, /models, /health) -> Invoke Services -> Return Schema Responses]

router = APIRouter()

# 서비스 인스턴스 초기화 (앱 시작 시 로드됨)
layoutlm_service = LayoutLMService(model_path=settings.LAYOUTLM_MODEL_PATH)
donut_service = DonutService(model_path=settings.VLM_MODEL_PATH)

def get_service_for_model(model_name: str):
    """
    모델 이름에 따라 적절한 서비스 인스턴스를 반환합니다.
    """
    if model_name.lower() == "layoutlmv3":
        return layoutlm_service
    elif model_name.lower() == "donut":
        return donut_service
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported model: {model_name}")

@router.post("/process", response_model=ProcessResponse)
async def process_document(request: ProcessRequest) -> ProcessResponse:
    """
    단일 문서를 VLM(LayoutLMv3 또는 Donut)으로 처리합니다.
    """
    try:
        service = get_service_for_model(request.model_name)
        response = service.process_document(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@router.post("/process-batch", response_model=BatchProcessResponse)
async def process_batch_documents(request: BatchProcessRequest) -> BatchProcessResponse:
    """
    여러 문서를 일괄(Batch)로 처리합니다.
    """
    results = []
    failed_count = 0

    for doc_req in request.documents:
        try:
            service = get_service_for_model(doc_req.model_name)
            response = service.process_document(doc_req)
            results.append(response)
        except Exception as e:
            # 개별 문서 실패 시 건너뛰고 카운트 증가 (실제 운영 시에는 에러 상세 내역 기록 필요)
            print(f"Failed to process document {doc_req.document_url}: {str(e)}")
            failed_count += 1

    return BatchProcessResponse(
        results=results,
        failed_count=failed_count
    )

@router.get("/models", response_model=ModelListResponse)
async def list_models() -> ModelListResponse:
    """
    사용 가능한 VLM 모델 목록을 반환합니다.
    """
    return ModelListResponse(
        models=[
            ModelInfo(
                name="layoutlmv3",
                description="구조화된 문서(폼, 청구서 등)에서 키-값 추출",
                is_active=True
            ),
            ModelInfo(
                name="donut",
                description="OCR 없는 엔드투엔드 문서 이해 (영수증 등)",
                is_active=True
            )
        ]
    )

@router.get("/health")
async def health_check() -> Dict[str, Any]:
    """
    VLM 모듈 상태 확인 엔드포인트
    """
    return {
        "status": "healthy",
        "service": "vlm",
        "models_loaded": {
            "layoutlmv3": getattr(layoutlm_service, 'model_loaded', False),
            "donut": getattr(donut_service, 'model_loaded', False)
        }
    }
