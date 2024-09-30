const TextNodeTypes = [
  "text",
  "heading1",
  "heading2",
  "heading3",
  "list",
] as const;

export type TextNodeTypes = (typeof TextNodeTypes)[number];

export type NodeType = "image" | "page" | TextNodeTypes;

export const isTextNodeType = (type: NodeType): type is TextNodeTypes =>
  ["text", "heading1", "heading2", "heading3", "list"].includes(type);

export const isImageNodeType = (type: NodeType): type is "image" =>
  type === "image";

export const isPageNodeType = (type: NodeType): type is "page" =>
  type === "page";

export type NodeData = {
  id: string;
  type: NodeType;
  value: string;
};

export type NodeProps = {
  node: NodeData;
  index: number;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  nodes: NodeData[];
  focusedNodeIndex: number | undefined;
  coverColor: string;
};

type SupportedNodeType = {
  nodeType: NodeType;
  name: string;
};

export const supportedNodeTypes: SupportedNodeType[] = [
  { nodeType: "text", name: "Text" },
  { nodeType: "heading1", name: "Heading 1" },
  { nodeType: "heading2", name: "Heading 2" },
  { nodeType: "heading3", name: "Heading 3" },
  { nodeType: "list", name: "List" },
  { nodeType: "image", name: "Image" },
  { nodeType: "page", name: "Page" },
];

export type PageDTO = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  nodes: NodeData[];
  created_by: string;
  cover_color: string;
};
