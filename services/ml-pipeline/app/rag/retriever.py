from typing import List, Dict, Any, Optional
from app.rag.schemas import SearchResult
from app.rag.embeddings import EmbeddingsService

# [Flow: Retriever Service -> DB Connection (pgvector) -> Vector Similarity Search -> Return Top-K Chunks]

class RetrieverService:
    """
    pgvector를 사용하여 벡터 유사도 검색을 수행하는 서비스 클래스.
    """

    def __init__(self, embeddings_service: EmbeddingsService):
        """
        초기화 및 임베딩 서비스 연동.

        Args:
            embeddings_service (EmbeddingsService): 검색 쿼리 임베딩을 위한 서비스
        """
        self.embeddings_service = embeddings_service
        self._connect_db()

    def _connect_db(self) -> None:
        """
        PostgreSQL (pgvector) 데이터베이스 연결 로직.
        현재는 모의(Mock) 연결입니다.
        """
        # TODO: psycopg2 또는 SQLAlchemy를 이용한 DB 실제 연결
        print("Connecting to pgvector database (Mocked)")
        self.connected = True

    def search(self, query: str, top_k: int = 5, filters: Optional[Dict[str, Any]] = None) -> List[SearchResult]:
        """
        주어진 쿼리를 임베딩하여 DB에서 코사인 유사도 기반 검색 수행.

        Args:
            query (str): 검색할 질문 텍스트
            top_k (int): 반환할 최대 결과 수
            filters (dict, optional): 메타데이터 필터 (예: document_id 등)

        Returns:
            List[SearchResult]: 검색된 문서 청크와 메타데이터가 포함된 결과 목록
        """
        # 1. 쿼리를 임베딩 벡터로 변환
        query_vector = self.embeddings_service.embed_text(query)

        # 2. DB에서 벡터 검색 (모의 데이터 반환)
        # TODO: "SELECT * FROM chunks ORDER BY embedding <=> %s LIMIT %s" 등의 쿼리 실행
        print(f"Executing vector search in pgvector for query: '{query}' (Filters: {filters})")

        # Mock Search Results
        mock_results: List[SearchResult] = [
            SearchResult(
                content="이것은 첫 번째 관련 텍스트 청크(Mock)입니다.",
                score=0.89,
                document_id="doc_123",
                page_number=1
            ),
            SearchResult(
                content="이것은 두 번째 관련된 내용(Mock)입니다.",
                score=0.76,
                document_id="doc_123",
                page_number=2
            )
        ]

        return mock_results[:top_k]
