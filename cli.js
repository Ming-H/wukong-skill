#!/usr/bin/env node
/**
 * wukong-skill CLI
 * Entry point for: npx wukong-skill
 */

const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyDirRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.claude') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function showHelp() {
  log('');
  log('🐒 齐天大圣·七十二变 — wukong-skill CLI', 'cyan');
  log('==============================================', 'cyan');
  log('');
  log('Usage:', 'yellow');
  log('  npx wukong-skill [command]', 'reset');
  log('');
  log('Commands:', 'yellow');
  log('  install    — Install wukong-skill for Claude Code', 'green');
  log('  uninstall  — Remove wukong-skill from Claude Code', 'green');
  log('  update     — Update to the latest version', 'green');
  log('  status     — Check installation status', 'green');
  log('  help       — Show this help message', 'green');
  log('');
  log('Examples:', 'yellow');
  log('  npx wukong-skill install    # Install the skill', 'reset');
  log('  npx wukong-skill status     # Check if installed', 'reset');
  log('');
  log('Quick Start:', 'yellow');
  log('  Just run: npx skills add alchaincyf/wukong-skill', 'green');
  log('');
}

function validateEnvironment() {
  if (!process.env.HOME) {
    log('❌ Unable to determine home directory. Please set $HOME environment variable.', 'red');
    process.exit(1);
  }
}

function installSkill() {
  const SKILL_DIR = path.join(process.env.HOME, '.claude', 'skills', 'wukong');
  const PROJECT_ROOT = __dirname;

  log('🐒 齐天大圣·七十二变', 'blue');
  log('================================', 'blue');
  log('');
  log('📥 Installing wukong-skill for Claude Code...', '');
  log('');

  // Verify source files exist
  const skillSrc = path.join(PROJECT_ROOT, 'SKILL.md');
  if (!fs.existsSync(skillSrc)) {
    log('❌ SKILL.md not found in package. Installation files may be corrupted.', 'red');
    log(`   Expected: ${skillSrc}`, 'yellow');
    process.exit(1);
  }

  // Ensure .claude/skills directory exists
  const skillsBaseDir = path.join(process.env.HOME, '.claude', 'skills');
  try {
    if (!fs.existsSync(skillsBaseDir)) {
      log('📁 Creating Claude Code skills directory...', 'yellow');
      fs.mkdirSync(skillsBaseDir, { recursive: true });
    }
  } catch (err) {
    log(`❌ Failed to create skills directory: ${err.message}`, 'red');
    log(`   Path: ${skillsBaseDir}`, 'yellow');
    log('   Please check directory permissions.', 'yellow');
    process.exit(1);
  }

  // Remove old installation if exists
  if (fs.existsSync(SKILL_DIR)) {
    log('🔄 Removing old installation...', 'yellow');
    try {
      fs.rmSync(SKILL_DIR, { recursive: true, force: true });
    } catch (err) {
      log(`❌ Failed to remove old installation: ${err.message}`, 'red');
      log(`   Path: ${SKILL_DIR}`, 'yellow');
      process.exit(1);
    }
  }

  // Create new installation
  log('📦 Installing skill files...', '');
  try {
    fs.mkdirSync(SKILL_DIR, { recursive: true });
  } catch (err) {
    log(`❌ Failed to create installation directory: ${err.message}`, 'red');
    process.exit(1);
  }

  // Copy essential files
  const filesToCopy = ['SKILL.md', 'README.md', 'install.sh'];
  filesToCopy.forEach(file => {
    const srcPath = path.join(PROJECT_ROOT, file);
    const destPath = path.join(SKILL_DIR, file);
    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (err) {
        log(`⚠️  Failed to copy ${file}: ${err.message}`, 'yellow');
      }
    }
  });

  // Copy references directory recursively
  const referencesSrc = path.join(PROJECT_ROOT, 'references');
  if (fs.existsSync(referencesSrc)) {
    try {
      const referencesDest = path.join(SKILL_DIR, 'references');
      fs.mkdirSync(referencesDest, { recursive: true });
      copyDirRecursive(referencesSrc, referencesDest);
    } catch (err) {
      log(`⚠️  Failed to copy references: ${err.message}`, 'yellow');
    }
  } else {
    log('⚠️  references/ directory not found in package', 'yellow');
  }

  // Copy examples directory recursively (if exists)
  const examplesSrc = path.join(PROJECT_ROOT, 'examples');
  if (fs.existsSync(examplesSrc)) {
    try {
      const examplesDest = path.join(SKILL_DIR, 'examples');
      fs.mkdirSync(examplesDest, { recursive: true });
      copyDirRecursive(examplesSrc, examplesDest);
    } catch (err) {
      log(`⚠️  Failed to copy examples: ${err.message}`, 'yellow');
    }
  }

  // Copy personas directory recursively (if exists)
  const personasSrc = path.join(PROJECT_ROOT, 'personas');
  if (fs.existsSync(personasSrc)) {
    try {
      const personasDest = path.join(SKILL_DIR, 'personas');
      fs.mkdirSync(personasDest, { recursive: true });
      copyDirRecursive(personasSrc, personasDest);
    } catch (err) {
      log(`⚠️  Failed to copy personas: ${err.message}`, 'yellow');
    }
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
    log('   /wukong 教员          — 矛盾论分析', 'green');
    log('   /wukong 树洞          — 情感倾听', 'green');
    log('   /wukong 写诗          — 诗仙李白', 'green');
    log('   /wukong 圆桌          — 多角色辩论', 'green');
    log('   /wukong random        — 随机惊喜变身', 'green');
    log('   /wukong tour          — 新手引导', 'green');
    log('   /wukong list          — 七十二变总览', 'green');
    log('');
    log(` Installed at: ${SKILL_DIR}`, 'yellow');
    log('');
    log(' 俺乃齐天大圣，有事尽管吩咐！', 'blue');
    log('═══════════════════════════════════════', 'blue');
  } else {
    log('❌ Installation failed — SKILL.md not found after install', 'red');
    log('Please check file permissions and try again.', 'red');
    process.exit(1);
  }
}

function uninstallSkill() {
  const SKILL_DIR = path.join(process.env.HOME, '.claude', 'skills', 'wukong');

  log('🗑️  Uninstalling wukong-skill...', 'yellow');
  log('');

  if (fs.existsSync(SKILL_DIR)) {
    try {
      fs.rmSync(SKILL_DIR, { recursive: true, force: true });
      log('✅ Successfully uninstalled wukong-skill', 'green');
      log('');
      log('Thanks for using wukong-skill!', 'blue');
    } catch (err) {
      log(`❌ Failed to uninstall: ${err.message}`, 'red');
      log(`   You may need to manually delete: ${SKILL_DIR}`, 'yellow');
      process.exit(1);
    }
  } else {
    log('⚠️  wukong-skill is not installed', 'yellow');
  }
}

function checkStatus() {
  const SKILL_DIR = path.join(process.env.HOME, '.claude', 'skills', 'wukong');

  log('📊 Checking wukong-skill status...', 'cyan');
  log('');

  if (fs.existsSync(SKILL_DIR)) {
    const skillFile = path.join(SKILL_DIR, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      log('✅ wukong-skill is installed', 'green');
      log(`📁 Location: ${SKILL_DIR}`, 'reset');

      // Try to read version from SKILL.md
      try {
        const content = fs.readFileSync(skillFile, 'utf8');
        const versionMatch = content.match(/version:\s*["']([^"']+)["']/);
        if (versionMatch) {
          log(`🏷️  Version: ${versionMatch[1]}`, 'reset');
        }
      } catch (err) {
        // Ignore errors reading version
      }

      // Check reference files
      const refDir = path.join(SKILL_DIR, 'references');
      if (fs.existsSync(refDir)) {
        const refFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
        log(`📚 Reference files: ${refFiles.length}`, 'reset');
      } else {
        log('⚠️  Reference files missing', 'yellow');
      }
    } else {
      log('⚠️  Installation incomplete - SKILL.md not found', 'yellow');
      log(`   Location: ${SKILL_DIR}`, 'yellow');
    }
  } else {
    log('❌ wukong-skill is not installed', 'red');
    log('');
    log('To install, run: npx wukong-skill install', 'yellow');
    log('Or: npx skills add alchaincyf/wukong-skill', 'yellow');
  }
}

function updateSkill() {
  log('🔄 Updating wukong-skill...', 'yellow');
  log('');

  const SKILL_DIR = path.join(process.env.HOME, '.claude', 'skills', 'wukong');
  if (!fs.existsSync(SKILL_DIR)) {
    log('⚠️  wukong-skill is not installed. Running install instead.', 'yellow');
    log('');
    installSkill();
    return;
  }

  // For now, just reinstall
  uninstallSkill();
  log('');
  installSkill();
}

// Main CLI logic
validateEnvironment();

const command = process.argv[2] || 'help';

switch (command) {
  case 'install':
    installSkill();
    break;
  case 'uninstall':
    uninstallSkill();
    break;
  case 'update':
    updateSkill();
    break;
  case 'status':
    checkStatus();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    log(`Unknown command: ${command}`, 'red');
    log('');
    showHelp();
    process.exit(1);
}
