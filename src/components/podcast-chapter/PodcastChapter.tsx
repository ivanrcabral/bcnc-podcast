import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PodcastCard from "../../elements/PodcastCard";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
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
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 col-lg-4">
                        { podcast && podcast.selectedPodcast && podcast.selectedPodcast.title && (
                            <PodcastCard podcast={podcast}/>
                        )}
                    </div>
                    <div className="mt-4 mt-sm-0 col-12 col-sm-5 col-lg-8 podcast-details">
                        <h2 className="mb-3">{podcast.podcastTrack.title}</h2>
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