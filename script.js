"use strict";
const round = document.getElementById('round');
const botonesJuego = document.getElementsByClassName('Boton');
const botonInicio = document.getElementById('botonjugar');


class SimonSays{
    constructor(botonesJuego, botonInicio, round){
        this.round = 0;
        this.totalRounds = 10;
        this.posicionUsuario = 0;
        this.secuencia = [];
        this.botones = Array.from(botonesJuego);
        this.botonesBloqueados = true;
        this.velocidad = 1000;
        this.display = {
            botonInicio,
            round
        }
        this.sonidoError = new Audio('./sounds/error.wav');
        this.sonidoBoton = [
            new Audio('./sounds/boton.mp3'),
            new Audio('./sounds/boton.mp3'),
            new Audio('./sounds/boton.mp3'),
            new Audio('./sounds/boton.mp3')
        ];
        }

    init(){
        this.display.botonInicio.onclick = () => this.comenzarJuego();
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

    //Actualiza el valor de Round a medida que se avanza y se muestra en pantalla
    actualizarRound(valor){
        this.round = valor;
        this.display.round.textContent = `Round ${this.round}`;
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
            if(this.round === this.posicionUsuario){
                this.actualizarRound(this.round + 1);
                this.speed /= 1.02;
                this.isjuegoPerdido();
            } else {
                this.posicionUsuario++;
            }
        } else {
            this.juegoPerdido();
        }
    }

    isjuegoPerdido(){
        if(this.round === this.totalRounds){
            this.juegoGanado();
        } else {
            this.posicionUsuario = 0;
            this.mostrarSecuencia();
        };
    }

    //revisar
    mostrarSecuencia(){
        this.botonesBloqueados = true;
        let indexSecuencia = 0;
        let temporizador = setInterval(() => {
            const boton = this.botones[this.secuencia[indexSecuencia]];
            /*this.sonidoBoton[this.secuencia[indexSecuencia]].play();//para que suene el boton*/
            this.altenarBotones(boton);
            setTimeout(() => this.altenarBotones(boton), this.velocidad / 2);
            indexSecuencia++;
            if(indexSecuencia > this.round){
                this.botonesBloqueados = false;
                limpiarIntervalo(temporizador);
            }
        }, this.velocidad);
    }

    //revisar
    altenarBotones(boton){
        boton.classList.toggle('active'); //para que se vea el cambio de color osea que hay que acomodar en el css
    }

    //revisar porque hay que agregar los sonidos
    juegoPerdido(){
        this.sonidoError.play();
        this.display.botonInicio.disabled = false;
        this.botonesBloqueados = true;
    }

    //revisar clase ganador para que nos funcione para crear lo del score o agregar alguna animacion que indique que gano
    juegoGanado(){
        this.display.botonInicio.disabled = false;
        this.botonesBloqueados = true;
        this.botones.forEach(element => { element.classList.add("ganador")});
    }

}

const simon = new SimonSays(botonesJuego, botonInicio, round);
simon.init();