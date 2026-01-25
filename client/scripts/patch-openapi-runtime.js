const fs = require('fs');
const path = require('path');

const apiGeneratedDir = process.env.API_GENERATED_OUTPUT_DIR
const runtimePath = path.join(__dirname, '..', apiGeneratedDir, 'runtime.ts')
const defaultConfigLine =
	"export const DefaultConfig = new Configuration({ credentials: 'include' })"

let content = fs.readFileSync(runtimePath, 'utf8')

// Patch BASE_PATH to use env var
const basePathRegex = /export const BASE_PATH = .*\)/
const basePathLine = "export const BASE_PATH = process.env.NEXT_PUBLIC_BACKEND_URL!.replace(/\\/+$/, '')"
if (basePathRegex.test(content)) {
	content = content.replace(basePathRegex, basePathLine)
} else {
	// If not present, optionally insert at the top (after comments)
	content = content.replace(/(\*\/\s*)/, `$1\n${basePathLine}\n`)
}

// Replace any existing DefaultConfig assignment with the correct one
const defaultConfigRegex = /export const DefaultConfig = new Configuration\([^\)]*\)/
if (defaultConfigRegex.test(content)) {
	content = content.replace(defaultConfigRegex, defaultConfigLine)
} else {
	// If not present, append it after the Configuration class
	content = content.replace(
		/(export class Configuration[^{]*\{[^}]*\})/,
		`$1\n\n${defaultConfigLine}\n`
	)
}

fs.writeFileSync(runtimePath, content, 'utf8')
console.log('Patched runtime.ts to always use credentials: "include" and BASE_PATH from env')
