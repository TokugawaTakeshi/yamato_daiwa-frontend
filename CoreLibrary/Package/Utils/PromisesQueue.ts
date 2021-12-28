export default class PromisesQueue {

  private isExecutingNow: boolean = false;
  private mustExecuteNextAsynchronousFunction: boolean = true;
  private asynchronousFunctionsQueue: Array<(...parameters: Array<unknown>) => Promise<void>> = [];


  public constructor(
    initialAsynchronousFunctions: Array<(...parameters: Array<unknown>) => Promise<void>> = []
  ) {
    this.asynchronousFunctionsQueue.push(...initialAsynchronousFunctions);
  }


  public async startQueueExecutionIfHasNotStartedYet(): Promise<void> {

    if (this.isExecutingNow) {
      return;
    }


    this.isExecutingNow = true;

    for (const asynchronousFunction of this.asynchronousFunctionsQueue) {

      /* [ ESLint muting rationale ] Because it is a queue, all async function must be executed sequentially. */
      /* eslint-disable-next-line no-await-in-loop */
      await asynchronousFunction();

      if (!this.mustExecuteNextAsynchronousFunction) {
        this.isExecutingNow = false;
        this.asynchronousFunctionsQueue = [];
        break;
      }
    }


    this.isExecutingNow = false;
    this.asynchronousFunctionsQueue = [];
  }

  public addFunctionToQueue(newAsynchronousFunction: (...parameters: Array<unknown>) => Promise<void>): void {
    this.asynchronousFunctionsQueue.push(newAsynchronousFunction);
  }

  public async addFunctionToQueueAndStartQueueExecutionIfHasNotStartedYet(
    newAsynchronousFunction: (...parameters: Array<unknown>) => Promise<void>
  ): Promise<void> {
    this.addFunctionToQueue(newAsynchronousFunction);
    return this.startQueueExecutionIfHasNotStartedYet();
  }

  public stopExecutionOnceCurrentPromiseFinished(): void {
    this.mustExecuteNextAsynchronousFunction = false;
  }

  public static errorHandler(error: unknown): void {
    // TODO 完成させる。
    console.error(error);
  }
}
