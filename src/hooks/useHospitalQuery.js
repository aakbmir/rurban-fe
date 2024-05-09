import { useQuery } from "@tanstack/react-query";
import { fetchClinics } from "../services/data.service";

export function useHospitalQuery() {
  const {
    isLoading: isHospitalLoading,
    data: hospitals,
    error,
  } = useQuery({
    queryKey: ["userHospitalList"],
    queryFn: fetchClinics,
  });

  return { isHospitalLoading, error, hospitals };
}
