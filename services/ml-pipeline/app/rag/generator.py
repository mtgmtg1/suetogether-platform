from typing import List, Dict, Any, Optional
from app.rag.schemas import SearchResult, GenerateResponse, Citation
from app.config import settings

# [Flow: Generator Service -> Build Prompt with Context -> Call LLM -> Map Citations -> Return Output]

class GeneratorService:
    """
    검색된 문맥(Context)을 기반으로 LLM 답변을 생성하는 서비스 클래스.
    """

    def __init__(self):
        """
        초기화 및 LLM 연동 설정. (개발 환경에서는 모의 모델로 동작)
        """
        # TODO: LangChain 기반 ChatOpenAI 또는 타 LLM 연동
        print("Initialized GeneratorService (Mocked LLM)")

    def generate_response(self, query: str, context_chunks: List[SearchResult]) -> GenerateResponse:
        """
        사용자 질문과 폐쇄형 문맥(Closed-corpus)을 결합하여 LLM 답변을 생성하고 출처를 매핑합니다.

        Args:
            query (str): 사용자의 질문
            context_chunks (List[SearchResult]): RAG 검색을 통해 가져온 문서 청크 목록

        Returns:
            GenerateResponse: 생성된 답변 및 출처 인용 목록
        """

        # 1. 프롬프트 구성
        context_text = "\n\n".join(
            [f"[문서 ID: {chunk.document_id}, 페이지: {chunk.page_number}]\n{chunk.content}"
             for chunk in context_chunks]
        )

        prompt = f"""
        당신은 법률 문서 분석 플랫폼 'SueTogether'의 AI 어시스턴트입니다.
        아래 제공된 '문서 배경 지식'만을 사용하여 사용자의 질문에 답변하세요.
        제공된 지식 외의 정보(웹 검색 등)를 사용하지 마세요. 답변을 알 수 없다면 문서를 참고하여 "제공된 문서에서 관련 내용을 찾을 수 없습니다"라고 답하세요.

        --- 문서 배경 지식 ---
        {context_text}

        --- 사용자 질문 ---
        {query}
        """

        print(f"Generating LLM response (Mocked)\nQuery: {query}\nContext Size: {len(context_chunks)} chunks")

        # 2. LLM 호출 (모의 데이터 반환)
        mock_answer = "문서에 따르면, 해당 내용(Mock)은 제공된 조건에 부합합니다. 더 자세한 내용은 문서를 확인하시기 바랍니다."

        # 3. 출처 매핑 (Citations)
        citations: List[Citation] = []
        for chunk in context_chunks:
            citations.append(
                Citation(
                    document_id=chunk.document_id,
                    page_number=chunk.page_number,
                    snippet=chunk.content[:50] + "..." if len(chunk.content) > 50 else chunk.content
                )
            )

        return GenerateResponse(
            answer=mock_answer,
            citations=citations
        )
