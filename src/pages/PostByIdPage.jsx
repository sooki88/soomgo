import { useEffect, useState } from "react";
import { useGetPostById } from "../post-by-id/data-access-post-by-id/useGetPostById";
import { CardByIdList } from "../components/card-by-id-list/CardByIdList";
import { CardById } from "../components/card-by-id/CardById";
import { Modal } from "../post-by-id/modal/Modal";

const SAMPLE = 1088;

export const PostByIdPage = ({ recipientId = SAMPLE }) => {
  // 질문: 왜 prop의 recipientId를 {} 넣어야 작동을 할까요?

  const [posts, setPosts] = useState(null);
  const [clickedPost, setClickedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetPostById(recipientId);

  const sortedData = () => {
    setPosts(data?.results.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleClick = (post) => {
    setClickedPost(post.id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    sortedData();
  }, [recipientId]);

  return (
    <div>
      {showModal && (
        <Modal
          post={data?.results.find((post) => post.id === clickedPost)}
          onClose={handleClose}
        />
      )}

      {/* 질문1: onClick과 onClose의 차이
      질문2: 왜 어떤건 onClick={()=>}이고 어떤건 onClick={}인가요? */}

      <CardByIdList>
        {posts?.map((post) => (
          <CardById key={post.id} {...post} onClick={() => handleClick(post)}>
            {post.sender}
          </CardById>
        ))}
      </CardByIdList>
    </div>
  );
};
