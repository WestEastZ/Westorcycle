import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Product } from "@/models/type";
import { useParams } from "react-router-dom";
import { ERROR_MESSAGES } from "@/utils/ validation";

interface FormProductProps {
  onChangeInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  product: Product;
  addImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setProduct: (value: Product | ((prevState: Product) => Product)) => void;
  addProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editProductHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  errorCode: string;
}

export default function FormProduct({
  onChangeInput,
  addImageHandler,
  product,
  setProduct,
  addProductHandler,
  deleteProductHandler,
  editProductHandler,
  errorCode,
}: FormProductProps) {
  const params = useParams();
  return (
    <form className="w-1/2">
      <input
        type="file"
        id="inputFile"
        name="productImage"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={addImageHandler}
        className="hidden"
        required
      />

      <section className="flex flex-col gap-5 ">
        <div>
          <Input
            type="text"
            placeholder="상품 이름"
            value={product.productName}
            name="productName"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == "errorProductName" ? (
            <div className="text-left mt-1 ml-4 text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Input
            type="number"
            placeholder="상품 가격"
            value={product.productPrice}
            name="productPrice"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == "errorProdcutPrice" ? (
            <div className="text-left mt-1 ml-4 text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Input
            type="number"
            placeholder="상품 수량"
            value={product.productQuantity}
            name="productQuantity"
            className=""
            onChange={onChangeInput}
            required
          />
          {errorCode == "errorProdcutQuantity" ? (
            <div className="text-left mt-1 ml-4 text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <div>
          <Textarea
            placeholder="상품 설명"
            name="productDescription"
            value={product.productDescription}
            className=""
            onChange={onChangeInput}
            required
          ></Textarea>
          {errorCode == "errorProductDescription" ? (
            <div className="text-left mt-1 ml-4 text-red-500">
              {ERROR_MESSAGES[errorCode]}
            </div>
          ) : null}
        </div>

        <Select
          value={product.productCategory}
          onValueChange={(value) => (
            setProduct({ ...product, productCategory: value }),
            console.log(product)
          )}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="카테고리" className="text-" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="CategoryA">CategoryA</SelectItem>
              <SelectItem value="CategoryB">CategoryB</SelectItem>
              <SelectItem value="CategoryC">CategoryC</SelectItem>
              <SelectItem value="CategoryD">CategoryD</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errorCode == "errorProductCategory" ? (
          <div className="text-left mt-1 ml-4 text-red-500">
            {ERROR_MESSAGES[errorCode]}
          </div>
        ) : null}

        {params.nickname ? (
          <Button onClick={addProductHandler} className="w-full">
            상품 등록
          </Button>
        ) : (
          <div className="flex justify-around">
            <Button onClick={editProductHandler} className="w-1/3">
              수정
            </Button>
            <Button onClick={deleteProductHandler} className="w-1/3 bg-red-600">
              삭제
            </Button>
          </div>
        )}
      </section>
    </form>
  );
}
