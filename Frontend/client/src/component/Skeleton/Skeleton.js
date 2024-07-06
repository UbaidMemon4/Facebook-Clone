import React from "react";
import { Skeleton } from "antd";
const SkeletonImage = () => (
  <Skeleton
    className="mb-10 "
    avatar
    paragraph={{
      rows: 4,
    }}
  />
);
export default SkeletonImage;
