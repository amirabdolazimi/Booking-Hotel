import { useEffect } from "react";

export const useOutsideClick = (ref, exceptionId, callBackFn) => {
  console.log(ref);
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        exceptionId !== event.target.id
      ) {
        callBackFn();
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [ref, callBackFn]);
};
