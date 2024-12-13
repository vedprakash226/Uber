
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