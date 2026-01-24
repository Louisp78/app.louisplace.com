import postServiceContainer from '../post-service.container'

export default function usePosts() {
	return postServiceContainer.service().getPosts()
}
