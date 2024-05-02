import { useQuery } from "@tanstack/react-query";
import { fetchCheckInsForUser } from "../services/data.service";

export function useUserCheckInQuery(records) {
  const {
    isPending: isCheckInLoading,
    data: checkIns,
    error,
  } = useQuery({
    queryKey: ["UserCheckIns"],
    queryFn: () => fetchCheckInsForUser(records),
  });

  return { isCheckInLoading, error, checkIns };
}
