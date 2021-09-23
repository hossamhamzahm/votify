const check_opt = document.querySelectorAll('main form input.form-check-input');
const opts_num = document.querySelectorAll('main form input[type="number"]');
const sharable_btn = document.getElementById('sharable');
let prev_marked_radio = null

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
    const link = `${window.location.host}/polls/${sharable_btn.getAttribute("data-id")}`

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(link);
    makeAlert();
});


/* let form_data;

document.querySelector('main form button[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();
    form_data = new FormData(document.querySelector('main form'));
    console.log(form_data);
}); */



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