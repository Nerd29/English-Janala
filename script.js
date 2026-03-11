
const loadLessons=()=>{
fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res=>res.json())
.then(json => {
    console.log(json)
    displayLesson(json.data)
})
}

const displayLesson=(lessons)=>{

    const lessonContainer=document.getElementById('lesson-container')
    lessonContainer.innerHTML="";
    for(let lesson of lessons){
        const btnDiv=document.createElement('div')
        btnDiv.innerHTML=`
       <button class="btn btn-outline btn-primary p-6">
       <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
       </button>`;

        lessonContainer.appendChild(btnDiv)
    }
        // console.log(lesson)
        
    
}
loadLessons();