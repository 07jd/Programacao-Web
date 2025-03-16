//Ex1
console.log("######## EX 1 ########");
var nome = "João";
console.log(nome);
nome = "Maria";
console.log(nome);


//Ex2
console.log("######## EX 2 ########");
let idade = 20;
console.log(idade);
idade = 21;
console.log(idade);


//Ex3
console.log("######## EX 3 ########");
const PI = 3.14;
console.log(PI);
//PI = 3.1416;


//Ex4
console.log("######## EX 4 ########");
let array1 = [true, "verdade", 10, [5, 4, 3, 2, 1], { propriedade: 9.99 }];

for (let index = 0; index < array1.length; index++) {
  console.log("Elemento " + index + ": " + array1[index]);
}


//Ex5
console.log("######## EX 5 ########");
let fruta = {
  nome: "Banana",
  peso: 150, //gramas
  stock: 5,
  preço: 0.30
};

for (const key in fruta) {
  console.log("Key -> " + key + ": " + fruta[key]);
}


//Outros
console.log("######## DATA TYPES ########");

let frase = "Olá, mundo!";
console.log(typeof frase);

let numero = 10;
console.log(typeof numero);

let verdadeiro = true;
console.log(typeof verdadeiro);

let lista = ["elemento1", "elemento2", "elemento3"];
console.log(typeof lista);

let pessoa = {
  nome: "João",
  idade: 20
};

console.log(typeof pessoa);

let nulo = null;
console.log(typeof nulo);

let indefinido = undefined;
console.log(typeof indefinido);