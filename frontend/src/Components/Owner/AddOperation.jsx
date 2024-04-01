import React from 'react'
import { useState } from 'react'
import MainNavBar from '../ShareUI/MainNavBar'
import Header from '../ShareUI/Header'
import SiderBars from './SiderBars'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useMutation } from "react-query"
function AddOperation() {
    const { user, } = useSelector(state => state.auth)
    const [success, setSuccess] = useState('')
    const [opration, setOperation] = useState({
        Sequence_No: 0,
        Operation: '',
        Machine_type: '',
        Rate: '',
        Smv: '',
        garmentStyleMulitplier: '',
        uid: user.email,
        garmentStyle: ''
    })
    // onchange of input field
    const onChange = (e) => {
        setOperation({ ...opration, [e.target.name]: e.target.value })
    }


    const onSubmit = (e) => {

        e.preventDefault();
        try {
            axios.post('/api/admin/addOperation', opration, {
                headers: {
                    'Content-Type': 'application/json',
                    'email': user.email
                }
            }).then(res => {
                console.log(res.data)
                setSuccess(res.data.message)
            }).catch(err => {
                console.log(err)
            }
            )
        } catch (error) {
            console.log(error)
        }
    }
    const { isLoading, isError, error, mutate } = useMutation(onSubmit)
    const addOperation = (e) => {
        e.preventDefault();
        mutate(opration)
    }

    return (
        <>
            <MainNavBar />

            <main id="content" role="main" class="main">
                <Header title={'Add Operation'} />
                <div className="content  container" style={{ marginTop: "-20rem" }}>
                    <div className="row">
                        <div className="col-md-3">
                            <SiderBars />
                        </div>
                        {
                            isLoading ?
                                <>loading...</> :
                                <div className="col-md-9">
                                    <div className="card shadow border-0 px-4">
                                        <form >
                                            <div className="card-header">
                                                <h3 className="mb-0">Add Operation</h3>
                                                {
                                                    success ?
                                                        <div className="alert alert-success" role="alert">
                                                            {success}
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label className="form-label">Sequence No</label>
                                                    <input type="text" className="form-control" name="Sequence_No" value={opration.Sequence_No} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Operation</label>
                                                    <input type="text" className="form-control" name="Operation" value={opration.Operation} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Machine Type</label>
                                                    <input type="text" className="form-control" name="Machine_type" value={opration.Machine_type} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Rate</label>
                                                    <input type="text" className="form-control" name="Rate" value={opration.Rate} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Smv</label>
                                                    <input type="text" className="form-control" name="Smv" value={opration.Smv} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Garment Style Multiplier</label>
                                                    <input type="text" className="form-control" name="garmentStyleMulitplier" value={opration.garmentStyleMulitplier} onChange={onChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Garment Style</label>
                                                    <input type="text" className="form-control" name="garmentStyle" value={opration.garmentStyle} onChange={onChange} />
                                                </div>

                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default AddOperation