"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { VendorEarning } from "../page";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type EarningsSectionProps = {
  earnings: VendorEarning[];
};

export const EarningsSection: React.FC<EarningsSectionProps> = ({
  earnings,
}) => {
  const monthlyEarnings = earnings.reduce((acc, earning) => {
    const month = new Date(earning.createdAt).toLocaleString("ar-EG", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + Number(earning.amount);
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyEarnings).map(([month, amount]) => ({
    month,
    amount,
  }));

  const totalEarnings = earnings.reduce(
    (sum, earning) => sum + Number(earning.amount),
    0
  );
  const averageEarnings = totalEarnings / chartData.length;
  const lastMonthEarnings = chartData[chartData.length - 1]?.amount || 0;
  const previousMonthEarnings = chartData[chartData.length - 2]?.amount || 0;
  const earningsChange =
    ((lastMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{label}</p>
          <p className="text-blue-600">{`الأرباح: $${payload[0].value.toFixed(
            2
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <DollarSign className="mr-2" /> الأرباح
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">إجمالي الأرباح</p>
                  <p className="text-2xl font-bold">
                    ${totalEarnings.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">متوسط الأرباح الشهرية</p>
                  <p className="text-2xl font-bold">
                    ${averageEarnings.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    التغير عن الشهر السابق
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      earningsChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {earningsChange >= 0 ? (
                      <ArrowUpRight className="inline mr-1" />
                    ) : (
                      <ArrowDownRight className="inline mr-1" />
                    )}
                    {Math.abs(earningsChange).toFixed(2)}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="h-80 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2196F3"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
