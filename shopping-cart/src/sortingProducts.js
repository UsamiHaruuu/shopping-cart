const LowestToHighest =  (products) => {
    if(products)
    products.sort(function(a,b){
        return a.price-b.price;
    })
}

const HighestToLowest =  (products) => {
    if(products)
     products.sort(function(a,b) {
        return b.price-a.price;
    })
}
const OldestToNewest =  (products) => {
    if(products)
     return  products.reverse();
}
export {HighestToLowest, LowestToHighest,OldestToNewest }
