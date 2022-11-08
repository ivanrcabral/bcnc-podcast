import LabelModel from "./Label.model"

export default interface SelectedPodcastModel {
    title: LabelModel
    feedUrl: string
    "im:name": LabelModel
    "im:artist": LabelModel
    "im:image": LabelModel[]
    summary: LabelModel
}
