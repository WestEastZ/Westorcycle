# 트러블 슈팅

## 0. 목차

1. [장바구니 선택 상품 수량 증감](trouble-shooting.md#id-1)
2. [비동기 함수 반복문](trouble-shooting.md#id-2-2)
3. [Authentication](trouble-shooting.md#id-3.-authentication)

## 1. 장바구니 선택 상품 수량 증감

### (1) 문제 상황

#### 문제 상황 1

* 장바구니 상품 수량 변경 시 상품이 선택되고 즉시 해제가 되는 문제

#### 문제 상황 2

* 장바구니 선택 상품의 수량 변경 시 선택이 해제되는 문제

### (2) 원인

* `Cart` 컴포넌트\[부모] - Select 이벤트
* `CartCard` 컴포넌트\[자식] - Quantity 이벤트

> 이벤트 버블링과 캡처링이 원인이라고 판단! `stopPropagation()`을 통해 이벤트 버블링을 해제하여 해결

```tsx
<button
  onClick={(e) =>
  	e.stopPropagation();
    product &&
    product.productQuantity > quantity &&
	setQuantity(quantity + 1)
  }
>
  <ChevronUpCircle size={20} />
</button>
```

문제 상황 1만 해결되는 상황이 발생

> React Query는 가져오는 데이터의 상태 변경 시 자동으로 리렌더링

### (3) 해결

1. 선택 상품을 저장하는 state를 생성
2. mutate를 통해 React Query의 데이터가 변경되는 것이 아닌 state의 데이터가 변경

```tsx
export default function useSelectCart() {
  const [selectedItems, setSelectedItems] = useState<CartType[]>([]);

  const selectHandler = (item: CartType) => {
    // 선택한 상품 조회
    const isAlreadySelected = selectedItems.find(
      (selectedItem) => selectedItem.productId === item.productId
    );

    // 선택 및 제거
    if (isAlreadySelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.productId !== item.productId
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // 선택된 상품 수량 변경
  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.productId === productId
          ? { ...item, productQuantity: quantity }
          : item
      )
    );
  };

  // 선택되어 있는지 확인
  const isSelected = (item: CartType) => {
    return selectedItems.some(
      (selectedItem) => selectedItem.productId === item.productId
    );
  };
  return { selectedItems, selectHandler, handleQuantityChange, isSelected };
}
```

3. mutate를 통해 React Query의 데이터와 state의 데이터 변경 이벤트를 독립적으로 수행

```tsx
<button
  onClick={(e) => {
    e.stopPropagation();
    if (product && product.productQuantity > quantity) {
      setQuantity(quantity + 1);
      handleQuantityChange(item.productId, quantity + 1);
    }
  }}
>
  <ChevronUpCircle size={18} />
</button>
```

### (4) 결론

하지만 위 방법은 react query의 장점을 사용하지 않고 있는 것 같다

onMutate의 경우는 서버에 요청을 보내기 전 임시적으로 로컬 상태를 변경할 수 있기 때문에 적용한다면 더 의미있는 결과를 얻을 수 있을 것이라 판단이 된다.

리팩토링을 진행하며 적용해볼 것이다.

\


## 2. 비동기 함수 반복문

### (1) 문제 상황

* 상품 등록 시 다수의 이미지를 업로드 하지 못하는 상황

### (2) 원인

*   forEach 함수는 Promise 작업을 기다려주지 않는다.

    > forEach() expects a synchronous function — it does not wait for promises. Make sure you are aware of the implications while using promises (or async functions) as forEach callbacks. [MDN 링크](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array/forEach)

### (3) 해결

#### 1차 해결 for of

`for of` 문은 배열의 각 요소에 대해 비동기 작업 순차적으로 실행

```tsx
// 모든 이미지 파일
for (let selectImgFile of fileList) {
  const timestamp = Date.now();
  const imgRef = ref(
  storage,
  `${user?.id}/${selectImgFile.name}/${timestamp}`);

  // 이미지 파일을 Firebase Storage에 업로드하고 다운로드 URL을 얻는 프로미스 생성
  await uploadBytes(imgRef, selectImgFile);
  const downloadURL = await getDownloadURL(imgRef);
  downloadURLs.push(downloadURL);
}

  // 다운로드 URL 목록을 반환
  return downloadURLs;
}
```

> 하지만 이미지의 용량이 큰 관계로 순차적으로 비동기 함수가 실행되는 방법보다 병렬적으로 처리하는 방법이 유리할 것이라 판단.

#### 2차 해결 Promise.all()

`Promise.all()`을 통해 배의 각 요소에 대해 비동기 작업을 병렬적으로 실행

```tsx
async (fileList: FileList) => {
  const promises = [];

  // 모든 이미지 파일
  for (let i = 0; i < fileList.length; i++) {
    const timestamp = Date.now();
    const selectImgFile = fileList[i];

    // 이미지 압축
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1092,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(selectImgFile, options);

    const imgRef = ref(
      storage,
      `${user?.id}/${compressedFile.name}/${timestamp}`
    );

    // 이미지 파일을 Firebase Storage에 업로드하고 다운로드 URL을 얻는 프로미스 생성
    const uploadPromise = uploadBytes(imgRef, compressedFile).then(() =>
      getDownloadURL(imgRef)
    );
    promises.push(uploadPromise);
  }

  // 모든 프로미스가 완료될 때까지 기다린 후 다운로드 URL 목록을 반환
  return await Promise.all(promises);
};
```

### (4) 결론

비동기 작업에 대해서 반복을 수행할 경우 `for of` 또는 `Promise.all()`을 사용하여 비동기 작업을 수행할 것

## 3. Authentication

### (1) 문제 상황

* 프로필 편집 및 로그아웃 시 즉각적으로 `context` 업데이트가 되지 않는 상황
* 임시 방안으로 `reload()` 메서드 사용 중
* 자동으로 `context`를 수정할 수 있는 방법이 필요한 상황
* 비밀번호 수정은 `await currentUser.reload();`를 통해 정상적으로 변경

### (2) 원인

* `onAuthStateChanged`로 인해 사용자를 감지
* `getDoc`을 통해 로그인한 사용자의 정보를 `state`에 저장하는 방식
* 사용자 정보가 변경되는 당시에는 `useEffect`가 실행되지 않음

```tsx
// userContext
useEffect(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const docRef = doc(db, "user", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const user: UserType = {
          id: firebaseUser.uid,
          email: data.email,
          isSeller: data.isSeller,
          nickname: data.nickname,
          password: data.password,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          profileImage: data.profileImage,
        };
        setUser(user);
      }
    }
    setLoading(false);
  });
}, []);
```

### (3) 해결

> Firebase authentication 메서드 `onSnapshot`은 Firestore의 특정 문서 또는 컬렉션에 대한 변경 사항을 실시간으로 감지

1. onSnapshot

```tsx
useEffect(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const docRef = doc(db, "user", firebaseUser.uid);
      onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const user: UserType = {
            id: firebaseUser.uid,
            email: data.email,
            isSeller: data.isSeller,
            nickname: data.nickname,
            password: data.password,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            profileImage: data.profileImage,
          };
          setUser(user);
        }
      });
    }
    setLoading(false);
  });
}, []);
```

* `onSnapshot` 메서드를 사용하여 로그인 사용자의 컬렉션 변경을 감지
* 변경된 데이터를 `userContext`에 저장
* 로그아웃 시 `null`이 저장

2. logout

```tsx
const logout = async () => {
  await signOut(auth);
  setUser(null);
};

// ... 코드 생략 ...

return (
  <UserContext.Provider value={{ user, logout }}>
    {children}
  </UserContext.Provider>
);
```

* `UserProvider`에 logout 메서드를 추가

### (4) 결론

`onSnapshot` 메서드는 데이터 변경을 감지하여 최신 상태를 유지하여 데이터에 따른 UI도 최신 상태를 유지할 수있다.

하지만 현재 코드에서는 로그아웃 시 Firestore의 호출량이 기존 보다 평균 20회 정도 증가하는 현상이 나타나고 있다.

원인을 파악하여 호출을 최소화할 수 있도록 구현하는 것이 필요하다. 이후 리팩토링을 하여 개선해보자.
