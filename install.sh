#!/bin/bash
# 齐天大圣·七十二变 安装脚本
# 孙悟空 Skill — One skill to transform them all
# Compatible with skills.sh (npx skills add) mechanism

set -e

SKILL_NAME="wukong"
SKILL_DIR="$HOME/.claude/skills/$SKILL_NAME"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🐒 齐天大圣·七十二变 — 安装中..."
echo ""

# Check if .claude/skills directory exists
if [ ! -d "$HOME/.claude/skills" ]; then
    echo "📁 创建 ~/.claude/skills/ 目录..."
    mkdir -p "$HOME/.claude/skills"
fi

# Remove old installation if exists
if [ -d "$SKILL_DIR" ]; then
    echo "🔄 检测到旧版本，更新中..."
    rm -rf "$SKILL_DIR"
fi

# Create target directory
mkdir -p "$SKILL_DIR"

# Copy skill files (excluding .git, .DS_Store, node_modules, docs)
echo "📦 复制 Skill 文件..."
rsync -a --exclude='.git' --exclude='.DS_Store' --exclude='node_modules' --exclude='docs' "$SCRIPT_DIR/" "$SKILL_DIR/" 2>/dev/null || {
    # Fallback if rsync not available
    cp "$SCRIPT_DIR/SKILL.md" "$SKILL_DIR/" 2>/dev/null
    cp "$SCRIPT_DIR/README.md" "$SKILL_DIR/" 2>/dev/null
    cp "$SCRIPT_DIR/install.sh" "$SKILL_DIR/" 2>/dev/null
    cp "$SCRIPT_DIR/cli.js" "$SKILL_DIR/" 2>/dev/null
    cp "$SCRIPT_DIR/package.json" "$SKILL_DIR/" 2>/dev/null
    cp "$SCRIPT_DIR/.npmignore" "$SKILL_DIR/" 2>/dev/null
    [ -d "$SCRIPT_DIR/references" ] && cp -r "$SCRIPT_DIR/references" "$SKILL_DIR/"
    [ -d "$SCRIPT_DIR/personas" ] && cp -r "$SCRIPT_DIR/personas" "$SKILL_DIR/"
    [ -d "$SCRIPT_DIR/bin" ] && cp -r "$SCRIPT_DIR/bin" "$SKILL_DIR/"
    [ -d "$SCRIPT_DIR/scripts" ] && cp -r "$SCRIPT_DIR/scripts" "$SKILL_DIR/"
    [ -d "$SCRIPT_DIR/examples" ] && cp -r "$SCRIPT_DIR/examples" "$SKILL_DIR/"
}

# Verify installation
if [ -f "$SKILL_DIR/SKILL.md" ]; then
    echo ""
    echo "✅ 安装成功！"
    echo ""
    echo "═══════════════════════════════════════"
    echo "  🐒 齐天大圣·七十二变 已就位！"
    echo "═══════════════════════════════════════"
    echo ""
    echo "  使用方式："
    echo "    /wukong              — 召唤大圣"
    echo "    /wukong 算命          — 八字命理"
    echo "    /wukong 教员          — 矛盾论分析"
    echo "    /wukong 树洞          — 情感倾听"
    echo "    /wukong 写诗          — 诗仙李白"
    echo "    /wukong 圆桌          — 多角色辩论"
    echo "    /wukong random        — 随机惊喜变身"
    echo "    /wukong tour          — 新手引导"
    echo "    /wukong list          — 七十二变总览"
    echo ""
    echo "  安装位置：$SKILL_DIR"
    echo ""
    echo "  💡 推荐使用 skills.sh 一键安装："
    echo "    npx skills add Ming-H/wukong-skill"
    echo ""
    echo "  俺乃齐天大圣，有事尽管吩咐！"
    echo "═══════════════════════════════════════"
else
    echo "❌ 安装失败，请检查文件是否完整"
    exit 1
fi
