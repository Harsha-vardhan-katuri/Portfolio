import { defineTool } from "@lovable.dev/mcp-js";
import { skills } from "../data";

export default defineTool({
  name: "get_skills",
  title: "Get skills",
  description:
    "Get the technical skill set grouped by category: programming languages, embedded firmware, communication protocols, hardware validation, SoCs, and tooling.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(skills, null, 2) }],
    structuredContent: { categories: skills },
  }),
});