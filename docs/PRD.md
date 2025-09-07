# 📄 PRD – Hedgehog.hl

## 1. 프로젝트 개요

**Hedgehog.hl** 프로젝트는 **Hyperliquid 거래소를 기반으로 델타 뉴트럴 전략을 제공하는 대시보드 서비스**입니다.
사용자는 자신의 포트폴리오를 확인하고, 델타 뉴트럴 포지션을 쉽게 구축 및 관리하며, 브릿징·스왑·라우팅 기능을 통해 유동성을 효율적으로 이동할 수 있습니다.
경쟁력 강화를 위해 리스크 알림 시스템과 외부 프로토콜(Jumper, Pendle) 연동을 추가합니다.

---

## 2. 주요 기능

1. **포트폴리오 체커**

   - Hyperliquid API 연동을 통해 지갑/계정의 자산 상태, PnL, 포지션 현황을 확인
   - 수익률(APY) 계산 및 시각화 제공

2. **델타 뉴트럴 전략 관리**

   - 현물/선물 간 포지션 밸런싱을 통한 델타 뉴트럴 포지션 자동 계산
   - 숏 포지션 청산 리스크 모니터링 및 실시간 알림

3. **브릿징 / 스왑 / 라우팅**

   - Jumper, Pendle API 연동
   - 자산 이동 및 수익 최적화 경로 제공

---

## 3. 화면 기획

1. **랜딩 페이지**: 서비스 소개, 주요 기능, CTA(앱 접속)
2. **앱 홈**: 포트폴리오 요약, APY 현황, 대시보드 진입
3. **포트폴리오 페이지**: 세부 보유 자산, 포지션, 수익률
4. **델타 뉴트럴 페이지**: 전략 실행, 숏 포지션 상태, 리스크 알림
5. **브릿징/스왑/라우팅 페이지**: 자산 이동 및 최적 경로 안내

---

## 4. 기술 스택

- **Frontend**: Next.js, TailwindCSS 4, shadcn, Zustand, TanStack Query, Axios
- **Backend**: Nest.js
- **Database**: PostgreSQL 17
- **Blockchain**: Hyperliquid API, Jumper, Pendle SDK/API
- **Etc**: Turbo Monorepo

---

## 5. 디자인 가이드

- **배경**: 블랙 (#000000)
- **프라이머리**: 갈색 (#C08040)
- **포인트**: 노란색 (#FFDC02)
- **스타일**: 모던하고 샤프한 각진 디자인
- **마스코트**: 고슴도치 → 로딩/에러 일러스트, 아이콘 일부에 사용

---

## 6. TODO 리스트

### 🔹 Frontend (Next.js)

- [ ] **UI/UX 레이아웃**

  - [ ] 글로벌 네비게이션 바 (홈/포트폴리오/델타 뉴트럴/브릿징)
  - [ ] 공통 레이아웃 컴포넌트 (Header/Footer/Sidebar)

- [ ] **랜딩 페이지**

  - [ ] Hero 섹션 (슬로건 + CTA 버튼)
  - [ ] 기능 소개 섹션

- [ ] **홈 대시보드**

  - [ ] 요약 카드: 자산 총액, APY, 포트폴리오 현황
  - [ ] 최근 포지션/알림 위젯

- [ ] **포트폴리오 페이지**

  - [ ] 자산 테이블: 토큰명, 수량, 평가금액, 수익률
  - [ ] 그래프 시각화 (차트: D3.js 또는 Recharts)

- [ ] **델타 뉴트럴 페이지**

  - [ ] 포지션 비교 및 추천 숏 규모 계산 UI
  - [ ] 숏 청산 위험 알림 UI (Toast/Modal)

- [ ] **브릿징/스왑/라우팅**

  - [ ] Jumper/Pendle API 호출 및 UI 렌더링
  - [ ] 자산 선택, 최적 경로 표시, 실행 버튼

- [ ] **상태 관리**

  - [ ] Zustand로 사용자 포트폴리오 및 세션 관리
  - [ ] TanStack Query로 데이터 fetching (포트폴리오, 포지션, 브릿지)

- [ ] **API 연동**

  - [ ] Axios wrapper 구현 (에러 핸들링 공통 처리)
  - [ ] Auth/세션 처리

---

### 🔹 Backend (Nest.js)

- [ ] **API 모듈**

  - [ ] User 모듈: 유저 계정/세션 관리
  - [ ] Portfolio 모듈: Hyperliquid API → DB 캐싱 후 프론트 제공
  - [ ] DeltaNeutral 모듈: 포지션 계산, 리스크 스코어링
  - [ ] Bridge/Swap 모듈: Jumper, Pendle API 호출 및 프록시

- [ ] **DB 설계 (PostgreSQL)**

  - [ ] users (id, wallet, created_at, updated_at)
  - [ ] portfolios (id, user_id, asset, amount, value, pnl, timestamp)
  - [ ] positions (id, user_id, type(long/short), leverage, liquidation_price, status)
  - [ ] alerts (id, user_id, type, message, created_at)

- [ ] **서비스 로직**

  - [ ] 포트폴리오 데이터 수집 및 저장 (주기적 크론잡)
  - [ ] 델타 뉴트럴 추천 포지션 계산 (현물 vs 선물)
  - [ ] 청산 위험 알림 트리거 (임계값 도달 시)

- [ ] **외부 연동**

  - [ ] Hyperliquid REST/WebSocket API
  - [ ] Jumper/Pendle API 라우팅

- [ ] **알림 시스템**

  - [ ] WebSocket 기반 실시간 알림 (숏 리스크, 포지션 변화)

- [ ] **보안**

  - [ ] 세션/토큰 관리 (JWT or Session 기반)
  - [ ] Rate Limiting & Input Validation

---

## 7. 향후 확장 기능

- 자동화된 델타 뉴트럴 실행 봇
- Telegram/Discord 알림 연동
- 포트폴리오 공유 기능 (Public Dashboard)
