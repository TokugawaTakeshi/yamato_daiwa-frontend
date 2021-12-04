import Snackbar from "./Snackbar.vue";
import { VuexMutation, VuexAction, VuexModule, Module as VuexModuleConfiguration, getModule } from "vuex-module-decorators";
import { secondsToMilliseconds } from "@yamato-daiwa/es-extensions";


@VuexModuleConfiguration
class SnackbarService extends VuexModule {

  public static readonly SnackbarVariations: Snackbar.Variations = Snackbar.Variations;
  private static readonly MESSAGE_DISPLAYING_DURATION__SECONDS: number = 5;

  private _isSnackbarDisplaying: boolean = false;
  private _messageTextOrHTML: string | null = null;
  private _variation: string | null = null;


  /* === Facade methods ============================================================================================= */
  public static displaySnackbarForAWhile(options: FloatingNotificationBarService.Options): void {
    getModule(FloatingNotificationBarService).displaySnackbarForAWhile(options);
  }

  public static hideSnackbar(): void {
    getModule(FloatingNotificationBarService).hideNotificationBar();
  }

  public static getInstance(): SnackbarService {
    return getModule(FloatingNotificationBarService);
  }


  /* === Functionality ============================================================================================== */
  @VuexAction({ rawError: true })
  public displaySnackbarForAWhile(
    {
      messageTextOrHTML,
      variation,
      displayingDuration__seconds = FloatingNotificationBarService.MESSAGE_DISPLAYING_DURATION__MILLISECONDS
    }: FloatingNotificationBarService.Options
  ): void {

    this.setMessage(messageTextOrHTML);
    this.setVariation(variation);

    this.displaySnackbar();

    setTimeout((): void => { this.hideSnackbar(); }, secondsToMilliseconds(displayingDuration__seconds));
  }

  public get variation(): string | null {
    return this._variation;
  }

  public get messageTextOrHTML(): string | null {
    return this._messageTextOrHTML;
  }

  public get isSnackbarDisplaying(): boolean {
    return this._isSnackbarDisplaying;
  }


  @VuexMutation
  private displaySnackbar(): void {
    this._isSnackbarDisplaying = true;
  }

  @VuexMutation
  public hideSnackbar(): void {
    this._isSnackbarDisplaying = false;
  }

  @VuexMutation
  private setMessage(messageTextOrHTML: string): void {
    this._messageTextOrHTML = messageTextOrHTML;
  }

  @VuexMutation
  private setVariation(variation: string): void {
    this._variation = variation;
  }
}


namespace FloatingNotificationBarService {
  export type Options = {
    variation: string;
    messageTextOrHTML: string;
    displayingDuration?: number;
  };
}


export default FloatingNotificationBarService;
