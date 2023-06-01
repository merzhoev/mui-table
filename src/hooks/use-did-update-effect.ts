import { useRef, useEffect } from 'react';

export function useDidUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined,
) {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isMountedRef.current) {
      effect();
      return;
    }

    isMountedRef.current = true;
  }, deps);
}
