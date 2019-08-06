//A: Global Initial Parameters:

/* Start by putting in all initial parameters you want and any constants you want to use (e.g. G = 6.67*10**(-11),
any layout properties (which you probably want to keep constant for an individual part of a visualisation
should go here */

var initialPoint = [0, 1];
var initialPoint1 = [1.1, 0.1];
var initialPoint2 = [0.1,1.1];
var initialPoint3 = [1,1];
var layout = {
    //autosize: true,
    //width: "40vw",
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-3, 3], zeroline: true},
    yaxis: {range: [-3, 3], zeroline: true},
    aspectratio: {x:1, y:1},
};
var currentPoint = initialPoint;
var initX1 = 0, initY1 = 0;
var initX2 = 0, initY2 = 0;
var isBlackText = false;


//B: Maths

/*Next comes all the mathematical functions that are used, if you think a library will do a particular job
that's fine, no need to recreate stuff, but any functions you need to construct yourself should go in this
next block*/


function inner_productSec1(first_vector , second_vector){
    // Returns the inner product of two vectors
    var sum = 0;
    for (var i=0; i<2; i++) {
        sum += first_vector[i] * second_vector[i];
    }
    return sum;
}

function orthogonalSec1(vector_a , vector_b, tolerance = 0){
    //Returns whether vectors a and b are orthogonal
    dot = inner_productSec1(vector_a , vector_b);
    if (dot === 0){
        return true;
        }
    else {
        return false;
        }
    }


function normalisedSec1(vector){
    // Returns whether a vector has a normalised basis
    dot = inner_productSec1(vector, vector);
    if (dot === 1){
        return true;
        }
    else {
        return false;
        }
    }

function find_xySec1(resulting_vector, base_1 , base_2){
    // Finds the projection of "resulting vector" into base_1 and base_2 and returns the
    //coefficients that are needed such the reconstruct the result from the two bases
    b1 = resulting_vector[0];
    b2 = resulting_vector[1];
    p1 = base_1[0];
    p2 = base_1[1];
    q1 = base_2[0];
    q2 = base_2[1];

    if (p1 === 0){
        y = b1 / q1;
        x = (q1*b2 - b1*q2)/p2;
    }
    else if (p1*q2 === p2**2){
        y = (p1*b2 - b1)/(p2**2 - q1*p2);
        x = (b1 - y*q1)/(p1);
    }
    else{
        y = (p1*b2 - p2*b1)/(p1*q2 - p2**2);
        x = (b1/p1) - y*p2;
    }
    return x,y;
}

function projectionSec1(target_vector, base_vector){
    //Finds the distance along 'base_vector' the vector 'target_vector' is projected
    dot_product = inner_productSec1(target_vector ,base_vector);
    base_size = Math.sqrt(inner_productSec1(base_vector, base_vector));
    span = dot_product / base_size;
    return span;
}

function scale_vectorSec1(original_vector, scale){
    // Multiplies the each component of the original vector by 'scale'
    new_1 = scale * original_vector[0];
    new_2 = scale * original_vector[1];
    new_vector = [new_1, new_2];
    return new_vector;
}

function computeBasisSec1(x1, y1,x2,y2 , x3,y3) {
    currentPoint1 = [x1, y1];
    currentPoint2 = [x2, y2];
    currentPoint3 = [x3, y3];

    rho1 = Math.sqrt(x1**2+y1**2);
    phi1 = Math.atan(x1/y1);

    rho2 = Math.sqrt(x2**2+y2**2);
    phi2 = Math.atan(x2/y2);

    rho3 = Math.sqrt(x3**2+y3**2);
    phi3 = Math.atan(x3/y3);

    dx1 = 1;
    dy1 = 1;
    dx2 = 1;
    dy2 = 1;
    dx3 = 1;
    dy3 = 1;

    if (x1<0 && y1>0){
    dx1=-dx1;
    }else if (x1>0 && y1<0){
    dy1=-dy1;
    }else if (x1<0 && y1<0){
    dx1=-dx1;
    dy1=-dy1;
    }else{}

    if (x2<0 && y2>0){
    dx2=-dx2;
    }else if (x2>0 && y2<0){
    dy2=-dy2;
    }else if (x2<0 && y2<0){
    dx2=-dx2;
    dy2=-dy2;
    }else{}

    if (x3<0 && y3>0){
    dx3=-dx3;
    }else if (x3>0 && y3<0){
    dy3=-dy3;
    }else if (x3<0 && y3<0){
    dx3=-dx3;
    dy3=-dy3;
    }else{}

    //This is how we first declare objects
    x1Vector = new Line2d([[x1, y1], [x1+dx1, y1]]);
    y1Vector = new Line2d([[x1, y1], [x1, y1+dy1]]);
    vertex1  = new Line2d([[0, 0], [x1, y1]]);

    x2Vector = new Line2d([[x2, y2], [x2+dx2, y2]]);
    y2Vector = new Line2d([[x2, y2], [x2, y2+dy2]]);
    vertex2  = new Line2d([[0, 0], [x2, y2]]);

    x3Vector = new Line2d([[x3, y3], [x3+dx3, y3]]);
    y3Vector = new Line2d([[x3, y3], [x3, y3+dy3]]);
    vertex3  = new Line2d([[0, 0], [x3, y3]]);

    var project_1 = scale_vectorSec1([x1,y1] ,projectionSec1([x3,y3] , [x1,y1]));
    var project_2 = scale_vectorSec1([x2,y2] , projectionSec1([x3,y3] , [x2,y2]));

    var m1 = (y1/x1);
    var m2 = (y2/x2);
    //fixes case when gradients are infinite
    if(m1 > 100000){m1 = 1000000;}
    if(m2 > 100000){m2 = 1000000;}

    var x_prime = (y3 - m1*x3)/(m2 - m1);
    var y_prime = m2*x_prime;

    var x_dprime = (y3 - m2*x3)/(m1-m2);
    var y_dprime = m1*x_dprime;

    function isPositive(x){
        if (Math.abs(x) === x) {
        return true;
        } else {
        return false;
        }
    }

    function quadrant(x,y){
        if (isPositive(x) && isPositive(y)) {return 1;}
        else if(!isPositive(x) && isPositive(y)) {return 2;}
        else if (!isPositive(x) && !isPositive(y)) {return 3;}
        else {return 4;}
    }

    //define scale factors
    if (quadrant(x_prime, y_prime) === quadrant(x2,y2)) { //correct for negative sign
    var scale2 = Math.round((Math.pow((Math.pow(x_prime,2)+Math.pow(y_prime,2)),(1/2))/Math.pow((Math.pow(x2,2)+Math.pow(y2,2)),(1/2)))*100)/100;
    } else {
    var scale2 = -Math.round((Math.pow((Math.pow(x_prime,2)+Math.pow(y_prime,2)),(1/2))/Math.pow((Math.pow(x2,2)+Math.pow(y2,2)),(1/2)))*100)/100;
    }

    if (quadrant(x_dprime,y_dprime)=== quadrant(x1,y1)) {
    var scale1 = Math.round((Math.pow((Math.pow(x_dprime,2)+Math.pow(y_dprime,2)),(1/2))/Math.pow((Math.pow(x1,2)+Math.pow(y1,2)),(1/2)))*100)/100;
    } else {
    var scale1 = -Math.round((Math.pow((Math.pow(x_dprime,2)+Math.pow(y_dprime,2)),(1/2))/Math.pow((Math.pow(x1,2)+Math.pow(y1,2)),(1/2)))*100)/100;
    }

    //remove projections if parallel
    //if (Math.abs(m1-m2) > 0.1){
    if (Math.abs(phi1-phi2) > 0.05){
       vertex4  = new Line2d([[0, 0], [x_prime, y_prime]]);
       vertex5 = new Line2d([[x_prime, y_prime] , [x3, y3]] );//[project_2[0],project_2[1]]]);

       vertex6  = new Line2d([[0, 0], [x_dprime, y_dprime]]);
       vertex7 = new Line2d([[x_dprime, y_dprime] , [x3, y3]] );//[project_2[0],project_2[1]]]);

       $(document).ready(() => {
	        $('#popup1').hide();
       });


    } else {
        //replace projections with tiny lines if line1 and 2
        vertex4 = new Line2d([[0, 0], [0,0.005]]);
        vertex5 = new Line2d([[0, 0], [0.005,0]]);
        vertex6 = new Line2d([[0, 0], [0,0.005]]);
        vertex7 = new Line2d([[0, 0], [0.005,0]]);

        $(document).ready(() => {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"popup1"]);
            $('#popup1').show();
        });


    }


    var data = [


        {type:"scatter",
        mode: "lines",
        x: [0,x1],
        y: [0,y1],
        line: {color: black, width: 3, dash: "solid"},
        },

        {type:"scatter",
        mode: "lines",
        x: [0,x2],
        y: [0,y2],
        line: {color: blue, width: 3, dash: "solid"}
        },

        {type:"scatter",
        mode: "lines",
        name: "test2",
        x: [0,x3],
        y: [0,y3],
        line: {color: green, width: 3, dash: "solid"}
        },


        vertex1.gObject(cherry, 3),
        vertex1.arrowHead(cherry, 3),
        vertex2.gObject(blue, 3),
        vertex2.arrowHead(blue, 3),
        vertex3.gObject(green, 3),
        vertex3.arrowHead(green, 3),

        vertex4.gObject(cyan, 3),//, dash="solid", modetype="lines+text", `${scale2} x vector2 & ${scale1} x vector1`),
        vertex5.gObject(cyan, 3),

        vertex6.gObject(lilac, 3),//,  dash="solid", modetype="lines+text", `${scale1} x vector1 & ${scale2} x vector2`),
        vertex7.gObject(lilac, 3),
     ]
    ;

    $("#vector1val").text(`${scale1}`);
    $("#vector2val").text(`${scale2}`);
    return data;
}

//C: Interactivity

/* We've now got all the functions we need to use such that for a given user input, we have a data output that we'll use.
Now we just have to actually obtain the user input from the HTML file by using JQuery and then plot everything relevant that we want to see*/

function initCarteSec1(type) {
    Plotly.purge("graph1Sec1");
    initX1 = initialPoint1[0];
    initY1 = initialPoint1[1];
    initX2 = initialPoint2[0];
    initY2 = initialPoint2[1];
    initX3 = initialPoint3[0];
    initY3 = initialPoint3[1];

    /* ~Jquery
    1.  Assign initial/default x, y values to the sliders and slider displays.
    */
    $("#x1Controller").val(initX1);
    $("#x1ControllerDisplay").val(initX1);

    $("#y1Controller").val(initY1);
    $("#y1ControllerDisplay").val(initY1);

    $("#x2Controller").val(initX2);
    $("#x2ControllerDisplay").val(initX2);
    $("#y2Controller").val(initY2);
    $("#y2ControllerDisplay").val(initY2);

    $("#x3Controller").val(initX3);
    $("#x3ControllerDisplay").val(initX3);
    $("#y3Controller").val(initY3);
    $("#y3ControllerDisplay").val(initY3);

    /* ~Jquery
    2.  Declare and store the floating values from x/y- sliders.
        Hint:
            - use document.getElementById('idName').value
            - use parseFloat() to make sure you are getting floating points.
    */

    var x1 = parseFloat($('x1Controller').val());
    var y1 = parseFloat(document.getElementById('y1Controller').value);

    var x2 = parseFloat(document.getElementById('x2Controller').value);
    var y2 = parseFloat(document.getElementById('y2Controller').value);

    var x3 = parseFloat(document.getElementById('x3Controller').value);
    var y3 = parseFloat(document.getElementById('y3Controller').value);

    var project_1 = scale_vectorSec1([x1,y1] , projectionSec1([x3,y3] , [x1,y1]));
    var project_2 = scale_vectorSec1([x2,y2] , projectionSec1([x3,y3] , [x2,y2]));

    Plotly.newPlot("graph1Sec1", computeBasisSec1(x1, y1), layout);
    Plotly.newPlot("graph1Sec1", computeBasisSec1(x2, y2), layout);
    Plotly.newPlot("graph1Sec1", computeBasisSec1(x3, y3), layout);

    return;
}


//D: Calling

/* Now we have to ask the plots to update every time the user interacts with the visualisation. Here we must both
define what we want it to do when it updates, and then actually ask it to do that. These are the two functions below.
*/

function updatePlotSec1() {
    var data = [];

    var x1 = parseFloat(document.getElementById('x1Controller').value);
    var y1 = parseFloat(document.getElementById('y1Controller').value);

    var x2 = parseFloat(document.getElementById('x2Controller').value);
    var y2 = parseFloat(document.getElementById('y2Controller').value);

    var x3 = parseFloat(document.getElementById('x3Controller').value);
    var y3 = parseFloat(document.getElementById('y3Controller').value);


    data = computeBasisSec1(x1, y1 , x2, y2 ,x3,y3);

    Plotly.animate(
        'graph1Sec1',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "immediate"
        }
    );
}





function mainSec1() {
    computeBasisSec1(initX1, initY1,initX2,initY2 , initialPoint3[0],initialPoint3[1]);

    /*Jquery*/ //NB: Put Jquery stuff in the main not in HTML
    $("input[type=range]").each(function () {
        /*Allows for live update for display values*/
        $(this).on('input', function(){
            //Displays: (FLT Value) + (Corresponding Unit(if defined))
            $("#"+$(this).attr("id") + "Display").val( $(this).val());
            //NB: Display values are restricted by their definition in the HTML to always display nice number.
            updatePlotSec1(); //Updating the plot is linked with display (Just My preference)
        });

    //Update sliders if value in box is changed

    $("#x1ControllerDisplay").change(function () {
     var value = this.value;
     $("#x1Controller").val(value);
     updatePlotSec1();
    });

    $("#y1ControllerDisplay").change(function () {
     var value = this.value;
     $("#y1Controller").val(value);
     updatePlotSec1();
    });

    $("#x2ControllerDisplay").change(function () {
     var value = this.value;
     $("#x2Controller").val(value);
     updatePlotSec1();
    });

    $("#y2ControllerDisplay").change(function () {
     var value = this.value;
     $("#y2Controller").val(value);
     updatePlotSec1();
    });

    $("#x3ControllerDisplay").change(function () {
     var value = this.value;
     $("#x3Controller").val(value);
     updatePlotSec1();
    });

    $("#y3ControllerDisplay").change(function () {
     var value = this.value;
     $("#y3Controller").val(value);
     updatePlotSec1();
    });

    });

    /*Tabs*/
    $(function() {
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            initCarteSec1(href); //re-initialise when tab is changed
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initCarteSec1("#basis");
    updatePlotSec1(); //Shows initial positions of vectors
    }



mainSec1(); //Load main when document is ready.