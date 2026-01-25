# CodePieceCreateDTO

## Properties

| Name              | Type   |
| ----------------- | ------ |
| `code`            | string |
| `language`        | string |
| `title`           | string |
| `sourcePostSlug`  | string |
| `exerciseContext` | string |
| `solutionCode`    | string |

## Example

```typescript
import type { CodePieceCreateDTO } from ''

// TODO: Update the object below with actual values
const example = {
	code: null,
	language: null,
	title: null,
	sourcePostSlug: null,
	exerciseContext: null,
	solutionCode: null,
} satisfies CodePieceCreateDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CodePieceCreateDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
