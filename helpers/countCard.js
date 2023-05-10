import { countActionCard } from "./countActionCard";
import { countCharacterCard } from "./countCharacterCard";

export function countCard(type) {
  switch (type) {
    case "characterCard":
      return countCharacterCard();
    case "actionCard":
      return countActionCard();
  }
}
