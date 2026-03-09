# CodePieceControllerApi

All URIs are relative to _http://localhost:8080_

| Method                                                               | HTTP request                             | Description |
| -------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| [**createCodePiece**](CodePieceControllerApi.md#createcodepiece)     | **POST** /code-pieces                    |             |
| [**deleteCodePiece**](CodePieceControllerApi.md#deletecodepiece)     | **DELETE** /code-pieces/{sourcePostSlug} |             |
| [**getUserCodePieces**](CodePieceControllerApi.md#getusercodepieces) | **GET** /code-pieces/me                  |             |
| [**updateCodePiece**](CodePieceControllerApi.md#updatecodepiece)     | **PUT** /code-pieces/{sourcePostSlug}    |             |

## createCodePiece

> CodePieceDTO createCodePiece(codePieceCreateDTO)

### Example

```ts
import {
  Configuration,
  CodePieceControllerApi,
} from '';
import type { CreateCodePieceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CodePieceControllerApi();

  const body = {
    // CodePieceCreateDTO
    codePieceCreateDTO: ...,
  } satisfies CreateCodePieceRequest;

  try {
    const data = await api.createCodePiece(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                   | Type                                        | Description | Notes |
| ---------------------- | ------------------------------------------- | ----------- | ----- |
| **codePieceCreateDTO** | [CodePieceCreateDTO](CodePieceCreateDTO.md) |             |       |

### Return type

[**CodePieceDTO**](CodePieceDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteCodePiece

> deleteCodePiece(sourcePostSlug)

### Example

```ts
import { Configuration, CodePieceControllerApi } from ''
import type { DeleteCodePieceRequest } from ''

async function example() {
	console.log('🚀 Testing  SDK...')
	const api = new CodePieceControllerApi()

	const body = {
		// string
		sourcePostSlug: sourcePostSlug_example,
	} satisfies DeleteCodePieceRequest

	try {
		const data = await api.deleteCodePiece(body)
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name               | Type     | Description | Notes                     |
| ------------------ | -------- | ----------- | ------------------------- |
| **sourcePostSlug** | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getUserCodePieces

> Array&lt;CodePieceDTO&gt; getUserCodePieces()

### Example

```ts
import { Configuration, CodePieceControllerApi } from ''
import type { GetUserCodePiecesRequest } from ''

async function example() {
	console.log('🚀 Testing  SDK...')
	const api = new CodePieceControllerApi()

	try {
		const data = await api.getUserCodePieces()
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}

// Run the test
example().catch(console.error)
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;CodePieceDTO&gt;**](CodePieceDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## updateCodePiece

> CodePieceDTO updateCodePiece(sourcePostSlug, codePieceUpdateDTO)

### Example

```ts
import {
  Configuration,
  CodePieceControllerApi,
} from '';
import type { UpdateCodePieceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CodePieceControllerApi();

  const body = {
    // string
    sourcePostSlug: sourcePostSlug_example,
    // CodePieceUpdateDTO
    codePieceUpdateDTO: ...,
  } satisfies UpdateCodePieceRequest;

  try {
    const data = await api.updateCodePiece(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                   | Type                                        | Description | Notes                     |
| ---------------------- | ------------------------------------------- | ----------- | ------------------------- |
| **sourcePostSlug**     | `string`                                    |             | [Defaults to `undefined`] |
| **codePieceUpdateDTO** | [CodePieceUpdateDTO](CodePieceUpdateDTO.md) |             |                           |

### Return type

[**CodePieceDTO**](CodePieceDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
