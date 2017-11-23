# pruner-cli [![Build Status](https://travis-ci.org/xg-wang/pruner-cli.svg?branch=master)](https://travis-ci.org/xg-wang/pruner-cli)

cli utility to prune redundant `node_modules` files.

## usage

```bash
npm i -g pruner-cli
prune
```

Full usage see `prune -h`:

```plain
Usage: node-prune <path>

Options:
  --config, -c   <filename> config file name   [string] [default: ".prune.json"]
  --dryrun, -d   dry run                            [boolean] [default: "false"]
  --verbose      log pruned file info               [boolean] [default: "false"]
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
    ".idea",
    ".vscode",
    "website",
    "images",
    "assets",
    "example",
    "examples",
    "coverage",
    ".nyc_output",
    ".circleci",
    ".github"
  ],
  "files": [
    "Makefile",
    "Gulpfile.js",
    "Gruntfile.js",
    ".DS_Store",
    ".tern-project",
    ".gitattributes",
    ".editorconfig",
    ".eslintrc",
    ".eslintrc.js",
    ".eslintignore",
    ".npmignore",
    ".jshintrc",
    ".flowconfig",
    ".documentup.json",
    ".yarn-metadata.json",
    ".travis.yml",
    "circle.yml",
    ".coveralls.yml",
    "CHANGES",
    "LICENSE.txt",
    "LICENSE",
    "AUTHORS",
    "CONTRIBUTORS",
    ".yarn-integrity",
    ".yarnclean"
  ],
  "exts": [
    ".md",
    ".ts",
    ".jst",
    ".coffee",
    ".tgz",
    ".swp"
  ]
}
```

## screenshot

![prune](https://i.imgur.com/kEmAyY1.png)

## License

MIT