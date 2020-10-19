export const Flex_Center_Center = `
  display:flex;
  justify-content:center;
  align-items:center;
`;

export const Flex_Row_Start_Center = `
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
`;

export const Flex_Column_Start_Center = `
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
`;

/*FireFox*/
/*IE10+*/
/*Chrome, Safari, Edge*/
export const Hide_Scrollbar = `
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  &::-webkit-scrollbar { display: none; }
  `;

export const BREAKPOINT = 500;
