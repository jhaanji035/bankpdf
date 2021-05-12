import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Container, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../bank/Form.css'
import moment from 'moment'

//import logo from '../../server/documents/logo/melbourne.png';
//import logo from '../logo.svg'
//import '../../server/documents/logo'
class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessStructure: '',
            businessStructureOther: '',
            full_name: '',
            existing_customer: '',
            customer_acc_number: '',
            acn_abn: '',
            describe_business: '',
            trading_name: '',
            date_commenced: '',
            no_employee: '',
            reg_address: '',
            yearsOfManag: '',
            principal_place: '',
            statutory_obligation: '',
            mail_address: '',
            accountant_name: '',
            primary_contact: '',
            phone: '',
            acc_phone_number: '',
            email: '',
            financial_advice_provider: '',
            bank_name: 'melbourne',
            validated: false
        }
    }

    setBusinessStructure = (event) => {
        const target = event.target;
        let value = target.value;
        let state_name = event.target.name;
        this.setState({ [state_name]: value })

        if (value !== '6') {
            this.setState({ businessStructureOther: '' });
        }
        // if(target.checked){

        //     // this.state.businessStructure[value] = value;   
        //     // this.setState({state_name : value})
        // }else{
        //     // this.state.businessStructure.splice(value, 1);
        // }
        console.log(this.state);
    }
    handleInputChange = (event) => {
        const target = event.target;
        let state_name = event.target.name;
        let value = target.value;
        if(state_name === 'date_commenced'){
            let timestamp = target.valueAsNumber
            value = moment(timestamp).format('DD-MM-YYYY')

        }
        this.setState({ [state_name]: value });
        console.log(this.state);
    }
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.createAndDownloadPdf();
            event.preventDefault();
        }
        this.setState({ validated: true })
        console.log(this.state);
    };

    createAndDownloadPdf = () => {
        axios.post('http://localhost:5000/create-pdf', this.state)
            .then((res) => {
                axios.get('http://localhost:5000/fetch-pdf?name=' + res.data.name, { responseType: 'blob' })
                    .then((res) => {
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                        saveAs(pdfBlob, 'Document.pdf');
                        this.clearForm();
                    })
            })
    }
    clearForm = () =>{
        document.getElementById("create-bank-form").reset();
    }
    render() {
        return (
            <Container>
                <header>

                    {/* <img src={logo} alt="logo" /> */}

                </header>
                <div className="row title">
                    <span>SECTION1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ABOUT YOU AND YOUR BUSINESS</span>
                </div>
                <div>
                    <div className='about-business'>
                        Business Struture
                        </div>
                </div>

                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} id='create-bank-form'>
                    <Form.Row>
                        <Form.Group className='flex-wrap-business-prop'>
                            <Form.Check label="Proprietary Company" value="1" checked={this.state.businessStructure === "1" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                            <Form.Check label="Trust" value="2" checked={this.state.businessStructure === "2" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                            <Form.Check label="Association" value="3" checked={this.state.businessStructure === "3" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                            <Form.Check label="Solo Trader / Individual" value="4" checked={this.state.businessStructure === "4" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                            <Form.Check label="Partnership/Joint" value="5" checked={this.state.businessStructure === "5" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                            <Form.Check label="Other" value="6" checked={this.state.businessStructure === "6" ? true : false} name="businessStructure" onChange={this.setBusinessStructure} />
                        </Form.Group>

                        {this.state.businessStructure === "6" && <Form.Group controlId="form.formKeywords" as={Col} >
                            <Form.Control type="text" required name="businessStructureOther" onChange={this.handleInputChange} />
                        </Form.Group>}
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formKeywords" as={Col} md="5"  >
                            <Form.Label>Full legal name of Applicant(s) (as registered by ASIC)</Form.Label>
                            <Form.Control type="text" required placeholder="Enter legal name" name="full_name" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group as={Col} md="2" >
                            <span>Existing Customer</span>
                            <Form.Check
                                value="yes"
                                type="radio"
                                aria-label="radio 2"
                                label="Yes"
                                checked={this.state.existing_customer === 'yes' ? true : false}
                                name="existing_customer"
                                onChange={this.handleInputChange}
                            />
                            <Form.Check
                                value="no"
                                type="radio"
                                aria-label="radio 2"
                                label="No"
                                checked={this.state.existing_customer === "no" ? true : false}
                                name="existing_customer"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="form.formKeywords" as={Col} md="5"  >
                            <Form.Label>Customer number/BSB & Account number/card number</Form.Label>
                            <Form.Control type="text" required placeholder="Enter Keywords" name="customer_acc_number" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formHeadline" as={Col} md="5" >
                            <Form.Label>ACN/ABN</Form.Label>
                            <Form.Control required type="text" placeholder="Headline" name="acn_abn" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord1" as={Col} md="7" >
                            <Form.Label>Briefly describe your business/industry</Form.Label>
                            <Form.Control required as="textarea" rows={3} placeholder="" name="describe_business" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formWord1" as={Col} md="5" >
                            <Form.Label>Trading name</Form.Label>
                            <Form.Control required type="text" placeholder="" name="trading_name" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord1" as={Col} md="5" >
                            <Form.Label>Date commenced trading(under current ownership)</Form.Label>
                            <Form.Control required type="date" format="YYYY/DD/MM" placeholder="" name="date_commenced" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord1" as={Col} md="2" >
                            <Form.Label>No. of employees</Form.Label>
                            <Form.Control required type="number" placeholder="" name="no_employee" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formWord2" as={Col} md="5" >
                            <Form.Label>Registered address (not a PO Box)</Form.Label>
                            <Form.Control required as="textarea" row={3} placeholder="" name="reg_address" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord2" as={Col} md="7" >
                            <Form.Label>Years of management experience in this industry for direct/manager</Form.Label>
                            <Form.Control required type="number" className='yearex' name="yearsOfManag" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group controlId="form.formWord2" as={Col} md="5" >
                            <Form.Label>Principal place of business (if different from registered address)</Form.Label>
                            <Form.Control required as="textarea" row={3} placeholder="" name="principal_place" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord2" as={Col} md="7" >
                            <Form.Label>Have all statutory obligation of the business, including employee entitlements, been met?</Form.Label>
                            <Form.Check
                                value="yes"
                                type="radio"
                                aria-label="radio 2"
                                label="Yes"
                                checked={this.state.statutory_obligation === "yes" ? true : false}
                                name="statutory_obligation"
                                onChange={this.handleInputChange}
                            />
                            <Form.Check
                                value="no"
                                type="radio"
                                aria-label="radio 2"
                                label="No"
                                checked={this.state.statutory_obligation === "no" ? true : false}
                                name="statutory_obligation"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formWord2" as={Col} md="5" >
                            <Form.Label>Mailing address (if different from registered address)</Form.Label>
                            <Form.Control required as="textarea" row={3} placeholder="" name="mail_address" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord2" as={Col} md="7" >
                            <Form.Label>Accountant Name</Form.Label>
                            <Form.Control required type="text" name="accountant_name" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formWord2" as={Col} md="3" >
                            <Form.Label>Primary contact person</Form.Label>
                            <Form.Control required type="text" placeholder="" name="primary_contact" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord2" as={Col} md="2" >
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="text" placeholder="" name="phone" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="form.formWord2" as={Col} md="7" >
                            <Form.Label>Accountant's phone number</Form.Label>
                            <Form.Control required type="text" name="acc_phone_number" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.formWord2" as={Col} md="5" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="" name="email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="form.formWord2" as={Col} md="7" >
                            <Form.Label>Who is your main provider of financial advice?</Form.Label>
                            <Form.Control required type="text" name="financial_advice_provider" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="form.ControlSelect1" as={Col} md="6" >
                            <Form.Label>Select Bank</Form.Label>
                            <Form.Control as="select" defaultValue={'Category 1'} required name="bank_name" onChange={this.handleInputChange}>
                                <option value='melbourne'>Bank Of Melbourne</option>
                                <option value='suncorp'>Suncorp</option>
                                <option value='boq'>Bank of Queensland</option>
                                <option value='macquarie'>Macquarie Bank</option>

                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Generate PDF
                </Button>
                </Form>
            </Container>
        );
    }
}

export default FormContainer;