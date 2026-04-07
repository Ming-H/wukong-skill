# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wukong-skill is a Claude Code skill package ("Monkey King's 72 Transformations") — a character-switching roleplay skill. It's not a traditional code project; it's primarily **content** (skill definitions + reference documents) with a thin CLI/installer layer. The package installs to `~/.claude/skills/wukong/` where Claude Code picks it up.

## Common Commands

```bash
# Validate package before publishing
node scripts/validate.js

# Install locally for testing
./install.sh

# Or via CLI
node cli.js install    # install
node cli.js status     # check installation
node cli.js uninstall  # remove
node cli.js update     # reinstall

# Publish prep (runs validate.js automatically)
npm publish
```

There are no tests, build steps, or linting.

## Architecture

### Skill Loading Flow

`SKILL.md` → Claude Code reads the frontmatter (`name`, `description`, `triggers`, `allowed-tools`) → registers `/wukong` as a user-invocable skill. When triggered, Claude reads the SKILL.md body which contains the routing logic and execution pipeline.

### SKILL.md Structure (main entry point)

- **Frontmatter**: name, triggers, version, allowed-tools — this is what Claude Code parses to register the skill
- **Phase 0 (Routing)**: Three channels — A: direct transformation, B: diagnostic mode (user unclear), C: update existing result
- **Phase 1 (Execution)**: Transformation declaration → read reference files → collect info → checkpoints → execute interaction → quality self-check
- **Phase 2 (Output)**: Format output, add honesty disclaimers, close

### Key Files

| File | Role |
|------|------|
| `SKILL.md` | Skill definition — routing logic, execution pipeline, quality rules. This IS the product. |
| `references/seventy-two-transformations.md` | Full routing table mapping triggers to transformations |
| `references/transformation-framework.md` | Core methodology: triple-verification, quality self-check, contradiction handling |
| `references/output-templates.md` | Standardized output formats per transformation category |
| `references/divination.md` | Divination category details (transformations 1-7) |
| `references/mentors.md` | Life mentor category details (transformations 8-19) |
| `references/distillation.md` | Person distillation + creator factory (transformations 20-28) |
| `references/companions.md` | Emotional companions + self-exploration + creative play (transformations 29-50) |
| `references/engineering.md` | Engineering reference capabilities (non-transformation) |
| `cli.js` | CLI: install/uninstall/status/update commands |
| `install.sh` | Shell installer (copies project to `~/.claude/skills/wukong/`) |
| `scripts/validate.js` | Pre-publish validation (checks files, frontmatter, permissions) |
| `scripts/install.js` | npm-triggered installer |
| `scripts/postinstall.js` | Post-install message |

### Reference File Reading Strategy

SKILL.md instructs Claude to only read the relevant reference file for the active transformation, not all files at once. The mapping:

- Divination (1-7) → `divination.md`
- Mentors (8-19) → `mentors.md`
- Distillation (20-28) → `distillation.md` + `output-templates.md`
- Companions/Exploration/Creative (29-50) → `companions.md`
- Celebrity perspectives (51-56) → `distillation.md` + `output-templates.md`

## Design Principles

1. **Character-first, not tool-first** — Every transformation is a person with personality, not a utility function
2. **Fun over utility** — Entertainment is the primary goal
3. **Reference files are authoritative** — Core logic lives in `references/`, not improvised
4. **Honesty over perfection** — Mark insufficient info, preserve contradictions as "internal tension", declare limitations
5. **Quality self-check is mandatory** — 6-item checklist before output (character consistency, source sufficiency, logic consistency, honesty bounds, safety bounds, entertainment disclaimer)

## Multi-Agent Pattern

For complex tasks (distillation, creation), SKILL.md specifies a multi-agent architecture:
- Each agent handles an independent dimension
- Results are isolated (no cross-contamination)
- Contradictions between agents are preserved, not resolved
- Source credibility tagged: `[一手]`, `[二手]`, `[推断]`, `[经典]`, `[共识]`
- Source blacklist: 知乎, 微信公众号, 百度百科, unsourced claims

## Conventions

- All user-facing content is in Chinese (with English as secondary)
- Version is in SKILL.md frontmatter (`version: "4.0.0"`) and `package.json`
- The validate.js script checks for `INSTALL.md` as a required file, but this file doesn't currently exist in the repo — this will cause `npm publish` to fail
- `examples/` contains example celebrity perspective skills (Steve Jobs, Taleb) with their own SKILL.md and research references
