import React ,{ useEffect, useState, useCallback } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

const HomeContainer = () => {
    const [nowPlaying, setNow] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [checking, setChecking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [type, setType] = useState("");

    const [nowSwipe, setNowSwipe] = useState({
        "title" : "",
        "arr" : []
    });
    const [upSwipe, setUpSwipe] = useState({
        "title" : "",
        "arr" : []
    });
    const [isCheck, setCheck] = useState(false);
    const [value_black, setValue] = useState()

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
    
    // 검색
    // const reGex = (keyword) => {
    //     const reg_value = new RegExp(keyword, "gi");
    //     return reg_value;
    // }
    useEffect(()=>{
        const getData = () => {
            // const xxx = reGex(value_black);
            // let matchArray = nowPlaying.filter((now)=>(now.original_title.match(xxx)));
            
            if(checking.length === 0) {
                let matchArray = []
                if(type === "genre") {
                    matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(value_black)));
                }
                if(type === "type1") {
                    // 
                }
                if(type === "type2") {
                    // 
                }
                setChecking(matchArray)
                console.log("true", matchArray, "0")
            } 
            else if (checking.length > 0 && type === "genre") {
                let matchArray = []
                if(type === "genre") {
                    matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(value_black)));
                }
                if(type === "type1") {
                    // 
                }
                if(type === "type2") {
                    // 
                }
                setChecking(matchArray)
                console.log("true", matchArray, "> 0")
            }
            
            setCheck("");
        }
        const getDate = () => {
            setChecking([])
            let unitArr = [];
            const checes = Array.from(document.querySelectorAll(".chec"));
            let chk = false;
            checes.forEach((chec)=>{
                const { checked, value } = chec;
                chk = chk||checked;
                if(chk) {
                    const parseValue = parseInt(value);
                    if(unitArr.length === 0 && checked) {
                        let matchArray = []
                        if(type === "genre"){
                            matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(parseValue)));
                        } 
                        else if (type === "type1") {
                            // 
                        }
                        else if (type === "type2") {
                            // 
                        }
                        
                        unitArr = [...unitArr, ...matchArray]
                        setChecking(unitArr);
                    } else if(unitArr.length > 0 && checked) {
                        let matchArray = []
                        if(type === "genre"){
                            matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(parseValue)));
                        } 
                        else if (type === "type1") {
                            // 
                        }
                        else if (type === "type2") {
                            // 
                        }
                        setChecking(matchArray);
                    } 
                    console.log("o")
                } else {
                    console.log("x")
                    setChecking([]);
                }
                
            })
            setCheck("");
        }
        if(isCheck === "true") {
            getData();
        } else if (isCheck === "false") {
            getDate();
        }
    },[isCheck, value_black, nowPlaying, checking, type]);

    const handleCheck = (event) => {
        const { target : {value, checked, dataset : {type}} } = event;
        setType(type);

        const value_parse = parseInt(value)
        if(checked) {
            setCheck("true");
            setValue(value_parse)
        } else {
            setCheck("false");
        }
    }

    return (
        
        <HomePresenter 
            error={error}
            loading={loading}
            nowSwipe={nowSwipe}
            upSwipe={upSwipe}
            nowPlaying={nowPlaying}
            upcoming={upcoming}
            popular={popular}
            handleCheck={handleCheck}
            checking={checking}
        />
    )
}

export default HomeContainer;