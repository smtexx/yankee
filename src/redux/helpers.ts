export function getUrl(...arg: string[]): string {
  return `http://localhost:3000/${arg.join('/')}`;
}

export class BadResponseError extends Error {
  constructor(code: number) {
    super(`Bad server response with code: ${code}`);
    this.name = 'BadResponseError';
  }
}
