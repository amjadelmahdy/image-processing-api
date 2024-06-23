import winston from "winston";

const winLog = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/file-log-error.log",
      level: "error",
    }),
  ],
});

export default winLog;
