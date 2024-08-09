# 개인 블로그 프로젝트

개인 블로그 사이트입니다.

## 기술 스택

### Environment

![Static Badge](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Static Badge](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)

### Config

![Static Badge](https://img.shields.io/badge/NpM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![Static Badge](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Static Badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Static Badge](https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwind%20css&logoColor=white)
![Static Badge](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Static Badge](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## 주요 기능

- Markdown 언어를 사용한 글 작성 / 글 읽기 기능
- 로그인 상태에서만 글 작성 허용 기능

### 추가 예정

- 카테고리 추가/수정/삭제
- 글 삭제

## 설치 방법

1. 저장소 복사: `git clone https://github.com/nparadise/npd-blog.git`
2. 폴더 이동: `cd npd-blog`
3. 의존성 설치: `npm install`
4. `.env` 파일 수정
   ```
   POSTGRES_URL=""
   POSTGRES_USER=""
   POSTGRES_HOST=""
   POSTGRES_PASSWORD=""
   POSTGRES_DATABASE=""
   ```
5. 데이터베이스 Schema 적용: `npx prisma migrate dev`
6. 데이터베이스 seeding: `npx prisma db seed`
   - `/prisma/seed.ts` 원하지 않은 기능은 주석처리하기
     ```ts
     async function main() {
       // 임의로 정한 카테고리들을 DB에 입력하는 함수
       await manualCategorySeed();
       // 위 함수에서 임의로 정한 카테고리들에 의미없는 제목과 내용을 갖는 글을 DB에 입력하는 함수
       await randomPostCreateSeed();
     }
     ```
7. Authentication을 위한 `.env.local`에 변수 설정: `npx auth secret`
8. 개발 서버 실행: `npm run dev`
9. 웹페이지 접속: `http://localhost:3000`
