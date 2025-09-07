/**
 * 统一日志工具
 * 在开发环境下输出日志，生产环境下静默或发送到监控服务
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * 信息日志
   */
  info: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * 警告日志
   */
  warn: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
    // TODO: 在生产环境中发送到监控服务
  },

  /**
   * 错误日志
   */
  error: (message: string, error?: Error | unknown, ...args: unknown[]) => {
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }
    // TODO: 在生产环境中发送到错误监控服务（如 Sentry）
  },

  /**
   * 调试日志（仅开发环境）
   */
  debug: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
};

export default logger;