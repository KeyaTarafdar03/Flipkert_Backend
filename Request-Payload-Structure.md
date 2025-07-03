# Backend Link
- https://flipkert-backend.onrender.com

## 1. Send OTP (For Signup)
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/otp-send
- **Payload:**
```JSON
{
    "email":"keya@gmail.com"
}
```

## 2. Resend OTP (For Login & Resend OTP)
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

## 4. Fetch User
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-user
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```

## 5. Fetch All Categories
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-categories

## 6. Fetch All Products
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-products

## 7. Fetch All Products (Filter by Category)
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/fetch-all-products
- **Params:**
```JSON
{
    "category":"Fashion",
}
```

## 8. Add to Cart
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/add-to-cart
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```
- **Body:**
```JSON
{
    "productId":"685d32b13576391ddcc22f26",
    "color":"purple",  (optional)
    "size":"M"  (optional)
}
```

## 9. Remove from Cart
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/remove-from-cart
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```
- **Body:**
```JSON
{
    "productId":"685d32b13576391ddcc22f26",
    "color":"purple",  (optional)
    "size":"M"  (optional)
}
```

## 10. Clear Cart
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/clear-cart
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```

## 11. Place Order From Cart
- **Request Type:** GET
- **URL:** https://flipkert-backend.onrender.com/user/place-order-from-cart
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```

## 12. Place Single Product Order
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/place-single-order
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```
- **Body:**
```JSON
{
    "productId":"685d32b13576391ddcc22f26",
    "color":"purple",  (optional)
    "size":"M"  (optional)
}
```

## 13. Update User Details
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/user-details-update
- **Headers:**
```JSON
{
    "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```
- **Body:** (Send only those fields which you want to update, send the other fields as empty)
```JSON
{
    "username":"Keya Tarafdar",
    "phone":"9647336816",
    "address":"Gocharan"
}
```

## 14. Fetch Single Product
- **Request Type:** POST
- **URL:** https://flipkert-backend.onrender.com/user/fetch-single-product
- **Body:**
```JSON
{
    "productId":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtleWFAZ21haWwuY29tIiwiaWQiOiI2ODVhYjdjZjg2MmNlMTk1N2NkOWVkYWEiLCJpYXQiOjE3NTA5NDQwNTYsImV4cCI6MTc1MTAzMDQ1Nn0.3P4SbBM2i2oENbIknuoGcp2LvpoboZPtQr18PPGrrT4",
}
```