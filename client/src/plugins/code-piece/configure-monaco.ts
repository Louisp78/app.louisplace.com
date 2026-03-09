import type { Monaco } from '@monaco-editor/react'

export function configureMonaco(monaco: Monaco): void {
	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		`
declare module '@jest/globals' {
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void | Promise<void>): void;
  export function test(name: string, fn: () => void | Promise<void>): void;
  export function expect<T = any>(actual: T): any;
  export function beforeEach(fn: () => void | Promise<void>): void;
  export function afterEach(fn: () => void | Promise<void>): void;
  export function beforeAll(fn: () => void | Promise<void>): void;
  export function afterAll(fn: () => void | Promise<void>): void;
}
		`,
		'file:///node_modules/@types/jest/index.d.ts'
	)
}
