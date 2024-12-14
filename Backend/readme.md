# Backend API Documentation

## `/users/register` Endpoint

### Description

Register a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Endpoint

`/users/register`

### Request Body

The request body should be in JSON format and include the following fields:

- **fullname**
  - **firstname** (string, required): First name of the user (minimum 3 characters).
  - **lastname** (string, optional): Last name of the user (minimum 3 characters).
- **email** (string, required): Valid email address of the user.
- **password** (string, required): Password for the account (minimum 6 characters).

#### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Body**:

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Errors

- **400 Bad Request**: Validation errors or missing required fields.

  ```json
  {
    "error": [
      {
        "msg": "First name must be at least 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**: An error occurred on the server.

### Notes

- Ensure that all required fields are provided and meet validation criteria.
- The response includes a JWT token for authentication purposes.
- Set the `Content-Type` header to `application/json` when making requests.

## POST /users/login

### Description

Authenticate a user using email and password.

### Request Body

The request body should be in JSON format and include the following fields:

- **email** (string, required): Valid email address of the user.
- **password** (string, required): Password for the account (minimum 6 characters).

#### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Body**:

  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Errors

- **400 Bad Request**: Validation errors or missing required fields.

  ```json
  {
    "error": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**: Invalid email or password.

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**: An error occurred on the server.

### Notes

- Ensure that all required fields are provided and meet validation criteria.
- The response includes a JWT token for authentication purposes.
- Set the `Content-Type` header to `application/json` when making requests.

## GET /users/profile

### Description

Retrieve the authenticated user's profile information.

### Headers

- **Authorization** (string, required): Bearer token obtained after login.

### Responses

#### Success

- **Status Code**: 200 OK
- **Body**:

  ```json
  {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields...
  }
  ```

#### Errors

- **401 Unauthorized**: Token is missing or invalid.

  ```json
  {
    "message": "Authentication failed"
  }
  ```

- **500 Internal Server Error**: An error occurred on the server.

### Notes

- Authentication is required for this endpoint.
- Include the JWT token in the `Authorization` header as `Bearer <token>`.

## GET /users/logout

### Description

Logout the authenticated user by invalidating their JWT token.

### Headers

- **Authorization** (string, required): Bearer token obtained after login.

### Responses

#### Success

- **Status Code**: 200 OK
- **Body**:

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Errors

- **401 Unauthorized**: Token is missing or invalid.

  ```json
  {
    "message": "Authentication failed"
  }
  ```

- **500 Internal Server Error**: An error occurred on the server.

### Notes

- This endpoint invalidates the user's current JWT token.
- Include the JWT token in the `Authorization` header as `Bearer <token>`.