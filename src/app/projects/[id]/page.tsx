"use client";

import React, { useEffect, useState } from "react";
import { Button, Space } from "@mantine/core";
import { CompositeChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { fetchProjectData } from "./fetch";
import { projectData } from "./projects";

const ProjectDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [data, setData] = useState<projectData|null>(null);

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId).then((fetchedData) => setData(fetchedData));
    }
  }, [projectId]);

  useEffect(() => {
    params.then(({ id }) => setProjectId(id));
  }, [params]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const projectUrl = projectId
    ? `https://scratch.mit.edu/projects/${projectId}/`
    : "#";

  const dateFormatter = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const dateTimeFormatter = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ margin: "0 auto", padding: "0 20px" }}>
      <h1>{data.title}</h1>
      <p>
        <strong>作成日時:</strong> {dateFormatter(data.history.created)}
      </p>
      <p>
        <strong>最終更新:</strong> {dateFormatter(data.history.modified)}
      </p>
      <Button
        component="a"
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project on Scratch
      </Button>

      <Space h="md" />
      <h2>作品の統計</h2>

      <CompositeChart
        h={400}
        data={data["stats"]}
        dataKey="timestamp"
        xAxisProps={{
          type: "number",
          domain: ["dataMin", "dataMax"],
          tickFormatter: dateTimeFormatter, // x軸のtimestampをフォーマット
        }}
        tooltipProps={{
          labelFormatter: (value) => {
            if (value === undefined || value === null) {
              return "不明な日付"; // デフォルトの表示
            }
            return dateTimeFormatter(value); // valueFormatterを再利用
          },
        }}
        withLegend
        withRightYAxis
        rightYAxisLabel="参照数"
        series={[
          {
            name: "views",
            label: "参照数",
            color: "blue.1",
            yAxisId: "right",
            type: "bar",
          },
          { name: "loves", label: "好き", color: "#ff6680", type: "line" },
          {
            name: "favorites",
            label: "お気に入り",
            color: "#ffbf00",
            type: "line",
          },
          {
            name: "remixes",
            label: "リミックス",
            color: "green.8",
            type: "line",
          },
        ]}
        curveType="linear"
      />
    </div>
  );
};

export default ProjectDetails;
