export const exportToCSV = (data: any[], filename = "analytics.csv") => {
  if (!data || data.length === 0) {
    alert("Tidak ada data yang bisa di-export.");
    return;
  }

  const keys = Object.keys(data[0]);

  const keyLabelMap: Record<string, string> = {
    formatted_date: "Date",
    users: "Users",
    revenue: "Revenue ($)",
    session_duration: "Session Duration (s)",
    active_users: "Active Users",
    conversion_rate: "Conversion Rate (%)",
    revenue_growth: "Revenue Growth (%)"
  };

  const header = keys.map((k) => keyLabelMap[k] || k).join(",");

  const rows = data.map((row) =>
    keys
      .map((key) => {
        let value = row[key];

        if (key === "conversion_rate" || key === "revenue_growth") {
          value = `${value}%`; // Format % nilai
        }

        if (key === "revenue") {
          value = `$${value}`; // Format dolar
        }

        if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`;
        }

        return value;
      })
      .join(",")
  );

  const csvContent = [header, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.click();
};
