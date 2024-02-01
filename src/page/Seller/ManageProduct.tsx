import AddImageButton from "@/components/button/AddImageButton";
import CaroselImage from "@/components/carosel/CaroselImage";
import FormProduct from "@/components/form/FormProduct";
import PageHeader from "@/components/header/PageHeader";
import NavBar from "@/components/nav/NavBar";

// import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/userContext";
import { db } from "@/firebase";
import useChangeInput from "@/hook/useChangeInput";
import useImageUpload from "@/hook/useImageUpload";
import useUpdateProduct from "@/hook/useUpdateProduct";
import { Product, UserType } from "@/models/type";
import { deleteDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function ManageProduct() {
  const user = useUser() as UserType;
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
  const { onChangeInput } = useChangeInput(user, product, setProduct);

  // 이미지 파일 선택
  const { addImageHandler } = useImageUpload(user, product, setProduct);

  // 상품 수정
  const { editProductHandler } = useUpdateProduct(
    user,
    params,
    product,
    setErrorProduct
  );

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <PageHeader title={"Product Deatail"} description={"description"} />

        {/* 사진 첨부 */}
        <section className="w-1/2 h-96 relative mb-10">
          {product.productImage.length == 0 ? (
            <div className="w-full h-96 border-2"></div>
          ) : (
            <CaroselImage product={product} />
          )}
          <AddImageButton />
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
