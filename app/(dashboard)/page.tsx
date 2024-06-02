"use client";

// container component
import { DataGrid } from "@/containers";

// components
import DataCharts from "@/components/DataCharts";

const Dashboard = () => {
    return (
        <div className="component-container w-full pb-10 -mt-24">
            <DataGrid />
            <DataCharts />
        </div>
    );
};

export default Dashboard;
