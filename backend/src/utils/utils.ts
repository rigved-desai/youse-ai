export function handleError(err: unknown) {
  if (err instanceof Error) {
    return err.message;
  } else return String(err);
}
