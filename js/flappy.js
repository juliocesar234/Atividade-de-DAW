function novoElemento(tagName, className) {
  const elem = document.createElement(tagName)
  elem.className = className
  return elem
  //Essa função pode ser considerada uma função geratriz, pois
  // cria outros elementos que serão usados no HTML.
  //É fundamental usar ela, por conta que o código ficaria muito repetitivo, caso não a usasse

}

function Barreira(reversa = false) {
  this.elemento = novoElemento('div', 'barreira')

  const borda = novoElemento('div', 'borda')
  const corpo = novoElemento('div', 'corpo')

  this.elemento.appendChild(reversa ? corpo : borda);
  this.elemento.appendChild(reversa ? borda : corpo);

  this.setAltura = altura => corpo.style.height = "${altura}px"
  //Essa função cria elementos to tipo Barreira, que, no caso,
  // serão um dos elementos da jogabilidade do Flappy Bird.
  //Vale ressaltar que o atributo "reverva" serve para saber se a barreira é borda corpo ou corpo borda, para melhor visibilidade   
}

const b = new Barreira(true)
b.setAltura(200)
document.querySelector('[wm-flappy]').appendChild(b.elemento)
// essas linhas servem para instanciar um objeto do tipo Barreira.
//Porém, como é um jogo, esse processo deve ser feito de forma automática

function ParDeBarreiras(altura, abertura, x) {
  this.elemento = novoElemento('div', 'par-de-barreira')

  this.superior = new Barreira(true)
  this.inferior = new Barreira(false)

  this.elemento.appendChild(this.superior.elemento)
  this.elemento.appendChild(this.inferior.elemento)

  this.sortearAbertura = () => {
    const alturaSuperior = Math.random() * (altura - abertura)
    const alturaInferior = altura - abertura - alturaSuperior

    this.superior.setAltura(alturaSuperior)
    this.inferior.setAltura(alturaInferior)
    // Esse método da função ParDeBarreiras serve para criar um número eleatório de formas dos canos aparecerem (para o jogo não ficar repetitivo e sempre ter algo novo)
  }

  this.getX = () => parseInt(this.elemento.style.left.split('px'))
  this.setX = x => this.elemento.style.left = "${x}px"
  this.getLargura = () => this.elemento.clientWidth

  this.sortearAbertura()
  this.setX(x)

}

const b = new ParDeBarreiras(700, 200, 400)
document.querySelector('[wm-flappy]').appendChild(b.elemento)
