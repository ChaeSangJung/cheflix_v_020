import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import SwiperContent from "Components/SwiperContent";
import Section from "Components/Section";

import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const WrapVisual = styled.div``
const Container = styled.div`
  padding: 20px;
`;

const HomePresenter = ({error, loading, nowSwipe, upSwipe, nowPlaying, upcoming, popular ,handleCheck, checking}) => {
    // console.log(upcoming, popular,error)    
    console.log(checking)
    return (
        <>
            <Helmet title="Movies | Cheflix"/>
            {loading ? (<Loader/>) : (
                <>
                    <WrapVisual>
                        <Swiper 
                            tag="div" 
                            wrapperTag="div" 
                            id="mainMovieVisual"
                            navigation 
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            loop={true}
                            spaceBetween={0} 
                            slidesPerView={1}
                        >
                            {nowSwipe.arr && nowSwipe.arr.length > 0 && (
                                nowSwipe.arr.map((now)=>(
                                    <SwiperSlide key={`now_${now.id}_${Date.now()}`}>
                                        <SwiperContent content={now} isMovie={true} title={nowSwipe.title}/>
                                    </SwiperSlide>
                                ))
                            )}
                            {upSwipe.arr && upSwipe.arr.length > 0 && (
                                upSwipe.arr.map((up, index) => (
                                    <SwiperSlide key={`${up.id}_${index}`}>
                                        <SwiperContent content={up} isMovie={true} title={upSwipe.title}/>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </WrapVisual>
                    <Container>
                        {nowPlaying && nowPlaying.length > 0 && (
                            <Section title="Now Playing" link="/now_more">
                                <input className="chec" data-type = "genre" type="checkbox" value="35" onChange={handleCheck}/>
                                <input className= "chec" data-type = "genre" type="checkbox" value="878" onChange={handleCheck}/>
                                <input className="chec" data-type = "genre" type="checkbox" value="10751" onChange={handleCheck}/>
                                
                                {nowPlaying.map((movie)=>(
                                    <div key={movie.id}>
                                        {movie.id}
                                        {movie.poster_path}
                                        {movie.original_title}
                                        {movie.vote_average}
                                        {movie.release_date.substring(0, 4)}
                                    </div>
                                ))}
                            </Section>
                        )}
                    </Container>
                </>
            )}
            
        </>
        
    )
}

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    popular: PropTypes.array,
    upcoming: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    year: PropTypes.string,
};

export default HomePresenter;