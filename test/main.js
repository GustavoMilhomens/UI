//// faz com que a linguagem fique em portugues 
document.documentElement.lang="pt-br";

//// procura o aqrqquivo de menu 
async function include_complement() {
    // coleta o caminho do menu 
    const menu_bar = await fetch("/atividades/atividades_ifto/UI/complementos/barra_menu.html");
    document.getElementById('menu_div').innerHTML = await menu_bar.text();
    
    // coleta o caminho da caxa de preferencias
    const config_box = await fetch('/atividades/atividades_ifto/UI/complementos/preferencias.html');
    document.getElementById('config_div').innerHTML = await config_box.text();
    
}

//// abre e fecha o menu 
function open_close_menu(){
        const menu = document.getElementById('menu_div_bar');
        menu.classList.toggle('active') 
    }

//// abre e fecha a caixa de preferencias 
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

start();

