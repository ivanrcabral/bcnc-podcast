import axios from "axios";
import { setPodcasts, setError, setPodcast, setPodcastDetails } from "../reducers/podcast.reducer";
import { xml2json } from 'xml-js';
import { CookieName } from "../types/cookies.types";
import * as CookieService from "../services/cookie.service";


export function getPodcastDetails(url: string) {
    return async (dispatch: any) => {
        axios.get(url).then((resp: any)=>{
            const jsonString:string = xml2json(resp.data);
            const data = JSON.parse(jsonString)
            const podcastsList: any[] = []
            data.elements.forEach((element:any) => {
                element.elements.forEach((element2:any) => {
                    element2.elements.forEach((element3:any) => {
                        const podcastData: any = {}
                        if(element3.elements){
                            element3.elements.forEach((element4:any) => {
                                switch (element4.name) {
                                    case 'title':
                                        podcastData.title = element4.elements[0].text
                                        break;
                                    case 'itunes:subtitle':
                                        podcastData.subtitle = element4.elements[0].cdata
                                        break;
                                    case 'description':
                                        podcastData.description = element4.elements[0].cdata
                                        break;
                                    case 'itunes:duration':
                                        podcastData.duration = element4.elements[0].text
                                        break;
                                    case 'pubDate':
                                        podcastData.pubDate = element4.elements[0].text
                                        break;
                                    case 'enclosure':
                                        podcastData.audioSrc = element4.attributes.url
                                        podcastData.audioType = element4.attributes.type
                                        break;
                                    default:
                                        break;
                                }
                            });
                            if (Object.entries(podcastData).length > 0 && podcastData.title && podcastData.audioSrc)
                                podcastsList.push(podcastData)
                        }
                    })
                })
            });
            dispatch(setPodcastDetails(podcastsList));

        })
    }
}

export function getPodcast(id: String, podcast:any) {
    return async (dispatch: any) => {
        axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent("https://itunes.apple.com/lookup?id=")+id}`).then((resp: any)=>{
            if (resp && resp.data && resp.data.contents){
                const response = JSON.parse(resp.data.contents)
                dispatch(setPodcast({podcastList: response.results, podcast}));
            } else
                dispatch(setError("Error getting podcasts"));
        })
    }
}

export function getPodcasts() {
    return async (dispatch: any) => {
        if (!CookieService.getCookie(CookieName.PODCAST))
            axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json").then((resp: any)=>{
                if (resp && resp.data && resp.data.feed && resp.data.feed.entry){
                    CookieService.setCookie(CookieName.PODCAST, JSON.stringify(resp.data.feed.entry))
                    dispatch(setPodcasts(resp.data.feed.entry));
                } else
                    dispatch(setError("Error getting podcasts"));
            })
        else 
            dispatch(setPodcasts(JSON.parse(CookieService.getCookie(CookieName.PODCAST) ?? '{}')))
    }
}