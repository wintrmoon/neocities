$files = Get-ChildItem ./public -Recurse -File -Filter *.html
$total = 0

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $clean = $content `
    -replace '<script[\s\S]*?</script>', '' `
    -replace '<style[\s\S]*?</style>', '' `
    -replace '<[^>]+>', ' '
  $total += ($clean -split '\s+').Count
}

@"
{ "totalWords": $total }
"@ | Set-Content ./public/wordcount.json
