const todoComplete = document.querySelectorAll('.completedTick')
const todoUnComplete = document.querySelectorAll('.completed')
const deleted = document.querySelectorAll('.fas')

Array.from(todoComplete).forEach((element) =>{
    element.addEventListener('click', markDone)

})

Array.from(todoUnComplete).forEach((element) =>{
    element.addEventListener('click', unComplete)
})

Array.from(deleted).forEach((element) =>{
    element.addEventListener('click', deleteItem)
})

async function markDone(){
    const todoInput = this.parentNode.childNodes[1].innerText
    console.log(todoInput)
    try{
        const res = await fetch('markDone', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todoInput': todoInput
            })
          })
        const data = await res.json()
            console.log(data)
            
        }catch(err){
        console.log(err)
    }
}


async function unComplete(){
    const todoInput = this.parentNode.childNodes[1].innerText
    try{
        const res = await fetch('UnComplete', {
            method: 'put',
            headers: {'Content-Type': 'applications/json'},
            body: JSON.stringify({
                'todoInput' : todoInput
            })
           })
        const data = await res.json()
        console.log(data)
   
    }catch(err){
        console.log(err)
    }

}

async function deleteItem(event){
    const dltBtn = event.target
    const todoInput = dltBtn.previousElementSibling.previousElementSibling.innerText
    try{
        const res = await fetch('deleteItem',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'todoInput': todoInput
            })
        })
        const data =  await res.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}