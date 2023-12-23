import { getExpectedToBeSingleDOM_Element } from "@yamato-daiwa/es-extensions-browserjs";


class Button {

  private readonly nativeElement: HTMLButtonElement | HTMLInputElement | HTMLAnchorElement;

  public static pickOneBySelector(properties: Button.InitializationProperties): Button {
    return new Button(properties);
  }


  private constructor(properties: Button.InitializationProperties) {

    this.nativeElement = getExpectedToBeSingleDOM_Element<HTMLButtonElement>({
      selector: properties.selector, expectedDOM_ElementSubtype: HTMLButtonElement
    });

    this.nativeElement.addEventListener("click", (event: MouseEvent): void => {

      if (properties.keepDefaultBehaviour !== true) {
        event.preventDefault();
      }

      properties.onClick(event);

    });
  }

  public toggle(): void {
    this.nativeElement.setAttribute("aria-pressed", "true");
  }

  public untoggle(): void {
    this.nativeElement.removeAttribute("aria-pressed");
  }

}


namespace Button {

  export type InitializationProperties = Readonly<{
    selector: string;
    keepDefaultBehaviour?: boolean;
    onClick: (event: MouseEvent) => unknown;
  }>;

}


export default Button;
