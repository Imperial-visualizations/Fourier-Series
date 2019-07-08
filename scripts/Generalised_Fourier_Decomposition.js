$('#NController2').hide();
$('#NController2Display').hide();

function setLayout(sometitlex, sometitley, plotTitle) {

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

//resolution, number of points on the graph shown
var resolution = 10000;
// slider for N
// slider for L
var L = parseFloat(document.getElementById('LController').value);
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
sqrt = Math.sqrt


var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var arctan = Math.atan;
var log = Math.log;

var shape = 6;

x = 2;
var equation = "x^2";

//return the a_n amplitudes of the fourier series
function aCoeff (shape, n){
    var L = parseFloat(document.getElementById('LController').value);
    var A = 1;//parseFloat(document.getElementById('AController').value);

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
function bCoeff(shape,n){
    var L = parseFloat(document.getElementById('LController').value);
    var A = 1; //parseFloat(document.getElementById('AController').value);

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

function coefficientPre (N){
    var n = [];
    var an = [];
    var bn = [];
    var alpha_n = [];
    var theta_n = [];

    for (let i = 0; i < N; ++i){
        n.push(i);
        an.push(aCoeff(shape,i));
        bn.push(bCoeff(shape,i));
        alpha_n.push(Math.sqrt(aCoeff(shape,i)**2+bCoeff(shape,i)**2));
        //Theta is defined strangely because javascript can't handle arctan( plus/minus infinity)
        if (aCoeff(shape,i)===0){
            if (bCoeff(shape,i)>0) {
                theta_n.push(Math.PI/2);
            } else if (bCoeff(shape,i)<0) {
                theta_n.push(-Math.PI/2);
            } else if (bCoeff(shape,i)===0){
                theta_n.push(0);
            }
        } else {
            theta_n.push(Math.atan2(bCoeff(shape,i),aCoeff(shape,i)));
        }
    }

    return [n, an, bn, alphan, thetan];
}

// sum up all the number in the array
function adding(array) {
    var result = 0;
    for (var i = 0; i < array.length; ++i) {
        result += array[i];
    }
    return result;
}

// convert the string to a numerical function
function y_values(x_range) {
    //Takes the specified function and computes the y values for given x values
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation));
        //eval turns the string specified by the user into a command
    }
    return y;
}

function y_values_cosine(x_range, n, L) {
//Takes the input function f(x) and finds f(x)cos(n pi x/L) for specified x
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation) * Math.cos(n * Math.PI * x / L))
    }
    return y;
}


function y_values_sine(x_range, n, L) {
//Takes the input function f(x) and finds f(x)sin(n pi x/L) for specified x
    var y = [];
    for (var i in x_range) {
        x = x_range[i];
        y.push(eval(equation) * Math.sin(n * Math.PI * x / L))
    }
    return y;
}


var yOriginal = y_values(xOriginal);

//Computes and stores the y values of the specified function

function integration_simps(x, y) {
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

function integration_ultra(kMax, L, n, integral) {
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
        var f_of_xk = y_values_cosine(x_k, n, L);
    }

    else if (integral === "for_bn") {
        var f_of_xk = y_values_sine(x_k, n, L)
    }
    else {
        var f_of_xk = y_values(x_k);
    }

    var Area = 0;
    for (var i = 0; i < x_k.length; ++i) {
        Area += (omega_k[i] * f_of_xk[i]);
    }
    return Area * L;
}

function integration(x, y) {
    //Integration by Riemann sum
    let A = 0;
    for (let i = 0; i < x.length - 1; i++) {
        A += (x[i + 1] - x[i]) * (y[i + 1] + y[i]) / 2;
    }
    return A;
}

//For custom functions
function initFourier() {
    Plotly.purge("graph");
    Plotly.purge("graph2");
    Plotly.purge("graph3");
    [datalist,titley] = computePlot1(xOriginal, yOriginal)
    Plotly.newPlot("graph", datalist[0], setLayout('$x$', '$f(x)$', 'Fourier Series'));
    Plotly.newPlot("graph2", datalist[1], setLayout('$x$', '$f_{n}(x)$', 'Components of Series'));
    Plotly.newPlot("graph3", datalist[2], setLayout('$n$', titley, 'Power Spectrum'));

    return;
}


function a_n(n, x) {
    let L = parseFloat(document.getElementById('LController').value);
    //Updates L so that we can calculate a_n for all necessary n

    an = integration_ultra(kMax, L, n, "for_an") / L;
    return an;
}

function b_n(n, x) {
    //Same as in an but for bn (sin as opposed to cos)
    let L = parseFloat(document.getElementById('LController').value);

    bn = integration_ultra(kMax, L, n, "for_bn") / L;
    return bn;
}

function Fourier_coefficient(x) {
    //For all n from 0 to N, calculates a_n and b_n
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NController').value)+1;
    }



    var n = [];//List of all terms that will be generated
    var an = [];
    var bn = [];
    var alphan = [];
    var thetan = [];
    for (let i = 0; i < N; i++) {
        let a = a_n(i, x);
        let b = b_n(i, x);
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

function Trig_summation_x(an, bn, x_value) {
    //For a certain x_value in the function domain, uses the values of a_n and b_n
    //up to a given N, to reconstruct the function at that particular x point
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NController').value)+1;
    }

    var L = parseFloat(document.getElementById('LController').value);

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

    return adding(single_y);
}

function Trig_summation_n(an, bn, x) {
    //Calls up trig_summation_x for every x value, so we reconstruct the function
    //at every point in the domain, returns the y values in order
    let set_y = [];
    for (let i = 0; i < x.length; ++i) {
        set_y.push(Trig_summation_x(an, bn, x[i]));
    }
    //console.log(set_y);
    return set_y;
}


// return the data that stores one component of the Fourier Series
function plotSines(an, bn, n, x) {
    //Plots individual components that are being built up to the total function
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2').value);
    } else {
        var N = parseFloat(document.getElementById('NController').value);
    }

    var L = parseFloat(document.getElementById('LController').value);

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
function computePlot1(x, y) {
    //Retrieves an,bn, then uses those to find the reconstructed function y values
    //then plots this
    //Calculate coefficients if custom function
    if (shape === 6) {[n, an, bn, alphan, thetan] = Fourier_coefficient(x);}

    //Otherwise use predetermined coefficients
    else {
    if (shape === 3) {
        var N = parseFloat(document.getElementById('NController2').value)+1;
    } else {
        var N = parseFloat(document.getElementById('NController').value)+1;
    }

    [n, an, bn, alphan, thetan] = coefficientPre(N);}
    //console.log(bn);
    y2 = Trig_summation_n(an, bn, x);
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
    console.log(n);
    data2.push(plotSines(an, bn, 0, x));
    console.log(data2);
    for (var i = 1; i < n.length; ++i) {
        data2.push(plotSines(an, bn, n[i], x));
    }
    let y3;
    let title;

    coefficient = document.getElementById('Coefficient').value
    if (coefficient == "a") {
        y3 = an
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

function insert(index, item) {
    this.splice( index, 0, item );
};

function updateFunction() {
    //Looks at equation the user typed in and retrieves this
    let equation = document.getElementById("aInput").value;
    let error = false;
    let change = false;
    let equationB =[];
    //Input Equation filtering
    for(let i=0; i<equation.length; i++){
        //Don't allow equations containing i
        if(equation[i] === 'i'){
            //Allow sin and arcsin
            if(equation[i-1] === 's'){error = false}
            else {error = true;}
            };

        equationB.push(equation[i]);

        //Replace ^ with ** for exponents
        if(equationB[i] === '^'){equationB[i] = '**'; change = true;};
    }
    if(change) {equation = equationB.join("");}

    if(error===true) {return '';}
    else {return equation;}
}


/* updates the plot according to the slider controls. */

// Plotly.animate does not support bar charts, so need to reinitialize the Cartesian every time.

//For custom function
function updatePlot() {
    let data;
    let L = parseFloat(document.getElementById('LController').value);
    let xOriginal = numeric.linspace(-L, L, resolution);
    // NB: updates according to the active tab
    if (shape===6){
            equation = updateFunction();
    }

    [datalist, titley] = computePlot1(xOriginal, yOriginal);

    yOriginal = y_values(xOriginal);

    Plotly.react("graph", datalist[0], setLayout('$x$', '$f(x)$', 'Fourier Series'));
    Plotly.react("graph2", datalist[1], setLayout('$x$', '$f_{n}(x)$', 'Components of Series'));
    Plotly.react("graph3", datalist[2], setLayout('$n$', titley, 'Power Spectrum'));

}

function main() {
    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function () {
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#" + $(this).attr("id") + "Display").text($(this).val() + $("#" + $(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(); //Updating the plot is linked with display (Just My preference)
        });

    });

    $('#Coefficient').change(function () {
        updatePlot();
    })



    $('#Select').change(function(){
        let selectedValue = document.getElementById("Select").value;
        if (selectedValue==="main"){
            shape = 6;
            $('#input').show();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        } else if (selectedValue==="triangular"){
            shape = 0;
            $('#input').hide();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        } else if (selectedValue==="square"){
            shape = 1;
            $('#input').hide();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        } else if (selectedValue==="sawtooth"){
            shape = 2;
            $('#input').hide();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        } else if (selectedValue==="dirac"){
            shape = 3;
            $('#input').hide();
            $('#N').text('10');
            $('#NController').hide();
            $('#NController2').show();
            $('#NController2Display').show();
            $('#NControllerDisplay').hide();
        } else if (selectedValue==="parabola"){
            shape = 4;
            $('#input').hide();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        }  else if (selectedValue==="mode"){
            shape = 5;
            $('#input').hide();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        } else if (selectedValue==="custom"){
            shape = 6;
            $('#input').show();
            $('#N').text('20');
            $('#NController2').hide();
            $('#NController').show();
            $('#NController2Display').hide();
            $('#NControllerDisplay').show();
        }
        $(".title").hide();
        $("#"+selectedValue+"Title").show();
        initFourier();
        updatePlot();
    })

    initFourier();
    updatePlot();
}

$(document).ready(main); //Load main when document is ready.