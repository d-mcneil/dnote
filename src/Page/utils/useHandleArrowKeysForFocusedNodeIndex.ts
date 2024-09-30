// LIBRARIES
import { useEffect } from "react";
// TYPES
import { NodeData } from "../../types/types";

export const useHandleArrowKeysForFocusedNodeIndex = (
  nodes: NodeData[],
  focusedNodeIndex: number | undefined,
  setFocusedNodeIndex: (index: number | undefined) => void
) =>
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key !== "ArrowUp" && key !== "ArrowDown") return;
      event.preventDefault();

      if (focusedNodeIndex === undefined || !nodes.length) return;

      if (key === "ArrowUp")
        setFocusedNodeIndex(Math.max(focusedNodeIndex - 1, 0));
      else
        setFocusedNodeIndex(Math.min(focusedNodeIndex + 1, nodes.length - 1));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nodes, focusedNodeIndex]);
