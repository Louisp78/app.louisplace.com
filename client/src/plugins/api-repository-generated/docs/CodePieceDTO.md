# CodePieceDTO

## Properties

| Name              | Type    |
| ----------------- | ------- |
| `id`              | number  |
| `code`            | string  |
| `language`        | string  |
| `title`           | string  |
| `sourcePostSlug`  | string  |
| `exerciseContext` | string  |
| `solutionCode`    | string  |
| `isSolved`        | boolean |
| `createdAt`       | Date    |
| `updatedAt`       | Date    |

## Example

```typescript
import type { CodePieceDTO } from ''

// TODO: Update the object below with actual values
const example = {
	id: null,
	code: null,
	language: null,
	title: null,
	sourcePostSlug: null,
	exerciseContext: null,
	solutionCode: null,
	isSolved: null,
	createdAt: null,
	updatedAt: null,
} satisfies CodePieceDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CodePieceDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
