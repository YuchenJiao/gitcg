import { countActionCard } from "./countActionCard";
import { countChar } from "./countChar";

export function refreshCount(type) {
  switch (type) {
    case "characterCard":
      return countChar();
    case "actionCard":
      return countActionCard();
  }
}
