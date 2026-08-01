import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List the portfolio's engineering projects with titles, descriptions, technologies, and GitHub/demo links. Optionally filter by a free-text query matched against title, description, and technologies.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive keyword filter, e.g. 'BLE' or 'ESP32'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const results = q
      ? projects.filter((p) =>
          [p.title, p.description, p.tag, ...p.technologies]
            .join(" ")
            .toLowerCase()
            .includes(q),
        )
      : projects;
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, projects: results },
    };
  },
});