
import Skeleton from "react-loading-skeleton";

const SkeletonPost = () => {
  return (
    <section> 
      <div>
        {Array(10)
          .fill([])
          .map((i) => (
            <div key={i} className="z-10 w-40 md:w-56  lg:w-56 2xl:w-56 mx-auto h-88 my-3">
              <Skeleton duration={2} height={300} width={"100%"} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SkeletonPost;