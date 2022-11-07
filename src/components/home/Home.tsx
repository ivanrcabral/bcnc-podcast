import { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getPodcasts, getPodcast } from "../../actions/api.actions"
import { getPathId } from "../../helpers/podcast.helper"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { AppDispatch } from "../../store"
import Breadcrum from "../global/breadcrum/Breadcrum"
import Header from "../global/header/Header"

function Home(){
    
    const podcasts: any[] = useAppSelector(state => state.podcast.podcasts)
    const dispatch:AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPodcasts());
    },[])

    return (<div className="col-12">
        <Header/>
        { podcasts.map((podcast: any) => (
            <Link key={podcast.id.attributes['im:id']} onClick={()=> dispatch(getPodcast(podcast.id.attributes['im:id'], podcast)) } to={`/podcast/${getPathId(podcast["im:name"].label)}`}>{podcast.title.label}</Link>
        ))}
    </div>)
}

export default connect()(Home);
