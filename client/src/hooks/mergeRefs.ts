import type { MutableRefObject, RefCallback } from 'react';

/** Combines multiple refs (from separate hooks) onto a single DOM node. */
export function mergeRefs<T>(...refs: Array<MutableRefObject<T | null> | RefCallback<T> | null | undefined>): RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    });
  };
}
