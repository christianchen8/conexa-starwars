export function parseId(url: string) {
  const splitUrl = url.split("/")[5];
  return splitUrl;
}
