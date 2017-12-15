import { IConfig } from './Defaults';
// DefaultFiles pruned.
//
// Copied from yarn (mostly).
export const DefaultFiles = new Set([
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
	".appveyor.yml",
	"circle.yml",
	".coveralls.yml",
	"CHANGES",
	"LICENSE.txt",
	"LICENSE",
	"AUTHORS",
	"CONTRIBUTORS",
	".yarn-integrity",
	".yarnclean"
])

// DefaultDirectories pruned.
//
// Copied from yarn (mostly).
export const DefaultDirectories = new Set([
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
])

// DefaultExtensions pruned.
export const DefaultExtensions = new Set([
	".md",
	".ts",
	".jst",
	".coffee",
	".tgz",
	".swp"
])

export interface IConfig {
	dirs: Set<string>;
	files: Set<string>;
	exts: Set<string>;
	[index: number]: Set<string>;
}

export const Defaults: IConfig = {
	dirs: DefaultDirectories,
	files: DefaultFiles,
	exts: DefaultExtensions
}

export function createConfig(content: any): IConfig {
	return {
		dirs: new Set(content.dirs),
		files: new Set(content.files),
		exts: new Set(content.exts)
	}
}
