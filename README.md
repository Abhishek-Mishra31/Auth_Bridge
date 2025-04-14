# 🔐 Auth System with Token Verification

A simple authentication system where users can **sign up**, **log in**, and receive an `auth_token`. The token can later be **verified** to confirm user identity and access.

---

## 🚀 Features

- ✅ User Signup (returns an `auth_token`)
- ✅ User Login (returns an `auth_token`)
- ✅ Token Verification (validates token with registered user)
- 🔒 Secured with authentication logic
- 🧩 Easily extendable for future enhancements

---

## 📬 API Endpoints

### 1. 📝 Signup

Registers a new user and returns an `auth_token`.

- **Endpoint:** `/user/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "your_name",
    "email": "your_email.com",
    "password": "your_password"
  }
```

```
  #### ✅ Success Response:

```
{
  "message": "User registered successfully",
  "auth_token": "generated_token_here"
}
```
### 2. 🔐 Login

Authenticates the user and returns an `auth_token`.

- **Endpoint:** `/user/login`  
- **Method:** `POST`  

#### 📦 Request Body:

```json
{
  "email": "your_email.com",
  "password": "your_password"
}
```

  #### ✅ Success Response:


```
{
  "message": "Login successful",
  "auth_token": "generated_token_here"
}
```

### 3. ✅ Verify Token

Verifies the validity of an `auth_token` and returns associated user details.

- **Endpoint:** `/user/verify`  
- **Method:** `POST`  

#### 📦 Request Body:

```json
{
  "auth_token": "generated_token_here"
}
```
  #### ✅ Success Response:
```
{
  "message": "Token is valid",
  "user": {
    "name": "your_name",
    "email": "your_email.com"
  }
}
```
 #### ✅ Error Response:
 ```
 {
  "error": "Invalid or expired token"
}
```

## ⚙️ Technologies Used

- **Language:** JavaScript  
- **Frameworks:** Node.JS  
- **Database:** MongoDB  
- **Build Tool:** npm  
- **Authentication:** JWT

## 🛠️ Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Abhishek-Mishra31/JWT_auth_with_mongoDB
   cd your-repo
   ```

2. **Configure the Database**

Edit Db.js file:

Database URL: "mongodb://localhost:27017/your_Database_URL"

3. **start the server**

```
node server.js
```

## 📈 Future Enhancements

- 🔄 Token expiration & refresh  
- 📧 Email verification on signup  
- 🔐 Password hashing with BCrypt  
- 🧑‍⚕️ Role-based access (admin, user, etc.)  
- 📋 Logging and request tracking  

## 👨‍💻 Author

**Abhishek Kumar**  
🎓 Master’s Student  
💼 Full Stack Developer  
🔗 [LinkedIn](https://www.linkedin.com/in/abhishek-mishra-192006209/) 






