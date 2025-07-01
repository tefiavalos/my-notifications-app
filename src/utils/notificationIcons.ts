export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'security':
      return '🔒';
    case 'info':
      return 'ℹ️';
    case 'error':
      return '❌';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'system':
      return '⚙️';
    default:
      return '📱';
  }
} 