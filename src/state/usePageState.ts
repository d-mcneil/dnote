// LIBRARIES
import { arrayMove } from "@dnd-kit/sortable";
// TYPES
import { NodeData, NodeType, Page } from "../types/types";
// STATE
import { useSyncedState } from "./useSyncedState";
// UTILS
import { updatePage } from "../Page/utils/updatePage";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useSyncedState(initialState, updatePage);

  const addNode = (node: NodeData, index: number): void =>
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });

  const removeNodeByIndex = (nodeIndex: number): void =>
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1);
    });

  const changeNodeValue = (nodeIndex: number, value: string): void =>
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });

  const changeNodeType = (nodeIndex: number, type: NodeType): void =>
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });

  const setNodes = (nodes: NodeData[]): void =>
    setPage((draft) => {
      draft.nodes = nodes;
    });

  const setTitle = (title: string): void =>
    setPage((draft) => {
      draft.title = title;
    });

  const setCoverImage = (coverImage: string): void =>
    setPage((draft) => {
      draft.cover = coverImage;
    });

  const setCoverColor = (coverColor: string): void =>
    setPage((draft) => {
      draft.coverColor = coverColor;
    });

  const setFocusedNodeIndex = (index: number | undefined): void =>
    setPage((draft) => {
      draft.focusedNodeIndex = draft.nodes.length ? index : undefined;
    });

  const reorderNodes = (id1: string, id2: string): void =>
    setPage((draft) => {
      const index1 = draft.nodes.findIndex((node) => node.id === id1);
      const index2 = draft.nodes.findIndex((node) => node.id === id2);
      draft.nodes = arrayMove(draft.nodes, index1, index2);
    });

  const { nodes, title, cover, focusedNodeIndex, coverColor } = page;

  return {
    nodes,
    title,
    cover,
    coverColor,
    setCoverColor,
    focusedNodeIndex,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setTitle,
    setCoverImage,
    setNodes,
    setFocusedNodeIndex,
    reorderNodes,
  };
};
