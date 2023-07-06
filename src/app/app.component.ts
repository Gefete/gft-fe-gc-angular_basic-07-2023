import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    screen: string | number = "";
    operation: string = "";
    numbers: number[] = [];
    operators: string[] = [];
    text = "";

    // Metodo que registra los botones pulsados
    getNumberPressed (numPress: string | number){
        
        this.operation += numPress
        this.text += numPress
        
        this.screen =  this.operation;
    }

    // Metodo que realiza las operaciones
    result (){
        // añade el ultime numero y por argumento no se le envia nada 
        // ya que al dar igual no introducimos simbolo de calculo
        this.operatorFun("");

        let posMulti;
        let posDivision;

        // Bucle para encontrar y solucionar los operadores con prioridad
        do {
            // Recoge el indice del array en el que se encuentra el operador
            posMulti = this.operators.indexOf('*');
            posDivision = this.operators.indexOf('/');
            
            // Comprueba si estan los dos operadores con prioridad presentes
            if(posMulti>=0 && posDivision>=0){
                /* En caso de que los 2 esten presentes 
                comprueba el que esta mas a la izquierda */
                if(posMulti<posDivision){
                    this.multiplication(posMulti);
                }else{
                    this.division(posDivision)
                }
            // En caso de haber solo un operador con prioridad 
            }else{
                if(posMulti>=0){
                    this.multiplication(posMulti);
                }
                if(posDivision>=0){
                    this.division(posDivision)
                }
            }
        } while (posMulti >= 0 && posDivision >=0);

        // resolver el resto de operaciones (+, -) (izquierda a derecha)
        while (this.numbers.length>1) {
            if(this.operators[0] === "+")
                this.numbers [0] = (+this.numbers[0])+ (+this.numbers[1]); 
                else if(this.operators[0] === "-")
                this.numbers [0] = (+this.numbers[0])- (+this.numbers[1]); 
                this.eliminacionArrayconIndex(0);
        }
        
        // Envia datos a la pantalla
        this.screen =  this.numbers[0];
        
        // Limpieza de Variables
        this.text="";
        this.numbers=[];
        this.operators = [];
    }

    // Metodo para multiplicar
    multiplication(index:number){
        this.numbers[index] = (+this.numbers[index]) *  (+this.numbers[index+1]); 
        this.eliminacionArrayconIndex(index);
    }

    // Metodo para dividir
    division(index:number){
        this.numbers[index] = (+this.numbers[index]) /  (+this.numbers[index+1]); 
        this.eliminacionArrayconIndex(index);
    }

    /* Borra la parte de la operacion solucionada del array 
    (a + b <- elimina de sus respectivas arrays la "b" i el simbolo "+" dejando "a" con la solucion de la operacion) */
    eliminacionArrayconIndex(position:number){
        this.numbers.splice(position+1, 1);
        this.operators.splice(position, 1);
    }

    // Metodo que registra en los arrays los numeros y los operadores(simbolos)
    operatorFun(simbols: string){
        this.numbers.push(+this.operation);
        this.text +=simbols;
        this.operation ="";
        if (simbols != "") {
            this.operators.push(simbols);
        }
        this.screen =  this.text;
    }

    // Metodo que limpia las variables de la calculadora (hecho para el boton "c")
    cleaner(){
        this.operation = ""
        this.screen = "";
        this.text = "";
        this.numbers = [];
        this.operators = [];
    }
}
