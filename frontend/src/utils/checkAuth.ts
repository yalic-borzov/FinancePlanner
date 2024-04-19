// utils/authUtils.ts
export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');
  // Здесь можно добавить логику декодирования токена и проверки его срока действия,
  // если это требуется.
  return !!token; // Простая проверка наличия токена
};
