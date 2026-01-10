# AuthControllerApi

All URIs are relative to _http://localhost:8080_

| Method                                                    | HTTP request                    | Description |
| --------------------------------------------------------- | ------------------------------- | ----------- |
| [**auth**](AuthControllerApi.md#auth)                     | **POST** /auth/oauth/{provider} |             |
| [**postMethodName**](AuthControllerApi.md#postmethodname) | **POST** /auth/logout           |             |

## auth

> UserDTO auth(provider, code)

### Example

```ts
import { Configuration, AuthControllerApi } from ''
import type { AuthRequest } from ''

async function example() {
	console.log('🚀 Testing  SDK...')
	const api = new AuthControllerApi()

	const body = {
		// string
		provider: provider_example,
		// string
		code: code_example,
	} satisfies AuthRequest

	try {
		const data = await api.auth(body)
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                     |
| ------------ | -------- | ----------- | ------------------------- |
| **provider** | `string` |             | [Defaults to `undefined`] |
| **code**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**UserDTO**](UserDTO.md)

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

## postMethodName

> string postMethodName()

### Example

```ts
import { Configuration, AuthControllerApi } from ''
import type { PostMethodNameRequest } from ''

async function example() {
	console.log('🚀 Testing  SDK...')
	const api = new AuthControllerApi()

	try {
		const data = await api.postMethodName()
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

**string**

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
