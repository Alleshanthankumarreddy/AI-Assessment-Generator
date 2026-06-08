// import Redis from "ioredis";


// const redisConnection = new Redis(
//   process.env.REDIS_URL,
//   {
//   maxRetriesPerRequest: null,
// });

// redisConnection.on("connect", () => {
//   console.log("Redis Connected");
// });

// redisConnection.on("ready", () => {
//   console.log("Redis Ready");
// });

// redisConnection.on("reconnecting", () => {
//   console.log("Redis Reconnecting...");
// });

// redisConnection.on("close", () => {
//   console.log("Redis Closed");
// });

// redisConnection.on("end", () => {
//   console.log("Redis Ended");
// });

// redisConnection.on("error", (err) => {
//   console.log("Redis Error:", err);
// });

// export default redisConnection;

import Redis from "ioredis";

const redisConnection = new Redis(
  process.env.REDIS_URL,
  {
    maxRetriesPerRequest: null,
  }
);

redisConnection.on("connect", () => {
  console.log("Redis Connected");
});

redisConnection.on("error", (err) => {
  console.log("Redis Error:", err);
});

export default redisConnection;