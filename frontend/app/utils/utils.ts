export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function handleError(err: unknown) {
  if (err instanceof Error) {
    return err.message;
  } else return String(err);
}
