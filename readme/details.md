# 요구사항 명세

## 0. 목차

1. [1주차](details.md#id-1.-1-1-29)
2. [2주차](details.md#id-2.-2-2-5)
3. [3주차](details.md#id-3.-3-2-15)
4. [4주차](details.md#id-4.-4-2-22)

## 1. 1주차 (\~1/29)

1. **페이지 라우팅 설계 (\~1/26)**
   - React router를 사용한 Public (비로그인)과 Private (로그인) 클라이언트 페이지들을 설계
     - 판매자와 구매자 페이지 구분:
       - 판매자 계정 (상품 등록, 판매 기록 관리)
       - 구매자 계정 (상품 검색, 구매 이력 확인)
2. **로그인 / 회원가입 (\~1/27)**
   - 회원가입 기능을 통한 사용자 계정 생성
     - **Firebase Authentication** 회원가입 기능
       - 회원가입 필수 요소: 이름, 이메일, 비밀번호
     - 전자인증 가이드라인 (NIST - Electronic Authentication Guideline)
       - **비밀번호 최소 길이**
         - 최소 10자리 이상 : 영어 대문자, 소문자, 숫자, 특수문자 중 2종류 문자 조합
         - 최소 8자리 이상 : 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합
   - 로그인 및 로그아웃 기능
     - **Firebase Authentication** 이메일/비밀번호 로그인 기능
     - 로그아웃 기능
3. **판매자 페이지 - 상품 CRUD (\~1/29)**
   - 전체 상품 조회
     - 판매자만 상품 페이지에 접근
     - 상품 페이지 내 판매자의 상품 조회
     - 상품 최신 순 정렬
     - 상품 조회 무한 스크롤 기능
       - [**react-intersection-observer**](https://www.npmjs.com/package/react-intersection-observer#react-intersection-observer) **- useInView 훅**
       - [**useInfiniteQuery**](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery) **- React Query**
   - 상품 등록
     - 판매자만 상품 등록이 가능
     - 게시글 생성 필수 요소: 텍스트 (상품 상세), 이미지 (상품 사진 여러장)
   - 상품 수정 / 삭제
     - 이미지 수정 시, 기존 이미지 파일을 스토리지에서 삭제
       - 상품 등록시, 상품 이미지는 Firebase Cloud Storage에 업로드
       - 새로운 이미지를 업로드 시, 기존 이미지 Cloud Storage에서 자동 삭제 -> 스토리지 관리 최적화 및 중복 방지
4. **소셜 로그인 구현**
   - 구글 로그인 구현
     - 구글 로그인만 구현하되 카카오 또는 깃헙 로그인 추가와 같은 추가 요구 사항에 대비할수 있도록 확장 가능한 코드를 작성
5. **컴포넌트 및 라우트의 지연 로딩(Lazy Loading):**
   - 컴포넌트 및 라우트의 지연 로딩을 통해 초기 로딩 시간을 단축
     - `React.lazy`와 `Suspense`를 사용

## 2. 2주차 (\~2/5)

1. **상품 CRUD (\~2/2)**

   - 상품 조회
     - 메인 랜딩 페이지:
     - 카테고리별 상품들을 4개씩 보여주도록 설계
     - 각 카테고리 옆에는 “더보기” 버튼을 배치, 해당 카테고리의 상품 페이지로 이동
     - 각 상품 제품명, 사진, 가격, 카테고리 정보를 표시
     - 제품 사진 여러 장일 경우, 캐러셀(carousel) 기능 추가
   - 카테고리 상품 페이지:
     - 메인 랜딩 페이지의 카테고리 헤딩을 클릭하거나, “더보기” 버튼을 통해 이동한 페이지
     - 최신 상품 등록 순
     - 무한 스크롤 페이징 기법을 적용
     - 페이지 상단에 필터 기능을 추가, 최신순, 가격순 정렬
   - 상품 상세 페이지:
     - 상품 클릭 시, 상세 페이지를 구현
     - 상세 페이지에는 제품명, 사진, 가격, 남은 수량 정보를 노출
     - 동일 카테고리를 가진 다른 제품들을 조회

2. **장바구니 CRUD (\~2/5)**
   - 장바구니 조회 및 상품 추가
   - 상품 상세 페이지에서, “장바구니 추가” 버튼을 클릭 시 장바구니에 추가
     - 장바구니에 추가 시, 장바구니 아이콘에 상품의 숫자 업데이트
     - 장바구니에 추가된 후, “장바구니 추가” 버튼은 “장바구니 보기”로 변경
     - 장바구니 아이콘, “장바구니 보기” 버튼을 클릭 시, 페이지 이동 없이 브라우저 윈도우 우측에서 슬라이딩 드로어 형태의 장바구니가 노출
     - 슬라이딩 드로어 내 장바구니에는 각 상품의 수량, 총 가격이 표시
   - 장바구니 수정 기능:
     - 상품을 제거 또는 수량 수정
     - 중복된 상품이 추가되지 않음
   - ❗️ 장바구니의 상태는 React Context API를 통해 관리
   - ❗️ 로컬 스토리지 또는 세션 스토리지를 활용하여 페이지 이동이나 새로고침 시 상품 유지
3. **Advanced**
   - 이미지 최적화

## 3. 3주차(\~2/15)

1. **상품 구매**
   - 장바구니에 담은 상품 구매를 진행
     - 결제 단계로 넘어가기전 상품 재고를 우선적으로 감소
     - 결제 전 결제 취소 시, 상품 제고를 복구
     - 모달 또는 체크박스 등을 사용
   - 아임포트 결제 SDK 가상 결제 진행
     - 결제 페이지 이동전 사용자 정보 Form 생성
     - 구매자의 개인 정보는 DB에 저장하지 않음
     - 결제가 완료 시, ORDER 컬렉션 생성
2. **구매 내역 페이지**
   - 구매자가 구매 내역 / 상품 판매자 확인
   - 결제 단위로 상품들 묶어서 관리
3. **상품 구매 취소**
   - 구매 내역 페이지 통해 구매한 상품 취소
4. **주문정보 확인 및 주문 상태 변경**
   - 관리자 페이지를 통해 판매 상품들의 상세 내역, 상태를 확인
   - 판매자가 ORDER 상태를 변경(enum으로 관리해)
     - 주문정보의 상태
       - 구매 확인
       - 발송 대기
       - 발송 시작
       - 주문 취소
       - 판매 완료
5. **Advanced**
   - 결제 정보 입력 Form `Modal interface`로 구현 (Compound component패턴)

## 4. 4주차(\~2/22)

1. **SEO 개선**
2. **번들 사이즈 줄이기**
3. **렌더링 최적화**
4. **테스트 코드**
