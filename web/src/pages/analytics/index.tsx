import { useTranslation } from "react-i18next";
import {
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Server,
  Laptop,
  Shield,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { AnalyticCard, AnalyticChart } from "../../components/ui";
import {
  mockCostTrends,
  getTotalCosts,
  getAssetsByType,
  getAssetsByStatus,
  getLicenseUtilization,
  getHighRiskAssets,
  mockAssets,
} from "../../data/mockAssets";

const Analytics = () => {
  const { t } = useTranslation("analytics");
  // Calculate analytics data
  const totalCosts = getTotalCosts();
  const assetsByType = getAssetsByType();
  const assetsByStatus = getAssetsByStatus();
  const licenseUtil = getLicenseUtilization();
  const highRiskAssets = getHighRiskAssets();

  // Prepare chart data
  const costTrendData = mockCostTrends.map((trend) => ({
    label: trend.month.split("-")[1],
    value: trend.totalCost,
  }));

  const assetTypeData = assetsByType.map((asset) => ({
    label: asset.type.charAt(0).toUpperCase() + asset.type.slice(1),
    value: asset.count,
  }));

  const licenseData = licenseUtil.map((license) => ({
    label: license.name.split(" ")[0],
    value: license.utilization,
  }));

  const statusData = assetsByStatus.map((status) => ({
    label: status.status.charAt(0).toUpperCase() + status.status.slice(1),
    value: status.count,
    color:
      status.status === "active"
        ? "var(--color-success-500)"
        : status.status === "maintenance"
        ? "var(--color-warning)"
        : status.status === "inactive"
        ? "var(--color-danger-500)"
        : "var(--color-primary-500)",
  }));

  return (
    <div className="py-8 px-12 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          {t("title")}
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
          {t("description")}
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticCard
          title="Total Asset Value"
          value={totalCosts.total}
          subtitle="All IT assets combined"
          icon={DollarSign}
          type="profit"
          trend={{ value: 12.5, isPositive: true, label: "vs last month" }}
          delay={0}
        />

        <AnalyticCard
          title="Monthly Costs"
          value={totalCosts.monthly}
          subtitle="Recurring monthly expenses"
          icon={TrendingUp}
          type="info"
          trend={{ value: 3.2, isPositive: false, label: "vs last month" }}
          delay={0.1}
        />

        <AnalyticCard
          title="Total Assets"
          value={mockAssets.length}
          subtitle="Active IT assets"
          icon={Package}
          type="neutral"
          delay={0.2}
        />

        <AnalyticCard
          title="High Risk Assets"
          value={highRiskAssets.length}
          subtitle="Requiring attention"
          icon={AlertTriangle}
          type="warning"
          trend={{ value: 15.8, isPositive: false, label: "risk increase" }}
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Cost Trends Chart */}
        <AnalyticChart
          title="Cost Trends"
          subtitle="Monthly cost evolution over time"
          data={costTrendData}
          type="area"
          icon={BarChart3}
          height={350}
          delay={0.4}
        />

        {/* Asset Distribution Chart */}
        <AnalyticChart
          title="Asset Distribution"
          subtitle="Assets breakdown by type"
          data={assetTypeData}
          type="doughnut"
          icon={PieChart}
          height={350}
          delay={0.5}
        />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Asset Status Chart */}
        <AnalyticChart
          title="Asset Status Overview"
          subtitle="Current status of all assets"
          data={statusData}
          type="bar"
          icon={Activity}
          height={300}
          delay={0.6}
        />

        {/* License Utilization Chart */}
        <AnalyticChart
          title="License Utilization"
          subtitle="Software license usage percentage"
          data={licenseData}
          type="line"
          icon={Shield}
          height={300}
          delay={0.7}
        />
      </div>

      {/* Detailed Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cost Breakdown Card */}
        <AnalyticCard
          title="Cost Breakdown"
          value=""
          type="default"
          size="lg"
          className="col-span-1"
          delay={0.8}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--color-text-secondary)" }}>
                Initial Costs
              </span>
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                ${totalCosts.initial.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--color-text-secondary)" }}>
                Monthly Costs
              </span>
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                ${totalCosts.monthly.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: "var(--color-text-secondary)" }}>
                Maintenance
              </span>
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                ${totalCosts.maintenance.toLocaleString()}
              </span>
            </div>
            <div
              className="border-t pt-4 flex justify-between items-center"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Total
              </span>
              <span
                className="font-bold text-lg"
                style={{ color: "var(--color-success-600)" }}
              >
                ${totalCosts.total.toLocaleString()}
              </span>
            </div>
          </div>
        </AnalyticCard>

        {/* Asset Summary Card */}
        <AnalyticCard
          title="Asset Types"
          value=""
          type="default"
          size="lg"
          className="col-span-1"
          delay={0.9}
        >
          <div className="space-y-3">
            {assetsByType.slice(0, 5).map((asset) => (
              <div
                key={asset.type}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  {asset.type === "server" && (
                    <Server
                      size={16}
                      style={{ color: "var(--color-chart-primary)" }}
                    />
                  )}
                  {asset.type === "workstation" && (
                    <Laptop
                      size={16}
                      style={{ color: "var(--color-chart-secondary)" }}
                    />
                  )}
                  <span style={{ color: "var(--color-text-secondary)" }}>
                    {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {asset.count}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    ({asset.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnalyticCard>

        {/* License Utilization Card */}
        <AnalyticCard
          title="License Status"
          value=""
          type="default"
          size="lg"
          className="col-span-1"
          delay={1.0}
        >
          <div className="space-y-3">
            {licenseUtil.map((license, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {license.name}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {license.utilization}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: "var(--color-primary-200)" }}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${license.utilization}%`,
                      backgroundColor:
                        license.utilization > 80
                          ? "var(--color-danger-500)"
                          : license.utilization > 60
                          ? "var(--color-warning)"
                          : "var(--color-success-500)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--color-text-muted)" }}>
                    {license.used} / {license.total} used
                  </span>
                  <span style={{ color: "var(--color-text-muted)" }}>
                    ${license.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnalyticCard>
      </div>
    </div>
  );
};

export default Analytics;
