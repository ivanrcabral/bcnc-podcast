

export default function Breadcrum(prop: {crum: String[]}){
    return (
        <div>
            {prop && prop.crum.map( (link) => (
                <span>{link}</span>
            ))}
        </div>
    )
}