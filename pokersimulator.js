const fs = require('fs');

{
    class CardShark {
        constructor() {
            this.cards = {
                suits: 'Hearts,Spades,Clubs,Diamonds'.split(','),
                faces: '2,3,4,5,6,7,8,9,10,Jack,Queen,King,Ace'.split(',')
            }

            this.deck = {
                sorted: [],
                shuffled: []
            }

            this.hands = {}
        }

        buildDeck(count = 1) {
            let faces = this.cards.faces
            let suits = this.cards.suits

            let deck = []


            for (let i = 0; i < count; i++) {
                for (let suit of suits) {
                    for (let face of faces) {
                        deck.push({ face, suit })
                    }
                }
            }

            this.deck.sorted = deck
            return deck
        }

        shuffleDeck() {
            let shuffled = this.deck.sorted.map(a => a)
            let currentIndex = shuffled.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
            }
            this.deck.shuffled = shuffled
            return shuffled;
        }

        dealHoldem(players = 2, decks = 1) {
            this.buildDeck(decks)
            let deck = this.shuffleDeck()


            let burn = []
            let field = []
            let hands = {}


            for (let p = 0; p < players; p++) {
                hands[`Player${p + 1}`] = [deck.pop(), deck.pop()]
            }

            burn.push(deck.pop())

            for (let i = 0; i < 3; i++) { 
                field.push(deck.pop()) 
            }

            for (let i = 0; i < 2; i++) {
                burn.push(deck.pop())
                field.push(deck.pop())
            }


            return { burn, field, hands }

        }



    }








    testing = new CardShark()

    testing.buildDeck()
    testing.shuffleDeck()

    console.log(testing.dealHoldem(3))


    oneThousandHands = []

    for (let i=0; i<1000; i++){
        oneThousandHands.push(testing.dealHoldem(4))
    }

    fs.writeFileSync('4players_1000Hands.json', JSON.stringify(oneThousandHands))
}