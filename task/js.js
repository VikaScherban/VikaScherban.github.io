
document.querySelector("#calcForm").addEventListener("submit", function(e){
    let pointFirstX = document.getElementById('pointFirstX');
    let pointFirstY = document.getElementById('pointFirstY');
    let pointSecondX = document.getElementById('pointSecondX');
    let pointSecondY = document.getElementById('pointSecondY');
    let distance = document.getElementById('distance');
    let validFirstX = validValue(pointFirstX);
    let validFirstY = validValue(pointFirstY);
    let validSecondX = validValue(pointSecondX);
    let validSecondY = validValue(pointSecondY);
    let validDistance = validValue(distance);
    if( !validFirstX || !validFirstY || !validSecondX || !validSecondY || !validDistance){
        e.preventDefault();
        writeError("The data is not correct.");
    }else {
        const A = new Point(+pointFirstX.value, +pointFirstY.value);
        const B = new Point(+pointSecondX.value, +pointSecondY.value);

        const d = +distance.value;

        if (!A.compare(B)) {
            const lineFirst = new Line(A, B);
            console.log(lineFirst);
            const lineSecond = lineFirst.verticalLine.bind(lineFirst)(B);
            console.log(lineSecond);

            let result = getPointsByLineD(lineSecond, d, B);
            outResult(result, e);
        } else {
            e.preventDefault();
            pointSecondX.closest('.form-group').classList.add("has-error");
            pointSecondY.closest('.form-group').classList.add("has-error");
            writeError("It is not possible to create a line by two identical points. \n Please change the data.");
        }
    }
});

defaultState = (cl) =>{
    cl.closest('.form-group').classList.remove("has-error");
    document.getElementById('errorMessage').style.display = "none";
    document.getElementById('resultBlock').style.display = "none";
}

validValue = (a) =>{
    let val = +a.value;
    if (isNaN(val)){
        a.closest('.form-group').classList.add("has-error");
    }else a.closest('.form-group').classList.remove("has-error");

    return !isNaN(val);
}

writeError = (mes) =>{
    document.getElementById('errorText').innerHTML = mes;
    document.getElementById('errorMessage').style.display = "block";
}

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    compare(A){
        return this.x === A.x && this.y === A.y;
    }
}

class Line{
    constructor(A, B, y) {
        if ( typeof(A) === "object"){
            if (B.x - A.x !== 0 && B.y - A.y !== 0) {
                this.k = (B.y - A.y) / (B.x - A.x);
                this.b = A.y - this.k * A.x;
                this.y = true;
            }else if (B.x - A.x === 0){
                this.k = 0.00;
                this.b = B.x;
                this.y = false;
            }else {
                this.k = 0.00;
                this.b = A.y;
                this.y = true;
            }
        }else {
            this.k = A;
            this.b = B;
            this.y = y;
        }
    }

    verticalLine(A){
        let k;
        let b;
        (this.k !== 0) ? k = -1 / this.k: k = 0.00;
        if (this.y && k === 0){
            b = A.x;
            return new Line(k, b , false);
        }else if(this.y){
            b = A.y - k * A.x;
            return new Line(k, b , true);
        }else {
            b = A.y;
            return new Line(k, b , true);
        }
    }
}

getPointsByLineD = (line, d, point) =>{
    if (!line.y){//Equation type x = b
       return [new Point(point.x, point.y + d), new Point(point.x, point.y - d)];
    }else if (line.y && line.k === 0){//Equation type y = b
        return [new Point(point.x + d, point.y), new Point(point.x - d, point.y)];
    }else{
        //Calculate quadratic equation
        let a = 1 + line.k * line.k;
        let b = 2*line.k*(line.b - point.y) - 2*point.x;
        let c = point.x*point.x + (line.b - point.y)*(line.b - point.y) - d*d;
        let D = b*b - 4*a*c;
        let result;
        if (D <= 0 || b == 0 || d <= 0) { //one or zero solution
            writeError('Error! Can not be calculated for the entered data.');
        }else {// two solutions
            let x1;
            let x2;
            if (c == 0){
                x1 = 0.00;
                x2 = (-b/a).toFixed(2);
            }else {
                x1 = ((-b - Math.sqrt(D)) / (2 * a)).toFixed(2);
                x2 = ((-b + Math.sqrt(D)) / (2 * a)).toFixed(2);
            }

            let y1 = (line.k * x1 + line.b).toFixed(2);
            let y2 = (line.k * x2 + line.b).toFixed(2);
            let resFirstPoint = new Point(x1, y1);
            let resSecondPoint = new Point(x2, y2);

            return [resFirstPoint, resSecondPoint];
        }
    }
    return;
}

outResult = (result,e) => {
    e.preventDefault();
    if (result !== null){
        document.getElementById('pointFirst').innerHTML = result[0].x + '; ' + result[0].y;
        document.getElementById('pointSecond').innerHTML = result[1].x + '; ' + result[1].y;
        document.getElementById('resultBlock').style.display = "block";
    }else writeError('Error! Not result(');
}