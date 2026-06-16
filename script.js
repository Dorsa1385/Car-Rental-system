const systeem = new RentalSystem();
let autoIdTeller = 1;

const autoForm = document.getElementById('autoForm');
const boodschapFormulier = document.getElementById('boodschap');
const autoLijstElement = document.getElementById('autoLijst');

function updateLijstOnScreen() {
    autoLijstElement.innerHTML = "";
    const alleAutos = systeem.alleAutosWeergeven();

    alleAutos.forEach(auto => {

        const card = document.createElement('div');
        card.className = 'auto-card';

        const statusKlasse = auto.isVerhuurd ? 'verhuurd' : 'beschikbaar';
        const statusTekst = auto.isVerhuurd ? 'verhuurd' : 'Beschikbaar';

        card.innerHTML = `
            <button class="btn-verwijderen" title="Auto verwijderen">✖</button>
            <h3>${auto.merk} ${auto.model}</h3>
            <span class="status-badge ${statusKlasse}">${statusTekst}</span>
            <div class="card-actions"></div>
        `;
        
        const verwijderKnop = card.querySelector('.btn-verwijderen');
        verwijderKnop.addEventListener('click', () => {
            systeem.autoVerwijderen(auto.id);
            updateLijstOnScreen();
        });

        const actionsDiv = card.querySelector('.card-actions');
        const knop = document.createElement('button');

        if (!auto.isVerhuurd) {

            knop.innerText = "Auto Huren";
            knop.className = "btn-huren";
            knop.addEventListener('click', () => {
                const succes = systeem.autoHuren(auto.id);
                if (succes) {
                    updateLijstOnScreen();
                }
            });
        } else {

            knop.innerText = "Terugbrengen";
            knop.className = "btn-terug";
            knop.addEventListener('click', () => {

                const succes = systeem.autoTerugbrengen(auto.id);
                if (succes) {
                    updateLijstOnScreen();
                }
            });
        }

        actionsDiv.appendChild(knop);
        autoLijstElement.appendChild(card);
    });
}

autoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const merkWaarde = document.getElementById('merk').value;
    const modelWaarde = document.getElementById('model').value;

    const nieuweAuto = new Car(autoIdTeller, merkWaarde, modelWaarde, "Sedan", 0);
    systeem.autoToevoegen(nieuweAuto);

    updateLijstOnScreen();

    boodschapFormulier.style.color = "#10b981";
    boodschapFormulier.innerText = 'Succes! De auto is toegevoegd!';

    autoForm.reset();
    autoIdTeller++;

});