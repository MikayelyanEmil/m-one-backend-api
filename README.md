Backend api that resembles the backend of Facebook. Built with Nest.js with node-postgres module without an ORM. Used db-migrate module to setup database tables and migrations.

Features:
- JWT access, refresh token authentication using passport.js and Nest.js guards
- Client input validation using class-validator, class-transformer and Nest.js pipes
- Create friend requests, accept friend requests, list friend requests
- Search for users based on criteria
- Database interactions using Sql queries 
- Protected against Sql injection attacks
- Comments describing code sections


How to setup:
1. Clone the repo
2. npm install
3. In the .env.development file change DATABASE_URL username and password
4. npm run db-migrate db:create test_backend
5. npm run db-migrate up
6. npm run start:dev

   

Essential API routes.
- api/auth/signup POST
- api/auth/login  POST
- api/users/search POST
- api/friend-requests/create POST - add friend request
- api/friend-requests/update POST - accept or deny friend request
- api/friend-requests/pending GET - list pending friend requests


