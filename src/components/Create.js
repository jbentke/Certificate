import React, {Component} from 'react';

class Create extends Component {

    //Konstruktor der die State Attribute der Klasse festlegt und für die Funktionen das richtige this binded
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            inputID: "",
            inputName: "",
            inputAddress: "",
            inputListeNoten: "",
            inputZusatz: "",
            createdHash: "",
        }

        this.clickCreateButtonProxy = this.clickCreateButtonProxy.bind(this);
        this.clickCreateButtonReal = this.clickCreateButtonReal.bind(this);
        this.handleChangeInputID = this.handleChangeInputID.bind(this);
        this.handleChangeInputName = this.handleChangeInputName.bind(this);
        this.handleChangeInputAddress = this.handleChangeInputAddress.bind(this);
        this.handleChangeInputListeNoten = this.handleChangeInputListeNoten.bind(this);
        this.handleChangeInputZusatz = this.handleChangeInputZusatz.bind(this);
        this.clickClose = this.clickClose.bind(this);
    }

    //die Funktion versteckt das Modal wieder und löscht den Hash aus dem Speicher
    clickClose() {
        this.setState({
            showModal: false,
            createdHash: "",
        })
    }

    //Der Button ist proxy genannt weil er geklickt wird bevor das Modal die tatsächliche Arbeit macht. Hier Hashen wir die Werte
    //und zeigen das Modal an.
    clickCreateButtonProxy() {
        //create hash
        let hashy = this.props.web3Interface.web3.utils.keccak256(this.state.inputID + this.state.inputName + this.state.inputAddress + this.state.inputListeNoten + this.state.inputZusatz);

        this.setState({
            showModal: true,
            createdHash: hashy
        })
    }

    //Der Bestätigungsbutton des Modals. Eine Transaktion zur Blockchain wird ausgelöst und daraufhin das Modal wieder versteckt.
    async clickCreateButtonReal() {
        //push to chain
        let accounts = await this.props.web3Interface.web3.eth.getAccounts()
        try {
          await this.props.web3Interface.contract.methods.setHash(this.state.inputAddress, this.state.createdHash).send({
            from: accounts[0]
          })
        } catch (error) {
          console.log("Metamask denied\n" + error)
        }

        this.setState({
            showModal: false,
        })
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
                        <div className="title is-1">Zertifikat hashen</div>
                        <div className="subtitle">Stellen Sie sicher das alles so eingetragen wird wie auf dem Zertifikat angegeben</div>
                    </div>

                    <section className="section">
                        <div className="field">
                            <label className="label is-large has-text-left">Zertifikatstitel/ID</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="Zertifikatstitel/ID" value={this.state.inputID} onChange={this.handleChangeInputID} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Teilnehmer (voller Name wie auf dem Zertifikat abgebildet)</label>
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

                        <div className="field">
                            <label className="label is-large has-text-left">Liste der Benotungen (in der Reihenfolge die auf dem Zertifikat angegeben ist)</label>
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

                        <button className="button is-primary is-large" onClick={this.clickCreateButtonProxy}>Erstellen</button>

                        {this.state.showModal?
                            <div className="modal is-active">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Sind alle Daten korrekt?</p>
                                    <button className="delete" aria-label="close" onClick={this.clickClose}></button>
                                </header>
                                <section className="modal-card-body">
                                    <div className="container">
                                        <p>{this.state.createdHash}</p>
                                        <label>Bitte überprüfen Sie ob alle Angaben korrekt sind und wie auf dem Zertifikat angegeben?</label>
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.clickCreateButtonReal}>Abschicken</button>
                                    <button className="button" onClick={this.clickClose}>Zurück</button>
                                </footer>
                            </div>
                        </div>:null}


                    </section>
                </section>
            </div>
        );
    }
}

export default Create;