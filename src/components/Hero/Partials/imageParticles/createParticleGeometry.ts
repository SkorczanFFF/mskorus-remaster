import * as THREE from 'three';

export type ParticleGeometryResult = {
  geometry: THREE.InstancedBufferGeometry;
  planeWidth: number;
  planeHeight: number;
};

export type CreateParticleGeometryOptions = {
  /** Fixed angles per instance (length must match visible pixel count). If omitted, random angles are used. */
  angleSeeds?: Float32Array;
};

/**
 * Builds instanced quad geometry from raster image data (bright opaque pixels → particles).
 */
export function createParticleGeometry(
  imageData: ImageData,
  width: number,
  height: number,
  threshold: number,
  targetWidth: number,
  options?: CreateParticleGeometryOptions,
): ParticleGeometryResult {
  const quadPositions = new Float32Array([
    -0.5, 0.5, 0,
    0.5, 0.5, 0,
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
  ]);
  const quadUvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  const quadIndices = new Uint16Array([0, 2, 1, 2, 3, 1]);

  const source = imageData.data;
  const visible: number[] = [];
  for (let i = 0; i < width * height; i++) {
    const i4 = i * 4;
    const r = source[i4];
    const g = source[i4 + 1];
    const b = source[i4 + 2];
    const a = source[i4 + 3];
    const grey = r * 0.21 + g * 0.71 + b * 0.07;
    if (a > 16 && grey > threshold) visible.push(i);
  }

  const instanceCount = visible.length;
  const offsets = new Float32Array(instanceCount * 3);
  const sampleUvs = new Float32Array(instanceCount * 2);
  const pindex = new Float32Array(instanceCount);
  const angle = new Float32Array(instanceCount);
  const intensity = new Float32Array(instanceCount);

  const cx = width * 0.5;
  const cy = height * 0.5;
  const pixelScale = targetWidth / Math.max(1, width);

  for (let i = 0; i < instanceCount; i++) {
    const idx = visible[i];
    const px = idx % width;
    const py = Math.floor(idx / width);

    const i3 = i * 3;
    offsets[i3] = (px - cx) * pixelScale;
    offsets[i3 + 1] = (cy - py) * pixelScale;
    offsets[i3 + 2] = 0;

    const i2 = i * 2;
    const uvx = (px + 0.5) / Math.max(1, width);
    const uvy = (py + 0.5) / Math.max(1, height);
    sampleUvs[i2] = uvx;
    sampleUvs[i2 + 1] = 1 - uvy;

    pindex[i] = i;
    angle[i] =
      options?.angleSeeds && options.angleSeeds.length === instanceCount
        ? options.angleSeeds[i]!
        : Math.random() * Math.PI * 2;

    const src = idx * 4;
    const greyVal =
      (source[src] * 0.21 + source[src + 1] * 0.71 + source[src + 2] * 0.07) / 255;
    intensity[i] = THREE.MathUtils.clamp(greyVal, 0, 1);
  }

  const geometry = new THREE.InstancedBufferGeometry();
  geometry.instanceCount = instanceCount;
  geometry.setAttribute('position', new THREE.BufferAttribute(quadPositions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(quadUvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(quadIndices, 1));
  geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
  geometry.setAttribute('sampleUv', new THREE.InstancedBufferAttribute(sampleUvs, 2, false));
  geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(pindex, 1, false));
  geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angle, 1, false));
  geometry.setAttribute('intensity', new THREE.InstancedBufferAttribute(intensity, 1, false));
  geometry.computeBoundingSphere();

  return {
    geometry,
    planeWidth: width * pixelScale,
    planeHeight: height * pixelScale,
  };
}
