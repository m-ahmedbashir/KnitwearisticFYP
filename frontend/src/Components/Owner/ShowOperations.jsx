import React, { useEffect, useState } from 'react'
import MainNavBar from '../ShareUI/MainNavBar'
import Header from '../ShareUI/Header'
import SiderBars from './SiderBars'
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ShowOperations() {
    const [operations, setOperations] = useState([]);
    const { user } = useSelector(state => state.auth);
    const DeleteOperation = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/deleteOperation/${id}`, {
                headers: {
                    'id': user.token
                }
            })
            console.log(res.data)
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const querClient = new useQueryClient();
    const { isLoading: deleteLoading, mutateAsync } = useMutation(DeleteOperation);
    const removeOperation = (id) => {
        mutateAsync(id)
        querClient.invalidateQueries('operations')
    }
    //delete and invalidate query





    const getData = () => {
        try {
            axios.get('/api/admin/getAllOperations', {
                headers: {
                    'id': user.email
                }
            }).then((res) => {
                setOperations(res.data)
                console.log(res.data)
            })


        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <MainNavBar />
            <div id="content" role="main" class="main">
                <Header title={'Show Operations'} />
                <div className="content container" style={{ marginTop: "-20rem" }}>

                    <div className="row">
                        <div className="col-md-3">
                            <SiderBars />
                        </div>
                        <div className="col-md-9 bg-white">

                            <table class="table table-striped table-hover">
                                <thead class="py-5">
                                    <tr>
                                        <th scope="col">SQ#</th>
                                        <th scope="col">Operation</th>
                                        <th scope="col">Machine Type</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Smv</th>
                                        <th scope="col">Multiplier</th>
                                        <th scope="col">Garment Style</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        operations.map((operation, index) => {
                                            return <tr key={index}>
                                                <td>{operation.Sequence_No}</td>
                                                <td>{operation.Operation}</td>
                                                <td>{operation.Machine_type}</td>
                                                <td>{operation.Rate}</td>
                                                <td>{operation.Smv}</td>
                                                <td>{operation.garmentStyleMulitplier}</td>
                                                <td>{operation.garmentStyle}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <button className='btn btn-danger mx-2' onClick={() => removeOperation(operation._id)} >Delete</button>
                                                    <Link className='btn btn-success' to={`/updateOperation/${operation._id}`}>Update</Link>
                                                </td>
                                            </tr>

                                        }
                                        )
                                    }

                                </tbody>
                            </table>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowOperations