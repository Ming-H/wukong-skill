#!/usr/bin/env node
/**
 * Validation script for wukong-skill
 * Runs before publishing to ensure package integrity
 */

const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validate() {
  const PROJECT_ROOT = path.join(__dirname, '..');
  const requiredFiles = [
    'SKILL.md',
    'README.md',
    'install.sh',
    'cli.js',
    'package.json'
  ];

  const requiredDirs = [
    'references',
    'references/divination',
    'personas',
    'bin',
    'scripts'
  ];

  const divinationSubfiles = [
    'references/divination/index.md',
    'references/divination/bazi.md',
    'references/divination/yinyuan.md',
    'references/divination/qimen.md',
    'references/divination/ziwei.md',
    'references/divination/tarot.md',
    'references/divination/xingzuo.md',
    'references/divination/yijing.md'
  ];

  // Reference files mentioned in SKILL.md that must exist
  const expectedReferences = [
    'references/routing.md',
    'references/execution.md',
    'references/quality.md',
    'references/seventy-two-transformations.md',
    'references/output-templates.md',
    'references/distillation.md',
    'references/mentors.md',
    'references/companions.md',
    'references/engineering.md',
    'references/transformation-framework.md'
  ];

  let hasErrors = false;

  log('🔍 Validating wukong-skill package...', 'yellow');
  log('');

  // Check required files
  log('📄 Checking required files...', 'reset');
  requiredFiles.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
      log(`  ✓ ${file}`, 'green');
    } else {
      log(`  ✗ ${file} - MISSING`, 'red');
      hasErrors = true;
    }
  });

  // Check required directories
  log('');
  log('📁 Checking required directories...', 'reset');
  requiredDirs.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(dirPath)) {
      log(`  ✓ ${dir}/`, 'green');
    } else {
      log(`  ✗ ${dir}/ - MISSING`, 'red');
      hasErrors = true;
    }
  });

  // Check divination subfiles
  log('');
  log('🔮 Checking divination subfiles...', 'reset');
  divinationSubfiles.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
      log(`  ✓ ${file}`, 'green');
    } else {
      log(`  ✗ ${file} - MISSING`, 'red');
      hasErrors = true;
    }
  });

  // Check reference file integrity
  log('');
  log('📚 Checking reference file integrity...', 'reset');
  expectedReferences.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
      log(`  ✓ ${file}`, 'green');
    } else {
      log(`  ✗ ${file} - MISSING`, 'red');
      hasErrors = true;
    }
  });

  // Check SKILL.md format
  log('');
  log('📋 Checking SKILL.md format...', 'reset');
  const skillPath = path.join(PROJECT_ROOT, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    const content = fs.readFileSync(skillPath, 'utf8');
    const requiredFrontMatter = ['name:', 'description:', 'version:', 'triggers:'];
    let frontMatterValid = true;

    requiredFrontMatter.forEach(field => {
      if (!content.includes(field)) {
        log(`  ✗ Missing front matter: ${field}`, 'red');
        frontMatterValid = false;
        hasErrors = true;
      }
    });

    if (frontMatterValid) {
      log('  ✓ Front matter valid', 'green');
    }
  }

  // Check package.json
  log('');
  log('📦 Checking package.json...', 'reset');
  const pkgPath = path.join(PROJECT_ROOT, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    if (pkg.name && pkg.version && pkg.description) {
      log('  ✓ Basic fields present', 'green');
    } else {
      log('  ✗ Missing required fields in package.json', 'red');
      hasErrors = true;
    }

    if (pkg.bin && (pkg.bin['wukong-skill'] || pkg.bin['skills-add'])) {
      log('  ✓ Bin commands configured', 'green');
    } else {
      log('  ✗ Bin commands not properly configured', 'red');
      hasErrors = true;
    }
  }

  // Version sync check
  log('');
  log('🔄 Checking version sync...', 'reset');
  if (fs.existsSync(skillPath) && fs.existsSync(pkgPath)) {
    const skillContent = fs.readFileSync(skillPath, 'utf8');
    const skillVersionMatch = skillContent.match(/version:\s*["']([^"']+)["']/);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    if (skillVersionMatch && pkg.version) {
      if (skillVersionMatch[1] === pkg.version) {
        log(`  ✓ Version synced: v${pkg.version}`, 'green');
      } else {
        log(`  ✗ Version mismatch: SKILL.md=${skillVersionMatch[1]}, package.json=${pkg.version}`, 'red');
        hasErrors = true;
      }
    } else {
      log('  ⚠ Could not read version from one or both files', 'yellow');
    }
  }

  // Trigger dedup check (only within frontmatter)
  log('');
  log('🔤 Checking trigger uniqueness...', 'reset');
  if (fs.existsSync(skillPath)) {
    const skillContent = fs.readFileSync(skillPath, 'utf8');
    // Extract only the frontmatter section (between first two ---)
    const fmMatch = skillContent.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      const frontmatter = fmMatch[1];
      const triggerMatches = frontmatter.match(/^\s*-\s*"([^"]+)"\s*$/gm);
      if (triggerMatches) {
        const triggers = triggerMatches.map(t => t.replace(/^\s*-\s*"/, '').replace(/"\s*$/, '').trim());
        const seen = new Set();
        const duplicates = [];
        triggers.forEach(t => {
          if (seen.has(t)) duplicates.push(t);
          seen.add(t);
        });
        if (duplicates.length > 0) {
          log(`  ✗ Duplicate triggers: ${duplicates.join(', ')}`, 'red');
          hasErrors = true;
        } else {
          log(`  ✓ All ${triggers.length} triggers are unique`, 'green');
        }
      } else {
        log('  ⚠ No triggers found in frontmatter', 'yellow');
      }
    }
  }

  // Check executable permissions
  log('');
  log('🔐 Checking executable permissions...', 'reset');
  const executables = [
    'cli.js',
    'bin/skills-add.sh',
    'install.sh',
    'scripts/install.js',
    'scripts/postinstall.js'
  ];

  executables.forEach(file => {
    const filePath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.accessSync(filePath, fs.constants.R_OK);
        log(`  ✓ ${file} is readable`, 'green');
      } catch (err) {
        log(`  ✗ ${file} is not readable`, 'red');
        hasErrors = true;
      }
    }
  });

  // Check personas directory has files
  log('');
  log('🎭 Checking personas...', 'reset');
  const personasDir = path.join(PROJECT_ROOT, 'personas');
  if (fs.existsSync(personasDir)) {
    const personaFiles = fs.readdirSync(personasDir).filter(f => f.endsWith('.md'));
    log(`  ✓ ${personaFiles.length} persona files found`, 'green');
  } else {
    log('  ✗ personas/ directory missing', 'red');
    hasErrors = true;
  }

  // Final result
  log('');
  if (hasErrors) {
    log('❌ Validation failed - please fix the errors above', 'red');
    process.exit(1);
  } else {
    log('✅ All validations passed! Package is ready to publish.', 'green');
  }
}

validate();
