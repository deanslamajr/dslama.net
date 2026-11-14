import pino from 'pino';

// Cloud Logging reads `severity` and `message` from each JSON line.
const SEVERITY: Record<string, string> = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  messageKey: 'message',
  // No pid or hostname. The pod name is already on every log entry.
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: label => ({ severity: SEVERITY[label] || 'DEFAULT' }),
  },
});
