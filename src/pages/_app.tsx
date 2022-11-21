import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { type ReactElement } from "react";
import { type EmotionCache } from "@emotion/react";

import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import CssBaseline from "@mui/material/CssBaseline";

import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp: AppType<{
  session: Session | null;
  emotionCache: EmotionCache;
  getLayout: (page: ReactElement) => ReactElement;
}> = ({
  Component,
  pageProps: {
    getLayout,
    emotionCache = clientSideEmotionCache,
    session,
    ...pageProps
  },
}) => {
  const layout = getLayout ?? ((page) => page);
  return layout(
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <CssBaseline />
        <Component {...pageProps} />
      </SessionProvider>
    </CacheProvider>
  );
};

export default trpc.withTRPC(MyApp);
