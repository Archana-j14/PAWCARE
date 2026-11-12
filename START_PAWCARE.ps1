$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Test-Path '.env')) {
  Copy-Item '.env.example' '.env'
}
if (-not (Test-Path 'node_modules')) {
  npm install
  if ($LASTEXITCODE -ne 0) { throw 'npm install failed. Check the error above.' }
}
npm run dev
