// STYLES
import styles from "../styles/Spacer.module.css";
// STATE
import { useAppState } from "../../state/AppStateContext";
// UTILS
import { createBasicNode } from "../../Node/utils/createNode";

export const Spacer = () => {
  const { addNode, nodes, setFocusedNodeIndex } = useAppState();

  const onClick = () => {
    addNode(createBasicNode(), nodes.length);
    setFocusedNodeIndex(nodes.length);
  };

  return (
    <div className={styles.spacer} onClick={onClick}>
      {!nodes.length && "Click to create the first paragraph."}
    </div>
  );
};
