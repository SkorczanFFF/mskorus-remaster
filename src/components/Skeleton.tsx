import * as React from 'react';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return <div {...rest} />;
}
