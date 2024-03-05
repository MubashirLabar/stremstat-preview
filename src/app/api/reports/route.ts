export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rValue = searchParams.get("rValue");
  const sdate = searchParams.get("sdate");
  const edate = searchParams.get("edate");

  const res = await fetch(
    `https://stats.prices.com/?p=b55b2a1577c248fc9cab610bb871072d&r=${rValue}&sdate=${sdate}&edate=${edate}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
