import { createSlice } from "@reduxjs/toolkit";
import PodcastModel from "../models/Podcast.model";
import PodcastDetailModel from "../models/PodcastDetail.model";
import PodcastTrackModel from "../models/PodcastTrack.model";
import SelectedPodcastModel from "../models/SelectedPodcast.model";


const initialState = {
    podcasts: [] as PodcastModel[],
    podcast: {} as PodcastModel,
    podcastTrack: {} as PodcastTrackModel,
    podcastDetail: [] as PodcastTrackModel[],
    selectedPodcast: {} as SelectedPodcastModel,
    selectedPodcastList: [] as SelectedPodcastModel[]
};
export interface SateInterface {
    podcasts: PodcastModel[], 
    podcast: PodcastModel, 
    podcastDetail: PodcastTrackModel[], 
    selectedPodcast: SelectedPodcastModel,
    podcastTrack: PodcastTrackModel,
    selectedPodcastList: SelectedPodcastModel[]
}
interface ActionInterface {
    payload: any, 
    type: any
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
      setPodcasts: (state: SateInterface, action: ActionInterface) => {
        state.podcasts = action.payload
      },
      setPodcast: (state: SateInterface, action: ActionInterface) => {
        state.selectedPodcastList = action.payload.podcastList
        state.selectedPodcast = action.payload.podcast
      },
      setPodcastDetails: (state: SateInterface, action: ActionInterface) => {
        state.podcastDetail = action.payload
      },
      setPodcastTrack: (state: SateInterface, action: ActionInterface) => {
        state.podcastTrack = action.payload
      },
      setError: (state: SateInterface, action: ActionInterface) => {
        alert(action.payload.error)
      },
      resetPodcastsDetails: (state: SateInterface) => {
        state.podcast = {} as PodcastModel
        state.podcastTrack = {} as PodcastTrackModel
        state.podcastDetail = [] as PodcastDetailModel[]
        state.selectedPodcast = {} as SelectedPodcastModel
        state.selectedPodcastList = [] as SelectedPodcastModel[]
      },
    }
  })
export const { resetPodcastsDetails, setPodcast, setPodcasts, setPodcastDetails, setError, setPodcastTrack } = podcastSlice.actions
export default podcastSlice.reducer
