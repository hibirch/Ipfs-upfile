import type { NextPage } from "next";
import type { ReactElement } from "react";
export type NextPageWithLayout<P = ReactElement, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};
