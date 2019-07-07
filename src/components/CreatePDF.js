import React, {Component} from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class CreatePDF extends Component {

    //Konstruktor der die State Attribute der Klasse festlegt und für die Funktionen das richtige this binded
    constructor(props) {
        super(props);
        this.state = {
            inputID: "",
            inputName: "",
            inputAddress: "",
            inputDescription: "",
            inputListeNoten: "",
            inputZusatz: "",
            createdHash: "",
        }

        this.clickCreateButton = this.clickCreateButton.bind(this);
        this.handleChangeInputID = this.handleChangeInputID.bind(this);
        this.handleChangeInputName = this.handleChangeInputName.bind(this);
        this.handleChangeInputAddress = this.handleChangeInputAddress.bind(this);
        this.handleChangeInputDescription = this.handleChangeInputDescription.bind(this);
        this.handleChangeInputListeNoten = this.handleChangeInputListeNoten.bind(this);
        this.handleChangeInputZusatz = this.handleChangeInputZusatz.bind(this);
    }

    //Der Button ist proxy genannt weil er geklickt wird bevor das Modal die tatsächliche Arbeit macht. Hier Hashen wir die Werte
    //und zeigen das Modal an.
    clickCreateButton() {
        var dd = {
            content: [
                {
                    text: this.state.inputID,
                    style: 'header'
                },
                this.state.inputAddress + '\n\n',
                {
                    text: 'Beschreibung',
                    style: 'subheader'
                },
                this.state.inputDescription,
                '\n\n',
                {
                    text: 'Notenliste',
                    style: 'subheader'
                },
                this.state.inputListeNoten + '\n\n',
                {
                    text: this.state.inputZusatz,
                    style: ['quote', 'small']
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        }
        pdfMake.createPdf(dd).download();
    }

    //Nachfolgend die ganzen Hilfsfunktionen um die Input fields zu überwachen. Die SPeichern quasi einfach nur das eingegebene
    //im State.

    handleChangeInputID(e) {
        this.setState({
            inputID: e.target.value
        })
    }

    handleChangeInputName(e) {
        this.setState({
            inputName: e.target.value
        })
    }

    handleChangeInputAddress(e) {
        this.setState({
            inputAddress: e.target.value
        })
    }

    handleChangeInputDescription(e) {
        this.setState({
            inputDescription: e.target.value
        })
    }

    handleChangeInputListeNoten(e) {
        this.setState({
            inputListeNoten: e.target.value
        })
    }

    handleChangeInputZusatz(e) {
        this.setState({
            inputZusatz: e.target.value
        })
    }

    //Wir rendern hier unser Fenster. Überschrift und haufen eingabefelder. Am Ende steht das Modal welches den hash anzeigt
    //und nochmal nachfragt ob alles stimmt.
    render() {
        return(
            <div className="container">
                <section className="section">
                    <div className="container has-gutter-top-bottom has-text-centered">
                        <div className="title is-1">Zertifikat erstellen</div>
                    </div>

                    <section className="section">
                        <div className="field">
                            <label className="label is-large has-text-left">Zertifikatstitel</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="Zertifikatstitel/ID" value={this.state.inputID} onChange={this.handleChangeInputID} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Teilnehmer (Voller Name)</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="Teilnehmer" value={this.state.inputName} onChange={this.handleChangeInputName} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Ethereum Adresse</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="0x123..." value={this.state.inputAddress} onChange={this.handleChangeInputAddress} />
                            </div>
                        </div>

                        <div className="filed">
                            <label className="label is-large has-text-left">Beschreibung</label>
                            <div className="control">
                                <textarea className="textarea is-large" placeholder="Er hat sich stehts bemüht..." value={this.state.inputDescription} onChange={this.handleChangeInputDescription}></textarea>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Liste der Benotungen (mit Komma getrennt)</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="Liste der Benotungen" value={this.state.inputListeNoten} onChange={this.handleChangeInputListeNoten} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Zusatzinfo (Stellen Sie sicher das Sie alles genauso schreiben wie auf dem Zertifikat abgebildet)</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="Zusatzinfo" value={this.state.inputZusatz} onChange={this.handleChangeInputZusatz} />
                            </div>
                        </div>

                        <button className="button is-primary is-large" onClick={this.clickCreateButton}>PDF Erstellen</button>

                    </section>
                </section>
            </div>
        );
    }
}

export default CreatePDF;