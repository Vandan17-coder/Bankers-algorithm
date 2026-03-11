function runBanker(){

let availableInputs = document.querySelectorAll("#available input");
let available = [];

availableInputs.forEach(i=>{
available.push(parseInt(i.value));
});

let table = document.getElementById("table");

let processes = table.rows.length - 1;
let resources = 3;

let allocation = [];
let max = [];
let need = [];

for(let i=1;i<=processes;i++){

let rowAlloc = [];
let rowMax = [];

for(let j=1;j<=resources;j++){
rowAlloc.push(parseInt(table.rows[i].cells[j].children[0].value));
}

for(let j=4;j<=6;j++){
rowMax.push(parseInt(table.rows[i].cells[j].children[0].value));
}

allocation.push(rowAlloc);
max.push(rowMax);

}

for(let i=0;i<processes;i++){

need[i] = [];

for(let j=0;j<resources;j++){
need[i][j] = max[i][j] - allocation[i][j];
}

}

let work = [...available];
let finish = new Array(processes).fill(false);
let sequence = [];
let steps = `Initial Available: [${work}]<br><br>`;

let count = 0;

while(count < processes){

let found = false;

for(let i=0;i<processes;i++){

if(!finish[i]){

let possible = true;

for(let j=0;j<resources;j++){

if(need[i][j] > work[j]){
possible = false;
break;
}

}

if(possible){

steps += `Process P${i} executed. Need [${need[i]}] ≤ Work [${work}]<br>`;

for(let j=0;j<resources;j++){
work[j] += allocation[i][j];
}

steps += `New Work: [${work}]<br><br>`;

finish[i] = true;
sequence.push("P"+i);
count++;
found = true;

}

}

}

if(!found){

document.getElementById("status").innerHTML = "SYSTEM IS UNSAFE";
document.getElementById("sequence").innerHTML = "";
document.getElementById("steps").innerHTML = "No safe sequence found.";
return;

}

}

document.getElementById("status").innerHTML = "SYSTEM IS SAFE";

let seqHTML = "";

sequence.forEach((p,i)=>{

if(i !== sequence.length-1){
seqHTML += `<span>${p}</span> → `;
}else{
seqHTML += `<span>${p}</span>`;
}

});

document.getElementById("sequence").innerHTML = seqHTML;

document.getElementById("steps").innerHTML = steps;

}