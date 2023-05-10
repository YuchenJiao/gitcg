import cardStyles from "@/styles/Card.module.css";

export function countActionCard() {
  const actionCardNum =
    document.querySelectorAll(
      `div.${cardStyles.num_one}:not(.${cardStyles.hidden})`
    ).length +
    2 *
      document.querySelectorAll(
        `div.${cardStyles.num_two}:not(.${cardStyles.hidden})`
      ).length;
  const singleCards = Array.from(
    document.querySelectorAll(
      `.${cardStyles.num_one}:not(.${cardStyles.hidden})`
    )
  );
  const doubleCards = Array.from(
    document.querySelectorAll(
      `.${cardStyles.num_two}:not(.${cardStyles.hidden})`
    )
  );
  let selectedCardList = [];
  singleCards.forEach((ref) => {
    selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
  });
  doubleCards.forEach((ref) => {
    selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
    selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
  });
  return { num: actionCardNum, list: selectedCardList };
}
