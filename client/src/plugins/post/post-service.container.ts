import PostService from './post.service'
import IPostService from './post.service.interface'

const postServiceContainer = {
	service: (): IPostService => new PostService(),
}

export default postServiceContainer
