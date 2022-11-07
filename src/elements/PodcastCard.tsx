import { Card } from "react-bootstrap";


export default function PodcastCard(props: {podcast:any}){
    const getLastImage = (images: any[]) => {
        console.log({images})
        let image:{label: string} = {label:''}
        image = images[images.length - 1]
        return image.label ? image.label:"URLIMGDEFAULT"
    }

    return (
        <Card style={{ width: '18rem' }}>
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