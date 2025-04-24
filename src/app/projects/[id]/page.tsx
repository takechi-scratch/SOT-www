"use client";

import React from 'react';
import { Button, Space} from '@mantine/core';
import { CompositeChart } from '@mantine/charts';
import '@mantine/charts/styles.css';

import { data } from './data';

interface ProjectDetailsProps {
    id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
    // Mock data for demonstration
    const project = {
        id,
        title: 'Sample Project',
        description: '説明のテスト',
        createdAt: '2023-01-01',
        updatedAt: '2023-10-01',
    };

    const projectUrl = `https://scratch.mit.edu/projects/${id}/`;

    const valueFormatter = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div style={{ margin: '0 auto', padding: '0 20px' }}>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>
                <strong>Created At:</strong> {project.createdAt}
            </p>
            <p>
                <strong>Last Updated:</strong> {project.updatedAt}
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
                    tickFormatter: valueFormatter // x軸のtimestampをフォーマット
                }}
                tooltipProps={{
                    labelFormatter: (value) => {
                        if (value === undefined || value === null) {
                            return '不明な日付'; // デフォルトの表示
                        }
                        return valueFormatter(value); // valueFormatterを再利用
                    }
                }}
                withLegend
                withRightYAxis
                rightYAxisLabel="参照数"
                series={[
                    { name: "views", label: "参照数", color: "blue.1", yAxisId: "right", type: "bar" },
                    { name: "loves", label: "好き", color: "#ff6680", type: "line" },
                    { name: "favorites", label: "お気に入り", color: "#ffbf00", type: "line" },
                    { name: "remixes", label: "リミックス", color: "green.8", type: "line" },
                ]}
                curveType="linear"
            />
        </div>
    );
};

export default ProjectDetails;

