import LabelModel from "./Label.model"

export default interface PodcastModel {
    title: LabelModel
    "im:name": LabelModel
    "im:image": LabelModel[]
    id: AttributesModel
}

interface AttributesModel{
    attributes: ImIdModel
}

interface ImIdModel{
    'im:id': string
}