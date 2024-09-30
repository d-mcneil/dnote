// LIBRARIES
import { nanoid } from "nanoid";
// TYPES
import { NodeData, NodeType } from "../../types/types";

export const createNode = (type: NodeType): NodeData => ({
  id: nanoid(),
  type,
  value: "",
});

export const createBasicNode = (): NodeData => createNode("text");
