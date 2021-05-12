import React from "react";

import axios from 'axios';
import { saveAs } from 'file-saver';
import FormContainer from './bank/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  createAndDownloadPdf = () => {
    axios.post('http://localhost:5000/create-pdf', this.state)
    .then((res) => {
      axios.get('http://localhost:5000/fetch-pdf?name='+res.data.name, { responseType: 'blob' })
      .then((res) => { 
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'generatedDocument.pdf')
  
      })
    })
 }
  render() {
    return (
      
        <div className="App">
          <FormContainer/>
          {/* <input type="text" placeholder="Name" name="name" onChange ={this.handleChange} />
          <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
          <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
          <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
          <button onClick={this.createAndDownloadPdf}>Download PDF</button> */}
        </div>
      
    );
  }
}

export default App;