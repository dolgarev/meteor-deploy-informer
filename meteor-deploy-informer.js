/* global __meteor_runtime_config__ */

import fs from 'fs'
import path from 'path'

const REPORT_FILE = 'deploy_informer_report.json'
const TRANSFER_PROP = '__deploy_informer_report'

function parseJsonStringOrNull (str) {
  try {
    return JSON.parse(str)
  } catch (err) {
    return null
  }
}

function loadAssetOrNull (assetPath) {
  try {
    const filePath = path.resolve('assets', 'app', assetPath)
    return fs.readFileSync(filePath, { encoding: 'utf8' })
  } catch (err) {
    return null
  }
}

const deployInfo = loadAssetOrNull(REPORT_FILE) || ''
if (deployInfo.length > 0) {
  const {
    short,
    long,
    branch,
    tag
  } = parseJsonStringOrNull(deployInfo) || {}

  __meteor_runtime_config__[TRANSFER_PROP] = {
    short,
    long,
    branch,
    tag
  }
}
