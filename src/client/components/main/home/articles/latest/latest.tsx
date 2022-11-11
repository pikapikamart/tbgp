import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import Link from "next/link"
import { LatestArticle } from "./article"
import { 
  ArticlesList,
  LatestArticlesWrapper, 
  LatestContentContainer, 
  SectionHeaderContainer, 
  SeeAll} from "./latest.styled"


const Latest = () => {
  const articles = useSelectArticles()

  const renderLatestArticles = () =>{
    const latestArticles = articles.latestArticles.map(article => (
      <LatestArticle
        key={ article.title }
        article={ article } />
    ))

    return latestArticles
  }

  return (
    <LatestArticlesWrapper>
      <LatestContentContainer>
        <SectionHeaderContainer>
          <InitArticleMainHeading alignment="left">
            <span>Latest Stories</span>
          </InitArticleMainHeading>
          <Link 
            href="/articles"
            passHref>
            <SeeAll>See All</SeeAll>
          </Link>
        </SectionHeaderContainer>
        <ArticlesList>
          { renderLatestArticles() }
        </ArticlesList>
      </LatestContentContainer>
    </LatestArticlesWrapper>
  )
}


export default Latest