const share_btns = document.querySelectorAll('.share-btn');
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