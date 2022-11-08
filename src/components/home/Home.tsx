import { SetStateAction, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getPodcasts, getPodcast } from "../../actions/api.actions"
import { getLastImage, getPathId } from "../../helpers/podcast.helper"
import { useAppDispatch, useAppSelector } from "../../hooks"
import PodcastModel from "../../models/Podcast.model"
import { resetPodcastsDetails } from "../../reducers/podcast.reducer"
import { AppDispatch } from "../../store"
import Header from "../global/header/Header"

function Home(){
    
    const podcasts: PodcastModel[] = useAppSelector(state => state.podcast.podcasts)
    const dispatch:AppDispatch = useAppDispatch()

    const [filteredPodcast, setFilteredPodcast] = useState<PodcastModel[]>([])

    useEffect(() => {
        dispatch(resetPodcastsDetails());
        dispatch(getPodcasts());
    },[])

    useEffect(()=> {
        setFilteredPodcast(podcasts)
    }, [podcasts])

    const findPodcast = (elem: {value: string}) => {
        const filtered = podcasts.filter((podcast: PodcastModel) => podcast["im:name"].label.toLowerCase().indexOf(elem.value.toLowerCase()) !== -1)
        setFilteredPodcast(filtered)
    }

    return (<div className="col-12">
        <Header/>
        <div className="mb-4 col-12">
            <input className="input-search" onChange={(event) => findPodcast(event.target)} placeholder="Buscar..."/>
        </div>
        <div className="d-flex flex-wrap justify-content-evenly">
            { filteredPodcast.map((podcast: any) => (
                <Link key={podcast.id.attributes['im:id']} onClick={()=> dispatch(getPodcast(podcast.id.attributes['im:id'], podcast)) } to={`/podcast/${getPathId(podcast["im:name"].label)}`} className="podcast-box">
                    <img src={getLastImage(podcast['im:image'])} />
                    <h5>{podcast.title.label}</h5>
                    <small>Author: {podcast['im:artist'].label}</small>
                </Link>
            ))}
        </div>
       
    </div>)
}

export default connect()(Home);
