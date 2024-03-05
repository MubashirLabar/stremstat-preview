"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import moment from "moment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  OverlayLoading,
  Selector,
  ReactCalendar,
  SpinLoader,
} from "../../components";
import { fetchReports } from "../services/report-service";

const r0Columns = [
  {
    name: "Keyword",
    selector: (row: any) => (row?.keyword ? row.keyword : "-"),
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "Searches",
    selector: (row: any) => (row?.searches ? row.searches : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "Clicks",
    selector: (row: any) => (row?.clicks ? row.clicks : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "PPC",
    selector: (row: any) => (row?.ppc ? `${row.ppc} $` : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "Revenue",
    selector: (row: any) => (row?.revenue ? row.revenue.toFixed(2) : "-"),
    width: "130px",
    sortable: true,
  },
];

const r1Columns = [
  {
    name: "ID",
    selector: (row: any) => (row?.id ? row.id : "-"),
    sortable: true,
    width: "70px",
  },
  {
    name: "Report Date",
    selector: (row: any) => (row?.reportdate ? row.reportdate : "-"),
    sortable: true,
    width: "135px",
  },
  {
    name: "Program",
    selector: (row: any) => (row?.program ? row.program : "-"),
    minWidth: "160px",
    wrap: true,
  },
  {
    name: "Searches",
    selector: (row: any) => (row?.searches ? row.searches : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "CTR",
    selector: (row: any) => (row?.ctr ? `${row.ctr} %` : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "Clicks",
    selector: (row: any) => (row?.clicks ? row.clicks : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "PPC",
    selector: (row: any) => (row?.ppc ? `${row.ppc} $` : "-"),
    width: "120px",
    sortable: true,
  },
  {
    name: "Revenue",
    selector: (row: any) => (row?.revenue ? row.revenue.toFixed(2) : "-"),
    width: "120px",
    sortable: true,
  },
];

const r2Columns = [
  {
    name: "ID",
    selector: (row: any) => (row?.id ? row.id : "-"),
    sortable: true,
    width: "70px",
  },
  {
    name: "Report Date",
    selector: (row: any) => (row?.reportdate ? row.reportdate : "-"),
    sortable: true,
    width: "135px",
  },
  {
    name: "Market",
    selector: (row: any) => (row?.market ? row.market : "-"),
    width: "140px",
  },
  {
    name: "Keyword",
    selector: (row: any) => (row?.keyword ? row.keyword : "-"),
    minWidth: "150px",
    wrap: true,
  },
  {
    name: "Program",
    selector: (row: any) => (row?.program ? row.program : "-"),
    minWidth: "160px",
    wrap: true,
  },
  {
    name: "S1",
    selector: (row: any) => (row?.s1 ? row.s1 : "-"),
    width: "140px",
  },
  {
    name: "S2",
    selector: (row: any) => "Wy_11",
    width: "110px",
  },
  {
    name: "S3",
    selector: (row: any) => (row?.s3 ? row.s3 : "-"),
    width: "100px",
  },
  {
    name: "S4",
    selector: (row: any) => (row?.s4 ? row.s4 : "-"),
    width: "100px",
  },
  {
    name: "Searches",
    selector: (row: any) => (row?.searches ? row.searches : "-"),
    width: "100px",
  },
  {
    name: "CTR",
    selector: (row: any) => (row?.ctr ? row.ctr : "-"),
    width: "100px",
  },
  {
    name: "Clicks",
    selector: (row: any) => (row?.clicks ? row.clicks : "-"),
    width: "100px",
  },
  {
    name: "PPC",
    selector: (row: any) => (row?.ppc ? row.ppc : "-"),
    width: "100px",
  },
  {
    name: "Revenue",
    selector: (row: any) => (row?.revenue ? row.revenue.toFixed(2) : "-"),
    width: "100px",
  },
];

const rValues = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

export default function Home() {
  const currentDate = new Date();
  const prevDay = new Date(currentDate);
  prevDay.setDate(currentDate.getDate() - 1);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [rValue, setRValue] = useState(rValues[0]);
  const [selectedRValue, setSelectedRValue] = useState(rValues[0]);
  const [startDate, setStartDate] = useState(prevDay);
  const [endDate, setEndDate] = useState(currentDate);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalSearch: 0,
    totalClicks: 0,
  });

  const columns =
    selectedRValue.value === 0
      ? r0Columns
      : selectedRValue.value === 1
      ? r1Columns
      : r2Columns;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchReports({
        r: rValue?.value,
        sdate: moment(startDate).format("MM-DD-YYYY"),
        edate: moment(endDate).format("MM-DD-YYYY"),
      });
      setSelectedRValue(rValue);
      if (rValue?.value == 0) {
        setReport(res["Keyword KPI Index"] || []);
      } else if (rValue?.value === 1) {
        setReport(res["Daily Summary Report"] || []);
      } else {
        setReport(res["Daily Detail Report"] || []);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  // Check if there is a user
  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      router.push("/login");
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (report?.length > 0) {
      const totalRevenue = report.reduce(
        (acc: any, item: any) => acc + item?.revenue,
        0
      );
      const totalSearches = report.reduce(
        (acc: any, item: any) => acc + item?.searches,
        0
      );
      const totalClicks = report.reduce(
        (acc: any, item: any) => acc + item?.clicks,
        0
      );

      // Update the summary state
      setSummary({
        totalRevenue,
        totalSearch: totalSearches,
        totalClicks,
      });
    }
  }, [report, setReport]);

  const getFormattedData = () => {
    if (Array.isArray(report) && report?.length > 0) {
      const newArray = report.map((row: any, index: number) => {
        const r0Columns = {
          "Sr #": index + 1,
          ID: row.keyword,
          Searches: row.searches,
          Clicks: row.clicks,
          PPC: row.ppc,
          Revenue: row.revenue.toFixed(2),
        };

        const r1Columns = {
          "Sr #": index + 1,
          ID: row.id,
          "Report Date": row.reportdate,
          Program: row.program,
          Searches: row.searches,
          CTR: row.ctr,
          Clicks: row.clicks,
          PPC: row.ppc,
          Revenue: row.revenue.toFixed(2),
        };

        const r2Columns = {
          "Sr #": index + 1,
          ID: row.id,
          "Report Date": row.reportdate,
          Market: row.market,
          Keyword: row.keyword,
          Program: row.program,
          S1: row.s1,
          S2: "Wy_11",
          S3: row.s3,
          S4: row.s4,
          Searches: row.searches,
          CTR: row.ctr,
          Clicks: row.clicks,
          PPC: row.ppc,
          Revenue: row.revenue.toFixed(2),
        };

        if (rValue.value === 0) {
          return { ...r0Columns };
        } else if (rValue.value === 1) {
          return { ...r1Columns };
        } else if (rValue.value === 2) {
          return { ...r2Columns };
        }
      });
      return newArray;
    }
  };

  const downloadCSV = (formattedData: any) => {
    var csv = Papa.unparse(formattedData);

    var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = null;

    if ((window.navigator as any)?.msSaveBlob) {
      csvURL = (window.navigator as any).msSaveBlob(csvData, "Report");
    } else {
      csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "Report");
    tempLink.click();
  };

  const handleDownloadButton = () => {
    const formattedData = getFormattedData();
    downloadCSV(formattedData);
  };

  const handleSignOut = async () => {
    setLogoutLoading(true);
    await supabase.auth.signOut();
    setLogoutLoading(false);
    router.push("/login");
  };

  return (
    <main className="w-full flex flex-col">
      {isLoading && <OverlayLoading />}
      <div className="w-full margins">
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center mb-5">
            <div className="flex-1 text-2xl sm:text-3xl font-semibold tet-gray-900">
              {report?.length > 0
                ? `${report?.length} Results Found`
                : `Search Data`}
            </div>
            <button
              className="bg-red-500 px-5 py-2 text-base font-medium text-white rounded-md min-w-[100px] h-[41px] max-w-fit flex items-center justify-center"
              onClick={handleSignOut}
              disabled={logoutLoading}
            >
              {logoutLoading ? (
                <SpinLoader className={"h-5 w-5 border-white"} />
              ) : (
                "Logout"
              )}
            </button>
          </div>
          <div className="w-full flex items-center gap-16 mb-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-3">
              <div className="w-full flex flex-col gap-1">
                <div className="min-w-fit text-sm font-medium text-gray-900">
                  R Value:
                </div>
                <div className="w-full">
                  <Selector
                    placeholder="Choose R"
                    options={rValues}
                    selectedOption={rValue}
                    setSelectedOption={(v: any) => setRValue(v)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="min-w-fit text-sm font-medium text-gray-900">
                  Start Date:
                </div>
                <div className="w-full">
                  <ReactCalendar
                    date={startDate}
                    setDate={(date: any) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="min-w-fit text-sm font-medium text-gray-900">
                  End Date:
                </div>
                <div className="w-full">
                  <ReactCalendar
                    date={endDate}
                    setDate={(date: any) => setEndDate(date)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="min-w-fit text-sm font-medium text-gray-900 opacity-0 hidden md:block">
                  Search
                </div>
                <button className="buttonPrimary h-[42px]" onClick={fetchData}>
                  Search
                </button>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="min-w-fit text-sm font-medium text-gray-900 opacity-0 hidden md:block">
                  Download CSV
                </div>
                <button
                  className="buttonPrimary h-[42px]"
                  onClick={handleDownloadButton}
                >
                  Download CSV
                </button>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
            <div className="w-full flex items-center bg-gray-100 py-6 px-6">
              <div className="flex-1 flex flex-col gap-6">
                <div className="text-4xl font-semibold text-gray-900">
                  {summary?.totalRevenue?.toFixed(2)}
                </div>
                <div className="text-lg text-gray-700">Total Revenue</div>
              </div>
            </div>
            <div className="w-full flex items-center bg-gray-100 py-6 px-6">
              <div className="flex-1 flex flex-col gap-6">
                <div className="text-4xl font-semibold text-gray-900">
                  {summary?.totalSearch}
                </div>
                <div className="text-lg text-gray-700">Total Searches</div>
              </div>
            </div>
            <div className="w-full flex items-center bg-gray-100 py-6 px-6">
              <div className="flex-1 flex flex-col gap-6">
                <div className="text-4xl font-semibold text-gray-900">
                  {summary?.totalClicks}
                </div>
                <div className="text-lg text-gray-700">Total Clicks</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            {report?.length > 0 ? (
              <Table
                columns={columns}
                data={report?.length ? report : []}
                pagination={true}
                paginationPerPage={25}
              />
            ) : (
              <div className="w-full flex items-center justify-center text-center py-12 px-6">
                <div className="text-base text-gray-700">Date not found.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
