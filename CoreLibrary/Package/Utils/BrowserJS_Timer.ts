import { Timer, secondsToMilliseconds } from "@yamato-daiwa/es-extensions";


export default class BrowserJS_Timer extends Timer {

  private nativeTimeoutID!: number;

  public start(): void {
    this.nativeTimeoutID = window.setTimeout(this.onElapsed.bind(this), secondsToMilliseconds(this.period__seconds));
  }

  public restart(): void {
    this.start();
    this.stop();
  }

  public stop(): void {
    clearTimeout(this.nativeTimeoutID);
  }
}
