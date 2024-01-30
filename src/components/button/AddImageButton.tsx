import { ImagePlus } from "lucide-react";
import React from "react";

export default function AddImageButton() {
  return (
    <div className="w-[60px] h-[60px] absolute bottom-10 right-10 flex justify-center items-center hover:cursor-pointer rounded-full bg-gray-600">
      <label htmlFor="inputFile" className="hover:cursor-pointer">
        <ImagePlus size={48} color="white" strokeWidth={2} />
      </label>
    </div>
  );
}
