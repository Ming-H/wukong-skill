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
