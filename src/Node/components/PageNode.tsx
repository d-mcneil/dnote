// STYLES
import styles from "../styles/Node.module.css";
// LIBRARIES
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cx from "classnames";
import { nanoid } from "nanoid";
// TYPES
import { NodeProps } from "../../types/types";
// STATE
import { useAppState } from "../../state/AppStateContext";
import { useAuthSession } from "../../auth/AuthSessionContext";
// UTILS
import { supabase } from "../../supabaseClient";
import { title as newPageTitle } from "../../Page/utils/newPage";
import PageNodeArrow from "../utils/pageNodeArrow.svg";

export const PageNode = ({ node, index }: NodeProps) => {
  const navigate = useNavigate();
  const navigateToPage = node.value
    ? () => navigate(`/${node.value}`)
    : () => {};

  const { removeNodeByIndex, focusedNodeIndex, changeNodeValue } =
    useAppState();
  const isFocused = index === focusedNodeIndex;

  const [pageTitle, setPageTitle] = useState<string>(
    node.value ? `${window.origin}/${node.value}` : newPageTitle
  );

  const matchStartDemo = useMatch("/start-demo");
  const matchUntitledDemo = useMatch("/untitled-demo");
  const isDemo = !!matchStartDemo || !!matchUntitledDemo;

  const { user } = useAuthSession();
  const { id: userId } = user || {};

  useEffect(() => {
    if (!node.value)
      changeNodeValue(
        index,
        matchStartDemo
          ? "untitled-demo"
          : matchUntitledDemo
          ? "start-demo"
          : nanoid()
      );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const { key } = event;
      if (key === "Backspace" || key === "Delete") removeNodeByIndex(index);
      if (key === "Enter") navigateToPage();
    };
    if (isFocused) window.addEventListener("keydown", handleKeyDown);
    else window.removeEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, node, navigateToPage]);

  useEffect(() => {
    if (!node.value) return;
    const fetchPageTitle = async () => {
      const { data } = await supabase
        .from("pages")
        .select("title")
        .match({
          slug: node.value,
          ...(isDemo ? {} : { created_by: userId }),
        })
        .single();
      if (data) setPageTitle(data.title);
      else throw new Error("Page not found");
    };
    fetchPageTitle().catch(() => {
      setPageTitle(newPageTitle);
    });
  }, [node.value]);

  return (
    <div
      onClick={navigateToPage}
      className={cx(styles.node, styles.page, {
        [styles.focused]: isFocused,
      })}
    >
      <div className={styles["page-arrow-wrapper"]}>
        <img
          src={PageNodeArrow}
          alt="Page Node Arrow"
          className={styles["page-arrow"]}
        />
      </div>
      {pageTitle}
    </div>
  );
};
