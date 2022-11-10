import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ProfileSkeleton = () => {
  return (
    <section> 
    <div>
      {Array(1)
        .fill([])
        .map((i) => (
          <div key={i} className="w-52 h-52 ">
            <Skeleton className='rounded-full' duration={2} height={208} width={"100%"} />
          </div>
        ))}
    </div>
  </section>
  )
}

export default ProfileSkeleton