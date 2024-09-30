// STYLES
import styles from "../styles/Node.module.css";
// LIBRARIES
import cx from "classnames";
import {
  FormEvent,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
// TYPES
import { NodeProps, NodeType } from "../../types/types";
// STATE
import { useAppState } from "../../state/AppStateContext";
// COMPONENTS
import { CommandPanel } from "./CommandPanel";
// UTILS
import { createNode } from "../utils/createNode";

export const BasicNode = ({ node, index }: NodeProps) => {
  const {
    changeNodeValue,
    removeNodeByIndex,
    addNode,
    focusedNodeIndex,
    setFocusedNodeIndex,
    changeNodeType,
  } = useAppState();

  const nodeRef = useRef<HTMLDivElement>(null);

  const isFocused = focusedNodeIndex === index;
  const isShowCommandPanel = isFocused && node?.value?.match(/^\//);

  const parseCommand = (nodeType: NodeType): void => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const handleInput: FormEventHandler = (event: FormEvent): void => {
    const { textContent } = event.currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick: MouseEventHandler = (): void => setFocusedNodeIndex(index);

  const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent): void => {
    const { key } = event;
    const target = event.target as HTMLDivElement;
    if (key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") return;
      const { type } = node;
      addNode(createNode(type), index + 1);
      setFocusedNodeIndex(index + 1);
    } else if (key === "Backspace") {
      if (!target.textContent) {
        event.preventDefault();
        removeNodeByIndex(index);
        setFocusedNodeIndex(!index ? 0 : index - 1);
      } /* else if (window.getSelection()?.anchorOffset === 0) { // I don't like this behavior, so it's commented out
        event.preventDefault();
        removeNodeByIndex(index - 1);
        setFocusedNodeIndex(index - 1);
      } */
    } else if (key === "Delete" && !target.textContent) {
      event.preventDefault();
      removeNodeByIndex(index);
      setFocusedNodeIndex(!index ? 0 : index - 1);
    }
  };

  useEffect(() => {
    if (nodeRef.current) nodeRef.current.textContent = node.value;
  }, []);

  useEffect(() => {
    if (isFocused) nodeRef.current?.focus();
    else nodeRef.current?.blur();
  }, [isFocused]);

  return (
    <>
      {isShowCommandPanel && (
        <CommandPanel
          selectNodeType={parseCommand}
          nodeText={node.value}
          nodeRef={nodeRef}
          key={node.id}
        />
      )}
      <div
        contentEditable
        suppressContentEditableWarning
        ref={nodeRef}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
