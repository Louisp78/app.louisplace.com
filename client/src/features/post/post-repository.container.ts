import { storageContainer } from '../storage'
import PostRepository from './repository/post.repository'

const PostRepositoryContainer = {
	repository: () => {
		return new PostRepository(storageContainer.service())
	},
}
export default PostRepositoryContainer
