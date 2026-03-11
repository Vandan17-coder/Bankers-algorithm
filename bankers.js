let available=[3,3,2];

let allocation=[
[0,1,0],
[2,0,0],
[3,0,2],
[2,1,1],
[0,0,2]
];

let max=[
[7,5,3],
[3,2,2],
[9,0,2],
[2,2,2],
[4,3,3]
];

render();


function render(){

renderAvailable();
renderTable();

}


function renderAvailable(){

let container=document.getElementById("available");
container.innerHTML="";

available.forEach((val,i)=>{

let div=document.createElement("div");

div.innerHTML=`
<input value="${val}" onchange="available[${i}]=parseInt(this.value)">
<button onclick="deleteResource(${i})">🗑</button>
`;

container.appendChild(div);

});

}


function renderTable(){

let head=document.getElementById("tableHead");
let body=document.getElementById("tableBody");

head.innerHTML="";
body.innerHTML="";

let resources=available.length;

let row="<tr><th>Process</th>";

for(let i=0;i<resources;i++) row+=`<th>Alloc R${i}</th>`;
for(let i=0;i<resources;i++) row+=`<th>Max R${i}</th>`;
for(let i=0;i<resources;i++) row+=`<th>Need R${i}</th>`;

row+="<th>Delete</th></tr>";

head.innerHTML=row;


allocation.forEach((p,index)=>{

let r=`<tr><td>P${index}</td>`;

for(let i=0;i<resources;i++){
r+=`<td><input value="${allocation[index][i]}" onchange="allocation[${index}][${i}]=parseInt(this.value)"></td>`;
}

for(let i=0;i<resources;i++){
r+=`<td><input value="${max[index][i]}" onchange="max[${index}][${i}]=parseInt(this.value)"></td>`;
}

for(let i=0;i<resources;i++){

let need=max[index][i]-allocation[index][i];

r+=`<td>${need}</td>`;

}

r+=`<td><button onclick="deleteProcess(${index})">🗑</button></td>`;

r+="</tr>";

body.innerHTML+=r;

});

}


function addResource(){

available.push(0);

allocation.forEach(p=>p.push(0));
max.forEach(p=>p.push(0));

render();

}


function deleteResource(i){

available.splice(i,1);

allocation.forEach(p=>p.splice(i,1));
max.forEach(p=>p.splice(i,1));

render();

}


function addProcess(){

let r=available.length;

allocation.push(new Array(r).fill(0));
max.push(new Array(r).fill(0));

render();

}


function deleteProcess(i){

allocation.splice(i,1);
max.splice(i,1);

render();

}


function runBanker(){

let resources=available.length;
let processes=allocation.length;

let work=[...available];
let finish=new Array(processes).fill(false);

let seq=[];
let steps="Initial Available: "+work+"<br><br>";

let count=0;

while(count<processes){

let found=false;

for(let i=0;i<processes;i++){

if(!finish[i]){

let possible=true;

for(let j=0;j<resources;j++){

let need=max[i][j]-allocation[i][j];

if(need>work[j]){
possible=false;
break;
}

}

if(possible){

steps+=`Process P${i} executed<br>`;

for(let j=0;j<resources;j++){
work[j]+=allocation[i][j];
}

steps+=`New Work: ${work}<br><br>`;

finish[i]=true;
seq.push("P"+i);
count++;
found=true;

}

}

}

if(!found){

document.getElementById("status").innerHTML="SYSTEM IS UNSAFE";
document.getElementById("sequence").innerHTML="";
document.getElementById("steps").innerHTML=steps;
return;

}

}

document.getElementById("status").innerHTML="SYSTEM IS SAFE";

let html="";

seq.forEach((p,i)=>{

if(i<seq.length-1) html+=`<span>${p}</span> → `;
else html+=`<span>${p}</span>`;

});

document.getElementById("sequence").innerHTML=html;
document.getElementById("steps").innerHTML=steps;

}