import { 
  ArticleWrapper,
  ArticleBannerContainer,
  ArticleCaption, 
  ArticleImageCaption, 
  ArticleTitle, 
  ArticleControls,
  ShareToFacebook,
  CopyLink,
  CopyLinkToast,
  AuthorsDateContainer} from "./article.styled"
import { FacebookShareButton } from "react-share"
import { 
  useArticle, 
  useArticleSlate } from "./article.hook"
import { SrOnly } from "@/styled/shared/helpers"
import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { 
  Editable, 
  Slate } from "slate-react"


const Article = () =>{
  const {
    article,
    url,
    clipboard,
    showToast,
    handleCopyLink,
  } = useArticle()
  const {
    editor,
    initialValue,
    renderElement,
    renderLeaf
  } = useArticleSlate(article)

  if ( !article || !initialValue ) {
    return <></>
  }

  return (
    <ArticleWrapper>
      <ArticleTitle>{ article.title }</ArticleTitle>
      <ArticleCaption>{ article.caption }</ArticleCaption>
      <ArticleBannerContainer>
        <img
          src={ article.banner.url }
          alt={ article.banner.caption } />
        <ArticleImageCaption>{ article.banner.caption }</ArticleImageCaption>
      </ArticleBannerContainer>
      <ArticleControls>
        <ShareToFacebook>
          <FacebookShareButton
            url={ url }>
              <img 
                src="/icons/icon-facebook.svg"
                alt="" />
          </FacebookShareButton>
        </ShareToFacebook>
        <CopyLink onClick={ handleCopyLink }>
          <SrOnly
            as="input"
            type="text"
            tabIndex={ -1 }
            defaultValue={ url } 
            ref={ clipboard }
            aria-hidden="true" />
          <img
            src="icons/icon-paste-link.svg"
            alt="" />
          copy link
          { showToast && <CopyLinkToast>Copied!</CopyLinkToast> }
        </CopyLink>
      </ArticleControls>
      <AuthorsDateContainer>
        <ArticleAuthors authors={ article.authors } />
        <ArticleDate date={ article.createdAt } />
      </AuthorsDateContainer>
      <Slate
        editor={ editor }
        value={ initialValue }>
        <Editable
          readOnly={ true }
          renderElement={ renderElement }
          renderLeaf={ renderLeaf } />
      </Slate>
    </ArticleWrapper>
  )
}


export default Article