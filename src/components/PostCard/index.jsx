import './styles.css'
export const PostCard = ({title, cover, body, id}) => (
    <div className='post'>
        <img className='post-img' src={cover} alt={title} />
            <div className='post-content'>
            <h2 className='post-title'>{title} {id}</h2>
            <p className='post-body'>{body}</p>
        </div>
    </div>
)

