export type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export type ListImagesOptions = {
  page?: number;
  limit?: number;
};

export async function listImages({
  page = 1,
  limit = 30,
}: ListImagesOptions = {}): Promise<PicsumImage[]> {
  const url = new URL("https://picsum.photos/v2/list");
  new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  url.search = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  }).toString();

  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }

  return response.json();
}

export async function getImageById(id: string): Promise<PicsumImage> {
  const url = new URL(`https://picsum.photos/id/${id}/info`);

  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image with id ${id}: ${response.statusText}`
    );
  }

  return response.json();
}

export type ImageThumbnailOptions = {
  width: number;
  height: number;
};

export async function getImageThumbnail(
  id: string,
  { width, height }: ImageThumbnailOptions
): Promise<string> {
  const url = new URL(`https://picsum.photos/id/${id}/${width}/${height}`);

  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch thumbnail for image with id ${id}: ${response.statusText}`
    );
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}
