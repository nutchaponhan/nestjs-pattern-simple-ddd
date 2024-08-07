export abstract class ErrorBase<T extends number> extends Error {
  public abstract code: number;

  constructor(message: string) {
    super(message);
  }

  toHttp() {
    return {
      status: this.code as T,
      body: { code: this.code.toString(), message: this.message },
    };
  }
}
