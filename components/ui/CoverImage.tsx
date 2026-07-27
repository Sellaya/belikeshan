import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface CoverImageProps extends Omit<ImageProps, "fill"> {
  fit?: "cover" | "contain";
  position?: "center" | "top" | "bottom";
}

export default function CoverImage({
  fit = "cover",
  position = "center",
  className,
  alt = "",
  ...props
}: CoverImageProps) {
  return (
    <Image
      alt={alt}
      fill
      className={cn(
        fit === "cover" ? "object-cover" : "object-contain",
        position === "top" && "object-top",
        position === "bottom" && "object-bottom",
        position === "center" && "object-center",
        className
      )}
      {...props}
    />
  );
}
