import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useParams } from "react-router";

const AttendChart = ({ chartView, startDate, endDate }) => {
  const [totalStudentArr, setTotalStudentArr] = useState([]);
  const [testedStudentArr, setTestedStudentArr] = useState([]);
  const [labels, setLabels] = useState([]);
  const { subject, number } = useParams();

  const Cont = styled.div`
    width: 90%;
    height: 23em;
    margin: 3em auto;
    canvas {
      max-height: 100% !important;
    }
  `;

  const getCompareYearMonth = () => {
    const compareStartDate = new Date(startDate);
    const compareEndDate = new Date(endDate);
    const YearMonth = [
      {
        year: compareStartDate.getFullYear(),
        month: compareStartDate.getMonth() + 1,
      },
      {
        year: compareEndDate.getFullYear(),
        month: compareEndDate.getMonth() + 1,
      },
    ];
    return { YearMonth };
  };

  const getYearMonth = () => {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth() + 1;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let YearMonth = [];
    for (let i = 1; i <= 6; i++) {
      YearMonth.unshift({ year, month });
      month--;
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
    }
    return { nowYear, nowMonth, YearMonth };
  };

  const getStudentData = async (
    subject,
    number,
    year = getYearMonth().nowYear,
    month = getYearMonth().nowMonth
  ) => {
    month = month < 10 ? `0${month}` : month;

    const BASE_URL = "https://kimcodi.kr/external_api/dashboard/";
    const SUC_CODE = "001";

    const totalUrl =
      number === undefined
        ? `${BASE_URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}`
        : `${BASE_URL}numberOfTotalStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}&classn=${number}`;
    const testedUrl =
      number === undefined
        ? `${BASE_URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}`
        : `${BASE_URL}numberOfTestedStudentsByMonth.php?yyyy=${year}&mm=${month}&class=${subject}&classn=${number}`;

    let totalStudent = await axios.get(totalUrl);
    totalStudent =
      totalStudent.data.code === SUC_CODE
        ? totalStudent.data.result[0].STUDENT_COUNT
        : 0;

    let testedStudent = await axios.get(testedUrl);
    testedStudent =
      testedStudent.data.code === SUC_CODE
        ? testedStudent.data.result[0].STUDENT_COUNT
        : 0;

    // 응시율
    let attendPercent = ((testedStudent / totalStudent) * 100).toFixed(1);
    attendPercent = attendPercent === "NaN" ? 0 : attendPercent;

    return { totalStudent, testedStudent, attendPercent };
  };

  useEffect(() => {
    const { YearMonth } =
      chartView !== "compareBar" ? getYearMonth() : getCompareYearMonth();
    console.log(getCompareYearMonth());
    const chartLabel = YearMonth.map((label) =>
      label.month < 10 ? `0${label.month}` : label.month
    );
    setLabels(chartLabel);

    const fetchData = async () => {
      const { totalStudentData, testedStudentData, attendPercentData } =
        await YearMonth.reduce(
          async (_acc, cur) => {
            const { totalStudent, testedStudent, attendPercent } =
              await getStudentData(subject, number, cur.year, cur.month);
            const acc = await _acc;
            acc["totalStudentData"].push(totalStudent);
            acc["testedStudentData"].push(testedStudent);
            acc["attendPercentData"].push(attendPercent);
            return acc;
          },
          { totalStudentData: [], testedStudentData: [], attendPercentData: [] }
        );
      setTotalStudentArr(totalStudentData);
      setTestedStudentArr(testedStudentData);
      return;
    };

    fetchData();
  }, [subject, number, chartView, startDate, endDate]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#5D5FEF",
        xAlign: "center",
        yAlign: "bottom",
      },
    },
    scales: {
      xAxes: {
        grid: {
          display: false,
        },
      },
      yAxes: {
        grid: {
          borderDash: [10],
          borderColor: "#C7C7C7",
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "재학생",
        barPercentage: 0.6,
        categoryPercentage: 0.5,
        data: totalStudentArr,
        backgroundColor: "#8898AA",
        borderColor: "#8898AA",
      },
      {
        label: "응시생",
        barPercentage: 0.6,
        categoryPercentage: 0.5,
        data: testedStudentArr,
        backgroundColor: "#5D5FEF",
        borderColor: "#5D5FEF",
      },
    ],
  };

  return (
    <Cont>
      {chartView === "bar" ? (
        <Bar options={barOptions} data={chartData} />
      ) : chartView === "compareBar" ? (
        <Bar options={barOptions} data={chartData} />
      ) : (
        <Line options={barOptions} data={chartData} />
      )}
    </Cont>
  );
};

export default AttendChart;
