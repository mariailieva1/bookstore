import { IImage } from '@interfaces/image.interface';

/**
 * Modifies the passed array. Transforms the base64 string to a valid url
 * @param images
 */
export function convertImagesToUrls(images?: IImage[]): void {
  images?.forEach((img) => {
    if (
      img.fullSize.startsWith('data:image/png;base64') ||
      img.fullSize === 'default-image.png'
    )
      return;

    img.fullSize = `data:image/png;base64,${img.fullSize}`;
  });

  if (images && !images[0])
    images[0] = { id: 0, fullSize: 'default-image.png' };
}
