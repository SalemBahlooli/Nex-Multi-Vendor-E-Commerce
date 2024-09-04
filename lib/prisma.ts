import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = new PrismaClient({
  // log: [
  //   {
  //     emit: "event",
  //     level: "query",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "error",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "info",
  //   },
  //   {
  //     emit: "stdout",
  //     level: "warn",
  //   },
  // ],
});

// db.$on("query", (e: any) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
