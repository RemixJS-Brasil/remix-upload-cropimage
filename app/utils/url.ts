export const getCurrentRoute = (request: Request) => {
  const url: URL = new URL(request.url);

  return url.pathname;
};
