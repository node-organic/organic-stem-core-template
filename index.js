#!/usr/bin/env node

const path = require('path')
require('organic-stem-stack-upgrade').applyStackUpgrade({
  sourceDir: path.join(__dirname, 'core'),
  destDir: process.cwd()
}).catch(err => {
  console.error(err)
  process.exit(1)
})
