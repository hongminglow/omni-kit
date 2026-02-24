import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ToolIconName, ToolSectionWithRoutes } from "../../app/types";
import { PlatformLogo } from "../ui/PlatformLogo";

interface SidebarProps {
  sections: ToolSectionWithRoutes[];
  activePath: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

function Chevron({
  direction,
}: {
  direction: "up" | "down" | "left" | "right";
}): ReactNode {
  const rotation =
    direction === "up"
      ? "-rotate-180"
      : direction === "left"
        ? "rotate-90"
        : direction === "right"
          ? "-rotate-90"
          : "rotate-0";

  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`size-4 transition-transform ${rotation}`}
    >
      <path
        d="M5.5 7.5L10 12l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBase({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`size-6 shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

function ToolIcon({ name }: { name: ToolIconName }): ReactNode {
  switch (name) {
    case "qr_scanner":
      return (
        <IconBase>
          <rect
            x="3"
            y="3"
            width="14"
            height="14"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="6.5"
            y="6.5"
            width="3.5"
            height="3.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 12h2.5M12 14.5h2.5M14.5 12v2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "qr_generator":
      return (
        <IconBase>
          <rect
            x="3"
            y="3"
            width="14"
            height="14"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 6h2M6 8h2M8 6v2M12 6h2M12 8h2M14 6v2M6 12h2M6 14h2M8 12v2M12 12h3M12 14h1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "file_upload":
      return (
        <IconBase>
          <path
            d="M4 14.5h12M10 5v8M7.5 7.5L10 5l2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="3.5"
            width="14"
            height="13"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </IconBase>
      );
    case "json_formatter":
      return (
        <IconBase>
          <path
            d="M7.5 4.5c-1 0-1.5.5-1.5 1.5v2.3c0 1-.4 1.7-1.5 2 1.1.3 1.5 1 1.5 2V14c0 1 .5 1.5 1.5 1.5M12.5 4.5c1 0 1.5.5 1.5 1.5v2.3c0 1 .4 1.7 1.5 2-1.1.3-1.5 1-1.5 2V14c0 1-.5 1.5-1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "csv_viewer":
      return (
        <IconBase>
          <rect
            x="3"
            y="4"
            width="14"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M3 8h14M8 8v8M13 8v8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </IconBase>
      );
    case "base64":
      return (
        <IconBase>
          <path
            d="M4 6.5h5M4 10h5M4 13.5h5M11.5 6.5h4.5M11.5 10h4.5M11.5 13.5h4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <rect
            x="3"
            y="4"
            width="14"
            height="12"
            rx="2.2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </IconBase>
      );
    case "url_codec":
      return (
        <IconBase>
          <path
            d="M7.2 12.8L5.3 14.7a2.5 2.5 0 003.6 3.6l1.9-1.9M12.8 7.2l1.9-1.9a2.5 2.5 0 10-3.6-3.6L9.2 3.6M6.8 10.2h6.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconBase>
      );
    case "text_diff":
      return (
        <IconBase>
          <path
            d="M4 6.5h12M4 10h5M4 13.5h8M13 9l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconBase>
      );
    case "jwt_decoder":
      return (
        <IconBase>
          <rect
            x="3"
            y="5"
            width="14"
            height="10"
            rx="2.3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.4" />
        </IconBase>
      );
    case "hash":
      return (
        <IconBase>
          <path
            d="M6.5 4L5 16M11.5 4L10 16M3.5 8h13M3 12h13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "uuid":
      return (
        <IconBase>
          <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle
            cx="15"
            cy="5"
            r="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="5"
            cy="15"
            r="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="15"
            cy="15"
            r="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M7 5h6M5 7v6M15 7v6M7 15h6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </IconBase>
      );
    case "password":
      return (
        <IconBase>
          <rect
            x="4"
            y="9"
            width="12"
            height="8"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 9V7a3 3 0 116 0v2M10 13.2h0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "url_builder":
      return (
        <IconBase>
          <path
            d="M4 5.5h8M4 9h12M4 12.5h10M4 16h7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M15 4v5M12.5 6.5H17.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </IconBase>
      );
    case "timestamp":
      return (
        <IconBase>
          <circle
            cx="10"
            cy="10"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 6.5v4.3l2.7 1.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconBase>
      );
    case "cron":
      return (
        <IconBase>
          <circle
            cx="10"
            cy="10"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 6v4M12 10H8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </IconBase>
      );
    default:
      return (
        <IconBase>
          <circle
            cx="10"
            cy="10"
            r="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </IconBase>
      );
  }
}

function SectionIcon({ sectionId }: { sectionId: string }): ReactNode {
  if (sectionId === "capture") {
    return (
      <IconBase className="text-stone-400">
        <rect
          x="3"
          y="5"
          width="14"
          height="10"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M8 5l1-1h2l1 1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle
          cx="10"
          cy="10"
          r="2.4"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </IconBase>
    );
  }

  if (sectionId === "data") {
    return (
      <IconBase className="text-stone-400">
        <ellipse
          cx="10"
          cy="5"
          rx="5.5"
          ry="2.2"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M4.5 5v6c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2V5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </IconBase>
    );
  }

  if (sectionId === "security") {
    return (
      <IconBase className="text-stone-400">
        <path
          d="M10 3.8l5 2v4.6c0 3.2-2.1 5.2-5 6.8-2.9-1.6-5-3.6-5-6.8V5.8l5-2z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </IconBase>
    );
  }

  return (
    <IconBase className="text-stone-400">
      <path
        d="M10 4l1.5 2.2 2.6.6-1.7 2.1.2 2.7L10 10.5 7.4 11.6l.2-2.7-1.7-2.1 2.6-.6L10 4z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function Sidebar({
  sections,
  activePath,
  isSidebarOpen,
  onToggleSidebar,
}: SidebarProps): ReactNode {
  const initialState = useMemo(() => {
    const state: Record<string, boolean> = {};
    sections.forEach((section) => {
      state[section.id] = false;
    });
    return state;
  }, [sections]);

  const [collapsedSections, setCollapsedSections] =
    useState<Record<string, boolean>>(initialState);

  const flatRoutes = sections.flatMap((section) => section.routes);

  return (
    <aside
      className={`relative z-20 flex h-full shrink-0 flex-col border-r border-stone-800/80 bg-stone-950/90 transition-all duration-300 ${
        isSidebarOpen ? "w-[268px]" : "w-[72px]"
      }`}
    >
      <button
        type="button"
        onClick={onToggleSidebar}
        className="absolute -right-3 top-1/2 z-20 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-200 shadow-lg shadow-black/30 transition hover:border-brandCta/60"
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <Chevron direction={isSidebarOpen ? "left" : "right"} />
      </button>

      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-stone-800 px-3 py-4">
          <div className="flex items-center gap-2">
            <a
              href="#/"
              className={`inline-flex items-center overflow-hidden text-brandText transition ${
                isSidebarOpen ? "w-auto" : "w-full justify-center"
              }`}
            >
              <PlatformLogo showLabel={isSidebarOpen} />
            </a>
            {isSidebarOpen && (
              <span className="flex h-5 items-center justify-center rounded-full bg-brandCta/20 px-2 text-[10px] font-bold text-brandCta ring-1 ring-inset ring-brandCta/30">
                {flatRoutes.length}
              </span>
            )}
          </div>
        </div>

        {isSidebarOpen ? (
          <div className="flex-1 space-y-4 overflow-y-auto px-2 py-4">
            {sections.map((section) => {
              const isCollapsed = collapsedSections[section.id];

              return (
                <section key={section.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCollapsedSections((previous) => ({
                        ...previous,
                        [section.id]: !previous[section.id],
                      }));
                    }}
                    className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-left transition hover:bg-stone-900/70"
                  >
                    <span className="inline-flex items-center gap-2">
                      <SectionIcon sectionId={section.id} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-300">
                        {section.label}
                      </span>
                    </span>
                    <span className="text-stone-500">
                      <Chevron direction={isCollapsed ? "down" : "up"} />
                    </span>
                  </button>

                  {!isCollapsed ? (
                    <nav className="mt-1 space-y-0.5 pl-2">
                      {section.routes.map((tool) => {
                        const isActive = activePath === tool.path;

                        return (
                          <a
                            key={tool.path}
                            href={`#${tool.path}`}
                            className={`group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                              isActive
                                ? "bg-stone-800/80 text-brandText"
                                : "text-stone-300 hover:bg-stone-900/70 hover:text-stone-100"
                            }`}
                          >
                            <ToolIcon name={tool.icon} />
                            <span className="truncate text-[12px] font-medium">
                              {tool.name}
                            </span>
                          </a>
                        );
                      })}
                    </nav>
                  ) : null}
                </section>
              );
            })}
          </div>
        ) : (
          <nav className="flex-1 space-y-1 overflow-y-auto px-1.5 py-4">
            {flatRoutes.map((tool) => {
              const isActive = activePath === tool.path;

              return (
                <a
                  key={tool.path}
                  href={`#${tool.path}`}
                  title={tool.name}
                  className={`flex items-center justify-center rounded-md p-2 transition ${
                    isActive
                      ? "bg-stone-800/80 text-brandText"
                      : "text-stone-300 hover:bg-stone-900/80 hover:text-stone-100"
                  }`}
                >
                  <ToolIcon name={tool.icon} />
                </a>
              );
            })}
          </nav>
        )}
      </div>
    </aside>
  );
}
