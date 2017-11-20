# pruner-cli

cli utility to prune redundant `node_modules` files.

## usage

```bash
npm i -g pruner-cli
prune
```

Full usage see `prune -h`:

```plain
Usage: node-prune <path> --config <name> --dryrun false

Options:
  --config, -c   <filename> config file name   [string] [default: ".prune.json"]
  --dryrun, -d   dry run                            [boolean] [default: "false"]
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
```

Create a local `.prune.json` to customize. Defaults are:

```json
{
  "dirs": [
    "__tests__",
    "test",
    "tests",
    "powered-test",
    "docs",
    "doc",
    "website",
    "images",
    "assets",
    "example",
    "examples",
    "coverage",
    ".nyc_output"
  ],
  "files": [
    "Makefile",
    "Gulpfile.js",
    "Gruntfile.js",
    ".tern-project",
    ".gitattributes",
    ".editorconfig",
    ".eslintrc",
    ".jshintrc",
    ".flowconfig",
    ".documentup.json",
    ".yarn-metadata.json",
    ".travis.yml",
    "LICENSE.txt",
    "LICENSE",
    "AUTHORS",
    "CONTRIBUTORS",
    ".yarn-integrity"
  ],
  "exts": [
    ".md",
    ".ts",
    ".jst",
    ".coffee",
    ".tgz"
  ]
}
```

## screenshot

![prune](https://i.imgur.com/kEmAyY1.png)

## License

MIT