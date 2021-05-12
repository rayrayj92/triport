import React from "react";
import styled from "styled-components";
import { BoardView, BoardComment, BoardDetailMap } from "components/components";
import { LikeFill, LikeEmpty } from "media/svg/Svg";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';
import InfinityScroll from "shared/InfinityScroll";

const BoardDetail = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.trilog.detail);
    const comment = useSelector((state) => state.trilog.parent_comment.list);
    const is_last = useSelector((state) => state.trilog.parent_comment.is_last);
    const commentRef = React.useRef('');

    React.useEffect(() => {
        dispatch(TrilogActions.getTrilogDetail(id));
    }, []);

    const postParentComment = () => {
        dispatch(TrilogActions.addParentComment(id, commentRef.current.value));
        document.getElementById('commentInput').value = ''; // 초기화
    };

    const hitLike = () => {
        dispatch(TrilogActions.setLikeTrilogDetail(id));
    };

    const scroll = () => {
        console.log('comment scroll');
        dispatch(TrilogActions.getParentCommentScroll(id));
    };

    return(
        <DetailContainer>
            <UserContainer>
                <div>
                    <img src={detail.author.profileImgUrl} />
                    <span>{detail.author.nickname}</span>
                </div>
                <div>
                    마지막 수정시간 : {detail.information.modifiedAt}
                    {detail.member.isMembers ? (<> <input type="button" value="수정" /> <input type="button" value="삭제" /> </>) : (<></>) }
                </div>
            </UserContainer>
            <Separator/>
            <ToastViewContainer>
                {detail.information.description === '' ? (<></>) : (<BoardView content={detail.information.description} />) }
            </ToastViewContainer>
            <MapConatiner>
                {detail.information.address === '' ? (<></>) : (<BoardDetailMap address={detail.information.address} />) }
            </MapConatiner>
            <Separator/>
            <LikeCommentContainer>
                <Infomation>
                    <span onClick={hitLike}>
                        { detail.member.isLike ? ( <LikeFill/> ) : ( <LikeEmpty/> ) }
                    </span>
                    <div>
                        <span>좋아요+</span>
                        <LikeCount>{detail.information.likeNum}</LikeCount>
                    </div>
                    <div>
                        <span>댓글+</span>
                        <CommentCount>{detail.information.commentNum}</CommentCount>
                    </div>
                </Infomation>
                <CommentInput>
                    <input id="commentInput" type="text" placeholder="댓글을 입력하세요." ref={commentRef} onKeyPress={(e) => {
                        if(window.event.keyCode === 13) {
                            postParentComment();
                        } 
                    }}/>
                </CommentInput>
                <Separator />
                <InfinityScroll
                    callNext={scroll}
                    is_next={is_last}
                >
                    {comment.map((val, index) => {
                        return(
                            <BoardComment id={id} comment={val} key={index} />
                        );
                    })}
                </InfinityScroll>
            </LikeCommentContainer>
        </DetailContainer>
    );
};

const Separator = styled.hr`
  color: #89acff;
  opacity: 0.5;
  margin: 0.75rem 0;
`;

const DetailContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  position: relative;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-family: AppleSDGothicNeoB;

    & img {
        width: 2.375rem;
        border-radius: 50%;
        margin-right: .5rem;
    }

    & div {
        display: flex;
        align-items: center;
    }
`;

const LikeCount = styled.span`
  margin-right: 0.5rem;
`;

const CommentCount = styled.span``;

const ToastViewContainer = styled.div``;

const MapConatiner = styled.div``;

const LikeCommentContainer = styled.div`
  width: 100%;
`;

const Infomation = styled.div`
  display: flex;
  align-items: center;
  font-family: "AppleSDGothicNeoR";

  & svg {
    cursor: pointer;
    width: 3.2rem;
  }
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;

  & input {
    outline: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border: 1px solid #707070;
    border-radius: 5px;
    padding: 0 1rem;
  }
`;

export default BoardDetail;
