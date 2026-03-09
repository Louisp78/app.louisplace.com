import { UserControllerApi } from '@/plugins/api-repository-generated'
import { useQuery } from '@tanstack/react-query'

export const USER_KEY = 'me'

export default function useMe() {
	return useQuery({
		queryKey: [USER_KEY],
		queryFn: async () => new UserControllerApi().getUserInfos(),
	})
}
