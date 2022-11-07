import { useEffect } from "react";
import { Card, Image, ListGroup, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPodcastDetails } from "../../actions/api.actions";
import PodcastCard from "../../elements/PodcastCard";
import { getPathId } from "../../helpers/podcast.helper";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPodcastTrack } from "../../reducers/podcast.reducer";
import { AppDispatch, RootState } from "../../store";
import Breadcrum from "../global/breadcrum/Breadcrum";
import Header from "../global/header/Header";

function Podcast(){
    const { podcastId } = useParams();
    const dispatch:AppDispatch = useAppDispatch()
    const podcast = useAppSelector((state: RootState) => state.podcast)
    
    useEffect(()=> {
        console.log(podcast)
        if (podcast.selectedPodcastList && podcast.selectedPodcastList[0] !== undefined )
            dispatch(getPodcastDetails(podcast.selectedPodcastList[0].feedUrl))
    },[podcast.selectedPodcastList])

  
    return (
        <div>
            <Header/>
            {<Breadcrum crum={[podcastId ?? '']} />}
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        { podcast && podcast.selectedPodcast && podcast.selectedPodcast.title && (
                            <PodcastCard podcast={podcast}/>
                        )}
                    </div>
                    <div className="col-12 col-md-6">
                        <div>Episodes: {podcast.podcastDetail.length }</div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                            { podcast && podcast.podcastDetail && podcast.podcastDetail.map( (podc: any) => (
                                <tr key={podc.title}>
                                    <td><Link onClick={()=> dispatch(setPodcastTrack(podc)) } to={`/podcast/${getPathId(podcast.selectedPodcast["im:name"].label)}/episode/${podc.title}`}>{podc.title}</Link></td>
                                    <td>{podc.pubDate}</td>
                                    <td>{podc.duration}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
           
            {/* <Link to={/podcast/12/episode/2}>details</Link> */}
        </div>
    )
}

export default connect()(Podcast);

