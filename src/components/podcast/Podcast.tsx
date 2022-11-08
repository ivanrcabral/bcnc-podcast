import { Fragment, useEffect } from "react";
import { Card, Image, ListGroup, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPodcastDetails } from "../../actions/api.actions";
import PodcastCard from "../../elements/PodcastCard";
import { getLocaleDate, getPathId } from "../../helpers/podcast.helper";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPodcastTrack } from "../../reducers/podcast.reducer";
import { AppDispatch, RootState } from "../../store";
import Header from "../global/header/Header";

function Podcast() {
  const { podcastId } = useParams();
  const dispatch: AppDispatch = useAppDispatch();
  const podcast = useAppSelector((state: RootState) => state.podcast);

  useEffect(() => {
    if (
      podcast.selectedPodcastList &&
      podcast.selectedPodcastList[0] !== undefined
    )
      dispatch(getPodcastDetails(podcast.selectedPodcastList[0].feedUrl));
  }, [podcast.selectedPodcastList]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-7 col-lg-4">
            {podcast &&
              podcast.selectedPodcast &&
              podcast.selectedPodcast.title && (
                <PodcastCard podcast={podcast} />
              )}
          </div>
          <div className="mt-4 mt-sm-0 col-12 col-sm-5 col-lg-8 podcast-details">
            {!podcast.podcastDetail || podcast.podcastDetail.length === 0 ? (
              <Spinner animation="grow" />
            ) : (
              <Fragment>
                <h4 className="mb-3">
                  Episodes: {podcast.podcastDetail.length}
                </h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podcast &&
                      podcast.podcastDetail &&
                      podcast.podcastDetail.map((podc: any) => (
                        <tr key={podc.title}>
                          <td>
                            <Link
                              onClick={() => dispatch(setPodcastTrack(podc))}
                              to={`/podcast/${getPathId(
                                podcast.selectedPodcast["im:name"].label
                              )}/episode/${podc.title}`}
                            >
                              {podc.title}
                            </Link>
                          </td>
                          <td>{getLocaleDate(podc.pubDate)}</td>
                          <td>{podc.duration}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(Podcast);
