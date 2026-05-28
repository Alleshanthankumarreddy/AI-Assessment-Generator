import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const questionPaperQueue = new Queue(
  "question-paper-generation",
  {
    connection: redisConnection,
  }
);

export default questionPaperQueue;