import "dotenv/config";
export const DB = (process.env.NODE_ENV === 'development') ? process.env.DB_DEV_URL
: (process.env.NODE_ENV === 'test') ? process.env.DB_TEST_URL : process.env.DB_URL;
