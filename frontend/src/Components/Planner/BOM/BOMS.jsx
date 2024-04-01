import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
const BOMS = () => {
  const [bom, setBom] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const [loading, setLoading] = useState(false);
  const deleteBom = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const response = await axios.post('/api/bom/delete',
          {}, {
          headers: {
            "authorization": token
          }
        }
        )
        if (response.status === 200) {
          navigate('/app')
        }
      }

    } catch (error) {

    }
  }
  useEffect(() => {
    setLoading(true);
    const fetchBOM = async () => {
      const res = await fetch('/api/bom/show/', {
        headers: {
          "authorization": token
        },
      });
      const result = await res.json();
      setBom(result)
      setLoading(false);
    }


    fetchBOM();
  }, [setBom])



  return (
    <>
      {
        loading ? <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> :
          <>
            {bom !== null || bom !== undefined ?
              <>
                {
                  bom.map((item, index) => (
                    <>
                      <div class="col-lg-4 mb-3 mb-lg-5" key={index}>
                        <div class="card card-hover-shadow text-center h-100">
                          <div class="card-progress-wrap">
                            <div class="progress card-progress">
                              <div class="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>

                          </div>


                          <div class="card-body">
                            <div class="row align-items-center text-start mb-1">
                              <div class="col">
                                <span class="badge bg-soft-secondary text-secondary p-2">{item.style}</span>
                              </div>




                            </div>

                            <div class="d-flex justify-content-center ">

                              <img class="img-fluid" src={item.UID ? item.UID : "google-webdev-icon.svg"} alt="Image Description" />
                            </div>

                            <div class="mb-4">
                              <h2 class="mb-1">Customer Name {item.CustomerName}</h2>

                              <span class="fs-5">BOM DATE: {item.BomDate}</span>
                            </div>
                            {
                              user && user.userRole === "Admin" ?
                                null
                                :
                                <>
                                  <button class="btn btn-danger my-2" onClick={deleteBom}>
                                    Delete
                                  </button>

                                  <Link to={`/bomshow/${item._id}`} class="btn btn-primary">
                                    Show
                                  </Link>
                                  <Link to={`/bom/${item._id}`} class="btn btn-primary">
                                    use this  Template
                                  </Link>
                                </>
                            }
                          </div>
                        </div>
                      </div>

                    </>
                  ))
                }
              </> : null
            }
          </>
      }
    </>
  )
}

export default BOMS