import './styles.css'
export const PostCard = ({title, photo, body, id}) => (
    <div className='post'>
        <img className='post-img' src={photo} alt={title} />
            <div className='post-content'>
            <h2 className='post-title'>{title}</h2>
            <p className='post-body'>{body}</p>
        </div>
    </div>
)

