abstract class Timer {

  protected readonly period__seconds: number;
  protected readonly onElapsed?: (outcome: Timer.Outcomes) => void;

  protected mustStop: boolean = false;


  public constructor(
    parametersObject: {
      period__seconds: number;
      onElapsed?: (outcome: Timer.Outcomes) => void;
    }
  ) {
    this.period__seconds = parametersObject.period__seconds;
    this.onElapsed = parametersObject.onElapsed;
  }


  public abstract countDown(
    parametersObject: { asynchronousCompletion?: Timer.AsynchronousCompletions.promise; }
  ): Promise<Timer.Outcomes>;

  public abstract countDown(
    parametersObject: { asynchronousCompletion: Timer.AsynchronousCompletions.callback; }
  ): void;
}


namespace Timer {

  export enum Outcomes {
    elapsed = "ELAPSED",
    stopped = "STOPPED"
  }

  export enum AsynchronousCompletions {
    promise = "PROMISE",
    callback = "CALLBACK"
  }
}


export default Timer;
