export const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/itauwritter' : '';
  return `${basePath}${path}`;
};
