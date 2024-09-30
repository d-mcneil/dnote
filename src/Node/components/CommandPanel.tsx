// STYLES
import styles from "../styles/CommandPanel.module.css";
// LIBRARIES
import { RefObject, useEffect, useState } from "react";
import cx from "classnames";
// TYPES
import { NodeType, supportedNodeTypes } from "../../types/types";
// UTILS
import { useOverflowsScreen } from "../utils/useOverflowsScreen";

export const CommandPanel = ({
  nodeText,
  selectNodeType,
  nodeRef,
}: {
  nodeText: string;
  selectNodeType(nodeType: NodeType): void;
  nodeRef: RefObject<HTMLDivElement>;
}) => {
  const [selectedNodeTypeIndex, setSelectedNodeTypeIndex] = useState<number>(0);
  const [isShowCommandPanel, setIsShowCommandPanel] = useState<boolean>(false);

  const {
    topOverflowHeight,
    bottomOverflowHeight,
    commandPanelRef,
    wrapperRef,
  } = useOverflowsScreen();

  useEffect(() => {
    // This is to prevent flickering if the command panel overflows the screen and needs to be y-transformed
    setIsShowCommandPanel(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const { key } = event;
      if (key === "Enter")
        selectNodeType(supportedNodeTypes[selectedNodeTypeIndex].nodeType);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeTypeIndex, selectNodeType]);

  useEffect(() => {
    const normalizedValue = nodeText
      .toLowerCase()
      .replace(/\//, "")
      .replace(" ", "")
      .trim();
    const selectedNodeIndex = supportedNodeTypes.findIndex((item) =>
      item.nodeType.match(normalizedValue)
    );
    if (selectedNodeIndex !== -1) setSelectedNodeTypeIndex(selectedNodeIndex);
  }, [nodeText]);

  const renderSupportedNodeTypes = supportedNodeTypes.map((type, index) => {
    const isSelected = index === selectedNodeTypeIndex;
    const { nodeType, name } = type;
    return (
      <li
        key={nodeType}
        onClick={() => {
          selectNodeType(nodeType);
          nodeRef.current?.focus();
        }}
        className={cx({
          [styles.selected]: isSelected,
        })}
      >
        {name}
      </li>
    );
  });

  return (
    <div
      ref={wrapperRef}
      className={cx(styles.wrapper, {
        [styles.center]: topOverflowHeight && bottomOverflowHeight,
        [styles.bottom]: !topOverflowHeight && bottomOverflowHeight,
        [styles.top]:
          (topOverflowHeight && !bottomOverflowHeight) ||
          (!topOverflowHeight && !bottomOverflowHeight),
      })}
    >
      <div
        ref={commandPanelRef}
        className={cx(styles.panel, {
          [styles.hidden]: !isShowCommandPanel,
          [styles.visible]: isShowCommandPanel,
        })}
        key={1}
      >
        <div className={styles.title}>Blocks</div>
        <ul>{renderSupportedNodeTypes}</ul>
      </div>
    </div>
  );
};
