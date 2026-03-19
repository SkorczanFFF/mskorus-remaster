import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as THREE from 'three';

export type HeroIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type HeroIconGeometry = {
  geometry: THREE.BufferGeometry;
  // Size in “normalized” geometry units (before applying the `scale` in the scene).
  size: THREE.Vector3;
};

function normalizeSvgMarkup(svg: string) {
  // Ensure we always have an SVG root with a viewBox. Many react-icons include viewBox already.
  if (!svg.includes('<svg')) return svg;
  if (svg.includes('viewBox=')) return svg;
  // Default react-icons box is usually 0 0 24 24.
  return svg.replace('<svg', '<svg viewBox="0 0 24 24"');
}

export function buildExtrudedIconGeometry(Icon: HeroIconComponent, depth = 2.2): HeroIconGeometry {
  const markup = normalizeSvgMarkup(
    renderToStaticMarkup(<Icon width={24} height={24} fill="currentColor" />),
  );

  const data = new SVGLoader().parse(markup);
  const shapes: THREE.Shape[] = [];
  data.paths.forEach((p) => {
    p.toShapes(true).forEach((s) => shapes.push(s));
  });

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelThickness: depth * 0.15,
    bevelSize: depth * 0.15,
    bevelSegments: 2,
    curveSegments: 8,
  };

  const geom = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
  geom.computeVertexNormals();
  geom.computeBoundingBox();

  const bbox = geom.boundingBox ?? new THREE.Box3();
  const size = new THREE.Vector3();
  bbox.getSize(size);

  // Center it so physics + visuals align.
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  geom.translate(-center.x, -center.y, -center.z);

  // Normalize the icon so height ~ 1 unit (keeps scaling consistent across icons).
  const target = 1;
  const scale = size.y > 0 ? target / size.y : 1;
  geom.scale(scale, scale, scale);

  // SVG Y axis is typically "down" (screen coordinates). Flip once so icons are upright in 3D.
  // Rotation avoids negative scaling (which can invert winding / normals).
  geom.rotateX(Math.PI);
  geom.computeBoundingBox();
  geom.computeVertexNormals();

  const bbox2 = geom.boundingBox ?? new THREE.Box3();
  const size2 = new THREE.Vector3();
  bbox2.getSize(size2);

  return { geometry: geom, size: size2 };
}

export function useHeroIconGeometry(Icon: HeroIconComponent, depth = 2.2) {
  return useMemo(() => buildExtrudedIconGeometry(Icon, depth), [Icon, depth]);
}

