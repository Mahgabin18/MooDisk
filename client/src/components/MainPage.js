import React, { useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import { createApi, toJson } from "unsplash-js";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const api = createApi({
        // TAKE OUT THIS ACCESS KEY BEFORE GIT PUSHING
        accessKey: "p55OV837XTRngIgJA4phnnQHufPJowmk9Fq7vXaCYes",
});
    

export default function MainPage() {
    const [query, setQuery] = useState("");
    // console.log(query);

    const searchPhotos = async (e) => {
        // e.preventDefault() stops the page from reloading whenever the submit button is clicked. 
        e.preventDefault(); 
        // console.log("Submitting the Form")
        // createApi.search
        //     .photos(query)
        //     .then(toJson)
        //     .then((json) => {
        //         console.log(json);
        //     });
        // THIS BELOW IS THE NEW VERSION TO CODE HOW TO SEARCH FOR THE IMAGE INSTEAD OF THE BIG CODE ABOVE
        // unsplash.search is now api.search instead
        api.search.getPhotos({
            query: query
        }).then(result=>{console.log(result.response)})   
            // could be result or result.response idk,,,
            //    
    };    


    return (
        <div>
            <h1>MAIN PAGE</h1>
            <form className="form" onSubmit={searchPhotos}> 
                <label className="label" htmlFor="query"> 
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        </div>
    );
}