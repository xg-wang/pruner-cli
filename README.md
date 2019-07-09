# pruner-cli

[![Build Status](https://dev.azure.com/xg-wang/pruner-cli/_apis/build/status/xg-wang.pruner-cli?branchName=master)](https://dev.azure.com/xg-wang/pruner-cli/_build/latest?definitionId=1&branchName=master)

Prune `node_modules` files and save disk space.

## usage

```bash
npm i -g pruner-cli
prune
# or use npx
npx pruner-cli
```

Full usage see `prune -h`:

```plain
Prune node_modules files and save disk space

Usage: prune <path>

Options:
  --version, -v  Show version number                                   [boolean]
  --config, -c   <filename> config file name   [string] [default: ".prune.json"]
  --dryrun, -d   dry run                            [boolean] [default: "false"]
  --verbose      log pruned file info               [boolean] [default: "false"]
  --help, -h     Show help                                             [boolean]
```

Create a local `.prune.json` to customize, character case doesn't matter. Defaults are:

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
    ".eslintrc.json",
    ".eslintignore",
    ".stylelintrc",
    "stylelint.config.js",
    ".stylelintrc.json",
    ".stylelintrc.yaml",
    ".stylelintrc.yml",
    ".stylelintrc.js",
    ".htmllintrc",
    "htmllint.js",
    ".lint",
    ".npmignore",
    ".jshintrc",
    ".flowconfig",
    ".documentup.json",
    ".yarn-metadata.json",
    ".travis.yml",
    "appveyor.yml",
    ".gitlab-ci.yml",
    "circle.yml",
    ".coveralls.yml",
    "CHANGES",
    "LICENSE.txt",
    "LICENSE",
    "AUTHORS",
    "CONTRIBUTORS",
    ".yarn-integrity",
    ".yarnclean",
    "_config.yml",
    ".babelrc",
    ".yo-rc.json",
    "jest.config.js",
    "karma.conf.js",
    ".appveyor.yml",
    "tsconfig.json"
  ],
  "exts": [".md", ".markdown", ".ts", ".jst", ".coffee", ".tgz", ".swp"]
}
```

## License

MIT
