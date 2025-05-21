function applyOldDate4Annonce(annonce, postId) {
    const datas = getDatas()?.app_cldp?.data;
    if (!datas) {
        throw 'No datas'
    }
    const dateMiseEnLigne = datas?.classified?.metadata?.creationDate;   
    const dateMiseAJour = datas?.classified?.metadata?.updateDate;
    displayOldDateInElement(annonce, postId, dateMiseEnLigne, dateMiseAJour);
}

function displayOldDateInElement(element, id, dateMiseEnLigne, dateMiseAJour) {
    const exist = element.querySelector('[id^="old_date_to_display_"]');
    if (exist) {
        exist.parentElement.removeChild(exist);
    }

    const dateContainer = element.querySelector('[data-testid="cdp-hardfacts"]');

    const divOldDate = createDivOldDate(id, dateMiseEnLigne, dateMiseAJour);

    dateContainer.insertBefore(divOldDate, dateContainer.querySelector("hr"));
}