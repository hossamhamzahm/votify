const share_btns = document.querySelectorAll('.share-btn');
const download_csv_link = document.getElementById('csv-link');


share_btns.forEach((share_btn, idx) => {
    share_btn.addEventListener('click', (e) => {
        const link = `${window.location.host}/polls/${share_btn.getAttribute("data-id")}`

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(link);
        makeAlert(link);
    });
});


function makeAlert(text) {
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

    // download_csv_link.click(); // This will download the data file named "my_data.csv".
}