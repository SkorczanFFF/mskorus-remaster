import * as THREE from 'three';

import {
  createParticleGeometry,
  type ParticleGeometryResult,
} from '@/components/Hero/Partials/imageParticles/createParticleGeometry';

export function sampleTextureToParticleGeometry(
  img: CanvasImageSource,
  naturalWidth: number,
  naturalHeight: number,
  threshold: number,
  targetWidth: number,
  maxSampleWidth: number,
  angleSeeds?: Float32Array,
): ParticleGeometryResult | null {
  if (!naturalWidth || !naturalHeight) return null;

  const downscale = Math.min(1, maxSampleWidth / naturalWidth);
  const sampleWidth = Math.max(1, Math.floor(naturalWidth * downscale));
  const sampleHeight = Math.max(1, Math.floor(naturalHeight * downscale));

  const canvas = document.createElement('canvas');
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.clearRect(0, 0, sampleWidth, sampleHeight);
  ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
  const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
  return createParticleGeometry(imageData, sampleWidth, sampleHeight, threshold, targetWidth, {
    angleSeeds,
  });
}

export function getImageSourceFromTexture(texture: THREE.Texture): {
  source: CanvasImageSource;
  width: number;
  height: number;
} | null {
  const image = texture.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap | undefined;
  if (!image) return null;
  const width =
    'width' in image && typeof image.width === 'number' ? image.width : (image as HTMLImageElement).naturalWidth;
  const height =
    'height' in image && typeof image.height === 'number'
      ? image.height
      : (image as HTMLImageElement).naturalHeight;
  if (!width || !height) return null;
  return { source: image as CanvasImageSource, width, height };
}
