import { defineTool } from "@lovable.dev/mcp-js";
import { certifications, education } from "../data";

export default defineTool({
  name: "get_education",
  title: "Get education and certifications",
  description:
    "Get academic history (degree, institution, period, scores) together with professional certifications and their issuers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const payload = { education, certifications };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});