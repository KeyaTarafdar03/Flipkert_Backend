# Backend Link
- https://food-delivery-app-059m.onrender.com

## 1. Send OTP
- **Request Type:** POST
- **URL:** http://localhost:3000/user/otp-send
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Resend OTP
- **Request Type:** POST
- **URL:** http://localhost:3000/user/resend-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Verify OTP
- **Request Type:** POST
- **URL:** http://localhost:3000/user/verify-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com",
    "otp":2334
}
```