export async function fetchReports(params: any) {
  const res = await fetch(
    `/api/reports?rValue=${params.r}&sdate=${params.sdate}&edate=${params.edate}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data?.data;
}
