"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContextType {
  color: (key: string) => string;
  label: (key: string) => string;
}

const ChartContext = React.createContext<ChartContextType | null>(null);

export function ChartContainer<T extends ChartConfig>({
  config,
  children,
  className,
}: {
  config: T;
  children: React.ReactNode;
  className?: string;
}) {
  const contextValue = React.useMemo(() => {
    const colorFn = (key: string) => {
      const colorKey = `--color-${key}`;
      return `var(${colorKey})`;
    };
    
    const labelFn = (key: string) => {
      return config[key]?.label || "";
    };
    
    return { color: colorFn, label: labelFn };
  }, [config]);

  const cssVars = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color;
      return acc;
    }, {} as Record<string, string>);
  }, [config]);

  return (
    <ChartContext.Provider value={contextValue}>
      <div className={cn("chart-container", className)} style={cssVars}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export function useChartContext() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer");
  }

  return context;
}

export function ChartTooltip(props: any) {
  return props.content;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  indicator = "square",
  hideLabel = false,
}: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-white flex min-w-[128px] flex-col gap-y-1 rounded-md border border-gray-100 p-2 shadow-md",
        className
      )}
    >
      {!hideLabel && (
        <div className="text-xs text-gray-500">{label}</div>
      )}
      <div className="flex flex-col gap-y-1">
        {payload.map((item: any, index: number) => {
          return (
            <div key={index} className="flex items-center gap-x-1">
              {indicator === "dot" && (
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: item.color }}
                />
              )}
              {indicator === "square" && (
                <div
                  className="h-1.5 w-1.5"
                  style={{ background: item.color }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="h-px w-1.5"
                  style={{ background: item.color }}
                />
              )}
              <span className="text-xs capitalize">
                {typeof item.name === "string"
                  ? item.name
                  : item.dataKey}
              </span>
              <span className="ml-auto text-xs font-medium">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
