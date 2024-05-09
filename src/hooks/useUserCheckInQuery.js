import { useQuery } from "@tanstack/react-query";
import { fetchCheckInsForUser } from "../services/data.service";

export function useUserCheckInQuery(records) {
  const {
    isLoading,
    isPending: isCheckInLoading,
    data: checkIns,
    error,
  } = useQuery({
    queryKey: ["UserUpcomingCheckIns"],
    queryFn: () => fetchCheckInsForUser(records),
  });

  return { isLoading, isCheckInLoading, error, checkIns };
}
