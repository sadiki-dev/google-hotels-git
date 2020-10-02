// function pour changer la monnaie en MAD
exports.changeMoney = async (page,url) => {
    await page.goto(url,{waitUntil:'load',timeout:0 });
    console.log("The first page is loaded Successfully");

    //cliquer sur boutton Device pour changer la monnaie
    let selectorDevice = 'button.H28TSc';
    await page.waitForSelector(selectorDevice,{timeout : 0 });
    await page.click(selectorDevice);
    
    // attendre le selector pour choisir la monnaie voulu == MAD
    let selectorMAD = 'div.i9xfbb';
    await page.waitForSelector(selectorMAD,{timeout : 0 });
    //selectionner tous les monnaies , et choisir MAD == 'Dirham Marocan' par l'attribut data-value.
        await page.$$eval(selectorMAD, anchors => {
            anchors.map(anchor => {
                if(anchor.getAttribute('data-value') == 'MAD') {
                    anchor.click();
                    return
            }
        })
    });
    // Attendre et cliquer sur le button OK pour confirmer le changement de la monnaie
    let selectorok = 'div.tI4oEb';
    await page.waitForSelector(selectorok,{timeout : 0 });
    await page.$$eval(selectorok, anchors => {
        anchors.map(anchor => {
            if(anchor.getAttribute('aria-label') == 'OK') {
                anchor.click();
                return
            }
        })
    });
    await page.waitForNavigation({waitUntil : "networkidle0",timeout:0});
    console.log("The Currency changed to MAD (Moroccan Dirham) ");
    // retourner le nouvel lien après le changement de la monnaie.
    return await page.url();
}

//function pour récupérer les liens de tous les hotels 
exports.loadHotelsList = async (page,url) => {
var i;
var k=0;
var hotels_links = [];

await page.goto(url,{waitUntil:'load',timeout:0 });
//await page.waitForSelector('div.zbLWdb',{timeout:0 });
//faire une boucle pour passer au page suivant , 'div.zbLWdb' est le selecteur de button suivant
//if(await page.$('div.zbLWdb') !== Null ){
while(await page.evaluate(()=>document.querySelector('div.zbLWdb')) != null ){
    var links = await page.$$eval("a.PVOOXe", links => links.map(link =>link.href));
    for(i=0;i<links.length;i++){ //"a.PVOOXe" est le selector qui contient le lien de chaque hotel
        hotels_links.push(links[i]);
        
    } 
     await page.evaluate(()=>document.querySelector('div.zbLWdb').click());
     //await page.waitForSelector('div.zbLWdb',{timeout : 0 });
     await page.waitFor(5000);
     console.log(`Scraping page ${k+1} ...`);
     k++;
     //console.log("test 1");
    //await page.click('div.zbLWdb');
    //await page.waitForNavigation({waitUntil : "networkidle0",timeout:0});
}
console.log("End scraping pages");
//else {console.log("End of pagination");}
return hotels_links;
}

