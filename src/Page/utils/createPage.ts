// LIBRARIES
import { nanoid } from "nanoid";
// TYPES
import { PageDTO, Page } from "../../types/types";
// UTILS
import { nodes as startPageNodes, title as startPageTitle } from "./startPage";
import {
  title as newPageTitle,
  coverColor as newPageCoverColor,
} from "./newPage";

export const createPage = (pageDataResponse?: Partial<PageDTO>): Page => {
  let {
    id,
    slug,
    title,
    nodes,
    cover,
    cover_color: coverColor,
  } = pageDataResponse || {};
  id = id || nanoid();
  slug = slug || nanoid();
  title = title || newPageTitle;
  nodes = nodes || [];
  cover = cover || "";
  coverColor = coverColor || newPageCoverColor;
  return {
    id,
    slug,
    title,
    nodes,
    cover,
    coverColor,
    focusedNodeIndex: undefined,
  };
};

type CreatePageRequest = (
  userId: string,
  page?: Partial<Page>
) => Omit<PageDTO, "id">;

export const createPageRequest: CreatePageRequest = (
  userId: string,
  page?: Partial<Page>
) => {
  if (!userId) throw new Error("User not logged in");
  const {
    slug: defaultPageSlug,
    title: defaultPageTitle,
    nodes: defaultPageNodes,
    cover: defaultPageCover,
    coverColor: defaultCoverColor,
  } = createPage();
  const {
    slug: pageSlug,
    title: pageTitle,
    nodes: pageNodes,
    cover: pageCover,
    coverColor: pageCoverColor,
  } = page || {};
  const slug = pageSlug || defaultPageSlug;
  const title = pageTitle || defaultPageTitle;
  const nodes = pageNodes || defaultPageNodes;
  const cover = pageCover || defaultPageCover;
  const coverColor = pageCoverColor || defaultCoverColor;
  return {
    slug,
    title,
    nodes,
    cover,
    created_by: userId,
    cover_color: coverColor,
    focusedNodeIndex: undefined,
  };
};

export const createStartPageRequest: CreatePageRequest = (userId: string) =>
  createPageRequest(userId, {
    nodes: startPageNodes(),
    title: startPageTitle,
    slug: `start-${userId}`,
  });
