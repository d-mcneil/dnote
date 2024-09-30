// LIBRARIES
import { nanoid } from "nanoid";
// TYPES
import { NodeData } from "../../types/types";

export const nodes: () => NodeData[] = () => [
  {
    type: "image",
    value: "0.6990788632294302.jpg",
    id: "dabc6uWT58KKIvBuo4DEF",
  },
  {
    type: "text",
    value:
      "This app is written in React + TypeScript and works similarly to Notion. For example, try entering text below this paragraph 👇",
    id: "dgkm6uWT58KKIvBuo4KCE",
  },
  {
    type: "text",
    value: "",
    id: "cZjPbQHUQmv5h-v1rpDoD",
  },
  {
    type: "text",
    value: "You can create lists:",
    id: "eK__MFBh2DieZzKQDf5rl",
  },
  {
    id: "xqheg8temRgwMPvyJ6Kt2",
    type: "list",
    value:
      'Access the command palette by starting a new line with a slash (" / ") then',
  },
  {
    id: "kxy4w1ixBTjuGSNBkTn5c",
    type: "list",
    value: 'Type "list" and press "Enter" or',
  },
  {
    id: "RVz0IL-2sYjRH5hT0H6Cs",
    type: "list",
    value: 'Click on "list"',
  },
  {
    type: "text",
    value: "",
    id: "pH0TGrzTJ09_8w8XXfKO8",
  },
  {
    type: "text",
    value: "You can make headings:",
    id: "qbsmQ_NkTC7jRO4csWL8h",
  },
  {
    id: "3e7pjraEuF8ScRECa8buT",
    type: "heading1",
    value: "Heading 1",
  },
  {
    id: "e_F-SpA6C2hKhiyepldmD",
    type: "heading2",
    value: "Heading 2",
  },
  {
    id: "Ou4LnrAC-USWC442fSW1b",
    type: "heading3",
    value: "Heading 3",
  },
  {
    type: "text",
    value: "",
    id: "e1pnucOk3k_G3_Gjw7SrB",
  },
  {
    id: "HZW90JIZP1Tijo7Z5ipp1",
    type: "text",
    value: "You can create subpages:",
  },
  {
    type: "page",
    value: nanoid(),
    id: "qD6vnHeExO5gTg5ZmPUt3",
  },
  {
    id: "sJGJ0wmE4yGoCD2gRe9dK",
    type: "text",
    value: "",
  },
  {
    id: "w5rCxCufViHF5Z53r-BxO",
    type: "text",
    value: "You can upload images:",
  },
  {
    id: "g4oQwAAoc4USiKETdkD_J",
    type: "image",
    value: "",
  },
  {
    id: "5UOPhZz3RPUACIsw7NVti",
    type: "text",
    value: "",
  },
  {
    id: "11gs6cJC6J6W_cw1wFP3Y",
    type: "text",
    value: "And you can drag nodes to reorder them:",
  },
  {
    id: "n4BhBRVKDD-_N4f2jXim_",
    type: "list",
    value:
      "Hover over the space to the left of the node and look for the ⠿ symbol",
  },
  {
    id: "Fd4rDA5n9Qw6ccVOEs1Wr",
    type: "text",
    value: "",
  },
  {
    id: "CfX6obuMAWKD4qZU6j6Qw",
    type: "heading3",
    value: "Enjoy!",
  },
];

export const title: string = "Welcome to DNote!";
