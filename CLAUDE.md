# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wukong-skill is a Claude Code skill package ("Monkey King's 72 Transformations") — a character-switching roleplay skill. It's primarily **content** (skill definitions + reference documents + persona files) with a thin CLI/installer layer. The package installs to `~/.claude/skills/wukong/` where Claude Code picks it up.

## Common Commands

```bash
node scripts/validate.js   # validate package before publishing
./install.sh               # install locally for testing
node cli.js install        # install via CLI
node cli.js status         # check installation status
node cli.js uninstall      # remove installation
node cli.js update         # reinstall
npm publish                # publish (runs validate.js via prepublishOnly)
```

No tests, build steps, or linting.

## Architecture

### Skill Loading Flow

`SKILL.md` frontmatter (`name`, `description`, `triggers`, `allowed-tools`) → Claude Code registers `/wukong` as a user-invocable skill. When triggered, Claude reads the SKILL.md body which contains the execution pipeline and delegates to reference files.

### Execution Pipeline (SKILL.md)

1. **Route** (`references/routing.md`) — three channels: A: direct transformation, B: diagnostic mode (user unclear), C: update existing result. Special routes: roundtable / random / tour / domain distillation
2. **Execute** (`references/execution.md`) — declare transformation → load reference files → collect info (≤3 questions/round) → checkpoints → roleplay → quality self-check
3. **Quality gate** (`references/quality.md`) — mandatory 6-item checklist before output

### Reference File Index

Reference files are read on-demand, not all at once:

| File | When read |
|------|-----------|
| `references/routing.md` | Phase 1 routing |
| `references/execution.md` | Phase 2 execution |
| `references/quality.md` | Quality self-check |
| `references/seventy-two-transformations.md` | Routing table lookup |
| `references/output-templates.md` | Formatting output |
| `references/distillation.md` | Distillation transformations (20-28) |
| `references/divination/index.md` | Divination entry point → then reads sub-files (`bazi.md`, `tarot.md`, etc.) |
| `references/mentors.md` | Mentor transformations (8-19) → then reads `personas/{name}.md` |
| `references/companions.md` | Companion/exploration/creative transformations (29-50) |
| `references/engineering.md` | Underlying agent capabilities (non-transformation) |
| `personas/*.md` | Deep persona definitions for specific characters |

### Key Files

| File | Role |
|------|------|
| `SKILL.md` | Skill definition — this IS the product |
| `references/transformation-framework.md` | Core methodology: triple-verification, quality self-check, contradiction handling |
| `cli.js` | CLI: install/uninstall/status/update |
| `install.sh` | Shell installer |
| `scripts/validate.js` | Pre-publish validation (files, frontmatter, permissions) |
| `bin/skills-add.sh` | External install helper for `npx skills add` |

## Design Principles

1. **Character-first, not tool-first** — every transformation is a person with personality
2. **Fun over utility** — entertainment is the primary goal
3. **Reference files are authoritative** — core logic lives in `references/`, not improvised
4. **Honesty over perfection** — mark insufficient info, preserve contradictions as "internal tension"
5. **Quality self-check is mandatory** — 6-item checklist before every output

## Multi-Agent Pattern

For complex tasks (distillation, creation), SKILL.md specifies a multi-agent architecture:
- Each agent handles an independent dimension
- Results are isolated (no cross-contamination)
- Contradictions between agents are preserved, not resolved
- Source credibility tagged: `[一手]`, `[二手]`, `[推断]`, `[经典]`, `[共识]`
- Source blacklist: 知乎, 微信公众号, 百度百科, unsourced claims

## Conventions

- All user-facing content is in Chinese (English as secondary)
- Version lives in both `SKILL.md` frontmatter and `package.json` — keep in sync
- `examples/` contains standalone celebrity perspective skills (Steve Jobs, Taleb) with their own SKILL.md
