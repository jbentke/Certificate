import React, {Component} from 'react';

//Prinzip ist das Selbe wie in der Create component. Hier fragen wir den Hash direkt ab und löschen ihn aus dem mapping im contract.

class Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputAddress: "",
            inputHash: "",
        }

        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeInputHash = this.handleChangeInputHash.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
    }

    handleChangeAddress(e) {
        this.setState({
            inputAddress: e.target.value
        })
    }

    handleChangeInputHash(e) {
        this.setState({
            inputHash: e.target.value
        })
    }

    clickClose() {
        this.setState({
            showModal: false,
        })
    }

    async clickDelete() {
        //push to chain
        let accounts = await this.props.web3Interface.web3.eth.getAccounts()
        try {
          await this.props.web3Interface.contract.methods.deleteHash(this.state.inputAddress, this.state.inputHash).send({
            from: accounts[0]
          })
        } catch (error) {
          console.log("Metamask denied\n" + error)
        }
    }

    render() {
        return(
            <div className="container">
                <section className="section">
                    <div className="container has-gutter-top-bottom has-text-centered">
                        <div className="title is-1">Zertifikat löschen</div>
                    </div>

                    <section className="section">
                        <div className="field">
                            <label className="label is-large has-text-left">Ethereum Adresse</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="0x123..." value={this.state.inputAddress} onChange={this.handleChangeAddress} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label is-large has-text-left">Hash</label>
                            <div className="control">
                                <input className="input is-primary is-large" type="text" placeholder="0x123..." value={this.state.inputHash} onChange={this.handleChangeInputHash} />
                            </div>
                        </div>

                        <button className="button is-primary is-large" onClick={this.clickDelete}>Löschen</button>

                        {this.state.showModal?
                            <div className="modal is-active">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <section className="modal-card-body">
                                    <div className="container">
                                        <label>Erfolgreich gelöscht</label>
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.clickCreateButtonReal}>Ok</button>
                                </footer>
                            </div>
                        </div>:null}


                    </section>
                </section>
            </div>
        );
    }
}

export default Delete;