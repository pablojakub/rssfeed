import MarkdownView from 'react-showdown';
import { Content, Link, StyledCloseBtn, StyledContentInfo, StyledModalHeader, StyledModalWrapper, StyledOverlay } from './ArticleDetails.styled';
import { ArticleDetailsProps } from './ArticleDetails.types';

const ArticleDetails = (props: ArticleDetailsProps) => {
    const { articleDetails, articleTitle, articleLink, articleSummary } = props;

    return (
        <StyledOverlay onClick={() => props.onClose()}>
            <StyledModalWrapper>
                <StyledCloseBtn onClick={() => props.onClose()}>
                    X
                </StyledCloseBtn>
                <StyledModalHeader>{articleTitle}</StyledModalHeader>
                <Link onClick={() => window.open(articleLink)}>Go to original article</Link>
                <Content>
                    {articleDetails !== undefined ? (
                        <MarkdownView
                            markdown={articleDetails}
                            options={{ tables: true, emoji: true, disableForced4SpacesIndentedSublists: true }}
                        />
                    ) : (
                        <>
                            <MarkdownView
                                markdown={articleSummary}
                                options={{ tables: true, emoji: true, disableForced4SpacesIndentedSublists: true }}
                            />
                            <StyledContentInfo>
                                This is not full content. You can read whole article by following link at the top 🔝
                            </StyledContentInfo>
                        </>

                    )}

                </Content>
            </StyledModalWrapper>
        </StyledOverlay>

    );
};

export default ArticleDetails;
