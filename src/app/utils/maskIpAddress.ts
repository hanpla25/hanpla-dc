export function maskIpAddress(ip: string): string {
  return `(${ip.split(".").slice(0, 2).join(".")})`;
}
