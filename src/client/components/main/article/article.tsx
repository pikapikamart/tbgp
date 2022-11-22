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
import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { 
  Editable, 
  Slate } from "slate-react"
import { FourOhFour } from "@/components/shared/404"
import { CopyToClipboard } from "react-copy-to-clipboard"


const Article = () =>{
  const {
    article,
    url,
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
    return (
      <FourOhFour>
        Try checking the articles name if it is correct
      </FourOhFour>
    )
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
        <CopyToClipboard text={ url } >
            <CopyLink onClick={ handleCopyLink }>
            <img
              src="icons/icon-paste-link.svg"
              alt="" />
            { showToast && <CopyLinkToast>Copied!</CopyLinkToast> }
            </CopyLink>
        </CopyToClipboard>
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