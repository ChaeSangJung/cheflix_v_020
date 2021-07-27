import React ,{ useEffect, useState, useCallback } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

const HomeContainer = () => {
    const [nowPlaying, setNow] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [nowSwipe, setNowSwipe] = useState({
        "title" : "",
        "arr" : []
    });
    const [upSwipe, setUpSwipe] = useState({
        "title" : "",
        "arr" : []
    });

    const LoadPage = async ()=> {
        const {
            data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
            data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
            data: { results: popular },
        } = await moviesApi.popular();
        setNow(nowPlaying);
        setUpcoming(upcoming);
        setPopular(popular);

        if(nowPlaying && nowPlaying.length > 0) {
            const now_my = nowPlaying.filter((now) => now.vote_average >= 8.4);
            setNowSwipe({
                "title" : "Now Playing",
                "arr" : now_my
            });
        }
        if(upcoming && upcoming.length > 0) {
            const up_temp = upcoming.slice(0,2);      
            const up_Black_Widow = upcoming.filter((up) => up.title.includes("Black Widow"))
            let up_my = [...up_Black_Widow, ...up_temp];

            setUpSwipe({
                "title" : "Upcoming",
                "arr" : up_my
            });
        }
    }

    const LoadData = useCallback(async () => {
        try {
            LoadPage();
        } catch {
            setError("Can't find movie information.");
        } finally {
            setLoading(false);
        }
    },[])

    useEffect(() => {
        LoadData();
        return LoadData();
      }, [LoadData]);

    return (
        <HomePresenter 
            error={error}
            loading={loading}
            nowSwipe={nowSwipe}
            upSwipe={upSwipe}
            nowPlaying={nowPlaying}
            upcoming={upcoming}
            popular={popular}
        />
    )
}

export default HomeContainer;