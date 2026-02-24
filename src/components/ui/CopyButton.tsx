import { useState } from "react";
import type { ReactNode } from "react";
import { copyTextToClipboard } from "../../lib/clipboard";
import { ActionButton } from "./ActionButton";

interface CopyButtonProps {
  value: string;
  tone?: "primary" | "neutral";
}

function CopyIcon(): ReactNode {
  return (
    <svg
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
      />
    </svg>
  );
}

function CheckIcon(): ReactNode {
  return (
    <svg
      className="size-4 text-emerald-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ErrorIcon(): ReactNode {
  return (
    <svg
      className="size-4 text-rose-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CopyButton({
  value,
  tone = "neutral",
}: CopyButtonProps): ReactNode {
  const [state, setState] = useState<"idle" | "checked" | "failed">("idle");

  const currentIcon =
    state === "idle" ? (
      <CopyIcon />
    ) : state === "checked" ? (
      <CheckIcon />
    ) : (
      <ErrorIcon />
    );

  return (
    <ActionButton
      label={
        <span className="flex items-center justify-center">{currentIcon}</span>
      }
      tone={state === "failed" ? "danger" : tone}
      onClick={() => {
        void (async () => {
          const ok = await copyTextToClipboard(value);
          setState(ok ? "checked" : "failed");
          window.setTimeout(() => {
            setState("idle");
          }, 1200);
        })();
      }}
    />
  );
}
