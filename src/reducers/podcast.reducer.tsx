import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    podcasts: [],
    podcast: {},
    podcastTrack: {} as any,
    podcastDetail: [] as any[],
    selectedPodcast: {} as any,
    selectedPodcastList: [] as any[]
};
interface SateInterface {
    podcasts: any[], 
    podcast: any, 
    podcastDetail: any[], 
    selectedPodcast: any,
    podcastTrack: any,
    selectedPodcastList: any[]
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

        console.log("Setted", action.payload.podcastList)
      },
      setPodcastDetails: (state: SateInterface, action: ActionInterface) => {
        state.podcastDetail = action.payload
      },
      setPodcastTrack: (state: SateInterface, action: ActionInterface) => {
        state.podcastTrack = action.payload
        console.log('setPodcastTrack', action.payload)
      },
      setError: (state: SateInterface, action: ActionInterface) => {
        alert(action.payload.error)
      }
    }
  })
export const { setPodcast, setPodcasts, setPodcastDetails, setError, setPodcastTrack } = podcastSlice.actions
export default podcastSlice.reducer
