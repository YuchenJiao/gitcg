import cardStyles from "@/styles/Card.module.css";

export function countChar() {
  const charNum = document.querySelectorAll(
    `.${cardStyles.selected_char}`
  ).length;
  const firstChar = document.querySelector(
    `.${cardStyles.char_first}:not(.${cardStyles.hidden})`
  )?.parentElement?.childNodes[0]?.id;
  const secondChar = document.querySelector(
    `.${cardStyles.char_second}:not(.${cardStyles.hidden})`
  )?.parentElement?.childNodes[0]?.id;
  const thirdChar = document.querySelector(
    `.${cardStyles.char_third}:not(.${cardStyles.hidden})`
  )?.parentElement?.childNodes[0]?.id;
  return { num: charNum, list: [firstChar, secondChar, thirdChar] };
}