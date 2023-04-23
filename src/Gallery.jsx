import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useGlobalContext } from "./context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const url = `https://api.unsplash.com/search/photos/?client_id=${
    import.meta.env.VITE_API_KEY
  }`;

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  console.log(response);

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>there was an error</h4>
      </section>
    );
  }

  if (response.data.results.length < 1) {
    return (
      <section className="image-container">
        <h4>Ooops... no images found :( </h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {response.data.results.map((item) => {
        const imgUrl = item?.urls?.regular;
        return (
          <img
            src={imgUrl}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
