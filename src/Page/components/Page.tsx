// STYLES
import styles from "../styles/Page.module.css";
// LIBRARIES
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// STATE
import { useAppState } from "../../state/AppStateContext";
// COMPONENTS
import { Cover } from "./Cover";
import { Title } from "./Title";
import { Spacer } from "./Spacer";
import { NodeContainer } from "../../Node/components/NodeContainer";
// UTILS
import { useHandleArrowKeysForFocusedNodeIndex } from "../utils/useHandleArrowKeysForFocusedNodeIndex";
import { SignOut } from "./SignOut";

export const Page = () => {
  const { nodes, focusedNodeIndex, setFocusedNodeIndex, reorderNodes } =
    useAppState();

  useHandleArrowKeysForFocusedNodeIndex(
    nodes,
    focusedNodeIndex,
    setFocusedNodeIndex
  );

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id)
      reorderNodes(active.id as string, over.id as string);
  };

  return (
    <>
      <SignOut />
      <Cover />
      <div className={styles.container}>
        <Title />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer key={node.id} node={node} index={index} />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
        <Spacer />
      </div>
    </>
  );
};
