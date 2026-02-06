import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"

interface AnalyticsData {
  id: number;
  date: string;
  users: number;
  revenue: number;
  session_duration: number;
  conversion_rate: number;
}


const Testing = () => {

  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let { data: analytics, error } = await supabase
        .from("analytics")
        .select("*")
        .order("date", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else setData(analytics as AnalyticsData[]);
      setLoading(false);
    };
    fetchData();
  }, []);


  return { data, loading };
}

export default Testing