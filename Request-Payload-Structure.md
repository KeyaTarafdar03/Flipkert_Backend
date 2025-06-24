# Backend Link
- https://food-delivery-app-059m.onrender.com

## 1. Send OTP
- **Request Type:** POST
- **URL:** https://food-delivery-app-059m.onrender.com/user/otp-send
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Resend OTP
- **Request Type:** POST
- **URL:** https://food-delivery-app-059m.onrender.com/user/resend-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Verify OTP
- **Request Type:** POST
- **URL:** https://food-delivery-app-059m.onrender.com/user/verify-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com",
    "otp":2334
}
```