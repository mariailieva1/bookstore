import { Image } from 'src/database/entities';

export function convertImageToBase64(images: Image[]) {
  return images.map((image) => {
    return {
      id: image.id,
      fullSize: Buffer.from(image.fullSize).toString('base64'),
    };
  });
}

export function convertBlobToBase64(fullSize: any) {
  if (!fullSize) return null;
  return Buffer.from(fullSize).toString('base64');
}
