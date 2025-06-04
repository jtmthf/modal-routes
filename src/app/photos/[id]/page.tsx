import { listImages, getImageById, getImageThumbnail } from "@/lib/image-api";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  const images = await listImages();

  return images.map((image) => ({
    id: image.id,
  }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getImageById(id);
  const thumbnail = await getImageThumbnail(image.id, {
    width: 15,
    height: 10,
  });

  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold mb-4">Image Details</h1>
      <div className="container max-w-md p-4">
        <h2 className="text-xl font-semibold mb-2">{image.author}</h2>
        <p className="text-muted-foreground mb-4">#{image.id}</p>
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
        <Link href="/">
          <span className="flex mt-6 hover:underline items-center">
            <ArrowLeft />
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
