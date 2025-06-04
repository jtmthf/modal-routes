import { getImageById, getImageThumbnail } from "@/lib/image-api";
import Modal from "./modal";

export { generateStaticParams } from "@/app/photos/[id]/page";

export const dynamicParams = false;

export default async function PhotoModal({
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

  return <Modal image={image} thumbnail={thumbnail} />;
}
