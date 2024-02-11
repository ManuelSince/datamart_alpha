import * as jimp from 'jimp';

export async function combineImagesVertically(
  filenames: string[],
  imageHeight: number,
  originalPageHeight: number,
  mergedFilename: string,
): Promise<void> {
  const images = await Promise.all(
    filenames.map(async (filename) => await jimp.read(filename)),
  );

  // Detect scaling factors that may occur when using high-resolution monitors
  const scaleY = images[0].bitmap.height / imageHeight;
  const pageHeightPixels = originalPageHeight * scaleY;
  let totalHeight = 0;
  let maximumWidth = 0;
  for (const image of images) {
    totalHeight += image.bitmap.height;
    maximumWidth = Math.max(maximumWidth, image.bitmap.width);
  }

  // Render the final image first, since it will be partially overwritten
  const baseImage = await jimp.create(maximumWidth, pageHeightPixels);
  const lastImage = images[images.length - 1];
  const pos = pageHeightPixels - lastImage.bitmap.height;
  baseImage.composite(lastImage, 0, pos);
  let offsetY = 0;
  for (let i = 0; i < images.length - 1; i++) {
    baseImage.composite(images[i], 0, offsetY);
    offsetY += images[i].bitmap.height;
  }
  await baseImage.writeAsync(mergedFilename);
}
