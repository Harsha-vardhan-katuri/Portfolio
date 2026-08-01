import { defineTool } from "@lovable.dev/mcp-js";
import { contact, profile } from "../data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Harsha Vardhan Katuri's professional profile summary: name, role, location, headline, about text, and public contact links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = { ...profile, contact };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});