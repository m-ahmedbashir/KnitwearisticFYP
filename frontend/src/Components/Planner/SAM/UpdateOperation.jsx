import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import Header from '../../ShareUI/Header'
import VerticalNavbar from '../VerticalNavbar'
function UpdateOperation() {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [opration, setOperation] = useState({
        Sequence_No: 0,
        Operation: '',
        Machine_type: '',
        Rate: '',
        Smv: '',
        garmentStyleMulitplier: '',
        garmentStyle: ''
    })
    // onchange of input field
    const onChange = (e) => {
        setOperation({ ...opration, [e.target.name]: e.target.value })
    }

    const GetOperation = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/findsuborder', {
                headers: {
                    'Content-Type': 'application/json',
                    'id': id,
                    'authorization': user.token
                },
            })
            setOperation(res.data)
            setSuccess('Operation loaded Successfully')
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            axios.post('/updatesub', opration, {
                headers: {
                    'Content-Type': 'application/json',
                    'id': id,
                    'authorization': user.token
                },
            }).then(res => {
                setSuccess(res.data.message)
                setLoading(false);
            }).catch(err => {
                setError(err)
            }
            )
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        GetOperation()
    }
        , [])
    return (
        <>
            <ProtectedNavBar />

            <main id="content" role="main" class="main">
                <Header title={'Update Operation'} />
                <div className="content  container" style={{ marginTop: "-20rem" }}>
                    <div className="row">
                        <div className="col-md-3">
                            <VerticalNavbar active={'update'} />
                        </div>
                        {
                            loading ?
                                <>loading...</> :
                                <div className="col-md-9">
                                    <div className="card shadow border-0 px-4">
                                        <form >
                                            <div className="card-header">
                                                <h3 className="mb-0">Update Operation</h3>
                                                {
                                                    success && <div className="alert alert-success">{success}</div>
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


                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-success" onClick={onSubmit}>Update</button>
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

export default UpdateOperation