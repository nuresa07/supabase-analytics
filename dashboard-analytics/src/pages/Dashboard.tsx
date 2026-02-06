import CardStat from "@/components/CardStat";
import { useThemeStore } from "@/stores/ThemeStore";
import DashboardCharts from "../component/DashboardCharts";
import Heading from "@/component/Heading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { getInsightData } from "@/redux/slices/insightSlice";
import { getChartData } from "@/redux/slices/chartSlice";

const Dashboard = () => {

  // start testing
  const dispatch = useDispatch<AppDispatch>()
  const { data, error, loading } = useSelector((state: RootState) => state.insight)



  console.log("data from dasboard page", data);


  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const from = new Date(year, month, 1);
    const to = new Date(year, month + 1, 0);

    const fromDate = from.toISOString().split("T")[0];
    const toDate = to.toISOString().split("T")[0];

    // Dispatch insight summary
    dispatch(getInsightData({ from: fromDate, to: toDate }));

    // Dispatch grafik per metric
    dispatch(getChartData({ from: fromDate, to: toDate, metric: "users" }));
    dispatch(getChartData({ from: fromDate, to: toDate, metric: "revenue" }));
    dispatch(getChartData({ from: fromDate, to: toDate, metric: "session_duration" }));
    dispatch(getChartData({ from: fromDate, to: toDate, metric: "active_users" }));
  }, [dispatch]);


  const { darkMode } = useThemeStore()

  if (loading) return <p>loading insight...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <Heading title="Dashboard Overview" />

      <p className="text-sm text-zinc-500 dark:text-zinc-100 my-4">{data.summaryText}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CardStat darkMode={darkMode} data={data} />
      </div>

      <DashboardCharts darkMode={darkMode} />
    </>
  )
}

export default Dashboard