/* Replace with your SQL commands */
ALTER TABLE "FriendRequest" ADD CONSTRAINT unique_friend_request UNIQUE ("senderId", "receiverId");