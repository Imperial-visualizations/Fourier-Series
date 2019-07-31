/*jshint esversion: 7 */
//Global Initial Parameters:
var layout = {
    //autosize: true,
    margin: {l: 30, r: 40, t: 30, b: 30},
    hovermode: "closest",
    xaxis: {range: [-5, 5], zeroline: true, title: ""},
    yaxis: {
        range: [0, 305], zeroline: true, title: "$N$", showticklabels: true, tickmode: 'array',
        tickvals: [30, 60, 90, 120, 150, 180, 210, 240, 270,300],
        ticktext: ['n=0','n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6', 'n=7', 'n=8', 'n=9', 'n=10'],
        side: 'right'
    },
    aspectratio: {x: 1, y: 1}
};

var defaultHref = window.location.href;
var initX = 0, initY = 0;
var resolution = 4000;
// set the step of the x axis from -2pi to 2pi
var z = numeric.linspace(-2 * Math.PI, 2 * Math.PI, resolution);
// Define our interacting Jquery elements

var Nslider = $("#NControllerSec3");
var Lslider = $("#LControllerSec3");
var Aslider = $("#AControllerSec3");

//----------------------------------------------------------------------------------------------------------------------
//VERY IMPORTANT!!!
// 0 is triangular, 1 is square, 2 is sawtooth, 3 is delta's, 4 is parabola, 5 is x, 6 is |x|,
var shape = 0;
//----------------------------------------------------------------------------------------------------------------------
// decay and decay2 is to optimize the visualization of the amplitude of the component plots.
var decay = 0.9;
var decay2 = 0.6;

/* set the default layout of the graph to adjust for different amplitudes and different number of terms involved
it changes the range of the y-axis according to the amplitude and number of terms
so the setLayout allows the layout to fit the graph, instead of fixing the layout to some values
*/
function setLayoutSec3() {
    var n_lab = [];
    var y_lab = [];
    for (var i = 0; i < 10; i++) {
        n_lab.push("n=" + (i ));
        y_lab.push(29.5 * (i + 1));
    }
    const new_layout = {
        // autosize: true,
        showlegend: false,
        margin: {l: 45, r: 60, t: 0, b: 30},
        hovermode: "closest",
        xaxis: {range: [], zeroline: true, title: ""},
        yaxis: {
            range: [0, 305], zeroline: true, title: "", showticklabels: true, tickmode: 'array',
            tickvals: y_lab,
            ticktext: n_lab,
            tickfont: {size: 18},
            side: 'right'
        },
        aspectratio: {x: 1, y: 1}
    };


    return new_layout;
}

// initialize the Cartesian coordinates for the plots and the functions
function initFourierSec3() {
    Plotly.purge("graph1Sec3");
    console.log(computeComponentsSec3());
    Plotly.newPlot("graph1Sec3", computeComponentsSec3(z), setLayoutSec3());
    // $("#Triangle_eqn").show();
    // $("#Square_eqn").hide();
    // $("#Sawtooth_eqn").hide();
    // $("#Dirac_eqn").hide();
    // $("#Parabola_eqn").hide();
    // $("#Modx_eqn").hide();
}


// sum up all the number in the array
function addingSec3(array) {
    var result = 0;
    for (var i = 0; i < array.length; ++i) {
        result += array[i];
    }
    return result;
}

//----------------------------------------------------------------------------------------------------------------------
// Start. Functions to plot all the Fourier Series' components.

// a_n
// a_n part is to multiply the function f(x) by sin, and sin is an odd function
// after the if statement, each function has been optimized for better visualization
// comment behind each if statement is the original a_n of each function without optimization
function odd_selection2Sec3(n, A, L, type) {
    //Represents the bn part of the function summand
    if (type === 0) {
        amplitude = (A * (-1) ** n) * (decay) ** n; // (8*A*1/((2*(n)-1) *np.pi)**2)*((-1)**(n))
    } else if (type === 1) {
        amplitude = (A * (1 - (-1) ** n)) * (decay) ** n; // A/(n*np.pi) *(1-(-1)**n)
    } else if (type === 2) {
        amplitude = (A * (-1) ** (n + 1)) * (decay) ** n;  //  2*A*(-1)**(n+1) /(n*np.pi)
    } else if (type === 3) {
        amplitude = 0;
    } else if (type === 4) {
        amplitude = 0;// (((4*L**2)/(n*Math.PI)**2)*(-1)**n)
    } else if (type === 5) {
        amplitude = 0.5 * A * (2 * (-1) ** (n + 1) * decay ** n); //A*(2*L/(n*Math.PI)*(-1)**(n+1)
    } else if (type === 6) {
        amplitude = 0;
    }
    return amplitude;
}

//Note with both the an and bn part, the amplitude isn't necessarily mathematially correct, if that was done the components just
//get too small, so we use a decay power law, so that the components dont get too small too quickly
// b_n
// b_n part is to multiply the function f(x) by cos, and cos is and even function
function even_selection2Sec3(n, A, L, type) {
    //Gives the an part of the function sum
    if (type === 6) {
        if (n === 0) {
            amplitude2 = A * L;
        } else {
            amplitude2 = 2 * A * ((-1) ** (n) - 1);
        }
    } else if (type === 3) {
        if (n === 0) {
            amplitude2 = 1 / (2 * L);
        } else {
            amplitude2 = 1 / L;
        }
    } else if (type === 4) {
        if (n === 0) {
            amplitude2 = A * (L ** 2) / 3;
        } else {
            amplitude2 = (4 / Math.PI) * A * (L ** 2) * ((-1) ** n) * decay ** n;
        }
    } else if (type === 0 || type === 1 || type === 2 || type === 5) {
        amplitude2 = 0;
    }
    return amplitude2;
}

// return the data that stores one component of the Fourier Series
function plotSinesSec3(n, x, shape) {
    //Plots individual components that are being built up to the total function
    var L = Lslider.val();
    var A = Aslider.val();

    var x_n = [];
    var y_n = [];
    var spacing;
    var scale;
    if (shape === 4) {
        spacing = 580;
        scale = 0.05;
    } else if (shape === 3) {
        scale = 5;
        spacing = 5.8;
    } else if (shape === 6) {
        scale = 0.5;
        spacing = 60;
    } else {
        spacing = 30;
        scale = 1;
    }
    var spacing2 = Math.sqrt((odd_selection2Sec3(n, A, L, shape)) ** 2 + (even_selection2Sec3(n, A, L, shape))) + 1;


    for (var i = 0; i < x.length-1; ++i) {
        x_n.push(x[i]);
        y_n.push(scale * 0.98*(((odd_selection2Sec3(n, A, L, shape)) * Math.sin(n * Math.PI * x[i] / L) + (even_selection2Sec3(n, A, L, shape)) * Math.cos(n * Math.PI * x[i] / L)) + spacing * (n+1)));
    }
    //y value gets shifted up so that the plots are distinctly different
    var n_lab2 = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9','10'];
    var y_lab2 = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300,330];
    var data =
        {
            type: "scatter",
            mode: "lines",
            x: x_n,
            y: y_n,
            line: {color: "rgb(0,N*10,0)", width: 3, dash: "dashed"},

        }
    ;
    return data;

}

// get each single component by recalling plotSines, and plot out all the components of the Fourier Series
function computeComponentsSec3(x) {
    var N = parseFloat(Nslider.val());
    var data_value = [];
    for (var n = 0; n < N+1; ++n) {
        data_value.push(plotSinesSec3(n, z, shape));
    }

    return data_value;

}

// End. Functions for to plot all the Fourier Series' components.
//----------------------------------------------------------------------------------------------------------------------


/** updates the plot according to the slider controls. */
// Plotly.animate does not support bar charts, so need to reinitialize the Cartesian every time.
function updatePlotSec3() {
    var data;
    // NB: updates according to the active tab
    var selectedValue = document.getElementById("SelectSec3").value; // finds out which function is active
    $(document).ready(() => {
        if (shape === 3) {
            $('#ASec3').hide();
            //
            // $("#Triangle_eqn").hide();
            // $("#Square_eqn").hide();
            // $("#Sawtooth_eqn").hide();
            // $("#Dirac_eqn").show();
            // $("#Parabola_eqn").hide();
            // $("#Modx_eqn").hide();

        } else {
            $('#ASec3').show();
            // if (shape === 0)  $(document).ready(() => {
            //     $("#Triangle_eqn").show();
            //     $("#Square_eqn").hide();
            //     $("#Sawtooth_eqn").hide();
            //     $("#Dirac_eqn").hide();
            //     $("#Parabola_eqn").hide();
            //     $("#Modx_eqn").hide();
            // });
            // else if (shape === 1)  $(document).ready(() => {
            //     $("#Triangle_eqn").hide();
            //     $("#Square_eqn").show();
            //     $("#Sawtooth_eqn").hide();
            //     $("#Dirac_eqn").hide();
            //     $("#Parabola_eqn").hide();
            //     $("#Modx_eqn").hide();
            // });
            // else if (shape === 2)  $(document).ready(() => {
            //     $("#Triangle_eqn").hide();
            //     $("#Square_eqn").hide();
            //     $("#Sawtooth_eqn").show();
            //     $("#Dirac_eqn").hide();
            //     $("#Parabola_eqn").hide();
            //     $("#Modx_eqn").hide();
            // });
            // else if (shape === 4)  $(document).ready(() => {
            //     $("#Triangle_eqn").hide();
            //     $("#Square_eqn").hide();
            //     $("#Sawtooth_eqn").hide();
            //     $("#Dirac_eqn").hide();
            //     $("#Parabola_eqn").show();
            //     $("#Modx_eqn").hide();
            // });
            // else if (shape === 6)  $(document).ready(() => {
            //     $("#Triangle_eqn").hide();
            //     $("#Square_eqn").hide();
            //     $("#Sawtooth_eqn").hide();
            //     $("#Dirac_eqn").hide();
            //     $("#Parabola_eqn").hide();
            //     $("#Modx_eqn").show();
            // });

        }
    });
    initFourierSec3();
}

function mainSec3() {

    console.log("mainRunning");

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        console.log("fired");
        $(this).on('input', function () {
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlotSec3(); //Updating the plot is linked with display (Just My preference)
        });

    });

    // as you select the functions you want from the scroll down
    // change the shape and the plots
    // change the titles and the math derivations
    $('#SelectSec3').change(function () {
        var selectedValue = document.getElementById("SelectSec3").value;
        console.log(selectedValue);
        if (selectedValue === "main") {
            shape = 0;
            updatePlotSec3();
        } else if (selectedValue === "triangular") {
            shape = 0;
            updatePlotSec3();
        } else if (selectedValue === "square") {
            shape = 1;
            updatePlotSec3();
        } else if (selectedValue === "sawtooth") {
            shape = 2;
            updatePlotSec3();
        } else if (selectedValue === "dirac") {
            shape = 3;
            updatePlotSec3();
        } else if (selectedValue === "parabola") {
            shape = 4;
            updatePlotSec3();
        } else if (selectedValue === "linear") {
            shape = 5;
            updatePlotSec3();
        } else if (selectedValue === "mode") {
            shape = 6;
            updatePlotSec3();
        }
        $(".title").hide();
        $("#" + selectedValue + "Title").show();
        initFourierSec3();
    });
    //The First Initialisation - I use 's' rather than 'z' :p
    initFourierSec3();
}

$(document).ready(mainSec3); //Load main when document is ready.