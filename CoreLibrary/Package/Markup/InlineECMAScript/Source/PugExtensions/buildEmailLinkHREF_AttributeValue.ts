export default function buildEmailLinkHREF_AttributeValue(emailAddress: string): string {
  return `mailto:${ emailAddress }`;
}
