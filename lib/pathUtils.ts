/**
 * 路径匹配工具函数
 */

/**
 * 检查两个路径是否精确匹配
 */
export const isExactMatch = (current: string, target: string): boolean => {
  return current === target;
};

/**
 * 检查当前路径是否以目标路径开头（父级匹配）
 */
export const isParentMatch = (current: string, target: string): boolean => {
  return current.startsWith(target) && current !== target;
};

/**
 * 检查当前路径是否匹配任一模式
 */
export const matchesAnyPattern = (current: string, patterns: string[]): boolean => {
  return patterns.some(pattern => current.includes(pattern));
};

/**
 * 创建路径匹配器
 */
export const createPathMatcher = (currentPath: string | null) => {
  // 防止水合错误
  if (!currentPath) {
    return {
      isExact: () => false,
      isParent: () => false,
      matchesPattern: () => false,
      isDynamicMatch: () => false
    };
  }

  return {
    /**
     * 精确匹配
     */
    isExact: (target: string) => isExactMatch(currentPath, target),
    
    /**
     * 父级匹配
     */
    isParent: (target: string) => isParentMatch(currentPath, target),
    
    /**
     * 模式匹配
     */
    matchesPattern: (patterns: string[]) => matchesAnyPattern(currentPath, patterns),
    
    /**
     * 动态路由匹配
     */
    isDynamicMatch: (target: string) => {
      // 精确匹配
      if (currentPath === target) return true;
      
      // 动态路由匹配
      if (target.startsWith('/products/') && currentPath.startsWith(target)) {
        return true;
      }
      if (target.startsWith('/news/') && currentPath.startsWith(target)) {
        return true;
      }
      if (target.startsWith('/solution/') && currentPath.startsWith(target)) {
        return true;
      }
      
      return false;
    }
  };
};