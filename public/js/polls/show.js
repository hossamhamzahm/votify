const check_opt = document.querySelectorAll('main form input.form-check-input');
const opts_num = document.querySelectorAll('main form input[type="number"]');
const sharable_btn = document.getElementById('sharable');
let prev_marked_radio = null

const opt_div = document.getElementById('opts-div');
const opt_creator_input = document.getElementById('opt-creator');
const add_opt_btn = document.getElementById('add-opt-btn');

const download_csv_link = document.getElementById('csv-link');

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
    const newElement = document.createElement('span');
    document.body.appendChild(newElement);
    newElement.outerHTML = `
        <div class="alert alert-warning alert-dismissible fade show position-absolute" role="alert"
        style="z-index: 1000; bottom: 20px; right:15px; overflow:auto;">
            Copied the sharable link
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    setTimeout(() => {
        document.querySelector('.alert.alert-warning.alert-dismissible.fade.show.position-absolute').remove();
    }, 5000);

    return newElement;
}


if(download_csv_link){
    download_csv_link.addEventListener('click', (e)=>{
        export_csv();
    });
}


function export_csv(){
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Vote\n";

    opts.forEach(function (opt, idx) {
        for(let voter of opt.voters){
            let row = `"${opt.val}","${voter.f_name} ${voter.l_name}"\n`;
            csvContent += row ;
        }
    });


    let encodedUri = encodeURI(csvContent);
    download_csv_link.setAttribute("href", encodedUri);
    download_csv_link.setAttribute("download", "my_data.csv");

    // download_csv_link.click(); // This will download the data file named "my_data.csv".
}