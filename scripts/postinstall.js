#!/usr/bin/env node
/**
 * Post-installation script for wukong-skill
 * Displays helpful information after installation
 */

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

log('');
log('🎉 Installation Complete!', 'green');
log('');
log('Next steps:', 'yellow');
log('1. Restart Claude Code if it\'s currently running', 'reset');
log('2. Type /wukong to summon the Monkey King', 'reset');
log('3. Type /wukong list to see all 72 transformations', 'reset');
log('');
log('Need help? Visit: https://github.com/alchaincyf/wukong-skill', 'blue');
log('');
