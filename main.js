// faz com que a linguagem fique em portugues 
document.documentElement.lang="pt-br";

// informa o caminho principal
const base = window.location.origin + "/" + window.location.pathname.split("/")[1];  

function add_link_menu() {
    //? identifica o butão btn_config
    const btn = document.getElementById("btn_config");


    const details = document.createElement("details");
    //? implementa os elementos referenciados corretamente
    details.innerHTML = `
        <summary>Atividades</summary>
        <a href="${base}/index.html">Introdução da Disciplina</a><br>

        <details>
            <summary>1° Bimestre</summary>
            <a href="${base}/atvs/bim1_teoria/atv2/index.html">Atividade 02: A Evolução do Windows</a><br>
            <a href="${base}/atvs/bim1_teoria/atv3/index.html">Atividade 03: A Evolução das interfaces da Apple</a><br>
            <a href="${base}/atvs/bim1_teoria/atv4/index.html">Atividade 04: Análise Crítica a sites sem </a><br>
            <a href="${base}/atvs/bim1_teoria/atv5/index.html">Atividade 05: Pesquisa sobre ferramentas de padronização</a><br>
            <a href="${base}/atvs/bim1_teoria/atv6/index.html">Pesquisa: O que é Gestalt e Heurísticas de Nielsen</a>
        </details>

        <details>
            <summary>2° Bimestre</summary>
            <a href="${base}/atvs/bim2_pratica/atv1/index.html">Identidade Visual</a>
        </details>
        `;

    //? Insere antes do botão
    btn.parentElement.insertBefore(details, btn);

//   const container = document.querySelector("details");

//   container.innerHTML = `
//     <summary>Atividades</summary>
//     <a href="${base}/index.html">Introdução da Disciplina</a><br>

//     <details>
//       <summary>1° Bimestre</summary>
//       <a href="${base}/atvs/bim1_teoria/atv2/index.html">Atividade 02: A Evolução do Windows</a><br>
//       <a href="${base}/atvs/bim1_teoria/atv3/index.html">Atividade 03: A Evolução das interfaces da Apple</a><br>
//       <a href="${base}/atvs/bim1_teoria/atv4/index.html">Atividade 04: Análise Crítica</a><br>
//     </details>

//     <details>
//       <summary>2° Bimestre</summary>
//       <a href="${base}/atvs/bim2_pratica/atv1/index.html">Identidade Visual</a>
//     </details>
//   `;
}

{/* <details>
        <summary>Atividades</summary>
        <a href="/index.html">Introdução da Disciplina</a><br> <!-- os caminhos estão referenciados com base na pasta inicial do diretorio -->
        <!-- mostra as atividades do primeiro bimestre -->
        <details>  
            <summary>1° Bimestre</summary>
            <a href="./atvs/bim1_teoria/atv2/index.html">Atividade 02: A Evolução do Windows</a><br>
            <a href="./atvs/bim1_teoria/atv3/index.html">Atividade 03: A Evolução das interfaces da Apple</a><br>
            <a href="./atvs/bim1_teoria/atv4/index.html">Atividade 04: Análise Crítica a sites sem </a><br>
            <a href="./atvs/bim1_teoria/atv5/index.html">Atividade 05: Pesquisa sobre ferramentas de padronização</a><br>
            <a href="./atvs/bim1_teoria/atv6/index.html">Pesquisa: O que é Gestalt e Heurísticas de Nielsen</a>
        </details>

        <details>
            <summary>2° Bimestre</summary>
            <a href="./atvs/bim2_pratica/atv1/index.html">identidade visual</a>
        </details>        
    </details>
    <button id="btn_config" onclick="open_close_config()">configurações</button> */}

// adiciona o style e as divs, menu e config, em todos os arquivos que receberem o main.js
async function add_element(){
    //* add style 
    const link = document.createElement('link'); //? cria uma variavel que recebe o elemento link
    link.rel = 'stylesheet'; //? configura 
    link.href = relative_path + '/style.css'; //? referencia o css
    document.head.append(link); //? adiciona o elemento
    //! o append() adiciona no final 

    //* add div config
    const div_config = document.createElement('div'); //? cria a varivel do elemento
    div_config.id = 'config_div'; //? adiciona o id
    document.body.prepend(div_config); //? adiciona a div ao body 
    //! o prepend() adiciona no inicio

    //* add div menu
    const div_menu = document.createElement('div'); 
    div_menu.id = 'menu_div'; 
    document.body.prepend(div_menu);

    
}

// procura o arquivo de menu 
async function include_complement() {
    // coleta o caminho do menu 
    const menu_bar = await fetch( relative_path + "/complementos/barra_menu.html");
    document.getElementById('menu_div').innerHTML = await menu_bar.text();
    
    // coleta o caminho da caxa de preferencias
    const config_box = await fetch( relative_path + '/complementos/configuracao.html');
    document.getElementById('config_div').innerHTML = await config_box.text();
    
}

// abre e fecha o menu 
function open_close_menu(){
        const menu = document.getElementById('menu_div_bar');
        menu.classList.toggle('active') 
    }

// abre e fecha a caixa de preferencias 
function open_close_config(){
        const prefe = document.getElementById('config_div_box');
        prefe.classList.toggle('active') 
}

// deixa o sistema funcionando de forma assincrona 
async function start() {
    await include_complement();

    // cria um botão onde de para mudar o tema do site
    const btn_theme = document.getElementById("btn_theme");
    const var_theme = localStorage.getItem("theme");

    // verifica a preferencia do usuario 
    if (var_theme === "dark"){
        document.body.classList.add('dark_theme');
    }

    // adiciona o tema com o click
    btn_theme.addEventListener("click", function(){
        document.body.classList.toggle('dark_theme');

        // ve se o atual é dark e salva a preferencia
        let theme = 'light';
        if (document.body.classList.contains("dark_theme")){
            theme = "dark";
        }
        // salva o tema
        localStorage.setItem('theme', theme); 
    });
}

// chama as funções
add_element();
add_link_menu();
start();

