
export function getPathId(name: String): String{
    return name.trim().replaceAll(' ', '-').toLocaleLowerCase()
}