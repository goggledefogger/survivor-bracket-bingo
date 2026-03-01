---
description: How to use Google Stitch MCP to generate and edit UI designs
---

# Using Google Stitch MCP

Stitch MCP is a Model Context Protocol server that connects to Google Stitch, an AI-powered UI design tool. It lets you generate UI screens from text prompts, edit existing screens, and fetch HTML/CSS code from designs.

## Setup

The MCP server is configured in `~/.gemini/antigravity/mcp_config.json` (for Antigravity) or `~/.claude/settings.json` (for Claude Code):

```json
{
  "mcpServers": {
    "stitch-mcp": {
      "command": "npx",
      "args": ["-y", "stitch-mcp@latest"],
      "env": {
        "STITCH_API_KEY": "<your-api-key>"
      }
    }
  }
}
```

### Getting an API Key
1. Go to https://stitch.withgoogle.com
2. Click your profile → Settings
3. Generate an API key

## Available MCP Tools

### Project Management
- **`create_project`** — Create a new Stitch project (container for screens)
  - `title` (optional): project title
- **`get_project`** — Get details of a project
  - `name` (required): `projects/{projectId}`
- **`list_projects`** — List all projects. Use `filter: "view=owned"` for your projects.
- **`list_screens`** — List all screens in a project
  - `projectId` (required): the project ID (without `projects/` prefix)

### Screen Generation
- **`generate_screen_from_text`** — Generate a new screen from a text prompt
  - `projectId` (required): project ID
  - `prompt` (required): detailed description of the screen to generate
  - `deviceType` (optional): `MOBILE`, `DESKTOP`, `TABLET`, `AGNOSTIC`
  - `modelId` (optional): `GEMINI_3_PRO` or `GEMINI_3_FLASH`
  - **Tips**: Be VERY detailed in prompts. Specify exact colors (#hex), layout structure, content, typography, and design style. The more specific, the better the result.

### Screen Editing
- **`edit_screens`** — Edit existing screens with a text prompt
  - `projectId` (required): project ID
  - `selectedScreenIds` (required): array of screen IDs to edit
  - `prompt` (required): what to change
  - `deviceType` (optional)
  - **Note**: This can take a few minutes. Do NOT retry if it seems slow.

### Screen Retrieval
- **`get_screen`** — Get screen details
  - `name`: `projects/{projectId}/screens/{screenId}`
  - `projectId`: project ID
  - `screenId`: screen ID
- **`fetch_screen_code`** — Get the HTML/CSS code of a screen
  - `projectId`, `screenId`
- **`fetch_screen_image`** — Get the screenshot/preview image
  - `projectId`, `screenId`

### Variants
- **`generate_variants`** — Generate alternative versions of existing screens
  - `projectId`, `selectedScreenIds`, `prompt`, `variantOptions`

## Workflow: Design-to-Code

1. **Create a project**: `create_project` with a descriptive title
2. **Generate screens**: Use `generate_screen_from_text` for each screen. Write detailed prompts covering:
   - Color palette (exact hex values)
   - Typography (font choices, sizes, weights)
   - Layout structure (what goes where)
   - Content (actual text, labels, data)
   - Design style (dark mode, glassmorphism, minimal, etc.)
3. **Iterate**: Use `edit_screens` to refine. One edit at a time, not parallel.
4. **Extract code**: Use `fetch_screen_code` to get the HTML/CSS
5. **Apply to app**: Adapt the Stitch HTML/CSS into your React/Vue/etc components

## Troubleshooting

- **Connection errors**: The MCP server may lose connection if requests are canceled mid-flight. Restart your IDE to reconnect.
- **Tool not found**: Make sure only ONE stitch-mcp entry exists in your MCP config. Kill stale `stitch-mcp` processes: `ps aux | grep stitch | grep -v grep` then `kill <pid>`.
- **Slow generation**: Screen generation takes 30-90 seconds. Don't retry — it will create duplicates.

## Current Project

- **Project ID**: `17298965758760609228`
- **Title**: "Survivor 50 Watch Party — All Screens"
- **Screens**: Sign In, Bracket Draft, Bingo, Scoreboard, Rules & Scoring
- **Theme**: Dark mode, fire-orange (#e8722a), torch-yellow (#f5b731), authentic Fijian-inspired design
