import { useState, useCallback, useEffect } from "react";

export const useOnKeyPress = (
  targetKey,
  onKeyDown = () => {},
  onKeyUp = () => {},
  isDebugging
) => {
  const [isKeyDown, setIsKeyDown] = useState(false);

  const downHandler = useCallback(
    e => {
      if (isDebugging)
        console.log(
          "key down",
          e.key,
          e.key !== targetKey ? "- isn't triggered" : "- is triggered"
        );
      if (e.key !== targetKey) return;
      setIsKeyDown(true);

      if (typeof onKeyDown !== "function") return;
      onKeyDown(e);
    },
    [isDebugging, onKeyDown, targetKey]
  );
  const upHandler = useCallback(
    e => {
      if (isDebugging)
        console.log(
          "key up",
          e.key,
          e.key !== targetKey ? "- isn't triggered" : "- is triggered"
        );
      if (e.key !== targetKey) return;
      setIsKeyDown(false);

      if (typeof onKeyUp !== "function") return;
      onKeyUp(e);
    },
    [isDebugging, onKeyUp, targetKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);

  return isKeyDown;
};
