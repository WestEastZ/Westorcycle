import AddImage from "@/assets/icon/AddImage.svg";

export default function AddImageButton() {
  return (
    <div className="w-12 h-12 absolute bottom-5 right-5 flex justify-center items-center hover:cursor-pointer rounded-full bg-zinc-800">
      <label htmlFor="inputFile" className="hover:cursor-pointer">
        <div>
          <img src={AddImage} alt="AddImage" />
        </div>
      </label>
    </div>
  );
}
