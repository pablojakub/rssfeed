import MarkdownView from 'react-showdown';
import styled from 'styled-components';

const StyledOverlay = styled.div`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
`

export const StyledModalWrapper = styled.div`
    position: fixed;
    padding: 8px 16px;
    max-width: 500px;
     width: 100%;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 5;
`;

export const StyledCloseBtn = styled.div`
    float: right;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.labelColor}
`;

export const Content = styled.div`
    text-align: center;
    max-height: 65vh;
    overflow: auto;

    figure {
        text-align: center;
        max-width: 460px;
        margin-block: 8px;
    }

    .social-icon {
        display: none;
    }

    div[class*="credits"] {
        display: none;
    } 

    div[class*="topic-cards"] {
        display: none;
    } 

    section[class*="related-articles"] {
        display: none;
    } 
`;

export const StyledModalHeader = styled.h3`
    color: black;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    margin-top: 24px;
`

export const Link = styled.p`
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
`;

export const StyledContentInfo = styled.h4`
    color: black;
    font-size: .8rem;
    font-weight: 700;
    text-align: center;
    margin-block: 24px;
`

export type ArticleDetailsProps = {
    articleDetails: string;
    articleTitle: string;
    articleLink: string;
    articleSummary: string;
    onClose: () => void;
};

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
