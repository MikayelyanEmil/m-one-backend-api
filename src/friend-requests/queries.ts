export const CREATE_FRIENDREQUEST = 'INSERT INTO "FriendRequest" ("senderId", "receiverId") VALUES ($1, $2) RETURNING *';
export const UPDATE_FRIENDREQUEST = 'UPDATE "FriendRequest" SET status = $1 WHERE id = $2 RETURNING *';
export const GET_PENDING_REQUESTS = `SELECT * FROM "FriendRequest" WHERE "receiverId" = $1 AND status = 'PENDING'`;