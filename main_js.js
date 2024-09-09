
function imc_maker(){

    let td_element = document.querySelectorAll("tbody tr");

    for(let i = 0; i < td_element.length; i++){
        let td_elements = td_element[i].querySelectorAll("td");
        let td_element_h = parseFloat(td_elements[2].innerText)/100;
        let td_element_w = parseFloat(td_elements[1].innerText);
        let imc = parseFloat(td_element_w/(td_element_h*td_element_h));
        td_elements[3].innerText = imc.toFixed(2);


        let imc_status = "";

        if (imc < 18.5) {
            imc_status = "Magreza";
        } else if (imc >= 18.5 && imc <= 24.9) {
            imc_status = "Saudável";
        } else if (imc >= 25.0 && imc <= 29.9) {
            imc_status = "Sobrepeso";
        } else if (imc >= 30.0 && imc <= 34.9) {
            imc_status = "Obesidade 1";
        } else if (imc >= 35.0 && imc <= 39.9) {
            imc_status = "Obesidade 2";
        } else {
            imc_status = "Obesidade 3";
        }   

        td_elements[4].innerText = imc_status;
        
        if(!td_elements[5]){
            let td_buttons = document.createElement("td");

            let button0 = document.createElement("button");
            let button1 = document.createElement("button");
            let button2 = document.createElement("button");
        

            button0.addEventListener("click", function(e){
                let chamou = e.target
                let chamou_tr = chamou.parentElement.parentElement.querySelectorAll("td");
                chamou_tr[1].innerText = parseFloat(parseFloat(chamou_tr[1].innerText)+ 0.5);

                imc_maker();
            });


            button1.addEventListener("click", function(e){
                let chamou = e.target
                let chamou_tr = chamou.parentElement.parentElement.querySelectorAll("td");
                if(chamou_tr[1].innerText > 0.5){
                    chamou_tr[1].innerText = parseFloat(parseFloat(chamou_tr[1].innerText)-0.5);
                    imc_maker();
                }
                else{
                    chamou.classList.add('shake');
                    setTimeout(function() {
                        chamou.classList.remove("shake");
                    }, 1000);
                }
            });
            

            button2.addEventListener("click", function(e){
                let chamou = e.target
                chamou = chamou.parentElement.parentElement;
                chamou.remove()
            });
    
            button0.classList.add("btn" ,"btn-success", "btn-sm","buttons_op");
            button1.classList.add("btn" ,"btn-warning" ,"btn-sm","buttons_op");
            button2.classList.add("btn", "btn-danger","btn-sm","buttons_op");
            
            button0.innerText = "+ 0,5 KG";
            button1.innerText = "- 0,5 KG";
            button2.innerText = "Del!";
    
            td_buttons.appendChild(button0);
            td_buttons.appendChild(button1);
            td_buttons.appendChild(button2);
    
            document.querySelectorAll("tbody tr")[i].appendChild(td_buttons);
        }
    }
}

function table_add(e){  
    let name_input = document.querySelector("#typetext00");
    let cm = document.querySelector("#typeNumber00");
    let kg = document.querySelector("#typeNumber01");

    let table = document.querySelector("tbody");

    let tr = document.createElement("tr");
    let td0 = document.createElement("td")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")

    let name = document.createElement("td");
    name.innerText = name_input.value;

    let weight = document.createElement("td");
    weight.innerText = parseFloat(kg.value)

    let height = document.createElement("td");
    height.innerText = parseFloat(cm.value)

    
    if(name_input.value != "" && cm.value > 0 && kg.value > 0){
        tr.appendChild(name);  
        tr.appendChild(weight);
        tr.appendChild(height);
        
        tr.appendChild(td0);
        tr.appendChild(td1);
        
        table.appendChild(tr);

        imc_maker()
    }
    else{
        let botao = e.target;
        botao.classList.add('shake');
        setTimeout(function() {
            botao.classList.remove("shake");
        }, 1000);
    }
        
    name_input.value = "";
    cm.value = "";
    kg.value = "";

}


function del_maior(e){
    let td_element = document.querySelectorAll("tbody tr");
    
    if(td_element.length == 0){
        let botao = e.target;
        botao.classList.add('shake');
        setTimeout(function() {
            botao.classList.remove("shake");
        }, 1000);
    }

    else{
        let maior = parseFloat(td_element[0].querySelectorAll("td")[3].innerText);
        let maior_index = td_element[0];

        for(let i = 0; i < td_element.length; i++){
            let td_elements = td_element[i].querySelectorAll("td");
            if(parseFloat(td_elements[3].innerText)>maior){
                maior = td_elements[3];
                maior_index = td_element[i];
            }
        }
        maior_index.remove();
    }
}

function del_menor(e){
    let td_element = document.querySelectorAll("tbody tr");
    
    if(td_element.length == 0){
        let botao = e.target;
        botao.classList.add('shake');
        setTimeout(function() {
            botao.classList.remove("shake");
        }, 1000);
    }

    else{
        let menor = parseFloat(td_element[0].querySelectorAll("td")[3].innerText);
        let menor_index = td_element[0];

        for(let i = 0; i < td_element.length; i++){
            let td_elements = td_element[i].querySelectorAll("td");
            if(parseFloat(td_elements[3].innerText)<menor){
                menor = td_elements[3];
                menor_index = td_element[i]
            }
        }
        menor_index.remove();
    }
}

let botao = document.querySelector("#imc_buttons > div").firstElementChild;
botao.addEventListener("click",table_add);
document.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        table_add()
    }
});


let botao1 = document.querySelector("#imc_buttons div + div").firstElementChild;
botao1.addEventListener("click",del_maior);

let botao2 = document.querySelector("#imc_buttons div + div").lastElementChild;
botao2.addEventListener("click",del_menor);


