export const methodFromUrl = (url) => {
    const parts = url.split('/');
    if (parts.length === 0) return null;

    return parts[parts.length - 1];
  };
  