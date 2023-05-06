export default function buildPhoneNumberLinkHrefAttributeValue(phoneNumber: string): string {
  return `tel:${ phoneNumber }`;
}
