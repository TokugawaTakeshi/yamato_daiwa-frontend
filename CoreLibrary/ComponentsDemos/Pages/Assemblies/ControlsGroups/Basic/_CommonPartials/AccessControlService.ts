import { Logger, getRandomInteger, secondsToMilliseconds } from "@yamato-daiwa/es-extensions";


class AccessControlService {

  public static async signUp(payload: AccessControlService.SigningUp.Payload): Promise<void> {
    return new Promise<void>((resolve: () => void): void => {
      setTimeout(
        (): void => {

          Logger.logSuccess({
            title: "Signing up success",
            description:
                `    User name: "${ payload.userName }"` +
                `Email address: "${ "emailAddress" in payload ? payload.emailAddress : "(Not specified)" }"` +
                ` Phone number: "${ "phoneNumber" in payload ? payload.phoneNumber : "(Not specified)" }"` +
                `     Password: "${ payload.password }"`
          });

          resolve();

        },
        secondsToMilliseconds(
          getRandomInteger({ minimalValue: 2, maximalValue: 3 })
        )
      );
    });
  }

  public static async isUserNameAvailable(userName: string): Promise<boolean> {

    const MUST_SIMULATE_ERROR: boolean = false;

    return new Promise<boolean>((resolve: (isUserNameAvailable: boolean) => void, reject: (error: Error) => void): void => {

      setTimeout(
        (): void => {

          /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --
          * First, the `MUST_SIMULATE_ERROR` has type "boolean", not "false".
          * Last, it is intentional for the error simulations. */
          if (MUST_SIMULATE_ERROR) {
            reject(new Error("Server error has been simulated."));
          }


          resolve(![ "knight", "prophet" ].includes(userName));

        },
        secondsToMilliseconds(
          getRandomInteger({ minimalValue: 2, maximalValue: 3 })
        )
      );

    });

  }

  public static async isUserNameIncludingProfanity(userName: string): Promise<boolean> {

    const MUST_SIMULATE_ERROR: boolean = false;

    return new Promise<boolean>((resolve: (isUserNameAvailable: boolean) => void, reject: (error: Error) => void): void => {

      setTimeout(
          (): void => {

            /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --
             * First, the `MUST_SIMULATE_ERROR` has type "boolean", not "false".
             * Last, it is intentional for the error simulations. */
            if (MUST_SIMULATE_ERROR) {
              reject(new Error("Server error has been simulated."));
            }


            resolve(
              ![ "fuck", "shit" ].some(
                (word: string): boolean => userName.toLowerCase().includes(word.toLowerCase())
              )
            );

          },
          secondsToMilliseconds(
            getRandomInteger({ minimalValue: 4, maximalValue: 5 })
          )
      );

    });

  }

}


namespace AccessControlService {

  export namespace SigningUp {

    export type Payload =
        Readonly<
          {
            userName: string;
            password: string;
          } & (
            { emailAddress: string; } |
            { phoneNumber: string; }
          )
        >;

  }

}


export default AccessControlService;
