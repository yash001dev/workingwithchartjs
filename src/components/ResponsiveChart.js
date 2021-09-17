/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import _ from "lodash";

const counter = {
  id: "counter",
  beforeInit: function (chart, options) {
    // Get reference to the original fit function
    const originalFit = chart.legend.fit;

    // Override the fit function
    chart.legend.fit = function fit() {
      // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(chart.legend)();
      this.height += 35;
    };
  },
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
    } = chart;
    ctx.save();

    //1st How to get Position of label
    const yCenter = top + height / 2;

    //2nd How to set Styling of label
    ctx.font = "bold 48px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.fillStyle = options.fontColor;
    ctx.fillText(options.text, width / 2 + 32, yCenter + 20);
  },
};

const subHeading = {
  id: "subHeading",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
    } = chart;
    ctx.save();

    //1st How to get Position of label
    const yCenter = top + height / 2 - 48;

    //2nd How to set Styling of label
    ctx.font = "bold 14px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.fillStyle = options.fontColor;
    ctx.fillText("LET'S RAISE", width / 2 + 32, yCenter + 22);
  },
};

Chart.register(ChartDataLabels);
Chart.register(counter);
Chart.register(subHeading);

const ResponsiveChart = ({ dataArray, dataLabel }) => {
  const sum = _.sum(dataArray);
  const data = {
    labels: dataLabel,
    datasets: [
      {
        backgroundColor: ["#416872", "#a5b0b5", "#84BDC9", "#1f3b42"],
        cutout: "82%",
        data: dataArray,
        datalabels: {
          anchor: "end",
        },
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        shadowBlur: 5,
      },
    ],
  };

  return (
    <>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          cutoutPercentage: 32,
          layout: {
            padding: 32,
          },
          plugins: {
            datalabels: {
              backgroundColor: ["#416872", "#a5b0b5", "#84BDC9", "#1f3b42"],
              borderColor: "white",
              borderRadius: 50,
              borderWidth: 3,
              color: "white",
              //If you want to customize color implement following function
              // color: function (context) {
              //   var index = context.dataIndex;
              //   var value = context.dataset.data[index];

              //   if (index === 1) {
              //     return (value = 'black');
              //   } else {
              //     return (value = '#fff');
              //   }
              // },
              display: function (context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > count * 1.5;
              },
              font: {
                weight: "bold",
                size: "18",
              },
              offset: 2,
              padding: 10,

              formatter: Math.round,
            },
            counter: {
              fontColor: "",
              fontSize: "32px",
              text: "$" + sum.toString(),
              font: "",
            },
            subHeading: {},
          },
        }}
      />
    </>
  );
};

export default ResponsiveChart;
