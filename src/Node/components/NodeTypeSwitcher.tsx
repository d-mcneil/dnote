// TYPES
import {
  NodeProps,
  isImageNodeType,
  isPageNodeType,
  isTextNodeType,
} from "../../types/types";
// COMPONENTS
import { BasicNode } from "./BasicNode";
import { ImageNode } from "./ImageNode";
import { PageNode } from "./PageNode";

export const NodeTypeSwitcher = (props: NodeProps) => {
  const { type } = props.node;
  let Component;
  if (isTextNodeType(type)) Component = BasicNode;
  else if (isPageNodeType(type)) Component = PageNode;
  else if (isImageNodeType(type)) Component = ImageNode;
  if (Component) return <Component {...props} />;
  return <></>;
};
