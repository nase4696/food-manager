import { SectionAccordion } from "@/components/ui/accordion/section-accordion";
import { StatsPieChart } from "@/components/charts/stats-pie-chart";
import { DataList } from "@/components/charts/data-list";
import {
  calculateListItems,
  calculateTotal,
} from "@/lib/utils/chart-calculations";

type ExpiryDistributionChartProps = {
  data: Array<{ name: string; value: number; color: string }>;
  defaultExpanded?: boolean;
};

export function ExpiryDistributionChart({
  data,
  defaultExpanded = true,
}: ExpiryDistributionChartProps) {
  const total = calculateTotal(data);
  const listItems = calculateListItems(data, total);

  return (
    <SectionAccordion
      defaultExpanded={defaultExpanded}
      description="食品の期限状態をドーナツグラフで確認"
      icon={<span>📆</span>}
      iconBgColor="blue"
      showBadge={false}
      title="期限別分布グラフ"
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <StatsPieChart data={data} innerRadius={60} showTotal={true} />
          </div>

          <div className="w-full sm:w-1/2 h-[300px]">
            <DataList items={listItems} title="期限別詳細" />
          </div>
        </div>
      </div>
    </SectionAccordion>
  );
}
