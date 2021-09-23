const opt_div = document.getElementById('opts-div');
const opt_creator_input = document.getElementById('opt-creator');
const add_opt_btn = document.getElementById('add-opt-btn');
const remove_poll_btn = document.querySelector('button[data-bs-target="#deleteModal"]')
const remove_opt_btns = document.querySelectorAll('.remove-opt')


// create a new option after pressing enter
opt_creator_input.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        add_opt_btn.click();
    }
});

// create a new option after clicking the plus button
add_opt_btn.addEventListener('click', (e) => {
    if (opt_creator_input.value == "") {
        return;
    }
    const text = opt_creator_input.value;
    opt_creator_input.value = "";
    create_opt(text);
});


// a function to create and append new options
async function create_opt(text) {
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

    let url = String(window.location.href);
    url = url.replace('edit', `opts/`);
    console.log(url, text);
    await fetch(url, {
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({text})
    });
}



remove_opt_btns.forEach(async (opt, idx)=>{
    opt.addEventListener('click', async(e)=>{
        let url = String(window.location.href);
        url = url.replace('edit', `opts/${opt.getAttribute('data-id')}`);
        console.log(url)
        await fetch(url, {
            method: "DELETE",
            credentials: "include",
        })
        opt.parentElement.parentElement.remove()
    })
});


remove_poll_btn.addEventListener('click',(e)=>{
    e.preventDefault();
})