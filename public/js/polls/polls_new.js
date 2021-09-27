const opt_div  = document.getElementById('opts-div');
const opt_creator_input = document.getElementById('opt-creator');
const add_opt_btn = document.getElementById('add-opt-btn');


const show_link = document.querySelectorAll('#navbarScroll ul li a');
show_link[0].classList.add('active')


// create a new option after pressing enter
opt_creator_input.addEventListener('keypress', (e)=>{
    if(e.key=="Enter"){
        e.preventDefault();
        add_opt_btn.click();
    }
});

// create a new option after clicking the plus button
add_opt_btn.addEventListener('click', (e)=>{
    if(opt_creator_input.value == ""){
        return ;
    }
    const text = opt_creator_input.value;
    opt_creator_input.value = "";
    create_opt(text);
});


// a function to create and append new options
function create_opt(text){
    const newElement = document.createElement('div');
    newElement.innerHTML = `
        <div class="input-group mb-3">
            <input type="text" class="form-control" name="poll[opts][]" value="${text}">
            <div class="valid-feedback">
                Looks good!
            </div>
            <div class="invalid-feedback">
                You must enter a non-negative number for the campground price
            </div>
        </div>
    `

    opt_div.appendChild(newElement);
}