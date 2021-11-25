

  window.onload = function () {

    var blueShades = [
        "#100644",
        "#1E0F68",
        "#2C1B81",
        "#250BA3",
        "#400BD5",
        "#5855ED",
        "#6182F9",
        "#6FA9FF",
        "#77C1F7"
    ];
    var greenShades = [
        "#10681B",
        "#1C7827",
        "#19A527",
        "#71AD7A",
        "#78BE6A",
        "#10681B",
        "#1C7827",
        "#19A527",
        "#71AD7A",
    ]
    var chartElement = {

    };
    test(blueShades,'chart-emission');
    test(greenShades,'chart-offset');
      function test(shade,id) {
          console.log('bcjsbj :');
        Chart.defaults.global.legend.display = false;
        Chart.pluginService.register({
          beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
              // Get ctx from string
              var ctx = chart.chart.ctx;
  
              // Get options from the center object in options
              var centerConfig = chart.config.options.elements.center;
              var fontStyle = centerConfig.fontStyle || "Arial";
              var txt = centerConfig.text;
              var color = centerConfig.color || "#000";
              var maxFontSize = centerConfig.maxFontSize || 75;
              var sidePadding = centerConfig.sidePadding || 20;
              var sidePaddingCalculated =
                (sidePadding / 100) * (chart.innerRadius * 2);
              // Start with a base font of 30px
              ctx.font = "30px " + fontStyle;
  
              // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
              var stringWidth = ctx.measureText(txt).width;
              var elementWidth = chart.innerRadius * 1.5 - sidePaddingCalculated;
  
              // Find out how much the font can grow in width.
              var widthRatio = elementWidth / stringWidth;
              var newFontSize = Math.floor(30 * widthRatio);
              var elementHeight = chart.innerRadius * 2;
  
              // Pick a new font size so it will not be larger than the height of label.
              var fontSizeToUse = Math.min(
                newFontSize,
                elementHeight,
                maxFontSize
              );
              var minFontSize = centerConfig.minFontSize;
              var lineHeight = centerConfig.lineHeight || 25;
              var wrapText = false;
  
              if (minFontSize === undefined) {
                minFontSize = 20;
              }
  
              if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
              }
  
              // Set font settings to draw it correctly.
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
              var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
              ctx.font = fontSizeToUse + "px " + fontStyle;
              ctx.fillStyle = color;
  
              if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
              }
  
              var words = txt.split(" ");
              var line = "";
              var lines = [];
  
              // Break words up into multiple lines if necessary
              for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                  lines.push(line);
                  line = words[n] + " ";
                } else {
                  line = testLine;
                }
              }
  
              // Move the center up depending on line height and number of lines
              centerY -= (lines.length / 2) * lineHeight;
  
              for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
              }
              //Draw text in center
              ctx.fillText(line, centerX, centerY);
            }
          },
        });
  
        var config = {
          type: "doughnut",
          data: {
            labels: [
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
              "Lorem ipsum ",
            ],
            datasets: [
              {
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30],
                backgroundColor: shade,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            animation: {
              animateRotate: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 70, //arc width
            elements: {
              center: {
                text: "99 TONS CO2 E",
                color: "#FF6384", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                sidePadding: 5, // Default is 20 (as a percentage)
                minFontSize: 15, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25, // Default is 25 (in px), used for when text wraps
                font: "bold",
                color: "#100644",
              },
            },
            tooltips: {
              mode: "dataset",
            },
          },
        };
  
        var ctx = document.getElementById(id).getContext("2d");
        var myChart = new Chart(ctx, config);
      }
      
    }