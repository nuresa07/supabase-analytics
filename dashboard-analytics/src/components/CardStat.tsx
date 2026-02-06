import { ArrowDownRight, ArrowUpRight, BarChart, DollarSign, TrendingUp, Users } from "lucide-react";
import clsx from "clsx";
import CountUp from "react-countup";

const CardStat = ({ darkMode, data }: { darkMode: boolean, data: any }) => {

  const stats = [
    { title: "Total Users", value: data.totalUsers.toString(), growth: data.userGrowth, isPositive: data.userGrowth >= 0, icon: Users, styles: "w-6 h-6 text-blue-500" },
    { title: "Revenue", value: data.totalRevenue, growth: data.revenueGrowth, isPositive: data.revenueGrowth >= 0, icon: DollarSign, styles: "w-6 h-6 text-green-500" },
    { title: "Active Sessions", value: 389, icon: TrendingUp, styles: "w-6 h-6 text-yellow-500" },
    { title: "New Signups", value: 150, icon: BarChart, styles: "w-6 h-6 text-purple-500" }
  ];


  return stats.map(({ icon: Icon, styles, title, value, isPositive, growth }, index) => (
    <div className={clsx(
      "flex items-center p-5 border rounded-lg transform transition hover:scale-105 shadow-md justify-normal ",
      darkMode ? "bg-gray-800" : ""
    )}
      key={index}
    >
      <div className="p-3 bg-gray-200 rounded-full"><Icon className={styles} /></div>
      <div className="ml-4">
        <p className={`${darkMode ? "bg-gray-700" : ""}text-gray-700`}>{title}</p>
        <h3 className="text-2xl font-semibold text-gray-500">
          <CountUp end={value} duration={2} separator="," />
          <div className="flex items-center gap-1 mt-1 text-sm">
            {isPositive !== undefined && growth !== undefined && (
              <>
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={clsx(
                    'font-medium text-sm',
                    isPositive ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {Math.abs(growth).toFixed(1)}%
                </span>
              </>
            )}
          </div>

        </h3>
      </div>



    </div >
  ))
}

export default CardStat