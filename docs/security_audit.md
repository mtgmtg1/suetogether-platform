# SueTogether 플랫폼 PIPA(개인정보보호법) 보안 감사 보고서

작성일자: 2026-03-31
작성자: CTO (Antigravity Agent)

## 1. 개요
본 문서는 SueTogether 플랫폼이 채택한 기술 스택 및 아키텍처가 "개인정보보호법(PIPA)" 및 관련 규제를 철저히 준수하는지 점검하기 위해 작성되었습니다.

## 2. 암호화 (Encryption)
- [x] **데이터베이스 저장 암호화 (Data at Rest):** 
  - `CryptoModule`을 활용하여 데이터베이스의 PII(개인식별정보: 계좌번호, 주민번호 등) 필드를 `AES-256-GCM`으로 양방향 암호화 처리함.
  - 암호 키는 환경변수(KMS 연동 예정)로 관리되며, 테넌트(Tenant)별 격리를 지원.
- [x] **네트워크 전송 암호화 (Data in Transit):**
  - 모든 내외부 API 통신은 HTTPS 통신으로 강제 처리됨 (Docker 셋업 시 TLS 1.3 권장).

## 3. 인증 및 권한 통제 (Authentication & Authorization)
- [x] **사용자 인증 (Authentication):**
  - 인증 주체는 JSON Web Token (JWT)을 사용. (`@nestjs/jwt` 기반 구현 완료)
  - Intake 프로세스 시, 외부 API(KCB/NICE/PASS)를 연동하는 모듈화를 설계하여 실제 본인인증이 가능하도록 연결 고리를 구현.
- [x] **접근 제어 (Authorization - RBAC 접근 제어):**
  - 컨트롤러 레벨에서 역할 기반 식별(`@Roles()`) 가드 도입. 
  - Tenant ID와 User ID 기반의 RLS(Row Level Security) 접근 패턴을 통해 교차 참조 데이터 누출을 방지.

## 4. 로깅 및 감사 추적 (Audit & Logging)
- [x] **액세스 로그 및 감사 로깅:**
  - `AuditModule` 및 `AuditService`가 통합되어, 주요 리소스 생성, 조회, 수정 요청이 언제 누구에 의해 발생했는지 데이터베이스에 영구 보존됨 (Append-only).
  - 로드 밸런서 및 CDN 레벨에서의 접속 기록 역시 보관되도록 인프라 레벨 확장 권고.

## 5. 취약점 방지 조치
- [x] **입력값 검증 (Input Validation):**
  - Backend(`api`)의 경우 `@nestjs/common` `ValidationPipe`와 `class-validator`를 사용해 페이로드의 형식을 엄격하게 검증하여 SQL Injection 및 XSS 공격 사전 방어.
- [x] **인프라/컨테이너 보안:**
  - Docker 빌드 파일(`Dockerfile`) 구성 시 non-root user(`nextjs` 및 Node 권한계정)를 생성 및 부여하여 권한 탈취 시 피해 범위를 최소화 구축 완료.

## 6. 결론
SueTogether 플랫폼의 코드베이스는 현재 구현된 Phase 1 ~ 4의 요구사항 하에서 PIPA 관련 보호 조치(기술적, 관리적 통제)를 적절히 반영하여 설계되었습니다. 실제 상용망(Production) 배포 시 추가적으로 외부기관의 모의해킹(Pen-Testing)과 DB 접속 제어 및 물리/논리적 망분리 인프라 검토가 권장됩니다.
