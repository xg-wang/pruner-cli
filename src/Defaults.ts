// DefaultFiles pruned.
//
// Copied from yarn (mostly).
export const DefaultFiles = new Set([
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
	".yarn-integrity",
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
	"website",
	"images",
	"assets",
	"example",
	"examples",
	"coverage",
	".nyc_output",
	".idea"
])

// DefaultExtensions pruned.
export const DefaultExtensions = new Set([
	".md",
	".ts",
	".jst",
	".coffee",
	".tgz"
])

export const Defaults = {
	dirs: DefaultDirectories,
	files: DefaultFiles,
	exts: DefaultExtensions
}

export function createConfig(content: any): {
	dirs: Set<string>;
	files: Set<string>;
	exts: Set<string>;
} {
	return {
		dirs: new Set(content.dirs),
		files: new Set(content.files),
		exts: new Set(content.exts)
	}
}
