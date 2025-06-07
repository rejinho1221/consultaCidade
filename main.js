async function pesquisarCep(cep) {
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        var resultado = await fetch(url);

        const dados = resultado.json();
        return dados
    } catch (erro) {
        document.getElementById('msg-erro').innerHTML = `<p style="color:red;">Erro: CEP Inválido</p>`;
        return null;

    };
};

async function pesquisarClima(cidade) {
    var apiKey = '04d033d1e38ca079d02eace057120716';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        var resultado = await fetch(url);
        if (!resultado.ok) {
            throw new Error("CEP inválido.")
        }
        var dados = resultado.json();
        return dados
    } catch (erro) {
        document.getElementById('msg-erro').innerHTML = `<p style="color:red;">Erro: ${erro.message}</p>`;
        return null;
    }
}

async function exibirResultados() {
    let cep = document.getElementById('cep').value;

    document.getElementById('cidade').innerHTML = `<strong>...</strong>`;
    document.getElementById('uf').innerHTML = `<strong>...</strong>`;
    document.getElementById('bairro').innerHTML = `<strong>...</strong>`;
    document.getElementById('rua').innerHTML = `<strong>...</strong>`;

    document.getElementById('temperatura').innerHTML = `<strong>...</strong>`;
    document.getElementById('clima').innerHTML = `<strong>...</strong>`;
    document.getElementById('umidade').innerHTML = `<strong>...</strong>`;
    document.getElementById('vento').innerHTML = `<strong>...</strong>`;

    let resultCep = await pesquisarCep(cep);

    let cidade = resultCep.localidade;

    let resultClima = await pesquisarClima(cidade);
    if (resultClima) {
        document.getElementById('temperatura').innerHTML = `<strong>${resultClima.main.temp} °C</strong>`
        document.getElementById('clima').innerHTML = `<strong>${resultClima.weather[0].description}</strong>`
        document.getElementById('umidade').innerHTML = `<strong>${resultClima.main.humidity} %</strong>`
        document.getElementById('vento').innerHTML = `<strong>${resultClima.wind.speed} km/h</strong>`
    } else {
        return
    }

    if (resultCep) {
        document.getElementById('cidade').innerHTML = `<strong>${resultCep.localidade} </strong>`;
        document.getElementById('uf').innerHTML = `<strong>${resultCep.uf} </strong>`;
        document.getElementById('bairro').innerHTML = `<strong>${resultCep.bairro} </strong>`;
        document.getElementById('rua').innerHTML = `<strong>${resultCep.logradouro} </strong>`;
    } else {
        return
    }

    document.getElementById('cidade-title').innerText = `de ${resultCep.localidade}`
}

document.getElementById('btn-buscar').addEventListener('click', exibirResultados);