import React, { useState, useEffect, useCallback } from "react";
import MorePresenter from "./MorePresenter";
import { moviesApi } from "api";

const MoreContainer = ({location}) => {
    

    return (
        <div>
            <button onClick={()=>{onMorePage()}}>more</button>
        </div>
        
    )
}

export default MoreContainer;