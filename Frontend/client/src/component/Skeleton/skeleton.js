import React from "react";
import { Skeleton } from "antd";
const SkeletonImage = () => (
  <Skeleton
    avatar
    paragraph={{
      rows: 4,
    }}
  />
);
export default SkeletonImage;
