import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import Heading from "../components/Heading";
import MovieHero from "../components/MovieHero";
import MovieCard from "../components/MovieCard";
import PersonCard from "../components/PersonCard";

// Constants
import { youtubeBaseURL } from "../constants/constants";

const Movie = () => {
  const { movie, cast, crew, videos, recommendations } = useLoaderData();

  const { movieId } = useParams();

  const [director, setDirector] = useState([]);

  useEffect(() => {
    getDirectorDetails();
  }, []);

  const getDirectorDetails = () => {
    const result = crew.filter((person) => {
      return person.job === "Director";
    });

    setDirector(result[0]);
  };

  return (
    <div key={movieId}>
      {movie && <MovieHero key={movie.id} movie={movie} director={director} />}

      <div className="container mx-auto px-4 lg:px-8 py-32">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-20">
            <Heading size="md">Top Cast</Heading>
            {cast.length !== 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation
                spaceBetween={32}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1280: {
                    slidesPerView: 5,
                  },
                }}
              >
                {cast.map((person, index) => {
                  if (index < 10) {
                    return (
                      <SwiperSlide key={person.id}>
                        <PersonCard person={person} />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            ) : (
              <div>
                <p>We were unable to find any person for this movie.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-20">
            <Heading size="md">Videos</Heading>
            {videos.length !== 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation
                spaceBetween={32}
              >
                {videos.map((video) => {
                  if (video.type === "Trailer") {
                    return (
                      <SwiperSlide className="video" key={video.id}>
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                          <iframe
                            className="w-full h-full"
                            src={`${youtubeBaseURL}${video.key}`}
                            title={video.name}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            ) : (
              <div>
                <p>We were unable to find any video for this movie.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-20">
            <Heading size="md">You might also like</Heading>
            {recommendations.length !== 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation
                spaceBetween={32}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1280: {
                    slidesPerView: 5,
                  },
                }}
              >
                {recommendations.map((movie, index) => {
                  if (index < 10) {
                    return (
                      <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            ) : (
              <div>
                <p>We were unable to find any recommendation for this movie.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
