// LIBRARIES
import { HTMLAttributes, ImgHTMLAttributes, useEffect, useState } from "react";
// COMPONENTS
import { Loader } from "./Loader";
// UTILS
import { supabase } from "../supabaseClient";

type FileImageProps = {
  filePath: string;
  loaderProps?: HTMLAttributes<HTMLDivElement>;
} & ImgHTMLAttributes<HTMLImageElement>;

export const FileImage = ({
  filePath,
  loaderProps = {},
  ...props
}: FileImageProps) => {
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const downloadImage = async (filePath: string) => {
      setIsLoading(true);
      const { data } = await supabase.storage.from("images").download(filePath);
      if (data) {
        const url = URL.createObjectURL(data);
        setImage(url);
        setIsLoading(false);
      }
    };
    if (filePath?.length) downloadImage(filePath);
  }, [filePath]);

  if (isLoading) return <Loader {...(loaderProps || {})} />;

  return <img src={image} alt={filePath} {...props} />;
};
