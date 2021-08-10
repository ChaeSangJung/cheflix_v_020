// const [checking, setChecking] = useState([]);
// const [type, setType] = useState("");
// const [isCheck, setCheck] = useState(false);
// const [value_black, setValue] = useState();

// 검색
// const reGex = (keyword) => {
//     const reg_value = new RegExp(keyword, "gi");
//     return reg_value;
// }
// useEffect(()=>{
//     const getData = () => {
//         // const xxx = reGex(value_black);
//         // let matchArray = nowPlaying.filter((now)=>(now.original_title.match(xxx)));
        
//         if(checking.length === 0) {
//             let matchArray = []
//             if(type === "genre") {
//                 matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(value_black)));
//             }
//             if(type === "type1") {
//                 // 
//             }
//             if(type === "type2") {
//                 // 
//             }
//             setChecking(matchArray)
//             console.log("true", matchArray, "0")
//         } 
//         else if (checking.length > 0 && type === "genre") {
//             let matchArray = []
//             if(type === "genre") {
//                 matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(value_black)));
//             }
//             if(type === "type1") {
//                 // 
//             }
//             if(type === "type2") {
//                 // 
//             }
//             setChecking(matchArray)
//             console.log("true", matchArray, "> 0")
//         }
        
//         setCheck("");
//     }
//     const getDate = () => {
//         setChecking([])
//         let unitArr = [];
//         const checes = Array.from(document.querySelectorAll(".chec"));
//         let chk = false;
//         checes.forEach((chec)=>{
//             const { checked, value } = chec;
//             chk = chk||checked;
//             if(chk) {
//                 const parseValue = parseInt(value);
//                 if(unitArr.length === 0 && checked) {
//                     let matchArray = []
//                     if(type === "genre"){
//                         matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(parseValue)));
//                     } 
//                     else if (type === "type1") {
//                         // 
//                     }
//                     else if (type === "type2") {
//                         // 
//                     }
                    
//                     unitArr = [...unitArr, ...matchArray]
//                     setChecking(unitArr);
//                 } else if(unitArr.length > 0 && checked) {
//                     let matchArray = []
//                     if(type === "genre"){
//                         matchArray = nowPlaying.filter((now)=>(now.genre_ids.includes(parseValue)));
//                     } 
//                     else if (type === "type1") {
//                         // 
//                     }
//                     else if (type === "type2") {
//                         // 
//                     }
//                     setChecking(matchArray);
//                 } 
//                 console.log("o")
//             } else {
//                 console.log("x")
//                 setChecking([]);
//             }
            
//         })
//         setCheck("");
//     }
//     if(isCheck === "true") {
//         getData();
//     } else if (isCheck === "false") {
//         getDate();
//     }
// },[isCheck, value_black, nowPlaying, checking, type]);

// const handleCheck = (event) => {
//     const { target : {value, checked, dataset : {type}} } = event;
//     setType(type);

//     const value_parse = parseInt(value)
//     if(checked) {
//         setCheck("true");
//         setValue(value_parse)
//     } else {
//         setCheck("false");
//     }
// }

{/* <HomePresenter
    handleCheck={handleCheck}
    checking={checking}
/> */}