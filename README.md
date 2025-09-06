# 🦔 Hedgehoge.hl

**Hyperliquid 기반 델타 뉴트럴 전략 대시보드**

Hedgehoge.hl은 Hyperliquid 거래소를 기반으로 델타 뉴트럴 전략을 제공하는 대시보드 서비스입니다. 사용자는 자신의 포트폴리오를 확인하고, 델타 뉴트럴 포지션을 쉽게 구축 및 관리하며, 브릿징·스왑·라우팅 기능을 통해 유동성을 효율적으로 이동할 수 있습니다.

## 🚀 빠른 시작

### 1. 사전 요구사항

#### pnpm 설치

```bash
# npm을 통해 pnpm 설치
npm install -g pnpm

# 또는 curl을 통해 설치
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 설치 확인
pnpm --version
```

#### PostgreSQL 설치

**macOS (Homebrew 사용):**

```bash
# PostgreSQL 설치
brew install postgresql@17

# PostgreSQL 서비스 시작
brew services start postgresql@17

# PostgreSQL 접속 (기본 사용자로)
psql postgres
```

**Windows:**

- [PostgreSQL 공식 사이트](https://www.postgresql.org/download/windows/)에서 설치 프로그램 다운로드
- 설치 과정에서 비밀번호 설정

### 2. 데이터베이스 설정

PostgreSQL에 접속한 후 데이터베이스를 생성합니다:

```sql
-- 데이터베이스 생성
CREATE DATABASE hedgehoge;

-- 사용자 생성 (선택사항)
CREATE USER hedgehoge_user WITH ENCRYPTED PASSWORD 'your_password';

-- 권한 부여
GRANT ALL PRIVILEGES ON DATABASE hedgehoge TO hedgehoge_user;

-- 접속 확인
\c hedgehoge
```

### 3. 프로젝트 설정

#### 환경 변수 설정

`apps/api`와 `apps/web/` 각 폴더안의 `.env.example` 파일을 참고하여 `.env` 파일을 생성하여 환경 변수를 설정합니다.

#### 의존성 설치

```bash
# 모든 패키지 설치
pnpm install
```

#### 프로젝트 빌드

```bash
# 전체 프로젝트 빌드
pnpm build

# 개별 앱 빌드
pnpm --filter api build
pnpm --filter web build
```

### 4. 애플리케이션 실행

#### 개발 모드로 실행

```bash
# 전체 애플리케이션 실행 (백엔드 + 프론트엔드)
pnpm dev

# 개별 실행
pnpm --filter api dev    # 백엔드만 실행 (포트 4000)
pnpm --filter web dev    # 프론트엔드만 실행 (포트 3000)
```

#### 프로덕션 모드로 실행

```bash
# 빌드 후 실행
pnpm build
pnpm start
```

#### 데이터베이스 초기 세팅

**⚠️ 중요: 최초 실행 시에만 수행**

처음 프로젝트를 실행할 때 데이터베이스 테이블을 자동으로 생성하기 위해 `synchronize: true` 설정을 활성화해야 합니다.

`apps/api/src/app.module.ts` 파일에서 TypeORM 설정을 다음과 같이 수정합니다:

```typescript
// apps/api/src/app.module.ts
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    ...
    synchronize: true, // ⭐ 최초 실행 시 true로 설정
  }),
  inject: [ConfigService],
}),
```

**📝 주의사항:**

- `synchronize: true`는 엔티티 정의를 기반으로 데이터베이스 스키마를 자동으로 생성/수정합니다
- **프로덕션 환경에서는 절대 사용하지 마세요** (데이터 손실 위험)
- 테이블이 생성된 후에는 `synchronize: false`로 변경해야합니다.

### 5. 접속 확인

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:4000
- **API 문서**: http://localhost:4000/api/docs (Swagger)

## 📁 프로젝트 구조

```
hedgehoge.hl/
├── apps/
│   ├── api/                    # NestJS 백엔드
│   │   ├── src/
│   └── web/                   # Next.js 프론트엔드
│       ├── app/
│       ├── components/        # 공통 컴포넌트
│       └── package.json
├── packages/
│   ├── ui/                    # 공통 UI 컴포넌트
│   ├── eslint-config/         # ESLint 설정
│   └── typescript-config/     # TypeScript 설정
└── docs/
    └── PRD.md                 # 프로젝트 요구사항 문서
```

## 🎯 주요 기능

### 1. 포트폴리오 체커

- Hyperliquid API 연동을 통한 실시간 자산 상태 확인
- PnL, 포지션 현황 모니터링
- 수익률(APY) 계산 및 시각화

### 2. 델타 뉴트럴 전략 관리

- 현물/선물 간 포지션 밸런싱을 통한 델타 뉴트럴 포지션 자동 계산
- 숏 포지션 청산 리스크 모니터링 및 실시간 알림
- 리밸런싱 추천 시스템

### 3. 브릿징 / 스왑 / 라우팅

- Jumper, Pendle API 연동
- 자산 이동 및 수익 최적화 경로 제공
- 다중 체인 지원 (Ethereum, Arbitrum, Optimism, Polygon, Base)

## 🐛 문제 해결

### 일반적인 문제들

1. **포트 충돌 오류**

   ```bash
   # 사용 중인 포트 확인
   lsof -i :3000
   lsof -i :4000

   # 프로세스 종료
   kill -9 <PID>
   ```

2. **데이터베이스 연결 오류**

   - PostgreSQL 서비스가 실행 중인지 확인
   - `.env` 파일의 데이터베이스 설정 확인
   - 데이터베이스와 사용자가 생성되었는지 확인

3. **테이블이 생성되지 않는 경우**

   ```bash
   # app.module.ts에서 synchronize: true 설정 확인
   # 백엔드 재시작
   pnpm --filter api dev
   ```

4. **엔티티 관련 오류**

   - `apps/api/src/entities/` 폴더에 엔티티 파일들이 있는지 확인
   - TypeORM의 `autoLoadEntities: true` 설정이 활성화되어 있는지 확인

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**Made with 🦔 by Hedgehoge Team**
