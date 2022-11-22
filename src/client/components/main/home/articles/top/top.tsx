import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { TopArticle } from "./article"
import { 
  MainContentContainer,
  RemainingTopArticles,
  TopArticlesWithImage, 
  TopArticlesWrapper } from "./top.styled"


const Top = () =>{
  const { topArticles } = useSelectArticles()

  const renderTopArticlesWithImage = () =>{
    const topArticlesWithImage = topArticles.slice(0, 3).map((article, index) => (
      <TopArticle
        key={ article.title + index }
        article={ article }
        hideCaption={ false } />
    ))

    return topArticlesWithImage
  }

  const renderRemainingTopArticles = () =>{
    const remainingTopArticles = topArticles.slice(3).map((article, index) => (
      <TopArticle
        key={ article.title + index }
        article={ article }
        hideCaption={ true } />
    ))

    return remainingTopArticles
  }

  return (
    <TopArticlesWrapper>
      <InitArticleMainHeading>
        <span>Top Articles</span>
      </InitArticleMainHeading>
      <MainContentContainer>
        <TopArticlesWithImage>
          { renderTopArticlesWithImage() }
        </TopArticlesWithImage>
        { topArticles.length > 3 && (
          <RemainingTopArticles>
            { renderRemainingTopArticles() }
          </RemainingTopArticles>
        ) }
      </MainContentContainer>
    </TopArticlesWrapper>
  )
}


export default Top