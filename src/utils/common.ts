export function sleep(seconds: number): Promise<void> {
  return new Promise((r) => {
    setTimeout(() => r(), seconds * 1000);
  });
}
