import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import SwiperContent from "../../Components/SwiperContent";

import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const WrapVisual = styled.div``

const HomePresenter = ({error, loading, nowSwipe, upSwipe, nowPlaying, upcoming, popular}) => {
    console.log(nowPlaying, upcoming, popular,error)    
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