const synonyms=["thankful",
"appreciative",
"obliged"]

const createElements=(arr)=>{
   const grpElements=arr.map(el => `<span class="btn">${el}</span>`)
   console.log(grpElements.join(""))
}
createElements(synonyms)