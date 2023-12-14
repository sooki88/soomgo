import { useState } from "react";
import { CardByIdList } from "../components/card-by-id-list/CardByIdList";
import { CardById } from "../components/card-by-id/CardById";
import { useGetPostById } from "../post-by-id/data-access-post-by-id/useGetPostById";
import { Modal } from "../post-by-id/modal/Modal";

const SAMPLE = 849;

export const PostByIdPage = ({ selectedId = SAMPLE }) => {
  const [modalShow, setModalShow] = useState(false);
  const [clickId, setClickId] = useState(null);

  const { data } = useGetPostById(selectedId);

  const sortedData = data?.results.sort((a, b) => b.createdAt - a.creactedAt);

  const handleClick = (post) => {
    setClickId(post.id);
    setModalShow(true);
  };

  return (
    <>
      {modalShow && (
        <Modal post={sortedData.find((post) => post.id === clickId)} />
      )}
      <CardByIdList>
        {sortedData?.map((post) => (
          <CardById key={post.id} {...post} onClick={() => handleClick(post)}>
            {post.sender}
          </CardById>
        ))}
      </CardByIdList>
    </>
  );
};
