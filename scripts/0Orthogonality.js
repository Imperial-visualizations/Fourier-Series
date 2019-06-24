function inner_product(first_vector , second_vector){
    // Returns the inner product of two vectors
    var sum = 0;
    for (var i=0; i<2; i++) {
        sum += first_vector[i] * second_vector[i];
    }
    return sum;
}

function orthogonal(vector_a , vector_b){
    //Returns whether vectors a and b are orthogonal
    dot = inner_product(vector_a , vector_b);
    if (dot === 0){
        return true;
        }
    else {
        return false;
        }
    }

function normalised(vector){
    // Returns whether a vector has a normalised basis
    dot = inner_product(vector, vector);
    if (dot === 1){
        return true;
        }
    else {
        return false;
        }
    }

function find_xy(resulting_vector, base_1 , base_2){
    // Finds the projection of "resulting vector" into base_1 and base_2 and returns the
    //coefficients that are needed such the reconstruct the result from the two bases
    b1 = resulting_vector[0]
    b2 = resulting_vector[1]
    p1 = base_1[0]
    p2 = base_1[1]
    q1 = base_2[0]
    q2 = base_2[1]

    if (p1 === 0){
        y = b1 / q1
        x = (q1*b2 - b1*q2)/p2
    }
    else if (p1*q2 === p2**2){
        y = (p1*b2 - b1)/(p2**2 - q1*p2)
        x = (b1 - y*q1)/(p1)
    }
    else{
        y = (p1*b2 - p2*b1)/(p1*q2 - p2**2)
        x = (b1/p1) - y*p2
    }
    return x,y
}

function projection(target_vector, base_vector){
    //Finds the distance along 'base_vector' the vector 'target_vector' is projected
    dot_product = inner_product(target_vector ,base_vector)
    base_size = Math.sqrt(inner_product(base_vector, base_vector))
    span = dot_product / base_size
    return span
}

function scale_vector(original_vector, scale){
    // Multiplies the each component of the original vector by 'scale'
    new_1 = scale * original_vector[0]
    new_2 = scale * original_vector[1]
    new_vector = [new_1, new_2]
    return new_vector
}



//Global Initial Parameters:
const initialPoint = [1, 1];
const layout = {
    width: 450, "height": 500,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-5, 5], zeroline: true, title: "x"},
    yaxis: {range: [-5, 5], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var currentPoint = initialPoint;
var initX1 = 0, initY1 = 0;
var initX2 = 0, initY2 = 0;
var isBlackText = false;
// x̂x ŷ ẑ  x
//Plot
/**
 * Resets and plots initial area element or basis vectors of 2D Cartesian.
 * @param {string} type - basis vectors or area element
 */




function initCarte(type) {
    Plotly.purge("graph");
    initX1 = currentPoint[0];
    initY1 = currentPoint[1];
    initX2 = currentPoint[0];
    initY2 = currentPoint[1];
    initX3 = currentPoint[0];
    initY3 = currentPoint[1];
    /* ~Jquery
    1.  Assign initial/default x, y values to the sliders and slider displays.
    */

    $("#x1Controller").val(initX1);
    $("#x1ControllerDisplay").text(initX1);
    $("#y1Controller").val(initY1);
    $("#y1ControllerDisplay").text(initY1);


    $("#x2Controller").val(initX2);
    $("#x2ControllerDisplay").text(initX2);
    $("#y2Controller").val(initY2);
    $("#y2ControllerDisplay").text(initY2);

    $("#x3Controller").val(initX3);
    $("#x3ControllerDisplay").text(initX3);
    $("#y3Controller").val(initY3);
    $("#y3ControllerDisplay").text(initY3);

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

    var project_1 = scale_vector([x1,y1] ,Math.abs( projection([x3,y3] , [x1,y1])))
    var project_2 = scale_vector([x2,y2] ,Math.abs( projection([x3,y3] , [x2,y2])))




    Plotly.newPlot("graph", computeBasis(x1, y1), layout);
    Plotly.newPlot("graph", computeBasis(x2, y2), layout);
    Plotly.newPlot("graph", computeBasis(x3, y3), layout);

    return;
}

function computeBasis(x1, y1,x2,y2 , x3,y3) {
    currentPoint1 = [x1, y1];
    currentPoint2 = [x2, y2];
    currentPoint3 = [x3, y3];

    rho1 = Math.sqrt(x1**2+y1**2);
    phi1 = Math.atan(x1/y1);

    rho2 = Math.sqrt(x2**2+y2**2);
    phi2 = Math.atan(x2/y2);

    rho3 = Math.sqrt(x3**2+y3**2);
    phi3 = Math.atan(x3/y3);

    dx1 = 1
    dy1 = 1
    dx2= 1
    dy2 = 1
    dx3= 1
    dy3 = 1

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

    var project_1 = scale_vector([x1,y1] ,Math.abs(projection([x3,y3] , [x1,y1])))
    var project_2 = scale_vector([x2,y2] , Math.abs(projection([x3,y3] , [x2,y2])))

    vertex4  = new Line2d([[0, 0], [project_1[0], project_1[1]]]);
    vertex5 = new Line2d([[0,0] , [project_2[0],project_2[1]]]);

    /*
    3.  I have created new Rectangle Object for you in the objects.js, so do check it out.
        NB: Conventions: the name of the functions start with lower case/ Objects start with UPPER case.
        Create a 'new' rectangle using 'Rectangle' in the objects.js and name it 'dominic'.

        Only then uncomment the line in the graphic object named 'data' below.
    */



    var data = [


        {type:"scatter",
        mode: "lines",
        x: [0,x1],
        y: [0,y1],
        line: {color: black, width: 3, dash: "solid"}
        },

        {type:"scatter",
        mode: "lines",
        x: [0,x2],
        y: [0,y2],
        line: {color: blue, width: 3, dash: "solid"}
        },

        {type:"scatter",
        mode: "lines",
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

        vertex4.gObject(cyan, 3),
        vertex5.gObject(lilac, 3),
    ]
    ;
    return data;
}




/** updates the plot according to the slider controls. */
function updatePlot() {
    var data = [];


    /* ~Jquery
    5.  Declare and store the floating values from x/y- sliders.
        Hint: Same is task 2.
    */
    var x1 = parseFloat(document.getElementById('x1Controller').value);
    var y1 = parseFloat(document.getElementById('y1Controller').value);

    var x2 = parseFloat(document.getElementById('x2Controller').value);
    var y2 = parseFloat(document.getElementById('y2Controller').value);

    var x3 = parseFloat(document.getElementById('x3Controller').value);
    var y3 = parseFloat(document.getElementById('y3Controller').value);


    data = computeBasis(x1, y1 , x2, y2 ,x3,y3);

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
    );
}





function main() {
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

    /*Tabs*/
    $(function() {
        $('ul.tab-nav li a.button').click(function() {
            var href = $(this).attr('href');
            $('li a.active.button', $(this).parent().parent()).removeClass('active');
            $(this).addClass('active');
            $('.tab-pane.active', $(href).parent()).removeClass('active');
            $(href).addClass('active');

            initCarte(href); //re-initialise when tab is changed
            return false;
        });
    });

    //The First Initialisation - I use 's' rather than 'z' :p
    initCarte("#basis");
    }

$(document).ready(main); //Load main when document is ready.