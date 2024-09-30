// TYPES
import { Page } from "../../types/types";
// UTILS
import { supabase } from "../../supabaseClient";
import { debounce } from "./debounce";
import { createPageRequest } from "./createPage";

export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    const { data } = await supabase.auth.getSession();
    const userId = data?.session?.user?.id;
    if (!userId) return console.warn("User not logged in");

    await supabase
      .from("pages")
      .update(createPageRequest(userId, page))
      .eq("id", page.id);
  },
  500
);
