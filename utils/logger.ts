export class logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private timestamp(): string {
    return new Date().toISOString();
  }

  info(message: string): void {
    console.log(`[INFO] ${this.timestamp()} [${this.context}] - ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${this.timestamp()} [${this.context}] - ${message}`);
  }

  step(message: string): void {
    console.log(`[STEP] ${this.timestamp()} [${this.context}] → ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${this.timestamp()} [${this.context}] - ${message}`);
  }
}
