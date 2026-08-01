import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import getSkillsTool from "./tools/get-skills";
import getExperienceTool from "./tools/get-experience";
import getEducationTool from "./tools/get-education";

export default defineMcp({
  name: "portfolio",
  title: "Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for Harsha Vardhan Katuri's firmware engineering portfolio. Use `get_profile` for a summary and contact links, `list_projects` to browse or search projects, `get_skills` for the technical skill set, `get_experience` for work history, and `get_education` for academics and certifications. All data is public portfolio content.",
  tools: [
    getProfileTool,
    listProjectsTool,
    getSkillsTool,
    getExperienceTool,
    getEducationTool,
  ],
});