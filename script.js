const createElements=(arr)=>{
   const grpElements=arr.map(el => `<span class="btn">${el}</span>`)
   return(grpElements.join(" "))
}

const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove("hidden")
        document.getElementById('word-container').classList.add("hidden")
    }
    else{
        document.getElementById('spinner').classList.add("hidden")
        document.getElementById('word-container').classList.remove("hidden")
    }
}
const loadLessons=()=>{
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res=>res.json())
.then(json => {
    console.log(json)
    displayLesson(json.data)
})
}
const removeBtn=()=>{
    const lessonBtn=document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach((btn)=>btn.classList.remove("active"))
}

const LoadWords=(id)=>{
manageSpinner(true)

    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(json => {
        removeBtn();
        const btnActive=document.getElementById(`lesson-btn-${id}`)
            btnActive.classList.add("active")
        
    console.log(json)
    // displayLesson(json.data)
    displayWord(json.data)
})
}



const displayWord=(words)=>{
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML="";
    if(words.length==0){
       wordContainer.innerHTML=`
       <div class="col-span-full text-center space-y-[12px]">
      
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
       
            <p class=" text-[13.38px] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-[34.38px] font-bangla">নেক্সট Lesson এ যান</h2>
        </div>`
        manageSpinner(false)

        return;
        
    }

    for(let word of words){
        const cardDiv=document.createElement('div')
        cardDiv.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-[24px]">
            <h2 class="font-bold text-3xl">${word.word?word.word:"words not found"}</h2>
            <p>Meaning /Pronounciation</p>
            <p class="font-bangla font-semibold text-3xl">"${word.meaning ? word.meaning:"words not found"} / ${word.pronunciation?word.pronunciation:"words not found"}"</p>
         <div class="flex justify-between items-center">
            <button onclick="loadModal(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        </div>
        `
        wordContainer.appendChild(cardDiv)
    }
manageSpinner(false)

}
const loadModal=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=>res.json())
    .then(json => {
    console.log(json)
    displayModal(json.data)
})
}

const displayModal=(word)=>{
    const modalContainer=document.getElementById('modal-container')
    modalContainer.innerHTML=`
       <h3 class="text-[36px] font-bold mb-[32px]">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h3>
    <div class="space-y-[10px] mb-[32px]">
        <h3 class="font-semibold text-[24px]">Meaning</h3>
        <p class="font-bangla">${word.meaning}</p>
    </div>
    <div class="space-y-[10px] mb-[32px]">
        <h3 class="font-semibold text-[24px]">Example</h3>
        <p class="">${word.sentence}</p>
    </div>
    <div class="space-y-[10px] mb-[32px]">
        <h3 class="font-semibold text-[24px] font-bangla">সমার্থক শব্দ গুলো</h3>
        <div class="">${createElements(word.synonyms)}</div>
    </div>
   
    
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Complete</button>
      </form>
    </div>`

    document.getElementById('show_modal').showModal()
    
}

const displayLesson=(lessons)=>{

    const lessonContainer=document.getElementById('lesson-container')
    lessonContainer.innerHTML="";
    for(let lesson of lessons){
        const btnDiv=document.createElement('div')
        btnDiv.innerHTML=`
       <button id="lesson-btn-${lesson.level_no}" onclick="LoadWords(${lesson.level_no})" class="btn btn-outline btn-primary p-6 lesson-btn">
       <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
       </button>`;

        lessonContainer.appendChild(btnDiv)
    }
        // console.log(lesson)
        
    
}
loadLessons();