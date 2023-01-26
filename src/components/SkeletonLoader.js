import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoader = ({ pageType }) => {
  return (
    <>
      {pageType === "login" ? (
        <>
          <Skeleton variant="text" height="60px" width="100%" sx={{mt:"50px"}} />{" "}
          <Skeleton variant="text" width={"100%"} height="60px" sx={{mt:"50px"}} />
        </>  
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between",marginTop:'50px' }}>
            <Skeleton variant="text" width={"40%"} height="60px" />{" "}
            <Skeleton variant="text" width={"40%"} height="60px" />
          </div>
          <Skeleton variant="text" width={"100%"} height="60px" sx={{mt:'50px'}} />
          <Skeleton variant="text" width={"100%"} height="60px" sx={{mt:'50px'}} />
          <Skeleton variant="rectangle" width={"100%"} height="100px" sx={{mt:'50px'}} />
          <Skeleton variant="text" width={"100%"} height="60px" sx={{mt:'50px'}} />
          <Skeleton variant="text" width={"100%"} height="60px" sx={{mt:'50px'}} />
  
          
        </>
      )}
    </>
  );
};

export default SkeletonLoader;
