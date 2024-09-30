// LIBRARIES
import { useEffect, useRef, useState } from "react";

export const useOverflowsScreen = () => {
  const [topOverflowHeight, setTopOverflowHeight] = useState<number>(0);
  const [bottomOverflowHeight, setBottomOverflowHeight] = useState<number>(0);

  const commandPanelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [checkOverflowKey, setCheckOverflowKey] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setCheckOverflowKey((prev) => prev + 1);
    window.addEventListener("scroll", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (commandPanelRef.current && wrapperRef.current) {
      const { bottom, top } = wrapperRef.current.getBoundingClientRect();
      const { height } = commandPanelRef.current.getBoundingClientRect();
      const { innerHeight } = window;
      let [topOverflow, bottomOverflow] = [0, 0];
      const potentialTopOverflow = height - bottom;
      const potentialBottomOverflow = top + height - innerHeight;
      if (potentialTopOverflow > 0) topOverflow = potentialTopOverflow;
      if (potentialBottomOverflow > 0) bottomOverflow = potentialBottomOverflow;
      setTopOverflowHeight(topOverflow);
      setBottomOverflowHeight(bottomOverflow);
    }
  }, [checkOverflowKey]);

  return {
    commandPanelRef,
    wrapperRef,
    topOverflowHeight,
    bottomOverflowHeight,
  };
};
