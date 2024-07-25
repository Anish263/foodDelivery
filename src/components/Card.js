import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data=useCart();

    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let authToken= localStorage.getItem('authToken');

    const handleAddToCart = async () => {
        if(authToken){
        let food =[];
        for (const item of data){
            if(item.id===props.foodItem._id){
                food = item;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({ type: "UPDATE", id:props.foodItem._id,  price: finalPrice, qty: qty})
                return
            }else if(food.size !== size){
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
            return 
            }
            return
        }
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

        
        
        console.log(data)
    }
    else {
        alert('you need to login first');
    }
    }
    let finalPrice = qty * parseInt(options[size]);


    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (

        <div>
            <div>
                <div className="card mt-3 " style={{ "objectFit": "fill", "width": "400px", "maxHeight": "500px" }}>
                    <img className="card-img-top img-fluid " style={{ "objectFit": "fill", "height": "250px" }} src={props.foodItem.img} alt="..." />
                    <div className="card-body ">
                        <div className='container w-100'>
                            <h5 className="card-title">{props.foodItem.name}</h5>

                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>Rs.{finalPrice}/-</div>
                        </div>
                        <hr></hr>
                    </div>

                  
                    <button className={`btn btn-success justify-center ms-4 mb-5`} style={{ "width": "150px" }} onClick={handleAddToCart}>Add To Cart</button>
                 

                </div>
            </div>
        </div>
    )
}
