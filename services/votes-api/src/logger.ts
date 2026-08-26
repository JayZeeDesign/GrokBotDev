export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const order: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export function createLogger(minLevel: string = 'info') {
  const min = order[(minLevel as LogLevel) in order ? (minLevel as LogLevel) : 'info'];
  const write = (level: LogLevel, message: string, meta: Record<string, unknown> = {}) => {
    if (order[level] < min) return;
    const row = {
      at: new Date().toISOString(),
      level,
      message,
      ...meta,
    };
    const line = JSON.stringify(row);
    if (level === 'error' || level === 'warn') console.error(line);
    else console.log(line);
  };
  return {
    debug: (message: string, meta?: Record<string, unknown>) => write('debug', message, meta),
    info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
    warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
    error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
  };
}

export type Logger = ReturnType<typeof createLogger>;
