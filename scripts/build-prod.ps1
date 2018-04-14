Param([switch]$serve=$false)
npm run-script prebuild
npm run-script build
if ($serve) {
    serve -s build
}
