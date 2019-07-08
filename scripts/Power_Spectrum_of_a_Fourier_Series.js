//Global Initial Parameters:
var defaultHref = window.location.href;
var initX = 0, initY = 0;
var resolution = 2000;
// set the step of the x axis from -2pi to 2pi
var z = numeric.linspace(-2*Math.PI,2*Math.PI,resolution);
//----------------------------------------------------------------------------------------------------------------------
//VERY IMPORTANT!!!
// 0 is triangular, 1 is square, 2 is sawtooth, 3 is delta's, 4 is parabola, 5 is x, 6 is |x|,
var shape = 0;
//----------------------------------------------------------------------------------------------------------------------
// coefficient determine the plot in power spectrum
// if label === "a&b", a_n and b_n plot; if label === "alpha&theta", alpha_n and theta_n plot
var label = "a&b";
title1 = '$a_{n}$';
title2 = "$b_{n}$";

/* set the default layout of the graph to adjust for different amplitudes and different number of terms involved
it changes the range of the y-axis according to the amplitude and number of terms
so the setLayout allows the layout to fit the graph, instead of fixing the layout to some values
*/
// set a smaller layout with smaller height
function setLayoutSmall(someTitles){
    const new_layout = {
    autosize: true,
    margin: {l:45,r:0, t:20, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [], zeroline: true, title: "$n$"},
    yaxis: {range: [], zeroline: true, title: someTitles},
    aspectratio: {x:1, y:1},
    }
    return new_layout;
}

// initialize the Cartesian coordinates for the plots and the functions
function initFourier() {
    Plotly.purge("graph3");
    Plotly.purge("graph4");
    Plotly.react("graph3", plot_decision1(label),setLayoutSmall(title1));
    Plotly.react("graph4",plot_decision2(label),setLayoutSmall(title2));

    return;

}


// sum up all the number in the array
function adding(array){
    var result = 0
    for(var i =0; i<array.length; ++i){
        result+=array[i];
    }
    return result;
}

//----------------------------------------------------------------------------------------------------------------------
// Start. To plot out the amplitude of each term in the Fourier Series.
// It will plot out the amplitude of a_n and b_n of each term in the Fourier Series.
// It also includes the plot of alpha_n and theta_n of each term if the Fourier Series is converted into the Power Spectrum

// return the amplitude of a_n of the Fourier Series
function a_n (shape, n){
    var L = parseFloat(document.getElementById('LController').value);
    var A = parseFloat(document.getElementById('AController').value);

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
        amplitude = 0;
    } else if (shape === 6){
        if (n===0){
            amplitude = A*L;
        } else {
            amplitude = (2*A*L/(n*Math.PI)**2)*((-1)**n - 1);
        }
    }
    return amplitude;
}

// return the amplitude of b_n of the Fourier Series
function b_n(shape,n){
    var L = parseFloat(document.getElementById('LController').value);
    var A = parseFloat(document.getElementById('AController').value);

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
            amplitude = A*(2*L/(n*Math.PI)**1 *(-1)**(n+1));
        } else if (shape === 6){
            amplitude = 0;
        }
    }

    return amplitude;
}

// return the amplitude/magnitude of a_n, b_n, alpha_n, theta_n
//Is these four as a function of n
function coefficient (N){
    var n = [];
    var an = [];
    var bn = [];
    var alpha_n = [];
    var theta_n = [];

    for (var i = 0; i < N; ++i){
        n.push(i);
        an.push(a_n(shape,i));
        bn.push(b_n(shape,i));
        alpha_n.push(Math.sqrt(a_n(shape,i)**2+b_n(shape,i)**2));
        //Theta is defined strangely because javascript can't handle arctan( plus/minus infinity)
        if (a_n(shape,i)===0){
            if (b_n(shape,i)>0) {
                theta_n.push(Math.PI/2);
            } else if (b_n(shape,i)<0) {
                theta_n.push(-Math.PI/2);
            } else if (b_n(shape,i)===0){
                theta_n.push(0);
            }
        } else {
            theta_n.push(Math.atan2(b_n(shape,i),a_n(shape,i)));
        }
    }
    return [n, an, bn, alpha_n, theta_n];
}

// plot the bar charts to visualize the amplitude of a_n
function plot_an(){
    var N = parseFloat(document.getElementById('NController').value)+1;
    [n, an, bn, alpha_n, theta_n] = coefficient(N);
    var data =
    [{
            type:"bar",
            x: n,
            y: an,
            name: 'Secondary Product',
            marker: {
                color: '#FF8900',
                opacity: 0.7
            }
    },
    ];
    return data;
}

// plot the bar charts to visualize the amplitude of b_n
function plot_bn(){
    var N = parseFloat(document.getElementById('NController').value)+1;
    [n, an, bn, alpha_n, theta_n] = coefficient(N);
    var data =
    [{
            type:"bar",
            x: n,
            y: bn,
            marker: {
                color:'#0091D4',
                opacity: 0.7
            },

    },
    ];
    return data;
}

// plot the bar charts to visualize the amplitude of alpha_n
function plot_alpha(){
    var N = parseFloat(document.getElementById('NController').value)+1;
    [n, an, bn, alpha_n, theta_n] = coefficient(N);

    var data =
    [{
            type:"bar",
            x: n,
            y: alpha_n,
            marker: {
                color:'#FF8900',
                opacity: 0.7
            },

    },
    ];
    return data;
}


// plot the bar charts to visualize the amplitude of theta_n
function plot_theta(){
    var N = parseFloat(document.getElementById('NController').value)+1;

    [n, an, bn, alpha_n, theta_n] = coefficient(N);

    var data =
    [{
            type:"bar",
            x: n,
            y: theta_n,
            marker: {
                color:'#0091D4',
                opacity: 0.7
            },

    },
    ];
    return data;
}

function plot_decision1(label){
    if (label==="a&b"){
        data = plot_an();
    } else {
        data = plot_alpha();
    }
    return data;
}

function plot_decision2(coefficient){
    if (label==="a&b"){
        data = plot_bn();
    } else {
        data = plot_theta();
    }
    return data;
}
// End. To plot out the amplitude of each term in the Fourier Series.
//----------------------------------------------------------------------------------------------------------------------


/** updates the plot according to the slider controls. */
// Plotly.animate does not support bar charts, so need to reinitialize the Cartesian every time.
function updatePlot() {
    var data;
    // NB: updates according to the active tab
    var selectedValue = document.getElementById("Select").value; // finds out which function is active
    initFourier();
    // NB: updates according to the active tab
   
        $(document).ready(() => { if (shape===3) {
            $('#A').hide(); console.log('hidden')
        } else {
           $('#A').show(); console.log('shown')
        }})
    var L = parseFloat(document.getElementById('LController').value);
    
    if ((L<=0 && shape==3)||(L<=0 && shape==6)){ 
        $(document).ready(() => {
            $('#Popup').show();
        })
    } else {
        $(document).ready(() => {
            $('#Popup').hide();
        })
    }
    //data = computeComponents(z);

    /*
    //This is animation bit.
    Plotly.animate(
        'graph',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "afterall"
        }
    );*/
}

function main() {
    
    $(document).ready(() => {
        $('#Popup').hide();
    })      ;
    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit"));
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlot(); //Updating the plot is linked with display (Just My preference)
        });

    });

  

    
    // as you select the functions you want from the scroll down
    // change the shape and the plots
    // change the titles and the math derivations
    $('#Select').change(function(){
        var selectedValue = document.getElementById("Select").value;
        if (selectedValue==="main"){
            shape = 0;
        } else if (selectedValue==="triangular"){
            shape = 0;
        } else if (selectedValue==="square"){
            shape = 1;
        } else if (selectedValue==="sawtooth"){
            shape = 2;
        } else if (selectedValue==="dirac"){
            shape = 3;
        } else if (selectedValue==="parabola"){
            shape = 4;
        } else if (selectedValue==="linear"){
            shape = 5;
        } else if (selectedValue==="mode"){
            shape = 6;

        }
        $(".title").hide();
        $("#"+selectedValue+"Title").show();
        initFourier();
        updatePlot();
    })

    // to select either a_n and b_n or alpha_n and theta_n in the power spectrum tab
    $('#Coefficient').change(function(){
        var selectedValue = document.getElementById("Coefficient").value;
        if (selectedValue==="an&bn"){
            label = "a&b";
            title1='$a_{n}$';
            title2='$b_{n}$';
        } else if (selectedValue==="powerSpectrum"){
            label = "alpha&theta";
            title1="$α_{n}$";
            title2="$θ_{n}$"
        }
        initFourier();
        updatePlot();
        console.log(shape)
    })

    //The First Initialisation - I use 's' rather than 'z' :p
    initFourier();
}
$(document).ready(main); //Load main when document is ready.