import { ImagePlus } from "lucide-react";
import React from "react";

export default function AddImageButton() {
  return (
    <div className="w-12 h-12 absolute bottom-5 right-5 flex justify-center items-center hover:cursor-pointer rounded-full bg-zinc-800">
      <label htmlFor="inputFile" className="hover:cursor-pointer">
        <ImagePlus size={28} color="white" strokeWidth={2} />
      </label>
    </div>
  );
}
