$('#NController2Sec5').hide();
$('#NController2Sec5Display').hide();

function setLayoutSec5(sometitlex, sometitley, plotTitle) {

    const new_layout = {
        autosize: true,
        title: {text: plotTitle},
        margin: {l: 45, r: 30, t: 30, b: 30},
        hovermode: "closest",
        showlegend: false,
        xaxis: {range: [], zeroline: true, title: sometitlex},
        yaxis: {range: [], zeroline: true, title: sometitley},
        aspectratio: {x: 1, y: 1}
    };
    return new_layout;
}


var numbers = "0123456789";

//resolution, number of points on the graph shown
var resolution = 10000;
// slider for N
// slider for L
var L = parseFloat(document.getElementById('LControllerSec5').value);
var xOriginal = numeric.linspace(-L, L, resolution);

// kMax is an integer, the larger it is the better the numerical integration
var kMax = 1000;
var h = 5.0 / kMax;
//Common functions:
sin = Math.sin;
cos = Math.cos;
tan = Math.tan;
sinh = Math.sinh;
cosh = Math.cosh;
tanh = Math.tanh;
log = Math.log;
exp = Math.exp;
arcsin = Math.arcsin;
arccos = Math.arccos;
arctan = Math.arctan;
arsinh = Math.asinh;
arcsinh = Math.asinh;
arcosh = Math.acosh;
arccosh = Math.acosh;
artanh = Math.atanh;
arctanh = Math.atanh;
sqrt = Math.sqrt;


var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var arctan = Math.atan;
var log = Math.log;

var shape = 6;

x = 2;
var equation = "x^2";

//return the a_n amplitudes of the fourier series
function aCoeffSec5 (shape, n){
    var L = parseFloat(document.getElementById('LControllerSec5').value);
    var A = 1;//parseFloat(document.getElementById('AControllerSec5').value);

    var amplitude;
    if (shape === 0) {
        amplitude = 0;
    } else if (shape === 1){
        amplitude = 0;
    } else if (shape === 2){
        amplitude = 0;
    } else if (shape === 3){
        amplitude = 1/L;
    } else if (shape === 4){
        if (n===0){
            amplitude = 2*L**2/3;
        } else {
            amplitude = A*(4*L**2/(n*Math.PI)**2)*(-1)**n;
        }
    } else if (shape === 5){
        if (n===0){
            amplitude = A*L;
        } else {
            amplitude = (2*A*L/(n*Math.PI)**2)*((-1)**n - 1);
        }
    }
    return amplitude;
}

//Return the b_n amplitudes of the fourier series
function bCoeffSec5(shape,n){
    var L = parseFloat(document.getElementById('LControllerSec5').value);
    var A = 1; //parseFloat(document.getElementById('AControllerSec5').value);

    var amplitude;
    if (n===0){
        amplitude = 0;
    } else {
        if (shape === 0){
            amplitude=(8*A*1/((2*(n)-1) *Math.PI)**2)*((-1)**(n));
        } else if (shape === 1){
            amplitude=A/(n*Math.PI) *(1-(-1)**n);
        } else if (shape === 2){
            amplitude = 2*A*(-1)**(n+1) /(n*Math.PI)
        } else if (shape === 3){
            amplitude = 0;
        } else if (shape === 4){
            amplitude = 0;
        } else if (shape === 5){
            amplitude = 0;
        }
    }
    return amplitude;
}

function coefficientPreSec5 (N){
    var n = [];
    var an = [];
    var bn = [];
    var alpha_n = [];
    var theta_n = [];

    for (let i = 0; i < N; ++i){
        n.push(i);
        an.push(aCoeffSec5(shape,i));
        bn.push(bCoeffSec5(shape,i));
        alpha_n.push(Math.sqrt(aCoeffSec5(shape,i)**2+bCoeffSec5(shape,i)**2));
        //Theta is defined strangely because javascript can't handle arctan( plus/minus infinity)
        if (aCoeffSec5(shape,i)===0){
            if (bCoeffSec5(shape,i)>0) {
                theta_n.push(Math.PI/2);
            } else if (bCoeffSec5(shape,i)<0) {
                theta_n.push(-Math.PI/2);
            } else if (bCoeffSec5(shape,i)===0){
                theta_n.push(0);
            }
        } else {
            theta_n.push(Math.atan2(bCoeffSec5(shape,i),aCoeffSec5(shape,i)));
        }
    }

    return [n, an, bn, alpha_n, theta_n];
}

// sum up all the number in the array
function addingSec5(array) {
    var result = 0;
    for (var i = 0; i < array.length; ++i) {
        result += array[i];
    }
    return result;
}

// convert the string to a numerical function
function y_valuesSec5(x_range) {
    //Takes the specified function and computes the y values for given x values
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation));
        //eval turns the string specified by the user into a command
    }
    return y;
}

function y_values_cosineSec5(x_range, n, L) {
//Takes the input function f(x) and finds f(x)cos(n pi x/L) for specified x
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation) * Math.cos(n * Math.PI * x / L))
    }
    return y;
}


function y_values_sineSec5(x_range, n, L) {
//Takes the input function f(x) and finds f(x)sin(n pi x/L) for specified x
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation) * Math.sin(n * Math.PI * x / L))
    }
    return y;
}


var yOriginal = y_valuesSec5(xOriginal);

//Computes and stores the y values of the specified function

function integration_simpsSec5(x, y) {
    //Integration by Simpson's rule
    var a = x[0];
    var b = x[x.length - 1];
    var N = x.length;
    var h = (b - a) / N;
    var A = 0;
    for (var i = 1; i < x.length; ++i) {
        if (i % 2 === 0) {
            A += 2 * y[i];
        } else {
            A += 4 * y[i];
        }
    }
    A += y[0] + y[y.length - 1];
    A = A * h / 3;
    return A
}

function integration_ultraSec5(kMax, L, n, integral) {
    //Numerical integration by tanh-sinh quadrature, integrates from -L to L
    //If specified, will integrate after multiplying by cos or sin n pi x/L
    var h = 5.0 / kMax
    var omega_k = [];
    var x_k = [];
    for (var i = -kMax; i < kMax; ++i) {
        x_k.push((Math.tanh(0.5 * Math.PI * Math.sinh(i * h))) * L);
        omega_k.push(0.5 * h * Math.PI * Math.cosh(i * h) / (Math.cosh(0.5 * Math.PI * Math.sinh(i * h))) ** 2);
    }
    if (integral === "for_an") {
        var f_of_xk = y_values_cosineSec5(x_k, n, L);
    }

    else if (integral === "for_bn") {
        var f_of_xk = y_values_sineSec5(x_k, n, L)
    }
    else {
        var f_of_xk = y_valuesSec5(x_k);
    }

    var Area = 0;
    for (var i = 0; i < x_k.length; ++i) {
        Area += (omega_k[i] * f_of_xk[i]);
    }
    return Area * L;
}

function integrationSec5(x, y) {
    //Integration by Riemann sum
    let A = 0;
    for (let i = 0; i < x.length - 1; i++) {
        A += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
    }
    return A;
}

//For custom functions
function initFourierSec5() {
    Plotly.purge("graph1Sec5");
    Plotly.purge("graph2Sec5");
    Plotly.purge("graph3Sec5");
    [datalist,titley] = computePlot1Sec5(xOriginal, yOriginal)
    Plotly.newPlot("graph1Sec5", datalist[0], setLayoutSec5('$x$', '$f(x)$', 'Fourier Series'));
    Plotly.newPlot("graph2Sec5", datalist[1], setLayoutSec5('$x$', '$f_{n}(x)$', 'Components of Series'));
    Plotly.newPlot("graph3Sec5", datalist[2], setLayoutSec5('$n$', titley, 'Power Spectrum'));

    return;
}

function oddEvenCheckSec5(L){
    let x_ar = numeric.linspace(0, L, 100);
    let y_plus = x_ar.map(x => {
        return eval(equation);
    });

    //console.log(`y_plus ${y_plus}`);
    x_ar = numeric.linspace(0, -L, 100);
    let y_minus = x_ar.map(x => {
        return eval(equation);
    });
    //console.log(`y_minus ${y_minus}`)

    let y2 = [];
    for (let i = 0; i < x_ar.length; i++){
        y2.push(y_plus[i] + y_minus[i]);
    }
    //console.log(`y2 ${y2}`);

    //weird doesn't work
    /*
    let allZero = y2.every(elem => {
        return -1e-7 <= elem <= 1e-7;
    });
    */

    let sum = y2.reduce((accum, currVal) => {
        return accum + currVal;
    });
    if (Math.abs(sum) <= 1e-7) {
        return 'odd';
    } else{
        y2=[];
        for (let i = 0; i<x_ar.length; i++){
            y2.push(y_plus[i] - y_minus[i]);
        }
        //console.log(y2);
        sum = y2.reduce((accum, currVal) => {
            return accum + currVal;
        });
        //console.log(`sum ${sum}`);
        if (Math.abs(sum) <= 1e-7){
            return 'even';
        } else {
            return 'neither';
        }
    }
}

function a_nSec5(n, x) {
    let L = parseFloat(document.getElementById('LControllerSec5').value);
    //Updates L so that we can calculate a_n for all necessary n

    let parity = oddEvenCheckSec5(L);
    if (parity === 'odd'){
        an = 0;
    } else {
        an = integration_ultraSec5(kMax, L, n, "for_an") / L;
    }
    return an;
}

function b_nSec5(n, x) {
    //Same as in an but for bn (sin as opposed to cos)
    let L = parseFloat(document.getElementById('LControllerSec5').value);

    let parity = oddEvenCheckSec5(L);
    if (parity === 'even'){
        bn = 0;
    } else {
        bn = integration_ultraSec5(kMax, L, n, "for_bn") / L;
    }
    return bn;
}

function Fourier_coefficientSec5(x) {
    //For all n from 0 to N, calculates a_n and b_n
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2Sec5').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NControllerSec5').value)+1;
    }



    var n = [];//List of all terms that will be generated
    var an = [];
    var bn = [];
    var alphan = [];
    var thetan = [];
    for (let i = 0; i < N; i++) {
        let a = a_nSec5(i, x);
        let b = b_nSec5(i, x);
        n.push(i);
        an.push(a);
        bn.push(b);
        //Alpha and theta are a different way of constructing the function, can use these instead, not currently used in code
        alphan.push(Math.sqrt(a ** 2 + b ** 2));
        if (a === 0) {
            if (b >= 0) {
                thetan.push(Math.PI / 2);
            } else {
                thetan.push(-Math.PI / 2);
            }
        } else {
            thetan.push(Math.atan2(b, a));
        }
    }
    return [n, an, bn, alphan, thetan];
}

//Above code was for calculating components, below is for reconstructing the function for given N.

function Trig_summation_xSec5(an, bn, x_value) {
    //For a certain x_value in the function domain, uses the values of a_n and b_n
    //up to a given N, to reconstruct the function at that particular x point
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2Sec5').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NControllerSec5').value)+1;
    }

    var L = parseFloat(document.getElementById('LControllerSec5').value);

    let single_y = [an[0] / 2];//Average function value term

    //exception for triangle function
    if(shape === 0) {
        for (let n = 1; n < N; n++) {
        single_y.push(bn[n] * Math.sin(x_value*(2*n -1) *Math.PI /L));
        }
    } else {
        for (let n = 1; n < N; n++) {
        single_y.push(an[n] * Math.cos(n * Math.PI * x_value / L) + bn[n] * Math.sin(n * Math.PI * x_value / L));
        }
    }

    return addingSec5(single_y);
}

function Trig_summation_nSec5(an, bn, x) {
    //Calls up trig_summation_x for every x value, so we reconstruct the function
    //at every point in the domain, returns the y values in order
    let set_y = [];
    for (let i = 0; i < x.length; ++i) {
        set_y.push(Trig_summation_xSec5(an, bn, x[i]));
    }
    //console.log(set_y);
    return set_y;
}


// return the data that stores one component of the Fourier Series
function plotSinesSec5(an, bn, n, x) {
    //Plots individual components that are being built up to the total function
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2Sec5').value);
    } else {
        var N = parseFloat(document.getElementById('NControllerSec5').value);
    }

    var L = parseFloat(document.getElementById('LControllerSec5').value);

    //n = numeric.linspace(1,N,N);

    let x_n = [];
    let y_n = [];
    let spacing = Math.sqrt((bn[0]) ** 2 + (an[1]) ** 2) * L / (Math.sqrt(L ** 2));

    n=n+1;

    for (let i = 0; i < x.length; ++i) {
        x_n.push(x[i]);
        y_n.push(((bn[n - 1]) * Math.sin((n - 1) * Math.PI * x[i] / L) + (an[n - 1]) * Math.cos((n - 1) * Math.PI * x[i] / L)));
    }



    if(n === 1) {for(var i = 0, length = y_n.length; i < length; i++){
    y_n[i] = y_n[i]/2;
}}

    //y value gets shifted up so that the plots are distinctly different
    let data =
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
var data2

//The above was to reconstruct the function, below is to actually plot
function computePlot1Sec5(x, y) {
    //Retrieves an,bn, then uses those to find the reconstructed function y values
    //then plots this
    //Calculate coefficients if custom function
    if (shape === 6) {[n, an, bn, alphan, thetan] = Fourier_coefficientSec5(x);}

    //Otherwise use predetermined coefficients
    else {
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2Sec5').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NControllerSec5').value)+1;
    }

    [n, an, bn, alphan, thetan] = coefficientPreSec5(N);}
    //console.log(bn);
    let y2 = Trig_summation_nSec5(an, bn, x);
    //console.log(an[0]/2);

    let data1 = [
        {
            type: "scatter",
            mode: "lines",
            x: x,
            y: y2,
            line: {color: "#960078", width: 3, dash: "dashed"},
        },
    ];

    data2 = [];
    //console.log(n);
    data2.push(plotSinesSec5(an, bn, 0, x));
    //console.log(data2);
    for (var i = 1; i < n.length; ++i) {
        data2.push(plotSinesSec5(an, bn, n[i], x));
    }
    let y3;
    let title;

    coefficient = document.getElementById('CoefficientSec5').value
    if (coefficient == "a") {
        y3 = an;
        title = "$a_{n}$"
    }
    if (coefficient == "b") {
        y3 = bn;
        title = "$b_{n}$";
    }
    if (coefficient == "α") {
        y3 = alphan;
        title = "$α_{n}$";
    }
    if (coefficient == "θ") {
        y3 = thetan;
        title = "$θ_{n}$"

    }
    let data3 = [
        {
            type: "bar",
            mode: "lines",
            x: n,
            y: y3,
            marker: {
                color: '#0091D4',
                opacity: 0.7
            },
        },
    ];
    datalist = [data1, data2, data3]
    return [datalist, title];
}

function insertSec5(index, item) {
    this.splice( index, 0, item );
};

function updateFunctionSec5() {
    //Looks at equation the user typed in and retrieves this
    let equation = document.getElementById("aInputSec5").value;
    let error = false;

    //Input Equation filtering
    equation = equation.replace("=", "");

    //Change the syntax for symbol
    equation = equation.replace("^", "**");
                    
    for(let i=0; i<equation.length; i++){
        //Don't allow equations containing i
        if(equation[i] === 'i'){
            //Allow sin and arcsin
            if(equation[i-1] === 's'){
                error = false
            }else {
                error = true;
            }
        }
        if (equation[i] === 'x'){
            if (equation.length > 1) {
                //console.log(typeof eq[eq.length-2]);
                if (numbers.includes(equation[i-1])){
                    //console.log('passed');
                    equation = equation.slice(0,i) + '*' + equation.slice(i,equation.length);
                    //console.log(eq);
                }
            }
        }
    }
    if(error===true) {
        return '';
    }
    else {return equation;}
}


/* updates the plot according to the slider controls. */

// Plotly.animate does not support bar charts, so need to reinitialize the Cartesian every time.

//For custom function
function updatePlotSec5() {
    let data;
    let L = parseFloat(document.getElementById('LControllerSec5').value);
    let xOriginal = numeric.linspace(-L, L, resolution);
    // NB: updates according to the active tab
    if (shape===6){
            equation = updateFunctionSec5();
    }

    [datalist, titley] = computePlot1Sec5(xOriginal, yOriginal);

    yOriginal = y_valuesSec5(xOriginal);

    Plotly.react("graph1Sec5", datalist[0], setLayoutSec5('$x$', '$f(x)$', 'Fourier Series'));
    Plotly.react("graph2Sec5", datalist[1], setLayoutSec5('$x$', '$f_{n}(x)$', 'Components of Series'));
    Plotly.react("graph3Sec5", datalist[2], setLayoutSec5('$n$', titley, 'Power Spectrum'));

}

function mainSec5() {
    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function () {
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlotSec5(); //Updating the plot is linked with display (Just My preference)
        });

    });

    $('#CoefficientSec5').change(function () {
        updatePlotSec5();
    })



    $('#SelectSec5').change(function(){
        let selectedValue = document.getElementById("SelectSec5").value;
        if (selectedValue==="main"){
            shape = 6;
            $('#inputSec5').show();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        } else if (selectedValue==="triangular"){
            shape = 0;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        } else if (selectedValue==="square"){
            shape = 1;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        } else if (selectedValue==="sawtooth"){
            shape = 2;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        } else if (selectedValue==="dirac"){
            shape = 3;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('10');
            $('#NControllerSec5').hide();
            $('#NController2Sec5').show();
            $('#NController2Sec5Display').show();
            $('#NControllerSec5Display').hide();
        } else if (selectedValue==="parabola"){
            shape = 4;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        }  else if (selectedValue==="mode"){
            shape = 5;
            $('#inputSec5').hide();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        } else if (selectedValue==="custom"){
            shape = 6;
            $('#inputSec5').show();
            $('#NMaxSec5').text('20');
            $('#NController2Sec5').hide();
            $('#NControllerSec5').show();
            $('#NController2Sec5Display').hide();
            $('#NControllerSec5Display').show();
        }
        $(".title").hide();
        $("#"+selectedValue+"Title").show();
        initFourierSec5();
        updatePlotSec5();
    })

    initFourierSec5();
    updatePlotSec5();
}

$(document).ready(mainSec5); //Load main when document is ready.