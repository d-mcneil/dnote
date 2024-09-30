// STYLES
import styles from "../styles/Title.module.css";
// LIBRARIES
import {
  KeyboardEventHandler,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
  FormEventHandler,
} from "react";
// STATE
import { useAppState } from "../../state/AppStateContext";
// UTILS
import { createBasicNode } from "../../Node/utils/createNode";

export const Title = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  const { title, addNode, setTitle, nodes, setFocusedNodeIndex } =
    useAppState();

  const handleOnKeyDown: KeyboardEventHandler = (
    event: KeyboardEvent<HTMLHeadingElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!nodes.length) {
        addNode(createBasicNode(), 0);
        setFocusedNodeIndex(0);
      }
    }
  };

  const handleOnInput: FormEventHandler = (
    event: FormEvent<HTMLHeadingElement>
  ): void => setTitle(event.currentTarget.textContent || "");

  useEffect(() => {
    if (headerRef.current && !headerRef.current?.textContent)
      headerRef.current.textContent = title;
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onInput={handleOnInput}
        onKeyDown={handleOnKeyDown}
        ref={headerRef}
      />
    </div>
  );
};
