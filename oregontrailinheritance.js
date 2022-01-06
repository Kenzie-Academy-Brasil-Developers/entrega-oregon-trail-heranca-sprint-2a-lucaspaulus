class Traveler {
    constructor(name) {
        this.name = name
        this.food = 1
        this.isHealthy = true
    }

   hunt() {
       // sitting code here
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
        this.capacity = capacity
        this.passengers = []
    }
    getAvailableSeatCount(){
        return this.capacity - this.passengers.length
    }
    join(Traveler){
        if(this.getAvailableSeatCount() > 0){
            this.passengers.push(Traveler)
        }
    }
    shouldQuarantine(){
        for(let i = 0; i < this.passengers.length; i++){
            if(!this.passengers[i].isHealthy){
                return true
            }
        }
        return false
    }
    totalFood(){
        let totalFoods = 0
        for(let i = 0; i < this.passengers.length; i++){
            totalFoods += this.passengers[i].food 
        }
        return totalFoods
    }
}

class Hunter extends Traveler{
    constructor(name, isHealthy){
        super(name,isHealthy)
        this.food = 2
    }

    hunt(){
        this.food += 5
    }
    eat(){
        if(this.food > 1){
            this.food -= 2
        }
        else if(this.food === 1){
            this.food--
            this.isHealthy = false
        }
    }

    giveFood(traveler, numOfFoodUnits){
        if (this.food >= numOfFoodUnits) {
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        }
    }
}

class Doctor extends Traveler{
    constructor(name, qtFoods, isHealthy){
        super(name, qtFoods, isHealthy)
    }
    heal(Traveler){
        Traveler.isHealthy = true
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