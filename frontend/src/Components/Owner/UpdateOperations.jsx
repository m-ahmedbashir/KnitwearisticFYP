import React from 'react'
import { useState } from 'react'
import MainNavBar from '../ShareUI/MainNavBar'
import { useParams } from 'react-router-dom'
import Header from '../ShareUI/Header'
import SiderBars from './SiderBars'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect } from 'react'
import { toast } from 'react-toastify'
function EditOperation() {
    const { user } = useSelector(state => state.auth)
    const { id } = useParams();
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
    const onSubmit = () => {

        axios.put(`/api/admin//updateOperation/${id}`, opration, {
            headers: {
                'id': user.email
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("Operation details Updated Successfully")
                setOperation({
                    Sequence_No: 0,
                    Operation: '',
                    Machine_type: '',
                    Rate: '',
                    Smv: '',
                    garmentStyleMulitplier: '',
                    uid: user.email,
                    garmentStyle: ''
                })
            }
        }).catch(err => {
            console.log(err)
        }
        )
    }

    const { isLoading, isError, error, mutate } = useMutation(onSubmit);
    const querClient = new useQueryClient();
    const addOperation = (e) => {
        e.preventDefault();
        mutate(opration)
        querClient.invalidateQueries('findOperation')
    }
    const fetchOperation = () => {
        try {
            axios.get(`/api/admin/getOperation/${id}`, {
                headers: {
                    'id': user.email
                }
            }).then((res) => {
                setOperation({
                    Sequence_No: res.data.Sequence_No,
                    Operation: res.data.Operation,
                    Machine_type: res.data.Machine_type,
                    Rate: res.data.Rate,
                    Smv: res.data.Smv,
                    garmentStyleMulitplier: res.data.garmentStyleMulitplier,
                    uid: res.data.uid,
                    garmentStyle: res.data.garmentStyle
                });
            })


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOperation();
    }, [])

    return (
        <>


            <main id="content" role="main" class="main">
                <Header title={'Update Operation Page'} />
                {
                    isError ?
                        <div>{error.message}</div>
                        :
                        null
                }
                {
                    isLoading ?
                        <div>Loading...</div>
                        :
                        null
                }
                <div className="content  container" style={{ marginTop: "-20rem" }}>
                    <div className="row">
                        <div className="col-md-3">
                            <SiderBars />
                        </div>


                        <div className="col-md-9">
                            <div className="card shadow border-0 px-4">
                                <form >
                                    <div className="card-header">
                                        <h3 className="mb-0">Update Operation</h3>
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
                                        <button className="btn btn-primary" onClick={addOperation}>Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default EditOperation