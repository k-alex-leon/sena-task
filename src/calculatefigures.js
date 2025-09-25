import './style.css'
// vamos a calcular el area y/o perimetro de un triangulo, rectangulo, cuadrado y circulo

let objects = {
  triangle: {
    area: areaTriangulo,
    perimetro: perimetroTriangulo
  },
  rectangle: {
    area: areaRectangulo,
    perimetro: perimetroRectangulo
  },
  square: {
    area: areaCuadrado,
    perimetro: perimetroCuadrado
  },
  circle: {
    area: areaCirculo,
    perimetro: perimetroCirculo
  }
}


// Triangulo
function areaTriangulo(base, altura) {
  return (base * altura) / 2
}

function perimetroTriangulo(lado1, lado2, lado3) {
  return lado1 + lado2 + lado3
}

// Rectangulo
function areaRectangulo(base, altura) {
  return base * altura
}

function perimetroRectangulo(base, altura) {
  return 2 * (base + altura)
}

// Cuadrado
function areaCuadrado(lado) {
  return lado * lado
}

function perimetroCuadrado(lado) {
  return 4 * lado
}

// Circulo
function areaCirculo(radio) {
  return Math.PI * radio * radio
}

function perimetroCirculo(radio) {
  return 2 * Math.PI * radio
}

let figureType = document.getElementById('figureType')
let calculationType = document.getElementById('calculationType')

figureType.addEventListener('change', updateForm)
calculationType.addEventListener('change', updateForm)

function updateForm() {
  let figure = figureType.value
  let calculation = calculationType.value

  if(figure && calculation) {
    let params = getParams(figure, calculation)
    renderForm(params)
  }
}

function getParams(figure, calculation) {
  let params = []
  switch(figure) {
    case 'triangle':
      if(calculation === 'area') {
        params = ['base', 'altura']
      } else {
        params = ['lado1', 'lado2', 'lado3']
      }
      break
    case 'rectangle':
      params = ['base', 'altura']
      break
    case 'square':
      params = ['lado']
      break
    case 'circle':
      params = ['radio']
      break
  }
  return params
}

function renderForm(params) {
  let formContainer = document.getElementById('formContainer')
  formContainer.innerHTML = ''

  let form = document.createElement('form')
  form.id = 'calculationForm'

  params.forEach(param => {
    let label = document.createElement('label')
    label.for = param
    label.textContent = param.charAt(0).toUpperCase() + param.slice(1) + ': '

    let input = document.createElement('input')
    input.type = 'number'
    input.id = param
    input.name = param
    input.required = true

    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(document.createElement('br'))
  })

  let submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Calcular'

  form.appendChild(submitButton)
  formContainer.appendChild(form)

  form.addEventListener('submit', handleFormSubmit)
}

function handleFormSubmit(event) {
  event.preventDefault()

  let figure = figureType.value
  let calculation = calculationType.value
  let form = event.target

  let params = Array.from(form.elements)
    .filter(el => el.tagName === 'INPUT')
    .map(input => parseFloat(input.value))

  let result
  if(calculation === 'area') {
    result = objects[figure].area(...params)
  } else {
    result = objects[figure].perimetro(...params)
  }

  displayResult(result)
}

function displayResult(result) {
  let resultContainer = document.getElementById('resultContainer')
  resultContainer.textContent = `Resultado: ${result.toFixed(2)}`
}
