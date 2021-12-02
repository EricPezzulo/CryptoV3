import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function scroll() {
  const [data, setData] = useState([]);

  const getdata = async () => {
    const res = await axios.get(`http://localhost:5000/api/posts`);
    setData(res.data);
  };

  //   useEffect(() => {
  //     const getdata = async () => {
  //       const res = await axios.get(`http://localhost:5000/api/posts`);
  //       setData(res.data);
  //     };
  //     getdata();
  //   }, []);
  //   console.log(data.length);

  return (
    <div className="flex h-full w-full">
      <p>test scrolling</p>
      <div>
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={getdata}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
        >
          {data}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default scroll;
