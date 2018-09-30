#!/usr/bin/env node

const StackUpgrade = require('organic-stack-upgrade')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)

const execute = async function ({destDir = process.cwd(), answers} = {}) {
  let stack = new StackUpgrade({
    destDir: destDir,
    packagejson: path.join(__dirname, 'package.json')
  })
  let resulted_answers = await stack.configure({
    sourceDirs: [path.join(__dirname, 'seed')],
    answers
  })
  await stack.merge({
    sourceDir: path.join(__dirname, 'seed'),
    resulted_answers
  })
  await stack.updateJSON()
  console.info('run npm install...')
  let npmOutput = await exec('npm install', {
    cwd: destDir,
    env: process.env
  })
  console.info(npmOutput.stdout)
  console.error(npmOutput.stderr)
}

if (module.parent) {
  module.exports = execute
} else {
  execute().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
