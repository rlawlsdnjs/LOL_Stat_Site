import styled from "styled-components";
import tw from "tailwind-styled-components";

const ItemList = (itemList: any) => {
  return (
    <>
      {Object.entries(itemList).map((item: any) => {
        const itemUrl = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${item[1]}.png`;
        return (
          <Item key={item}>
            {item[1] != 0 ? (
              <div className="w-16 rounded">
                <img src={itemUrl}></img>
              </div>
            ) : null}
          </Item>
        );
      })}
    </>
  );
};
const ItemCont = styled.div<any>`
  max-width: 35px;
  max-height: 35px;
  min-width: 35px;
  min-height: 35px;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Item = tw(ItemCont)<any>`
    avatar
    mx-px
 
`;

export default ItemList;
