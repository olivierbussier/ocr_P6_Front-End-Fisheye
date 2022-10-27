class Subject {
   constructor() {
       this._observers = []
   }

   subscribe(observer) {
       this._observers.push(observer)
   }

   unsubscribe(observer) {
       this._observers = this._observers.filter(obs => obs === observer)
   }

   fire(productName) {
       this._observers.forEach(observer => observer.addToWishList(productName))
   }
}

class WishList {
   constructor() {
       this.products = []
   }

   addToWishList(productName) {
       console.log(`Add the product ${productName} to the wishlist`)
       this.products.push(productName)
   }
}

 
class Mailer {
   constructor(email) {
       this._email = email
   }

   addToWishList(productName) {
       console.log(`Send an email to ${this._email} with the product name ${productName}`)
   }
}

const Sub = new Subject()

const Mail = new Mailer('email@example.com')
const WL = new WishList()

Sub.subscribe(Mail)
Sub.subscribe(WL)

 
Sub.fire('Terminator')

