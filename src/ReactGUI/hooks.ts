import {
    useLayoutEffect,
    useCallback,
    useState,
    useEffect,
    useRef,
  } from 'react';
  
  const getRemValue = () => {
      const el = document.querySelector('html')!;
      const fontSize = window.getComputedStyle(el, null).getPropertyValue('font-size');
      return parseFloat(fontSize);
  };
  
  export const useWindowSize = (): {
    size: [number, number],
    remValue: number,
  } => {
    const [size, setSize] = useState<[number, number]>([0, 0]);
    useLayoutEffect(() => {
      const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return { size, remValue: getRemValue() };
  }
  
  
  export const useAnimationFrame = (
    callback: (deltaTime: number) => void,
  ) => {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const animate = useCallback((time: number) => {
        if (previousTimeRef?.current) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [callback]);
  
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef?.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate]);
  };