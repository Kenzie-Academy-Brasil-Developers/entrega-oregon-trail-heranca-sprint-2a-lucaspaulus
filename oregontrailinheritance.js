class Traveler {
    constructor(name) {
        this._name = name
        this._food = 1
        this._isHealthy = true
    }
    set name(characterName){
        this._name = characterName
    
    }

    get name(){
        return this._name
    }

    set food(qtdFood){
        this._food = qtdFood
    }    

    get food(){
        return this._food
    }

    set isHealthy(characterHealthy){
        this._isHealthy = characterHealthy
    }

    get isHealthy(){
        return this._isHealthy
    }
   
    hunt() {
       // sitting code herev
       this.food += 2
    }
    eat() {
       // fetching code here
       if(this.food > 0){
            this.food--
       }else{
            this.isHealthy = false   
       }
    }
}

class Wagon{
    constructor(capacity){
        this._capacity = capacity
        this._passengers = []
    }

    set capacity(characterCapacity){
        this._capacity = characterCapacity
    }

    get capacity(){
        return this._capacity
    }

    set passengers(qtdPassengers){
        this._passengers = qtdPassengers
    }
    
    get passengers(){
        return this._passengers
    }
    
    getAvailableSeatCount(){
        return this._capacity - this._passengers.length
    }

    join(Traveler){
        if(this.getAvailableSeatCount() > 0){
            this._passengers.push(Traveler)
        }
    }

    shouldQuarantine(){
        for(let i = 0; i < this._passengers.length; i++){
            if(!this._passengers[i].isHealthy){
                return true
            }
        }
        return false
    }

    totalFood(){
        let totalFoods = 0
        for(let i = 0; i < this._passengers.length; i++){
            totalFoods += this._passengers[i].food 
        }

        return totalFoods
    }
}

class Hunter extends Traveler{
    constructor(name, isHealthy){
        super(name,isHealthy)
        this._food = 2
    }
    set food(qtdFood){
        this._food = qtdFood
    }

    get food(){
        return this._food
    }

    hunt(){
        this._food += 5
    }
    eat(){
        if(this._food > 1){
            this._food -= 2
        }
        else if(this._food === 1){
            this._food--
            this._isHealthy = false
        }
    }

    giveFood(traveler, numOfFoodUnits){
        if (this._food >= numOfFoodUnits) {
            this._food -= numOfFoodUnits
            traveler._food += numOfFoodUnits
        }
    }
}

class Doctor extends Traveler{
    constructor(name, qtFoods, isHealthy){
        super(name, qtFoods, isHealthy)
    }
    heal(Traveler){
        Traveler._isHealthy = true
    }

}

/**********************************TESTA O CÓDIGO*************************************/ 
// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter); 

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);

/************************************************************************************/ 