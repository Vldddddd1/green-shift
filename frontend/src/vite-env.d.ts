/// <reference types="vite/client" />

// Same as vite-plugin-svgr/client, plus an optional `sx` prop: several
// components in this app pass MUI's `sx` to imported SVG components.
declare module "*.svg?react" {
  import * as React from "react";
  import type { SxProps, Theme } from "@mui/material/styles";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
      sx?: SxProps<Theme>;
    }
  >;

  export default ReactComponent;
}
