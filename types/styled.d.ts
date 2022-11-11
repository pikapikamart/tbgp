import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [ key: string ]: string,
      dark1: string,
      dark2: string,
      dark3: string,
      grey1: string,
      grey2: string,
      grey3: string,
      grey4: string,
      white1: string,
      white2: string,
      white3: string,
      white4: string,
      whiteBlue1: string,
      whiteBlue2: string,
      darkBlue: string,
      green: string,
      greenBlue: string,
      blue: string,
      red: string,
      skyBlue: string,
      violet: string,
      orange: string,
      yellow: string
    },
    fontSizes: {
      welcomeHeading_m: number,
      welcomeHeading_d: number
    },
    breakpoints: {
      tablet: number,
      desktop: number
    }
  }
}