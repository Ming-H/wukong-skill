#!/bin/bash
# npx skills add command wrapper for wukong-skill
# This allows users to run: npx skills add alchaincyf/wukong-skill

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐒 齐天大圣·七十二变${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "📥 Installing wukong-skill for Claude Code..."
echo ""

# Check if Claude Code skills directory exists
SKILL_DIR="$HOME/.claude/skills/wukong"
if [ ! -d "$HOME/.claude/skills" ]; then
    echo -e "📁 Creating Claude Code skills directory..."
    mkdir -p "$HOME/.claude/skills"
fi

# Remove old installation if exists
if [ -d "$SKILL_DIR" ]; then
    echo -e "${YELLOW}🔄 Removing old installation...${NC}"
    rm -rf "$SKILL_DIR"
fi

# Create new installation
echo -e "📦 Installing skill files..."
mkdir -p "$SKILL_DIR"

# Copy essential files
cp "$PROJECT_ROOT/SKILL.md" "$SKILL_DIR/"
cp "$PROJECT_ROOT/README.md" "$SKILL_DIR/"
cp "$PROJECT_ROOT/install.sh" "$SKILL_DIR/"

# Copy references directory
if [ -d "$PROJECT_ROOT/references" ]; then
    cp -r "$PROJECT_ROOT/references" "$SKILL_DIR/"
fi

# Copy personas directory
if [ -d "$PROJECT_ROOT/personas" ]; then
    cp -r "$PROJECT_ROOT/personas" "$SKILL_DIR/"
fi

# Verify installation
if [ -f "$SKILL_DIR/SKILL.md" ]; then
    echo ""
    echo -e "${GREEN}✅ Installation successful!${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo -e " ${GREEN}🐒 齐天大圣·七十二变 已就位！${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo ""
    echo -e " ${YELLOW}Usage:${NC}"
    echo -e "   ${GREEN}/wukong${NC}              — 召唤大圣"
    echo -e "   ${GREEN}/wukong 算命${NC}          — 八字命理"
    echo -e "   ${GREEN}/wukong 姻缘${NC}          — 月老红线"
    echo -e "   ${GREEN}/wukong 蒸馏同事${NC}      — 同事分身"
    echo -e "   ${GREEN}/wukong 开发${NC}          — 金箍棒TDD"
    echo -e "   ${GREEN}/wukong list${NC}          — 七十二变总览"
    echo ""
    echo -e " ${YELLOW}Installed at:${NC} $SKILL_DIR"
    echo ""
    echo -e " ${BLUE}俺乃齐天大圣，有事尽管吩咐！${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
else
    echo -e "${RED}❌ Installation failed${NC}"
    echo "Please check file permissions and try again."
    exit 1
fi
