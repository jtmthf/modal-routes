import { listImages, getImageThumbnail } from "@/lib/image-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const images = await listImages();
  const thumbnails: string[] = [];

  for (const image of images) {
    const thumbnail = await getImageThumbnail(image.id, {
      width: 15,
      height: 10,
    });
    thumbnails.push(thumbnail);
  }

  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <Link href={`/photos/${image.id}`} key={image.id}>
            <Card key={image.id}>
              <CardHeader>
                <CardTitle>{image.author}</CardTitle>
                <CardDescription>#{image.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={image.download_url}
                  alt={image.author}
                  width={300}
                  height={200}
                  className="rounded-lg"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                  }}
                  placeholder="blur"
                  blurDataURL={thumbnails[index]}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
