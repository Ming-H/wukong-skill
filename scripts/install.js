#!/usr/bin/env node
/**
 * Installation script for wukong-skill
 * Runs automatically when: npx skills add Ming-H/wukong-skill
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SKILL_NAME = 'wukong';
const SKILL_DIR = path.join(process.env.HOME, '.claude', 'skills', SKILL_NAME);
const PROJECT_ROOT = path.join(__dirname, '..');

// ANSI color codes
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    const items = fs.readdirSync(src);
    items.forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function installSkill() {
  log('🐒 齐天大圣·七十二变', 'blue');
  log('================================', 'blue');
  log('');
  log('📥 Installing wukong-skill for Claude Code...', '');
  log('');

  // Ensure .claude/skills directory exists
  const skillsBaseDir = path.join(process.env.HOME, '.claude', 'skills');
  ensureDirectoryExists(skillsBaseDir);

  // Remove old installation if exists
  if (fs.existsSync(SKILL_DIR)) {
    log('🔄 Removing old installation...', 'yellow');
    fs.rmSync(SKILL_DIR, { recursive: true, force: true });
  }

  // Create new installation
  log('📦 Installing skill files...', '');
  ensureDirectoryExists(SKILL_DIR);

  // Copy essential files
  const filesToCopy = ['SKILL.md', 'README.md', 'install.sh'];
  filesToCopy.forEach(file => {
    const srcPath = path.join(PROJECT_ROOT, file);
    const destPath = path.join(SKILL_DIR, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Copy references directory
  const referencesSrc = path.join(PROJECT_ROOT, 'references');
  if (fs.existsSync(referencesSrc)) {
    copyRecursive(referencesSrc, path.join(SKILL_DIR, 'references'));
  }

  // Copy personas directory
  const personasSrc = path.join(PROJECT_ROOT, 'personas');
  if (fs.existsSync(personasSrc)) {
    copyRecursive(personasSrc, path.join(SKILL_DIR, 'personas'));
  }

  // Verify installation
  const skillFilePath = path.join(SKILL_DIR, 'SKILL.md');
  if (fs.existsSync(skillFilePath)) {
    log('');
    log('✅ Installation successful!', 'green');
    log('');
    log('═══════════════════════════════════════', 'blue');
    log(' 🐒 齐天大圣·七十二变 已就位！', 'green');
    log('═══════════════════════════════════════', 'blue');
    log('');
    log(' Usage:', 'yellow');
    log('   /wukong              — 召唤大圣', 'green');
    log('   /wukong 算命          — 八字命理', 'green');
    log('   /wukong 姻缘          — 月老红线', 'green');
    log('   /wukong 蒸馏同事      — 同事分身', 'green');
    log('   /wukong 开发          — 金箍棒TDD', 'green');
    log('   /wukong list          — 七十二变总览', 'green');
    log('');
    log(` Installed at: ${SKILL_DIR}`, 'yellow');
    log('');
    log(' 俺乃齐天大圣，有事尽管吩咐！', 'blue');
    log('═══════════════════════════════════════', 'blue');
  } else {
    log('❌ Installation failed', 'red');
    log('Please check file permissions and try again.', 'red');
    process.exit(1);
  }
}

// Run installation
installSkill();
