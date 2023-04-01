import runesList from "../../../../public/assets/icons/runesReforged.json";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const RuneImg = (runes: any) => {
  console.log(runes);
  const runesStyle01 = runesList.filter(
    (item) => item.id == runes.runes01style
  );
  const runesStyle02 = runesList.filter(
    (item) => item.id == runes.runes02style
  );

  const rune01 = runesStyle01[0].slots[0].runes.filter(
    (rune) => rune.id == runes.runes01
  );

  //   const rune02 = runesStyle02[0].slots[0].runes.filter(
  //     (rune) => rune.id == runes.runes02
  //   );

  return (
    <>
      <Rune>
        <div className="w-16 rounded">
          <img
            className="icon"
            src={`../../../../public/assets/images/${rune01[0].icon}`}
          ></img>
        </div>
      </Rune>
      <Rune>
        <div className="w-16 rounded">
          <img
            src={`../../../../public/assets/images/${runesStyle02[0].icon}`}
          ></img>
        </div>
      </Rune>
    </>
  );
};

const twRune = styled.div<any>`
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
`;
const Rune = tw(twRune)<any>`
  avatar
`;

export default RuneImg;