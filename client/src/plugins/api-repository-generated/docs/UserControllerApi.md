# UserControllerApi

All URIs are relative to _http://localhost:8080_

| Method                                                      | HTTP request      | Description |
| ----------------------------------------------------------- | ----------------- | ----------- |
| [**getUserInfos**](UserControllerApi.md#getuserinfos)       | **GET** /users/me |             |
| [**updateUserInfos**](UserControllerApi.md#updateuserinfos) | **PUT** /users/me |             |

## getUserInfos

> UserDTO getUserInfos()

### Example

```ts
import { Configuration, UserControllerApi } from ''
import type { GetUserInfosRequest } from ''

async function example() {
	console.log('🚀 Testing  SDK...')
	const api = new UserControllerApi()

	try {
		const data = await api.getUserInfos()
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

## updateUserInfos

> UserDTO updateUserInfos(userUpdateDTO)

### Example

```ts
import {
  Configuration,
  UserControllerApi,
} from '';
import type { UpdateUserInfosRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new UserControllerApi();

  const body = {
    // UserUpdateDTO
    userUpdateDTO: ...,
  } satisfies UpdateUserInfosRequest;

  try {
    const data = await api.updateUserInfos(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                              | Description | Notes |
| ----------------- | --------------------------------- | ----------- | ----- |
| **userUpdateDTO** | [UserUpdateDTO](UserUpdateDTO.md) |             |       |

### Return type

[**UserDTO**](UserDTO.md)

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
