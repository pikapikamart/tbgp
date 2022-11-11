import { LatestArticlesSection } from "./articles/latest"
import { TopArticlesSection } from "./articles/top"
import { HomeHeroSection } from "./hero"


const Home = () =>{

  return (
    <main>
      <HomeHeroSection />
      <TopArticlesSection />
      <LatestArticlesSection />
    </main>
  )
}


export default Home