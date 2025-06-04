"use client";

import { PicsumImage } from "@/lib/image-api";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  image: PicsumImage;
  thumbnail: string;
};

export default function Modal({ image, thumbnail }: Props) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen={true}
      modal
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogTrigger className="hidden" />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            {image.author}
          </DialogTitle>
          <DialogDescription>#{image.id}</DialogDescription>
        </DialogHeader>
        <Image
          priority
          src={image.download_url}
          alt={image.author}
          width={600}
          height={400}
          className="rounded-lg"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "400px",
          }}
          placeholder="blur"
          blurDataURL={thumbnail}
        />
      </DialogContent>
    </Dialog>
  );
}
