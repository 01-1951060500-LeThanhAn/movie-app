import React from "react";
import Skeleton from "react-loading-skeleton";
import "./SkeletonCard.css";
const SkeletonPost = () => {
  return (
    <section>
      <div>
        {Array(10)
          .fill()
          .map((item) => (
          
              <div className="card-image" key={item}>
                <Skeleton duration={2} height={400} width={"100%"} />
              </div>
          
          ))}
      </div>
    </section>
  );
};

export default SkeletonPost;
