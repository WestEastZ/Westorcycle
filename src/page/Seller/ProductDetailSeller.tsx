import CaroselImage from "@/components/carosel/CaroselImage";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";
import NavBar from "@/components/navBar/navBar";

// import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/userContext";
import { db, storage } from "@/firebase";
import { Product } from "@/models/type";
import { validateProduct } from "@/utils/ validation";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const user = useUser();
  const params = useParams();
  const navigate = useNavigate();
  const [errorProduct, setErrorProduct] = useState<string>("");

  const [product, setProduct] = useState<Product>({
    id: Date.now(),
    sellerId: "",
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productDescription: "",
    productCategory: "",
    productImage: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // 상품 조회
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        if (params && params.productId) {
          const docRef = doc(db, "product", params.productId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            const product: Product = {
              id: data.id,
              sellerId: data.sellerId,
              productName: data.productName,
              productPrice: data.productPrice,
              productQuantity: data.productQuantity,
              productDescription: data.productDescription,
              productCategory: data.productCategory,
              productImage: data.productImage,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
            setProduct(product);
          }
        }
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  // 상품 삭제
  const deleteProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const storage = getStorage();

      if (params && params.productId) {
        const docRef = doc(db, "product", params.productId);
        const imageRef = ref(storage, product?.productImage[0]);

        // 삭제
        await deleteDoc(docRef);
        await deleteObject(imageRef);

        navigate(`/seller/${user?.nickname}`);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 상품 상태 변경
  const onChangeInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    if (user) {
      setProduct({ ...product, sellerId: user?.id, [name]: value });
    }
  };

  // 이미지 파일 선택
  const addImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const selectImgList = event.target.files; // 선택된 파일 리스트
      if (selectImgList) {
        const promises = [];

        for (let i = 0; i < selectImgList.length; i++) {
          const selectImgFile = selectImgList[i];
          const imgRef = ref(storage, `${user?.id}/${selectImgFile.name}`);
          const uploadPromise = await uploadBytes(imgRef, selectImgFile).then(
            () => getDownloadURL(imgRef)
          );
          promises.push(uploadPromise);
        }
        const downloadImgURL = await Promise.all(promises);
        setProduct({ ...product, productImage: downloadImgURL });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 상품 수정
  const editProductHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 상품등록 유효성 검사
    const checkProduct = validateProduct(product);

    if (checkProduct) {
      setErrorProduct(checkProduct);
      console.log(checkProduct);
      return;
    }

    try {
      if (params && params.productId) {
        const productRef = doc(db, "product", params.productId);
        await updateDoc(productRef, { ...product });
        navigate(`/seller/${user?.nickname}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <PageHeader title={"Product Deatail"} description={"description"} />
        <section className="w-1/2 h-96 relative mb-10">
          {product ? (
            product.productImage.length == 0 ? (
              <div className="w-full h-96 border-2"></div>
            ) : (
              <CaroselImage product={product} />
            )
          ) : null}
        </section>

        <FormProduct
          onChangeInput={onChangeInput}
          addImageHandler={addImageHandler}
          product={product}
          setProduct={setProduct}
          deleteProductHandler={deleteProductHandler}
          editProductHandler={editProductHandler}
          errorCode={errorProduct}
        />
      </div>
    </>
  );
}
