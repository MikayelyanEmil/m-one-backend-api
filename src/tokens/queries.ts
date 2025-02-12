export const CREATE_TOKEN = 'INSERT INTO "Token" ("userId", "refreshToken") VALUES ($1, $2) RETURNING *';
export const UPSERT_TOKEN = 
`INSERT INTO "Token" ("userId", "refreshToken")
VALUES (
    $1,
    $2
)
ON CONFLICT ("userId") 
DO UPDATE SET 
    "refreshToken" = EXCLUDED."refreshToken",
    "updatedAt" = NOW()
RETURNING *;`