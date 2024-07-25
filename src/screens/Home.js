import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search,setSearch]= useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/v1/foodData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
        console.log(response[0], response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel1'>

                        <div className='carousel-caption' style={{ zIndex: '10' }}>
                            <div className="d-flex justify-content-center" >
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                
                            </div>
                        </div>
                        <div className="carousel-item active">

                            <img src={require("../images/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg")} className="d-block w-100" style={{ filter: 'brightness(20%)' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={require("../images/eaters-collective-12eHC6FxPyg-unsplash.jpg")} className="d-block w-100" style={{ filter: 'brightness(20%)' }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={require("../images/chad-montano-MqT0asuoIcU-unsplash.jpg")} className="d-block w-100" style={{ filter: 'brightness(20%)' }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>

                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div>
                <div className='container'>
                    {
                        foodCat !== []
                            ? foodCat.map((data) => {
                                return (<div className='row mb-3 '>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== []
                                        ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toString().toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-4' >
                                                        <Card
                                                            foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                            >
                                                                
                                                            </Card>
                                                    </div>
                                                )
                                            })
                                        : <div> No data</div>}
                                </div>)
                            })
                            : <div>""</div>
                    }

                </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}
