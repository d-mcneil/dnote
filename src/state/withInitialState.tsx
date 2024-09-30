// STYLES
import styles from "../utils.module.css";
// LIBRARIES
import { useState, ComponentType, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
// TYPES
import { Page } from "../types/types";
// COMPONENTS
import { Loader } from "../components/Loader";
// UTILS
import { supabase } from "../supabaseClient";
import {
  createPage,
  createPageRequest,
  createStartPageRequest,
} from "../Page/utils/createPage";
import { useAuthSession } from "../auth/AuthSessionContext";

type InjectedProps = {
  initialState: Page;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export const withInitialState = <TProps,>(
  Component: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) => {
  return (props: PropsWithoutInjected<TProps>) => {
    const match = useMatch("/:slug");
    const pageSlug = match ? match.params.slug : "start";

    const navigate = useNavigate();

    const matchStartDemo = useMatch("/start-demo");
    const matchUntitledDemo = useMatch("/untitled-demo");
    const isDemo = !!matchStartDemo || !!matchUntitledDemo;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialState, setInitialState] = useState<Page | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const { user } = useAuthSession();
    const { id: userId } = user || {};

    useEffect(() => {
      setInitialState(null);
      const fetchInitialState = async () => {
        setIsLoading(true);
        try {
          if (!userId && !isDemo) {
            navigate("/auth");
            throw new Error("User not logged in");
          }

          const { data: pageData } = await supabase
            .from("pages")
            .select("title, id, cover, nodes, slug, cover_color")
            .match({
              slug: pageSlug,
              ...(isDemo ? {} : { created_by: userId }),
            })
            .single();

          if (pageData) setInitialState(createPage(pageData));
          else if (userId && !isDemo) {
            const page = pageSlug?.match(
              /^start-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
            )
              ? createStartPageRequest(userId)
              : createPageRequest(userId, { slug: pageSlug });

            const result = await supabase
              .from("pages")
              .insert(page)
              .select("id");

            const { data, error } = result;
            if (data?.length)
              setInitialState({ ...createPage(page), id: data[0].id });
            else throw new Error(error?.message);
          } else {
            navigate("/auth");
            throw new Error("User not logged in");
          }
          setError(null);
        } catch (error) {
          setInitialState(null);
          // if (error instanceof Error && error.message) console.warn(error.message);
          setError(new Error("Page not found"));
        } finally {
          setIsLoading(false);
        }
      };
      if (!isLoading) fetchInitialState();
    }, [pageSlug]);

    if (error)
      return <div className={styles.centeredFlex}>{error.message}</div>;

    if (isLoading || (!initialState && !error)) return <Loader />;

    if (!initialState)
      return <div className={styles.centeredFlex}>Page not found</div>;

    return <Component {...props} initialState={initialState} />;
  };
};
