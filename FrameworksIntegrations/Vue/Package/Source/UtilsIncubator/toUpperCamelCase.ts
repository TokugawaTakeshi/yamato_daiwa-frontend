import { capitalizeFirstCharacter } from "@yamato-daiwa/es-extensions";


export default function toUpperCamelCase(targetString: string): string {
  return capitalizeFirstCharacter(targetString.toLowerCase());
}
