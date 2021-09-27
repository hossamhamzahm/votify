const check_opt = document.querySelectorAll('main form input.form-check-input');
const opts_num = document.querySelectorAll('main form input[type="number"]');
const sharable_btn = document.getElementById('sharable');
let prev_marked_radio = null

const opt_div = document.getElementById('opts-div');
const opt_creator_input = document.getElementById('opt-creator');
const add_opt_btn = document.getElementById('add-opt-btn');

const download_csv_link = document.getElementById('csv-link');
const download_csv_opt_link = document.getElementById('csv-opt-link');
const show_voters_modal = document.querySelector('#showVoters .modal-body')
const ppl_icons = document.querySelectorAll('.ppl-icon')


const show_link = document.querySelectorAll('#navbarScroll ul li a');
show_link[1].classList.add('active')


if (check_opt[0].getAttribute('type') === "radio"){
    prev_marked_radio = true
}

check_opt.forEach((opt, idx)=>{
    opt.addEventListener('click', (e)=>{
        let votes = opts_num[idx].value;
        (opt['checked']) ? votes++ : votes--;
        opts_num[idx].value = votes;

        if(prev_marked_radio !== null){
            if(typeof(prev_marked_radio) === 'number'){
                opts_num[prev_marked_radio].value = parseInt(opts_num[prev_marked_radio].value) -1
                console.log("done2")
            }
            prev_marked_radio = idx
        }
    })
});



sharable_btn.addEventListener('click', async(e) => {
    e.preventDefault();
    const link = `Poll author: ${poll_author}\nPoll id: ${sharable_btn.getAttribute("data-id")}\nURL: ${window.location.host}/polls/${sharable_btn.getAttribute("data-id")}\n`

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(link);
    makeAlert();
});


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


ppl_icons.forEach((ppl_icon, idx)=>{
    ppl_icon.addEventListener('click', (e)=>{
        const accordions = ppl_icon.querySelectorAll('.accordion-item');
        if(!accordions.length){
            show_voters_modal.innerHTML = `No one voted for this option`
            return
        }
        else{
            show_voters_modal.innerHTML = ``
        }

        accordions.forEach((accordion, idx)=>{
            accordion.classList.remove('d-none');
            show_voters_modal.innerHTML += accordion.outerHTML;
            accordion.classList.add('d-none');
        })

    })
})


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
    if(url.includes('edit')){
        url = url.replace('edit', `opts/`);
    }
    else{
        url += '/opts/'
    }
    console.log(url, text);
    await fetch(url, {
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({ text })
    });
}



function makeAlert() {
    const toast = document.querySelector('.toast');
    toast.classList.remove('hide');
    toast.classList.add('show');


    setTimeout(() => {
        document.querySelector('.toast').classList.remove('show');
        document.querySelector('.toast').classList.add('hide');
    }, 5000);
}


if(download_csv_link){
    download_csv_link.addEventListener('click', (e)=>{
        export_csv();
    });
}



if (download_csv_opt_link) {
    download_csv_opt_link.addEventListener('click', (e) => {
        export_opt_csv();
    });
}


function export_csv() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,email,Vote\n";

    opts.forEach(function (opt, idx) {
        for (let voter of opt.voters) {
            let row = `"${voter.f_name} ${voter.l_name}","${voter.email}","${opt.val}"\n`;
            csvContent += row;
        }
    });


    let encodedUri = encodeURI(csvContent);
    download_csv_link.setAttribute("href", encodedUri);
    download_csv_link.setAttribute("download", "poll_data.csv");
}



function export_opt_csv() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name ,Email\n";

    if(String(show_voters_modal.innerText) !==  "No one voted for this option"){
        show_voters_modal.childNodes.forEach(function (accordion, idx) {
            const name = accordion.innerText
            let email = accordion.querySelector('.accordion-body').innerText
            email = email.substring(email.indexOf(':')+2)
            email = email.trimEnd()
            let row = `"${name}","${email}"\n`;
            csvContent += row;
        });
    }
    else{
        csvContent += "No one voted for this option\n";
    }

    let encodedUri = encodeURI(csvContent);
    download_csv_opt_link.setAttribute("href", encodedUri);
    download_csv_opt_link.setAttribute("download", "option_data.csv");
}