export default function buildEmailLinkHrefAttributeValue(emailAddress: string): string {
  return `mailto:${ emailAddress }`;
}
