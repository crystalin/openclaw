import { vi } from "vitest";
import { stubTool } from "./fast-tool-stubs.js";

function stubActionTool(name: string, actions: string[]) {
  return {
    ...stubTool(name),
    parameters: {
      type: "object" as const,
      properties: {
        action: {
          type: "string" as const,
          enum: actions,
        },
      },
      required: ["action"],
    },
  };
}

const coreTools = [
  stubActionTool("canvas", ["create", "read"]),
  stubActionTool("nodes", ["list", "invoke"]),
  stubActionTool("cron", ["schedule", "cancel"]),
  stubActionTool("message", ["send", "reply"]),
  stubActionTool("gateway", ["status"]),
  stubActionTool("agents_list", ["list", "show"]),
  stubActionTool("sessions__list", ["list", "show"]),
  stubActionTool("sessions__history", ["read", "tail"]),
  stubActionTool("sessions__send", ["send", "reply"]),
  stubActionTool("sessions__spawn", ["spawn", "handoff"]),
  stubActionTool("subagents", ["list", "show"]),
  stubActionTool("session_status", ["get", "show"]),
  stubTool("tts"),
  stubTool("image_generate"),
  stubTool("video_generate"),
  stubTool("web_fetch"),
  stubTool("image"),
  stubTool("pdf"),
];

vi.mock("../openclaw-tools.js", () => ({
  createOpenClawTools: () => coreTools.map((tool) => ({ ...tool })),
  __testing: {
    setDepsForTest: () => {},
  },
}));
