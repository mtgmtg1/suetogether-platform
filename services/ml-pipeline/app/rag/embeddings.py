from typing import List, Dict, Any, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.config import settings

# [Flow: Embeddings Service -> Init Splitter & Model -> Chunk Text -> Generate Vectors]

class EmbeddingsService:
    """
    텍스트를 청크로 나누고 임베딩 벡터를 생성하는 서비스 클래스.
    """

    def __init__(self):
        """
        초기화 및 청커(Chunker) 설정. (개발 환경에서는 모의(Mock) 임베딩 사용)
        """
        self.chunk_size = settings.MAX_CHUNK_SIZE
        self.chunk_overlap = settings.CHUNK_OVERLAP
        self.model_name = settings.EMBEDDING_MODEL

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            length_function=len,
        )
        print(f"Initialized EmbeddingsService with model: {self.model_name}")

    def chunk_text(self, text: str) -> List[str]:
        """
        긴 텍스트를 설정된 크기와 중첩 옵션에 따라 여러 청크로 분할합니다.

        Args:
            text (str): 분할할 원본 텍스트

        Returns:
            List[str]: 분할된 텍스트 청크 목록
        """
        return self.text_splitter.split_text(text)

    def embed_text(self, text: str) -> List[float]:
        """
        단일 텍스트에 대한 임베딩 벡터를 생성합니다. (현재 Mock 구현)

        Args:
            text (str): 임베딩을 생성할 텍스트

        Returns:
            List[float]: 생성된 벡터 배열 (모의 데이터)
        """
        # TODO: OpenAI API 또는 sentence-transformers 실제 연동
        # 모의(Mock) 임베딩 벡터 반환 (1536 차원 - OpenAI 표준)
        print(f"Generating mock embedding for text length: {len(text)}")
        return [0.01] * 1536

    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        """
        여러 텍스트에 대한 임베딩 벡터를 일괄 생성합니다.

        Args:
            texts (List[str]): 임베딩을 생성할 텍스트 목록

        Returns:
            List[List[float]]: 생성된 벡터 배열의 목록
        """
        return [self.embed_text(text) for text in texts]
