import React, {Component} from 'react';

//Siehe "Create" component. Quasi das selbe nur mit einer anderen Funktion. Statt einer Transaktion wird ein call gemacht
//welche den Hash abfragt und daraufhin vergleicht. Das Ergebnis wird im Modal angezeigt.

class Check extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            inputID: "",
            inputName: "",
            inputAddress: "",
            inputListeNoten: "",
            inputZusatz: "",
            result: false,
        }

        this.clickCreateButtonProxy = this.clickCreateButtonProxy.bind(this);
        this.clickCreateButtonReal = this.clickCreateButtonReal.bind(this);
        this.handleChangeInputID = this.handleChangeInputID.bind(this);
        this.handleChangeInputName = this.handleChangeInputName.bind(this);
        this.handleChangeInputAddress = this.handleChangeInputAddress.bind(this);
        this.handleChangeInputListeNoten = this.handleChangeInputListeNoten.bind(this);
        this.handleChangeInputZusatz = this.handleChangeInputZusatz.bind(this);
        this.clickClose = this.clickClose.bind(this)
    }

    clickCreateButtonProxy() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    clickClose() {
        this.setState({
            showModal: false,
            result: false
        })
    }

    async clickCreateButtonReal() {
        //create hash
        let hashy = this.props.web3Interface.web3.utils.keccak256(this.state.inputID + this.state.inputName + this.state.inputAddress + this.state.inputListeNoten + this.state.inputZusatz);
        //push to chain
        let res;
        try {
          res = await this.props.web3Interface.contract.methods.pruefen(this.state.inputAddress, hashy).call()
        } catch (error) {
          console.log("Metamask denied\n" + error)
        }
        console.log(res)
        this.setState({
            showModal: true,
            result: res
        })
    }

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

    render() {
        return(
            <div className="container">
                <section className="section">
                    <div className="container has-gutter-top-bottom has-text-centered">
                        <div className="title is-1">Zertifikat prüfen</div>
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

                        <button className="button is-primary is-large" onClick={this.clickCreateButtonReal}>Prüfen</button>

                        {this.state.showModal?
                            <div className="modal is-active">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <section className="modal-card-body">
                                    <div className="container">
                                        {this.state.result?
                                            <label>Das Zertifikat ist gültig</label>:
                                            <label>Das Zertifikat ist ungültig</label>}
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.clickClose}>Ok</button>
                                </footer>
                            </div>
                        </div>:null}


                    </section>
                </section>
            </div>
        );
    }
}

export default Check;