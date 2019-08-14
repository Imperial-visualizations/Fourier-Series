//Global Initial Parameters:
var layout = {
    // autosize: true,
    hovermode: "closest",
    margin: {l:30, r:30, t:30, b:30},
    showlegend: false,
    xaxis: {range: [-5,5], zeroline: true, title: "x"},
    yaxis: {range: [-5,5], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};

function setupxData (xMin, xMax, plotStep) {
    let xLine = [];
    for (let i = xMin; i <= xMax; i += plotStep){
        xLine.push(i);
    };
    return xLine;
};

function setupSquareFunctionData(xMin, xMax, plotStep, A,l) {
    let yLine = [];
    for (let i = xMin; i <= xMax; i += plotStep) {
        if (Math.abs(i) <= l/2) {
              yLine.push(A)
        } else {
              yLine.push(0);
        };
    };
    return yLine;
}

function setupFourierTransformData(xMin, xMax, plotStep, A,l) {
    let yLine = [];
    for (let i = xMin; i <= xMax; i += plotStep) {
        yLine.push(5*l/(2*Math.PI)*Math.sin(i*l/2)/(i*l/2))
    };
    return yLine;
}

function dataSquareCompile(xLine, yLine){
    let dataLine = {
                     x:xLine,
                     y:yLine,
                     type: 'scatter',
                     mode: 'lines',
                     line: {
                            color: 'rgb(0,0,0)',
                            width: 3
                          },
//                     name: 'Incident Wave',
                     showscale: false
                     };
    return dataLine;
}

function dataFourierTransformCompile(xLine, yLine){
    let dataLine = {
                     x:xLine,
                     y:yLine,
                     type: 'scatter',
                     mode: 'lines',
                     line: {
                            color: 'rgb(0,0,128)',
                            width: 3
                          },
//                     name: 'Incident Wave',
                     showscale: false
                     };
    return dataLine;
}

function updatePlot(xMin, xMax, plotStep, A, topHatLayout, fourierTransformLayout){
    let l = parseFloat(document.getElementById('Slider_l').value);

    xLine = setupxData (xMin, xMax, plotStep);
    ySquareLine = setupSquareFunctionData(xMin, xMax, plotStep, A,l);
    yFourierTransformLine = setupFourierTransformData(xMin, xMax, plotStep, A,l);

    dataSquareLine = dataSquareCompile(xLine, ySquareLine);
    dataFourierTransformLine = dataFourierTransformCompile(xLine, yFourierTransformLine);

    Plotly.react("Top_Hat_Graph", [dataSquareLine], topHatLayout)
    Plotly.react("Fourier_Transform_Graph", [dataFourierTransformLine], fourierTransformLayout)

}

function main() {
    const A = 8;
    const xMin = -10;
    const xMax = -1*xMin;
    const yMin = -2;
    const yMax = 10;
    const plotStep = xMax/10000;

    const topHatLayout = {
        title: "Top Hat Graph",
//        showlegend: false,
        xaxis: {
            constrain: "domain",
            range: [xMin, xMax],
            title: "x",
            showticklabels: false
        },
        yaxis: {
//            scaleanchor: "x",
            range: [yMin, yMax],
            showticklabels: false,
            title: "f(x)"
        },
        margin: {
            l: 1, r: 1, b: 30, t: 30, pad: 10
        },
    };

    const fourierTransformLayout = {
        title: "Fourier Transform Graph",
//        showlegend: false,
        xaxis: {
            constrain: "domain",
            range: [xMin, xMax],
            title: "k",
            showticklabels: false
        },
        yaxis: {
//            scaleanchor: "x",
            range: [yMin, yMax],
            showticklabels: false,
            title: "F(k)"
        },
        margin: {
            l: 1, r: 1, b: 30, t: 30, pad: 10
        },
    };


    updatePlot(xMin, xMax, plotStep, A, topHatLayout, fourierTransformLayout);

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(xMin, xMax, plotStep, A, topHatLayout, fourierTransformLayout); //Updating the plot is linked with display (Just My preference)
        });

    });

    // as you select the functions you want from the scroll down
    // change the shape and the plots
    // change the titles and the math derivations
//    $('#SelectSec2Sub1').change(selectorFuncSec2Sub0);

}

$(document).ready(main); //Load main when document is ready.