import { Logger, getRandomInteger, secondsToMilliseconds } from "@yamato-daiwa/es-extensions";


class AccessControlService {

  public static async signIn(payload: AccessControlService.SigningIn.Payload): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {
      setTimeout(
        (): void => {

          Logger.logSuccess({
            title: "Signing in success",
            description: `User name: "${ payload.userName }", password: "${ payload.password }"`
          });

          resolve();

        },
        secondsToMilliseconds(
          getRandomInteger({
            minimalValue: 2,
            maximalValue: 3
          })
        )
      );
    });
  }

}


namespace AccessControlService {

  export namespace SigningIn {

    export type Payload = Readonly<{
      userName: string;
      password: string;
    }>;

  }

}


export default AccessControlService;
