// pino 6 ships no types, and @types/pino pulls in packages that need a
// newer TypeScript. This covers only what src/logger.ts uses.
declare module 'pino' {
  type LogFn = {
    (message: string): void;
    (object: Record<string, unknown>, message?: string): void;
  };

  export type Logger = {
    trace: LogFn;
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
    fatal: LogFn;
    child: (bindings: Record<string, unknown>) => Logger;
  };

  type Options = {
    level?: string;
    messageKey?: string;
    base?: Record<string, unknown> | undefined;
    timestamp?: () => string;
    formatters?: {
      level?: (label: string, number: number) => Record<string, unknown>;
    };
  };

  type Pino = {
    (options?: Options): Logger;
    stdTimeFunctions: { isoTime: () => string };
    stdSerializers: { err: (error: Error) => Record<string, unknown> };
  };

  const pino: Pino;
  export default pino;
}
