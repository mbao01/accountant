import type { ZodError } from "zod";
import type {
  PrismaClientExtensionError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";

export type TServerError =
  | Error
  | ZodError
  | TypeError
  | PrismaClientExtensionError
  | PrismaClientRustPanicError
  | PrismaClientValidationError
  | PrismaClientKnownRequestError
  | PrismaClientInitializationError
  | PrismaClientUnknownRequestError;


export type ItemType<T extends unknown[]> = T extends (infer U)[] ? U : never;
