import { Card } from "react-bootstrap";
import { getLastImage } from "../helpers/podcast.helper";
import { SateInterface } from "../reducers/podcast.reducer";


export default function PodcastCard(props: {podcast:SateInterface}){

    return (
        <Card className="margin-auto" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={getLastImage(props.podcast.selectedPodcast["im:image"])} />
            <Card.Body>
                <Card.Text>
                    <div className="mb-4">
                        <h4><b>{ props.podcast.selectedPodcast.title.label }</b></h4>
                        <small><i>by { props.podcast.selectedPodcast["im:artist"].label }</i></small>    
                    </div>
                    <hr />
                    <b>Description:</b>
                    <p>{ props.podcast.selectedPodcast.summary.label }</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}