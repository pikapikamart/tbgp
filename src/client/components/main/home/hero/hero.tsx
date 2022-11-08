import { 
  HeroCaption,
  HeroContentContainer, 
  HeroHeading, 
  HeroLogo, 
  HeroWrapper } from "./hero.styled"


const Hero = () =>{

  return (
    <HeroWrapper>
      <HeroContentContainer>
        <HeroLogo 
          src="/logos/logo-prmsu.svg"
          alt="President Ramon Magsaysay State University" />
          <HeroHeading>upholding one's principle, transcending the limits</HeroHeading>
          <HeroCaption>The Official Student Publication Of President Ramon Magsaysay State University Main Campus - Iba</HeroCaption>
      </HeroContentContainer>
    </HeroWrapper>
  )
}


export default Hero