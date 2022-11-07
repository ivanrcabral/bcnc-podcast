import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PodcastCard from "../../elements/PodcastCard";
import { useAppSelector } from "../../hooks";
import { RootState, store } from "../../store";
import Breadcrum from "../global/breadcrum/Breadcrum";
import Header from "../global/header/Header";
import ReactHtmlParser from 'react-html-parser';
 

export function PodcastChapter(){
    const { podcastId, episodeId } = useParams();
    const podcast = useAppSelector((state: RootState) => state.podcast)

    useEffect(()=> {
        console.log(podcast)
    },[])

    return (
        <div>
            <Header/>
            {<Breadcrum crum={[podcastId ?? '', episodeId ?? '' ]} />}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        { podcast && podcast.selectedPodcast && podcast.selectedPodcast.title && (
                            <PodcastCard podcast={podcast}/>
                        )}
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>{podcast.podcastTrack.title}</h2>
                        <p>{ReactHtmlParser(podcast.podcastTrack.description)}</p>
                        <audio controls>
                            <source src={podcast.podcastTrack.audioSrc} type={podcast.podcastTrack.audioType} />
                            Your browser does not support the audio element.
                        </audio> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(PodcastChapter);