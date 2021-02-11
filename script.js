window.onload=function(){ /*Parece que document.getElementById('btn');está retornando null porque é executado antes de o DOM carregar totalmente. Usar window.onload*/
    const $ = x => document.querySelector(x); /*função que substitui o query selector*/
    
    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();

    function addCarToGarage(carro){ 
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${carro.name}</td>
                    <td>${carro.placa}</td>
                    <td data-time="${carro.time}">${new Date(carro.time).toLocaleString("pt-BR", {hour: "numeric", minute: "numeric", second: "numeric"})}</td>
                    <td>
                        <button class="reset">Saída</button>
                    </td>
                `;/*adição dos elementos adcionados no registrar ao html*/
                $("#garage").appendChild(row);
                
            };
    /*função que renderiza a garagem na tela*/
    function renderGarage(){
        
        let garage = localStorage.getItem("garage");
        garage = JSON.parse(garage);
        if(garage == null){

        }else{
            garage.forEach(car => addCarToGarage(car));/*para cada elemento do garage vai ser substituido na variavel c usada como parametro na função addCarToGarage*/
        }
    }      

    $("#btn").addEventListener("click", e =>{
        const name = $("#nomeCarro").value;
        const placa = $("#placaCarro").value;
        if(!name) {
            alert("Nome em branco! Favor insira o nome do veículo.");
            $("#nomeCarro").focus();
        }
        else if(!placa) {
            alert("Placa em branco! Favor insira o número da placa.")
            $("#placaCarro").focus();
        }
        else{
        const carro = {name: name, placa: placa, time: new Date()}
        const garage = getGarage();
        garage.push(carro);
        localStorage.garage = JSON.stringify(garage);
        addCarToGarage(carro);
        $("#nomeCarro").value = "";
        $("#placaCarro").value = "";
        console.log(carro, garage);
        }
    });

    $("#garage").addEventListener("click", e =>{
        if(e.target.className == "reset"){
            checkout(e.target.parentElement.parentElement.cells);/*o cells tranforma os td's em arrays para que sejam manipulaoos na funcção chckout*/
        }
        
    });

    function checkout(info){
        const placa = info[1].textContent; /*pegou a informação da segunda coluna - placa*/
        console.log(placa)

    }
};