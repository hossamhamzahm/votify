const share_btns = document.querySelectorAll('.share-btn');
const download_csv_link = document.getElementById('csv-link');
const show_link = document.querySelectorAll('#navbarScroll ul li a');

share_btns.forEach((share_btn, idx) => {
    share_btn.addEventListener('click', (e) => {
        const link = `${window.location.host}/polls/${share_btn.getAttribute("data-id")}`

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(link);
        makeAlert(link);
    });
});



function makeAlert() {
    const toast = document.querySelector('.toast');
    toast.classList.remove('hide');
    toast.classList.add('show');


    setTimeout(() => {
        document.querySelector('.toast').classList.remove('show');
        document.querySelector('.toast').classList.add('hide');
    }, 5000);
}


if (download_csv_link) {
    download_csv_link.addEventListener('click', (e) => {
        export_csv();
    });
}


function export_csv() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Vote\n";

    opts.forEach(function (opt, idx) {
        for (let voter of opt.voters) {
            let row = `"${opt.val}","${voter.f_name} ${voter.l_name}"\n`;
            csvContent += row;
        }
    });


    let encodedUri = encodeURI(csvContent);
    download_csv_link.setAttribute("href", encodedUri);
    download_csv_link.setAttribute("download", "my_data.csv");
}


show_link[1].classList.add('active')