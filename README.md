# peachleaf neocities page
Full source code for [peachleaf.neocities.org](https://peachleaf.neocities.org) 

See the neocities page [here](https://neocities.org/site/peachleaf)

## word count generation
I use a git hook to update the word count when commiting and pushing. this is here for future reference!
**make sure** to have powershell installed, if you are on windows you can skip this but on linux run `pwsh --version` and install it if needed

make this file (via terminal or manually) `.git/hooks/pre-commit` and add the following code to it:
<details>

<summary>code</summary>

```sh
#!/bin/sh

echo "→ Generating site word count…"

powershell -NoProfile -ExecutionPolicy Bypass -Command "
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
\"{ \\\"totalWords\\\": $total }\" | Set-Content ./public/wordcount.json
"

git add public/wordcount.json

echo "✓ Word count updated and staged"
```

</details>

after that is done you may have to run this command `git config core.hooksPath .git/hooks`
and tada! when commiting it should stage a word count update in your commit

## License: MIT
You are free to use, modify, and redistribute anything on this site.

Attribution is appreciated but not required.
Feel free to let me know if you use parts of my site, it's always fun to see what people do with code!
