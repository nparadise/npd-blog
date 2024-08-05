import { useEffect, useRef, useState } from "react";

export default function useComponentVisible<T extends HTMLElement>(
  init: boolean = false,
): [
  React.RefObject<T>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [isVisible, setIsVisible] = useState<boolean>(init);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      event.target instanceof Node &&
      !ref.current.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return [ref, isVisible, setIsVisible];
}
