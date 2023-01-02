const nav=document.getElementById('nav__links')
const h1=document.createElement('H1')
const section =document.getElementById('section')
let text='';

function change(){
    if(nav.title=="active") nav.title="passive"
    else nav.title="active"
}

function get(){
    fetch('http://localhost:3006/', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
        },
    })
    .then(response => response.json())
    .then(response =>{
        console.log(JSON.stringify(response))
        text=document.createTextNode(JSON.stringify(response))
        h1.appendChild(text)
        section.append(h1)
    } )
}


function showForm(){
    const section1=document.getElementById('form')
    section1.classList.toggle('hidden')
}





