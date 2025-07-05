# DevTinder APIs

# authRouter
- POST /singup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH  profile/password

# connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepeted/:userId
- POST /request/review/rejected/:userId

# userRouter
- GET /user/connection
- GET /user/requests
- GET /user/feed - Get you the profiles of other users on platform 


Status : ignore, interested, accepeted, rejected

