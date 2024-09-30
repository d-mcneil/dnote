// STYLES
import styles from "../styles/NodeContainer.module.css";
// LIBRARIES
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// TYPES
import { NodeProps } from "../../types/types";
// COMPONENTS
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";

export const NodeContainer = (props: NodeProps) => {
  const { id } = props.node;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher {...props} />
    </div>
  );
};
