// ==UserScript==
// @name         OG_Featers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bénéficier de fonctionnaliter gratuite ue le jeu propose en payant
// @author       Anozys
// @match        https://*.ogame.gameforge.com/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gameforge.com
// @grant        GM_addStyle
// ==/UserScript==


// Main class for Script
class OgFeaters
{
	constructor() {
		this.interfaceConstructor();
	}

	/**
	 *  Construit l'interface
	 */
	interfaceConstructor()
	{
		let fleetBlock = document.querySelector('#buttonz .content form');

		if (fleetBlock) {
			let ogf_main_div = document.createElement('div');

			let ogf_open_button = document.createElement('button');
            ogf_open_button.innerText = 'Mes flottes';
            ogf_open_button.classList.add('ogf_button', 'btn_blue');

            let ogf_createFleet = document.createElement('button');
            ogf_createFleet.innerText = 'Créer une flotte';
            ogf_createFleet.classList.add('btn_blue');


            let content = `
                <div>
                    ${ogf_createFleet.outerHTML}

                    <div>

                    </div>
                </div>
            `;

            ogf_open_button.addEventListener('click', (e) => {
                new Modale(e.target.innerText, content, 'ogf_modale_fleet');
            });

			ogf_main_div.appendChild(ogf_open_button);
			fleetBlock.after(ogf_main_div);
		}
	}

    createFleet(id)
    {
        console.log(id);
        new Modale('Créer une flotte', 'Test', id);
    }
}


class Modale
{
    constructor(title, content, id) {
        this.id = id;
        this.title = title;
        this.content = content;

        if (!document.getElementById(this.id)) {
            this.modaleInit();
        }
    }

    modaleInit()
    {
        let modale = document.createElement('div');
        let ogf_close_modale_id = createId(8);

        if (!this.id) {
            modale.id = createId(8);
        } else {
            modale.id = this.id;
        }
        modale.classList.add('ogf_modale','ui-dialog', 'ui-corner-all', 'ui-widget', 'ui-widget-content', 'ui-front');
        modale.innerHTML = `
        <div class="ogf_modale_header ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
            <h5 class="ui-dialog-title">${this.title}</h5>
            <button id="${ogf_close_modale_id}" class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close">
                <span class="ui-button-icon ui-icon ui-icon-closethick"></span>
            </button>
        </div>

        <div class="overlayDiv notices ui-dialog-content ui-widget-content">
            ${this.content}
        </div>
        `;

        document.getElementsByTagName('body')[0].append(modale);
        document.getElementById(ogf_close_modale_id).addEventListener('click', () => {
            deleteElement(modale);
        });
    }
}


/***********************
    UTILITY
*/

/**
*  Créer une chaîne aléatoire
*  @param  len    Longueur de la chaîne
*/
function createId(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function deleteElement(nodeTag)
{
    nodeTag.remove();
}


/***********************
    INIT SCRIPT
*/
const OG_FEATERS = new OgFeaters();

/***********************
    CSS OG_FEATERS
*/
let OG_FeatersClass = `
.ogf_button {
    cursor:pointer;
    padding: 0.255rem;
    margin: 0 1rem;
}
`;

let OG_FeatersModaleClass = `
.ogf_modale {
    position: absolute;
    top: calc(50vh - 140px);
    left: calc(50% - 300px);
    z-index: 99999;
    min-width: 450px;
    height: auto;
    background: url("https://gf2.geo.gfsrv.net/cdn4e/d07c90d96bbc823d6d53953a94aacb.jpg") -100px -100px rgb(0, 0, 0);
}
`;

GM_addStyle(OG_FeatersClass);
GM_addStyle(OG_FeatersModaleClass);

