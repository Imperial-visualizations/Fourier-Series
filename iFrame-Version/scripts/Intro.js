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

var defaultHref = window.location.href;
var initX = 0, initY = 0;
var resolution = 2000;
// set the step of the x axis from -2pi to 2pi
var z = numeric.linspace(-2*Math.PI,2*Math.PI,resolution);
//----------------------------------------------------------------------------------------------------------------------
//VERY IMPORTANT!!!
// 0 is triangular, 1 is square, 2 is sawtooth, 3 is delta's, 4 is parabola, 5 is x, 6 is |x|,
var shape = 1;
//----------------------------------------------------------------------------------------------------------------------
const A = 2;
const L = 1;

// initialize the Cartesian coordinates for the plots and the functions
function initFourierSec2Sub0() {
    Plotly.purge("graph0Sec0");
    Plotly.newPlot("graph0Sec0", computePlotSec2Sub0(z), layout);
    return;
}


// sum up all the number in the array
function addingSec2Sub0(array){
    let result = 0
    for(let i =0; i<array.length; ++i){
        result+=array[i];
    }
    return result;
}

//----------------------------------------------------------------------------------------------------------------------
// Start. Functions to plot the Fourier Series

// select the kind of Fourier Series you want
function selectionSec2Sub0(n,A,L,x){
    //Is summand of the particular function
    formula = 2*A/(n*Math.PI) *(1-(-1)**n) *Math.sin(n*Math.PI *x/L);
    return formula;
}

// Function for exact Targets
function exactSec2Sub0 (A,L,x) {
    let data;
    let x_values = [];
    let y_values = [];
    let newX;
    let newY;

    newY = -A;
    newX = -15*L;
    for (let i=0; i<=50; i++) {
        newX=newX+L;
        x_values.push(newX);
        y_values.push(newY);
        newY=-newY;
        x_values.push(newX);
        y_values.push(newY);
    };

    data=
        {
            type:"scatter",
            mode:"lines",
            x: x_values,
            y: y_values,
            line:{color:"#000000", width:2, dash: "dot"},
        };
    return data;
}

// sum up all the terms in the Fourier Series
// so at x, we have terms n=0, n=1, n=2..., we sum up all the amplitudes y=y0+y1+y2+... y0 at n=0, y1 at n=1, y2 at n=2...
function summationSec2Sub0(x) {
    //Goes through and sums up each component of the summand up to N
    let N = parseFloat(document.getElementById('NControllerSec2Sub1').value);

    n = numeric.linspace(1,N,N);


    let y = [];


    for (let i = 0; i < N; ++i){
        y.push(selectionSec2Sub0(n[i],A,L,x));
        //y.push((8*A/((2*n[i]-1)*Math.PI)**2)*((-1)**n[i])*Math.sin((2*n[i]-1)*Math.PI*x/L));
    }
    let sum = addingSec2Sub0(y);
    return sum;
}



function c_interceptSec2Sub0(N,A,L) {
    let number = 0;
    for (let n = 1; n < N; ++n){
        number += selectionSec2Sub0(n, A,L, 0);
        };
    return number;
}



// plot the Fourier series
// y_values_cheat is to set the each of the value equals its midpoint value plus the y_value
// so all the y_value_cheat starts at the midpoint of the y_value (equivalently, it's the average value)
function computePlotSec2Sub0(x){
    //Just plots the sum approximation of the function
    let N = parseFloat(document.getElementById('NControllerSec2Sub1').value);

    let x_values = [];
    let y_values = [];
    let y_values_cheat = [];

    for (let i = 0; i < x.length ; ++i){
        y_values.push(summationSec2Sub0(x[i]));
        x_values.push(x[i]);
    }
    for (let i = 0; i< y_values.length; ++i){
        y_values_cheat.push(-y_values[y_values.length/2]+y_values[i] + c_interceptSec2Sub0(N,A,L));

        //The part "-y_values[y_values.length/2] +y_values[i]" centres
        //the equation so that the y value is equal to zero at x = 0
        //the "c_intercept" part then shifts it all to the correct height.
        //This was a bit of a long convoluted way to do this but I can't find the mistake,
        //so this fixes it. It's not too time consuming which is good.
    }
    let data1;
        data1=
         {
            type:"scatter",
            mode:"lines",
            x: x_values,
            y: y_values_cheat,
            line:{color:"#960078", width:3, dash: "solid"},
         };
    let data2 = exactSec2Sub0(A,L,x);
    return [data1,data2];
}
// End. Functions to plot the Fourier Series.
//----------------------------------------------------------------------------------------------------------------------


/** updates the plot according to the slider controls. */
// Plotly.animate does not support bar charts, so need to reinitialize the Cartesian every time.
function updatePlotSec2Sub0() {
    let data;
    // NB: updates according to the active tab
//    let selectedValue = document.getElementById("SelectSec2Sub1").value; // finds out which function is active
//        $(document).ready(() => {
//           $('#ASec2Sub1').show(); console.log('shown')
//        })
    data = computePlotSec2Sub0(z);
    //This is animation bit.
    Plotly.animate(
        'graph0Sec0',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "afterall"
        }
    );
}

function mainSec2Sub0() {

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlotSec2Sub0(); //Updating the plot is linked with display (Just My preference)
        });

    });

    // as you select the functions you want from the scroll down
    // change the shape and the plots
    // change the titles and the math derivations
//    $('#SelectSec2Sub1').change(selectorFuncSec2Sub0);

    initFourierSec2Sub0();
}

$(document).ready(mainSec2Sub0); //Load main when document is ready.