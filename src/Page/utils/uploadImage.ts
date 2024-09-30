import { supabase } from "../../supabaseClient";

export const uploadImage = async (file?: File) => {
  try {
    if (!file) throw new Error("No file provided");

    const { data } = await supabase.auth.getSession();
    const userId = data?.session?.user?.id;
    if (!userId) throw new Error("User not logged in");

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;
    const filePath = fileName;

    await supabase.storage.from("images").upload(filePath, file);

    return { filePath, fileName };
  } catch (error) {
    return null;
  }
};
