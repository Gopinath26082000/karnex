const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function publicPath(path: string) {
  if (!basePath || path.startsWith("http")) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
