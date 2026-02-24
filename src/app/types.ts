import type { ReactNode } from "react";

export type ToolIconName =
  | "qr_scanner"
  | "qr_generator"
  | "file_upload"
  | "json_formatter"
  | "csv_viewer"
  | "base64"
  | "url_codec"
  | "text_diff"
  | "jwt_decoder"
  | "hash"
  | "uuid"
  | "password"
  | "url_builder"
  | "timestamp"
  | "cron";

export interface ToolRoute {
  path: string;
  name: string;
  summary: string;
  sectionId: string;
  sectionLabel: string;
  icon: ToolIconName;
  component: () => ReactNode;
}

export interface ToolSection {
  id: string;
  label: string;
  description: string;
}

export interface ToolSectionWithRoutes extends ToolSection {
  routes: ToolRoute[];
}
