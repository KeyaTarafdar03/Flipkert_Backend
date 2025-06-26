# Backend Link
- https://flipkert-backend.onrender.com

## 1. Send OTP
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/otp-send
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Resend OTP
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/resend-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 3. Verify OTP
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/verify-otp
- **Payload:**
```JSON
{
    "email":"keya@gmail.com",
    "otp":2334
}
```

## 4. Fetch All Categories
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-categories

## 5. Fetch All Products
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-products

## 6. Fetch All Products (Filter by Category)
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-products
- **Params:**
```JSON
{
    "category":"Fashion",
}
```