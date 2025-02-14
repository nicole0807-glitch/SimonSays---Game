"use strict";
/*const round = document.getElementById('round');*/
const round1= document.getElementById('valorronda');
const botonesJuego = document.getElementsByClassName('Boton');
const botonInicio = document.getElementById('botonjugar');
const botonReiniciar = document.getElementById('reiniciarJuego');
const nombreUsuario = document.getElementById('username');


class SimonSays{
    constructor(botonesJuego, botonInicio, round1, botonReiniciar){
        this.round1 = 0;
        this.score = 0;
        this.totalRounds = 10;
        this.posicionUsuario = 0;
        this.secuencia = [];
        this.listascore = [];
        this.botones = Array.from(botonesJuego);
        this.botonesBloqueados = true;
        this.velocidad = 1000;
        this.display = {
            botonInicio,
            round1,
            botonReiniciar
        };
        this.valorRondaElement = round1;
        this.sonidoError = new Audio('./sounds/error.wav');
        this.sonidoBoton = [
            new Audio('./sounds/1.mp3'),
            new Audio('./sounds/2.mp3'),
            new Audio('./sounds/3.mp3'),
            new Audio('./sounds/4.mp3'),
        ];
        }


    init(){
        this.display.botonInicio.onclick = () => this.comenzarJuego();
        this.display.botonReiniciar.onclick = () => this.reiniciarJuego();
    }
    
    //Comienza el juego
    comenzarJuego(){
        this.display.botonInicio.disabled = true;
        this.actualizarRound(1);
        this.posicionUsuario = 0;
        this.secuencia = this.generarSecuencia();
        this.botones.forEach((element, i) => {
            element.classList.remove('ganador');
            element.onclick = () => this.clickBoton(i);
        });
        this.mostrarSecuencia();
    }

    reiniciarJuego(){
        this.actualizarRound(0);
        this.posicionUsuario = 0;
        this.secuencia = [];
        this.display.botonInicio.disabled = false;
        this.botonesBloqueados = true;
        this.botones.forEach(element => {
            element.classList.remove('ganador'); 
            element.onclick = null;
        })
        alert("Juego Reiniciado");

    }

      actualizarRound(valor) {
        this.round1 = valor;
        this.valorRondaElement.textContent = this.round1;
        this.valorRondaElement.setAttribute('data-round', this.round1);
    }


    generarSecuencia(){
        return Array.from({length: this.totalRounds}, () => this.getRandomColor());
    }

    getRandomColor(){
        return Math.floor(Math.random() * 4);
    }

    clickBoton(valor){
        !this.botonesBloqueados && this.validarColor(valor);
    }

    validarColor(valor){
        if(this.secuencia[this.posicionUsuario]=== valor){
           this.sonidoBoton[valor].play(); // para que suene el boton cuando este bien la respuesta
            if(this.posicionUsuario === this.round1 - 1){
                this.actualizarRound(this.round1 + 1);
                this.velocidad/= 1.02;
                this.isJuegoPerdido();
            } else {
                this.posicionUsuario++;
            }
        } else {
            this.juegoPerdido();
        }
    }

    isJuegoPerdido(){
        if(this.round1 === this.totalRounds){
            this.juegoGanado();
        } else {
            this.posicionUsuario = 0;
            this.mostrarSecuencia();
        };
    }

    mostrarSecuencia(){
        this.botonesBloqueados = true;
        let indexSecuencia = 0;
        let temporizador = setInterval(() => {
            const boton = this.botones[this.secuencia[indexSecuencia]];
            this.sonidoBoton[this.secuencia[indexSecuencia]].play(); // para que suene el boton
            this.altenarBotones(boton);
            setTimeout(() => this.altenarBotones(boton), this.velocidad / 2);
            indexSecuencia++;

            if (indexSecuencia >= this.round1) {
                this.botonesBloqueados = false;
                clearInterval(temporizador);
            }
        }, this.velocidad);
    }

       
    altenarBotones(boton){
        boton.classList.toggle('active'); //para que se vea el cambio de color osea que hay que acomodar en el css
    }

    juegoPerdido(){
        this.sonidoError.play();
        this.display.botonInicio.disabled = false;
        this.botonesBloqueados = true;
        const username = localStorage.getItem('username');
        const score = this.round1;
        const listaScore = JSON.parse(localStorage.getItem('list')) || [];
        listaScore.push({ username: username, score: score });
        localStorage.setItem('list', JSON.stringify(listaScore));
        this.actualizarTablaScore();
    }

    //revisar clase ganador para que nos funcione para crear lo del score o agregar alguna animacion que indique que gano
    juegoGanado(){
        this.display.botonInicio.disabled = false;
        this.botonesBloqueados = true;
        this.botones.forEach(element => { element.classList.add("ganador")});
        this.valorRondaElement.textContent = "¡Ganaste! 🏆";
        this.valorRondaElement.setAttribute('data-round', "¡Ganaste!🏆");
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        const username = localStorage.getItem('username');
        const score = this.round1;
        const listaScore = JSON.parse(localStorage.getItem('list')) || [];         
        listaScore.push({ username: username, score: score });   
        localStorage.setItem('list', JSON.stringify(listaScore));   
        this.actualizarTablaScore();
    }
    actualizarTablaScore() {
        
        const listaScore = JSON.parse(localStorage.getItem('list')) || [];
        listaScore.sort((a, b) => b.score - a.score);
    
        const tablaScore = document.getElementById('tablaScore').getElementsByTagName('tbody')[0];
    
        listaScore.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${item.username}</td>    <td>${item.score}</td>`;
            tablaScore.appendChild(fila);
        });
    }}
const simon = new SimonSays(botonesJuego, botonInicio, round1, botonReiniciar);
simon.init();