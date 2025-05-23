function err(a) {
    console.error("[SeLogerPlus | ERROR] - ", a);
}

function log(a) {
    console.log("[SeLogerPlus | INFO] - ", a)
}

function getDatas() {
    const scriptElement = document.evaluate(
        '//script[contains(text(), "__UFRN_LIFECYCLE_SERVERREQUEST__")]',
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem(0);
    return eval(scriptElement.innerHTML.replace('window["__UFRN_LIFECYCLE_SERVERREQUEST__"]=', ''));
}

function createDivOldDate(id, dateMiseEnLigne, dateMiseAJour) {
    const divOldDate = document.createElement("div");
    divOldDate.setAttribute("id", "old_date_to_display_" + id);
    divOldDate.setAttribute("class", "flex flex-wrap");

    const pOldDate = document.createElement("p");
    pOldDate.setAttribute("style",
    `
        margin:0;
        font: 400 0.875rem/1.25rem "Cera SL sys",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
        -webkit-text-decoration: none;
        text-decoration: none;
        color: #646464;
    `);
    pOldDate.innerHTML = "Mise en ligne le " + dateFormatter(dateMiseEnLigne);

    divOldDate.appendChild(pOldDate);

    if (dateMiseEnLigne !== dateMiseAJour) {
        const pCurrentDate = document.createElement("p");
        pCurrentDate.setAttribute("style",
        `
            margin:0;
            font: 400 0.875rem/1.25rem "Cera SL sys",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
            -webkit-text-decoration: none;
            text-decoration: none;
            color: #646464;
        `);
        pCurrentDate.innerHTML = "Mise à jour le " + dateFormatter(dateMiseAJour);

        divOldDate.appendChild(pCurrentDate);
        divOldDate.setAttribute("class", "flex flex-col");
    }

    return divOldDate;
}

function dateFormatter(dateString) {
    const dateObj = new Date(dateString);

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const gapInMs = new Date().getTime() - dateObj.getTime();
    const gapInDays = Math.floor(gapInMs / (1000 * 60 * 60 * 24));

    var formatedDate = `${day}/${month}/${year} à ${hour}h${minutes}`;

    if (gapInDays > 1) {
        formatedDate += ` ( ${gapInDays} jours )`;
    } else if (gapInDays == 1) {
        formatedDate += ` ( Hier )`;
    } else if (gapInDays == 0) {
        if (day === new Date().getDate().toString().padStart(2, '0')) {
            formatedDate += ` ( Aujourd'hui )`;
        } else {
            formatedDate += ` ( Hier )`;
        }
    }

    return formatedDate;
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function spaceDigits(digits) {
    return (digits + "").replaceAll(/\B(?=(\d{3})+(?!\d))/g, " ");
}