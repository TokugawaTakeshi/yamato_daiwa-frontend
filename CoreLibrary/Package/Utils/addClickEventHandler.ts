export default function addClickEventHandler(
  {
    targetElement,
    handler,
    handleParentElementFirst
  }: {
    targetElement: Element;
    handler: (...parameters: Array<unknown>) => unknown;
    handleParentElementFirst: boolean;
  }
): void {

  targetElement.addEventListener("click", (event: Event): void => {

    if (!(event instanceof MouseEvent)) {
      return;
    }


    handler();

  }, handleParentElementFirst);
}
