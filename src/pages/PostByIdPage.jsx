import { useState } from "react";
import { useGetPostById } from "../post-by-id/data-access-post-by-id/useGetPostById";
import { CardByIdList } from "../components/card-by-id-list/CardByIdList";
import { CardById } from "../components/card-by-id/CardById";
import { Modal } from "../post-by-id/modal/Modal";

const SAMPLE = 1088;

export const PostByIdPage = ({ recipientId = SAMPLE }) => {
  const [clickedPost, setClickedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetPostById(recipientId);
  const posts = data?.results;

  const handleClick = (post) => {
    setClickedPost(post.id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal
          post={posts?.find((post) => post.id === clickedPost)}
          onClose={handleClose}
        />
      )}

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
