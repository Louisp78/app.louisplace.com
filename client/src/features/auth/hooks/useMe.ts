import { UserControllerApi } from '@/features/api-repository-generated'
import { useQuery } from '@tanstack/react-query'

export default function useMe() {
	return useQuery({
		queryKey: ['me'],
		queryFn: async () => new UserControllerApi().getUserInfos(),
	})
}
