let renglon=[];
let celda=[];


for (let i = 0; i < 4 ; i++) {
    renglon[i]=i;
    for (let j=0; j<1 ; j++){
        celda[j]=i*i;
    }
    let lastone=renglon[renglon.length-1];
    let arrcelda=[lastone,celda];
    console.log(arrcelda);
}