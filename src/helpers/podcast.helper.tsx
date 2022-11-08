import LabelModel from "../models/Label.model"

export function getPathId(name: String): String{
    return name.trim().replaceAll(' ', '-').toLocaleLowerCase()
}

export function getLastImage(images: LabelModel[]) {
    let image:LabelModel = {label:''} as LabelModel
    image = images[images.length - 1]
    return image.label ? image.label:"URLIMGDEFAULT"
}

export function getLocaleDate(date: string){
    return new Date(date).toLocaleString().split(',')[0]
}
